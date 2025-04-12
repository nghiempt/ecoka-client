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

const BASE_URL = "https://api.farmcode.io.vn/v1";
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
};
