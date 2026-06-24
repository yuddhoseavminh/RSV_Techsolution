import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const metadata = {
  title: "Portal Profile"
};

export default function PortalProfilePage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">Profile</h1>
        <p className="mt-2 text-sm text-slate-600">Manage account and company contact information.</p>
      </div>
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Input defaultValue="Demo Client" />
              <Input type="email" defaultValue="client@example.com" />
              <Input defaultValue="+855 12 345 678" />
              <Input defaultValue="Acme Retail" />
            </div>
            <Button type="submit">
              <Save className="h-4 w-4" />
              Save Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
