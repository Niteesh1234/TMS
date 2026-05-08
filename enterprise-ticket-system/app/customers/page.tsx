import { CustomersInteractive } from "../../components/customers-interactive";
import { DashboardShell } from "../../components/dashboard-shell";
import { getDashboardData } from "../../lib/dashboard";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
  const data = await getDashboardData();

  return (
    <DashboardShell
      activePath="/customers"
      eyebrow="Customer Operations"
      title="Customer & Department View"
      description="Track the internal requesters and departments currently represented in the service queue."
      connectionNote={`Rendering ${data.tickets.length} customer-facing records derived from live tickets.`}
    >
      <CustomersInteractive tickets={data.tickets} />
    </DashboardShell>
  );
}