"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, X } from "lucide-react";

type HeaderActionsProps = {
  activePath: string;
};

type TicketFormState = {
  title: string;
  requester: string;
  company: string;
  priority: string;
  status: string;
  owner: string;
  sla: string;
};

const initialTicketForm: TicketFormState = {
  title: "",
  requester: "",
  company: "",
  priority: "Medium",
  status: "Open",
  owner: "",
  sla: "4h left",
};

export function HeaderActions({ activePath }: HeaderActionsProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ticketForm, setTicketForm] = useState<TicketFormState>(initialTicketForm);

  const placeholder = useMemo(() => {
    switch (activePath) {
      case "/customers":
        return "Search requesters or departments...";
      case "/analytics":
        return "Search analytics via ticket query...";
      case "/security":
        return "Search protected incidents...";
      case "/settings":
        return "Search records from the dashboard...";
      default:
        return "Search tickets, users, departments...";
    }
  }, [activePath]);

  const runSearch = () => {
    const query = search.trim();
    const params = new URLSearchParams();

    if (query) {
      params.set("search", query);
    }

    router.push(`/tickets${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runSearch();
  };

  const resetModal = () => {
    setTicketForm(initialTicketForm);
    setError(null);
    setIsModalOpen(false);
  };

  const handleCreateTicket = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticketForm),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error ?? "Unable to create ticket.");
      }

      const payload = await response.json();
      resetModal();
      setSearch(payload.ticket.code);
      router.push(`/tickets?created=${payload.ticket.code}`);
      router.refresh();
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to create ticket.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form className="hidden flex-1 justify-center md:flex" onSubmit={handleSearchSubmit}>
        <div className="flex w-full max-w-md items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-500 shadow-inner shadow-slate-100">
          <Search className="h-4 w-4" />
          <input
            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            onChange={(event) => setSearch(event.target.value)}
            placeholder={placeholder}
            value={search}
          />
          <button className="rounded-lg bg-brand-600 px-3 py-1 text-xs font-semibold text-white hover:bg-brand-700" type="submit">
            Search
          </button>
        </div>
      </form>

      <div className="flex items-center gap-3">
        <button
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
          onClick={() => setIsModalOpen(true)}
          type="button"
        >
          <Plus className="h-4 w-4" />
          New Ticket
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Create ticket</p>
                <h2 className="mt-1 text-2xl font-bold text-slate-950">New Enterprise Incident</h2>
                <p className="mt-2 text-sm text-slate-500">Create a live MongoDB-backed ticket that immediately appears in the queue.</p>
              </div>
              <button className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50" onClick={resetModal} type="button">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleCreateTicket}>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
                  <span>Title</span>
                  <input
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-500"
                    onChange={(event) => setTicketForm((current) => ({ ...current, title: event.target.value }))}
                    required
                    value={ticketForm.title}
                  />
                </label>

                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>Requester</span>
                  <input
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-500"
                    onChange={(event) => setTicketForm((current) => ({ ...current, requester: event.target.value }))}
                    required
                    value={ticketForm.requester}
                  />
                </label>

                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>Department</span>
                  <input
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-500"
                    onChange={(event) => setTicketForm((current) => ({ ...current, company: event.target.value }))}
                    required
                    value={ticketForm.company}
                  />
                </label>

                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>Priority</span>
                  <select
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-500"
                    onChange={(event) => setTicketForm((current) => ({ ...current, priority: event.target.value }))}
                    value={ticketForm.priority}
                  >
                    <option>Critical</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </label>

                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>Status</span>
                  <select
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-500"
                    onChange={(event) => setTicketForm((current) => ({ ...current, status: event.target.value }))}
                    value={ticketForm.status}
                  >
                    <option>Open</option>
                    <option>Triaged</option>
                    <option>In Progress</option>
                    <option>Escalated</option>
                    <option>Monitoring</option>
                    <option>Resolved</option>
                  </select>
                </label>

                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>Owner</span>
                  <input
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-500"
                    onChange={(event) => setTicketForm((current) => ({ ...current, owner: event.target.value }))}
                    required
                    value={ticketForm.owner}
                  />
                </label>

                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>SLA</span>
                  <input
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-500"
                    onChange={(event) => setTicketForm((current) => ({ ...current, sla: event.target.value }))}
                    required
                    value={ticketForm.sla}
                  />
                </label>
              </div>

              {error && <p className="text-sm font-medium text-red-600">{error}</p>}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50" onClick={resetModal} type="button">
                  Cancel
                </button>
                <button className="rounded-2xl bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60" disabled={isSubmitting} type="submit">
                  {isSubmitting ? "Creating..." : "Create Ticket"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}