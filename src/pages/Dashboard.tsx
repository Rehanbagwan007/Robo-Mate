import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Droplets, Plane, AlertTriangle, Waves, Users, Leaf } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight">Smart Riverfront Management</h1>
          <p className="text-muted-foreground">Real-time monitoring and control system</p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Water Quality</CardTitle>
              <Droplets className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">Good</div>
              <p className="text-xs text-muted-foreground">15 sensors active</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Drones</CardTitle>
              <Plane className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">3/5</div>
              <p className="text-xs text-muted-foreground">2 on sampling mission</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">2</div>
              <p className="text-xs text-muted-foreground">1 critical, 1 warning</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
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

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sensors">Water Quality</TabsTrigger>
            <TabsTrigger value="drones">Drones</TabsTrigger>
            <TabsTrigger value="waste">Waste Detection</TabsTrigger>
            <TabsTrigger value="safety">Safety</TabsTrigger>
            <TabsTrigger value="biodiversity">Biodiversity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Real-time Water Quality Map</CardTitle>
                  <CardDescription>IoT sensor locations and current readings</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center bg-muted/50 rounded-lg">
                  <p className="text-muted-foreground">Map visualization will be implemented here</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest system events and updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { icon: Droplets, text: 'Sensor #7 detected pH anomaly', time: '5 min ago' },
                    { icon: Plane, text: 'Drone #2 completed sampling mission', time: '12 min ago' },
                    { icon: Users, text: 'New citizen report: Waste accumulation', time: '23 min ago' },
                    { icon: Leaf, text: 'Biodiversity survey updated', time: '1 hour ago' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                      <item.icon className="h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.text}</p>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sensors">
            <Card>
              <CardHeader>
                <CardTitle>Water Quality Monitoring</CardTitle>
                <CardDescription>Real-time data from IoT sensors</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Sensor monitoring interface will be implemented here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="drones">
            <Card>
              <CardHeader>
                <CardTitle>Drone Fleet Management</CardTitle>
                <CardDescription>Control and monitor autonomous water sampling drones</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Drone control interface will be implemented here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="waste">
            <Card>
              <CardHeader>
                <CardTitle>Floating Waste Detection</CardTitle>
                <CardDescription>AI-powered waste identification and cleanup management</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Waste detection interface will be implemented here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="safety">
            <Card>
              <CardHeader>
                <CardTitle>Safety Monitoring</CardTitle>
                <CardDescription>Drowning detection and emergency response</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Safety monitoring interface will be implemented here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="biodiversity">
            <Card>
              <CardHeader>
                <CardTitle>Biodiversity Tracking</CardTitle>
                <CardDescription>Ecological monitoring and conservation insights</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Biodiversity tracking interface will be implemented here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
