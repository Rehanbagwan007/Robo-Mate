import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, TrendingUp, Battery, MapPin, Activity } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { AuraMap } from '@/components/AuraMap';

const wasteComposition = [
  { name: 'Plastic', value: 60, color: '#3b82f6' },
  { name: 'Organic', value: 30, color: '#22c55e' },
  { name: 'Other', value: 10, color: '#f97316' },
];

const detectionByZone = [
  { zone: 'Zone A', plastic: 120, organic: 80 },
  { zone: 'Zone B', plastic: 200, organic: 150 },
  { zone: 'Zone C', plastic: 350, organic: 180 },
  { zone: 'Zone D', plastic: 280, organic: 140 },
  { zone: 'Zone E', plastic: 150, organic: 90 },
];

const monthlyTrend = [
  { month: 'Jan', plastic: 850, organic: 640 },
  { month: 'Feb', plastic: 920, organic: 680 },
  { month: 'Mar', plastic: 1100, organic: 720 },
];

const operations = [
  { id: 1, team: 'Team Alpha', zone: 'Zone C', wasteType: 'Plastic', status: 'In Progress', time: '10 min ago' },
  { id: 2, team: 'Team Beta', zone: 'Zone D', wasteType: 'Mixed', status: 'Completed', time: '1 hour ago' },
  { id: 3, team: 'Team Gamma', zone: 'Zone B', wasteType: 'Organic', status: 'Dispatched', time: '2 hours ago' },
];

export const WasteManagementDashboard = () => {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Waste Detected (24h)</CardTitle>
            <Trash2 className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1.5<span className="text-lg text-muted-foreground">t</span></div>
            <p className="text-xs text-destructive flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +15% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Operations</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">1 in progress • 2 dispatched</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cleanup Efficiency</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">92<span className="text-lg text-muted-foreground">%</span></div>
            <p className="text-xs text-green-600 mt-1">+3% improvement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AURA Robot Status</CardTitle>
            <Battery className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">80<span className="text-lg text-muted-foreground">%</span></div>
            <p className="text-xs text-muted-foreground mt-1">Battery • Bin: 30%</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Waste Detection Map */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Waste Detection Map
            </CardTitle>
            <CardDescription>Real-time AI-detected waste hotspots</CardDescription>
          </CardHeader>
          <CardContent>
            <AuraMap />
          </CardContent>
        </Card>

        {/* Waste Composition */}
        <Card>
          <CardHeader>
            <CardTitle>Waste Composition</CardTitle>
            <CardDescription>Last 24 hours breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={wasteComposition}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {wasteComposition.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {wasteComposition.map((item) => (
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
      </div>

      {/* Detection by Zone & Operations */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Detection Frequency by Zone */}
        <Card>
          <CardHeader>
            <CardTitle>Detection Frequency by Zone</CardTitle>
            <CardDescription>Waste accumulation patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={detectionByZone}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zone" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="plastic" fill="#3b82f6" name="Plastic (kg)" />
                <Bar dataKey="organic" fill="#22c55e" name="Organic (kg)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cleanup Operations Log */}
        <Card>
          <CardHeader>
            <CardTitle>Active Cleanup Operations</CardTitle>
            <CardDescription>Real-time team activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {operations.map((op) => (
              <div
                key={op.id}
                className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant={
                          op.status === 'In Progress'
                            ? 'default'
                            : op.status === 'Completed'
                            ? 'secondary'
                            : 'outline'
                        }
                        className="text-xs"
                      >
                        {op.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{op.time}</span>
                    </div>
                    <p className="text-sm font-medium">{op.team}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {op.zone} • {op.wasteType}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Historical Trends */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Waste Collection Trends</CardTitle>
            <CardDescription>3-month historical data</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="plastic" fill="#3b82f6" name="Plastic (kg)" />
                <Bar dataKey="organic" fill="#22c55e" name="Organic (kg)" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200">
              <p className="text-sm font-medium text-orange-900 dark:text-orange-100">
                Plastic waste increasing by 15% monthly - Recommended action: Increase awareness campaigns
              </p>
            </div>
          </CardContent>
        </Card>

        {/* AURA Robot Status */}
        <Card>
          <CardHeader>
            <CardTitle>AURA Robot Status</CardTitle>
            <CardDescription>Autonomous cleanup assistant</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Battery Level</span>
                <span className="font-medium">80%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-600" style={{ width: '80%' }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Bin Capacity</span>
                <span className="font-medium">30%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '30%' }} />
              </div>
            </div>
            <div className="p-3 rounded-lg border">
              <p className="text-sm font-medium mb-1">Current Status</p>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 font-medium">Active Patrol</span> • Next: Zone A
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
