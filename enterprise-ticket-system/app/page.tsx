import { AlertCircle, CheckCircle2, Clock3, Plus, Ticket, Users } from "lucide-react";

const stats = [
  { label: "Open Tickets", value: "24", icon: Ticket, color: "bg-brand-50 text-brand-700" },
  { label: "In Progress", value: "12", icon: Clock3, color: "bg-amber-50 text-amber-700" },
  { label: "Resolved Today", value: "8", icon: CheckCircle2, color: "bg-emerald-50 text-emerald-700" },
  { label: "Active Agents", value: "5", icon: Users, color: "bg-slate-100 text-slate-700" },
];

const tickets = [
  {
    id: "TCK-1001",
    title: "Unable to access payroll dashboard",
    requester: "Sarah Johnson",
    priority: "High",
    status: "Open",
  },
  {
    id: "TCK-1002",
    title: "Laptop VPN disconnects frequently",
    requester: "Michael Chen",
    priority: "Medium",
    status: "In Progress",
  },
  {
    id: "TCK-1003",
    title: "New employee software access request",
    requester: "Ava Patel",
    priority: "Low",
    status: "Resolved",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Ticket System</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Enterprise Ticket Management
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              This is your first visible dashboard page. Next, we will connect these cards to MongoDB using Prisma.
            </p>
          </div>

          <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700">
            <Plus className="h-4 w-4" />
            Create Ticket
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                    <p className="mt-2 text-3xl font-bold text-slate-950">{stat.value}</p>
                  </div>
                  <div className={`rounded-lg p-3 ${stat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b px-5 py-4">
              <h2 className="text-lg font-semibold text-slate-950">Recent Tickets</h2>
              <p className="text-sm text-slate-500">Sample tickets for the first dashboard screen.</p>
            </div>

            <div className="divide-y">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="grid gap-3 px-5 py-4 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <p className="text-sm font-semibold text-brand-600">{ticket.id}</p>
                    <h3 className="mt-1 font-semibold text-slate-950">{ticket.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">Requester: {ticket.requester}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      {ticket.priority}
                    </span>
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
                      {ticket.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-red-50 p-2 text-red-600">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-950">Backend Status</h2>
                <p className="text-sm text-slate-500">Foundation ready, API routes starting</p>
              </div>
            </div>

            <ol className="mt-5 space-y-3 text-sm text-slate-600">
              <li>1. Prisma schema is ready.</li>
              <li>2. MongoDB env is ready.</li>
              <li>3. Health API route is added.</li>
              <li>4. Ticket CRUD APIs come next.</li>
            </ol>
          </aside>
        </div>
      </section>
    </main>
  );
}