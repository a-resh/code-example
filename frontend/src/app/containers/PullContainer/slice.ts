import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, MakePredictData } from './types';
import { useInjectReducer } from 'redux-injectors';

// The initial state of the PullContainer container
export const initialState: ContainerState = {
  isShowPredictModal: false,
  isShowConfirmModal: false,
  graphicsData: [],
  allPayouts: 1568522,
  loading: false,
};

const pullContainerSlice = createSlice({
  name: 'pullContainer',
  initialState,
  reducers: {
    loading(state) {
      state.loading = !state.loading;
    },
    getGraphicsData() {},
    getGraphicsDataSuccess(state, action: PayloadAction<any>) {
      state.graphicsData = action.payload;
    },
    getData() {},
    getAllPayoutSuccess(state, action: PayloadAction<number>) {
      state.allPayouts = action.payload;
    },
    showPredictModal(state) {
      state.isShowPredictModal = !state.isShowPredictModal;
    },
    showConfirmModal(state, action: PayloadAction<boolean>) {
      state.isShowConfirmModal = action.payload;
    },
    makePredict(state, action: PayloadAction<MakePredictData>) {},
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
