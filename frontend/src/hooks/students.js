import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from "../services/students";

export const useGetAllStudents = () => useQuery(["students"], getAllStudents);

export const useGetStuentById = (id) =>
  useQuery({
    queryKey: ["students", id],
    queryFn: getStudentById,
    enabled: !!id,
  });

export const useCreateStudent = () => useMutation(createStudent);

export const useUpdateStudent = () => useMutation(updateStudent);

export const useDeleteStudent = () => useMutation(deleteStudent);
