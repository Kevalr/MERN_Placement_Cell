import axiosClient from "../config/axios-client";

export const createStudent = (payload) =>
  axiosClient.post("students/create", payload);

export const getAllStudents = () => axiosClient.get("students");

export const getStudentById = ({ queryKey }) =>
  axiosClient.get(`students/${queryKey[1]}`);

export const updateStudent = (payload) =>
  axiosClient.put(`students/update/${payload._id}`, payload);

export const deleteStudent = (id) =>
  axiosClient.delete(`students/delete/${id}`);
