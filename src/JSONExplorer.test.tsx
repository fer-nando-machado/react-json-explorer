import "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useState } from "react";
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
    expect(list).toHaveTextContent("key: 'value',");
  });

  it("should render json data tree and match the snapshot", () => {
    const data = {
      timestamp: "2021-10-27T07:49:14.896Z",
      token: 777,
      permissions: ["create", "read", "update", "delete"],
      fields: [
        {
          id: "d1a2d386-8042-48a2-a1dd-d760e2fc09fb",
          prop: "iban",
          value: "DE81200505501265402568",
          hasError: true,
          ref: null,
        },
        {
          amount: 7.77,
          hasError: false,
          method: undefined,
        },
      ],
    };

    const { container } = render(<JSONExplorer data={data} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should update complementary value when textbox property changes", () => {
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

  it("should update complementary value and textbox property when user clicks on tree key", () => {
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

  it("should reset path/value string cache when json data changes", () => {
    const JSONExplorerWrapper: React.FC<{ initial: any; changed: any }> = ({
      initial,
      changed,
    }) => {
      const [data, setData] = useState(initial);
      return (
        <>
          <JSONExplorer data={data} />
          <button onClick={() => setData(changed)} />
        </>
      );
    };

    render(
      <JSONExplorerWrapper initial={{ a: "first" }} changed={{ b: "second" }} />
    );
    const input = screen.getByRole("textbox");
    const aside = screen.getByRole("complementary");
    const changeHelper = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "data.a" } });
    expect(aside).toHaveTextContent("first");
    fireEvent.change(input, { target: { value: "data.b" } });
    expect(aside).toHaveTextContent("undefined");

    fireEvent.click(changeHelper);

    fireEvent.change(input, { target: { value: "data.a" } });
    expect(aside).toHaveTextContent("undefined");
    fireEvent.change(input, { target: { value: "data.b" } });
    expect(aside).toHaveTextContent("second");
  });
});
