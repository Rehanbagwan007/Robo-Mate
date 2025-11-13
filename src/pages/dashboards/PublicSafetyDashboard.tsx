import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Shield, Video, TrendingUp, AlertTriangle, MapPin, Clock } from 'lucide-react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

const responseTimeData = [
  { day: 'Mon', time: 3.2 },
  { day: 'Tue', time: 2.8 },
  { day: 'Wed', time: 2.5 },
  { day: 'Thu', time: 3.1 },
  { day: 'Fri', time: 2.4 },
  { day: 'Sat', time: 2.9 },
  { day: 'Sun', time: 2.7 },
];

const alertHistory = [
    { status: 'Resolved', time: '10:15 AM', title: 'Drowning Detected', details: ['Promenade Cam 2', 'Sabarmati Zone B', 'Response Time: 3 mins'], resolvedAt: '10:18 AM'},
    { status: 'In Progress', time: '11:30 AM', title: 'Unsafe Entry', details: ['Promenade Cam 5', 'Sabarmati Zone D', 'Response Time: 2 mins']},
    { status: 'Resolved', time: '12:50 PM', title: 'Crowd Detection', details: ['Promenade Cam 1', 'Sabarmati Zone A', 'Response Time: 5 mins'], resolvedAt: '12:50 PM'}
]

const patrolSchedule = [
    { unit: 'Patrol Unit 1', zone: 'Zone A-B', status: 'On Duty', nextCheck: '2:00 PM' },
    { unit: 'Patrol Unit 2', zone: 'Zone C-D', status: 'On Duty', nextCheck: '2:15 PM' },
    { unit: 'Patrol Unit 3', zone: 'Zone E', status: 'Break', nextCheck: '3:00 PM' },
]

export const PublicSafetyDashboard = () => {
  return (
    <div className="space-y-6">
        <div className="flex justify-between">
            <Badge className="p-2 bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20">
                <AlertTriangle className="h-4 w-4 mr-1"/>
                Zone B LIVE
            </Badge>
             <Badge className="p-2 bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20">
                <AlertTriangle className="h-4 w-4 mr-1"/>
                Zone C LIVE
            </Badge>
             <Badge className="p-2 bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20">
                <AlertTriangle className="h-4 w-4 mr-1"/>
                Zone C LIVE
            </Badge>
        </div>
      <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <CardHeader>
                <CardTitle>Alert History</CardTitle>
                <CardDescription>Recent safety incidents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {alertHistory.map((alert, i) => (
                    <div key={i}>
                        <div className="flex items-center gap-2">
                            <Badge variant={alert.status === 'Resolved' ? 'secondary' : 'default'}>{alert.status}</Badge>
                            <span className="text-xs text-muted-foreground">{alert.time}</span>
                        </div>
                        <p className="font-semibold my-1">{alert.title}</p>
                        <div className="text-xs text-muted-foreground space-y-1">
                            {alert.details.map((detail, j) => (
                                <div key={j} className="flex items-center gap-1.5">
                                    <MapPin className="h-3 w-3"/>
                                    <p>{detail}</p>
                                </div>
                            ))}
                        </div>
                        {alert.resolvedAt && (
                            <div className="flex items-center text-xs text-green-600 gap-1.5 mt-1">
                                <Clock className="h-3 w-3"/>
                                <p>Resolved at {alert.resolvedAt}</p>
                            </div>
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>

         <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
                        <Bar dataKey="time" fill="#3B82F6" name="Response Time" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
      </div>
      
      <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardHeader>
            <CardTitle>Live Camera Feeds</CardTitle>
            <CardDescription>Real-time surveillance of promenade zones</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="p-4 border rounded-lg flex flex-col items-center justify-center space-y-2 bg-muted/20">
                    <Video className="h-10 w-10 text-muted-foreground"/>
                    <p className="text-sm font-medium">Promenade Cam {i+1}</p>
                    <p className="text-xs text-muted-foreground">Zone {String.fromCharCode(65 + i)}</p>
                    <Badge className="bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20">
                        <div className="h-2 w-2 bg-red-500 rounded-full mr-1.5"></div>
                        LIVE
                    </Badge>
                </div>
            ))}
        </CardContent>
      </Card>
      
       <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardHeader>
            <CardTitle>Active Patrol Schedule</CardTitle>
            <CardDescription>Real-time patrol unit tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {patrolSchedule.map((patrol) => (
              <div
                key={patrol.unit}
                className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors flex justify-between items-center"
              >
                <div>
                    <p className="font-semibold">{patrol.unit}</p>
                    <p className="text-sm text-muted-foreground">Zone {patrol.zone}</p>
                </div>
                <div className="text-right">
                    <Badge variant={patrol.status === 'On Duty' ? 'default' : 'secondary'}>{patrol.status}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">Next Check: {patrol.nextCheck}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
    </div>
  );
};
