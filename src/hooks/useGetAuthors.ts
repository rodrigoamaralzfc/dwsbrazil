import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAuthors = () => {
  return useQuery({ queryKey: ["authors"], queryFn: api.getAuthors });
};
