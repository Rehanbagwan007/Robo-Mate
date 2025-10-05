import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Droplets, Plane, AlertTriangle, Waves, Users, Leaf, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-foreground" />
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-foreground">Citizen Dashboard</h1>
                <p className="text-sm text-muted-foreground">Monitor water quality and environmental data</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-6 space-y-6">

        {/* Stats Overview */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-primary/20 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Water Quality</CardTitle>
              <Droplets className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">Good</div>
              <p className="text-xs text-muted-foreground">15 sensors active</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Drones</CardTitle>
              <Plane className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">3/5</div>
              <p className="text-xs text-muted-foreground">2 on sampling mission</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">2</div>
              <p className="text-xs text-muted-foreground">1 critical, 1 warning</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Flood Risk</CardTitle>
              <Waves className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">Low</div>
              <p className="text-xs text-muted-foreground">Water level: 2.3m</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Real-time Water Quality Map</CardTitle>
              <CardDescription>IoT sensor locations and current readings</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center bg-muted/50 rounded-lg">
              <div className="text-center">
                <Droplets className="h-16 w-16 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Interactive map visualization</p>
                <p className="text-sm text-muted-foreground mt-2">Showing sensor locations and water quality data</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system events and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { icon: Droplets, text: 'Sensor #7 detected pH anomaly', time: '5 min ago', color: 'text-primary' },
                { icon: Plane, text: 'Drone #2 completed sampling mission', time: '12 min ago', color: 'text-primary' },
                { icon: Users, text: 'New citizen report: Waste accumulation', time: '23 min ago', color: 'text-orange-600' },
                { icon: Leaf, text: 'Biodiversity survey updated', time: '1 hour ago', color: 'text-green-600' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.text}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-primary/20 lg:col-span-2">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <Button className="h-auto flex flex-col items-center gap-2 p-6" variant="outline">
                  <AlertTriangle className="h-8 w-8 text-primary" />
                  <div className="text-center">
                    <p className="font-medium">Report Issue</p>
                    <p className="text-xs text-muted-foreground">Submit a concern</p>
                  </div>
                </Button>
                <Button className="h-auto flex flex-col items-center gap-2 p-6" variant="outline">
                  <Droplets className="h-8 w-8 text-primary" />
                  <div className="text-center">
                    <p className="font-medium">Water Quality</p>
                    <p className="text-xs text-muted-foreground">View live data</p>
                  </div>
                </Button>
                <Button className="h-auto flex flex-col items-center gap-2 p-6" variant="outline">
                  <Users className="h-8 w-8 text-primary" />
                  <div className="text-center">
                    <p className="font-medium">Volunteer</p>
                    <p className="text-xs text-muted-foreground">Join activities</p>
                  </div>
                </Button>
                <Button className="h-auto flex flex-col items-center gap-2 p-6" variant="outline">
                  <Leaf className="h-8 w-8 text-primary" />
                  <div className="text-center">
                    <p className="font-medium">Learn</p>
                    <p className="text-xs text-muted-foreground">Educational content</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 lg:col-span-2">
            <CardHeader>
              <CardTitle>Water Quality Trends</CardTitle>
              <CardDescription>Last 7 days overview</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center bg-muted/50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-16 w-16 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Chart visualization</p>
                <p className="text-sm text-muted-foreground mt-2">pH levels, temperature, and dissolved oxygen</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
