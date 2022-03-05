import { combineReducers } from '@reduxjs/toolkit';

import modalSlice from '../slice/appSlice/modalSlice';

export const rootReducer = combineReducers({
  modalSlice,
});
