import axiosClient from "../config/axios-client";

const getAllInterviews = () => axiosClient.get("interviews");

const getInterviewByID = ({ queryKey }) =>
  axiosClient.get(`interviews/${queryKey[1]}`);

const createInterview = (payload) =>
  axiosClient.post("interviews/create", payload);

const updateInterview = (payload) => {
  console.log(payload);
  return axiosClient.put(`interviews/update/${payload.id}`, payload);
};

const deleteInterview = (id) => axiosClient.delete(`interviews/delete/${id}`);

export {
  getAllInterviews,
  getInterviewByID,
  createInterview,
  updateInterview,
  deleteInterview,
};
