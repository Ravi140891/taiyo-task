import React, { useCallback } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Sidebar from '../component/Sidebar';

const CovidMap = () => {
  const mapStyle = {
    height: '600px',
    width: '100%',
  };

  const fetchData = useCallback(async () => {
    const res = await axios.get('https://disease.sh/v3/covid-19/countries');

    const countryData = res.data.map((country: any) => ({
      country: country.country,
      cases: country.cases,
      deaths: country.deaths,
      active: country.active,
      recovered: country.recovered,
      lat: country.countryInfo.lat,
      long: country.countryInfo.long,
    }));

    return countryData;
  }, []);

  const { data, isLoading, error } = useQuery(
    ['country', 'cases', 'active', 'lat', 'long'],
    fetchData
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  const virusIcon = L.icon({
    iconUrl: '/location-pin.png',
    iconSize: [50, 50],
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* <h1 className="text-3xl font-bold text-emerald-600 bg-lime-500 w-full p-4 text-center">
        Covid Data Map View
      </h1> */}
      <div className="flex-grow flex flex-wrap">
        <MapContainer style={mapStyle} center={[20, 0]} zoom={4}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {data.map((country: any) => (
            <Marker
              key={country.country}
              position={[country.lat, country.long]}
              icon={virusIcon}
            >
              <Popup>
                <div>
                  <h2>{country.country}</h2>
                  <p>Total Cases: {country.cases}</p>
                  <p>Total Deaths: {country.deaths}</p>
                  <p>Total Active Cases: {country.active}</p>
                  <p>Total Recovered Cases: {country.recovered}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default CovidMap;
