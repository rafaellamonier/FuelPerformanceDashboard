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

// Dados mutáveis em memória
let fuelVolumeData: FuelData[] = [
  { day: "Segunda", volume: 1250 },
  { day: "Terça", volume: 1100 },
  { day: "Quarta", volume: 1400 },
  { day: "Quinta", volume: 980 },
  { day: "Sexta", volume: 1650 },
  { day: "Sábado", volume: 1850 },
  { day: "Domingo", volume: 1320 },
];

let fuelTypeDistribution: FuelTypeData[] = [
  { type: "Gasolina", percentage: 45, volume: 4500 },
  { type: "Etanol", percentage: 30, volume: 3000 },
  { type: "Diesel", percentage: 25, volume: 2500 },
];

const vhehicleTransportData: VehicleTransportData[] = [
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

const driverPerformance: DriverPerformance[] = [
  { criteria: "Pontualidade", score: 85, maxScore: 100 },
  { criteria: "Segurança", score: 92, maxScore: 100 },
  { criteria: "Avaliação Cliente", score: 78, maxScore: 100 },
  { criteria: "Eficiência Combustível", score: 88, maxScore: 100 },
  { criteria: "Cuidado com Veículos", score: 95, maxScore: 100 },
];

export const fetchFuelVolumeByDay = async (): Promise<FuelData[]> => {
  await delay(800);
  return fuelVolumeData;
};

export const fetchFuelTypeDistribution = async (p0: {
  start: Date | null;
  end: Date | null;
}): Promise<FuelTypeData[]> => {
  await delay(600);

  // Se houver filtro de data, simular dados filtrados
  if (p0.start || p0.end) {
    const multiplier = 0.8 + Math.random() * 0.4;
    return fuelTypeDistribution.map((item) => ({
      ...item,
      volume: Math.floor(item.volume * multiplier),
      percentage: Math.round(item.percentage * multiplier),
    }));
  }

  return fuelTypeDistribution;
};

export const fetchVehicleTransportData = async (p0: {
  start: Date | null;
  end: Date | null;
}): Promise<VehicleTransportData[]> => {
  await delay(1000);

  // Simulate occasional error
  if (Math.random() < 0.9) {
    throw new Error("Erro na conexão com o servidor");
  }

  // Se houver filtro de data, simular dados filtrados
  if (p0.start || p0.end) {
    const multiplier = 0.8 + Math.random() * 0.4;
    return vhehicleTransportData.map((item) => ({
      ...item,
      vehicles: Math.floor(item.vehicles * multiplier),
    }));
  }

  return vhehicleTransportData;
};

export const fetchDriverPerformance = async (p0: {
  start: unknown;
  end: unknown;
}): Promise<DriverPerformance[]> => {
  await delay(700);

  // Se houver filtro de data, simular dados filtrados
  if (p0.start || p0.end) {
    const multiplier = 0.8 + Math.random() * 0.4;
    return driverPerformance.map((item) => ({
      ...item,
      score: Math.floor(item.score * multiplier),
      maxScore: Math.round(item.maxScore * multiplier),
    }));
  }

  return driverPerformance;
};

// Mock mutation function que altera os dados
export const updateFuelData = async (): Promise<void> => {
  await delay(1000);

  // Altera aleatoriamente os volumes em até 10%
  fuelVolumeData = fuelVolumeData.map((item) => ({
    ...item,
    volume: Math.round(item.volume * (0.9 + Math.random() * 0.2)), // entre -10% e +10%
  }));

  fuelTypeDistribution = fuelTypeDistribution.map((item) => {
    const newVolume = Math.round(item.volume * (0.9 + Math.random() * 0.2));
    return {
      ...item,
      volume: newVolume,
    };
  });

  const totalTypeVolume = fuelTypeDistribution.reduce(
    (sum, item) => sum + item.volume,
    0,
  );

  fuelTypeDistribution = fuelTypeDistribution.map((item) => ({
    ...item,
    percentage: Math.round((item.volume / totalTypeVolume) * 100),
  }));
};

export const updateDistributorData = async (): Promise<void> => {
  await delay(1000);

  // Simula a atualização dos dados de transporte de veículos
  vhehicleTransportData.forEach((item) => {
    item.vehicles = Math.round(item.vehicles * (0.9 + Math.random() * 0.2)); // entre -10% e +10%
  });

  // Simula a atualização do desempenho dos motoristas
  driverPerformance.forEach((item) => {
    item.score = Math.round(
      item.score * (0.9 + Math.random() * 0.2), // entre -10% e +10%
    );
    item.maxScore = 100; // Mantém o máximo fixo
  });

  // Log para simular sucesso na atualização
  console.log("Dados de combustível atualizados com sucesso!");
};
