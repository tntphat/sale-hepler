import { combineReducers } from '@reduxjs/toolkit';

import modalSlice from '../slice/appSlice/modalSlice';
import authSlice from '../slice/authSlice';
import messageSlice from '../slice/messageSlice';

export const rootReducer = combineReducers({
  modalSlice,
  authSlice,
  messageSlice,
});
