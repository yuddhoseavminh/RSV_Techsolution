"use client";

import { FormEvent, useEffect, useState } from "react";
import { Plus, RefreshCw, Save } from "lucide-react";
import { apiClient, apiMessage } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type SettingsData = Record<string, Record<string, string>>;

function valueToString(value: unknown) {
  if (value === null || value === undefined) {
    return "";
  }

  return typeof value === "object" ? JSON.stringify(value) : String(value);
}

function normalizeSettings(payload: unknown): SettingsData {
  if (!payload || typeof payload !== "object") {
    return {};
  }

  return Object.entries(payload as Record<string, Record<string, unknown>>).reduce<SettingsData>((groups, [group, settings]) => {
    groups[group] = Object.entries(settings ?? {}).reduce<Record<string, string>>((items, [key, value]) => {
      items[key] = valueToString(value);
      return items;
    }, {});
    return groups;
  }, {});
}

export function AdminSettings() {
  const [settings, setSettings] = useState<SettingsData>({});
  const [newGroup, setNewGroup] = useState("company");
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadSettings = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const payload = await apiClient<unknown>("/admin/settings");
      setSettings(normalizeSettings(payload));
    } catch (requestError) {
      setError(apiMessage(requestError));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadSettings();
  }, []);

  const updateValue = (group: string, key: string, value: string) => {
    setSettings((current) => ({
      ...current,
      [group]: {
        ...(current[group] ?? {}),
        [key]: value
      }
    }));
  };

  const addSetting = () => {
    if (!newGroup.trim() || !newKey.trim()) {
      setError("Group and key are required.");
      return;
    }

    updateValue(newGroup.trim(), newKey.trim(), newValue);
    setNewKey("");
    setNewValue("");
    setError(null);
  };

  const saveSettings = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setMessage(null);
    setError(null);

    try {
      await apiClient<null>("/admin/settings", {
        method: "PUT",
        body: JSON.stringify({ settings })
      });
      setMessage("Settings updated.");
    } catch (requestError) {
      setError(apiMessage(requestError));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Settings</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Manage company profile, SEO defaults, and social links through the API settings endpoint.
          </p>
        </div>
        <Button variant="outline" onClick={() => void loadSettings()}>
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {error ? <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}
      {message ? <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</div> : null}

      <Card className="p-5">
        <h2 className="text-lg font-semibold text-slate-950">Add Setting</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-[180px_1fr_1fr_auto]">
          <Input value={newGroup} onChange={(event) => setNewGroup(event.target.value)} placeholder="Group" />
          <Input value={newKey} onChange={(event) => setNewKey(event.target.value)} placeholder="Key" />
          <Input value={newValue} onChange={(event) => setNewValue(event.target.value)} placeholder="Value" />
          <Button type="button" onClick={addSetting}>
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
      </Card>

      <form className="grid gap-5" onSubmit={(event) => void saveSettings(event)}>
        {isLoading ? (
          <Card className="p-6 text-sm text-slate-600">Loading settings...</Card>
        ) : (
          Object.entries(settings).map(([group, items]) => (
            <Card key={group} className="p-5">
              <h2 className="text-lg font-semibold capitalize text-slate-950">{group}</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {Object.entries(items).map(([key, value]) => (
                  <label key={`${group}-${key}`} className="grid gap-2">
                    <span className="text-sm font-medium text-slate-700">{key}</span>
                    <Input value={value} onChange={(event) => updateValue(group, key, event.target.value)} />
                  </label>
                ))}
              </div>
            </Card>
          ))
        )}
        <div className="flex justify-end">
          <Button type="submit" disabled={isSaving || isLoading}>
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </form>
    </div>
  );
}
