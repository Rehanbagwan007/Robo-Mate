import { Home, Droplets, Plane, AlertTriangle, Trash2, Shield, Leaf, Users, FileText, Calendar, BookOpen, Settings, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/store/useAuthStore';

interface AppSidebarProps {
  userRole: 'admin' | 'citizen';
}

export function AppSidebar({ userRole }: AppSidebarProps) {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const adminItems = [
    { title: 'Dashboard', url: '/dashboard', icon: Home },
    { title: 'Water Quality', url: '/dashboard/sensors', icon: Droplets },
    { title: 'Drones', url: '/dashboard/drones', icon: Plane },
    { title: 'Citizen Reports', url: '/dashboard/reports', icon: FileText },
    { title: 'Waste Detection', url: '/dashboard/waste', icon: Trash2 },
    { title: 'Safety Monitoring', url: '/dashboard/safety', icon: Shield },
    { title: 'Biodiversity', url: '/dashboard/biodiversity', icon: Leaf },
    { title: 'Volunteers', url: '/dashboard/volunteers', icon: Calendar },
    { title: 'Awareness', url: '/dashboard/awareness', icon: BookOpen },
  ];

  const citizenItems = [
    { title: 'Home', url: '/dashboard', icon: Home },
    { title: 'Report Issue', url: '/dashboard/report-issue', icon: FileText },
    { title: 'My Reports', url: '/dashboard/my-reports', icon: AlertTriangle },
    { title: 'Volunteer', url: '/dashboard/volunteer', icon: Calendar },
    { title: 'Learn', url: '/dashboard/learn', icon: BookOpen },
    { title: 'Water Quality', url: '/dashboard/water-quality', icon: Droplets },
  ];

  const items = userRole === 'admin' ? adminItems : citizenItems;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    logout();
    navigate('/login');
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <div className="p-4 border-b border-border">
        <SidebarTrigger />
      </div>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{userRole === 'admin' ? 'Admin Panel' : 'Citizen Portal'}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted/50'
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border">
        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}