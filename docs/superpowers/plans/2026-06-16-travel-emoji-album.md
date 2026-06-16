# Travel Emoji Album Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a beginner-friendly travel emoji album where emoji fall and collide on the homepage, and each emoji opens a travel Moments-style 3x3 photo record.

**Architecture:** Create a static Vite React TypeScript app. React owns album data, modal state, and the local add-record flow; Matter.js owns the falling emoji physics world. Records begin in a typed data file, local additions are saved to localStorage, and JSON export lets the owner copy new records back into the project later.

**Tech Stack:** Vite, React, TypeScript, Matter.js, Vitest, React Testing Library, CSS.

---

## File Structure

- Create `package.json`: project scripts and dependencies.
- Create `index.html`: Vite HTML entry.
- Create `tsconfig.json`, `tsconfig.node.json`, `tsconfig.app.json`, `vite.config.ts`: TypeScript and Vite config.
- Create `src/main.tsx`: React mount point.
- Create `src/App.tsx`: top-level app composition.
- Create `src/App.test.tsx`: app shell integration tests.
- Create `src/styles.css`: global visual styling.
- Create `src/data/albumData.ts`: starter records and `TravelMemory` type.
- Create `src/data/albumData.test.ts`: data model tests.
- Create `src/storage/localRecords.ts`: localStorage helpers and JSON export helpers.
- Create `src/storage/localRecords.test.ts`: storage helper tests.
- Create `src/components/EmojiWorld.tsx`: Matter.js falling emoji playground.
- Create `src/components/EmojiWorld.test.tsx`: smoke tests for render and click wiring.
- Create `src/components/MemoryModal.tsx`: travel Moments modal.
- Create `src/components/MemoryModal.test.tsx`: modal interaction tests.
- Create `src/components/MemoryEditor.tsx`: add-record form and JSON export.
- Create `src/components/MemoryEditor.test.tsx`: form and export tests.
- Create `src/test/setup.ts`: test environment setup.
- Create `src/vite-env.d.ts`: Vite type declarations.
- Create `public/photos/placeholder.svg`: local placeholder used when a record has fewer than nine photos.

---

### Task 1: Scaffold The Web App

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `tsconfig.app.json`
- Create: `vite.config.ts`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles.css`
- Create: `src/test/setup.ts`
- Create: `src/vite-env.d.ts`

- [ ] **Step 1: Initialize git for safe checkpoints**

Run:

```powershell
git init
```

Expected: Git creates a `.git` directory. This lets each learning step have a checkpoint.

- [ ] **Step 2: Create `package.json`**

Write:

```json
{
  "scripts": {
    "dev": "vite --host 127.0.0.1",
    "build": "tsc -b && vite build",
    "preview": "vite preview --host 127.0.0.1",
    "test": "vitest --run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@vitejs/plugin-react": "^5.0.0",
    "matter-js": "^0.20.0",
    "vite": "^7.0.0",
    "typescript": "^5.8.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.0",
    "@testing-library/react": "^16.3.0",
    "@types/matter-js": "^0.19.8",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "jsdom": "^26.0.0",
    "vitest": "^3.2.0"
  }
}
```

- [ ] **Step 3: Install dependencies**

Run:

```powershell
npm install
```

Expected: `node_modules` and `package-lock.json` are created.

- [ ] **Step 4: Create Vite and TypeScript config**

Write `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
  },
});
```

Write `tsconfig.json`:

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.node.json" },
    { "path": "./tsconfig.app.json" }
  ]
}
```

Write `tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2023",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

Write `tsconfig.app.json`:

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

- [ ] **Step 5: Create the app entry files**

Write `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Travel Emoji Album</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Write `src/main.tsx`:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

Write `src/App.tsx`:

```tsx
export default function App() {
  return (
    <main className="album-page">
      <section className="album-title" aria-label="Album title">
        <div className="album-cover-emoji">🙈</div>
        <h1>My Emoji Album</h1>
        <p>2024-2026</p>
      </section>
    </main>
  );
}
```

Write `src/styles.css`:

