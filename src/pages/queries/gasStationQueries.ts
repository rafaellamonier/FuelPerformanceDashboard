import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchFuelVolumeByDay,
  fetchFuelTypeDistribution,
  updateFuelData,
} from "@/services/api";
import { toast } from "sonner";

export const useFuelVolumeByDay = (
  start: Date | null,
  end: Date | null,
  posto: string | null,
) =>
  useQuery({
    queryKey: ["fuel-volume-by-day", start, end, posto],
    queryFn: () => fetchFuelVolumeByDay(start, end, posto),
  });

export const useFuelTypeDistribution = (
  start: Date | null,
  end: Date | null,
  posto: string | null,
) =>
  useQuery({
    queryKey: ["fuel-type-distribution", start, end, posto],
    queryFn: () => fetchFuelTypeDistribution(start, end, posto),
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
