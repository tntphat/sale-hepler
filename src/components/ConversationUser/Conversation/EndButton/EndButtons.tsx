import React from 'react';
import { SvgSend } from '../../../../assets/svg';

import './EndButtons.scss';

export const EndButtons = () => {
  return (
    <button
      type="submit"
      className="btn-send btn-primary btn-lg chat-send waves-effect waves-light"
    >
      <SvgSend />
    </button>
  );
};