```css
:root {
  color: #191919;
  background: #ffffff;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  overflow: hidden;
}

button,
input,
textarea {
  font: inherit;
}

.album-page {
  position: relative;
  min-height: 100vh;
  background: #ffffff;
  overflow: hidden;
}

.album-title {
  position: absolute;
  z-index: 3;
  top: 18vh;
  left: 50%;
  width: min(320px, calc(100vw - 32px));
  transform: translateX(-50%);
  text-align: center;
  pointer-events: none;
}

.album-cover-emoji {
  font-size: 3.25rem;
  line-height: 1;
}

.album-title h1 {
  margin: 0.75rem 0 0.25rem;
  font-size: clamp(1.6rem, 4vw, 2.5rem);
  font-weight: 800;
  letter-spacing: 0;
}

.album-title p {
  margin: 0;
  color: #9a9a9a;
  font-size: 0.95rem;
}
```

Write `src/test/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

Write `src/vite-env.d.ts`:

```ts
/// <reference types="vite/client" />
```

- [ ] **Step 6: Run the app**

Run:

```powershell
npm run dev
```

Expected: Vite prints a local URL, usually `http://127.0.0.1:5173/`. Open it and confirm the white page with centered title appears.

- [ ] **Step 7: Commit the scaffold**

Run:

```powershell
git add .
git commit -m "chore: scaffold travel emoji album"
```

Expected: Git records the first checkpoint.

---

### Task 2: Add Typed Travel Data

**Files:**
- Create: `src/data/albumData.ts`
- Create: `src/data/albumData.test.ts`
- Create: `public/photos/placeholder.svg`

- [ ] **Step 1: Write the failing data tests**

Write `src/data/albumData.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```powershell
npm test -- src/data/albumData.test.ts
```

Expected: FAIL because `src/data/albumData.ts` does not exist yet.

- [ ] **Step 3: Add typed starter data**

Write `src/data/albumData.ts`:

```ts
export type TravelMemory = {
  id: string;
  emoji: string;
  title: string;
  location: string;
  date: string;
  caption: string;
  tags: string[];
  photos: string[];
};

const placeholderPhotos = Array.from(
  { length: 9 },
  (_, index) => `/photos/placeholder.svg?slot=${index + 1}`,
);

export const starterMemories: TravelMemory[] = [
  {
    id: "keukenhof-2024",
    emoji: "🌷",
    title: "Keukenhof",
    location: "Lisse, Netherlands",
    date: "Apr 2024",
    caption: "Flowers everywhere, and the sky was kind all afternoon.",
    tags: ["flowers", "spring", "netherlands"],
    photos: placeholderPhotos,
  },
  {
    id: "kyoto-rain-2025",
    emoji: "🍵",
    title: "Kyoto Rain",
    location: "Kyoto, Japan",
    date: "Jun 2025",
    caption: "Sat by the window and let the rain rearrange the plan.",
    tags: ["tea", "rain", "japan"],
    photos: placeholderPhotos,
  },
  {
    id: "xiamen-sea-2025",
    emoji: "🌊",
    title: "Xiamen Sea",
    location: "Xiamen, China",
    date: "Sep 2025",
    caption: "The sea breeze made every small thing feel lighter.",
    tags: ["sea", "walk", "china"],
    photos: placeholderPhotos,
  },
  {
    id: "dali-hills-2026",
    emoji: "⛰️",
    title: "Dali Hills",
    location: "Dali, China",
    date: "May 2026",
    caption: "A slow day with mountains holding the whole afternoon.",
    tags: ["mountains", "slow", "china"],
    photos: placeholderPhotos,
  },
];
```

Write `public/photos/placeholder.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800" role="img" aria-label="Travel photo placeholder">
  <rect width="800" height="800" fill="#f4f4f4"/>
  <circle cx="400" cy="330" r="120" fill="#d8f3dc"/>
  <path d="M120 660 320 430 445 565 535 460 680 660Z" fill="#bde0fe"/>
  <text x="400" y="390" text-anchor="middle" font-size="96" font-family="Arial, sans-serif">📷</text>
  <text x="400" y="720" text-anchor="middle" font-size="42" font-family="Arial, sans-serif" fill="#777">photo</text>
