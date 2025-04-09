export const truncateText = (text: string, maxLength: number) => {
  if (text?.length > maxLength) {
    return text?.slice(0, maxLength) + "...";
  }
  return text;
};

export const formatCurrency = (price: any, currency: any) => {

  const exchangeRates: any = {
    vi: 1,           // Giá gốc là VND
    en: 1 / 25000,   // 1 VND = 0.00004 USD
    jp: 1 / 170,     // 1 VND = 0.00588 JPY
  };

  const convertedPrice = price * exchangeRates[currency];

  switch (currency) {
    case 'vi':
      return `${Intl.NumberFormat("de-DE").format(price)} VND`;
    case 'en':
      return `${Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(convertedPrice)}`;
    case 'jp':
      return `${Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "JPY",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(convertedPrice)}`;
    default:
      return `${Intl.NumberFormat("de-DE").format(price)} VND`;
  }
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
