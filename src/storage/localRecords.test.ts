import { beforeEach, describe, expect, it } from "vitest";
import type { TravelMemory } from "../data/albumData";
import {
  exportLocalRecords,
  loadLocalRecords,
  saveLocalRecords,
} from "./localRecords";

const record: TravelMemory = {
  id: "test-trip",
  emoji: "🧳",
  title: "Test Trip",
  location: "Somewhere",
  date: "Jun 2026",
  caption: "A small memory.",
  tags: ["test"],
  photos: Array.from(
    { length: 9 },
    (_, index) => `/photos/test/${index + 1}.jpg`,
  ),
};

beforeEach(() => {
  localStorage.clear();
});

describe("local record storage", () => {
  it("round trips records through localStorage", () => {
    saveLocalRecords([record]);

    expect(loadLocalRecords()).toEqual([record]);
  });

  it("returns an empty list for missing or invalid data", () => {
    expect(loadLocalRecords()).toEqual([]);

    localStorage.setItem("travel-emoji-album-records", "{broken");

    expect(loadLocalRecords()).toEqual([]);
  });

  it("exports pretty JSON", () => {
    expect(exportLocalRecords([record])).toContain('"title": "Test Trip"');
  });
});
