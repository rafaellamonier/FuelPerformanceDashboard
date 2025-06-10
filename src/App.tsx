import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Index from "./pages/Index";
import Posto from "./pages/GasStation.tsx";
import Distributor from "./pages/Distributor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000, // 5 minutes
			refetchOnWindowFocus: false,
		},
	},
});

const App = () => (
	<QueryClientProvider client={queryClient}>
		<TooltipProvider>
			<Sonner />
			<BrowserRouter>
				<SidebarProvider>
					<div className="min-h-screen flex w-full bg-background">
						<AppSidebar />
						<div className="flex-1 flex flex-col">
							<header className="h-16 border-b bg-card flex items-center px-6 shadow-sm">
								<SidebarTrigger className="mr-4" />
								<h1 className="text-xl font-semibold text-foreground">
									Painel Analítico - Posto & Distribuidora
								</h1>
							</header>
							<main className="flex-1 p-6">
								<Routes>
									<Route path="/" element={<Index />} />
									<Route path="/posto" element={<Posto />} />
									<Route path="/distribuidora" element={<Distributor />} />
									<Route path="*" element={<NotFound />} />
								</Routes>
							</main>
						</div>
					</div>
				</SidebarProvider>
			</BrowserRouter>
		</TooltipProvider>
	</QueryClientProvider>
);

export default App;
