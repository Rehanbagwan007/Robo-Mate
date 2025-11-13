import { Button } from '@/components/ui/button';
import { useRoleStore, UserRole } from '@/store/useRoleStore';
import { Shield, Leaf, Trash2, AlertCircle, Users } from 'lucide-react';

const roles: { id: UserRole; label: string; icon: any }[] = [
  { id: 'uccc_operator', label: 'UCCC Operator', icon: Shield },
  { id: 'environmental_team', label: 'Environmental Team', icon: Leaf },
  { id: 'cleanup_crew', label: 'Cleanup Crew', icon: Trash2 },
  { id: 'emergency_services', label: 'Emergency Services', icon: AlertCircle },
  { id: 'citizen', label: 'Citizen View', icon: Users },
];

export const RoleSwitcher = () => {
  const { currentRole, setRole } = useRoleStore();

  return (
    <div className="flex flex-wrap gap-2">
      {roles.map((role) => (
        <Button
          key={role.id}
          variant={currentRole === role.id ? 'default' : 'outline'}
          size="sm"
          onClick={() => setRole(role.id)}
          className="flex items-center gap-2"
        >
          <role.icon className="h-4 w-4" />
          <span className="hidden sm:inline">{role.label}</span>
        </Button>
      ))}
    </div>
  );
};