</svg>
```

- [ ] **Step 4: Run the data tests**

Run:

```powershell
npm test -- src/data/albumData.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit the data model**

Run:

```powershell
git add src/data public/photos/placeholder.svg
git commit -m "feat: add starter travel memories"
```

Expected: Git records the data checkpoint.

---

### Task 3: Build The Memory Modal

**Files:**
- Create: `src/components/MemoryModal.tsx`
- Create: `src/components/MemoryModal.test.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Write failing modal tests**

Write `src/components/MemoryModal.test.tsx`:

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { starterMemories } from "../data/albumData";
import { MemoryModal } from "./MemoryModal";

describe("MemoryModal", () => {
  it("renders a travel memory with a nine image grid", () => {
    render(
      <MemoryModal
        memory={starterMemories[0]}
        onClose={() => undefined}
        onPrevious={() => undefined}
        onNext={() => undefined}
      />,
    );

    expect(screen.getByRole("dialog")).toHaveAccessibleName("Keukenhof");
    expect(screen.getByText("Flowers everywhere, and the sky was kind all afternoon.")).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(9);
  });

  it("calls the navigation and close handlers", () => {
    const onClose = vi.fn();
    const onPrevious = vi.fn();
    const onNext = vi.fn();

    render(
      <MemoryModal
        memory={starterMemories[0]}
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
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```powershell
npm test -- src/components/MemoryModal.test.tsx
```

Expected: FAIL because `MemoryModal.tsx` does not exist.

- [ ] **Step 3: Implement the modal**

Write `src/components/MemoryModal.tsx`:

```tsx
import type { TravelMemory } from "../data/albumData";

type MemoryModalProps = {
  memory: TravelMemory;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function MemoryModal({
  memory,
  onClose,
  onPrevious,
  onNext,
}: MemoryModalProps) {
  const photos = memory.photos.slice(0, 9);

  return (
    <div className="modal-backdrop">
      <button className="memory-nav memory-nav-left" onClick={onPrevious} aria-label="Previous memory">
        ◀ prev
      </button>

      <article className="memory-card" role="dialog" aria-modal="true" aria-label={memory.title}>
        <button className="memory-close" onClick={onClose} aria-label="Close memory">
          ×
        </button>
        <header className="memory-header">
          <div className="memory-emoji">{memory.emoji}</div>
          <div>
            <h2>{memory.title}</h2>
            <p>{memory.caption}</p>
          </div>
        </header>

        <div className="photo-grid">
          {photos.map((photo, index) => (
            <img key={`${photo}-${index}`} src={photo} alt={`${memory.title} photo ${index + 1}`} />
          ))}
        </div>

        <footer className="memory-meta">
          <span>{memory.date}</span>
          <span>{memory.location}</span>
        </footer>

        <div className="memory-tags" aria-label="Tags">
          {memory.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
      </article>

      <button className="memory-nav memory-nav-right" onClick={onNext} aria-label="Next memory">
        next ▶
      </button>
    </div>
  );
}
```

- [ ] **Step 4: Add modal styles**

Append to `src/styles.css`:

```css
.modal-backdrop {
  position: fixed;
  z-index: 10;
  inset: 0;
  display: grid;
  grid-template-columns: 1fr minmax(320px, 560px) 1fr;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background: rgb(0 0 0 / 48%);
}

.memory-card {
  position: relative;
  width: min(560px, calc(100vw - 32px));
  max-height: calc(100vh - 32px);
  overflow: auto;
  padding: 2rem;
  background: #ffffff;
  border: 1px solid #e7e7e7;
  border-radius: 4px;
  box-shadow: 0 18px 60px rgb(0 0 0 / 24%);
}

.memory-close {
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  width: 2rem;
  height: 2rem;
  border: 0;
  background: transparent;
  color: #666666;
  cursor: pointer;
  font-size: 1.5rem;
}

.memory-header {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.75rem;
}

.memory-emoji {
  font-size: 4rem;
  line-height: 1;
}

.memory-header h2 {
  margin: 0 0 0.25rem;
  font-size: 1.35rem;
}

.memory-header p {
  margin: 0;
  color: #555555;
  line-height: 1.5;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
}

.photo-grid img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  background: #f3f3f3;
}

.memory-meta {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
  color: #999999;
  font-size: 0.9rem;
}

.memory-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.8rem;
  color: #8a8a8a;
  font-size: 0.85rem;
}

