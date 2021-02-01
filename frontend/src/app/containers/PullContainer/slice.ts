import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';
import {useInjectReducer} from "redux-injectors";

// The initial state of the PullContainer container
export const initialState: ContainerState = {
  isShowDrawer: false
};

const pullContainerSlice = createSlice({
  name: 'pullContainer',
  initialState,
  reducers: {
    showDrawer(state) {
      state.isShowDrawer = !state.isShowDrawer
    },
  },
});

export const {
  actions: pullContainerActions,
  reducer,
  name: sliceKey,
} = pullContainerSlice;

export const usePullContainerSlice = () => {
  useInjectReducer({ key: pullContainerSlice.name, reducer: pullContainerSlice.reducer });
  return { actions: pullContainerSlice.actions };
};
