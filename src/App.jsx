import { Routes, Route } from "react-router-dom";
import SubmitIdea from "./pages/SubmitIdea";
import Dashboard from "./pages/Dashboard";
import IdeaDetail from "./pages/IdeaDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SubmitIdea />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/ideas/:id" element={<IdeaDetail />} />
    </Routes>
  );
}
