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

type AlbumDraft = {
  folder: string;
  files: string[];
  title?: string;
  location?: string;
  icon?: string;
  emoji?: string;
  mapUrl?: string;
  date?: string;
  caption?: string;
  tags?: string[];
};

const encodePathPart = (part: string) => encodeURIComponent(part);

const photoSet = (folder: string, files: string[]) =>
  files.map((file) => `/photos/${encodePathPart(folder)}/${encodePathPart(file)}`);

const iconPath = (fileName: string) => `/icons/${encodePathPart(fileName)}`;

const titleFromFolder = (folder: string) =>
  folder
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const idFromFolder = (folder: string) => `${folder.replace(/\s+/g, "-")}-2024`;

const defaultCaption = "照片已经先放进相册，文字可以慢慢补上。";

const albumDrafts: AlbumDraft[] = [
  {
    folder: "hongkong",
    title: "Hong Kong",
    location: "中環，香港",
    icon: "hongkong.png",
    emoji: "🌃",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Central%2C%20Hong%20Kong",
    date: "2024.05",
    caption: "无尽夏与叮叮车",
    tags: ["hongkong", "central", "tram"],
    files: ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png", "07.png", "08.png", "09.png"],
  },
  {
    folder: "wuhan",
    title: "Wuhan",
    location: "武汉",
    icon: "wuhan.png",
    emoji: "🐟",
    mapUrl:
      "https://www.google.com.hk/maps/place/%E6%AD%A6%E6%B1%89%E4%B8%9C%E6%B9%96%E6%B5%B7%E6%B4%8B%E4%B8%96%E7%95%8C/@30.5747916,114.3731101,17z/data=!3m1!4b1!4m6!3m5!1s0x342ea5c986952f1f:0x2c7775e362099af1!8m2!3d30.574787!4d114.375685!16s%2Fg%2F1tgc75t4?hl=zh-CN&entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D",
    date: "2024.06",
    caption: "一丝不舍",
    tags: ["wuhan", "donghu", "aquarium"],
    files: ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png", "07.png", "08.png", "09.png"],
  },
  {
    folder: "princes street",
    title: "Princes Street",
    location: "Princes St., Edinburgh",
    icon: "prince street.png",
    mapUrl:
      "https://www.google.com.hk/maps/place/%E7%8E%8B%E5%AD%90%E8%A1%97%E8%8A%B1%E5%9B%AD/@55.9517076,-3.1938252,16.75z/data=!4m6!3m5!1s0x4887c7903a68bd9f:0x481fdaa775ca6cb0!8m2!3d55.9509847!4d-3.1985487!16zL20vMDV0OHN6?hl=zh-CN&authuser=1&entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D",
    date: "Jun, 2024",
    caption: "穿着JM爱丁堡来爱丁堡了",
    emoji: "🏛️",
    files: ["01.jpg", "02.JPG", "03.JPG", "04.jpg", "05.jpg", "06.jpg", "07.JPG", "08.JPG", "09.JPG"],
  },
  {
    folder: "holyrood house",
    title: "Holyrood House",
    location: "Canongate, Edinburgh",
    icon: "holyrood house.png",
    mapUrl:
      "https://www.google.com.hk/maps/place/Palace+of+Holyroodhouse/@55.9527138,-3.1722724,17z/data=!3m1!4b1!4m6!3m5!1s0x4887b87717a3a003:0x27abd4db1967f9d6!8m2!3d55.9527138!4d-3.1722724!16zL20vMGtzdzc?hl=en&authuser=1&entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D",
    date: "Jul, 2024",
    caption: "古堡城市里的古堡花园",
    emoji: "🏰",
    files: ["01.jpg", "02.jpg", "03.jpg", "04.JPG", "05.JPG", "06.jpg", "07.jpg", "08.JPG", "09.JPG"],
  },
  {
    folder: "jupiter artland",
    title: "Jupiter Artland",
    location: "Jupiter Artland, Edinburgh, United Kingdom",
    icon: "jupiter artland.png",
    mapUrl:
      "https://www.google.com.hk/maps/place/Jupiter+Artland/@55.9009238,-3.4238927,17z/data=!3m1!4b1!4m6!3m5!1s0x4887db453f939839:0x92c0c5dac16413bd!8m2!3d55.9009238!4d-3.4213178!16s%2Fg%2F11cn3vvt8n?hl=en&authuser=1&entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D",
    date: "Jul, 2024",
    caption: "掉入梦核天线宝宝世界",
    emoji: "🪐",
    files: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.JPG", "07.jpg", "08.jpg", "09.jpg"],
  },
  {
    folder: "baker street",
    title: "Baker Street",
    location: "Baker Street Station, London",
    icon: "baker street.png",
    mapUrl:
      "https://www.google.com.hk/maps/place/Baker+Street+Station/@51.5223318,-0.1625621,17z/data=!3m1!4b1!4m6!3m5!1s0x48761acf19507591:0xb5297f2049d18e9c!8m2!3d51.5223319!4d-0.1576912!16s%2Fg%2F11cn3k769m?hl=en&authuser=1&entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D",
    date: "Aug, 2024",
    caption:
      "如梦一样的伦敦夜生活，竟然上次来到伦敦已经是十年前。说白了还是没见过世面，就想要抓住看得到的一切",
    emoji: "🕵️",
    files: [
      "DSCF2429.jpg",
      "DSCF2535.jpg",
      "DSCF2957.jpg",
      "DSCF3046.jpg",
      "DSCF3229.jpg",
      "DSCF3232.jpg",
      "DSCF3353.jpg",
      "DSCF3394.jpg",
      "DSCF3404.jpg",
    ],
  },
  {
    folder: "highclere castle",
    title: "Highclere Castle",
    location: "Highclere Park, Highclere, Newbury",
    icon: "highclere castle.png",
    mapUrl:
      "https://www.google.com.hk/maps/place/Highclere+Castle/@51.3265901,-1.3632409,17z/data=!3m1!4b1!4m6!3m5!1s0x4874028f0bc02e59:0x58241e4037e5cb8e!8m2!3d51.3265901!4d-1.360666!16zL20vMDRoNXQ1?hl=en&authuser=1&entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D",
    date: "Aug, 2024",
    caption:
      "看到唐顿庄园的城堡夏季对外开放，便早早订好票，来圆一场梦初中时候的梦",
    emoji: "🏰",
    files: ["01.JPG", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.JPG", "09.jpg"],
  },
  {
    folder: "london bar",
    title: "London Bar",
    location: "Alcotraz London, 127 Hackney Rd, London",
    icon: "london bar.png",
    mapUrl:
      "https://www.google.com.hk/maps/place/Alcotraz+London:+Cell+Block+Two-One-Two/@51.5301085,-0.0769479,17z/data=!3m2!4b1!5s0x48761cb937bc489d:0xd4cb3ce26cfd4d36!4m6!3m5!1s0x48761cb7e9a64177:0x53e9ffa1876a9621!8m2!3d51.5301085!4d-0.074373!16s%2Fg%2F11g9s_9swd?hl=en&authuser=1&entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D",
    date: "Sep, 2024",
    caption: "伦敦地下城",
    emoji: "🍸",
    files: ["01.JPG", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg"],
  },
  {
    folder: "york",
    title: "York",
    location: "York Art Gallery, York",
    icon: "york.png",
    mapUrl:
      "https://www.google.com.hk/maps/place/York+Art+Gallery/@53.9601841,-1.0824546,16z/data=!4m15!1m8!3m7!1s0x4878c340e19865f1:0x4774ab898a54e4d1!2sYork,+UK!3b1!8m2!3d53.9614205!4d-1.0739108!16zL20vMDg4Y3A!3m5!1s0x487931a70a5f7149:0x2e8e74145c383aff!8m2!3d53.9628983!4d-1.0860263!16s%2Fm%2F03cfb92?hl=en&authuser=1&entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D",
    date: "Sep, 2024",
    caption:
      "真正意义上的一次短期solo trip，计划了York-Saltburn-Whitby，约克城赶上了莫奈展的尾声，走的城墙头回看大教堂，啊，原来小时候也来过约克呀！",
    emoji: "⛪",
    files: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg"],
  },
  {
    folder: "saltburn whitby",
    title: "Saltburn & Whitby",
    location: "North Yorkshire",
    icon: "saltburn whitby.png",
    emoji: "🌊",
    files: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg"],
  },
  {
    folder: "dundee",
    title: "Dundee",
    location: "Dundee",
    icon: "dundee.png",
    emoji: "🌉",
    files: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg"],
  },
  {
    folder: "portobello",
    title: "Portobello",
    location: "Edinburgh",
    icon: "portobello.png",
    emoji: "🏖️",
    files: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg"],
  },
  {
    folder: "nottinghill",
    title: "Notting Hill",
    location: "London",
    icon: "nottinghill.png",
    emoji: "🏘️",
    files: ["01.jpg", "02.jpg", "03.JPG", "04.jpg", "05.jpg", "06.JPG", "07.jpg", "08.JPG", "09.JPG"],
  },
  {
    folder: "glasgow",
    title: "Glasgow",
    location: "Glasgow",
    icon: "glasgow.png",
    emoji: "🎭",
    files: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg"],
  },
  {
    folder: "english garden",
    title: "English Garden",
    location: "Munich",
    icon: "english garden.png",
    emoji: "🌿",
    files: [
      "DSCF7793.jpg",
      "DSCF7798.jpg",
      "DSCF7801.jpg",
      "DSCF7805.jpg",
      "DSCF7818.jpg",
      "DSCF7839.jpg",
      "DSCF7845.jpg",
      "DSCF7884.jpg",
      "DSCF7936.jpg",
    ],
  },
  {
    folder: "laim",
    title: "Laim",
    location: "Munich",
    icon: "laim.png",
    emoji: "🚉",
    files: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.JPG", "06.JPG", "07.jpg", "08.jpg", "09.jpg"],
  },
  {
    folder: "bookmarks",
    title: "Bookmarks",
    location: "Travel Notes",
    icon: "bookmarks.png",
    emoji: "🔖",
    files: [
      "DSCF0089.JPG",
      "DSCF0197.JPG",
      "DSCF9085.jpg",
      "DSCF9172.jpg",
      "DSCF9173.jpg",
      "DSCF9179.jpg",
      "DSCF9189.jpg",
      "DSCF9518.jpg",
      "IMG_2567.jpeg",
    ],
  },
  {
    folder: "opera",
    title: "Opera",
    location: "Paris",
    icon: "opera.png",
    emoji: "🎭",
    files: [
      "DSCF8747.jpg",
      "DSCF8757.jpg",
      "DSCF8771.jpg",
      "DSCF8792.jpg",
      "DSCF8795.jpg",
      "DSCF8846.jpg",
      "DSCF8877.jpg",
      "DSCF8891.jpg",
      "DSCF8908.jpg",
    ],
  },
  {
    folder: "paris",
    title: "Paris",
    location: "Paris",
    icon: "paris.png",
    emoji: "🗼",
    files: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.JPG", "08.JPG", "09.jpg"],
  },
  {
    folder: "armsterdam",
    title: "Amsterdam",
    location: "Amsterdam",
    icon: "armsterdam.png",
    emoji: "🚲",
    files: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.JPG"],
  },
  {
    folder: "rotterdam",
    title: "Rotterdam",
    location: "Rotterdam",
    icon: "rotterdam.png",
    emoji: "🏙️",
    files: [
      "DSCF0021.jpg",
      "DSCF0029.jpg",
      "DSCF0057.jpg",
      "DSCF0141.jpg",
      "DSCF0194.jpg",
      "DSCF0207.jpg",
      "DSCF0235.jpg",
      "DSCF0248.jpg",
      "DSCF0250.jpg",
    ],
  },
  {
    folder: "the hague",
    title: "The Hague",
    location: "The Hague",
    icon: "the hague.png",
    emoji: "🏛️",
    files: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpeg", "09.jpg"],
  },
  {
    folder: "gaudi",
    title: "Gaudi",
    location: "Barcelona",
    icon: "gaudi.png",
    emoji: "🧱",
    files: ["01.jpg", "02.jpg", "03.jpeg", "04.jpg", "05.JPG", "06.jpg", "07.jpg", "08.jpg", "09.jpg"],
  },
  {
    folder: "barcelona",
    title: "Barcelona",
    location: "Barcelona",
    emoji: "🌞",
    files: [
      "DSCF0956.jpg",
      "DSCF1103.jpg",
      "DSCF1118.jpg",
      "DSCF1139.jpg",
      "DSCF1179.jpg",
      "DSCF1211.jpg",
      "DSCF1218.jpg",
      "DSCF1228.jpg",
      "IMG_5038.JPG",
    ],
  },
  {
    folder: "madrid",
    title: "Madrid",
    location: "Madrid",
    icon: "madrid.png",
    emoji: "🖼️",
    files: ["01.jpg", "02.jpg", "03.jpg", "04.JPG", "05.JPG", "06.JPG", "07.jpg", "08.jpg", "09.jpg"],
  },
  {
    folder: "canes",
    title: "Cannes",
    location: "Cannes",
    icon: "canes.png",
    emoji: "🎬",
    files: ["01.jpg", "02.JPG", "03.JPG", "04.jpeg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg"],
  },
  {
    folder: "nice",
    title: "Nice",
    location: "Nice",
    icon: "nice.png",
    emoji: "🌊",
    files: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg"],
  },
  {
    folder: "copenhagen",
    title: "Copenhagen",
    location: "Copenhagen",
    icon: "copenhagen.png",
    emoji: "🚲",
    files: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg"],
  },
  {
    folder: "botanisk have",
    title: "Botanisk Have",
    location: "Copenhagen",
    icon: "botanisk have.png",
    emoji: "🌱",
    files: ["01.jpg", "02.jpg", "03.jpg", "04.JPG", "05.JPG", "06.JPG", "07.jpg", "08.jpg", "09.jpeg"],
  },
  {
    folder: "berlin",
    title: "Berlin",
    location: "Berlin",
    icon: "berlin.png",
    emoji: "🐻",
    files: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.JPG", "06.jpg", "07.jpg", "08.jpg", "09.jpg"],
  },
  {
    folder: "weeds",
    title: "Weeds",
    location: "Berlin",
    icon: "weeds.png",
    emoji: "🌾",
    files: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg"],
  },
  {
    folder: "wembly",
    title: "Wembley",
    location: "London",
    icon: "wembly.png",
    emoji: "🏟️",
    files: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpeg", "06.jpg", "07.jpg", "08.jpg", "09.JPG"],
  },
  {
    folder: "eastbourne",
    title: "Eastbourne",
    location: "Eastbourne",
    icon: "eastbourne.png",
    emoji: "🌅",
    files: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg"],
  },
];

export const starterMemories: TravelMemory[] = albumDrafts.map((draft) => ({
  id: idFromFolder(draft.folder),
  sourceFolder: draft.folder,
  emoji: draft.emoji ?? "📍",
  iconSrc: draft.icon ? iconPath(draft.icon) : undefined,
  title: draft.title ?? titleFromFolder(draft.folder),
  location: draft.location ?? draft.title ?? titleFromFolder(draft.folder),
  mapUrl: draft.mapUrl,
  date: draft.date ?? "待补充",
  caption: draft.caption ?? defaultCaption,
  tags: [],
  photos: photoSet(draft.folder, draft.files),
}));
