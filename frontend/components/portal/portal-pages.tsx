"use client";

import { FormEvent, useEffect, useState } from "react";
import { CreditCard, FolderKanban, LifeBuoy, Plus, Save, TrendingUp } from "lucide-react";
import { useAuth, type AuthUser } from "@/components/auth/auth-provider";
import { DataTable } from "@/components/admin/data-table";
import { MetricCard } from "@/components/admin/metric-card";
import { apiClient, apiMessage } from "@/lib/api-client";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type PortalProject = {
  id: number;
  name: string;
  code?: string | null;
  description?: string | null;
  type?: string;
  status?: string;
  priority?: string;
  progress?: number;
  client?: string | null;
};

type PortalInvoice = {
  id: number;
  invoice_number: string;
  status: string;
  total: number | string;
  due_at?: string | null;
  project?: string | null;
};

type PortalTicket = {
  id: number;
  subject: string;
  description?: string;
  priority: string;
  status: string;
  project?: string | null;
};

type PortalDashboardData = {
  projects: number;
  active_projects: number;
  open_tickets: number;
  unpaid_invoices: number;
  recent_projects: PortalProject[];
};

function extractRows<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) {
    return payload as T[];
  }

  if (payload && typeof payload === "object" && Array.isArray((payload as { data?: unknown }).data)) {
    return (payload as { data: T[] }).data;
  }

  return [];
}

function Alert({ type, message }: { type: "error" | "success"; message: string | null }) {
  if (!message) {
    return null;
  }

  const className =
    type === "error"
      ? "rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
      : "rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700";

  return <div className={className}>{message}</div>;
}

export function PortalDashboard() {
  const [data, setData] = useState<PortalDashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setData(await apiClient<PortalDashboardData>("/portal/dashboard"));
      } catch (requestError) {
        setError(apiMessage(requestError));
      } finally {
        setIsLoading(false);
      }
    }

    void load();
  }, []);

  const recentProjects = data?.recent_projects ?? [];
  const averageProgress = recentProjects.length
    ? Math.round(recentProjects.reduce((total, project) => total + Number(project.progress ?? 0), 0) / recentProjects.length)
    : 0;

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">Dashboard</h1>
        <p className="mt-2 text-sm text-slate-600">Track active work, invoices, support, and project progress.</p>
      </div>
      <Alert type="error" message={error} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Active Projects" value={isLoading ? "..." : String(data?.active_projects ?? 0)} trend={`${data?.projects ?? 0} total`} icon={FolderKanban} />
        <MetricCard label="Open Tickets" value={isLoading ? "..." : String(data?.open_tickets ?? 0)} trend="Support requests" icon={LifeBuoy} />
        <MetricCard label="Unpaid Invoices" value={isLoading ? "..." : String(data?.unpaid_invoices ?? 0)} trend="Pending payment" icon={CreditCard} />
        <MetricCard label="Average Progress" value={isLoading ? "..." : `${averageProgress}%`} trend="Recent projects" icon={TrendingUp} />
      </div>
      <DataTable
        columns={["Project", "Category", "Status", "Progress"]}
        rows={recentProjects.map((project) => [
          project.name,
          project.type ?? "Project",
          project.status ?? "planning",
          `${project.progress ?? 0}%`
        ])}
      />
    </div>
  );
}

export function PortalProjects() {
  const [projects, setProjects] = useState<PortalProject[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setProjects(extractRows<PortalProject>(await apiClient<unknown>("/portal/projects?per_page=20")));
      } catch (requestError) {
        setError(apiMessage(requestError));
      }
    }

    void load();
  }, []);

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">Projects</h1>
        <p className="mt-2 text-sm text-slate-600">Review status, progress, scope, and technology stack.</p>
      </div>
      <Alert type="error" message={error} />
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <div className="mb-4 flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-brand-blue">
                  <FolderKanban className="h-5 w-5" />
                </span>
                <Badge>{project.status}</Badge>
              </div>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.description ?? project.client ?? "Project details"}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-600">Progress</span>
                <span className="font-semibold text-slate-950">{project.progress ?? 0}%</span>
              </div>
              <div className="h-2 rounded-md bg-slate-100">
                <div className="h-2 rounded-md bg-brand-blue" style={{ width: `${project.progress ?? 0}%` }} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function PortalInvoices() {
  const [invoices, setInvoices] = useState<PortalInvoice[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setInvoices(extractRows<PortalInvoice>(await apiClient<unknown>("/portal/invoices?per_page=20")));
      } catch (requestError) {
        setError(apiMessage(requestError));
      }
    }

    void load();
  }, []);

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">Invoice History</h1>
        <p className="mt-2 text-sm text-slate-600">View issued, paid, overdue, and upcoming invoices.</p>
      </div>
      <Alert type="error" message={error} />
      <DataTable
        columns={["Invoice", "Project", "Total", "Status"]}
        rows={invoices.map((invoice) => [
          invoice.invoice_number,
          invoice.project ?? "None",
          formatCurrency(Number(invoice.total)),
          invoice.status
        ])}
      />
    </div>
  );
}

