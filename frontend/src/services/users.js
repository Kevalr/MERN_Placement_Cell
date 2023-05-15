import axiosClient from "../config/axios-client";

const createUser = (payload) => {
  return axiosClient.post("/users/signup", payload);
};

const login = (payload) => axiosClient.post("/users/signin", payload);

export { createUser, login };
