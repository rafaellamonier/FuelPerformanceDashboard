import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchFuelVolumeByDay,
  fetchFuelTypeDistribution,
  updateFuelData,
} from "@/services/api";
import { toast } from "sonner";

export const useFuelVolumeByDay = () =>
  useQuery({
    queryKey: ["fuel-volume-by-day"],
    queryFn: fetchFuelVolumeByDay,
  });

export const useFuelTypeDistribution = () =>
  useQuery({
    queryKey: ["fuel-type-distribution"],
    queryFn: fetchFuelTypeDistribution,
  });

export const useUpdateFuelData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFuelData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fuel-volume-by-day"] });
      queryClient.invalidateQueries({ queryKey: ["fuel-type-distribution"] });
      toast.success("Dados atualizados com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar dados");
    },
  });
};
