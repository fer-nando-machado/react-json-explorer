import "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import JSONExplorer from "./JSONExplorer";

describe("JSONExplorer", () => {
  it("should render the component correctly", () => {
    const data = {
      date: "2021-10-27T07:49:14.896Z",
      hasError: false,
      token: 777,
      fruits: ["banana", "apple", "orange"],
      fields: [
        {
          id: "4c212130",
          prop: "iban",
          value: "DE81200505501265402568",
          hasError: false,
        },
        {
          amount: 7.77,
          size: undefined,
          hasError: true,
        },
      ],
    };

    const { container } = render(<JSONExplorer data={data} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
