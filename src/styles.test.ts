import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(join(process.cwd(), "src", "styles.css"), "utf8");

const getCssBlock = (selector: string) => {
  const match = css.match(new RegExp(`${selector.replace(".", "\\.")} \\{[^}]+\\}`));

  return match?.[0] ?? "";
};

describe("emoji interaction styles", () => {
  it("prevents text and image selection while dragging emoji", () => {
    expect(css).toContain("user-select: none;");
    expect(css).toContain("-webkit-user-select: none;");
    expect(css).toContain("-webkit-user-drag: none;");
  });

  it("renders image emoji smoothly instead of forcing pixelated scaling", () => {
    expect(css).toContain("image-rendering: auto;");
    expect(css).not.toContain("image-rendering: pixelated;");
  });

  it("keeps the album title compact and on one line", () => {
    expect(css).toContain("width: min(760px, calc(100vw - 32px));");
    expect(css).toContain("font-size: clamp(1.7rem, 5vw, 3.6rem);");
    expect(css).toContain("white-space: nowrap;");
  });

  it("uses GT Sectra for modal titles and site credits", () => {
    expect(css).toContain('font-family: "GT Sectra";');
    expect(css).toContain('url("../font/GT-Sectra-Regular.ttf")');
    expect(css).toContain('font-size: 1.55rem;');
    expect(css).toContain('font-size: 0.82rem;');
    expect(css).toContain('font-size: 0.72rem;');
  });

  it("uses GT Sectra Bold for modal album titles", () => {
    const modalTitleStyles = getCssBlock(".memory-header h2");

    expect(css).toContain('url("../font/GT-Sectra-Bold-Trial.otf")');
    expect(modalTitleStyles).toContain('font-family: "GT Sectra", Georgia, "Times New Roman", serif;');
    expect(modalTitleStyles).toContain("font-weight: 700;");
  });

  it("positions site credits in the top left", () => {
    expect(css).toContain("left: 1rem;");
    expect(css).toContain("justify-items: start;");
    expect(css).toContain("text-align: left;");
  });
});
