import { MapPin } from 'lucide-react';

const sensors = [
  { id: 1, zone: 'Zone A', status: 'normal', pH: 7.2, DO: 8.1 },
  { id: 2, zone: 'Zone B', status: 'normal', pH: 7.4, DO: 7.9 },
  { id: 3, zone: 'Zone C', status: 'warning', pH: 6.8, DO: 6.5 },
  { id: 4, zone: 'Zone D', status: 'alert', pH: 6.2, DO: 5.8 },
  { id: 5, zone: 'Zone E', status: 'normal', pH: 7.3, DO: 8.0 },
];

export const AuraMap = () => {
  return (
    <div className="h-[400px] w-full rounded-lg border bg-muted/20 relative flex items-center justify-center">
      <div className="text-center">
        <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
        <p className="text-muted-foreground mb-4">Interactive Map - Sabarmati Riverfront</p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 max-w-2xl px-4">
          {sensors.map((sensor) => (
            <div key={sensor.id} className={`p-2 rounded border text-xs ${
              sensor.status === 'alert' ? 'bg-red-100 border-red-300 dark:bg-red-950' :
              sensor.status === 'warning' ? 'bg-orange-100 border-orange-300 dark:bg-orange-950' :
              'bg-green-100 border-green-300 dark:bg-green-950'
            }`}>
              <p className="font-semibold">{sensor.zone}</p>
              <p className="text-[10px]">pH: {sensor.pH}</p>
              <p className="text-[10px]">DO: {sensor.DO}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
