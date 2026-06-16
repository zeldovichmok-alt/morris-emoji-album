# Travel Emoji Album Design

## Goal

Build a beginner-friendly travel album website for personal recording first and public browsing second. The first screen should feel like the reference: a large white canvas with falling and stacked emoji. Each emoji represents one travel memory. Opening an emoji shows a travel "Moments" style card with a short caption and a 3x3 photo grid.

## Audience

- Primary: the site owner, who is building a first website and needs a clear update path.
- Secondary: friends or visitors browsing the published album.

The implementation should be easy to understand, with direct file names, simple data structures, and step-by-step explanations during development.

## Experience

The homepage is a full-screen emoji playground:

- A compact centered title area shows the album name, year range, and a small "add record" entry.
- Travel emoji fall into the page with real physics, collide with each other, and settle near the bottom.
- Users can click an emoji to open its travel record.
- Users can drag emoji for a playful desktop interaction.
- The layout keeps large empty space so the emoji remain the main visual feature.

The record detail opens as a modal:

- Background dims behind the card.
- The card shows a large emoji, title, one-sentence caption, 3x3 photo grid, date, location, and tags.
- Previous and next controls switch between travel records.
- A close control returns to the emoji canvas.

The add/edit flow opens a local editor:

- Fields: emoji, title, location, date, caption, tags, and nine photo paths.
- Saving writes the record to browser local storage so the user can preview it immediately.
- Export JSON copies or displays the locally saved records so they can later be written into the project data file for deployment.

## Technical Architecture

Use a static front-end application:

- Vite for local development.
- React and TypeScript for UI and state.
- matter-js for the emoji physics world.
- CSS modules or a small global stylesheet for simple, readable styling.
- localStorage for first-version local additions.

Core modules:

- `AlbumApp`: owns album records, selected record, modal state, editor state, and localStorage loading.
- `EmojiWorld`: owns the Matter.js engine, renderer, emoji bodies, boundaries, drag handling, click detection, and resize handling.
- `MemoryModal`: renders the 3x3 travel card and previous/next controls.
- `MemoryEditor`: renders the local add/edit form and JSON export.
- `albumData`: contains starter records and TypeScript types.

Data flow:

1. Load starter records from `albumData`.
2. Load user-created records from `localStorage`.
3. Merge records into the visible album.
4. Pass records to `EmojiWorld`.
5. Clicked emoji id updates `AlbumApp.selectedRecordId`.
6. `MemoryModal` displays the selected record.
7. New records saved in `MemoryEditor` update state and `localStorage`.

## Data Model

Each travel memory uses this shape:

```ts
type TravelMemory = {
  id: string;
  emoji: string;
  title: string;
  location: string;
  date: string;
  caption: string;
  tags: string[];
  photos: string[];
};
```

Rules:

- `id` is unique and stable.
- `emoji`, `title`, `location`, `date`, and `caption` are required.
- `photos` should contain nine paths for the intended 3x3 layout.
- If fewer than nine photos are present, the UI fills missing cells with a simple placeholder.
- Project photos live under `public/photos/...`; data paths should start with `/photos/...`.

## Visual Direction

The visual language follows the reference closely:

- Mostly white background with generous empty space.
- Small, centered title treatment.
- Emoji are large, playful, and visually dominant.
- The bottom of the screen becomes an emoji pile.
- Detail modal is a clean white card with a subtle shadow.
- The modal photo grid is square, dense, and similar to social feed nine-grid posts.
- Controls are minimal and readable, with no heavy dashboard styling.

Avoid:

- A traditional marketing landing page.
- Large hero sections.
- Card-heavy homepage layouts.
- Complex navigation in the first version.

## Responsive Behavior

Desktop:

- Full-screen emoji canvas.
- Emoji can be dragged.
- Modal appears centered with previous and next controls on either side.

Mobile:

- Emoji still fall and stack, but the count and size can be reduced if performance requires it.
- Modal uses most of the viewport width.
- Previous and next controls sit inside or below the card instead of far to the sides.
- 3x3 photo grid remains square and visible without horizontal scrolling.

Resize handling:

- Rebuild or update Matter.js world boundaries when viewport size changes.
- Keep emoji bodies inside the visible area.

## Testing And Acceptance

The first version is complete when:

- The local site starts and opens in the browser.
- Emoji fall, collide, and settle without leaving the viewport.
- At least several starter records appear as emoji.
- Clicking each emoji opens the correct record modal.
- The modal shows emoji, title, caption, nine-grid photos, date, location, and tags.
- Close, previous, and next controls work.
- The add record form creates a new local record.
- Refreshing the page keeps local records.
- JSON export displays the saved local records.
- Desktop and mobile-width views remain usable.

## Teaching Plan

Development should be explained step by step:

1. Create and run the first Vite page.
2. Add static title and sample emoji.
3. Add Matter.js falling physics.
4. Connect emoji to travel data.
5. Build the travel modal and nine-grid.
6. Build the local add form.
7. Explain where photos and data live.
8. Explain how to run, update, and deploy the site.
