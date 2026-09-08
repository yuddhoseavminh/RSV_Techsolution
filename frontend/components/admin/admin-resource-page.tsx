"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Pencil, Plus, RefreshCw, Save, Search, Trash2, X } from "lucide-react";
import { adminResourceConfigs, type AdminField, type AdminOption, type AdminRecord } from "@/lib/admin-resources";
import { apiClient, apiMessage } from "@/lib/api-client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type RelationOptions = Record<string, AdminOption[]>;

function extractRows(payload: unknown): AdminRecord[] {
  if (Array.isArray(payload)) {
    return payload as AdminRecord[];
  }

  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;

    if (Array.isArray(record.data)) {
      return record.data as AdminRecord[];
    }
  }

  return [];
}

function readKey(record: AdminRecord, key: string) {
  return record[key];
}

function fieldValue(field: AdminField, record: AdminRecord | null) {
  if (!record) {
    return field.defaultValue ?? (field.type === "checkbox" ? false : "");
  }

  return field.getValue ? field.getValue(record) : readKey(record, field.name);
}

function toArray(value: unknown) {
  return Array.isArray(value) ? value : [];
}

function toInputString(value: unknown, type?: string) {
  if (value === null || value === undefined) {
    return "";
  }

  if (type === "date") {
    return String(value).slice(0, 10);
  }

  if (type === "datetime-local") {
    return String(value).slice(0, 16);
  }

  if (Array.isArray(value)) {
    return value.join("\n");
  }

  return String(value);
}

