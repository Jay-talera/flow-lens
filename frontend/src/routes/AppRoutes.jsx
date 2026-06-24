import { Routes, Route } from "react-router-dom";

import DashboardPage from "../pages/DashboardPage";
import RepositoryPage from "../pages/RepositoryPage";
import PipelineDetailsPage from "../pages/PipelineDetailsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RepositoryPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/pipeline/:id" element={<PipelineDetailsPage />} />
    </Routes>
  );
}