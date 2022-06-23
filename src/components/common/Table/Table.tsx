import React from 'react';
import { Button } from '../Button/Button';
import './Table.scss';

export const Table: React.FC<ITable> = ({
  dataHeader,
  dataTable,
  className,
  minWidth,
  maxWidth,
}) => {
  return (
    <table className={className || ''} style={{ minWidth: minWidth ?? '1400px', maxWidth }}>
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
            {data.map((i, ind) => (
              <td key={ind}>{i}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