function toDisplay(value: unknown) {
  if (value === null || value === undefined || value === "") {
    return "None";
  }

  if (Array.isArray(value)) {
    return value.length ? value.join(", ") : "None";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  return String(value);
}

function optionValue(value: FormDataEntryValue | string | number | null) {
  return value === null ? "" : String(value);
}

function readOptionLabel(record: AdminRecord, key: string) {
  const value = record[key];

  if (value === null || value === undefined) {
    return "";
  }

  return String(value);
}

function parseScalar(value: FormDataEntryValue | null, field: AdminField) {
  const raw = value === null ? "" : String(value);

  if (raw === "") {
    if (field.omitIfBlank) {
      return undefined;
    }

    return field.nullable ? null : "";
  }

  if (field.type === "number" || field.valueType === "number" || field.relation?.valueType === "number") {
    return Number(raw);
  }

  return raw;
}

function parsePayload(formData: FormData, fields: AdminField[]) {
  return fields.reduce<Record<string, unknown>>((payload, field) => {
    let value: unknown;

    if (field.type === "checkbox") {
      value = formData.get(field.name) === "on";
    } else if (field.type === "multiselect") {
      const values = formData.getAll(field.name).map(String).filter(Boolean);
      value =
        field.valueType === "number" || field.relation?.valueType === "number"
          ? values.map((item) => Number(item))
          : values;
    } else if (field.type === "array") {
      const raw = String(formData.get(field.name) ?? "");
      value = raw
        .split(/[\n,]/)
        .map((item) => item.trim())
        .filter(Boolean);
    } else {
      value = parseScalar(formData.get(field.name), field);
    }

    if (value !== undefined) {
      payload[field.name] = value;
    }

    return payload;
  }, {});
}

export function AdminResourcePage({ resourceKey }: { resourceKey: string }) {
  const config = adminResourceConfigs[resourceKey];
  const [rows, setRows] = useState<AdminRecord[]>([]);
  const [relations, setRelations] = useState<RelationOptions>({});
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editing, setEditing] = useState<AdminRecord | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const allowCreate = config?.allowCreate !== false;
  const allowEdit = config?.allowEdit !== false;
  const allowDelete = config?.allowDelete !== false;

  const relationFields = useMemo(() => config?.fields.filter((field) => field.relation) ?? [], [config]);

  const loadRows = useCallback(async () => {
    if (!config) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({ per_page: "50" });

      if (search.trim()) {
        params.set("search", search.trim());
      }

      const payload = await apiClient<unknown>(`${config.endpoint}?${params.toString()}`);
      setRows(extractRows(payload));
    } catch (requestError) {
      setError(apiMessage(requestError));
    } finally {
      setIsLoading(false);
    }
  }, [config, search]);

  const loadRelations = useCallback(async () => {
    if (!config || relationFields.length === 0) {
      return;
    }

    const nextRelations: RelationOptions = {};

    await Promise.all(
      relationFields.map(async (field) => {
        const relation = field.relation;

        if (!relation) {
          return;
        }

        const params = new URLSearchParams({ per_page: "100" });
        const payload = await apiClient<unknown>(`${relation.endpoint}?${params.toString()}`);
        const relationRows = extractRows(payload);
        nextRelations[field.name] = relationRows.map((record) => ({
          label: readOptionLabel(record, relation.labelKey ?? "name") || readOptionLabel(record, "email") || String(record.id ?? ""),
          value:
            relation.valueType === "string"
              ? String(readKey(record, relation.valueKey ?? "id"))
              : Number(readKey(record, relation.valueKey ?? "id"))
        }));
      })
    );

    setRelations(nextRelations);
  }, [config, relationFields]);

  useEffect(() => {
    void loadRows();
  }, [loadRows]);

  useEffect(() => {
    void loadRelations().catch((requestError) => setError(apiMessage(requestError)));
  }, [loadRelations]);

  if (!config) {
    return <p className="text-sm text-slate-600">Unknown admin module.</p>;
  }

  const openCreateForm = () => {
    setEditing(null);
    setFormOpen(true);
    setError(null);
    setSuccess(null);
  };

  const openEditForm = (record: AdminRecord) => {
    setEditing(record);
    setFormOpen(true);
    setError(null);
    setSuccess(null);
  };

  const closeForm = () => {
    setEditing(null);
    setFormOpen(false);
    setError(null);
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = parsePayload(new FormData(event.currentTarget), config.fields);
      const id = editing?.id;
      await apiClient<unknown>(editing ? `${config.endpoint}/${id}` : config.endpoint, {
        method: editing ? "PUT" : "POST",
        body: JSON.stringify(payload)
      });
      setSuccess(editing ? "Record updated." : "Record created.");
      closeForm();
      await loadRows();
      await loadRelations();
    } catch (requestError) {
      setError(apiMessage(requestError));
    } finally {
      setIsSaving(false);
    }
  };

  const deleteRecord = async (record: AdminRecord) => {
    const name = String(record.name ?? record.title ?? record.invoice_number ?? record.email ?? record.id);

    if (!window.confirm(`Delete ${name}?`)) {
      return;
    }

    setError(null);
    setSuccess(null);

    try {
      await apiClient<unknown>(`${config.endpoint}/${record.id}`, { method: "DELETE" });
      setSuccess("Record deleted.");
      await loadRows();
    } catch (requestError) {
      setError(apiMessage(requestError));
    }
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">{config.title}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{config.description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={() => void loadRows()}>
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          {allowCreate ? (
            <Button onClick={openCreateForm}>
              <Plus className="h-4 w-4" />
              New
            </Button>
          ) : null}
        </div>
      </div>

      <Card className="p-4">
        <form
          className="flex flex-col gap-3 md:flex-row md:items-center"
          onSubmit={(event) => {
            event.preventDefault();
            void loadRows();
          }}
        >
          <label className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="pl-10"
              placeholder={config.searchPlaceholder ?? "Search records"}
            />
          </label>
          <Button type="submit" variant="secondary">
            Search
          </Button>
        </form>
      </Card>

      {error ? <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}
      {success ? <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div> : null}

      {formOpen ? (
        <Card className="p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">{editing ? "Edit Record" : "New Record"}</h2>
              <p className="mt-1 text-sm text-slate-600">Fields are saved directly to the Laravel API.</p>
            </div>
            <Button type="button" variant="ghost" size="sm" onClick={closeForm}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <form className="grid gap-4" onSubmit={(event) => void submitForm(event)}>
            <div className="grid gap-4 md:grid-cols-2">
              {config.fields.map((field) => {
                const value = fieldValue(field, editing);
                const isRequired = field.required || (!editing && field.requiredOnCreate);
                const options = field.options ?? relations[field.name] ?? [];

                if (field.type === "textarea" || field.type === "array") {
                  return (
                    <label key={field.name} className="grid gap-2 md:col-span-2">
                      <span className="text-sm font-medium text-slate-700">{field.label}</span>
                      <Textarea
                        name={field.name}
                        rows={field.rows ?? (field.type === "array" ? 4 : undefined)}
                        defaultValue={toInputString(value, field.type)}
                        placeholder={field.placeholder}
                        required={isRequired}
                      />
                    </label>
                  );
                }

                if (field.type === "select") {
                  return (
                    <label key={field.name} className="grid gap-2">
                      <span className="text-sm font-medium text-slate-700">{field.label}</span>
                      <select
                        name={field.name}
                        defaultValue={optionValue(value as string | number | null)}
                        required={isRequired}
                        className="h-11 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
                      >
                        {field.nullable ? <option value="">None</option> : null}
                        {options.map((option) => (
                          <option key={`${field.name}-${option.value}`} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  );
                }

                if (field.type === "multiselect") {
                  const selected = new Set(toArray(value).map(String));

                  return (
                    <label key={field.name} className="grid gap-2 md:col-span-2">
                      <span className="text-sm font-medium text-slate-700">{field.label}</span>
                      <select
                        name={field.name}
                        multiple
                        defaultValue={Array.from(selected)}
                        className="min-h-32 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
                      >
                        {options.map((option) => (
                          <option key={`${field.name}-${option.value}`} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  );
                }

                if (field.type === "checkbox") {
                  return (
                    <label key={field.name} className="flex h-11 items-center gap-3 rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700">
                      <input name={field.name} type="checkbox" defaultChecked={Boolean(value)} className="h-4 w-4 rounded border-slate-300" />
                      {field.label}
                    </label>
                  );
                }

                return (
                  <label key={field.name} className="grid gap-2">
                    <span className="text-sm font-medium text-slate-700">{field.label}</span>
                    <Input
                      name={field.name}
                      type={field.type ?? "text"}
                      defaultValue={toInputString(value, field.type)}
                      placeholder={field.placeholder}
                      required={isRequired}
                      min={field.min}
                      max={field.max}
                      step={field.step}
                    />
                  </label>
                );
              })}
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              <Button type="button" variant="outline" onClick={closeForm}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                <Save className="h-4 w-4" />
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Card>
      ) : null}

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                {config.columns.map((column) => (
                  <th key={column.label} className="px-5 py-4 font-semibold">
                    {column.label}
                  </th>
                ))}
                {(allowEdit || allowDelete) && <th className="w-36 px-5 py-4 text-right font-semibold">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {isLoading ? (
                <tr>
                  <td className="px-5 py-8 text-center text-slate-500" colSpan={config.columns.length + 1}>
                    Loading records...
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td className="px-5 py-8 text-center text-slate-500" colSpan={config.columns.length + 1}>
                    No records found.
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={String(row.id)} className="bg-white">
                    {config.columns.map((column) => {
                      const value = toDisplay(column.value(row));

                      return (
                        <td key={`${row.id}-${column.label}`} className="max-w-[320px] truncate px-5 py-4 text-slate-700">
                          {column.badge ? <Badge className="bg-slate-50 text-slate-700">{value}</Badge> : value}
                        </td>
                      );
                    })}
                    {(allowEdit || allowDelete) && (
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          {allowEdit ? (
                            <Button type="button" variant="outline" size="sm" onClick={() => openEditForm(row)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                          ) : null}
                          {allowDelete ? (
                            <Button type="button" variant="outline" size="sm" onClick={() => void deleteRecord(row)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          ) : null}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
