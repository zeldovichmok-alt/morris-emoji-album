import type { TravelMemory } from "../data/albumData";

const STORAGE_KEY = "morris-emoji-album.records";

export function loadLocalRecords(): TravelMemory[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as TravelMemory[]) : [];
  } catch {
    return [];
  }
}

export function saveLocalRecords(records: TravelMemory[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function exportLocalRecords(records: TravelMemory[]) {
  return JSON.stringify(records, null, 2);
}

