import React from 'react';
import { Avatar } from '../Avatar/Avatar';
import './Item.scss';

export const Item: React.FC<IItem> = ({
  className,
  icon,
  name,
  subName,
  isSecondType,
  ...props
}) => {
  return (
    <div className={`item ${className || ''}`}>
      <div className="item__infor">
        <Avatar {...props} className="item__avatar" />
        <div className="item__detail">
          {isSecondType ? (
            <>
              <p className="item__name item__name--sec ">{name}</p>
              <p className="item__sub-name item__sub-name--sec ">{subName}</p>
            </>
          ) : (
            <>
              <p className="item__sub-name">{subName}</p>
              <p className="item__name">{name}</p>
            </>
          )}
        </div>
      </div>
      {icon ? <div className="item__icon">{icon}</div> : null}
    </div>
  );
};
