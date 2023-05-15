import { useMutation, useQuery } from "@tanstack/react-query";
import { createUser, login } from "../services/users";

export const useLoginUser = () => useMutation(login);

export const useCreateUser = () => useMutation(createUser);
