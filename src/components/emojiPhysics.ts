import type { CSSProperties } from "react";

export const EMOJI_PHYSICS = {
  size: 72,
  restitution: 0.72,
  friction: 0.16,
  frictionAir: 0.012,
} as const;

export const emojiButtonStyle: CSSProperties = {
  width: EMOJI_PHYSICS.size,
  height: EMOJI_PHYSICS.size,
};

function stableHash(value: string) {
  return [...value].reduce((hash, character) =>
    (hash * 31 + character.charCodeAt(0)) >>> 0, 2166136261);
}

export function createEmojiDropDelay(id: string, index: number) {
  return Math.min(4200, index * 85 + (stableHash(id) % 240));
}

export function createEmojiSpawn(id: string, index: number, width: number) {
  const hash = stableHash(id);
  return {
    x: 50 + ((hash + index * 97) % Math.max(120, width - 100)),
    y: -80 - (index % 4) * 24,
    angle: ((hash % 100) / 100 - 0.5) * 0.7,
    velocity: { x: ((hash % 11) - 5) * 0.08, y: 0.4 + (index % 3) * 0.08 },
    angularVelocity: ((hash % 9) - 4) * 0.012,
  };
}

