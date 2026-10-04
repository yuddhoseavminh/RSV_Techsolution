/**
 * Khmer copy for services, centralized so the header, footer, and page
 * sections never drift apart.
 *
 * Two densities are provided:
 * - `full`    long titles/descriptions for service cards and page sections
 * - `summary` short titles/descriptions for dense UI (mega menu, footer)
 */

export interface LocalizedService {
  title: string;
  description: string;
  benefits?: string[];
}

const khmerServiceFull: Record<string, LocalizedService> = {
  "Web Development": {
    title: "ការអភិវឌ្ឍគេហទំព័រ (Web Development)",
    description: "គេហទំព័រពាណិជ្ជកម្មល្បឿនលឿន ផ្ទាំងគ្រប់គ្រង ផតថល និងកម្មវិធីគេហទំព័រអាជីវកម្មរឹងមាំ។",
    benefits: ["ផ្ទុកយ៉ាងលឿន", "ត្រៀមខ្លួនសម្រាប់ SEO", "ស្ថាបត្យកម្មអភិវឌ្ឍបាន"]
  },
  "Mobile App Development": {
    title: "ការបង្កើតកម្មវិធីទូរស័ព្ទ (Mobile Apps)",
    description: "កម្មវិធីទូរស័ព្ទ iOS និង Android ភ្ជាប់ទៅកាន់ប្រព័ន្ធ API មានសុវត្ថិភាព និងដំណើរការទិន្នន័យផ្ទាល់។",
    benefits: ["iOS និង Android", "ការជូនដំណឹងផ្ទាល់", "ដំណើរការក្រៅបណ្តាញ"]
  },
  "POS System": {
    title: "ប្រព័ន្ធគ្រប់គ្រងការលក់ (POS System)",
    description: "ប្រព័ន្ធគ្រប់គ្រងការលក់ ចេញវិក្កយបត្រ គ្រប់គ្រងអ្នកគិតប្រាក់ ស្តុកទំនិញ និងរបាយការណ៍ហិរញ្ញវត្ថុប្រចាំថ្ងៃ។",
    benefits: ["គ្រប់គ្រងសាខា", "គាំទ្របារកូដ", "របាយការណ៍បិទប្រចាំថ្ងៃ"]
  },
  "Inventory System": {
    title: "ប្រព័ន្ធគ្រប់គ្រងស្តុកទំនិញ (Inventory)",
    description: "ការគ្រប់គ្រងស្តុកទំនិញ បញ្ជាទិញ ផ្ទេរទំនិញរវាងសាខា រាប់ស្តុក អ្នកផ្គត់ផ្គង់ និងឃ្លាំងទំនិញ។",
    benefits: ["ការព្រមានស្តុកទាប", "បញ្ជាទិញ", "តាមដានឃ្លាំង"]
  },
  "ERP System": {
    title: "ប្រព័ន្ធគ្រប់គ្រងសហគ្រាស (ERP System)",
    description: "ប្រព័ន្ធរួមបញ្ចូលគ្នារវាងហិរញ្ញវត្ថុ ការលក់ ប្រតិបត្តិការ លទ្ធកម្ម និងរបាយការណ៍គ្រប់គ្រងទូទៅ។",
    benefits: ["ទិន្នន័យរួម", "សិទ្ធីតាមតួនាទី", "ស្វ័យប្រវត្តិកម្មលំហូរការងារ"]
  },
  "CRM System": {
    title: "ប្រព័ន្ធគ្រប់គ្រងទំនាក់ទំនងអតិថិជន (CRM)",
    description: "ឧបករណ៍តាមដានអតិថិជនសក្តានុពល បណ្តាញលក់ ការទំនាក់ទំនង និងប្រវត្តិអតិថិជន។",
    benefits: ["តាមដានអតិថិជនសក្តានុពល", "មើលផ្លូវលក់", "ប្រវត្តិអតិថិជន"]
  },
  "HR Management System": {
    title: "ប្រព័ន្ធគ្រប់គ្រងធនធានមនុស្ស (HRM)",
    description: "គ្រប់គ្រងព័ត៌មានបុគ្គលិក វត្តមាន ច្បាប់ឈប់សម្រាក ប្រាក់បៀវត្សរ៍ និងឯកសាររដ្ឋបាល។",
    benefits: ["ត្រៀមប្រាក់បៀវត្សរ៍", "ទិន្នន័យវត្តមាន", "ផតថលសេវាផ្ទាល់ខ្លួន"]
  },
  "School Management System": {
    title: "ប្រព័ន្ធគ្រប់គ្រងសាលារៀន",
    description: "គ្រប់គ្រងសិស្ស គ្រូបង្រៀន វត្តមាន វិក្កយបត្រសិក្សា ពិន្ទុ និងការទំនាក់ទំនងជាមួយអាណាព្យាបាល។",
    benefits: ["ប្រវត្តិសិស្ស", "វត្តមាន", "របាយការណ៍សិក្សា"]
  },
  "Custom Software Development": {
    title: "ការអភិវឌ្ឍកម្មវិធីតាមតម្រូវការជាក់លាក់",
    description: "ប្រព័ន្ធរៀបចំឡើងជាពិសេសសម្រាប់លំហូរអាជីវកម្មជាក់លាក់ ការតភ្ជាប់ប្រព័ន្ធ និងតម្រូវការរបាយការណ៍។",
    benefits: ["វិស័យផ្អែកលើការស្រាវជ្រាវ", "កូដថែទាំបាន", "ការគាំទ្ររយៈពេលវែង"]
  }
};

