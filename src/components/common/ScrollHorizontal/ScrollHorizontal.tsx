import React, { forwardRef } from 'react';
import './ScrollHorizontal.scss';

export const ScrollHorizontal = forwardRef<any, any>(
  (
    {
      children,
      onScroll,
      margin,
      padding,
      marginBottom,
      marginLeft,
      marginRight,
      marginTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      paddingTop,
      hideScrollbar,
      className,
    },
    ref,
  ) => {
    return (
      <div
        className={`scroll-horizontal ${className ? className : ''} ${
          hideScrollbar ? 'scroll-horizontal--hide-scroll-bar' : ''
        }`}
        onScroll={onScroll}
        ref={ref}
        style={{
          margin,
          padding,
          marginBottom,
          marginLeft,
          marginRight,
          marginTop,
          paddingBottom,
          paddingLeft,
          paddingRight,
          paddingTop,
        }}
      >
        {children}
      </div>
    );
  },
);
