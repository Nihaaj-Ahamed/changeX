import { MapContainer, TileLayer } from "react-leaflet";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/pin";
import L from "leaflet";

// Leaflet default marker icon broken-aagaama irukka fix
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function Map({ items = [] }) {
  // Latitude matrum Longitude valid-a irukku nu filter panron
  const validItems = items.filter(
    (item) => item && item.latitude && item.longitude
  );

  const hasSingleValidCoord = validItems.length === 1;

  // Single item irundha adhu latitude/longitude, illainal default center
  const centerPosition = hasSingleValidCoord
    ? [parseFloat(validItems[0].latitude), parseFloat(validItems[0].longitude)]
    : [52.4797, -1.90269];

  return (
    <MapContainer
      center={centerPosition}
      zoom={7}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {validItems.map((item) => (
        <Pin item={item} key={item.id || item._id} />
      ))}
    </MapContainer>
  );
}

export default Map;


// // client/src/components/map/Map.jsx
// import React from 'react';
// import './map.scss';
// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
// import Pin from '../pin/pin'; // Import your custom Pin component

// // Make sure the map fills the parent container
// const containerStyle = {
//   width: '100%',
//   height: '100%' 
// };

// function Map({ items }) {
//   const { isLoaded } = useJsApiLoader({
//      id: 'google-map-script',
//     googleMapsApiKey: "AIzaSyB_vJC3Rrv75EBg47bXkxkK2vhULJU7o9o" // 🔴 PASTE YOUR NEW KEY HERE
//   });

//   // Calculate center (default to Sri Lanka if no items)
//   const center = items && items.length > 0 
//     ? { lat: parseFloat(items[0].latitude), lng: parseFloat(items[0].longitude) }
//     : { lat: 7.8731, lng: 80.7718 };

//   if (!isLoaded) return <div>Loading Map...</div>

//   return (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={7} // Adjusted zoom to match your old code
//       options={{
//         scrollwheel: false, // Disables zooming with mouse wheel (matches your old code)
//         streetViewControl: false, // Optional: cleans up UI
//         mapTypeControl: false,    // Optional: cleans up UI
//       }}
//       mapContainerClassName="map" // Keeps your .map CSS class
//     >
//       {/* Loop through items and render a Pin for each */}
//       {items && items.map(item => (
//         <Pin item={item} key={item.id} />
//       ))}
//     </GoogleMap>
//   )
// }

// export default React.memo(Map)
