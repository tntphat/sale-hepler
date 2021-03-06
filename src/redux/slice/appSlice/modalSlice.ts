import { createSlice } from '@reduxjs/toolkit';

type TTnitialState = {
  isOpenModalLoading: boolean;
  isOpenModalMedia: boolean;
  isOpenModalMessage: boolean;
  media?: any;
  message?: string;
};

const initialState = {
  isOpenModalMedia: false,
  isOpenModalLoading: false,
  media: null,
  message: '',
  isOpenModalMessage: false,
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
    doOpenModalMessage(state) {
      state.isOpenModalMessage = true;
    },
    doCloseModalMessage(state) {
      state.isOpenModalMessage = false;
    },
    doSetModalMedia(state, action) {
      state.isOpenModalMedia = true;
      state.media = action.payload;
    },
    doSetModalMessage(state, action) {
      state.isOpenModalMessage = true;
      state.message = action.payload;
    },
  },
});

const { actions, reducer } = modalSlice;
export const {
  doOpenModal,
  doCloseModal,
  doOpenModalMedia,
  doCloseModalMedia,
  doSetModalMedia,
  doOpenModalMessage,
  doCloseModalMessage,
  doSetModalMessage,
} = actions;
export default reducer;
