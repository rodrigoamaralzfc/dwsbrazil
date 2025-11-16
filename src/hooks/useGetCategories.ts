import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  return useQuery({ queryKey: ["categories"], queryFn: api.getCategories });
};
