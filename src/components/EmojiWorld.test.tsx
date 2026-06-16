import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { starterMemories } from "../data/albumData";
import { EmojiWorld } from "./EmojiWorld";

describe("EmojiWorld", () => {
  it("renders one button per memory for accessible click support", () => {
    render(
      <EmojiWorld
        memories={starterMemories}
        onSelectMemory={() => undefined}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Open Keukenhof" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(starterMemories.length);
  });

  it("selects a memory from the accessible button layer", () => {
    const onSelectMemory = vi.fn();

    render(
      <EmojiWorld
        memories={starterMemories}
        onSelectMemory={onSelectMemory}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Open Keukenhof" }));

    expect(onSelectMemory).toHaveBeenCalledWith("keukenhof-2024");
  });
});
