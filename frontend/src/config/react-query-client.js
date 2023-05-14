import { QueryClient } from "@tanstack/react-query";

const reactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
      retry: 0,
      suspense: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const invalidateQuery = (queryKey) =>
  reactQueryClient.invalidateQueries({ queryKey });

export default reactQueryClient;
