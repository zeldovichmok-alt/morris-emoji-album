import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import App from "./App";

beforeEach(() => {
  localStorage.clear();
});

describe("App", () => {
  it("renders the Morris title without the decorative cover emoji", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Morris Emoji Album" }),
    ).toBeInTheDocument();
    expect(document.querySelector(".album-cover-emoji")).not.toBeInTheDocument();
  });

  it("renders design credit links only on the names", () => {
    render(<App />);

    expect(screen.getByText("Website design by")).toBeInTheDocument();
    expect(screen.getByText("Title type design by")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Morris Chen" }),
    ).toHaveAttribute("href", "https://www.instagram.com/zel.dovichmok/");
    expect(
      screen.getByRole("link", { name: /Olla Kuzovkina/ }),
    ).toHaveAttribute("href", "https://www.instagram.com/olla.kuzovkina/");
  });

  it("opens a memory modal from an emoji", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Open Hong Kong" }));

    expect(
      screen.getByRole("dialog", { name: "Hong Kong" }),
    ).toBeInTheDocument();
  });

  it("opens the editor from the add button", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Add record" }));

    expect(screen.getByLabelText("Add travel record")).toBeInTheDocument();
  });
});
