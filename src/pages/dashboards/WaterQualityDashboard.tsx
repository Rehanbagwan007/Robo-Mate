import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Droplets, TrendingUp, AlertTriangle, Activity, Waves } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const phData = [
  { time: '00:00', pH: 7.2, DO: 8.1, threshold: 7.0 },
  { time: '04:00', pH: 7.3, DO: 8.0, threshold: 7.0 },
  { time: '08:00', pH: 7.1, DO: 7.8, threshold: 7.0 },
  { time: '12:00', pH: 6.9, DO: 7.5, threshold: 7.0 },
  { time: '16:00', pH: 6.8, DO: 7.2, threshold: 7.0 },
  { time: '20:00', pH: 6.7, DO: 6.9, threshold: 7.0 },
  { time: '24:00', pH: 6.5, DO: 6.5, threshold: 7.0 },
];

const turbidityData = [
  { zone: 'Zone A', turbidity: 12, threshold: 20 },
  { zone: 'Zone B', turbidity: 15, threshold: 20 },
  { zone: 'Zone C', turbidity: 18, threshold: 20 },
  { zone: 'Zone D', turbidity: 28, threshold: 20 },
  { zone: 'Zone E', turbidity: 14, threshold: 20 },
];

const forecastData = [
  { day: 'Mon', actual: 65, predicted: null },
  { day: 'Tue', actual: 68, predicted: null },
  { day: 'Wed', actual: 72, predicted: null },
  { day: 'Thu', actual: null, predicted: 78 },
  { day: 'Fri', actual: null, predicted: 82 },
  { day: 'Sat', actual: null, predicted: 79 },
  { day: 'Sun', actual: null, predicted: 75 },
];

export const WaterQualityDashboard = () => {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg pH Level</CardTitle>
            <Droplets className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">6.8</div>
            <p className="text-xs text-destructive flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 rotate-180" />
              Below threshold (7.0)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dissolved Oxygen</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">7.2<span className="text-lg text-muted-foreground">mg/L</span></div>
            <p className="text-xs text-muted-foreground mt-1">Acceptable range</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Water Level</CardTitle>
            <Waves className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2.4<span className="text-lg text-muted-foreground">m</span></div>
            <p className="text-xs text-green-600 mt-1">Normal (2.0-3.5m)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flood Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3<span className="text-lg text-muted-foreground">/10</span></div>
            <p className="text-xs text-green-600 mt-1">Low risk</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* pH & DO Trends */}
        <Card>
          <CardHeader>
            <CardTitle>pH & DO Trends (24h)</CardTitle>
            <CardDescription>Zone D - Real-time monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={phData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pH" stroke="hsl(var(--primary))" strokeWidth={2} />
                <Line type="monotone" dataKey="DO" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                <Line type="monotone" dataKey="threshold" stroke="#ef4444" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Turbidity Analysis */}
        <Card>
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
                <Bar dataKey="turbidity" fill="hsl(var(--primary))" />
                <Bar dataKey="threshold" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Predictive Forecast */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              7-Day Pollution Forecast
            </CardTitle>
            <CardDescription>Predicted pollution index for Zone D</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <p className="text-sm font-medium text-orange-900 dark:text-orange-100">
                  High pollution risk predicted in 36 hours for Zone D
                </p>
              </div>
              <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
                Turbidity spike correlates with increased STP discharge (85% confidence)
              </p>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name="Actual"
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Predicted"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Source Correlation */}
        <Card>
          <CardHeader>
            <CardTitle>Source Correlation Analysis</CardTitle>
            <CardDescription>Identified pollution sources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">STP Discharge Impact</p>
                <Badge variant="outline">85% confidence</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Turbidity spikes in Zone D correlate with increased STP discharge levels
              </p>
            </div>
            <div className="p-3 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">Rainfall Runoff</p>
                <Badge variant="outline">72% confidence</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                DO levels drop following heavy rainfall events
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Water Level & Flood Risk */}
        <Card>
          <CardHeader>
            <CardTitle>Flood Risk Assessment</CardTitle>
            <CardDescription>48-hour outlook</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Current Level</span>
                <span className="font-medium">2.4m</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-600" style={{ width: '48%' }} />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Min (2.0m)</span>
                <span>Max (5.0m)</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
              <p className="text-sm font-medium text-green-900 dark:text-green-100">
                Flood Risk Factor: 3/10 (Low)
              </p>
              <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                No significant rainfall predicted in next 48 hours
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
