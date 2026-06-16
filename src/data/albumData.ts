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
