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
