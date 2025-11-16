import { FilterProvider } from "@/contexts/FilterContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRoutes } from "./AppRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <FilterProvider>
      <AppRoutes />
    </FilterProvider>
  </QueryClientProvider >
);
