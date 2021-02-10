import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';
import { useInjectReducer } from 'redux-injectors';

// The initial state of the PullContainer container
export const initialState: ContainerState = {
  isShowDrawer: false,
  drawData: [],
  totem: 'FOX',
};

const pullContainerSlice = createSlice({
  name: 'pullContainer',
  initialState,
  reducers: {
    getData() {},
    setTotem(state, action: PayloadAction<string>) {
      state.totem = action.payload;
    },
    getDataSuccess(state, action: PayloadAction<any[]>) {
      state.drawData = action.payload;
    },
    showDrawer(state) {
      state.isShowDrawer = !state.isShowDrawer;
    },
    makePredict(
      state,
      action: PayloadAction<{
        bitcoinPrice: number;
        stakeValue: number;
        user: any;
      }>,
    ) {
      return state;
    },
  },
});

export const {
  actions: pullContainerActions,
  reducer,
  name: sliceKey,
} = pullContainerSlice;

export const usePullContainerSlice = () => {
  useInjectReducer({
    key: pullContainerSlice.name,
    reducer: pullContainerSlice.reducer,
  });
  return { actions: pullContainerSlice.actions };
};
