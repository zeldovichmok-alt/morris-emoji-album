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
