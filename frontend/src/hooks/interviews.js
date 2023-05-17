import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createInterview,
  deleteInterview,
  getAllInterviews,
  getInterviewByID,
  updateInterview,
  getDetailedInterviews,
} from "../services/interviews";

export const useGetAllInterviews = () =>
  useQuery(["interviews"], getAllInterviews);

export const useGetInterviewByID = (id) =>
  useQuery({
    queryKey: ["interviews", id],
    queryFn: getInterviewByID,
    enabled: !!id,
  });

export const useCreateInterview = () => useMutation(createInterview);

export const useUpdateInterview = () => useMutation(updateInterview);

export const useDeleteInterview = () => useMutation(deleteInterview);

export const useGetDetailedInterviews = () =>
  useQuery(["detailed-interviews"], getDetailedInterviews);
