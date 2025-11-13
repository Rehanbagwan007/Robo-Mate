import { create } from 'zustand';

interface Alert {
  id: number;
  title: string;
  description: string;
  category: string;
  location_name: string;
}

interface AlertState {
  alerts: Alert[];
  addAlert: (alert: Alert) => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  alerts: [],
  addAlert: (alert) => set((state) => ({ alerts: [alert, ...state.alerts] })),
}));
