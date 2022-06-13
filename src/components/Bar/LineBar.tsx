import React from 'react';
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';

const data = [
  {
    name: 'Jan',
    tiki: 4000,
    fb: 2400,
  },
  {
    name: 'Feb',
    tiki: 3000,
    fb: 1398,
  },
  {
    name: 'March',
    tiki: 2000,
    fb: 9800,
  },
  {
    name: 'Apr',
    tiki: 2780,
    fb: 3908,
  },
  {
    name: 'May',
    tiki: 1890,
    fb: 4800,
  },
  {
    name: 'Jun',
    tiki: 2390,
    fb: 3800,
  },
  {
    name: 'Jul',
    tiki: 3490,
    fb: 4300,
  },
];

export const LineBar: React.FC<any> = ({ data, nameValue, nameValue2 }) => {
  return (
    <LineChart
      width={730}
      height={250}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" name={nameValue} dataKey="value" stroke="#0A69E1" />
      {nameValue2 ? (
        <Line type="monotone" name={nameValue2} dataKey="value2" stroke="#1A94FF" />
      ) : null}
    </LineChart>
  );
};
