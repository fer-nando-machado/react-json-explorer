import "@testing-library/jest-dom";
import { fireEvent } from "@testing-library/react";
import "./CustomCheckbox.js";

const renderCustomCheckbox = (props) => {
  document.body.innerHTML = `<custom-checkbox ${props ? props : ""}/>`;
  const shadowRoot = document.querySelector("custom-checkbox").shadowRoot;
  return {
    nativeCheckbox: shadowRoot.querySelector("input"),
    customCheckbox: shadowRoot.querySelector("button"),
  };
};
describe("custom-checkbox", () => {
  it("should render custom checkbox visible and native checkbox hidden", () => {
    const { nativeCheckbox, customCheckbox } = renderCustomCheckbox();

    expect(nativeCheckbox).not.toBeVisible();
    expect(customCheckbox).toBeVisible();
  });

  it("should render checked checkboxes when receiving checked attribute", () => {
    const { nativeCheckbox, customCheckbox } =
      renderCustomCheckbox(" checked='true'");

    expect(nativeCheckbox).toBeChecked();
    expect(customCheckbox).toHaveClass("checked");
  });

  it("should check/uncheck custom checkbox when clicking native checkbox", () => {
    const { nativeCheckbox, customCheckbox } = renderCustomCheckbox();

    fireEvent.click(nativeCheckbox);
    expect(nativeCheckbox).toBeChecked();
    expect(customCheckbox).toHaveClass("checked");

    fireEvent.click(nativeCheckbox);
    expect(nativeCheckbox).not.toBeChecked();
    expect(customCheckbox).not.toHaveClass("checked");
  });

  it("should check/uncheck native checkbox when clicking custom checkbox", () => {
    const { nativeCheckbox, customCheckbox } = renderCustomCheckbox();

    fireEvent.click(customCheckbox);
    expect(nativeCheckbox).toBeChecked();
    expect(customCheckbox).toHaveClass("checked");

    fireEvent.click(customCheckbox);
    expect(nativeCheckbox).not.toBeChecked();
    expect(customCheckbox).not.toHaveClass("checked");
  });

  it("should focus/unfocus custom checkbox when focusing native checkbox", () => {
    const { nativeCheckbox, customCheckbox } = renderCustomCheckbox();

    nativeCheckbox.focus();
    expect(customCheckbox).toHaveClass("focused");

    nativeCheckbox.blur();
    expect(customCheckbox).not.toHaveClass("focused");
  });

  it("should check/uncheck native checkbox when checking custom checkbox with SPACE", () => {
    const { nativeCheckbox, customCheckbox } = renderCustomCheckbox();

    customCheckbox.focus();
    fireEvent.keyDown(customCheckbox, { key: " " });
    expect(nativeCheckbox).toBeChecked();
    expect(customCheckbox).toHaveClass("checked");

    fireEvent.keyDown(customCheckbox, { key: " " });
    expect(nativeCheckbox).not.toBeChecked();
    expect(customCheckbox).not.toHaveClass("checked");
  });

  it("should not be able to check custom checkbox with ENTER (button default behaviour)", () => {
    const { nativeCheckbox, customCheckbox } = renderCustomCheckbox();

    customCheckbox.focus();
    fireEvent.keyDown(customCheckbox, { key: "Enter" });
    expect(nativeCheckbox).not.toBeChecked();
    expect(customCheckbox).not.toHaveClass("checked");
  });
});
