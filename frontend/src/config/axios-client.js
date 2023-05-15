import axios from "axios";
import { toast } from "react-toastify";

import { removeSession } from "../utils/helper";

const baseURL = "https://mern-placement-cell-backend.vercel.app/";
// const baseURL = "http://localhost:3500/";

const axiosClient = axios.create({
  baseURL,
});

axiosClient.interceptors.request.use(
  function (config) {
    const session = JSON.parse(localStorage.getItem("session")) || {};
    const accessToken = session.token;

    return {
      ...config,
      headers: {
        ...config.headers,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    };
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response.data;
  },
  function (error) {
    const config = error?.config;
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const { response: { status = null, data } = {} } = error;
    if (status === 401 && config.url !== "/auth/login") {
      removeSession();
      window.location.replace("/login");
      toast.error("Invalid Crediantials");
      return axios(config);
    } else if (status === 403) {
      toast.error("You don't have permission to perform this action");
    } else if (status === 404) {
      toast.error("Invalid Password");
    } else if (status === 409) {
      toast.error("User with this e-mail is Already exists");
    } else {
      toast.error(data?.message || "Something went wrong");
    }

    return Promise.reject(data);
  }
);

export default axiosClient;
