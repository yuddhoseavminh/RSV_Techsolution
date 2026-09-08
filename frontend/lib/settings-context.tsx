"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { apiClient } from "@/lib/api-client";
import { siteConfig } from "@/lib/data";

export type CompanySettings = {
  name: string;
  email: string;
  phone: string;
  address: string;
  logo: string;
  [key: string]: string;
};

export type AuthSettings = {
  demo_admin_login: boolean;
  demo_client_login: boolean;
};

type SettingsContextValue = {
  company: CompanySettings;
  companyName: string;
  logoUrl: string | null;
  auth: AuthSettings;
  seo: Record<string, string>;
  social: Record<string, string>;
  isLoading: boolean;
  refreshSettings: () => Promise<void>;
  updateCompanyLogo: (url: string) => void;
};

const defaultCompany: CompanySettings = {
  name: siteConfig.name,
  email: siteConfig.email,
  phone: siteConfig.phone,
  address: siteConfig.address,
  logo: ""
};

const defaultAuth: AuthSettings = {
  demo_admin_login: true,
  demo_client_login: true
};

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [company, setCompany] = useState<CompanySettings>(defaultCompany);
  const [auth, setAuth] = useState<AuthSettings>(defaultAuth);
  const [seo, setSeo] = useState<Record<string, string>>({});
  const [social, setSocial] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  const refreshSettings = useCallback(async () => {
    try {
      const data = await apiClient<Record<string, Record<string, string>>>("/settings");
      if (data && typeof data === "object") {
        if (data.company) {
          setCompany({
            name: data.company.name || siteConfig.name,
            email: data.company.email || siteConfig.email,
            phone: data.company.phone || siteConfig.phone,
            address: data.company.address || siteConfig.address,
            logo: data.company.logo || "",
            ...data.company
          });
        }
        if (data.auth) {
          setAuth({
            demo_admin_login: data.auth.demo_admin_login !== "0" && data.auth.demo_admin_login !== "false",
            demo_client_login: data.auth.demo_client_login !== "0" && data.auth.demo_client_login !== "false"
          });
        }
        if (data.seo) setSeo(data.seo);
        if (data.social) setSocial(data.social);
      }
    } catch {
      // Fallback to default values gracefully
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshSettings();
  }, [refreshSettings]);

  const updateCompanyLogo = useCallback((url: string) => {
    setCompany((prev) => ({
      ...prev,
      logo: url
    }));
  }, []);

  const value = useMemo<SettingsContextValue>(
    () => ({
      company,
      companyName: company.name || siteConfig.name,
      logoUrl: company.logo?.trim() || null,
      auth,
      seo,
      social,
      isLoading,
      refreshSettings,
      updateCompanyLogo
    }),
    [company, auth, seo, social, isLoading, refreshSettings, updateCompanyLogo]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsContextValue {
  const context = useContext(SettingsContext);
  if (!context) {
    return {
      company: defaultCompany,
      companyName: siteConfig.name,
      logoUrl: null,
      auth: defaultAuth,
      seo: {},
      social: {},
      isLoading: false,
      refreshSettings: async () => {},
      updateCompanyLogo: () => {}
    };
  }
  return context;
}
