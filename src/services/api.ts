// Mock API data for demonstration
export interface FuelData {
	day: string;
	volume: number;
}

export interface FuelTypeData {
	type: string;
	percentage: number;
	volume: number;
}

export interface VehicleTransportData {
	month: string;
	vehicles: number;
}

export interface DriverPerformance {
	criteria: string;
	score: number;
	maxScore: number;
}

// Simulated API delays
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchFuelVolumeByDay = async (): Promise<FuelData[]> => {
	await delay(800);
	return [
		{ day: "Segunda", volume: 1250 },
		{ day: "Terça", volume: 1100 },
		{ day: "Quarta", volume: 1400 },
		{ day: "Quinta", volume: 980 },
		{ day: "Sexta", volume: 1650 },
		{ day: "Sábado", volume: 1850 },
		{ day: "Domingo", volume: 1320 },
	];
};

export const fetchFuelTypeDistribution = async (): Promise<FuelTypeData[]> => {
	await delay(600);
	return [
		{ type: "Gasolina", percentage: 45, volume: 4500 },
		{ type: "Etanol", percentage: 30, volume: 3000 },
		{ type: "Diesel", percentage: 25, volume: 2500 },
	];
};

export const fetchVehicleTransportData = async (): Promise<
	VehicleTransportData[]
> => {
	await delay(1000);

	// Simulate occasional error
	if (Math.random() < 0.2) {
		throw new Error("Erro na conexão com o servidor");
	}

	return [
		{ month: "Jan", vehicles: 145 },
		{ month: "Fev", vehicles: 132 },
		{ month: "Mar", vehicles: 178 },
		{ month: "Abr", vehicles: 156 },
		{ month: "Mai", vehicles: 189 },
		{ month: "Jun", vehicles: 167 },
		{ month: "Jul", vehicles: 195 },
		{ month: "Ago", vehicles: 203 },
		{ month: "Set", vehicles: 178 },
		{ month: "Out", vehicles: 187 },
		{ month: "Nov", vehicles: 165 },
		{ month: "Dez", vehicles: 142 },
	];
};

export const fetchDriverPerformance = async (): Promise<
	DriverPerformance[]
> => {
	await delay(700);
	return [
		{ criteria: "Pontualidade", score: 85, maxScore: 100 },
		{ criteria: "Segurança", score: 92, maxScore: 100 },
		{ criteria: "Avaliação Cliente", score: 78, maxScore: 100 },
		{ criteria: "Eficiência Combustível", score: 88, maxScore: 100 },
		{ criteria: "Cuidado com Veículos", score: 95, maxScore: 100 },
	];
};

// Mock mutation function
export const updateFuelData = async (): Promise<void> => {
	await delay(1200);
	// Simulate mutation success
	console.log("Dados atualizados com sucesso!");
};
