import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Fuel, Truck, TrendingUp, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Painel de Análise de Dados
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Sistema completo de monitoramento para posto de combustível e
          distribuidora de transporte
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Fuel className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Posto de Combustível</CardTitle>
            <CardDescription>
              Análise de abastecimento, tipos de combustível e volume por dia
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span>Gráfico de Barras</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-blue-500" />
                <span>Gráfico de Pizza</span>
              </div>
            </div>
            <Button asChild className="w-full">
              <Link to="/posto">Ver Dashboard do Posto</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Distribuidora</CardTitle>
            <CardDescription>
              Transporte de veículos, performance de motoristas e métricas
              mensais
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span>Gráfico de Linha</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-purple-500" />
                <span>Gráfico Radar</span>
              </div>
            </div>
            <Button asChild className="w-full">
              <Link to="/distribuidora">Ver Dashboard da Distribuidora</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
