import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, PieChart, Pie, Cell } from 'recharts';
import { Trash2, Users, TrendingUp, Bot } from 'lucide-react';
import { AuraMap } from '@/components/AuraMap';
import { Badge } from '@/components/ui/badge';

const wasteCompositionData = [
  { name: 'Plastic', value: 60, color: '#3B82F6' },
  { name: 'Organic', value: 30, color: '#10B981' },
  { name: 'Other', value: 10, color: '#F97316' },
];

const detectionFrequencyData = [
    { zone: 'A', Waste: 120, Drones: 90 },
    { zone: 'B', Waste: 210, Drones: 150 },
    { zone: 'C', Waste: 360, Drones: 180 },
    { zone: 'D', Waste: 270, Drones: 120 },
    { zone: 'E', Waste: 150, Drones: 90 },
];

const activeOperations = [
    { status: 'In Progress', time: '10 min ago', team: 'Team Alpha', details: 'Zone C - Plastic' },
    { status: 'Completed', time: '1 hour ago', team: 'Team Beta', details: 'Zone D - Mixed' },
]

export const WasteManagementDashboard = () => {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Waste Detected (24h)</CardTitle>
            <Trash2 className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1.5<span className="text-lg text-muted-foreground">t</span></div>
            <p className="text-xs text-red-500 mt-1">+15% from yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Operations</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">1 in progress • 2 dispatched</p>
          </CardContent>
        </Card>

        <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cleanup Efficiency</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">92%</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
               +3% improvement
            </p>
          </CardContent>
        </Card>

        <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AURA Robot Status</CardTitle>
            <Bot className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">80%</div>
            <p className="text-xs text-muted-foreground mt-1">Battery • Bin: 30%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Waste Detection Map */}
        <Card className="lg:col-span-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardHeader>
            <CardTitle>Waste Detection Map</CardTitle>
            <CardDescription>Real-time AI-detected waste hotspots</CardDescription>
          </CardHeader>
          <CardContent>
            <AuraMap />
          </CardContent>
        </Card>
        
        {/* Waste Composition */}
        <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <CardHeader>
                <CardTitle>Waste Composition</CardTitle>
                <CardDescription>Last 24 hours breakdown</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie
                          data={wasteCompositionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {wasteCompositionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                 <div className="space-y-2 mt-4">
                  {wasteCompositionData.map((item) => (
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

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <CardHeader>
                <CardTitle>Detection Frequency by Zone</CardTitle>
                <CardDescription>Waste accumulation patterns</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={detectionFrequencyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="zone" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Waste" fill="#3B82F6" name="Waste" />
                        <Bar dataKey="Drones" fill="#10B981" name="Drones" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
        
        <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <CardHeader>
                <CardTitle>Active Cleanup Operations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {activeOperations.map((op, i) => (
                    <div key={i}>
                         <div className="flex items-center gap-2">
                            <Badge variant={op.status === 'Completed' ? 'secondary' : 'default'}>{op.status}</Badge>
                            <span className="text-xs text-muted-foreground">{op.time}</span>
                        </div>
                        <p className="font-semibold my-1">{op.team}</p>
                        <p className="text-sm text-muted-foreground">{op.details}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
      </div>
    </div>
  );
};
