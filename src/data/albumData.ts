export type TravelMemory = {
  id: string;
  sourceFolder?: string;
  emoji: string;
  iconSrc?: string;
  title: string;
  location: string;
  mapUrl?: string;
  date: string;
  caption: string;
  tags: string[];
  photos: string[];
};

type AlbumEntry = {
  folder: string;
  title: string;
  location: string;
  icon: string;
  emoji: string;
  date?: string;
  caption?: string;
  files: string[];
};

const namedFiles: Record<string, string[]> = {
  "armsterdam": ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.JPG"],
  "baker street": ["DSCF2429.jpg", "DSCF2535.jpg", "DSCF2957.jpg", "DSCF3046.jpg", "DSCF3229.jpg", "DSCF3232.jpg", "DSCF3353.jpg", "DSCF3394.jpg", "DSCF3404.jpg"],
  barcelona: ["DSCF0956.jpg", "DSCF1103.jpg", "DSCF1118.jpg", "DSCF1139.jpg", "DSCF1179.jpg", "DSCF1211.jpg", "DSCF1218.jpg", "DSCF1228.jpg", "IMG_5038.JPG"],
  berlin: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.JPG", "06.jpg", "07.jpg", "08.jpg", "09.jpg"],
  "english garden": ["DSCF7793.jpg", "DSCF7798.jpg", "DSCF7801.jpg", "DSCF7805.jpg", "DSCF7818.jpg", "DSCF7839.jpg", "DSCF7845.jpg", "DSCF7884.jpg", "DSCF7936.jpg"],
  "botanisk have": ["01.jpg", "02.jpg", "03.jpg", "04.JPG", "05.JPG", "06.JPG", "07.jpg", "08.jpg", "09.jpeg"],
  canes: ["01.jpg", "02.JPG", "03.JPG", "04.jpeg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg"],
  copenhagen: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg"],
  dundee: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg"],
  eastbourne: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg"],
  gaudi: ["01.jpg", "02.jpg", "03.jpeg", "04.jpg", "05.JPG", "06.jpg", "07.jpg", "08.jpg", "09.jpg"],
  glasgow: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg"],
  "highclere castle": ["01.JPG", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.JPG", "09.jpg"],
  "holyrood house": ["01.jpg", "02.jpg", "03.jpg", "04.JPG", "05.JPG", "06.jpg", "07.jpg", "08.JPG", "09.JPG"],
  hongkong: ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png", "07.png", "08.png", "09.png"],
  "jupiter artland": ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.JPG", "07.jpg", "08.jpg", "09.jpg"],
  laim: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.JPG", "06.JPG", "07.jpg", "08.jpg", "09.jpg"],
  "london bar": ["01.JPG", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg"],
  madrid: ["01.jpg", "02.jpg", "03.jpg", "04.JPG", "05.JPG", "06.JPG", "07.jpg", "08.jpg", "09.jpg"],
  nice: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg"],
  nottinghill: ["01.jpg", "02.jpg", "03.JPG", "04.jpg", "05.jpg", "06.JPG", "07.jpg", "08.JPG", "09.JPG"],
  bookmarks: ["DSCF0089.JPG", "DSCF0197.JPG", "DSCF9085.jpg", "DSCF9172.jpg", "DSCF9173.jpg", "DSCF9179.jpg", "DSCF9189.jpg", "DSCF9518.jpg", "IMG_2567.jpeg"],
  opera: ["DSCF8747.jpg", "DSCF8757.jpg", "DSCF8771.jpg", "DSCF8792.jpg", "DSCF8795.jpg", "DSCF8846.jpg", "DSCF8877.jpg", "DSCF8891.jpg", "DSCF8908.jpg"],
  paris: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.JPG", "08.JPG", "09.jpg"],
  portobello: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg"],
  "princes street": ["01.jpg", "02.JPG", "03.JPG", "04.jpg", "05.jpg", "06.jpg", "07.JPG", "08.JPG", "09.JPG"],
  rotterdam: ["DSCF0021.jpg", "DSCF0029.jpg", "DSCF0057.jpg", "DSCF0141.jpg", "DSCF0194.jpg", "DSCF0207.jpg", "DSCF0235.jpg", "DSCF0248.jpg", "DSCF0250.jpg"],
  "saltburn whitby": ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg"],
  "the hague": ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpeg", "09.jpg"],
  weeds: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg"],
  wembly: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpeg", "06.jpg", "07.jpg", "08.jpg", "09.JPG"],
  wuhan: ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png", "07.png", "08.png", "09.png"],
  york: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg"],
};

const entries: Array<[string, string, string, string, string, string?, string?]> = [
  ["hongkong", "Hong Kong", "中環，香港", "hongkong.png", "🌃", "2024.05", "无尽夏与叮叮车"],
  ["wuhan", "Wuhan", "武汉", "wuhan.png", "🐟", "2024.06", "一丝不舍"],
  ["princes street", "Princes Street", "Princes St., Edinburgh", "prince street.png", "🏛️", "Jun, 2024", "穿着JM爱丁堡来爱丁堡了"],
  ["holyrood house", "Holyrood House", "Canongate, Edinburgh", "holyrood house.png", "🏰", "Jul, 2024", "古堡城市里的古堡花园"],
  ["jupiter artland", "Jupiter Artland", "Jupiter Artland, Edinburgh, United Kingdom", "jupiter artland.png", "🪐", "Jul, 2024", "掉入梦核天线宝宝世界"],
  ["baker street", "Baker Street", "Baker Street Station, London", "baker street.png", "🕵️", "Aug, 2024", "如梦一样的伦敦夜生活，竟然上次来到伦敦已经是十年前。说白了还是没见过世面，就想要抓住看得到的一切"],
  ["highclere castle", "Highclere Castle", "Highclere Park, Highclere, Newbury", "highclere castle.png", "🏰", "Aug, 2024", "看到唐顿庄园的城堡夏季对外开放，便早早订好票，来圆一场梦初中时候的梦"],
  ["london bar", "London Bar", "Alcotraz London, 127 Hackney Rd, London", "london bar.png", "🍸", "Sep, 2024", "伦敦地下城"],
  ["york", "York", "York Art Gallery, York", "york.png", "⛪", "Sep, 2024", "真正意义上的一次短期solo trip，计划了York-Saltburn-Whitby，约克城赶上了莫奈展的尾声，走的城墙头回看大教堂，啊，原来小时候也来过约克呀！"],
  ["saltburn whitby", "Saltburn & Whitby", "North Yorkshire", "saltburn whitby.png", "🌊"],
  ["dundee", "Dundee", "Dundee", "dundee.png", "🌉"],
  ["portobello", "Portobello", "Edinburgh", "portobello.png", "🏖️"],
  ["nottinghill", "Notting Hill", "London", "nottinghill.png", "🏘️"],
  ["glasgow", "Glasgow", "Glasgow", "glasgow.png", "🎭"],
  ["english garden", "English Garden", "Munich", "english garden.png", "🌿"],
  ["laim", "Laim", "Munich", "laim.png", "🚉"],
  ["bookmarks", "Bookmarks", "Travel Notes", "bookmarks.png", "🔖"],
  ["opera", "Opera", "Paris", "opera.png", "🎭"],
  ["paris", "Paris", "Paris", "paris.png", "🗼"],
  ["armsterdam", "Amsterdam", "Amsterdam", "armsterdam.png", "🚲"],
  ["rotterdam", "Rotterdam", "Rotterdam", "rotterdam.png", "🏙️"],
  ["the hague", "The Hague", "The Hague", "the-hague-tulip.png", "🏛️"],
  ["gaudi", "Gaudi", "Barcelona", "gaudi.png", "🧱"],
  ["barcelona", "Barcelona", "Barcelona", "barcelona-vase.png", "🌞"],
  ["madrid", "Madrid", "Madrid", "madrid.png", "🖼️"],
  ["canes", "Cannes", "Cannes", "canes.png", "🎬"],
  ["nice", "Nice", "Nice", "nice.png", "🌊"],
  ["copenhagen", "Copenhagen", "Copenhagen", "copenhagen.png", "🚲"],
  ["botanisk have", "Botanisk Have", "Copenhagen", "botanisk have.png", "🌱"],
  ["berlin", "Berlin", "Berlin", "berlin.png", "🐻"],
  ["weeds", "Weeds", "Berlin", "weeds.png", "🌾"],
  ["wembly", "Wembley", "London", "wembly.png", "🏟️"],
  ["eastbourne", "Eastbourne", "Eastbourne", "eastbourne.png", "🌅"],
];

function defaultFiles(folder: string) {
  if (folder === "hongkong" || folder === "wuhan") return Array.from({ length: 9 }, (_, i) => `${String(i + 1).padStart(2, "0")}.png`);
  return Array.from({ length: 9 }, (_, i) => `${String(i + 1).padStart(2, "0")}.jpg`);
}

const assetPath = (value: string) => encodeURIComponent(value);
const assetRoot = import.meta.env.BASE_URL;

export const starterMemories: TravelMemory[] = entries.map(([folder, title, location, icon, emoji, date, caption]) => ({
  id: `${folder}-2024`,
  sourceFolder: folder,
  emoji,
  iconSrc: `${assetRoot}icons/${assetPath(icon)}`,
  title,
  location,
  date: date ?? "待补充",
  caption: caption ?? "照片已经先放进相册，文字可以慢慢补上。",
  tags: [],
  photos: (namedFiles[folder] ?? defaultFiles(folder)).map((file) => `${assetRoot}photos/${assetPath(folder)}/${assetPath(file)}`),
}));
