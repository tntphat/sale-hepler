import React from 'react';
import { useNavigate } from 'react-router-dom';
import { dataSidebar } from '../../constants';

export const Sidebar = () => {
  const navigate = useNavigate();
  const handleNavToLink = (link: string) => {
    navigate(link);
  };
  return (
    <div>
      {dataSidebar.map((item, ind) => (
        <div key={ind}>
          <div onClick={() => handleNavToLink(item.link)}>{item.title}</div>
          {item.children ? (
            <div>
              {item.children.map((child, ind) => (
                <div key={ind} onClick={() => handleNavToLink(child.link)}>
                  <span>{child.title}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};
