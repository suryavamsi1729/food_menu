import axiosInstance from "@/config/axios";


export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
