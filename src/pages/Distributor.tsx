import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	Radar,
} from "recharts";
import {
	fetchVehicleTransportData,
	fetchDriverPerformance,
} from "@/services/api";
import { Loader2, Truck, Users, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Distributor = () => {
	const {
		data: transportData,
		isLoading: transportLoading,
		error: transportError,
		refetch: refetchTransport,
	} = useQuery({
		queryKey: ["vehicle-transport-data"],
		queryFn: fetchVehicleTransportData,
		retry: 2,
	});

	const {
		data: performanceData,
		isLoading: performanceLoading,
		error: performanceError,
	} = useQuery({
		queryKey: ["driver-performance"],
		queryFn: fetchDriverPerformance,
	});

	const handleRetry = () => {
		refetchTransport();
	};

	return (
		<div className="space-y-6">
			<div className="space-y-1">
				<h1 className="text-3xl font-bold flex items-center gap-2">
					<Truck className="h-8 w-8 text-primary" />
					Dashboard da Distribuidora
				</h1>
				<p className="text-muted-foreground">
					Monitoramento de transporte de veículos e performance de motoristas
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Truck className="h-5 w-5" />
							Veículos Transportados por Mês
						</CardTitle>
						<CardDescription>
							Evolução mensal do número de veículos transportados
						</CardDescription>
					</CardHeader>
					<CardContent>
						{transportLoading ? (
							<div className="h-64 flex items-center justify-center">
								<Loader2 className="h-8 w-8 animate-spin text-primary" />
							</div>
						) : transportError ? (
							<div className="h-64 flex flex-col items-center justify-center space-y-4">
								<AlertCircle className="h-12 w-12 text-red-500" />
								<div className="text-center space-y-2">
									<p className="text-red-600 font-medium">
										Erro ao carregar dados
									</p>
									<p className="text-sm text-muted-foreground">
										{transportError.message}
									</p>
									<Button onClick={handleRetry} variant="outline" size="sm">
										Tentar Novamente
									</Button>
								</div>
							</div>
						) : (
							<div className="h-64">
								<ResponsiveContainer width="100%" height="100%">
									<LineChart data={transportData}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="month" />
										<YAxis />
										<Tooltip
											formatter={(value) => [`${value}`, "Veículos"]}
											labelStyle={{ color: "hsl(var(--foreground))" }}
											contentStyle={{
												backgroundColor: "hsl(var(--background))",
												border: "1px solid hsl(var(--border))",
												borderRadius: "6px",
											}}
										/>
										<Line
											type="monotone"
											dataKey="vehicles"
											stroke="hsl(var(--primary))"
											strokeWidth={3}
											dot={{
												fill: "hsl(var(--primary))",
												strokeWidth: 2,
												r: 4,
											}}
											activeDot={{
												r: 6,
												stroke: "hsl(var(--primary))",
												strokeWidth: 2,
											}}
										/>
									</LineChart>
								</ResponsiveContainer>
							</div>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Users className="h-5 w-5" />
							Performance dos Motoristas
						</CardTitle>
						<CardDescription>
							Avaliação média da equipe em diferentes critérios
						</CardDescription>
					</CardHeader>
					<CardContent>
						{performanceLoading ? (
							<div className="h-64 flex items-center justify-center">
								<Loader2 className="h-8 w-8 animate-spin text-primary" />
							</div>
						) : performanceError ? (
							<div className="h-64 flex items-center justify-center">
								<div className="text-center text-red-600">
									Erro ao carregar dados de performance
								</div>
							</div>
						) : (
							<div className="h-64">
								<ResponsiveContainer width="100%" height="100%">
									<RadarChart data={performanceData}>
										<PolarGrid />
										<PolarAngleAxis dataKey="criteria" />
										<PolarRadiusAxis angle={90} domain={[0, 100]} />
										<Radar
											name="Score"
											dataKey="score"
											stroke="hsl(var(--primary))"
											fill="hsl(var(--primary))"
											fillOpacity={0.3}
											strokeWidth={2}
										/>
										<Tooltip
											formatter={(value) => [`${value}/100`, "Pontuação"]}
											labelStyle={{ color: "hsl(var(--foreground))" }}
											contentStyle={{
												backgroundColor: "hsl(var(--background))",
												border: "1px solid hsl(var(--border))",
												borderRadius: "6px",
											}}
										/>
									</RadarChart>
								</ResponsiveContainer>
							</div>
						)}
					</CardContent>
				</Card>
			</div>

			{/* Statistics Summary */}
			{transportData && (
				<Card>
					<CardHeader>
						<CardTitle>Estatísticas de Transporte</CardTitle>
						<CardDescription>
							Resumo dos dados de transporte do último ano
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
							<div className="p-4 border rounded-lg space-y-2">
								<div className="text-sm text-muted-foreground">
									Total de Veículos
								</div>
								<div className="text-2xl font-bold">
									{transportData
										.reduce((sum, month) => sum + month.vehicles, 0)
										.toLocaleString()}
								</div>
							</div>
							<div className="p-4 border rounded-lg space-y-2">
								<div className="text-sm text-muted-foreground">
									Média Mensal
								</div>
								<div className="text-2xl font-bold">
									{Math.round(
										transportData.reduce(
											(sum, month) => sum + month.vehicles,
											0,
										) / transportData.length,
									)}
								</div>
							</div>
							<div className="p-4 border rounded-lg space-y-2">
								<div className="text-sm text-muted-foreground">Melhor Mês</div>
								<div className="text-2xl font-bold">
									{Math.max(...transportData.map((month) => month.vehicles))}
								</div>
							</div>
							<div className="p-4 border rounded-lg space-y-2">
								<div className="text-sm text-muted-foreground">Pior Mês</div>
								<div className="text-2xl font-bold">
									{Math.min(...transportData.map((month) => month.vehicles))}
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			)}

			{performanceData && (
				<Card>
					<CardHeader>
						<CardTitle>Detalhes de Performance</CardTitle>
						<CardDescription>
							Pontuação detalhada por critério de avaliação
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{performanceData.map((item) => (
								<div
									key={item.criteria}
									className="flex items-center justify-between p-3 border rounded-lg"
								>
									<div className="space-y-1">
										<div className="font-medium">{item.criteria}</div>
										<div className="text-sm text-muted-foreground">
											{item.score}/{item.maxScore} pontos
										</div>
									</div>
									<div className="flex items-center gap-3">
										<div className="w-24 bg-muted rounded-full h-2">
											<div
												className="bg-primary h-2 rounded-full transition-all duration-300"
												style={{
													width: `${(item.score / item.maxScore) * 100}%`,
												}}
											/>
										</div>
										<div className="text-lg font-bold w-12 text-right">
											{item.score}%
										</div>
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

export default Distributor;
