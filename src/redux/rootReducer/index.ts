import { combineReducers } from '@reduxjs/toolkit';

import modalSlice from '../slice/appSlice/modalSlice';
import groupSlice from '../slice/apiSlice/groupSlice';
import authSlice from '../slice/authSlice';
import messageSlice from '../slice/messageSlice';

export const rootReducer = combineReducers({
  modalSlice,
  groupSlice,
  authSlice,
  messageSlice,
});
