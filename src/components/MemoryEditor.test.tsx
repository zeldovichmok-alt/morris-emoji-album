import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryEditor } from "./MemoryEditor";

describe("MemoryEditor", () => {
  it("creates a record from form fields", () => {
    const onSave = vi.fn();

    render(
      <MemoryEditor
        localRecords={[]}
        onSave={onSave}
        onClose={() => undefined}
      />,
    );

    fireEvent.change(screen.getByLabelText("Emoji"), {
      target: { value: "🚄" },
    });
    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "Train Day" },
    });
    fireEvent.change(screen.getByLabelText("Location"), {
      target: { value: "Tokyo, Japan" },
    });
    fireEvent.change(screen.getByLabelText("Date"), {
      target: { value: "Jun 2026" },
    });
    fireEvent.change(screen.getByLabelText("Caption"), {
      target: { value: "The train window looked like a movie." },
    });
    fireEvent.change(screen.getByLabelText("Tags"), {
      target: { value: "train, japan" },
    });
    fireEvent.change(screen.getByLabelText("Photo paths"), {
      target: {
        value: Array.from(
          { length: 9 },
          (_, index) => `/photos/train/${index + 1}.jpg`,
        ).join("\n"),
      },
    });

    fireEvent.click(screen.getByRole("button", { name: "Save record" }));

    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({
        emoji: "🚄",
        title: "Train Day",
        location: "Tokyo, Japan",
        photos: expect.arrayContaining(["/photos/train/1.jpg"]),
      }),
    );
  });

  it("shows exported JSON for local records", () => {
    render(
      <MemoryEditor
        localRecords={[
          {
            id: "train-day",
            emoji: "🚄",
            title: "Train Day",
            location: "Tokyo, Japan",
            date: "Jun 2026",
            caption: "A memory.",
            tags: ["train"],
            photos: [],
          },
        ]}
        onSave={() => undefined}
        onClose={() => undefined}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Show export JSON" }));

    expect(screen.getByText(/"title": "Train Day"/)).toBeInTheDocument();
  });
});
