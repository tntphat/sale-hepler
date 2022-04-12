import React from 'react';

export const SvgFlag: React.FC<ISvg> = ({ color }) => {
  return (
    <svg width="16" height="20" viewBox="0 0 33 39" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M32.0214 0.207188C32.1877 0.318429 32.324 0.4689 32.4184 0.645318C32.5128 0.821737 32.5623 1.01868 32.5625 1.21875V19.5C32.5624 19.7434 32.4895 19.9812 32.3531 20.1828C32.2167 20.3843 32.0231 20.5405 31.7971 20.631L31.3438 19.5L31.7971 20.631L31.7898 20.6334L31.7752 20.6408L31.7191 20.6627C31.3987 20.7901 31.0761 20.912 30.7514 21.0283C30.1079 21.2599 29.2134 21.5719 28.1994 21.8814C26.2104 22.4957 23.6193 23.1562 21.5938 23.1562C19.5292 23.1562 17.8205 22.4738 16.3336 21.8766L16.2654 21.8522C14.72 21.2306 13.4038 20.7188 11.8438 20.7188C10.1375 20.7188 7.85113 21.2794 5.90356 21.8814C5.03156 22.1532 4.16752 22.4499 3.3125 22.7711V37.7812C3.3125 38.1045 3.1841 38.4145 2.95554 38.643C2.72698 38.8716 2.41698 39 2.09375 39C1.77052 39 1.46052 38.8716 1.23196 38.643C1.0034 38.4145 0.875 38.1045 0.875 37.7812V1.21875C0.875 0.895517 1.0034 0.585524 1.23196 0.356964C1.46052 0.128404 1.77052 0 2.09375 0C2.41698 0 2.72698 0.128404 2.95554 0.356964C3.1841 0.585524 3.3125 0.895517 3.3125 1.21875V1.90613C3.86337 1.71356 4.5215 1.49175 5.23812 1.27237C7.22712 0.663 9.82063 0 11.8438 0C13.8912 0 15.5585 0.675187 17.0137 1.26506L17.1185 1.30894C18.6346 1.92075 19.9557 2.4375 21.5938 2.4375C23.3 2.4375 25.5864 1.87688 27.5339 1.27481C28.6438 0.92823 29.7406 0.541222 30.8221 0.114562L30.8684 0.0975L30.8782 0.092625H30.8806"
        fill={color || '#0A69E1'}
      />
    </svg>
  );
};