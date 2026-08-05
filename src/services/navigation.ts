import { API } from "@/utils/api";

const getAll = async () => {
  try {
    const response = await fetch(API.GET_ALL_NAVIGATIONS, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Failed - Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("========= Error Get All Navigations:", error);
    return null;
  }
};

const updateNavigation = async (id: string, body: any) => {
  try {
    const response = await fetch(API.UPDATE_NAVIGATION(id), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Failed - Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("========= Error Update Navigation:", error);
    return null;
  }
};

export const NavigationService = {
  getAll,
  updateNavigation,
};
