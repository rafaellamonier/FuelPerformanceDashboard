// src/queries/distributorQueries.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchVehicleTransportData,
  fetchDriverPerformance,
  updateDistributorData,
} from "@/services/api";
import { toast } from "sonner";

export function useVehicleTransportData(start: Date | null, end: Date | null) {
  return useQuery({
    queryKey: ["vehicle-transport-data", start, end],
    queryFn: () => fetchVehicleTransportData({ start, end }),
    retry: 2,
  });
}

export function useDriverPerformance(start: Date | null, end: Date | null) {
  return useQuery({
    queryKey: ["driver-performance", start, end],
    queryFn: () => fetchDriverPerformance({ start, end }),
    retry: 2,
  });
}

export function useUpdateDistributorData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDistributorData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicle-transport-data"] });
      queryClient.invalidateQueries({ queryKey: ["driver-performance"] });
      toast.success("Dados atualizados com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar dados");
    },
  });
}
