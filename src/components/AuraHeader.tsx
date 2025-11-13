import { Droplets } from 'lucide-react';
import { RoleSwitcher } from './RoleSwitcher';

export const AuraHeader = () => {
  return (
    <header className="bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Droplets className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">AURA</h1>
              <p className="text-xs text-muted-foreground">Aqua-Sense Unified Riverfront Assistant</p>
            </div>
          </div>
          <RoleSwitcher />
        </div>
      </div>
    </header>
  );
};
