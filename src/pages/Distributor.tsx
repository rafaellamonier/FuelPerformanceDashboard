import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  useDriverPerformance,
  useVehicleTransportData,
  useUpdateDistributorData,
} from "./queries/distributorQueries";

import { Truck, Users, AlertCircle, RefreshCw } from "lucide-react";
import { Loader2 as Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DateRangeFilter } from "@/components/DateRangeFilter";
import { Skeleton } from "@/components/ui/skeleton";

function RadarChartSkeleton() {
  return (
    <div className="w-full max-w-md p-4 rounded-xl bg-white space-y-6">
      {/* Radar chart simulado */}
      <div className="flex justify-center">
        <div className="relative w-48 h-48">
          {/* Círculo externo simulando o gráfico */}
          <Skeleton className="w-full h-full rounded-full absolute" />

          {/* Linhas em estrela (simples, decorativo) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-px bg-muted/50 rotate-0 absolute" />
            <div className="w-full h-px bg-muted/50 rotate-60 absolute" />
            <div className="w-full h-px bg-muted/50 rotate-120 absolute" />
          </div>
        </div>
      </div>
    </div>
  );
}

function LineChartSkeleton() {
  return (
    <div className="w-full max-w-xl p-4 rounded-xl bg-white space-y-6">
      {/* Área do gráfico */}
      <div className="relative h-56 w-full bg-muted/30 rounded-md overflow-hidden">
        {/* Linha simulada */}
        <svg className="absolute inset-0 w-full h-full">
          <polyline
            points="0,150 50,120 100,100 150,80 200,60 250,80 300,110 350,140 400,150"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="3"
          />
        </svg>
      </div>

      {/* Eixo X simulado */}
      <div className="flex justify-between px-2">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-3 w-8" />
        ))}
      </div>
    </div>
  );
}

const Distributor = () => {
  const [dateRange, setDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });

  const {
    data: transportData,
    isLoading: transportLoading,
    error: transportError,
    refetch: refetchTransport,
  } = useVehicleTransportData(dateRange.start, dateRange.end);

  const {
    data: performanceData,
    isLoading: performanceLoading,
    error: performanceError,
  } = useDriverPerformance(dateRange.start, dateRange.end);

  const updateMutation = useUpdateDistributorData();

  const handleUpdateData = () => {
    updateMutation.mutate();
  };

  const handleRetry = () => {
    refetchTransport();
  };

  useEffect(() => {
    if (transportError || performanceError) {
      if (transportError) {
        toast.error("Erro ao carregar dados de transporte!", {
          unstyled: true,
          action: {
            label: (
              <Button
                variant="outline"
                size="sm"
                className="text-white bg-accent-foreground"
              >
                Reiniciar
              </Button>
            ),
            onClick: handleRetry,
          },
          style: {
            maxWidth: "500px",
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            backgroundColor: "var(--destructive)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          },
          className: "bg-destructive text-white",
        });
      }
      if (performanceError) {
        toast.error("Erro ao carregar dados de transporte. Tente novamente.", {
          unstyled: true,
          action: {
            label: (
              <Button
                variant="outline"
                size="sm"
                className="text-white bg-accent-foreground"
              >
                Reiniciar
              </Button>
            ),
            onClick: handleRetry,
          },
          style: {
            maxWidth: "400px",
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            backgroundColor: "var(--destructive)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          },
          className: "bg-destructive text-white",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [performanceError, transportError]);

  const isLoading =
    updateMutation.isPending || performanceLoading || transportLoading;

  const handleDateRangeChange = (
    startDate: Date | null,
    endDate: Date | null,
  ) => {
    setDateRange({ start: startDate, end: endDate });
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-center justify-between flex-col md:flex-row">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold flex items-center gap-2 md:text-3xl text-center md:text-left justify-center md:justify-start">
            <Truck className="h-8 w-8 text-primary" />
            Painel da Distribuidora
          </h1>
          <p className="text-muted-foreground text-center md:text-left">
            Monitoramento de transporte de veículos e performance de motoristas
          </p>
        </div>
        <Button
          onClick={handleUpdateData}
          disabled={updateMutation.isPending}
          className="flex items-center gap-2 cursor-pointer"
        >
          {isLoading ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          Atualizar Dados
        </Button>
      </div>

      <DateRangeFilter
        onDateRangeChange={handleDateRangeChange}
        className="border rounded-lg p-4 bg-card"
      />

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
            {isLoading ? (
              <div className="h-64 flex items-center justify-center">
                <LineChartSkeleton />
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
                      labelStyle={{ color: "var(--foreground)" }}
                      contentStyle={{
                        backgroundColor: "var(--background)",
                        border: "1px solid var(--border)",
                        borderRadius: "6px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="vehicles"
                      stroke="var(--primary)"
                      strokeWidth={3}
                      dot={{
                        fill: "var(--primary)",
                        strokeWidth: 2,
                        r: 4,
                      }}
                      activeDot={{
                        r: 6,
                        stroke: "var(--primary)",
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
            {isLoading ? (
              <div className="h-64 flex items-center justify-center">
                <RadarChartSkeleton />
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
                      labelStyle={{ color: "var(--foreground)" }}
                      contentStyle={{
                        backgroundColor: "var(--background)",
                        border: "1px solid var(--border)",
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
                  {isLoading ? (
                    <Skeleton className="w-16 h-4" />
                  ) : (
                    transportData
                      .reduce((sum, month) => sum + month.vehicles, 0)
                      .toLocaleString()
                  )}
                </div>
              </div>
              <div className="p-4 border rounded-lg space-y-2">
                <div className="text-sm text-muted-foreground">
                  Média Mensal
                </div>
                <div className="text-2xl font-bold">
                  {isLoading ? (
                    <Skeleton className="w-16 h-4" />
                  ) : (
                    Math.round(
                      transportData.reduce(
                        (sum, month) => sum + month.vehicles,
                        0,
                      ) / transportData.length,
                    ).toLocaleString()
                  )}
                </div>
              </div>
              <div className="p-4 border rounded-lg space-y-2">
                <div className="text-sm text-muted-foreground">Melhor Mês</div>
                <div className="text-2xl font-bold">
                  {isLoading ? (
                    <Skeleton className="w-16 h-4" />
                  ) : (
                    transportData
                      .reduce((max, month) => Math.max(max, month.vehicles), 0)
                      .toLocaleString()
                  )}
                </div>
              </div>
              <div className="p-4 border rounded-lg space-y-2">
                <div className="text-sm text-muted-foreground">Pior Mês</div>
                <div className="text-2xl font-bold">
                  {isLoading ? (
                    <Skeleton className="w-16 h-4" />
                  ) : (
                    transportData
                      .reduce(
                        (min, month) => Math.min(min, month.vehicles),
                        Infinity,
                      )
                      .toLocaleString()
                  )}
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
                      {isLoading ? (
                        <Skeleton className="w-16 h-4" />
                      ) : (
                        `${item.score}/${item.maxScore} pontos`
                      )}
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
                      {isLoading ? (
                        <Skeleton className="w-12 h-4" />
                      ) : (
                        `${item.score}%`
                      )}
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