const khmerServiceSummary: Record<string, LocalizedService> = {
  "Web Development": {
    title: "ការអភិវឌ្ឍគេហទំព័រ",
    description: "គេហទំព័រពាណិជ្ជកម្មល្បឿនលឿន ផតថល និងប្រព័ន្ធ Web App សម្រាប់អាជីវកម្ម។"
  },
  "Mobile App Development": {
    title: "ការអភិវឌ្ឍកម្មវិធីទូរស័ព្ទ",
    description: "កម្មវិធីទូរស័ព្ទ iOS & Android ភ្ជាប់ដោយផ្ទាល់ជាមួយប្រព័ន្ធសុវត្ថិភាព API។"
  },
  "POS System": {
    title: "ប្រព័ន្ធគ្រប់គ្រងការលក់ (POS)",
    description: "ប្រព័ន្ធគិតប្រាក់ និងចេញវិក្កយបត្រ គ្រប់គ្រងអ្នកគិតប្រាក់ និងស្តុកទំនិញ។"
  },
  "Inventory System": {
    title: "ប្រព័ន្ធគ្រប់គ្រងស្តុកទំនិញ",
    description: "ការគ្រប់គ្រងស្តុកទំនិញ បញ្ជាទិញ ផ្ទេរទំនិញ និងឃ្លាំងទំនិញ។"
  },
  "ERP System": {
    title: "ប្រព័ន្ធគ្រប់គ្រងសហគ្រាស (ERP)",
    description: "ប្រព័ន្ធរួមបញ្ចូលគ្នារវាងហិរញ្ញវត្ថុ ការលក់ និងប្រតិបត្តិការទូទៅ។"
  },
  "CRM System": {
    title: "ប្រព័ន្ធគ្រប់គ្រងទំនាក់ទំនងអតិថិជន (CRM)",
    description: "ឧបករណ៍តាមដានអតិថិជនសក្តានុពល និងបណ្តាញលក់។"
  }
};

/** Khmer titles for API-backed service names (services grid, contact form). */
const khmerApiServiceTitles: Record<string, string> = {
  "Custom Web Applications": "កម្មវិធីគេហទំព័រតាមតម្រូវការ",
  "Enterprise Admin Dashboards": "ផ្ទាំងគ្រប់គ្រងសហគ្រាស",
  "API & Backend Architecture": "ស្ថាបត្យកម្ម API និង Backend",
  "Mobile Application Delivery": "ការបង្កើតកម្មវិធីទូរស័ព្ទ",
  "POS & Retail Workflows": "ប្រព័ន្ធលក់ POS & ស្តុកទំនិញ",
  "Business Process Automation": "ស្វ័យប្រវត្តិកម្មអាជីវកម្ម",
  "HR & Payroll Platform": "ប្រព័ន្ធគ្រប់គ្រងបុគ្គលិក និងប្រាក់ខែ",
  "School Management System": "ប្រព័ន្ធគ្រប់គ្រងសាលារៀន",
  "Custom Software Development": "ការអភិវឌ្ឍសូហ្វវែរតាមតម្រូវការ"
};

export type ServiceCopyVariant = "full" | "summary";

export function localizeService<T extends LocalizedService>(
  service: T,
  isKhmer: boolean,
  variant: ServiceCopyVariant = "full"
): T {
  if (!isKhmer) {
    return service;
  }
  const map = variant === "summary" ? khmerServiceSummary : khmerServiceFull;
  return { ...service, ...(map[service.title] ?? {}) };
}

export function localizeApiServiceTitle(name: string, isKhmer: boolean): string {
  return isKhmer ? khmerApiServiceTitles[name] ?? name : name;
}
