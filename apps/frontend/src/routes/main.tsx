import { createFileRoute } from "@tanstack/react-router";
import { HomeContent } from "~/components/HomeContent";

export const Route = createFileRoute("/main")({
  component: RouteComponent,
});

function RouteComponent() {
  return <HomeContent />;
}
