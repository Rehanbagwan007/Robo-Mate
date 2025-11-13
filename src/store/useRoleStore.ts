import { create } from 'zustand';

export type UserRole = 'uccc_operator' | 'environmental_team' | 'cleanup_crew' | 'emergency_services' | 'citizen';

interface RoleStore {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
}

export const useRoleStore = create<RoleStore>((set) => ({
  currentRole: 'uccc_operator',
  setRole: (role) => set({ currentRole: role }),
}));