.memory-nav {
  justify-self: center;
  border: 0;
  background: transparent;
  color: #ffffff;
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: 800;
}

@media (max-width: 760px) {
  .modal-backdrop {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
  }

  .memory-card {
    grid-row: 1;
    padding: 1.25rem;
  }

  .memory-nav {
    font-size: 1rem;
  }
}
```

- [ ] **Step 5: Run modal tests**

Run:

```powershell
npm test -- src/components/MemoryModal.test.tsx
```

Expected: PASS.

- [ ] **Step 6: Commit the modal**

Run:

```powershell
git add src/components/MemoryModal.tsx src/components/MemoryModal.test.tsx src/styles.css
git commit -m "feat: add memory detail modal"
```

Expected: Git records the modal checkpoint.

---

### Task 4: Build Local Storage Helpers

**Files:**
- Create: `src/storage/localRecords.ts`
- Create: `src/storage/localRecords.test.ts`

- [ ] **Step 1: Write failing storage tests**

Write `src/storage/localRecords.test.ts`:

```ts
import { beforeEach, describe, expect, it } from "vitest";
import { exportLocalRecords, loadLocalRecords, saveLocalRecords } from "./localRecords";
import type { TravelMemory } from "../data/albumData";

const record: TravelMemory = {
  id: "test-trip",
  emoji: "🧳",
  title: "Test Trip",
  location: "Somewhere",
  date: "Jun 2026",
  caption: "A small memory.",
  tags: ["test"],
  photos: Array.from({ length: 9 }, (_, index) => `/photos/test/${index + 1}.jpg`),
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```powershell
npm test -- src/storage/localRecords.test.ts
```

Expected: FAIL because `localRecords.ts` does not exist.

- [ ] **Step 3: Implement storage helpers**

Write `src/storage/localRecords.ts`:

```ts
import type { TravelMemory } from "../data/albumData";

const STORAGE_KEY = "travel-emoji-album-records";

function isTravelMemory(value: unknown): value is TravelMemory {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<TravelMemory>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.emoji === "string" &&
    typeof candidate.title === "string" &&
    typeof candidate.location === "string" &&
    typeof candidate.date === "string" &&
    typeof candidate.caption === "string" &&
    Array.isArray(candidate.tags) &&
    Array.isArray(candidate.photos)
  );
}

export function loadLocalRecords(): TravelMemory[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isTravelMemory);
  } catch {
    return [];
  }
}

export function saveLocalRecords(records: TravelMemory[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function exportLocalRecords(records: TravelMemory[]) {
  return JSON.stringify(records, null, 2);
}
```

- [ ] **Step 4: Run storage tests**

Run:

```powershell
npm test -- src/storage/localRecords.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit storage helpers**

Run:

```powershell
git add src/storage
git commit -m "feat: add local record storage"
```

Expected: Git records the storage checkpoint.

---

### Task 5: Build The Add Record Editor

**Files:**
- Create: `src/components/MemoryEditor.tsx`
- Create: `src/components/MemoryEditor.test.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Write failing editor tests**

Write `src/components/MemoryEditor.test.tsx`:

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryEditor } from "./MemoryEditor";

