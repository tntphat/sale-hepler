import React, { useCallback, useEffect } from 'react';
import { SvgClose } from '../../assets/svg';
import { Box } from '../common';
import './Notification.scss';
export const Notification = ({ toastlist, setList }: { toastlist: any; setList: any }) => {
  const deleteToast = useCallback(
    (id) => {
      const toastListItem = toastlist.filter((e: any) => e.id !== id);
      setList(toastListItem);
    },
    [toastlist, setList],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (toastlist.length) {
        deleteToast(toastlist[0].id);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [toastlist, deleteToast]);

  return (
    <div className="notification">
      {toastlist.map((toast: any, i: number) => {
        return (
          <Box classname="notification__box" key={i}>
            <div onClick={() => deleteToast(toast.id)} className="notification__close">
              <SvgClose />
            </div>
            <h5>{toast.title}</h5>
            <p className="notification__text">{toast.description}</p>
          </Box>
        );
      })}
    </div>
  );
};
