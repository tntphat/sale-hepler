import React from 'react';
import { Box } from '../../components/common';
import { AutoReply } from './AutoReply/AutoReply';
import { QuickReply } from './QuickReply/QuickReply';
import { Setting } from './Setting/Setting';
import './MessageSetting.scss';
import { Link } from 'react-router-dom';
import { SvgMessage } from '../../assets/svg';

export const MessageSetting = () => {
  return (
    <div className="message-setting">
      <Box>
        <div className="message-setting__header">
          <h4>Cài đặt hộp thư</h4>
          <Link to="/messenger">
            <SvgMessage />
          </Link>
        </div>
        <div className="message-setting__content">
          <Setting />
          <AutoReply />
          <QuickReply />
        </div>
      </Box>
    </div>
  );
};
