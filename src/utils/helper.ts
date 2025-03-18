export const truncateText = (text: string, maxLength: number) => {
  if (text?.length > maxLength) {
    return text?.slice(0, maxLength) + "...";
  }
  return text;
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("de-DE").format(price);
};

export const renderCategory = (category: string, lang: string) => {
  let result = "";
  switch (category) {
    case "kitchen":
      result = lang === "vi" ? "Nhà bếp" : lang === "en" ? "Kitchen" : "台所";
      break;
    case "pet-house":
      result =
        lang === "vi"
          ? "Nhà thú cưng"
          : lang === "en"
          ? "Pet Houses"
          : "ペットハウス";
      break;
    case "fashion":
      result =
        lang === "vi"
          ? "Thời trang"
          : lang === "en"
          ? "Fashion"
          : "ファッション";
      break;
    case "home-decor":
      result =
        lang === "vi"
          ? "Trang trí nhà cửa"
          : lang === "en"
          ? "Home Decoration"
          : "ホームデコレーション";
      break;
    default:
      break;
  }
  return result;
};
