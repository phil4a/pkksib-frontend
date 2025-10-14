"use client";

import { useQuery } from "@tanstack/react-query";

import { SITE_CONFIG } from "@/config/site.config";
import { serviceService } from "@/services/service.service";
import type { IServiceCategory } from "@/types/service.types";

export function useServiceCategories() {
  const ttlMs = (SITE_CONFIG?.revalidatePeriod ?? 300) * 1000;

  const query = useQuery({
    queryKey: ["service_categories"],
    queryFn: async (): Promise<IServiceCategory[]> => {
      const res = await serviceService.getCategories();
      return res.data.data ?? [];
    },
    staleTime: ttlMs,
    gcTime: ttlMs * 2,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return {
    categories: (query.data ?? []) as IServiceCategory[],
    isLoading: query.isLoading,
    error: query.error as Error | null,
  };
}