import "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import JSONExplorer from "./JSONExplorer";

describe("JSONExplorer", () => {
  it("should render default component correctly", () => {
    render(<JSONExplorer data={{ hello: "world" }} />);

    const explorer = screen.getByText(/"hello": "world"/i);
    expect(explorer).toBeInTheDocument();
  });
});
