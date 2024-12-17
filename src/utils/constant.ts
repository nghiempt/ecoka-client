import { IMAGES } from "./image";

export const URL = {
  FACEBOOK: "https://www.facebook.com/ecoka.vn/",
  YOUTUBE: "https://www.youtube.com/@JessicaQuangVN",
  MAIL: "mailto:info@ecoka.vn",
  SHOPPING: "https://shopee.vn/quangchanchan",
  TIKTOK: "https://www.tiktok.com/@ecokajsc?_t=ZS-8sFo2GhzEN0&_r=1",
};

export const categories: any = [
  {
    id: 1,
    name: "Thời Trang",
    name_en: "Fashion",
    name_jp: "ファッション",
    path: "/thoi-trang",
  },
  {
    id: 2,
    name: "Nhà Bếp",
    name_en: "Kitchen",
    name_jp: "台所",
    path: "/nha-bep",
  },
  {
    id: 3,
    name: "Trang Trí Nhà Cửa",
    name_en: "Home Decoration",
    name_jp: "ホームデコレーション",
    path: "/trang-tri-nha-cua",
  },
  {
    id: 4,
    name: "Nhà Thú Cưng",
    name_en: "Pet Houses",
    name_jp: "ペットハウス",
    path: "/nha-thu-cung",
  },
];

export const languages = [
  { lang: "vi", label: "Vietnamese", flag: IMAGES?.FLAG_VI },
  { lang: "en", label: "English", flag: IMAGES?.FLAG_EN },
  { lang: "jp", label: "Japanese", flag: IMAGES?.FLAG_JP },
];
