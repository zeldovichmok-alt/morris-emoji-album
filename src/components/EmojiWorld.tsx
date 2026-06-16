import Matter from "matter-js";
import { useEffect, useRef, useState } from "react";
import type { TravelMemory } from "../data/albumData";

type EmojiWorldProps = {
  memories: TravelMemory[];
  onSelectMemory: (id: string) => void;
};

type EmojiPosition = {
  id: string;
  x: number;
  y: number;
  angle: number;
};

const EMOJI_SIZE = 64;

export function EmojiWorld({ memories, onSelectMemory }: EmojiWorldProps) {
  const worldRef = useRef<HTMLDivElement | null>(null);
  const bodiesRef = useRef<Map<string, Matter.Body>>(new Map());
  const [positions, setPositions] = useState<EmojiPosition[]>([]);

  useEffect(() => {
    const hostElement = worldRef.current;
    if (!hostElement) return;
    const measuredHost: HTMLDivElement = hostElement;

    const engine = Matter.Engine.create();
    const runner = Matter.Runner.create();
    const mouse = Matter.Mouse.create(measuredHost);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.18,
        render: { visible: false },
      },
    });

    function bounds() {
      return {
        width: measuredHost.clientWidth || window.innerWidth,
        height: measuredHost.clientHeight || window.innerHeight,
      };
    }

    function createWalls() {
      const { width, height } = bounds();
      const thickness = 120;

      return [
        Matter.Bodies.rectangle(
          width / 2,
          height + thickness / 2,
          width + thickness * 2,
          thickness,
          { isStatic: true },
        ),
        Matter.Bodies.rectangle(
          -thickness / 2,
          height / 2,
          thickness,
          height + thickness * 2,
          { isStatic: true },
        ),
        Matter.Bodies.rectangle(
          width + thickness / 2,
          height / 2,
          thickness,
          height + thickness * 2,
          { isStatic: true },
        ),
      ];
    }

    let walls = createWalls();
    Matter.Composite.add(engine.world, [...walls, mouseConstraint]);

    const bodies = memories.map((memory, index) => {
      const { width } = bounds();
      const x = 80 + ((index * 137) % Math.max(160, width - 160));
      const y = -80 - index * 46;
      const body = Matter.Bodies.circle(x, y, EMOJI_SIZE / 2, {
        restitution: 0.28,
        friction: 0.8,
        frictionAir: 0.012,
        label: memory.id,
      });

      bodiesRef.current.set(memory.id, body);
      return body;
    });

    Matter.Composite.add(engine.world, bodies);
    Matter.Runner.run(runner, engine);

    let frame = 0;
    function sync() {
      setPositions(
        memories.map((memory) => {
          const body = bodiesRef.current.get(memory.id);

          return {
            id: memory.id,
            x: body?.position.x ?? 0,
            y: body?.position.y ?? 0,
            angle: body?.angle ?? 0,
          };
        }),
      );
      frame = window.requestAnimationFrame(sync);
    }
    sync();

    function handleResize() {
      Matter.Composite.remove(engine.world, walls);
      walls = createWalls();
      Matter.Composite.add(engine.world, walls);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(frame);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      bodiesRef.current.clear();
    };
  }, [memories]);

  return (
    <div className="emoji-world" ref={worldRef} aria-label="Falling travel emoji">
      {memories.map((memory) => {
        const position = positions.find((item) => item.id === memory.id);

        return (
          <button
            key={memory.id}
            type="button"
            className="emoji-body"
            aria-label={`Open ${memory.title}`}
            onClick={() => onSelectMemory(memory.id)}
            style={{
              transform: `translate(${
                (position?.x ?? 0) - EMOJI_SIZE / 2
              }px, ${(position?.y ?? 0) - EMOJI_SIZE / 2}px) rotate(${
                position?.angle ?? 0
              }rad)`,
            }}
          >
            {memory.emoji}
          </button>
        );
      })}
    </div>
  );
}
