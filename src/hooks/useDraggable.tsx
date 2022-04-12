import { MutableRefObject, useEffect, useRef, useState } from 'react';

export const useDraggable = (buttons = [1, 4, 5]) => {
  /**
   * Notes that MouseEvent.buttons:
   * 0: No button or un-initialized
   * 1: The left button
   * 2: The right button
   * 4: The mouse wheel button or middle button
   * 8: The "Browser Back" button
   * 16: The "Browser Forward" button
   */

  const ref = useRef() as MutableRefObject<HTMLDivElement>;

  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const [startScrollTop, setStartScrollTop] = useState(0);

  useEffect(() => {
    function handleDown(e: any) {
      if (!ref.current || !ref.current.contains(e.target)) {
        return;
      }

      setStartX(e.pageX - ref.current.offsetLeft);
      setStartY(e.pageY - ref.current.offsetTop);
      setStartScrollLeft(ref.current.scrollLeft);
      setStartScrollTop(ref.current.scrollTop);
    }
    function handleMove(e: any) {
      if (!ref.current || !buttons.includes(e.buttons) || !ref.current.contains(e.target)) {
        return;
      }

      e.preventDefault();

      const mouseX = e.pageX - ref.current.offsetLeft;
      const mouseY = e.pageY - ref.current.offsetTop;

      const walkX = mouseX - startX;
      const walkY = mouseY - startY;

      ref.current.scrollLeft = startScrollLeft - walkX;
      ref.current.scrollTop = startScrollTop - walkY;
    }

    document.addEventListener('mousedown', handleDown);
    document.addEventListener('mousemove', handleMove);

    return () => {
      document.removeEventListener('mousedown', handleDown);
      document.removeEventListener('mousemove', handleMove);
    };
  });

  return ref;
};
