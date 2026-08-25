import { useState } from "react";
import type { TravelMemory } from "../data/albumData";

type MemoryModalProps = {
  memory: TravelMemory;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function MemoryModal({ memory, onClose, onPrevious, onNext }: MemoryModalProps) {
  const [expandedPhoto, setExpandedPhoto] = useState<number | null>(null);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section
        className="memory-modal"
        role="dialog"
        aria-modal="true"
        aria-label={memory.title}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="memory-header">
          <div>
            <p className="memory-kicker">{memory.date}</p>
            <h2>{memory.title}</h2>
            {memory.mapUrl ? (
              <a href={memory.mapUrl} target="_blank" rel="noreferrer">{memory.location}</a>
            ) : (
              <p>{memory.location}</p>
            )}
          </div>
          <button type="button" onClick={onClose} aria-label="Close memory">×</button>
        </header>
        <p className="memory-caption">{memory.caption}</p>
        <div className="photo-grid">
          {memory.photos.map((photo, index) => (
            <button
              type="button"
              className="photo-tile"
              key={`${photo}-${index}`}
              aria-label={`Expand ${memory.title} photo ${index + 1}`}
              onClick={() => setExpandedPhoto(index)}
            >
              <img src={photo} alt={`${memory.title} photo ${index + 1}`} />
            </button>
          ))}
        </div>
        {memory.iconSrc ? <img className="memory-icon" src={memory.iconSrc} alt={`${memory.title} icon`} /> : null}
        <footer className="memory-nav">
          <button type="button" onClick={onPrevious} aria-label="Previous memory">← Previous</button>
          <button type="button" onClick={onNext} aria-label="Next memory">Next →</button>
        </footer>
      </section>
      {expandedPhoto !== null ? (
        <div className="photo-preview-backdrop" onClick={() => setExpandedPhoto(null)}>
          <div className="photo-preview" role="dialog" aria-label="Photo preview" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => setExpandedPhoto(null)} aria-label="Close photo preview">×</button>
            <img src={memory.photos[expandedPhoto]} alt={`Expanded ${memory.title} photo ${expandedPhoto + 1}`} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

