import React, { useState } from 'react';
import './Table.scss';

export const Table: React.FC<ITable> = ({ dataHeader, dataTable, className }) => {
  return (
    <table className={className || ''}>
      <thead>
        <tr>
          {dataHeader?.map(({ title, minWidth, width }, ind) => (
            <th style={{ width, minWidth }} key={ind}>
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataTable?.map((data, index) => (
          <tr key={index}>
            {data.map((item: any, index: number) => (
              <td key={index}>{item}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
