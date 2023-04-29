import React, { useCallback } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const CovidMap = () => {
  // Define the style of the map
  const mapStyle = {
    height: '600px',
    width: '100%',
  };

  // Define a function to fetch the COVID-19 data from an API
  const fetchData = useCallback(async () => {
    const res = await axios.get('https://disease.sh/v3/covid-19/countries');

    // Map the API response to an array of objects with the desired properties
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

  // Use the react-query library to fetch the data and handle loading and errors
  const { data, isLoading, error } = useQuery(
    ['country', 'cases', 'active', 'lat', 'long'],
    fetchData
  );

  // If the data is still loading, display a loading message
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If there was an error fetching the data, display an error message
  if (error) {
    return <div>Error</div>;
  }

  // Define the icon to use for the markers
  const virusIcon = L.icon({
    iconUrl: '/location-pin.png',
    iconSize: [50, 50],
  });

  // Render the map with markers and popups for each country's COVID-19 data
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
