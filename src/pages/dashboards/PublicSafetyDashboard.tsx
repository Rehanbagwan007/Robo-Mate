import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Video, AlertTriangle, Clock, CheckCircle2, Users, MapPin } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const alertHistory = [
  {
    id: 1,
    type: 'Drowning Detected',
    camera: 'Promenade Cam 2',
    timestamp: '10:15 AM',
    location: 'Sabarmati Zone B',
    status: 'Resolved',
    resolutionTime: '10:18 AM',
    responseTime: '3 mins',
  },
  {
    id: 2,
    type: 'Unsafe Entry',
    camera: 'Promenade Cam 5',
    timestamp: '11:30 AM',
    location: 'Sabarmati Zone D',
    status: 'In Progress',
    resolutionTime: null,
    responseTime: '2 mins',
  },
  {
    id: 3,
    type: 'Crowd Detection',
    camera: 'Promenade Cam 1',
    timestamp: '12:45 PM',
    location: 'Sabarmati Zone A',
    status: 'Resolved',
    resolutionTime: '12:50 PM',
    responseTime: '5 mins',
  },
];

const responseTimeData = [
  { day: 'Mon', avgTime: 3.2 },
  { day: 'Tue', avgTime: 2.8 },
  { day: 'Wed', avgTime: 2.5 },
  { day: 'Thu', avgTime: 3.1 },
  { day: 'Fri', avgTime: 2.3 },
  { day: 'Sat', avgTime: 2.7 },
  { day: 'Sun', avgTime: 2.9 },
];

const patrolSchedule = [
  { id: 1, unit: 'Patrol Unit 1', zone: 'Zone A-B', status: 'On Duty', nextCheck: '2:00 PM' },
  { id: 2, unit: 'Patrol Unit 2', zone: 'Zone C-D', status: 'On Duty', nextCheck: '2:15 PM' },
  { id: 3, unit: 'Patrol Unit 3', zone: 'Zone E', status: 'Break', nextCheck: '3:00 PM' },
];

export const PublicSafetyDashboard = () => {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1</div>
            <p className="text-xs text-destructive mt-1">1 in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2.5<span className="text-lg text-muted-foreground">m</span></div>
            <p className="text-xs text-green-600 mt-1">-30s from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">2 drowning • 6 unsafe entry</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Patrols</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2<span className="text-lg text-muted-foreground">/3</span></div>
            <p className="text-xs text-muted-foreground mt-1">1 on break</p>
          </CardContent>
        </Card>
      </div>

      {/* Live Camera Feeds */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-primary" />
            Live Camera Feeds
          </CardTitle>
          <CardDescription>Real-time surveillance of promenade zones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((cam) => (
              <div
                key={cam}
                className="relative rounded-lg overflow-hidden bg-muted aspect-video group cursor-pointer hover:ring-2 hover:ring-primary transition-all"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Video className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm font-medium">Promenade Cam {cam}</p>
                    <p className="text-xs text-muted-foreground">Zone {String.fromCharCode(64 + Math.ceil(cam / 2))}</p>
                    <Badge className="mt-2 bg-red-600">
                      <div className="h-2 w-2 bg-white rounded-full mr-1 animate-pulse" />
                      LIVE
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alert History & Response Times */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Alert History */}
        <Card>
          <CardHeader>
            <CardTitle>Alert History</CardTitle>
            <CardDescription>Recent safety incidents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {alertHistory.map((alert) => (
              <div
                key={alert.id}
                className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant={alert.status === 'Resolved' ? 'secondary' : 'default'}
                        className="text-xs"
                      >
                        {alert.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                    </div>
                    <p className="text-sm font-medium">{alert.type}</p>
                  </div>
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p className="flex items-center gap-1">
                    <Video className="h-3 w-3" />
                    {alert.camera}
                  </p>
                  <p className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {alert.location}
                  </p>
                  <p className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Response Time: <span className="font-medium">{alert.responseTime}</span>
                  </p>
                  {alert.resolutionTime && (
                    <p className="flex items-center gap-1 text-green-600">
                      <CheckCircle2 className="h-3 w-3" />
                      Resolved at {alert.resolutionTime}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Response Time Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Response Time Trend</CardTitle>
            <CardDescription>Average alert-to-dispatch time (minutes)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="avgTime" fill="hsl(var(--primary))" name="Avg Response Time (mins)" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200">
              <p className="text-sm font-medium text-green-900 dark:text-green-100">
                Target: &lt; 3 minutes • Current Avg: 2.5 minutes ✓
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patrol Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Active Patrol Schedule</CardTitle>
          <CardDescription>Real-time patrol unit tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {patrolSchedule.map((patrol) => (
              <div
                key={patrol.id}
                className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm font-medium">{patrol.unit}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {patrol.zone}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={patrol.status === 'On Duty' ? 'default' : 'secondary'}
                      className="mb-1"
                    >
                      {patrol.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      Next Check: {patrol.nextCheck}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
