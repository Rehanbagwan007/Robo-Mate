import { create } from 'zustand';

export interface SensorData {
  id: string;
  location: string;
  latitude: number;
  longitude: number;
  ph: number;
  turbidity: number;
  dissolvedOxygen: number;
  temperature: number;
  timestamp: Date;
  status: 'normal' | 'warning' | 'critical';
}

interface SensorState {
  sensors: SensorData[];
  selectedSensor: SensorData | null;
  setSensors: (sensors: SensorData[]) => void;
  addSensor: (sensor: SensorData) => void;
  updateSensor: (id: string, data: Partial<SensorData>) => void;
  setSelectedSensor: (sensor: SensorData | null) => void;
}

export const useSensorStore = create<SensorState>((set) => ({
  sensors: [],
  selectedSensor: null,
  setSensors: (sensors) => set({ sensors }),
  addSensor: (sensor) => set((state) => ({ sensors: [...state.sensors, sensor] })),
  updateSensor: (id, data) =>
    set((state) => ({
      sensors: state.sensors.map((s) => (s.id === id ? { ...s, ...data } : s)),
    })),
  setSelectedSensor: (sensor) => set({ selectedSensor: sensor }),
}));
