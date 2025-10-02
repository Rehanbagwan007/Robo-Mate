import { create } from 'zustand';

export interface Alert {
  id: string;
  type: 'water_quality' | 'flood' | 'drowning' | 'waste' | 'system';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  location?: string;
  timestamp: Date;
  resolved: boolean;
}

interface AlertState {
  alerts: Alert[];
  unreadCount: number;
  addAlert: (alert: Alert) => void;
  resolveAlert: (id: string) => void;
  setAlerts: (alerts: Alert[]) => void;
  markAllRead: () => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  alerts: [],
  unreadCount: 0,
  addAlert: (alert) =>
    set((state) => ({
      alerts: [alert, ...state.alerts],
      unreadCount: state.unreadCount + 1,
    })),
  resolveAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.map((a) => (a.id === id ? { ...a, resolved: true } : a)),
    })),
  setAlerts: (alerts) => set({ alerts }),
  markAllRead: () => set({ unreadCount: 0 }),
}));
