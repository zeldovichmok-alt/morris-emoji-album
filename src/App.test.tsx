import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import App from "./App";

beforeEach(() => {
  localStorage.clear();
});

describe("App", () => {
  it("opens a memory modal from an emoji", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Open Keukenhof" }));

    expect(
      screen.getByRole("dialog", { name: "Keukenhof" }),
    ).toBeInTheDocument();
  });

  it("opens the editor from the add button", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Add record" }));

    expect(screen.getByLabelText("Add travel record")).toBeInTheDocument();
  });
});
