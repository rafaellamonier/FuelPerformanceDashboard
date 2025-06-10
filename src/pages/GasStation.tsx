import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
} from "recharts";
import {
	fetchFuelVolumeByDay,
	fetchFuelTypeDistribution,
	updateFuelData,
} from "@/services/api";
import { Loader2, RefreshCw, Fuel, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const GasStation = () => {
	const queryClient = useQueryClient();

	const {
		data: volumeData,
		isLoading: volumeLoading,
		error: volumeError,
	} = useQuery({
		queryKey: ["fuel-volume-by-day"],
		queryFn: fetchFuelVolumeByDay,
	});

	const {
		data: typeData,
		isLoading: typeLoading,
		error: typeError,
	} = useQuery({
		queryKey: ["fuel-type-distribution"],
		queryFn: fetchFuelTypeDistribution,
	});

	const updateMutation = useMutation({
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

	const handleUpdateData = () => {
		updateMutation.mutate();
	};

	if (volumeError || typeError) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="text-center space-y-4">
					<div className="text-red-500 text-lg">Erro ao carregar dados</div>
					<Button onClick={() => window.location.reload()}>
						Tentar Novamente
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div className="space-y-1">
					<h1 className="text-3xl font-bold flex items-center gap-2">
						<Fuel className="h-8 w-8 text-primary" />
						Dashboard do Posto
					</h1>
					<p className="text-muted-foreground">
						Análise de abastecimento e distribuição de combustíveis
					</p>
				</div>
				<Button
					onClick={handleUpdateData}
					disabled={updateMutation.isPending}
					className="flex items-center gap-2 cursor-pointer"
				>
					{updateMutation.isPending ? (
						<Loader2 className="h-4 w-4 animate-spin" />
					) : (
						<RefreshCw className="h-4 w-4" />
					)}
					Atualizar Dados
				</Button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<TrendingUp className="h-5 w-5" />
							Volume Abastecido por Dia
						</CardTitle>
						<CardDescription>
							Litros de combustível vendidos durante a semana
						</CardDescription>
					</CardHeader>
					<CardContent>
						{volumeLoading ? (
							<div className="h-64 flex items-center justify-center">
								<Loader2 className="h-8 w-8 animate-spin text-primary" />
							</div>
						) : (
							<div className="h-64">
								<ResponsiveContainer width="100%" height="100%">
									<BarChart data={volumeData}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="day" />
										<YAxis />
										<Tooltip
											formatter={(value) => [`${value}L`, "Volume"]}
											labelStyle={{ color: "var(--foreground)" }}
											contentStyle={{
												backgroundColor: "var(--background)",
												border: "1px solid var(--border)",
												borderRadius: "6px",
											}}
										/>
										<Bar
											dataKey="volume"
											fill="var(--primary)"
											radius={[4, 4, 0, 0]}
										/>
									</BarChart>
								</ResponsiveContainer>
							</div>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Fuel className="h-5 w-5" />
							Distribuição por Tipo de Combustível
						</CardTitle>
						<CardDescription>
							Porcentagem de vendas por categoria de combustível
						</CardDescription>
					</CardHeader>
					<CardContent>
						{typeLoading ? (
							<div className="h-64 flex items-center justify-center">
								<Loader2 className="h-8 w-8 animate-spin text-primary" />
							</div>
						) : (
							<div className="h-64">
								<ResponsiveContainer width="100%" height="100%">
									<PieChart>
										<Pie
											data={typeData}
											cx="50%"
											cy="50%"
											outerRadius={80}
											dataKey="percentage"
											label={({ type, percentage }) =>
												`${type}: ${percentage}%`
											}
										>
											{typeData?.map((fuel, index) => (
												<Cell
													key={`cell-${fuel.type}`}
													fill={COLORS[index % COLORS.length]}
												/>
											))}
										</Pie>
										<Tooltip
											formatter={(value) => [`${value}%`, "Porcentagem"]}
											labelFormatter={(label) => `Combustível: ${label}`}
											contentStyle={{
												backgroundColor: "var(--background)",
												border: "1px solid var(--border)",
												borderRadius: "6px",
											}}
										/>
									</PieChart>
								</ResponsiveContainer>
							</div>
						)}
					</CardContent>
				</Card>
			</div>

			{typeData && (
				<Card>
					<CardHeader>
						<CardTitle>Resumo de Vendas</CardTitle>
						<CardDescription>
							Detalhamento do volume vendido por tipo de combustível
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							{typeData.map((fuel, index) => (
								<div
									key={fuel.type}
									className="p-4 border rounded-lg space-y-2"
								>
									<div className="flex items-center gap-2">
										<div
											className="w-4 h-4 rounded-full"
											style={{ backgroundColor: COLORS[index] }}
										/>
										<span className="font-medium">{fuel.type}</span>
									</div>
									<div className="text-2xl font-bold">
										{fuel.volume.toLocaleString()}
									</div>
									<div className="text-sm text-muted-foreground">
										{fuel.percentage}% do total
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
};

export default GasStation;
