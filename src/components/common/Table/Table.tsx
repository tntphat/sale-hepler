import React from 'react';
import { Button } from '../Button/Button';
import './Table.scss';

const dataTable = [
  [
    1,
    <img
      key="1"
      src="https://cdn.pixabay.com/photo/2020/03/09/17/51/narcis-4916584__340.jpg"
      style={{ maxHeight: '50px', width: 'auto' }}
    />,
    'Iphone 11 Promax like new 99% 512gb',
    '',
    'Apple',
    <Button key="1">Chọn</Button>,
  ],

  [
    2,
    <img
      key="2"
      src="https://cdn.pixabay.com/photo/2020/03/09/17/51/narcis-4916584__340.jpg"
      style={{ maxHeight: '50px', width: 'auto' }}
    />,
    'Iphone 11 Promax like new 99% 512gb',
    '',
    'Apple',
    <Button key="2">Chọn</Button>,
  ],
  [
    3,
    <img
      key="3"
      src="https://cdn.pixabay.com/photo/2020/03/09/17/51/narcis-4916584__340.jpg"
      style={{ maxHeight: '50px', width: 'auto' }}
    />,
    'Iphone 11 Promax like new 99% 512gb',
    '',
    'Apple',
    <Button key="3">Chọn</Button>,
  ],
  [
    4,
    <img
      key="4"
      src="https://cdn.pixabay.com/photo/2020/03/09/17/51/narcis-4916584__340.jpg"
      style={{ maxHeight: '50px', width: 'auto' }}
    />,
    'Iphone 11 Promax like new 99% 512gb',
    '',
    'Apple',
    <Button key="4">Chọn</Button>,
  ],
  [
    5,
    <img
      key="5"
      src="https://cdn.pixabay.com/photo/2020/03/09/17/51/narcis-4916584__340.jpg"
      style={{ maxHeight: '50px', width: 'auto' }}
    />,
    'Iphone 11 Promax like new 99% 512gb',
    '',
    'Apple',
    <Button key="5">Chọn</Button>,
  ],
];

const dataHeader = [
  {
    title: 'Stt',
    width: '20px',
  },
  {
    title: '',
    width: '80px',
  },
  {
    title: 'Sản phẩm',
    minWidth: '300px',
  },
  {
    title: 'Loại',
    width: '80px',
  },
  {
    title: 'Nhãn hiệu',
    width: '80px',
  },
  {
    title: '',
    width: '80px',
  },
];

export const Table = () => {
  return (
    <table>
      <thead>
        <tr>
          {dataHeader.map(({ title, minWidth, width }, ind) => (
            <th style={{ width, minWidth }} key={ind}>
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataTable.map((data, index) => (
          <tr key={index}>
            {data.map((i, ind) => (
              <td key={ind}>{i}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
