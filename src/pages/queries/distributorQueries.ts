// src/queries/distributorQueries.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchVehicleTransportData,
  fetchDriverPerformance,
  updateDistributorData,
} from "@/services/api";
import { toast } from "sonner";

export function useVehicleTransportData() {
  return useQuery({
    queryKey: ["vehicle-transport-data"],
    queryFn: fetchVehicleTransportData,
    retry: 2,
  });
}

export function useDriverPerformance() {
  return useQuery({
    queryKey: ["driver-performance"],
    queryFn: fetchDriverPerformance,
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
