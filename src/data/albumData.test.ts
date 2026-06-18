import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { starterMemories } from "./albumData";

const publicRoot = join(process.cwd(), "public");
const photosRoot = join(publicRoot, "photos");

const toPublicFilePath = (publicPath: string) =>
  join(publicRoot, decodeURIComponent(publicPath.replace(/^\//, "")));

describe("starterMemories", () => {
  it("contains unique ids", () => {
    const ids = starterMemories.map((memory) => memory.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it("contains required display fields and nine photo slots", () => {
    for (const memory of starterMemories) {
      expect(memory.emoji).toMatch(/\S/);
      expect(memory.title).toMatch(/\S/);
      expect(memory.location).toMatch(/\S/);
      expect(memory.date).toMatch(/\S/);
      expect(memory.caption).toMatch(/\S/);
      expect(memory.photos).toHaveLength(9);
    }
  });

  it("creates an album for every public photo folder", () => {
    const folders = readdirSync(photosRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
    const albumFolders = starterMemories.map((memory) => memory.sourceFolder);

    expect(albumFolders).toEqual(expect.arrayContaining(folders));
  });

  it("points every album icon and photo to an existing public file", () => {
    for (const memory of starterMemories) {
      if (memory.iconSrc) {
        expect(existsSync(toPublicFilePath(memory.iconSrc))).toBe(true);
      }

      for (const photo of memory.photos) {
        expect(existsSync(toPublicFilePath(photo))).toBe(true);
      }
    }
  });

  it("keeps the handwritten Wuhan and Hong Kong details", () => {
    expect(starterMemories.find((item) => item.id === "wuhan-2024")).toMatchObject({
      title: "Wuhan",
      location: "武汉",
      iconSrc: "/icons/wuhan.png",
      date: "2024.06",
      caption: "一丝不舍",
    });

    expect(starterMemories.find((item) => item.id === "hongkong-2024")).toMatchObject({
      title: "Hong Kong",
      location: "中環，香港",
      iconSrc: "/icons/hongkong.png",
      date: "2024.05",
      caption: "无尽夏与叮叮车",
    });
  });

  it("keeps the handwritten UK trip details and map links", () => {
    const expectedDetails = [
      {
        id: "princes-street-2024",
        title: "Princes Street",
        location: "Princes St., Edinburgh",
        date: "Jun, 2024",
        caption: "穿着JM爱丁堡来爱丁堡了",
        mapUrl:
          "https://www.google.com.hk/maps/place/%E7%8E%8B%E5%AD%90%E8%A1%97%E8%8A%B1%E5%9B%AD/@55.9517076,-3.1938252,16.75z/data=!4m6!3m5!1s0x4887c7903a68bd9f:0x481fdaa775ca6cb0!8m2!3d55.9509847!4d-3.1985487!16zL20vMDV0OHN6?hl=zh-CN&authuser=1&entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D",
      },
      {
        id: "holyrood-house-2024",
        title: "Holyrood House",
        location: "Canongate, Edinburgh",
        date: "Jul, 2024",
        caption: "古堡城市里的古堡花园",
        mapUrl:
          "https://www.google.com.hk/maps/place/Palace+of+Holyroodhouse/@55.9527138,-3.1722724,17z/data=!3m1!4b1!4m6!3m5!1s0x4887b87717a3a003:0x27abd4db1967f9d6!8m2!3d55.9527138!4d-3.1722724!16zL20vMGtzdzc?hl=en&authuser=1&entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D",
      },
      {
        id: "jupiter-artland-2024",
        title: "Jupiter Artland",
        location: "Jupiter Artland, Edinburgh, United Kingdom",
        date: "Jul, 2024",
        caption: "掉入梦核天线宝宝世界",
        mapUrl:
          "https://www.google.com.hk/maps/place/Jupiter+Artland/@55.9009238,-3.4238927,17z/data=!3m1!4b1!4m6!3m5!1s0x4887db453f939839:0x92c0c5dac16413bd!8m2!3d55.9009238!4d-3.4213178!16s%2Fg%2F11cn3vvt8n?hl=en&authuser=1&entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D",
      },
      {
        id: "baker-street-2024",
        title: "Baker Street",
        location: "Baker Street Station, London",
        date: "Aug, 2024",
        caption:
          "如梦一样的伦敦夜生活，竟然上次来到伦敦已经是十年前。说白了还是没见过世面，就想要抓住看得到的一切",
        mapUrl:
          "https://www.google.com.hk/maps/place/Baker+Street+Station/@51.5223318,-0.1625621,17z/data=!3m1!4b1!4m6!3m5!1s0x48761acf19507591:0xb5297f2049d18e9c!8m2!3d51.5223319!4d-0.1576912!16s%2Fg%2F11cn3k769m?hl=en&authuser=1&entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D",
      },
      {
        id: "highclere-castle-2024",
        title: "Highclere Castle",
        location: "Highclere Park, Highclere, Newbury",
        date: "Aug, 2024",
        caption:
          "看到唐顿庄园的城堡夏季对外开放，便早早订好票，来圆一场梦初中时候的梦",
        mapUrl:
          "https://www.google.com.hk/maps/place/Highclere+Castle/@51.3265901,-1.3632409,17z/data=!3m1!4b1!4m6!3m5!1s0x4874028f0bc02e59:0x58241e4037e5cb8e!8m2!3d51.3265901!4d-1.360666!16zL20vMDRoNXQ1?hl=en&authuser=1&entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D",
      },
      {
        id: "london-bar-2024",
        title: "London Bar",
        location: "Alcotraz London, 127 Hackney Rd, London",
        date: "Sep, 2024",
        caption: "伦敦地下城",
        mapUrl:
          "https://www.google.com.hk/maps/place/Alcotraz+London:+Cell+Block+Two-One-Two/@51.5301085,-0.0769479,17z/data=!3m2!4b1!5s0x48761cb937bc489d:0xd4cb3ce26cfd4d36!4m6!3m5!1s0x48761cb7e9a64177:0x53e9ffa1876a9621!8m2!3d51.5301085!4d-0.074373!16s%2Fg%2F11g9s_9swd?hl=en&authuser=1&entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D",
      },
      {
        id: "york-2024",
        title: "York",
        location: "York Art Gallery, York",
        date: "Sep, 2024",
        caption:
          "真正意义上的一次短期solo trip，计划了York-Saltburn-Whitby，约克城赶上了莫奈展的尾声，走的城墙头回看大教堂，啊，原来小时候也来过约克呀！",
        mapUrl:
          "https://www.google.com.hk/maps/place/York+Art+Gallery/@53.9601841,-1.0824546,16z/data=!4m15!1m8!3m7!1s0x4878c340e19865f1:0x4774ab898a54e4d1!2sYork,+UK!3b1!8m2!3d53.9614205!4d-1.0739108!16zL20vMDg4Y3A!3m5!1s0x487931a70a5f7149:0x2e8e74145c383aff!8m2!3d53.9628983!4d-1.0860263!16s%2Fm%2F03cfb92?hl=en&authuser=1&entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D",
      },
    ];

    for (const details of expectedDetails) {
      expect(starterMemories.find((item) => item.id === details.id)).toMatchObject(
        details,
      );
    }
  });

  it("does not assign default tags to starter albums", () => {
    for (const memory of starterMemories) {
      expect(memory.tags).toEqual([]);
    }
  });
});
