import axios from "axios";
import { getCookie } from "cookies-next";

const apiFetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL,
});

// Before Send Request
apiFetch.interceptors.request.use(
  (request) => {
    const token = getCookie("tokenLotto");
    request.headers["x-access-token"] = token;
    request.headers["x-platform"] = "WEB";
    request.headers["Accept-Language"] = "TH";
    request.headers["Content-Type"] = "application/json";
    request.headers["Content-Type"] = "application/x-www-form-urlencoded";
    request.headers["x-access-login-application"] = "WEB";
    request.headers.Authorization = `Bearer ${token}`;
    return request;
  },
  (error) => {
    return error;
  }
);

// Before Accept Response
apiFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error;
  }
);
export default apiFetch;
