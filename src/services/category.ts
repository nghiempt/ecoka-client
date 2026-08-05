import { API } from "@/utils/api";

const getAll = async () => {
  try {
    const response = await API.get(`/ecoka/category`);
    return response?.data;
  } catch (error) {
    console.log("GET ALL CATEGORIES ERROR", error);
    return null;
  }
};

export const CategoryService = {
  getAll,
};
