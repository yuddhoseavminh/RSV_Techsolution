"use client";

import { useEffect, useMemo, useState } from "react";
import { 
  CreditCard, 
  FolderKanban, 
  Inbox, 
  Ticket, 
  UsersRound, 
  Plus, 
  FileText, 
  Settings, 
  Activity, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock,
  GraduationCap,
  MessageSquare,
  Sparkles,
  Trash2,
  AlertCircle,
  Search,
  Handshake,
  User,
  Wallet,
  ChevronDown
} from "lucide-react";
import Link from "next/link";
import { DataTable } from "@/components/admin/data-table";
import { apiClient, apiMessage } from "@/lib/api-client";
import { formatCurrency } from "@/lib/utils";
import { useAuth } from "@/components/auth/auth-provider";

type DashboardData = {
  cards: {
    total_users: number;
    total_projects: number;
    revenue: number | string;
    pending_tickets: number;
    new_contacts: number;
  };
  monthly_revenue: Record<string, number | string>;
};

type ProjectRow = {
  name?: string;
  client?: { name?: string } | string | null;
  status?: string;
  progress?: number;
};

export function AdminDashboard() {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Tabs active state
  const [activeTab, setActiveTab] = useState<"DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY">("MONTHLY");

  useEffect(() => {
    async function loadDashboard() {
      setIsLoading(true);
      setError(null);

      try {
        const dashboardData = await apiClient<DashboardData>("/admin/dashboard");
        setDashboard(dashboardData);
      } catch (requestError) {
        setError(apiMessage(requestError));
      } finally {
        setIsLoading(false);
      }
    }

    void loadDashboard();
  }, []);

  const cards = dashboard?.cards;

  return (
    <div className="grid gap-6">
      
      {/* Row 1: Main Overview Spline Chart Card (Left) + Donut Traffic Card (Right) */}
      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        
        {/* Main Spline Chart Card */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          {/* Header Controls inside card */}
          <div className="flex flex-col justify-between gap-4 border-b border-slate-50 pb-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Dashboard</h2>
              <p className="text-xs text-slate-400">Overview of latest Month</p>
            </div>
            
            {/* Filter Tabs & Legend */}
            <div className="flex flex-wrap items-center gap-6">
              {/* Range Filters */}
              <div className="flex gap-4 text-xs font-bold text-slate-400">
                {(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`transition-colors duration-150 ${activeTab === tab ? "text-amber-500 border-b-2 border-amber-500 pb-0.5" : "hover:text-slate-600"}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              {/* Chart Legend */}
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-rose-500" />
                  Online
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  Store
                </span>
              </div>
            </div>
          </div>

          {/* Chart Canvas with Left Stats Sidebar */}
          <div className="mt-6 grid gap-6 md:grid-cols-[180px_1fr]">
            {/* Left Stats Column */}
            <div className="flex flex-col justify-between border-r border-slate-50 pr-6 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-2xl font-extrabold text-slate-900">
                    {isLoading ? "$..." : formatCurrency(Number(cards?.revenue ?? 6468.96))}
                  </p>
                  <p className="text-[11px] font-semibold text-slate-400">Current Month Earnings</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-slate-900">
                    {isLoading ? "..." : String(cards?.total_projects ?? 82)}
                  </p>
                  <p className="text-[11px] font-semibold text-slate-400">Current Month Sales</p>
                </div>
              </div>
              
              <button className="w-full rounded-full bg-purple-600 py-2.5 text-center text-xs font-bold text-white shadow-md shadow-purple-500/10 transition hover:bg-purple-700">
                Last Month Summary
              </button>
            </div>

            {/* Custom SVG Spline Chart */}
            <div className="relative h-[220px]">
              <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9c27b0" stopOpacity="0.25"/>
                    <stop offset="100%" stopColor="#9c27b0" stopOpacity="0"/>
                  </linearGradient>
                  <linearGradient id="orangeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#eab308" stopOpacity="0.25"/>
                    <stop offset="100%" stopColor="#eab308" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                
                {/* Horizontal Dashed Gridlines */}
                <line x1="0" y1="35" x2="500" y2="35" stroke="#f8fafc" strokeDasharray="3,3" />
                <line x1="0" y1="70" x2="500" y2="70" stroke="#f8fafc" strokeDasharray="3,3" />
                <line x1="0" y1="105" x2="500" y2="105" stroke="#f8fafc" strokeDasharray="3,3" />
                <line x1="0" y1="140" x2="500" y2="140" stroke="#f8fafc" strokeDasharray="3,3" />
                <line x1="0" y1="175" x2="500" y2="175" stroke="#f8fafc" strokeDasharray="3,3" />

                {/* Purple Spline curve (Online) */}
                <path d="M 0,150 C 50,140 100,100 150,120 C 200,140 250,60 300,90 C 350,120 400,30 450,80 C 475,105 490,120 500,140" fill="none" stroke="#9c27b0" strokeWidth="2.5" />
                <path d="M 0,150 C 50,140 100,100 150,120 C 200,140 250,60 300,90 C 350,120 400,30 450,80 C 475,105 490,120 500,140 L 500,200 L 0,200 Z" fill="url(#purpleGrad)" />

                {/* Orange Spline curve (Store) */}
                <path d="M 0,180 C 50,160 100,120 150,140 C 200,160 250,80 300,110 C 350,140 400,50 450,100 C 475,125 490,135 500,155" fill="none" stroke="#eab308" strokeWidth="2.5" />
                <path d="M 0,180 C 50,160 100,120 150,140 C 200,160 250,80 300,110 C 350,140 400,50 450,100 C 475,125 490,135 500,155 L 500,200 L 0,200 Z" fill="url(#orangeGrad)" />
                
                {/* Node Points */}
                <circle cx="150" cy="120" r="4.5" fill="#9c27b0" stroke="#fff" strokeWidth="1.5" />
                <circle cx="300" cy="90" r="4.5" fill="#9c27b0" stroke="#fff" strokeWidth="1.5" />
                <circle cx="450" cy="80" r="4.5" fill="#9c27b0" stroke="#fff" strokeWidth="1.5" />

                <circle cx="150" cy="140" r="4.5" fill="#eab308" stroke="#fff" strokeWidth="1.5" />
                <circle cx="300" cy="110" r="4.5" fill="#eab308" stroke="#fff" strokeWidth="1.5" />
                <circle cx="450" cy="100" r="4.5" fill="#eab308" stroke="#fff" strokeWidth="1.5" />
              </svg>
              
              {/* X Axis Month Labels */}
              <div className="mt-2 flex justify-between text-[10px] font-bold text-slate-400 px-2">
                <span>Jan</span>
                <span>Feb</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
              </div>
            </div>
          </div>

          {/* Bottom Card Summary Grid */}
          <div className="mt-8 grid gap-4 border-t border-slate-50 pt-6 grid-cols-2 sm:grid-cols-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-500 text-white shadow-sm">
                <Wallet className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-400">Wallet Ballance</p>
                <p className="text-sm font-bold text-slate-800">$3,567.80</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500 text-white shadow-sm">
                <UsersRound className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-400">Referral Earning</p>
                <p className="text-sm font-bold text-slate-800">$1589.53</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500 text-white shadow-sm">
                <FolderKanban className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-400">Estimate sales</p>
                <p className="text-sm font-bold text-slate-800">$2651.50</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500 text-white shadow-sm">
                <CreditCard className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-400">Earning</p>
                <p className="text-sm font-bold text-slate-800">$53,567.54</p>
              </div>
            </div>
          </div>
        </div>

        {/* Traffic Donut Chart Card */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Traffic</h2>
          
          {/* Main Donut Graph */}
          <div className="relative mx-auto mt-6 flex h-48 w-48 items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="70" fill="none" stroke="#f8fafc" strokeWidth="16" />
              
              {/* Facebook segment (purple): 33% = 145 dasharray */}
              <circle cx="100" cy="100" r="70" fill="none" stroke="#9c27b0" strokeWidth="16" 
                strokeDasharray="145 440" strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 100 100)" />
              
              {/* Youtube segment (red): 55% = 242 dasharray (offset -145) */}
              <circle cx="100" cy="100" r="70" fill="none" stroke="#f44336" strokeWidth="16" 
                strokeDasharray="242 440" strokeDashoffset="-145" strokeLinecap="round" transform="rotate(-90 100 100)" />
              
              {/* Direct Search segment (cyan): 12% = 53 dasharray (offset -387) */}
              <circle cx="100" cy="100" r="70" fill="none" stroke="#00bcd4" strokeWidth="16" 
                strokeDasharray="53 440" strokeDashoffset="-387" strokeLinecap="round" transform="rotate(-90 100 100)" />
            </svg>
            
            {/* Center Cap Icon */}
            <div className="absolute flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md border border-slate-50">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-500 text-white shadow-inner">
                <GraduationCap className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Legend Stats */}
          <div className="mt-8 flex items-center justify-between text-center gap-2">
            <div>
              <p className="text-xl font-extrabold text-slate-800">33%</p>
              <p className="flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                <span className="h-2 w-2 rounded-full bg-purple-500" />
                Facebook
              </p>
            </div>
            <div className="border-x border-slate-100 px-4">
              <p className="text-xl font-extrabold text-slate-800">55%</p>
              <p className="flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                Youtube
              </p>
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-800">12%</p>
              <p className="flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                <span className="h-2 w-2 rounded-full bg-cyan-500" />
                Direct Search
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: 4 Colorful Gradient KPI Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Card 1: Purple (Revenue Status) */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#7e57c2] to-[#5c6bc0] p-5 text-white shadow-sm">
          {/* Waves background decoration */}
          <div className="absolute bottom-0 left-0 right-0 h-14 opacity-25">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,50 C30,70 70,30 100,50 L100,100 L0,100 Z" fill="#ffffff" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider opacity-80">Revenue Status</p>
            <p className="mt-2 text-3xl font-extrabold tracking-tight">
              {isLoading ? "$..." : formatCurrency(Number(cards?.revenue ?? 432))}
            </p>
          </div>
          <p className="mt-4 text-[10px] font-semibold opacity-75">Jan 01 - Jan 10</p>
        </div>

        {/* Card 2: Blue (Page View) */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#26c6da] to-[#00acc1] p-5 text-white shadow-sm">
          {/* Wave line background decoration */}
          <div className="absolute bottom-2 left-0 right-0 h-10 opacity-20 px-2">
            <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
              <path d="M0,35 C15,30 25,10 40,25 C55,40 65,15 80,30 C90,40 95,20 100,35" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="3,3" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider opacity-80">Page View</p>
            <p className="mt-2 text-3xl font-extrabold tracking-tight">
              {isLoading ? "$..." : formatCurrency(Number(cards?.revenue ?? 432))}
            </p>
          </div>
          <p className="mt-4 text-[10px] font-semibold opacity-75">Active Sessions</p>
        </div>

        {/* Card 3: Teal (Bounce Rate) */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#26a69a] to-[#00897b] p-5 text-white shadow-sm">
          {/* Audio-like vertical bar decoration */}
          <div className="absolute bottom-4 right-5 flex gap-1 items-end h-12 opacity-25">
            <span className="w-1 rounded-full bg-white h-4" />
            <span className="w-1 rounded-full bg-white h-8" />
            <span className="w-1 rounded-full bg-white h-12" />
            <span className="w-1 rounded-full bg-white h-6" />
            <span className="w-1 rounded-full bg-white h-9" />
            <span className="w-1 rounded-full bg-white h-5" />
          </div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider opacity-80">Bounce Rate</p>
              <p className="mt-2 text-3xl font-extrabold tracking-tight">
                {isLoading ? "$..." : formatCurrency(Number(cards?.revenue ?? 432))}
              </p>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-bold tracking-wider backdrop-blur-sm">
              Monthly
              <ChevronDown className="h-3 w-3" />
            </span>
          </div>
          <p className="mt-4 text-[10px] font-semibold opacity-75">General telemetry</p>
        </div>

        {/* Card 4: Orange (Revenue Status) */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#ff7043] to-[#f4511e] p-5 text-white shadow-sm">
          {/* Horizontal mini bar tracks */}
          <div className="absolute bottom-4 right-5 space-y-1.5 w-16 opacity-25">
            <div className="h-1.5 bg-white rounded-full w-full" />
            <div className="h-1.5 bg-white rounded-full w-3/4" />
            <div className="h-1.5 bg-white rounded-full w-1/2" />
            <div className="h-1.5 bg-white rounded-full w-4/5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider opacity-80">Revenue Status</p>
            <p className="mt-2 text-3xl font-extrabold tracking-tight">
              {isLoading ? "$..." : formatCurrency(Number(cards?.revenue ?? 432))}
            </p>
          </div>
          <p className="mt-4 text-[10px] font-semibold opacity-75">Jan 01 - Jan 10</p>
        </div>

      </div>

      {/* Row 3: Recent Activities (Left) + Order Status Table Card (Right) */}
      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
        
        {/* Recent Activities List */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Recent Activities</h2>
            
            {/* Activities Timeline */}
            <div className="mt-6 space-y-6">
              
              <div className="flex items-start gap-4">
                <span className="text-[10px] font-bold text-slate-400 w-20 pt-1 shrink-0">40 Mins Ago</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-pink-600 shadow-sm shrink-0">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-800">Task Updated</p>
                  <p className="text-xs text-slate-500 mt-0.5">Nikolai Updated a Task</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-[10px] font-bold text-slate-400 w-20 pt-1 shrink-0">1 day ago</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600 shadow-sm shrink-0">
                  <Handshake className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-800">Deal Added</p>
                  <p className="text-xs text-slate-500 mt-0.5">Panshi Added a Task</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-[10px] font-bold text-slate-400 w-20 pt-1 shrink-0">40 Mins Ago</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-100 text-cyan-600 shadow-sm shrink-0">
                  <FileText className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-800">Published Article</p>
                  <p className="text-xs text-slate-500 mt-0.5">Sanshi Updated an Article</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-[10px] font-bold text-slate-400 w-20 pt-1 shrink-0">1 day ago</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600 shadow-sm shrink-0">
                  <User className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-800">Dock Updated</p>
                  <p className="text-xs text-slate-500 mt-0.5">Manshi Updated a Dock</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Order Status Table Card */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          {/* Table Toolbar */}
          <div className="flex flex-col justify-between gap-4 border-b border-slate-50 pb-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Order Status</h2>
              <p className="text-xs text-slate-400">Overview of latest month</p>
            </div>
            
            {/* Toolbar Buttons & Search */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1.5 bg-[#e91e63] hover:bg-[#d81b60] text-white px-4 py-2 rounded-lg text-xs font-bold shadow-md shadow-pink-500/20 transition duration-150">
                <Plus className="h-3.5 w-3.5" />
                Add
              </button>
              
              <button className="h-9 w-9 flex items-center justify-center rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-400 hover:text-slate-600 transition">
                <Trash2 className="h-4 w-4" />
              </button>

              <button className="h-9 w-9 flex items-center justify-center rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-400 hover:text-slate-600 transition">
                <AlertCircle className="h-4 w-4" />
              </button>

              <button className="h-9 w-9 flex items-center justify-center rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-400 hover:text-slate-600 transition">
                <FileText className="h-4 w-4" />
              </button>
              
              {/* Search Bar */}
              <div className="relative ml-2">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-450" />
                <input
                  type="text"
                  placeholder="Search"
                  className="h-9 w-40 rounded-lg bg-slate-50 border border-slate-100 pl-9 pr-3 text-xs outline-none focus:bg-white focus:border-slate-200"
                />
              </div>
            </div>
          </div>

          {/* DataTable component rendering mock order statuses matching the template image */}
          <div className="mt-5">
            <DataTable
              columns={["INVOICE", "CUSTOMERS", "FROM", "PRICE", "STATUS"]}
              rows={[
                ["12386", "Charly dues", "Russia", "$2652", "Process"],
                ["12386", "Charly dues", "Russia", "$2652", "Open"],
                ["12386", "Charly dues", "Russia", "$2652", "On Hold"]
              ]}
            />
          </div>
        </div>

      </div>
      
    </div>
  );
}
