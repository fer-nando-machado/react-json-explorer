import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/react";
import "./CustomCheckbox.js";

global.fetch = vi.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve("<svg></svg>"),
  })
);

const renderCustomCheckbox = (props) => {
  document.body.innerHTML = `<custom-checkbox ${props ? props : ""}/>`;
  const shadowRoot = document.querySelector("custom-checkbox").shadowRoot;
  return {
    nativeCheckbox: shadowRoot.querySelector("input"),
    customCheckbox: shadowRoot.querySelector("button"),
  };
};

describe("custom-checkbox", () => {
  it("should render checkboxes with default visibility", () => {
    const { nativeCheckbox, customCheckbox } = renderCustomCheckbox();

    expect(nativeCheckbox).not.toBeVisible();
    expect(customCheckbox).toBeVisible();
  });

  it("should render checked checkboxes when receiving checked='true' attribute", () => {
    const { nativeCheckbox, customCheckbox } =
      renderCustomCheckbox("checked='true'");

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

  it("should focus/unfocus custom checkbox when focusing/blurring native checkbox", () => {
    const { nativeCheckbox, customCheckbox } = renderCustomCheckbox();

    nativeCheckbox.focus();
    expect(customCheckbox).toHaveClass("focused");

    nativeCheckbox.blur();
    expect(customCheckbox).not.toHaveClass("focused");
  });

  it("should focus/unfocus custom checkbox when focusing/blurring custom checkbox", () => {
    const { _, customCheckbox } = renderCustomCheckbox();

    customCheckbox.focus();
    expect(customCheckbox).toHaveClass("focused");

    customCheckbox.blur();
    expect(customCheckbox).not.toHaveClass("focused");
  });

  it("should unfocus custom checkbox when pressing TAB on custom checkbox", async () => {
    const { _, customCheckbox } = renderCustomCheckbox();

    customCheckbox.focus();
    expect(customCheckbox).toHaveClass("focused");

    await userEvent.tab();
    expect(customCheckbox).not.toHaveClass("focused");
  });

  it("should check/uncheck native checkbox when pressing SPACE on custom checkbox", () => {
    const { nativeCheckbox, customCheckbox } = renderCustomCheckbox();

    customCheckbox.focus();
    fireEvent.keyDown(customCheckbox, { key: " " });
    expect(nativeCheckbox).toBeChecked();
    expect(customCheckbox).toHaveClass("checked");

    fireEvent.keyDown(customCheckbox, { key: " " });
    expect(nativeCheckbox).not.toBeChecked();
    expect(customCheckbox).not.toHaveClass("checked");
  });

  it("should not check/uncheck checkboxes when pressing ENTER on custom checkbox", () => {
    const { nativeCheckbox, customCheckbox } = renderCustomCheckbox();

    customCheckbox.focus();
    fireEvent.keyDown(customCheckbox, { key: "Enter" });
    expect(nativeCheckbox).not.toBeChecked();
    expect(customCheckbox).not.toHaveClass("checked");
  });
});