export function PortalTickets() {
  const [tickets, setTickets] = useState<PortalTicket[]>([]);
  const [projects, setProjects] = useState<PortalProject[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadTickets = async () => {
    setTickets(extractRows<PortalTicket>(await apiClient<unknown>("/portal/tickets?per_page=20")));
  };

  useEffect(() => {
    async function load() {
      try {
        const [ticketPayload, projectPayload] = await Promise.all([
          apiClient<unknown>("/portal/tickets?per_page=20"),
          apiClient<unknown>("/portal/projects?per_page=50")
        ]);
        setTickets(extractRows<PortalTicket>(ticketPayload));
        setProjects(extractRows<PortalProject>(projectPayload));
      } catch (requestError) {
        setError(apiMessage(requestError));
      }
    }

    void load();
  }, []);

  const submitTicket = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const projectId = String(formData.get("project_id") ?? "");

    try {
      await apiClient<unknown>("/portal/tickets", {
        method: "POST",
        body: JSON.stringify({
          subject: String(formData.get("subject") ?? ""),
          project_id: projectId ? Number(projectId) : null,
          priority: String(formData.get("priority") ?? "medium"),
          description: String(formData.get("description") ?? "")
        })
      });
      form.reset();
      setMessage("Ticket opened.");
      await loadTickets();
    } catch (requestError) {
      setError(apiMessage(requestError));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Support Tickets</h1>
          <p className="mt-2 text-sm text-slate-600">Open requests, follow replies, and track ticket status.</p>
        </div>
        <Button type="button" onClick={() => document.getElementById("ticket-subject")?.focus()}>
          <Plus className="h-4 w-4" />
          New Ticket
        </Button>
      </div>
      <Alert type="error" message={error} />
      <Alert type="success" message={message} />
      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <DataTable
          columns={["Subject", "Project", "Priority", "Status"]}
          rows={tickets.map((ticket) => [ticket.subject, ticket.project ?? "None", ticket.priority, ticket.status])}
        />
        <Card>
          <CardHeader>
            <CardTitle>Open Ticket</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={(event) => void submitTicket(event)}>
              <Input id="ticket-subject" name="subject" placeholder="Subject" required />
              <select
                name="project_id"
                className="h-11 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
                defaultValue=""
              >
                <option value="">No project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
              <select
                name="priority"
                className="h-11 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
                defaultValue="medium"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
              <Textarea name="description" placeholder="Description" required />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Ticket"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function PortalProfile() {
  const { user, setUser } = useAuth();
  const [profile, setProfile] = useState<AuthUser | null>(user);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setProfile(await apiClient<AuthUser>("/portal/profile"));
      } catch (requestError) {
        setError(apiMessage(requestError));
      }
    }

    void load();
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setMessage(null);

    const formData = new FormData(event.currentTarget);

    try {
      const updated = await apiClient<AuthUser>("/portal/profile", {
        method: "PUT",
        body: JSON.stringify({
          name: String(formData.get("name") ?? ""),
          email: String(formData.get("email") ?? ""),
          phone: String(formData.get("phone") ?? ""),
          company: String(formData.get("company") ?? "")
        })
      });
      setProfile(updated);
      setUser(updated);
      setMessage("Profile saved.");
    } catch (requestError) {
      setError(apiMessage(requestError));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">Profile</h1>
        <p className="mt-2 text-sm text-slate-600">Manage account and company contact information.</p>
      </div>
      <Alert type="error" message={error} />
      <Alert type="success" message={message} />
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={(event) => void submit(event)}>
            <div className="grid gap-4 md:grid-cols-2">
              <Input name="name" defaultValue={profile?.name ?? ""} placeholder="Name" required />
              <Input name="email" type="email" defaultValue={profile?.email ?? ""} placeholder="Email" required />
              <Input name="phone" defaultValue={profile?.phone ?? ""} placeholder="Phone" />
              <Input name="company" defaultValue={profile?.company ?? ""} placeholder="Company" />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              <Save className="h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
