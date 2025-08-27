import Cookies from 'js-cookie';
import axios from "axios";

// axios インスタンス作成
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

// リクエスト前に CSRF トークン作成
axiosInstance.interceptors.request.use(config => {
  const token = Cookies.get('XSRF-TOKEN');
  if (token) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
  }
  return config;
});

export default axiosInstance;
