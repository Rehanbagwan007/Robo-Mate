import { create } from 'zustand';

export interface DroneData {
  id: string;
  name: string;
  status: 'idle' | 'flying' | 'sampling' | 'returning' | 'offline';
  latitude: number;
  longitude: number;
  altitude: number;
  battery: number;
  lastSample?: {
    location: string;
    timestamp: Date;
    parameters: {
      ph: number;
      temperature: number;
      turbidity: number;
    };
  };
}

interface DroneState {
  drones: DroneData[];
  selectedDrone: DroneData | null;
  setDrones: (drones: DroneData[]) => void;
  updateDrone: (id: string, data: Partial<DroneData>) => void;
  setSelectedDrone: (drone: DroneData | null) => void;
}

export const useDroneStore = create<DroneState>((set) => ({
  drones: [],
  selectedDrone: null,
  setDrones: (drones) => set({ drones }),
  updateDrone: (id, data) =>
    set((state) => ({
      drones: state.drones.map((d) => (d.id === id ? { ...d, ...data } : d)),
    })),
  setSelectedDrone: (drone) => set({ selectedDrone: drone }),
}));
