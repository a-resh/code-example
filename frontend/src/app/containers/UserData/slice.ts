import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the UserData container
export const initialState: ContainerState = {};

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setBtcAddress(
      state,
      action: PayloadAction<{ publicAddress: string; btcAddress: string }>,
    ) {},
  },
});

export const {
  actions: userDataActions,
  reducer,
  name: sliceKey,
} = userDataSlice;
