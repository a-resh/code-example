import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the PullContainer container
export const initialState: ContainerState = {};

const pullContainerSlice = createSlice({
  name: 'pullContainer',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
  },
});

export const { actions: pullContainerActions, reducer, name: sliceKey } = pullContainerSlice;