import axiosInstance from "./axios";

// SWR 用 fetcher(レスポンスの data.data を渡す)
const fetcher = async <T>(url: string): Promise<T> => {
  const res = await axiosInstance.get<{ data: T }>(url);
  return res.data.data;
};

export default fetcher;
