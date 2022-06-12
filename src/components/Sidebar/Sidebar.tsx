import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SvgAngle } from '../../assets/svg';
import { dataSidebar } from '../../constants';
import './Sidebar.scss';

const ItemSidebar: React.FC<{ item: any; handleNavToLink: any }> = ({ item, handleNavToLink }) => {
  const [extended, setExtended] = useState(false);
  const location = useLocation();
  return (
    <div className="sidebar__item">
      <div
        className={`sidebar__link ${item.link === location.pathname ? 'active' : ''} ${
          extended ? 'sidebar__link--extend' : ''
        }`}
        onClick={(e) => {
          e.stopPropagation();
          setExtended((pre) => !pre);
        }}
      >
        <>{item.icon({ color: '#1f4173' })}</>
        <span
          onClick={(e) => {
            handleNavToLink(item.link);
            e.stopPropagation();
          }}
        >
          {item.title}
        </span>
        {item.children ? (
          <>
            <div>
              <SvgAngle />
            </div>
          </>
        ) : null}
      </div>
      {item.children ? (
        <div className="sidebar__sub-link">
          {item.children.map((child, ind) => (
            <div
              className={`${item.link + child.link === location.pathname ? 'active' : ''}`}
              key={ind}
              onClick={(e) => {
                handleNavToLink(child.link, item.link);
                e.stopPropagation();
              }}
            >
              <span>{child.title}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export const Sidebar = () => {
  const navigate = useNavigate();
  const handleNavToLink = (link: string, sublink?: string) => {
    navigate((sublink || '') + link);
  };

  return (
    <div className="sidebar">
      {dataSidebar.map((item, ind) => (
        <ItemSidebar item={item} key={ind} handleNavToLink={handleNavToLink} />
      ))}
    </div>
  );
};
