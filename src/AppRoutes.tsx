import { HomePage } from "@/pages/HomePage";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { Header } from "./components/Header/Header";
import { NotFoundPage } from "./pages/404";
import { PostDetailPage } from "./pages/PostDetailPage";

const WithHeaderLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<WithHeaderLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);
