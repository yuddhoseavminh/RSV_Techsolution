"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  ExternalLink,
  Image as ImageIcon,
  Loader2,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  Upload
} from "lucide-react";
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

  return Object.entries(payload as Record<string, Record<string, unknown>>).reduce<SettingsData>(
    (groups, [group, settings]) => {
      groups[group] = Object.entries(settings ?? {}).reduce<Record<string, string>>((items, [key, value]) => {
        items[key] = valueToString(value);
        return items;
      }, {});
      return groups;
    },
    {}
  );
}

export function AdminSettings() {
  const [settings, setSettings] = useState<SettingsData>({});
  const [newGroup, setNewGroup] = useState("company");
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleLogoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Client-side validate size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError("Logo file size cannot exceed 5MB.");
      return;
    }

    setIsUploadingLogo(true);
    setError(null);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("logo", file);

      const response = await apiClient<{ url: string }>("/admin/settings/logo", {
        method: "POST",
        body: formData
      });

      if (response?.url) {
        updateValue("company", "logo", response.url);
        setMessage("Company logo uploaded successfully!");
      }
    } catch (requestError) {
      setError(apiMessage(requestError));
    } finally {
      setIsUploadingLogo(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveLogo = () => {
    updateValue("company", "logo", "");
    setMessage("Logo removed. Click 'Save Settings' to apply changes.");
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
      setMessage("Settings updated successfully.");
    } catch (requestError) {
      setError(apiMessage(requestError));
    } finally {
      setIsSaving(false);
    }
  };

  const companyLogo = settings.company?.logo || "";

  return (
    <div className="grid gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Settings</h1>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
            Manage company profile, brand logo, SEO defaults, and social links.
          </p>
        </div>
        <Button variant="outline" onClick={() => void loadSettings()} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Alerts */}
      {error ? (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      ) : null}
      {message ? (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>{message}</span>
        </div>
      ) : null}

      <form className="grid gap-6" onSubmit={(event) => void saveSettings(event)}>
        {isLoading ? (
          <Card className="flex items-center justify-center p-12 text-sm text-slate-500">
            <Loader2 className="mr-2 h-5 w-5 animate-spin text-blue-600" />
            Loading settings...
          </Card>
        ) : (
          <>
            {/* Company Settings Card (with Logo Upload) */}
            <Card className="p-6 border-slate-200 shadow-xs">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-950">Company Profile & Brand Logo</h2>
                  <p className="text-xs text-slate-500">Update company identity, logo branding, and contact details.</p>
                </div>
              </div>

              {/* Logo Upload Section */}
              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Company Logo</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Upload your official company logo. Recommended format: SVG, PNG, WebP, or JPG (max 5MB).
                </p>

                <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center">
                  {/* Logo Preview */}
                  <div className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-300 bg-white p-2 shadow-xs transition hover:border-slate-400">
                    {companyLogo ? (
                      <img
                        src={companyLogo}
                        alt="Company Logo Preview"
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          // Handle broken image fallback
                          (e.target as HTMLImageElement).src = "";
                        }}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-1 text-slate-400">
                        <ImageIcon className="h-8 w-8 stroke-[1.5]" />
                        <span className="text-[10px] font-medium text-slate-400">No Logo</span>
                      </div>
                    )}

                    {isUploadingLogo && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-xs">
                        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                      </div>
                    )}
                  </div>

                  {/* Upload Controls */}
                  <div className="flex flex-1 flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
                        className="hidden"
                        onChange={handleLogoUpload}
                        id="company-logo-upload"
                      />
                      <Button
                        type="button"
                        variant="default"
                        size="sm"
                        disabled={isUploadingLogo}
                        onClick={() => fileInputRef.current?.click()}
                        className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {isUploadingLogo ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Upload className="h-4 w-4" />
                        )}
                        <span>{companyLogo ? "Change Logo" : "Upload Logo"}</span>
                      </Button>

                      {companyLogo && (
                        <>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleRemoveLogo}
                            className="gap-1.5 text-rose-600 hover:bg-rose-50 hover:text-rose-700 border-slate-200"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Remove</span>
                          </Button>

                          <Button asChild variant="ghost" size="sm" className="gap-1.5 text-slate-500 text-xs">
                            <a href={companyLogo} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3.5 w-3.5" />
                              <span>View Full</span>
                            </a>
                          </Button>
                        </>
                      )}
                    </div>

                    {/* Logo URL Input (optional manual entry) */}
                    <div className="grid gap-1">
                      <span className="text-xs font-medium text-slate-600">Or enter Logo Image URL:</span>
                      <Input
                        value={companyLogo}
                        onChange={(e) => updateValue("company", "logo", e.target.value)}
                        placeholder="https://example.com/logo.png"
                        className="h-9 text-xs bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Information Inputs */}
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="grid gap-1.5">
                  <span className="text-sm font-medium text-slate-700">Company Name</span>
                  <Input
                    value={settings.company?.name ?? ""}
                    onChange={(e) => updateValue("company", "name", e.target.value)}
                    placeholder="e.g. KT Solution"
                  />
                </label>

                <label className="grid gap-1.5">
                  <span className="text-sm font-medium text-slate-700">Official Email</span>
                  <Input
                    type="email"
                    value={settings.company?.email ?? ""}
                    onChange={(e) => updateValue("company", "email", e.target.value)}
                    placeholder="e.g. contact@ktsolution.com"
                  />
                </label>

                <label className="grid gap-1.5">
                  <span className="text-sm font-medium text-slate-700">Phone Number</span>
                  <Input
                    value={settings.company?.phone ?? ""}
                    onChange={(e) => updateValue("company", "phone", e.target.value)}
                    placeholder="e.g. +855 12 345 678"
                  />
                </label>

                <label className="grid gap-1.5">
                  <span className="text-sm font-medium text-slate-700">Address / Location</span>
                  <Input
                    value={settings.company?.address ?? ""}
                    onChange={(e) => updateValue("company", "address", e.target.value)}
                    placeholder="e.g. Phnom Penh, Cambodia"
                  />
                </label>

                {/* Additional Company Keys */}
                {Object.entries(settings.company ?? {})
                  .filter(([key]) => !["name", "email", "phone", "address", "logo"].includes(key))
                  .map(([key, value]) => (
                    <label key={`company-${key}`} className="grid gap-1.5">
                      <span className="text-sm font-medium text-slate-700 capitalize">{key}</span>
                      <Input value={value} onChange={(e) => updateValue("company", key, e.target.value)} />
                    </label>
                  ))}
              </div>
            </Card>

            {/* Other Settings Groups (SEO, Social, etc.) */}
            {Object.entries(settings)
              .filter(([group]) => group !== "company")
              .map(([group, items]) => (
                <Card key={group} className="p-6 border-slate-200 shadow-xs">
                  <div className="border-b border-slate-100 pb-3">
                    <h2 className="text-lg font-bold capitalize text-slate-950">{group} Settings</h2>
                    <p className="text-xs text-slate-500">Configure parameters for the {group} group.</p>
                  </div>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {Object.entries(items).map(([key, value]) => (
                      <label key={`${group}-${key}`} className="grid gap-1.5">
                        <span className="text-sm font-medium text-slate-700 capitalize">
                          {key.replace(/_/g, " ")}
                        </span>
                        <Input value={value} onChange={(event) => updateValue(group, key, event.target.value)} />
                      </label>
                    ))}
                  </div>
                </Card>
              ))}

            {/* Add Custom Setting Card */}
            <Card className="p-5 border-dashed border-slate-200 bg-slate-50/50">
              <h3 className="text-sm font-semibold text-slate-900">Add Custom Setting Field</h3>
              <div className="mt-3 grid gap-3 md:grid-cols-[180px_1fr_1fr_auto]">
                <Input value={newGroup} onChange={(event) => setNewGroup(event.target.value)} placeholder="Group (e.g. company)" />
                <Input value={newKey} onChange={(event) => setNewKey(event.target.value)} placeholder="Key (e.g. tax_id)" />
                <Input value={newValue} onChange={(event) => setNewValue(event.target.value)} placeholder="Value" />
                <Button type="button" variant="outline" onClick={addSetting}>
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                disabled={isSaving || isLoading}
                className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                <span>{isSaving ? "Saving Settings..." : "Save All Settings"}</span>
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
