"use client";

import { usePathname } from "next/navigation";

export function useActivePath() {
  const pathname = usePathname() ?? "/";

  const isActiveHref = (href: string, opts?: { exact?: boolean }) => {
    const exact = !!opts?.exact;
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  };

  const isExact = (href: string) => pathname === href;
  const startsWith = (href: string) => pathname.startsWith(href);

  return { pathname, isActiveHref, isExact, startsWith };
}