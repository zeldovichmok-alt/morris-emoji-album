import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { starterMemories } from "../data/albumData";
import { MemoryModal } from "./MemoryModal";

describe("MemoryModal", () => {
  it("renders a travel memory with a nine image grid", () => {
    const memory = starterMemories.find((item) => item.id === "hongkong-2024");
    expect(memory).toBeDefined();

    render(
      <MemoryModal
        memory={memory!}
        onClose={() => undefined}
        onPrevious={() => undefined}
        onNext={() => undefined}
      />,
    );

    expect(screen.getByRole("dialog")).toHaveAccessibleName("Hong Kong");
    expect(screen.getByText("无尽夏与叮叮车")).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(10);
  });

  it("calls the navigation and close handlers", () => {
    const onClose = vi.fn();
    const onPrevious = vi.fn();
    const onNext = vi.fn();
    const memory = starterMemories.find((item) => item.id === "hongkong-2024");
    expect(memory).toBeDefined();

    render(
      <MemoryModal
        memory={memory!}
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

  it("renders an image icon when a memory has iconSrc", () => {
    render(
      <MemoryModal
        memory={{
          id: "hongkong-2026",
          emoji: "🌃",
          iconSrc: "/icons/hongkong.png",
          title: "Hong Kong",
          location: "Hong Kong",
          date: "2026",
          caption: "A bright city memory.",
          tags: ["hongkong"],
          photos: [],
        }}
        onClose={() => undefined}
        onPrevious={() => undefined}
        onNext={() => undefined}
      />,
    );

    expect(screen.getByRole("img", { name: "Hong Kong icon" })).toHaveAttribute(
      "src",
      "/icons/hongkong.png",
    );
  });

  it("renders the location as a map link when mapUrl is present", () => {
    render(
      <MemoryModal
        memory={{
          id: "hongkong-2026",
          emoji: "🌃",
          title: "Hong Kong",
          location: "中環",
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=Central%2C%20Hong%20Kong",
          date: "2026",
          caption: "A bright city memory.",
          tags: ["hongkong"],
          photos: [],
        }}
        onClose={() => undefined}
        onPrevious={() => undefined}
        onNext={() => undefined}
      />,
    );

    const link = screen.getByRole("link", { name: "中環" });

    expect(link).toHaveAttribute(
      "href",
      "https://www.google.com/maps/search/?api=1&query=Central%2C%20Hong%20Kong",
    );
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("does not render tags in the memory dialog", () => {
    render(
      <MemoryModal
        memory={{
          id: "hongkong-2026",
          emoji: "馃寖",
          title: "Hong Kong",
          location: "Hong Kong",
          date: "2026",
          caption: "A bright city memory.",
          tags: ["hongkong", "tram"],
          photos: [],
        }}
        onClose={() => undefined}
        onPrevious={() => undefined}
        onNext={() => undefined}
      />,
    );

    expect(screen.queryByLabelText("Tags")).not.toBeInTheDocument();
    expect(screen.queryByText("#hongkong")).not.toBeInTheDocument();
    expect(screen.queryByText("#tram")).not.toBeInTheDocument();
  });

  it("opens and closes a larger photo preview from the grid", () => {
    const memory = starterMemories.find((item) => item.id === "hongkong-2024");
    expect(memory).toBeDefined();

    render(
      <MemoryModal
        memory={memory!}
        onClose={() => undefined}
        onPrevious={() => undefined}
        onNext={() => undefined}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Expand Hong Kong photo 1" }),
    );

    expect(screen.getByRole("dialog", { name: "Photo preview" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Expanded Hong Kong photo 1" })).toHaveAttribute(
      "src",
      memory!.photos[0],
    );

    fireEvent.click(screen.getByRole("button", { name: "Close photo preview" }));

    expect(
      screen.queryByRole("dialog", { name: "Photo preview" }),
    ).not.toBeInTheDocument();
  });
});
