import { useEffect, useState } from "react";
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
  const [expandedPhoto, setExpandedPhoto] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  useEffect(() => {
    if (!expandedPhoto) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setExpandedPhoto(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expandedPhoto]);

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
          <div className="memory-emoji">
            {memory.iconSrc ? (
              <img
                className="memory-icon-image"
                src={memory.iconSrc}
                alt={`${memory.title} icon`}
              />
            ) : (
              memory.emoji
            )}
          </div>
          <div>
            <h2>{memory.title}</h2>
            <p>{memory.caption}</p>
          </div>
        </header>

        <div className="photo-grid">
          {photos.map((photo, index) => (
            <button
              key={`${photo}-${index}`}
              type="button"
              className="photo-grid-button"
              aria-label={`Expand ${memory.title} photo ${index + 1}`}
              onClick={() =>
                setExpandedPhoto({
                  src: photo,
                  alt: `Expanded ${memory.title} photo ${index + 1}`,
                })
              }
            >
              <img src={photo} alt={`${memory.title} photo ${index + 1}`} />
            </button>
          ))}
        </div>

        <footer className="memory-meta">
          <span>{memory.date}</span>
          {memory.mapUrl ? (
            <a href={memory.mapUrl} target="_blank" rel="noreferrer">
              {memory.location}
            </a>
          ) : (
            <span>{memory.location}</span>
          )}
        </footer>
      </article>

      <button
        className="memory-nav memory-nav-right"
        onClick={onNext}
        aria-label="Next memory"
      >
        next ▶
      </button>

      {expandedPhoto ? (
        <div
          className="photo-preview-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Photo preview"
        >
          <button
            type="button"
            className="photo-preview-close"
            aria-label="Close photo preview"
            onClick={() => setExpandedPhoto(null)}
          >
            ×
          </button>
          <img
            className="photo-preview-image"
            src={expandedPhoto.src}
            alt={expandedPhoto.alt}
          />
        </div>
      ) : null}
    </div>
  );
}
