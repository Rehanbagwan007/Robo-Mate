import { MapPin } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

const sensors = [
  { id: 1, zone: 'Zone A', status: 'normal', pH: 7.2, DO: 8.1, position: { lat: 23.0225, lng: 72.5714 } },
  { id: 2, zone: 'Zone B', status: 'normal', pH: 7.4, DO: 7.9, position: { lat: 23.025, lng: 72.573 } },
  { id: 3, zone: 'Zone C', status: 'warning', pH: 6.8, DO: 6.5, position: { lat: 23.0275, lng: 72.575 } },
  { id: 4, zone: 'Zone D', status: 'alert', pH: 6.2, DO: 5.8, position: { lat: 23.03, lng: 72.577 } },
  { id: 5, zone: 'Zone E', status: 'normal', pH: 7.3, DO: 8.0, position: { lat: 23.0325, lng: 72.579 } },
];

export const AuraMap = () => {
  return (
    <div className="h-[400px] w-full rounded-lg border bg-muted/20 relative">
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string}>
        <Map
          defaultCenter={{ lat: 23.0225, lng: 72.5714 }}
          defaultZoom={12}
          mapId="AURA_MAP"
        >
          {sensors.map((sensor) => (
            <AdvancedMarker key={sensor.id} position={sensor.position}>
              <div className="p-2 rounded-lg shadow-lg bg-white dark:bg-gray-800">
                <p className="font-semibold">{sensor.zone}</p>
                <p className="text-[10px]">pH: {sensor.pH}</p>
                <p className="text-[10px]">DO: {sensor.DO}</p>
              </div>
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>
    </div>
  );
};
