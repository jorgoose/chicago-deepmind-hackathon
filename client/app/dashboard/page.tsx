import DashboardShell from "@/components/DashboardShell";
import SiteHeader from "@/components/SiteHeader";

export default function DashboardPage() {
  return (
    <main className="page-shell">
      <SiteHeader current="dashboard" />
      <DashboardShell />
    </main>
  );
}
