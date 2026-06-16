import { describe, expect, it } from "vitest";
import { starterMemories } from "./albumData";

describe("starterMemories", () => {
  it("contains unique ids", () => {
    const ids = starterMemories.map((memory) => memory.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it("contains required display fields and nine photo slots", () => {
    for (const memory of starterMemories) {
      expect(memory.emoji).toMatch(/\S/);
      expect(memory.title).toMatch(/\S/);
      expect(memory.location).toMatch(/\S/);
      expect(memory.date).toMatch(/\S/);
      expect(memory.caption).toMatch(/\S/);
      expect(memory.photos).toHaveLength(9);
    }
  });
});
