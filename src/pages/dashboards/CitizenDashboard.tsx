import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Droplets, AlertTriangle, FileText, Activity, TrendingUp, MapPin, Camera } from 'lucide-react';
import { AuraMap } from '@/components/AuraMap';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const reportStats = [
  { name: 'Pollution', value: 40, color: '#ef4444' },
  { name: 'Waste', value: 40, color: '#f97316' },
  { name: 'Wildlife', value: 15, color: '#22c55e' },
  { name: 'Safety', value: 5, color: '#3b82f6' },
];

const myReports = [
  { id: 1, type: 'Floating Plastic', timestamp: '1 hour ago', status: 'Pending' },
  { id: 2, type: 'Unusual Odor', timestamp: '3 hours ago', status: 'Pending' },
  { id: 3, type: 'Water Discoloration', timestamp: 'Yesterday', status: 'Resolved' },
];

export const CitizenDashboard = () => {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">River Health</CardTitle>
            <Droplets className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">Good</div>
            <p className="text-xs text-muted-foreground mt-1">Overall quality: 85/100</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community Reports</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">45</div>
            <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Reports</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">2 pending • 1 resolved</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
            <p className="text-xs text-orange-600 mt-1">Check map for details</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Citizen Report Map */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Community Reports Map
            </CardTitle>
            <CardDescription>Recent citizen-submitted issues</CardDescription>
          </CardHeader>
          <CardContent>
            <AuraMap />
          </CardContent>
        </Card>

        {/* Submit New Report */}
        <Card>
          <CardHeader>
            <CardTitle>Submit New Report</CardTitle>
            <CardDescription>Help us keep the river clean</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" size="lg">
              <Camera className="h-5 w-5 mr-2" />
              Report an Issue
            </Button>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Quick tips:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Take a clear photo</li>
                <li>Enable location services</li>
                <li>Describe the issue clearly</li>
                <li>We'll respond within 24 hours</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Statistics & My Reports */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Report Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Community Report Statistics</CardTitle>
            <CardDescription>Last 7 days breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={reportStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {reportStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {reportStats.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* My Reports */}
        <Card>
          <CardHeader>
            <CardTitle>My Reports</CardTitle>
            <CardDescription>Track your submissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {myReports.map((report) => (
              <div
                key={report.id}
                className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant={report.status === 'Resolved' ? 'secondary' : 'default'}
                        className="text-xs"
                      >
                        {report.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{report.timestamp}</span>
                    </div>
                    <p className="text-sm font-medium">{report.type}</p>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full" size="sm">
              View All Reports
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Public River Health Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Public River Health Overview
          </CardTitle>
          <CardDescription>Current environmental status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground mb-2">Water Quality</p>
              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-600" style={{ width: '85%' }} />
                </div>
                <span className="text-sm font-medium">85%</span>
              </div>
            </div>
            <div className="p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground mb-2">Cleanliness</p>
              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-600" style={{ width: '78%' }} />
                </div>
                <span className="text-sm font-medium">78%</span>
              </div>
            </div>
            <div className="p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground mb-2">Safety</p>
              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-600" style={{ width: '92%' }} />
                </div>
                <span className="text-sm font-medium">92%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
