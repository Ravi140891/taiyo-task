// Importing required dependencies
import React, { useCallback } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Sidebar from '../component/Sidebar';
import { min, max } from 'lodash';
import { range } from 'lodash';

const CovidChart = () => {
  // Defining a function to fetch data from the API
  const fetchData = useCallback(async () => {
    const res = await axios.get(
      'https://disease.sh/v3/covid-19/historical/all?lastdays=all'
    );

    const { cases, deaths, recovered } = res.data;

    // Preparing chart data from the fetched data
    const chartData = Object.entries(cases).map(([date, value]) => ({
      date: new Date(date),
      cases: value,
      deaths: deaths[date],
      recoveries: recovered[date],
    }));

    return chartData;
  }, []);

  // Using react-query hook to handle the API request and its responses
  const { isLoading, error, data } = useQuery(
    ['cases', 'deaths', 'recoveries'],
    fetchData
  );

  // Calculating y-axis min and max values and tick values for the chart
  const yMin = data
    ? min(data.map(d => min([d.cases, d.deaths, d.recoveries])))
    : 0;
  const yMax = data
    ? max(data.map(d => max([d.cases, d.deaths, d.recoveries])))
    : 0;

  const tickValues = range(
    yMin,
    yMax + (yMax - yMin) / 5,
    (yMax - yMin) / 5
  ).sort((a, b) => a - b);

  // Rendering the chart component
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex flex-wrap">
        <div
          className="w-full md:flex-grow h-80 md:h-full flex justify-center items-center mx-auto"
          style={{ maxWidth: '80%', overflow: 'hidden' }}
        >
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>
              <p>Error</p>
            </div>
          ) : (
            <ResponsiveContainer height={400}>
              <LineChart data={data}>
                <CartesianGrid stroke="#ccc" />
                <XAxis
                  dataKey="date"
                  type="category"
                  tickFormatter={dateStr =>
                    new Date(dateStr).toLocaleDateString()
                  }
                />
                <YAxis domain={[yMin, yMax]} ticks={[...tickValues]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cases" stroke="#8884d8" />
                <Line type="monotone" dataKey="deaths" stroke="#ff0000" />
                <Line type="monotone" dataKey="recoveries" stroke="#008000" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default CovidChart;
