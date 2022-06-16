import { apiPages } from './../../../services/api/facebook/apiPage';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

export const getConnectedPage = createAsyncThunk('pages/GetConnectedPage', async () => {
  const result: AxiosResponse = await apiPages.getConnectedPages();
  return result.data;
});

interface IPageSlice {
  pageId: number | string;
}

const initialState = {
  pageId: '',
} as IPageSlice;

const slice = createSlice({
  name: 'pages',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getConnectedPage.fulfilled, (state, action: any) => {
      state.pageId = action.payload.data.id;
    });
  },
});
const { reducer: pageSlice } = slice;

export default pageSlice;
