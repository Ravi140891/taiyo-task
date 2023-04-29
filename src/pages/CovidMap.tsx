// import React, { useCallback } from "react";
// import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
// import L from "leaflet";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// const CovidMap = () => {
//   const fetchData = useCallback(async () => {
//     const res = await axios.get(
//       "https://disease.sh/v3/covid-19/countries"
//     );

//     const countryData = res.data.map((country:any) => ({
//       country: country.country,
//       cases: country.cases,
//       deaths: country.deaths,
//       active: country.active,
//       recovered: country.recovered,
//       lat: country.countryInfo.lat,
//       long: country.countryInfo.long
//     }));

//     return countryData;
//   }, []);
  
//   const { data, isLoading, error } = useQuery(['country', 'cases', 'active'], fetchData);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error</div>;
//   }
//  const center = (lat:20, long:0);
//   return (
//     <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       {data.map((country:any) => (
//         <Marker key={country.country} position={[country.lat, country.long]}>
//           <Popup>
//             <div>
//               <h2>{country.country}</h2>
//               <p>Total Cases: {country.cases}</p>
//               <p>Total Deaths: {country.deaths}</p>
//               <p>Total Active Cases: {country.active}</p>
//               <p>Total Recovered Cases: {country.recovered}</p>
//             </div>
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// };
// export default CovidMap;



import React from 'react'

const CovidMap = () => {
  return (
    <div>CovidMap</div>
  )
}

export default CovidMap