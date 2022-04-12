import { createSlice } from '@reduxjs/toolkit';

type TTnitialState = {
  isOpenModalLoading: boolean;
  isOpenModalMedia: boolean;
  media?: any;
};

const initialState = {
  isOpenModalMedia: false,
  isOpenModalLoading: false,
  media: null,
} as TTnitialState;

export const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    doOpenModal(state) {
      state.isOpenModalLoading = true;
    },
    doCloseModal(state) {
      state.isOpenModalLoading = false;
    },
    doOpenModalMedia(state) {
      state.isOpenModalMedia = true;
    },
    doCloseModalMedia(state) {
      state.isOpenModalMedia = false;
    },
    doSetModalMedia(state, action) {
      state.isOpenModalMedia = true;
      state.media = action.payload;
    },
  },
});

const { actions, reducer } = modalSlice;
export const { doOpenModal, doCloseModal, doOpenModalMedia, doCloseModalMedia, doSetModalMedia } =
  actions;
export default reducer;
