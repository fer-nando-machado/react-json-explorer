import "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import JSONExplorer from "./JSONExplorer";

describe("JSONExplorer", () => {
  it("should render component elements correctly", () => {
    const data = { key: "value" };

    render(<JSONExplorer data={data} />);
    const input = screen.getByPlaceholderText("Property");
    const aside = screen.getByRole("complementary");
    const list = screen.getByRole("list");

    expect(input).toHaveValue("");
    expect(aside).toHaveTextContent("");
    expect(list).toHaveTextContent("keyvalue");
  });

  it("should update complementary value according to textbox property changes", () => {
    const data = { fields: [{ prop: "IBAN" }], amount: 7.77 };
    render(<JSONExplorer data={data} />);
    const input = screen.getByRole("textbox");
    const aside = screen.getByRole("complementary");

    fireEvent.change(input, { target: { value: "data.fields[0].prop" } });
    expect(aside).toHaveTextContent("IBAN");

    fireEvent.change(input, { target: { value: "data.fields" } });
    expect(aside).toHaveTextContent("undefined");

    fireEvent.change(input, { target: { value: "data.amount" } });
    expect(aside).toHaveTextContent("7.77");

    fireEvent.change(input, { target: { value: "" } });
    expect(aside).toHaveTextContent("");
  });

  it("should update complementary value and textbox property according to tree key clicks", () => {
    const data = { token: 777, fruits: ["banana", "apple", "orange"] };
    render(<JSONExplorer data={data} />);
    const input = screen.getByRole("textbox");
    const aside = screen.getByRole("complementary");

    fireEvent.click(screen.getByText("token"));
    expect(input).toHaveValue("data.token");
    expect(aside).toHaveTextContent("777");

    fireEvent.click(screen.getByText(2));
    expect(input).toHaveValue("data.fruits[2]");
    expect(aside).toHaveTextContent("orange");
  });

  it("should render the data tree to match the snapshot", () => {
    const data = {
      timestamp: "2021-10-27T07:49:14.896Z",
      token: 777,
      permissions: ["create", "read", "update", "delete"],
      fields: [
        {
          id: "d1a2d386-8042-48a2-a1dd-d760e2fc09fb",
          prop: "iban",
          value: "DE81200505501265402568",
          ref: null,
          hasError: true,
        },
        {
          amount: 7.77,
          method: undefined,
          hasError: false,
        },
      ],
    };

    const { container } = render(<JSONExplorer data={data} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
