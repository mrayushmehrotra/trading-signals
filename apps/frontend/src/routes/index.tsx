import { createFileRoute } from "@tanstack/react-router";
import { ProtectedRoute } from "../components/ProtectedRoute";
import Dashboard from "~/components/Dashboard";

const Home = () => {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
};

export const Route = createFileRoute("/")({
  component: Home,
});
