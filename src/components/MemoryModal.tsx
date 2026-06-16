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
      <button
        className="memory-nav memory-nav-left"
        onClick={onPrevious}
        aria-label="Previous memory"
      >
        ◀ prev
      </button>

      <article
        className="memory-card"
        role="dialog"
        aria-modal="true"
        aria-label={memory.title}
      >
        <button
          className="memory-close"
          onClick={onClose}
          aria-label="Close memory"
        >
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
            <img
              key={`${photo}-${index}`}
              src={photo}
              alt={`${memory.title} photo ${index + 1}`}
            />
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

      <button
        className="memory-nav memory-nav-right"
        onClick={onNext}
        aria-label="Next memory"
      >
        next ▶
      </button>
    </div>
  );
}
