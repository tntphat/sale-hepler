import { combineReducers } from '@reduxjs/toolkit';

import modalSlice from '../slice/appSlice/modalSlice';
import groupSlice from '../slice/apiSlice/groupSlice';
import authSlice from '../slice/apiSlice/authSlice';
import messageSlice from '../slice/appSlice/messageSlice';
import messagesSlice from '../slice/apiSlice/messagesSlice';

export const rootReducer = combineReducers({
  modalSlice,
  groupSlice,
  authSlice,
  messageSlice,
  messagesSlice,
});
