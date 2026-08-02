import { API } from "@/utils/api";

const getAll = async () => {
  try {
    const response = await fetch(API.GET_ALL_BLOGS, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Failed - Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("========= Error Get All Blogs:", error);
    return false;
  }
};

const getBlogById = async (id: string) => {
  try {
    const response = await fetch(`${API.GET_BLOG_BY_ID}/${id}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Failed - Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("========= Error Get All Blogs:", error);
    return false;
  }
};

export const BlogService = {
  getAll,
  getBlogById,
};
