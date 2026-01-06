import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Vital: the map will look broken without this!
import type {   MapContainerProps  } from '../../Types';
import "./MapContainer.css";

function RecenterMap({ lat, lng }: { lat: number, lng: number }) {
  const map = useMap();
  map.flyTo([lat, lng], 13, { animate: true, duration: 1.5 });
  return null;
}

export default function MapContainter({ data }:  MapContainerProps) {
  // Defensive Default: Start at London or 0,0 if data is null
  const defaultPos: [number, number] = [51.505, -0.09];
  const position: [number, number] = data 
    ? [data.location.lat, data.location.lng] 
    : defaultPos;


  return (
   <div className="map-wrapper">
      <MapContainer 
        center={position} 
        zoom={13} 
        zoomControl={false} // We move this for better UI
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 2. Defensive check: Only render marker and recenter if data exists */}
        {data && (
          <>
            <Marker position={position} />
            <RecenterMap lat={data.location.lat} lng={data.location.lng} />
          </>
        )}
      </MapContainer>
    </div>
  )
}
