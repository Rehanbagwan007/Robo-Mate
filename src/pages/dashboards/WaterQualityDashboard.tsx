import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, BarChart, Bar } from 'recharts';
import { Droplets, Wind, Beaker, AlertTriangle } from 'lucide-react';

const waterQualityData = [
  { time: '00:00', pH: 7.2, do: 8.1 },
  { time: '04:00', pH: 7.1, do: 8.0 },
  { time: '08:00', pH: 6.9, do: 7.8 },
  { time: '12:00', pH: 6.8, do: 7.5 },
  { time: '16:00', pH: 6.9, do: 7.6 },
  { time: '20:00', pH: 7.0, do: 7.9 },
];

const turbidityData = [
    { zone: 'Zone A', turbidity: 12, threshold: 20 },
    { zone: 'Zone B', turbidity: 15, threshold: 20 },
    { zone: 'Zone C', turbidity: 18, threshold: 20 },
    { zone: 'Zone D', turbidity: 24, threshold: 20 },
    { zone: 'Zone E', turbidity: 14, threshold: 20 },
];

const pollutionTrendData = [
    { day: 'Mon', actual: 65, predicted: 68 },
    { day: 'Tue', actual: 72, predicted: 70 },
    { day: 'Wed', actual: 75, predicted: 74 },
    { day: 'Thu', actual: null, predicted: 78 },
    { day: 'Fri', actual: null, predicted: 76 },
    { day: 'Sat', actual: null, predicted: 72 },
    { day: 'Sun', actual: null, predicted: 70 },
]

export const WaterQualityDashboard = () => {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg pH Level</CardTitle>
            <Beaker className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-500">6.8</div>
            <p className="text-xs text-muted-foreground mt-1">Below threshold (7.0)</p>
          </CardContent>
        </Card>

        <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dissolved Oxygen</CardTitle>
            <Wind className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">7.2<span className="text-lg text-muted-foreground">mg/L</span></div>
            <p className="text-xs text-muted-foreground mt-1">Acceptable range</p>
          </CardContent>
        </Card>

        <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Water Level</CardTitle>
            <Droplets className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2.4<span className="text-lg text-muted-foreground">m</span></div>
            <p className="text-xs text-muted-foreground mt-1">Normal (2.0-3.5m)</p>
          </CardContent>
        </Card>

        <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flood Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">3<span className="text-lg text-muted-foreground">/10</span></div>
            <p className="text-xs text-muted-foreground mt-1">Low risk</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <CardHeader>
                <CardTitle>pH & DO Trends (24h)</CardTitle>
                <CardDescription>Zone D - Real-time monitoring</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={waterQualityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pH" stroke="#F97316" strokeWidth={2} name="pH" />
                        <Line type="monotone" dataKey="do" stroke="#3B82F6" strokeWidth={2} name="DO (mg/L)" />
                        <Line type="monotone" dataKey={() => 7.0} stroke="#E11D48" strokeDasharray="5 5" name="pH Threshold" dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
        <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <CardHeader>
                <CardTitle>Turbidity by Zone</CardTitle>
                <CardDescription>Current levels vs threshold (20 NTU)</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={turbidityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="zone" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="turbidity" fill="#3B82F6" name="Turbidity" />
                        <Bar dataKey="threshold" fill="#EF4444" name="Threshold" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
      </div>
      
      <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardHeader>
            <CardTitle>Weekly Pollution Trend</CardTitle>
        </CardHeader>
        <CardContent>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={pollutionTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="actual" stroke="#3B82F6" strokeWidth={2} name="Actual" />
                    <Line type="monotone" dataKey="predicted" stroke="#10B981" strokeDasharray="5 5" name="Predicted" />
                </LineChart>
            </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardHeader>
            <CardTitle>Source Correlation Analysis</CardTitle>
            <CardDescription>Identified pollution sources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium text-sm">STP Discharge Impact</p>
                <p className="text-xs text-muted-foreground">Turbidity spikes in Zone D correlate with increased STP discharge levels</p>
              </div>
              <Badge variant="outline">85% confidence</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium text-sm">Rainfall Runoff</p>
                <p className="text-xs text-muted-foreground">DO levels drop following heavy rainfall events</p>
              </div>
              <Badge variant="outline">72% confidence</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardHeader>
            <CardTitle>Flood Risk Assessment</CardTitle>
            <CardDescription>48-hour outlook</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                    <p className="text-sm text-muted-foreground">Current Level</p>
                    <p className="text-2xl font-bold">2.4m</p>
                </div>
                 <div className="flex justify-between items-baseline">
                    <p className="text-sm text-muted-foreground">Max (5.0m)</p>
                    <p className="text-sm font-bold">5.0m</p>
                </div>
                <div className="h-4 flex-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-600" style={{ width: '48%' }} />
                </div>
                <div className="text-center pt-2">
                    <p className="font-bold text-lg text-green-600">Flood Risk Factor: 3/10 (Low)</p>
                    <p className="text-xs text-muted-foreground">No significant rainfall predicted in next 48 hours</p>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
