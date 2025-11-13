import { AuraHeader } from '@/components/AuraHeader';
import { useRoleStore } from '@/store/useRoleStore';
import { UCCCDashboard } from './dashboards/UCCCDashboard';
import { WaterQualityDashboard } from './dashboards/WaterQualityDashboard';
import { WasteManagementDashboard } from './dashboards/WasteManagementDashboard';
import { PublicSafetyDashboard } from './dashboards/PublicSafetyDashboard';
import { CitizenDashboard } from './dashboards/CitizenDashboard';

const Dashboard = () => {
  const { currentRole } = useRoleStore();

  const renderDashboard = () => {
    switch (currentRole) {
      case 'uccc_operator':
        return <UCCCDashboard />;
      case 'environmental_team':
        return <WaterQualityDashboard />;
      case 'cleanup_crew':
        return <WasteManagementDashboard />;
      case 'emergency_services':
        return <PublicSafetyDashboard />;
      case 'citizen':
        return <CitizenDashboard />;
      default:
        return <UCCCDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AuraHeader />

      <div className="container mx-auto px-4 md:px-6 py-6">
        {renderDashboard()}
      </div>
    </div>
  );
};

export default Dashboard;
