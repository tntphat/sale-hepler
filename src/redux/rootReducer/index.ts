import { combineReducers } from '@reduxjs/toolkit';

import modalSlice from '../slice/appSlice/modalSlice';
import groupSlice from '../slice/apiSlice/groupSlice';

export const rootReducer = combineReducers({
  modalSlice,
  groupSlice,
});
