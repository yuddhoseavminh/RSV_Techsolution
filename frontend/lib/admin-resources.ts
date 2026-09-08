export type AdminRecord = Record<string, unknown>;

export type AdminOption = {
  label: string;
  value: string | number;
};

export type AdminFieldType =
  | "text"
  | "email"
  | "password"
  | "url"
  | "number"
  | "date"
  | "datetime-local"
  | "textarea"
  | "select"
  | "multiselect"
  | "checkbox"
  | "array";

export type AdminField = {
  name: string;
  label: string;
  type?: AdminFieldType;
  required?: boolean;
  requiredOnCreate?: boolean;
  nullable?: boolean;
  omitIfBlank?: boolean;
  placeholder?: string;
  defaultValue?: unknown;
  options?: AdminOption[];
  relation?: {
    endpoint: string;
    labelKey?: string;
    valueKey?: string;
    valueType?: "string" | "number";
  };
  valueType?: "string" | "number";
  min?: number;
  max?: number;
  step?: string;
  rows?: number;
  getValue?: (record: AdminRecord) => unknown;
};

export type AdminColumn = {
  label: string;
  value: (record: AdminRecord) => unknown;
  badge?: boolean;
};

export type AdminResourceConfig = {
  title: string;
  description: string;
  endpoint: string;
  columns: AdminColumn[];
  fields: AdminField[];
  allowCreate?: boolean;
  allowEdit?: boolean;
  allowDelete?: boolean;
  searchPlaceholder?: string;
};

const activeOptions: AdminOption[] = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" }
];

const statusOptions = {
  user: [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Suspended", value: "suspended" }
  ],
  client: [
    { label: "Lead", value: "lead" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" }
  ],
  project: [
    { label: "Planning", value: "planning" },
    { label: "Active", value: "active" },
    { label: "Review", value: "review" },
    { label: "Completed", value: "completed" },
    { label: "On Hold", value: "on_hold" },
    { label: "Cancelled", value: "cancelled" }
  ],
  contact: [
    { label: "New", value: "new" },
    { label: "Contacted", value: "contacted" },
    { label: "Qualified", value: "qualified" },
    { label: "Won", value: "won" },
    { label: "Lost", value: "lost" }
  ],
  ticket: [
    { label: "Open", value: "open" },
    { label: "In Progress", value: "in_progress" },
    { label: "Waiting", value: "waiting" },
    { label: "Resolved", value: "resolved" },
    { label: "Closed", value: "closed" }
  ],
  invoice: [
    { label: "Draft", value: "draft" },
    { label: "Sent", value: "sent" },
    { label: "Paid", value: "paid" },
    { label: "Overdue", value: "overdue" },
    { label: "Cancelled", value: "cancelled" }
  ],
  blog: [
    { label: "Draft", value: "draft" },
    { label: "Published", value: "published" },
    { label: "Archived", value: "archived" }
  ]
};

const priorityOptions: AdminOption[] = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
  { label: "Urgent", value: "urgent" }
];

const portfolioCategoryOptions: AdminOption[] = [
  { label: "Website", value: "Website" },
  { label: "Mobile App", value: "Mobile App" },
  { label: "POS", value: "POS" },
  { label: "Inventory", value: "Inventory" },
  { label: "ERP", value: "ERP" }
];

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function objectValue(value: unknown, key: string) {
  if (value && typeof value === "object" && key in value) {
    return (value as Record<string, unknown>)[key];
  }

  return undefined;
}

function relationLabel(value: unknown, fallback = "None") {
  if (!value) {
    return fallback;
  }

  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;
    return String(record.name ?? record.title ?? record.invoice_number ?? record.email ?? record.id ?? fallback);
  }

  return fallback;
}

function listLabels(value: unknown) {
  if (!Array.isArray(value) || value.length === 0) {
    return "None";
  }

  return value.map((item) => relationLabel(item)).join(", ");
}

function yesNo(value: unknown) {
  return value ? "Yes" : "No";
}

function money(value: unknown) {
  const number = Number(value ?? 0);
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(number);
}

const roleNames = (record: AdminRecord) => asArray(record.roles).map((role) => objectValue(role, "name") ?? role);
const permissionNames = (record: AdminRecord) =>
  asArray(record.permissions).map((permission) => objectValue(permission, "name") ?? permission);
