import type { CSSProperties } from "react";

export const EMOJI_PHYSICS = {
  // Visual size of each falling item.
  size: 78,
  mobileSize: 66,
  fontSize: "4rem",
  mobileFontSize: "3.35rem",
  // Matter.js body feel: restitution = bounce, friction = surface drag, frictionAir = air drag.
  restitution: 0.45,
  friction: 0.62,
  frictionAir: 0.006,
  // Release timing: base delay per item plus deterministic jitter.
  dropIntervalMs: 100,
  dropJitterMs: 85,
};

export type EmojiSpawn = {
  x: number;
  y: number;
  angle: number;
  velocity: {
    x: number;
    y: number;
  };
  angularVelocity: number;
};

function seededNoise(seed: string, salt: number) {
  let hash = 2166136261 + salt;

  for (const character of seed) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }

  hash += hash << 13;
  hash ^= hash >>> 7;
  hash += hash << 3;
  hash ^= hash >>> 17;
  hash += hash << 5;

  return ((hash >>> 0) % 10000) / 10000;
}

export function createEmojiSpawn(id: string, index: number, width: number): EmojiSpawn {
  const safeWidth = Math.max(260, width);
  const horizontalPadding = EMOJI_PHYSICS.size * 0.9;
  const usableWidth = Math.max(120, safeWidth - horizontalPadding * 2);
  const lane = seededNoise(id, index * 37 + 11);
  const wobble = seededNoise(id, index * 53 + 19) - 0.5;
  const verticalGap = 38 + seededNoise(id, index * 67 + 23) * 48;
  const velocitySeed = seededNoise(id, index * 79 + 31) - 0.5;
  const spinSeed = seededNoise(id, index * 97 + 43) - 0.5;

  return {
    x: horizontalPadding + ((lane + index * 0.173 + wobble * 0.22) % 1) * usableWidth,
    y: -120 - index * verticalGap - seededNoise(id, index * 109 + 47) * 180,
    angle: (seededNoise(id, index * 131 + 59) - 0.5) * Math.PI,
    velocity: {
      x: velocitySeed * 7,
      y: seededNoise(id, index * 149 + 61) * 1.5,
    },
    angularVelocity: spinSeed * 0.16,
  };
}

export function createEmojiDropDelay(id: string, index: number) {
  if (index === 0) return 0;

  const jitter = Math.round(seededNoise(id, index * 163 + 71) * EMOJI_PHYSICS.dropJitterMs);

  return index * EMOJI_PHYSICS.dropIntervalMs + jitter;
}

export const emojiButtonStyle = {
  "--emoji-size": `${EMOJI_PHYSICS.size}px`,
  "--emoji-font-size": EMOJI_PHYSICS.fontSize,
  "--emoji-mobile-size": `${EMOJI_PHYSICS.mobileSize}px`,
  "--emoji-mobile-font-size": EMOJI_PHYSICS.mobileFontSize,
} as CSSProperties;
