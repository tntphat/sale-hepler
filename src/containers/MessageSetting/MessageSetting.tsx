import React from 'react';
import { Box } from '../../components/common';
import { AutoReply } from './AutoReply/AutoReply';
import { QuickReply } from './QuickReply/QuickReply';
import { Setting } from './Setting/Setting';
import './MessageSetting.scss';

export const MessageSetting = () => {
  return (
    <div className="message-setting">
      <Box>
        <div className="message-setting__header">
          <h4>Cài đặt hộp thư</h4>
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
