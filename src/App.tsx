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

  const memories = useMemo(
    () => [...starterMemories, ...localRecords],
    [localRecords],
  );
  const selectedIndex = selectedId
    ? memories.findIndex((memory) => memory.id === selectedId)
    : -1;
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
      <aside className="site-credits" aria-label="Site credits">
        <p>
          Website design by{" "}
          <a
            href="https://www.instagram.com/zel.dovichmok/"
            target="_blank"
            rel="noreferrer"
          >
            Morris Chen
          </a>
        </p>
        <p>
          Title type design by{" "}
          <a
            href="https://www.instagram.com/olla.kuzovkina/"
            target="_blank"
            rel="noreferrer"
          >
            Olla Kuzovkina
          </a>
        </p>
      </aside>

      <section className="album-title" aria-label="Album title">
        <h1>Morris Emoji Album</h1>
        <p>2024-2026</p>
        <button
          className="add-record-button"
          type="button"
          onClick={() => setEditorOpen(true)}
          aria-label="Add record"
        >
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
        <MemoryEditor
          localRecords={localRecords}
          onSave={saveRecord}
          onClose={() => setEditorOpen(false)}
        />
      ) : null}
    </main>
  );
}