describe("MemoryEditor", () => {
  it("creates a record from form fields", () => {
    const onSave = vi.fn();
    render(<MemoryEditor localRecords={[]} onSave={onSave} onClose={() => undefined} />);

    fireEvent.change(screen.getByLabelText("Emoji"), { target: { value: "🚄" } });
    fireEvent.change(screen.getByLabelText("Title"), { target: { value: "Train Day" } });
    fireEvent.change(screen.getByLabelText("Location"), { target: { value: "Tokyo, Japan" } });
    fireEvent.change(screen.getByLabelText("Date"), { target: { value: "Jun 2026" } });
    fireEvent.change(screen.getByLabelText("Caption"), { target: { value: "The train window looked like a movie." } });
    fireEvent.change(screen.getByLabelText("Tags"), { target: { value: "train, japan" } });
    fireEvent.change(screen.getByLabelText("Photo paths"), {
      target: { value: Array.from({ length: 9 }, (_, index) => `/photos/train/${index + 1}.jpg`).join("\\n") },
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```powershell
npm test -- src/components/MemoryEditor.test.tsx
```

Expected: FAIL because `MemoryEditor.tsx` does not exist.

- [ ] **Step 3: Implement the editor**

Write `src/components/MemoryEditor.tsx`:

```tsx
import { FormEvent, useState } from "react";
import type { TravelMemory } from "../data/albumData";
import { exportLocalRecords } from "../storage/localRecords";

type MemoryEditorProps = {
  localRecords: TravelMemory[];
  onSave: (record: TravelMemory) => void;
  onClose: () => void;
};

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function MemoryEditor({ localRecords, onSave, onClose }: MemoryEditorProps) {
  const [emoji, setEmoji] = useState("🧳");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const [photoPaths, setPhotoPaths] = useState("");
  const [exportJson, setExportJson] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const baseId = slugify(title) || `memory-${Date.now()}`;
    const record: TravelMemory = {
      id: `${baseId}-${Date.now()}`,
      emoji: emoji.trim() || "🧳",
      title: title.trim(),
      location: location.trim(),
      date: date.trim(),
      caption: caption.trim(),
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      photos: photoPaths.split(/\r?\n/).map((path) => path.trim()).filter(Boolean).slice(0, 9),
    };

    onSave(record);
    setTitle("");
    setLocation("");
    setDate("");
    setCaption("");
    setTags("");
    setPhotoPaths("");
  }

  return (
    <aside className="editor-panel" aria-label="Add travel record">
      <div className="editor-header">
        <h2>Add a travel record</h2>
        <button type="button" onClick={onClose} aria-label="Close editor">×</button>
      </div>

      <form onSubmit={handleSubmit} className="editor-form">
        <label>
          Emoji
          <input value={emoji} onChange={(event) => setEmoji(event.target.value)} aria-label="Emoji" />
        </label>
        <label>
          Title
          <input value={title} onChange={(event) => setTitle(event.target.value)} aria-label="Title" required />
        </label>
        <label>
          Location
          <input value={location} onChange={(event) => setLocation(event.target.value)} aria-label="Location" required />
        </label>
        <label>
          Date
          <input value={date} onChange={(event) => setDate(event.target.value)} aria-label="Date" required />
        </label>
        <label>
          Caption
          <textarea value={caption} onChange={(event) => setCaption(event.target.value)} aria-label="Caption" required />
        </label>
        <label>
          Tags
          <input value={tags} onChange={(event) => setTags(event.target.value)} aria-label="Tags" placeholder="train, japan" />
        </label>
        <label>
          Photo paths
          <textarea value={photoPaths} onChange={(event) => setPhotoPaths(event.target.value)} aria-label="Photo paths" placeholder="/photos/trip/01.jpg" />
        </label>
        <button type="submit">Save record</button>
      </form>

      <button type="button" className="secondary-button" onClick={() => setExportJson(exportLocalRecords(localRecords))}>
        Show export JSON
      </button>

      {exportJson ? <pre className="export-box">{exportJson}</pre> : null}
    </aside>
  );
}
```

- [ ] **Step 4: Add editor styles**

Append to `src/styles.css`:

```css
.editor-panel {
  position: fixed;
  z-index: 12;
  top: 1rem;
  right: 1rem;
  width: min(420px, calc(100vw - 2rem));
  max-height: calc(100vh - 2rem);
  overflow: auto;
  padding: 1rem;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  box-shadow: 0 18px 60px rgb(0 0 0 / 16%);
}

.editor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.editor-header h2 {
  margin: 0;
  font-size: 1.1rem;
}

.editor-header button {
  border: 0;
  background: transparent;
  cursor: pointer;
  font-size: 1.5rem;
}

.editor-form {
  display: grid;
  gap: 0.8rem;
  margin-top: 1rem;
}

.editor-form label {
  display: grid;
  gap: 0.35rem;
  color: #555555;
  font-size: 0.85rem;
}

.editor-form input,
.editor-form textarea {
  width: 100%;
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  padding: 0.65rem;
  color: #191919;
  background: #ffffff;
}

.editor-form textarea {
  min-height: 5.5rem;
  resize: vertical;
}

.editor-form button,
.secondary-button {
  min-height: 2.6rem;
  border: 0;
  border-radius: 4px;
  background: #191919;
  color: #ffffff;
  cursor: pointer;
  font-weight: 700;
}

.secondary-button {
  width: 100%;
  margin-top: 0.8rem;
  background: #efefef;
  color: #191919;
}

.export-box {
  max-height: 220px;
  overflow: auto;
  padding: 0.8rem;
  background: #f7f7f7;
  color: #333333;
  font-size: 0.75rem;
  white-space: pre-wrap;
}
```

- [ ] **Step 5: Run editor tests**

Run:

```powershell
npm test -- src/components/MemoryEditor.test.tsx
```

Expected: PASS.

- [ ] **Step 6: Commit the editor**

Run:

```powershell
git add src/components/MemoryEditor.tsx src/components/MemoryEditor.test.tsx src/styles.css
git commit -m "feat: add local memory editor"
```

Expected: Git records the editor checkpoint.

---

### Task 6: Build The Matter.js Emoji World

**Files:**
- Create: `src/components/EmojiWorld.tsx`
- Create: `src/components/EmojiWorld.test.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Write a smoke test for emoji rendering and click callbacks**

Write `src/components/EmojiWorld.test.tsx`:

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { starterMemories } from "../data/albumData";
import { EmojiWorld } from "./EmojiWorld";

describe("EmojiWorld", () => {
  it("renders one button per memory for accessible click support", () => {
    render(<EmojiWorld memories={starterMemories} onSelectMemory={() => undefined} />);
    expect(screen.getByRole("button", { name: "Open Keukenhof" })).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(starterMemories.length);
  });

  it("selects a memory from the accessible button layer", () => {
    const onSelectMemory = vi.fn();
    render(<EmojiWorld memories={starterMemories} onSelectMemory={onSelectMemory} />);

    fireEvent.click(screen.getByRole("button", { name: "Open Keukenhof" }));

    expect(onSelectMemory).toHaveBeenCalledWith("keukenhof-2024");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```powershell
npm test -- src/components/EmojiWorld.test.tsx
```

Expected: FAIL because `EmojiWorld.tsx` does not exist.

- [ ] **Step 3: Implement the emoji physics world**

Write `src/components/EmojiWorld.tsx`:

```tsx
import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
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
    const host = worldRef.current;
    if (!host) return;

    const engine = Matter.Engine.create();
    const runner = Matter.Runner.create();
    const mouse = Matter.Mouse.create(host);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.18,
        render: { visible: false },
      },
    });

    function bounds() {
      return {
        width: host.clientWidth || window.innerWidth,
        height: host.clientHeight || window.innerHeight,
      };
    }

    function createWalls() {
      const { width, height } = bounds();
      const thickness = 120;
      return [
        Matter.Bodies.rectangle(width / 2, height + thickness / 2, width + thickness * 2, thickness, { isStatic: true }),
        Matter.Bodies.rectangle(-thickness / 2, height / 2, thickness, height + thickness * 2, { isStatic: true }),
        Matter.Bodies.rectangle(width + thickness / 2, height / 2, thickness, height + thickness * 2, { isStatic: true }),
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
              transform: `translate(${(position?.x ?? 0) - EMOJI_SIZE / 2}px, ${(position?.y ?? 0) - EMOJI_SIZE / 2}px) rotate(${position?.angle ?? 0}rad)`,
            }}
          >
            {memory.emoji}
          </button>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 4: Add emoji world styles**

Append to `src/styles.css`:

```css
.emoji-world {
  position: absolute;
  inset: 0;
  z-index: 2;
  overflow: hidden;
  touch-action: none;
}

.emoji-body {
  position: absolute;
  top: 0;
  left: 0;
  width: 64px;
  height: 64px;
  border: 0;
  padding: 0;
  background: transparent;
  cursor: grab;
  font-size: 3.25rem;
  line-height: 1;
  transform-origin: center;
  will-change: transform;
}

.emoji-body:active {
  cursor: grabbing;
}

.emoji-body:focus-visible {
  outline: 3px solid #191919;
  outline-offset: 4px;
  border-radius: 8px;
}
```

- [ ] **Step 5: Run emoji world tests**

Run:

```powershell
npm test -- src/components/EmojiWorld.test.tsx
```

Expected: PASS.

- [ ] **Step 6: Commit the emoji world**

Run:

```powershell
git add src/components/EmojiWorld.tsx src/components/EmojiWorld.test.tsx src/styles.css
git commit -m "feat: add falling emoji world"
```

Expected: Git records the physics checkpoint.

---

### Task 7: Wire The Full Album App

**Files:**
- Create: `src/App.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Write app integration tests**

Write `src/App.test.tsx`:

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import App from "./App";

beforeEach(() => {
  localStorage.clear();
});

describe("App", () => {
  it("opens a memory modal from an emoji", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Open Keukenhof" }));

    expect(screen.getByRole("dialog", { name: "Keukenhof" })).toBeInTheDocument();
  });

  it("opens the editor from the add button", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Add record" }));

    expect(screen.getByLabelText("Add travel record")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```powershell
npm test -- src/App.test.tsx
```

Expected: FAIL because `App.tsx` is still only the static title.

- [ ] **Step 3: Wire data, physics, modal, and editor**

Replace `src/App.tsx` with:

```tsx
import { useEffect, useMemo, useState } from "react";
import { EmojiWorld } from "./components/EmojiWorld";
import { MemoryEditor } from "./components/MemoryEditor";
import { MemoryModal } from "./components/MemoryModal";
import { starterMemories, type TravelMemory } from "./data/albumData";
import { loadLocalRecords, saveLocalRecords } from "./storage/localRecords";

export default function App() {
  const [localRecords, setLocalRecords] = useState<TravelMemory[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);

  useEffect(() => {
    setLocalRecords(loadLocalRecords());
  }, []);

  const memories = useMemo(() => [...starterMemories, ...localRecords], [localRecords]);
  const selectedIndex = selectedId ? memories.findIndex((memory) => memory.id === selectedId) : -1;
  const selectedMemory = selectedIndex >= 0 ? memories[selectedIndex] : null;

  function saveRecord(record: TravelMemory) {
    const nextRecords = [...localRecords, record];
    setLocalRecords(nextRecords);
    saveLocalRecords(nextRecords);
    setEditorOpen(false);
  }

  function showPrevious() {
    if (selectedIndex < 0) return;
    const nextIndex = (selectedIndex - 1 + memories.length) % memories.length;
    setSelectedId(memories[nextIndex].id);
  }

  function showNext() {
    if (selectedIndex < 0) return;
    const nextIndex = (selectedIndex + 1) % memories.length;
    setSelectedId(memories[nextIndex].id);
  }

  return (
    <main className="album-page">
      <section className="album-title" aria-label="Album title">
        <div className="album-cover-emoji">🙈</div>
        <h1>My Emoji Album</h1>
        <p>2024-2026</p>
        <button className="add-record-button" type="button" onClick={() => setEditorOpen(true)} aria-label="Add record">
          Add record
        </button>
      </section>

      <EmojiWorld memories={memories} onSelectMemory={setSelectedId} />

      {selectedMemory ? (
        <MemoryModal
          memory={selectedMemory}
          onClose={() => setSelectedId(null)}
          onPrevious={showPrevious}
          onNext={showNext}
        />
      ) : null}

      {editorOpen ? (
        <MemoryEditor localRecords={localRecords} onSave={saveRecord} onClose={() => setEditorOpen(false)} />
      ) : null}
    </main>
  );
}
```

- [ ] **Step 4: Style the add button**

Append to `src/styles.css`:

```css
.add-record-button {
  margin-top: 0.75rem;
  border: 0;
  background: transparent;
  color: #a0a0a0;
  cursor: pointer;
  font-size: 0.95rem;
  text-decoration: underline;
  pointer-events: auto;
}

.add-record-button:hover {
  color: #191919;
}
```

- [ ] **Step 5: Run app tests**

Run:

```powershell
npm test -- src/App.test.tsx
```

Expected: PASS.

- [ ] **Step 6: Commit the wired app**

Run:

```powershell
git add src/App.tsx src/App.test.tsx src/styles.css
git commit -m "feat: wire album app"
```

Expected: Git records the integrated app checkpoint.

---

### Task 8: Verify, Polish, And Teach The Update Path

**Files:**
- Create: `README.md`
- Modify: `src/styles.css`

- [ ] **Step 1: Add README instructions**

Write `README.md`:

```md
# Travel Emoji Album

This is a personal travel album website. Emoji fall and stack on the homepage. Each emoji opens a travel memory with a caption and a 3x3 photo grid.

## Run The Website

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://127.0.0.1:5173/`.

## Add Your Own Photos

1. Create a folder inside `public/photos`, for example `public/photos/kyoto-rain`.
2. Put nine photos in that folder.
3. Use paths like `/photos/kyoto-rain/01.jpg` in the add-record form.
4. Click `Show export JSON` after saving records locally.
5. Copy the exported record into `src/data/albumData.ts` when you want it to be part of the published site.

## Important Files

- `src/data/albumData.ts`: starter travel records.
- `src/components/EmojiWorld.tsx`: falling emoji physics.
- `src/components/MemoryModal.tsx`: nine-photo travel card.
- `src/components/MemoryEditor.tsx`: local add-record form.
- `src/styles.css`: visual styling.
```

- [ ] **Step 2: Add small-screen polish**

Append to `src/styles.css`:

```css
@media (max-width: 520px) {
  .album-title {
    top: 12vh;
  }

  .album-cover-emoji {
    font-size: 2.6rem;
  }

  .emoji-body {
    width: 56px;
    height: 56px;
    font-size: 2.85rem;
  }

  .memory-header {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .memory-meta {
    flex-direction: column;
    gap: 0.35rem;
  }
}
```

- [ ] **Step 3: Run all tests**

Run:

```powershell
npm test
```

Expected: PASS for all test files.

- [ ] **Step 4: Build the production site**

Run:

```powershell
npm run build
```

Expected: TypeScript passes and Vite writes `dist/`.

- [ ] **Step 5: Start the dev server for manual verification**

Run:

```powershell
npm run dev
```

Expected: Vite prints a local URL. Open it and verify:

- The page title is centered.
- Emoji fall and settle.
- Clicking an emoji opens a memory card.
- Previous, next, and close work.
- Add record opens the editor.
- Saving a record adds a new emoji after the page reloads local storage.
- `Show export JSON` displays JSON.

- [ ] **Step 6: Commit final docs and polish**

Run:

```powershell
git add README.md src/styles.css
git commit -m "docs: explain album update workflow"
```

Expected: Git records the documentation checkpoint.

---

## Self-Review

- Spec coverage: the plan covers the white emoji canvas, Matter.js falling physics, emoji click-to-open records, 3x3 photo modal, previous/next/close controls, local add-record form, localStorage persistence, JSON export, starter data, responsive behavior, and beginner update instructions.
- Placeholder scan: the plan contains no placeholder markers or unspecified implementation steps.
- Type consistency: `TravelMemory`, `starterMemories`, `EmojiWorld`, `MemoryModal`, `MemoryEditor`, `loadLocalRecords`, `saveLocalRecords`, and `exportLocalRecords` use consistent names across tasks.
