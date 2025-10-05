import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { AlertTriangle, MapPin, Video, Activity, Users, Droplets, Bell, CheckCircle2, XCircle } from 'lucide-react';

const AdminDashboard = () => {
  const activeAlerts = [
    { id: 1, location: 'Riverfront Zone A', severity: 'critical', type: 'Flood Detected', time: '2 min ago', status: 'active' },
    { id: 2, location: 'Riverfront Zone C', severity: 'warning', type: 'Water Level Rising', time: '15 min ago', status: 'monitoring' },
    { id: 3, location: 'Riverfront Zone B', severity: 'info', type: 'Device Check-in', time: '1 hour ago', status: 'resolved' },
  ];

  const deviceStatus = [
    { id: 'D001', location: 'Zone A', status: 'active', battery: 85, lastSignal: '1 min ago' },
    { id: 'D002', location: 'Zone B', status: 'active', battery: 92, lastSignal: '2 min ago' },
    { id: 'D003', location: 'Zone C', status: 'warning', battery: 23, lastSignal: '5 min ago' },
    { id: 'D004', location: 'Zone D', status: 'offline', battery: 0, lastSignal: '2 hours ago' },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-foreground" />
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Flood Monitoring & Emergency Response</p>
              </div>
            </div>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Bell className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Alerts</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
              <CardTitle className="text-sm font-medium">Active Devices</CardTitle>
              <Activity className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">3/4</div>
              <p className="text-xs text-muted-foreground">1 device offline</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">People at Risk</CardTitle>
              <Users className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">12</div>
              <p className="text-xs text-muted-foreground">In monitored zones</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Water Quality</CardTitle>
              <Droplets className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">Good</div>
              <p className="text-xs text-muted-foreground">15 sensors active</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {/* Active Alerts */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Active Alerts
              </CardTitle>
              <CardDescription>Real-time emergency notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeAlerts.map((alert) => (
                <div key={alert.id} className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge 
                          variant={alert.severity === 'critical' ? 'destructive' : alert.severity === 'warning' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {alert.severity}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{alert.time}</span>
                      </div>
                      <p className="font-medium text-sm">{alert.type}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3" />
                        {alert.location}
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Live Video Feeds */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-primary" />
                Live Camera Feeds
              </CardTitle>
              <CardDescription>Real-time video monitoring</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3].map((feed) => (
                <div key={feed} className="relative rounded-lg overflow-hidden bg-muted aspect-video group cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Video className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Camera Zone {String.fromCharCode(64 + feed)}</p>
                      <Badge className="mt-2 bg-red-600">
                        <div className="h-2 w-2 bg-white rounded-full mr-1 animate-pulse" />
                        LIVE
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Device Status */}
          <Card className="border-primary/20 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Device Status
              </CardTitle>
              <CardDescription>Monitor all connected flood detection devices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {deviceStatus.map((device) => (
                  <div key={device.id} className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm">{device.id}</span>
                      {device.status === 'active' ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : device.status === 'warning' ? (
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {device.location}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Battery:</span>
                        <span className={device.battery < 30 ? 'text-destructive font-medium' : 'text-foreground'}>
                          {device.battery}%
                        </span>
                      </div>
                      <div className="text-muted-foreground">
                        Last: {device.lastSignal}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Location Map Placeholder */}
          <Card className="border-primary/20 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Real-time Location Tracking
              </CardTitle>
              <CardDescription>GPS coordinates of active alerts and devices</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center bg-muted/50 rounded-lg">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Interactive map visualization</p>
                <p className="text-sm text-muted-foreground mt-2">Showing device locations and alert zones</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
