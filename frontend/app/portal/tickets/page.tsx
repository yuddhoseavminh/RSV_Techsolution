import { Plus } from "lucide-react";
import { DataTable } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const metadata = {
  title: "Portal Tickets"
};

export default function PortalTicketsPage() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Support Tickets</h1>
          <p className="mt-2 text-sm text-slate-600">Open requests, follow replies, and track ticket status.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          New Ticket
        </Button>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <DataTable
          columns={["Subject", "Project", "Priority", "Status"]}
          rows={[
            ["Need cashier role access", "Retail POS Suite", "Medium", "Open"],
            ["Receipt template update", "Retail POS Suite", "Low", "Waiting"],
            ["Stock report question", "Inventory Control", "Medium", "Resolved"]
          ]}
        />
        <Card>
          <CardHeader>
            <CardTitle>Open Ticket</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <Input placeholder="Subject" />
              <select className="h-11 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100" defaultValue="">
                <option value="" disabled>
                  Priority
                </option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
              <Textarea placeholder="Description" />
              <Button type="submit">Submit Ticket</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
