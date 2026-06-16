import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { starterMemories } from "../data/albumData";
import { MemoryModal } from "./MemoryModal";

describe("MemoryModal", () => {
  it("renders a travel memory with a nine image grid", () => {
    render(
      <MemoryModal
        memory={starterMemories[0]}
        onClose={() => undefined}
        onPrevious={() => undefined}
        onNext={() => undefined}
      />,
    );

    expect(screen.getByRole("dialog")).toHaveAccessibleName("Keukenhof");
    expect(
      screen.getByText("Flowers everywhere, and the sky was kind all afternoon."),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(9);
  });

  it("calls the navigation and close handlers", () => {
    const onClose = vi.fn();
    const onPrevious = vi.fn();
    const onNext = vi.fn();

    render(
      <MemoryModal
        memory={starterMemories[0]}
        onClose={onClose}
        onPrevious={onPrevious}
        onNext={onNext}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Close memory" }));
    fireEvent.click(screen.getByRole("button", { name: "Previous memory" }));
    fireEvent.click(screen.getByRole("button", { name: "Next memory" }));

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onPrevious).toHaveBeenCalledTimes(1);
    expect(onNext).toHaveBeenCalledTimes(1);
  });
});