const relationIds = (key: string) => (record: AdminRecord) => asArray(record[key]).map((item) => objectValue(item, "id"));

export const adminResourceConfigs: Record<string, AdminResourceConfig> = {
  users: {
    title: "User Management",
    description: "Manage client, manager, and admin accounts with API-backed roles and account status.",
    endpoint: "/admin/users",
    searchPlaceholder: "Search users",
    columns: [
      { label: "Name", value: (record) => record.name },
      { label: "Email", value: (record) => record.email },
      { label: "Roles", value: (record) => listLabels(record.roles) },
      { label: "Status", value: (record) => record.status, badge: true }
    ],
    fields: [
      { name: "name", label: "Name", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", nullable: true },
      { name: "company", label: "Company", nullable: true },
      { name: "status", label: "Status", type: "select", required: true, options: statusOptions.user, defaultValue: "active" },
      {
        name: "roles",
        label: "Roles",
        type: "multiselect",
        relation: { endpoint: "/admin/roles", labelKey: "name", valueKey: "name", valueType: "string" },
        getValue: roleNames
      },
      { name: "password", label: "Password", type: "password", requiredOnCreate: true, omitIfBlank: true },
      {
        name: "password_confirmation",
        label: "Confirm Password",
        type: "password",
        requiredOnCreate: true,
        omitIfBlank: true
      }
    ]
  },
  roles: {
    title: "Role Management",
    description: "Create roles and assign API permissions used by the admin dashboard and client portal.",
    endpoint: "/admin/roles",
    searchPlaceholder: "Search roles",
    columns: [
      { label: "Role", value: (record) => record.name },
      { label: "Guard", value: (record) => record.guard_name },
      { label: "Permissions", value: (record) => listLabels(record.permissions) }
    ],
    fields: [
      { name: "name", label: "Role Name", required: true },
      { name: "guard_name", label: "Guard", defaultValue: "web" },
      {
        name: "permissions",
        label: "Permissions",
        type: "multiselect",
        relation: { endpoint: "/admin/permissions", labelKey: "name", valueKey: "name", valueType: "string" },
        getValue: permissionNames
      }
    ]
  },
  permissions: {
    title: "Permission Management",
    description: "Review permission names seeded into the API authorization layer.",
    endpoint: "/admin/permissions",
    allowCreate: false,
    allowEdit: false,
    allowDelete: false,
    searchPlaceholder: "Search permissions",
    columns: [
      { label: "Permission", value: (record) => record.name },
      { label: "Guard", value: (record) => record.guard_name }
    ],
    fields: []
  },
  clients: {
    title: "Client Management",
    description: "Manage customer companies used by projects, portfolio items, and invoices.",
    endpoint: "/admin/clients",
    searchPlaceholder: "Search clients",
    columns: [
      { label: "Client", value: (record) => record.name },
      { label: "Contact", value: (record) => record.contact_name },
      { label: "Email", value: (record) => record.email },
      { label: "Status", value: (record) => record.status, badge: true }
    ],
    fields: [
      { name: "name", label: "Client Name", required: true },
      { name: "contact_name", label: "Contact Name", nullable: true },
      { name: "email", label: "Email", type: "email", nullable: true },
      { name: "phone", label: "Phone", nullable: true },
      { name: "website", label: "Website", type: "url", nullable: true },
      { name: "industry", label: "Industry", nullable: true },
      { name: "address", label: "Address", type: "textarea", nullable: true },
      { name: "status", label: "Status", type: "select", required: true, options: statusOptions.client, defaultValue: "lead" }
    ]
  },
  projects: {
    title: "Project Management",
    description: "Track project scope, client ownership, progress, status, priority, budget, and team assignment.",
    endpoint: "/admin/projects",
    searchPlaceholder: "Search projects",
    columns: [
      { label: "Project", value: (record) => record.name },
      { label: "Client", value: (record) => relationLabel(record.client) },
      { label: "Type", value: (record) => record.type },
      { label: "Progress", value: (record) => `${record.progress ?? 0}%`, badge: true }
    ],
    fields: [
      {
        name: "client_id",
        label: "Client",
        type: "select",
        nullable: true,
        relation: { endpoint: "/admin/clients", labelKey: "name", valueKey: "id", valueType: "number" }
      },
      { name: "name", label: "Project Name", required: true },
      { name: "code", label: "Code", nullable: true },
      { name: "type", label: "Type", required: true, placeholder: "POS, Website, ERP..." },
      { name: "status", label: "Status", type: "select", required: true, options: statusOptions.project, defaultValue: "planning" },
      { name: "priority", label: "Priority", type: "select", required: true, options: priorityOptions, defaultValue: "medium" },
      { name: "budget", label: "Budget", type: "number", nullable: true, min: 0, step: "0.01" },
      { name: "progress", label: "Progress", type: "number", required: true, min: 0, max: 100, defaultValue: 0 },
      { name: "start_date", label: "Start Date", type: "date", nullable: true },
      { name: "due_date", label: "Due Date", type: "date", nullable: true },
      { name: "completed_at", label: "Completed At", type: "datetime-local", nullable: true },
      { name: "description", label: "Description", type: "textarea", nullable: true },
      {
        name: "user_ids",
        label: "Assigned Users",
        type: "multiselect",
        relation: { endpoint: "/admin/users", labelKey: "name", valueKey: "id", valueType: "number" },
        getValue: relationIds("users")
      }
    ]
  },
  "service-categories": {
    title: "Service Categories",
    description: "Manage service grouping, ordering, and visibility for the public services page.",
    endpoint: "/admin/service-categories",
    searchPlaceholder: "Search service categories",
    columns: [
      { label: "Name", value: (record) => record.name },
      { label: "Slug", value: (record) => record.slug },
      { label: "Sort", value: (record) => record.sort_order },
      { label: "Active", value: (record) => yesNo(record.is_active), badge: true }
    ],
    fields: [
      { name: "name", label: "Name", required: true },
      { name: "slug", label: "Slug", required: true },
      { name: "description", label: "Description", type: "textarea", nullable: true },
      { name: "sort_order", label: "Sort Order", type: "number", defaultValue: 0 },
      { name: "is_active", label: "Active", type: "checkbox", defaultValue: true }
    ]
  },
  services: {
    title: "Service Management",
    description: "Manage public service cards, benefits, descriptions, category assignment, and technology tags.",
    endpoint: "/admin/services",
    searchPlaceholder: "Search services",
    columns: [
      { label: "Service", value: (record) => record.name },
      { label: "Category", value: (record) => relationLabel(record.category) },
      { label: "Featured", value: (record) => yesNo(record.is_featured), badge: true },
      { label: "Active", value: (record) => yesNo(record.is_active), badge: true }
    ],
    fields: [
      {
        name: "service_category_id",
        label: "Category",
        type: "select",
        nullable: true,
        relation: { endpoint: "/admin/service-categories", labelKey: "name", valueKey: "id", valueType: "number" }
      },
      { name: "name", label: "Service Name", required: true },
      { name: "slug", label: "Slug", required: true },
      { name: "icon", label: "Icon", nullable: true },
      { name: "summary", label: "Summary", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "benefits", label: "Benefits", type: "array", placeholder: "One benefit per line" },
      { name: "technologies", label: "Technologies", type: "array", placeholder: "One technology per line" },
      { name: "sort_order", label: "Sort Order", type: "number", defaultValue: 0 },
      { name: "is_featured", label: "Featured", type: "checkbox" },
      { name: "is_active", label: "Active", type: "checkbox", defaultValue: true }
    ]
  },
  technologies: {
    title: "Technologies",
    description: "Manage the technology catalog used by portfolio records.",
    endpoint: "/admin/technologies",
    searchPlaceholder: "Search technologies",
    columns: [
      { label: "Name", value: (record) => record.name },
      { label: "Slug", value: (record) => record.slug },
      { label: "Category", value: (record) => record.category },
      { label: "Active", value: (record) => yesNo(record.is_active), badge: true }
    ],
    fields: [
      { name: "name", label: "Name", required: true },
      { name: "slug", label: "Slug", required: true },
      { name: "category", label: "Category", required: true },
      { name: "logo_url", label: "Logo URL", type: "url", nullable: true },
      { name: "is_active", label: "Active", type: "checkbox", defaultValue: true }
    ]
  },
  portfolio: {
    title: "Portfolio Management",
    description: "Manage showcase projects, publication status, technologies, client data, and launch details.",
    endpoint: "/admin/portfolio-projects",
    searchPlaceholder: "Search portfolio",
    columns: [
      { label: "Project", value: (record) => record.title },
      { label: "Category", value: (record) => record.category },
      { label: "Client", value: (record) => record.client_name ?? relationLabel(record.client) },
      { label: "Published", value: (record) => yesNo(record.is_published), badge: true }
    ],
    fields: [
      {
        name: "client_id",
        label: "Client",
        type: "select",
        nullable: true,
        relation: { endpoint: "/admin/clients", labelKey: "name", valueKey: "id", valueType: "number" }
      },
      { name: "title", label: "Title", required: true },
      { name: "slug", label: "Slug", required: true },
      { name: "category", label: "Category", type: "select", required: true, options: portfolioCategoryOptions },
      { name: "summary", label: "Summary", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "thumbnail_url", label: "Thumbnail URL", type: "url", nullable: true },
      { name: "client_name", label: "Client Name", nullable: true },
      { name: "industry", label: "Industry", nullable: true },
      { name: "launch_date", label: "Launch Date", type: "date", nullable: true },
      { name: "is_featured", label: "Featured", type: "checkbox" },
      { name: "is_published", label: "Published", type: "checkbox" },
      {
        name: "technology_ids",
        label: "Technologies",
        type: "multiselect",
        relation: { endpoint: "/admin/technologies", labelKey: "name", valueKey: "id", valueType: "number" },
        getValue: relationIds("technologies")
      }
    ]
  },
  "blog-categories": {
    title: "Blog Categories",
    description: "Manage public blog categories and their visibility.",
    endpoint: "/admin/blog-categories",
    searchPlaceholder: "Search blog categories",
    columns: [
      { label: "Name", value: (record) => record.name },
      { label: "Slug", value: (record) => record.slug },
      { label: "Active", value: (record) => yesNo(record.is_active), badge: true }
    ],
    fields: [
      { name: "name", label: "Name", required: true },
      { name: "slug", label: "Slug", required: true },
      { name: "description", label: "Description", type: "textarea", nullable: true },
      { name: "is_active", label: "Active", type: "checkbox", defaultValue: true }
    ]
  },
  blog: {
    title: "Blog Management",
    description: "Create posts, categories, tags, SEO metadata, publication status, and content.",
    endpoint: "/admin/blog-posts",
    searchPlaceholder: "Search posts",
    columns: [
      { label: "Post", value: (record) => record.title },
      { label: "Category", value: (record) => relationLabel(record.category) },
      { label: "Author", value: (record) => relationLabel(record.author) },
      { label: "Status", value: (record) => record.status, badge: true }
    ],
    fields: [
      {
        name: "blog_category_id",
        label: "Category",
        type: "select",
        nullable: true,
        relation: { endpoint: "/admin/blog-categories", labelKey: "name", valueKey: "id", valueType: "number" }
      },
      {
        name: "author_id",
        label: "Author",
        type: "select",
        nullable: true,
        relation: { endpoint: "/admin/users", labelKey: "name", valueKey: "id", valueType: "number" }
      },
      { name: "title", label: "Title", required: true },
      { name: "slug", label: "Slug", required: true },
      { name: "excerpt", label: "Excerpt", required: true },
      { name: "content", label: "Content", type: "textarea", required: true, rows: 8 },
      { name: "cover_image_url", label: "Cover Image URL", type: "url", nullable: true },
      { name: "seo_title", label: "SEO Title", nullable: true },
      { name: "seo_description", label: "SEO Description", type: "textarea", nullable: true, rows: 3 },
      { name: "status", label: "Status", type: "select", required: true, options: statusOptions.blog, defaultValue: "draft" },
      { name: "published_at", label: "Published At", type: "datetime-local", nullable: true },
      {
        name: "tag_ids",
        label: "Tags",
        type: "multiselect",
        relation: { endpoint: "/admin/tags", labelKey: "name", valueKey: "id", valueType: "number" },
        getValue: relationIds("tags")
      }
    ]
  },
  tags: {
    title: "Tags",
    description: "Manage reusable tags for blog content.",
    endpoint: "/admin/tags",
    searchPlaceholder: "Search tags",
    columns: [
      { label: "Name", value: (record) => record.name },
      { label: "Slug", value: (record) => record.slug }
    ],
    fields: [
      { name: "name", label: "Name", required: true },
      { name: "slug", label: "Slug", required: true }
    ]
  },
  contacts: {
    title: "Contact and Lead Management",
    description: "Review incoming contact requests, assign owners, and update lead status.",
    endpoint: "/admin/contact-requests",
    allowCreate: false,
    searchPlaceholder: "Search contacts",
    columns: [
      { label: "Name", value: (record) => record.name },
      { label: "Company", value: (record) => record.company },
      { label: "Service", value: (record) => record.service_needed },
      { label: "Status", value: (record) => record.status, badge: true }
    ],
    fields: [
      { name: "name", label: "Name", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", nullable: true },
      { name: "company", label: "Company", nullable: true },
      { name: "service_needed", label: "Service Needed", required: true },
      { name: "message", label: "Message", type: "textarea", required: true },
      { name: "status", label: "Status", type: "select", required: true, options: statusOptions.contact, defaultValue: "new" },
      { name: "source", label: "Source", nullable: true, defaultValue: "website" },
      {
        name: "assigned_to",
        label: "Assigned To",
        type: "select",
        nullable: true,
        relation: { endpoint: "/admin/users", labelKey: "name", valueKey: "id", valueType: "number" }
      }
    ]
  },
  tickets: {
    title: "Ticket Support System",
    description: "Manage support ticket assignment, priority, and resolution status.",
    endpoint: "/admin/tickets",
    allowCreate: false,
    searchPlaceholder: "Search tickets",
    columns: [
      { label: "Subject", value: (record) => record.subject },
      { label: "Client", value: (record) => relationLabel(record.user) },
      { label: "Priority", value: (record) => record.priority, badge: true },
      { label: "Status", value: (record) => record.status, badge: true }
    ],
    fields: [
      {
        name: "assigned_to",
        label: "Assigned To",
        type: "select",
        nullable: true,
        relation: { endpoint: "/admin/users", labelKey: "name", valueKey: "id", valueType: "number" }
      },
      { name: "subject", label: "Subject", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "priority", label: "Priority", type: "select", required: true, options: priorityOptions, defaultValue: "medium" },
      { name: "status", label: "Status", type: "select", required: true, options: statusOptions.ticket, defaultValue: "open" }
    ]
  },
  invoices: {
    title: "Invoice Management",
    description: "Generate invoices, assign projects and clients, and track payment status and totals.",
    endpoint: "/admin/invoices",
    searchPlaceholder: "Search invoices",
    columns: [
      { label: "Invoice", value: (record) => record.invoice_number },
      { label: "Client", value: (record) => relationLabel(record.client) },
      { label: "Total", value: (record) => money(record.total) },
      { label: "Status", value: (record) => record.status, badge: true }
    ],
    fields: [
      {
        name: "client_id",
        label: "Client",
        type: "select",
        nullable: true,
        relation: { endpoint: "/admin/clients", labelKey: "name", valueKey: "id", valueType: "number" }
      },
      {
        name: "project_id",
        label: "Project",
        type: "select",
        nullable: true,
        relation: { endpoint: "/admin/projects", labelKey: "name", valueKey: "id", valueType: "number" }
      },
      {
        name: "user_id",
        label: "User",
        type: "select",
        nullable: true,
        relation: { endpoint: "/admin/users", labelKey: "name", valueKey: "id", valueType: "number" }
      },
      { name: "invoice_number", label: "Invoice Number", required: true },
      { name: "status", label: "Status", type: "select", required: true, options: statusOptions.invoice, defaultValue: "draft" },
      { name: "subtotal", label: "Subtotal", type: "number", required: true, min: 0, step: "0.01", defaultValue: 0 },
      { name: "tax", label: "Tax", type: "number", required: true, min: 0, step: "0.01", defaultValue: 0 },
      { name: "discount", label: "Discount", type: "number", required: true, min: 0, step: "0.01", defaultValue: 0 },
      { name: "total", label: "Total", type: "number", required: true, min: 0, step: "0.01", defaultValue: 0 },
      { name: "issued_at", label: "Issued At", type: "date", nullable: true },
      { name: "due_at", label: "Due At", type: "date", nullable: true },
      { name: "paid_at", label: "Paid At", type: "datetime-local", nullable: true },
      { name: "notes", label: "Notes", type: "textarea", nullable: true }
    ]
  }
};
