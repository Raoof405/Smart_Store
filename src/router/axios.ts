// import { Axios } from "axios";
// import { toast } from "react-hot-toast";
// const TOKEN =
//   typeof window !== "undefined" ? localStorage.getItem("token") : null;
// //http://192.168.137.1/projects/real-estate/public/api
// //http://localhost/Real-estate/public/api
// const axios = Axios.create({
//   baseURL: "http://localhost/Real-estate/public/api",
// });
// axios.interceptors.request.use(
//   (request) => {
//     request.headers = {
//       Accept: "application/json",
//       "Content-Type": "multipart/form-data",
//       Authorization: `Bearer ${TOKEN}`,
//     };
//     return request;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );
// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.message === "Network Error") {
//       toast.error("يوجد مشكلة بالاتصال بالانترنت");
//     } else if (+error?.response?.status === 404) {
//       //404
//       toast.error("البيانات غير موجودة");
//     } else if (+error?.response?.status === 401) {
//       //401
//       localStorage.token = "";
//       if (typeof window !== "undefined") window.location.replace("/login");
//     } else if (+error?.response?.status === 403) {
//       //403
//       toast.error("ليس لديك صلاحية للوصول إلى هذه البيانات");
//       localStorage.token = "";
//       if (typeof window !== "undefined") window.location.replace("/login");
//     } else if (+error?.response?.status === 500) {
//       //500
//       toast.error(error?.response?.data?.message);
//     } else if (+error?.response?.status === 422) {
//       //422
//     } else toast.error("حدثت مشكلة ما ");
//     return Promise.reject(error);
//   }
// );

// export default axios;

import Axios, {
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { toast } from "react-hot-toast";

const TOKEN =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

const axios = Axios.create({
  baseURL: "https://smartify.raizer.me/api",
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
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

axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.message === "Network Error") {
      toast.error("يوجد مشكلة بالاتصال بالانترنت");
    } else if (error.response?.status === 404) {
      toast.error("البيانات غير موجودة");
    } else if (error.response?.status === 401) {
      localStorage.setItem("token", "");
      if (typeof window !== "undefined") window.location.replace("/login");
    } else if (error.response?.status === 403) {
      toast.error("ليس لديك صلاحية للوصول إلى هذه البيانات");
      localStorage.setItem("token", "");
      if (typeof window !== "undefined") window.location.replace("/login");
    } else if (error.response?.status === 500) {
      // toast.error(error.response.data?.message || "Internal Server Error");
    } else if (error.response?.status !== 422) {
      toast.error("حدثت مشكلة ما ");
    }
    return Promise.reject(error);
  }
);

export default axios;
