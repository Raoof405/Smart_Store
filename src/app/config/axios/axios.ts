import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { toast } from "react-toastify";

const errorHandler = async (error: AxiosError) => {
  // store.commit('SET_LOADING', false)

  const config: AxiosRequestConfig | undefined = error?.config;
  // if (error.response?.status === 401) {
  // const accessToken = await RefreshToken();
  // config.headers = {
  //     ...config.headers,
  //     Authorization: `Bearer ${accessToken}`
  // }

  // return axios(config)

  // }

  // return axios(config)
  return Promise.reject(error);
};
const requestHandler = (request: AxiosRequestConfig) => {
  //  console.log(request)
  //     if (request.headers)
  //         request.headers['Authorization'] = `Bearer ${GetAccessToken()}`;
  // return request;
};
const responseHandler = (response: AxiosResponse) => {
  return response;
};

const TOKEN =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

// const TOKEN =
//   typeof window !== "undefined" ? localStorage.getItem("token") : null;

// const API_URL = `https://smartify.raizer.me/api`;
const API_URL = `https://moccasin-chicken-532511.hostingersite.com/api`;
const axiosIns = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${TOKEN}`,
  },
});

axios.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    if (request.headers) {
      request.headers.Accept = "application/json";
      request.headers["Content-Type"] = "multipart/form-data";
      request.headers.Authorization = `Bearer ${TOKEN}`;
    } else {
      request.headers = {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${TOKEN}`,
      } as any; // Use 'as any' to bypass the type check for the headers object
    }
    return request;
  },
  (error: AxiosError) => Promise.reject(error)
);
// axiosIns.interceptors.request.use(
//   (request) => {
//     if (TOKEN) {
//       request.headers["Authorization"] = `Bearer ${TOKEN}`;
//     } else {
//       console.warn("No token found in localStorage");
//     }
//     return request;
//   },
//   (error) => Promise.reject(error)
// );

// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.message === "Network Error") {
//       toast.error("يوجد مشكلة بالاتصال بالانترنت");
//     } else if (error.response?.status === 404) {
//       toast.error("البيانات غير موجودة");
//     } else if (error.response?.status === 401) {
//       localStorage.setItem("token", "");
//       if (typeof window !== "undefined") window.location.replace("/login");
//     } else if (error.response?.status === 403) {
//       toast.error("ليس لديك صلاحية للوصول إلى هذه البيانات");
//       localStorage.setItem("token", "");
//       if (typeof window !== "undefined") window.location.replace("/login");
//     } else if (error.response?.status === 500) {
//       toast.error(error.response.data?.message || "Internal Server Error");
//     } else if (error.response?.status !== 422) {
//       toast.error("حدثت مشكلة ما ");
//     }
//     return Promise.reject(error);
//   }
// );

axiosIns.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.message === "Network Error") {
      // toast.error("يوجد مشكلة بالاتصال بالانترنت");
    } else if (error.response?.status === 404) {
      // toast.error("البيانات غير موجودة");
    } else if (error.response?.status === 401) {
      localStorage.setItem("token", "");
      if (typeof window !== "undefined") window.location.replace("/login");
      toast.error("ليس لديك صلاحية للوصول إلى هذه البيانات");
    } else if (error.response?.status === 403) {
      toast.error("ليس لديك صلاحية للوصول إلى هذه البيانات");
      localStorage.setItem("token", "");
      if (typeof window !== "undefined") window.location.replace("/login");
    } else if (error.response?.status === 500) {
      // toast.error(error.response.data?.message || "Internal Server Error");
    } else if (error.response?.status !== 422) {
      // toast.error("حدثت مشكلة ما ");
    }
    return Promise.reject(error);
  }
);

// axiosIns.interceptors.request.use(requestHandler)
// axiosIns.interceptors.response.use(responseHandler, errorHandler)

export { axiosIns };
