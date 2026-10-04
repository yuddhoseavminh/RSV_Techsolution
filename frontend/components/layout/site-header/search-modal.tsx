"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";

const RESULTS = [
  { label: "Web Development", href: "/#services" },
  { label: "ERP System", href: "/#services" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/#contact" }
];

export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="font-display fixed inset-0 z-[90] bg-slate-950/65 p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="mx-auto mt-24 max-w-2xl overflow-hidden rounded-lg border border-white/10 bg-white shadow-[0_30px_120px_rgba(0,0,0,0.26)] dark:bg-slate-950"
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 18 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4 dark:border-white/10">
              <Search className="h-5 w-5 text-navy-600" />
              <input
                autoFocus
                placeholder="Search RVS Techsolution"
                className="h-10 min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-950 outline-none placeholder:text-slate-400 dark:text-white"
              />
              <button
                type="button"
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-2 p-4">
              {RESULTS.map((result) => (
                <Link
                  key={result.label}
                  href={result.href}
                  onClick={onClose}
                  className="flex items-center justify-between rounded-lg p-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-navy-400 dark:text-slate-200 dark:hover:bg-white/8"
                >
                  {result.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
