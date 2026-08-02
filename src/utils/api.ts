export const getAll = async (url: string, lang: string) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    method: "GET",
    lang: lang,
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow" as RequestRedirect,
  };
  const res = await fetch(url, requestOptions);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.farmcode.io.vn/v1";
// const BASE_URL = 'http://localhost:8000/api/v1';

export const API = {
  // PRODUCT
  GET_ALL_PRODUCTS: `${BASE_URL}/ecoka/product`,
  CREATE_PRODUCT: `${BASE_URL}/ecoka/product/`,
  UPDATE_PRODUCT: `${BASE_URL}/ecoka/product`,
  DELETE_PRODUCT: `${BASE_URL}/ecoka/product`,
  // BLOG
  GET_ALL_BLOGS: `${BASE_URL}/ecoka/blog`,
  GET_BLOG_BY_ID: `${BASE_URL}/ecoka/blog`,
  // ACCOUNT
  GET_ALL_ACCOUNTS: `${BASE_URL}/inanhtructuyen/account/`,
  // ORDER
  GET_ALL_ORDERS: `${BASE_URL}/inanhtructuyen/order/`,
  UPDATE_ORDER: `${BASE_URL}/inanhtructuyen/order`,
  DOWNLOAD_IMAGE: `${BASE_URL}/inanhtructuyen/download/`,
  // ESG
  GET_ALL_ESG: `${BASE_URL}/ecoka/esg`,
  UPDATE_ESG: `${BASE_URL}/ecoka/esg`,
  // ENTERPRISE
  GET_ALL_ENTERPRISE: `${BASE_URL}/ecoka/enterprise`,
  UPDATE_ENTERPRISE: `${BASE_URL}/ecoka/enterprise`,
  // ABOUT US
  GET_ALL_ABOUT: `${BASE_URL}/ecoka/about`,
  // CERTIFICATE
  GET_ALL_CERTIFICATES: `${BASE_URL}/ecoka/certificate`,
};

/**
 * Lấy danh sách từ API portal.
 * - Trả về mảng (có thể rỗng) khi gọi thành công.
 * - Trả về null khi KHÔNG gọi được API.
 * Phân biệt hai trường hợp này rất quan trọng: "admin chưa nhập gì" phải khác
 * với "API lỗi", nếu không trang sẽ hiển thị dữ liệu cũ hardcode và lệch hẳn
 * với những gì admin nhìn thấy.
 */
const fetchList = async (url: string): Promise<any[] | null> => {
  try {
    const res = await fetch(url, { method: "GET", cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Failed - Status: ${res.status}`);
    }
    const json = await res.json();
    return Array.isArray(json?.data) ? json.data : [];
  } catch (error: any) {
    // Next.js dùng exception để báo hiệu route phải render động,
    // nuốt lỗi này sẽ khiến trang bị prerender với dữ liệu rỗng.
    if (error?.digest === "DYNAMIC_SERVER_USAGE") {
      throw error;
    }
    console.error("========= Error fetching:", url, error);
    return null;
  }
};

export const AboutService = {
  get: async () => {
    const data = await fetchList(API.GET_ALL_ABOUT);
    return data && data.length > 0 ? data[0] : null;
  },
};

export const CertificateService = {
  getAll: async (): Promise<any[] | null> => {
    const data = await fetchList(API.GET_ALL_CERTIFICATES);
    if (data === null) return null;
    return data.filter((item: any) => item?.show_status !== "not show");
  },
};
