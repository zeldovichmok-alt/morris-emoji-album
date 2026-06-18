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
      screen.getByRole("button", { name: "Open Hong Kong" }),
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

    fireEvent.click(screen.getByRole("button", { name: "Open Hong Kong" }));

    expect(onSelectMemory).toHaveBeenCalledWith("hongkong-2024");
  });

  it("renders an image icon when a memory has iconSrc", () => {
    render(
      <EmojiWorld
        memories={[
          {
            id: "hongkong-2026",
            emoji: "🌃",
            iconSrc: "/icons/hongkong.png",
            title: "Hong Kong",
            location: "Hong Kong",
            date: "2026",
            caption: "A bright city memory.",
            tags: ["hongkong"],
            photos: [],
          },
        ]}
        onSelectMemory={() => undefined}
      />,
    );

    expect(screen.getByRole("img", { name: "Hong Kong icon" })).toHaveAttribute(
      "src",
      "/icons/hongkong.png",
    );
    expect(screen.getByRole("img", { name: "Hong Kong icon" })).toHaveAttribute(
      "draggable",
      "false",
    );
  });
});
