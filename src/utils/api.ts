export const BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://api.farmcode.io.vn/v1";

export const API = {
    GET_ALL_PRODUCTS: `${BASE_URL}/ecoka/product`,
    GET_ALL_BLOGS: `${BASE_URL}/ecoka/blog`,
    GET_ALL_ESG: `${BASE_URL}/ecoka/esg`,
    GET_ALL_ENTERPRISE: `${BASE_URL}/ecoka/enterprise`,
    GET_ALL_ABOUT: `${BASE_URL}/ecoka/about`,
    GET_ALL_CERTIFICATES: `${BASE_URL}/ecoka/certificate`,
};

export const getAll = async (url: string, lang: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
        method: "GET",
        lang: lang
    });
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow" as RequestRedirect
    };
    const res = await fetch(url, requestOptions);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
};

/**
 * Lấy danh sách từ API portal. Trả về [] khi lỗi để trang vẫn render bình thường.
 */
const fetchList = async (url: string): Promise<any[]> => {
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
        return [];
    }
};

export const AboutService = {
    get: async () => {
        const data = await fetchList(API.GET_ALL_ABOUT);
        return data.length > 0 ? data[0] : null;
    },
};

export const CertificateService = {
    getAll: async () => {
        const data = await fetchList(API.GET_ALL_CERTIFICATES);
        return data.filter((item: any) => item?.show_status !== "not show");
    },
};
