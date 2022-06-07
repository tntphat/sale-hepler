import React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

const data = [
  {
    name: 'January',
    tiki: 4000,
    fb: 2400,
  },
  {
    name: 'Febuary',
    tiki: 3000,
    fb: 1398,
  },
  {
    name: 'March',
    tiki: 2000,
    fb: 9800,
  },
  {
    name: 'April',
    tiki: 2780,
    fb: 3908,
  },
  {
    name: 'May',
    tiki: 1890,
    fb: 4800,
  },
  {
    name: 'June',
    tiki: 2390,
    fb: 3800,
  },
  {
    name: 'July',
    tiki: 3490,
    fb: 4300,
  },
];

export const ChartBar = () => {
  return (
    <BarChart width={730} height={250} data={data}>
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar name="Facebook" dataKey="fb" fill="#0A69E1" />
      <Bar name="Tiki" dataKey="tiki" fill="#1A94FF" />
    </BarChart>
  );
};
