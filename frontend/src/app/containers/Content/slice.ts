import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';
import { User } from '../../../types/interfaces';

// The initial state of the Content container
export const initialState: ContainerState = {
  showConnectMetamaskModal: false,
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    showConnectMetamaskModal(state) {
      console.log(state.showConnectMetamaskModal);
      state.showConnectMetamaskModal = !state.showConnectMetamaskModal;
    },
    error() {},
  },
});

export const {
  actions: contentActions,
  reducer,
  name: sliceKey,
} = contentSlice;
