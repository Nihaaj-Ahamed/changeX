// Pin.jsx
import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

function Pin({ item }) {
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="popupContainer">
          <img src={item.img || item.images?.[0]} alt="" />
          <div className="textContainer">
            <Link to={`/${item.id}`}>{item.title}</Link>
            <span>{item.bedroom} bedroom</span>
            <b>$ {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
// // client/src/components/pin/Pin.jsx
// import React, { useState } from 'react';
// import { MarkerF, InfoWindowF } from '@react-google-maps/api';
// import { Link } from 'react-router-dom';
// import './pin.scss'; // Keep your existing styles

// function Pin({ item }) {
//   const [selected, setSelected] = useState(false);

//   return (
//     <MarkerF
//       position={{ 
//         lat: parseFloat(item.latitude), 
//         lng: parseFloat(item.longitude) 
//       }}
//       // When you click the pin, open the popup window
//       onClick={() => setSelected(true)}
//     >
//       {/* Only show the InfoWindow (Popup) if selected is true */}
//       {selected && (
//         <InfoWindowF
//           position={{ 
//             lat: parseFloat(item.latitude), 
//             lng: parseFloat(item.longitude) 
//           }}
//           // Close the popup when the "X" is clicked
//           onCloseClick={() => setSelected(false)}
//         >
//           {/* This HTML replaces your old Leaflet <Popup> content */}
//           <div className="popupContainer">
//             <div className="popupDetails">
//               <img src={item.img || (item.images && item.images[0])} alt={item.title} />
//               <div className="textContainer">
//                 <Link to={`/${item.id}`}>{item.title}</Link>
//                 <span>{item.storage} Storage</span>
//                 <b>$ {item.price}</b>
//               </div>
//             </div>
//           </div>
//         </InfoWindowF>
//       )}
//     </MarkerF>
//   );
// }

// export default Pin;