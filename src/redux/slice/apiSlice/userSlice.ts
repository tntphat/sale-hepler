import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { apiGroups } from '../../../services/api';

export const doGetAllGroups = createAsyncThunk('groups@get/GetAll', async () => {
  const result: AxiosResponse = await apiGroups.getAll();
  return result.data;
});

const initialState = {
  isLoading: false,
  dataListGroup: [],
  error: null,
} as IGroupSlice;

const slice = createSlice({
  name: 'groups@',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get province
    builder.addCase(doGetAllGroups.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(doGetAllGroups.fulfilled, (state, action: PayloadAction<IResGetAllGroup>) => {
      state.dataListGroup = action.payload.groups;
      state.isLoading = false;
    });
    builder.addCase(doGetAllGroups.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });
  },
});
const { reducer: groupsSlice } = slice;

export default groupsSlice;
