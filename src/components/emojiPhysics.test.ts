import { describe, expect, it } from "vitest";
import {
  EMOJI_PHYSICS,
  createEmojiDropDelay,
  createEmojiSpawn,
  emojiButtonStyle,
} from "./emojiPhysics";

describe("emoji physics settings", () => {
  it("uses larger, bouncier emoji bodies", () => {
    expect(EMOJI_PHYSICS.size).toBe(78);
    expect(EMOJI_PHYSICS.mobileSize).toBe(66);
    expect(EMOJI_PHYSICS.restitution).toBe(0.45);
    expect(EMOJI_PHYSICS.friction).toBe(0.62);
    expect(EMOJI_PHYSICS.frictionAir).toBe(0.006);
  });

  it("creates less regular starting positions and motion", () => {
    const spawns = Array.from({ length: 8 }, (_, index) =>
      createEmojiSpawn(`memory-${index}`, index, 900),
    );

    const xGaps = spawns.slice(1).map((spawn, index) =>
      Math.round(spawn.x - spawns[index].x),
    );
    const uniqueGaps = new Set(xGaps);
    const horizontalVelocityCount = new Set(
      spawns.map((spawn) => spawn.velocity.x.toFixed(2)),
    ).size;

    expect(uniqueGaps.size).toBeGreaterThan(3);
    expect(horizontalVelocityCount).toBeGreaterThan(3);
    expect(spawns.some((spawn) => Math.abs(spawn.angularVelocity) > 0.03)).toBe(
      true,
    );
  });

  it("staggers emoji drops instead of releasing everything at once", () => {
    const delays = Array.from({ length: 8 }, (_, index) =>
      createEmojiDropDelay(`memory-${index}`, index),
    );

    expect(delays[0]).toBe(0);
    expect(EMOJI_PHYSICS.dropIntervalMs).toBe(100);
    expect(EMOJI_PHYSICS.dropJitterMs).toBe(85);
    expect(delays[3]).toBeGreaterThanOrEqual(240);
    expect(delays[7]).toBeGreaterThan(delays[3]);
    expect(new Set(delays.slice(1).map((delay) => delay % 100)).size).toBeGreaterThan(3);
  });

  it("sizes the clickable button from the shared physics config", () => {
    expect(emojiButtonStyle).toMatchObject({
      "--emoji-size": "78px",
      "--emoji-font-size": "4rem",
    });
  });
});
