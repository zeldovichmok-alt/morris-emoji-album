import { type FormEvent, useState } from "react";
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

export function MemoryEditor({
  localRecords,
  onSave,
  onClose,
}: MemoryEditorProps) {
  const [emoji, setEmoji] = useState("🧳");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [caption, setCaption] = useState("");
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
      tags: [],
      photos: photoPaths
        .split(/\r?\n/)
        .map((path) => path.trim())
        .filter(Boolean)
        .slice(0, 9),
    };

    onSave(record);
    setTitle("");
    setLocation("");
    setDate("");
    setCaption("");
    setPhotoPaths("");
  }

  return (
    <aside className="editor-panel" aria-label="Add travel record">
      <div className="editor-header">
        <h2>Add a travel record</h2>
        <button type="button" onClick={onClose} aria-label="Close editor">
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="editor-form">
        <label>
          Emoji
          <input
            value={emoji}
            onChange={(event) => setEmoji(event.target.value)}
            aria-label="Emoji"
          />
        </label>
        <label>
          Title
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            aria-label="Title"
            required
          />
        </label>
        <label>
          Location
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            aria-label="Location"
            required
          />
        </label>
        <label>
          Date
          <input
            value={date}
            onChange={(event) => setDate(event.target.value)}
            aria-label="Date"
            required
          />
        </label>
        <label>
          Caption
          <textarea
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
            aria-label="Caption"
            required
          />
        </label>
        <label>
          Photo paths
          <textarea
            value={photoPaths}
            onChange={(event) => setPhotoPaths(event.target.value)}
            aria-label="Photo paths"
            placeholder="/photos/trip/01.jpg"
          />
        </label>
        <button type="submit">Save record</button>
      </form>

      <button
        type="button"
        className="secondary-button"
        onClick={() => setExportJson(exportLocalRecords(localRecords))}
      >
        Show export JSON
      </button>

      {exportJson ? <pre className="export-box">{exportJson}</pre> : null}
    </aside>
  );
}
