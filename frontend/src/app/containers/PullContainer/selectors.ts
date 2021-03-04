import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';
import { TotemsData } from '../../../types/constants';
import { activePageSelector, drawsSelector } from '../Wrapper/selectors';

const graphicsData = (state: RootState) =>
  state.pullContainer?.graphicsData || initialState.graphicsData;
const loading = (state: RootState) =>
  state.pullContainer?.loading || initialState.loading;
const allPayouts = (state: RootState) =>
  state.pullContainer?.allPayouts || initialState.allPayouts;
const isShowPredictModal = (state: RootState) =>
  state?.pullContainer?.isShowPredictModal || initialState.isShowPredictModal;
const isShowConfirmModal = (state: RootState) =>
  state?.pullContainer?.isShowConfirmModal || initialState.isShowConfirmModal;

export const drawDataSelector = createSelector(
  activePageSelector,
  drawsSelector,
  (totem, drawData: any[]) => drawData.find(v => v.id === TotemsData[totem].id),
);
export const pollFillSelector = createSelector(
  activePageSelector,
  drawDataSelector,
  (totem, drawData) =>
    drawData && TotemsData[totem].maxPoolSize
      ? Math.round(
          (drawData.users.reduce((acc, u) => {
            acc += +u.bet;
            return acc;
          }, 0) /
            TotemsData[totem].maxPoolSize) *
            100,
        )
      : 0,
);

export const isShowPredictModalSelector = createSelector(
  isShowPredictModal,
  isShowModal => isShowModal,
);
export const isShowConfirmModalSelector = createSelector(
  isShowConfirmModal,
  isShowModal => isShowModal,
);
export const allPayoutsSelector = createSelector(
  allPayouts,
  allPayouts => allPayouts,
);
export const graphicsDataSelector = createSelector(graphicsData, data => data);
export const loadingSelector = createSelector(loading, data => data);
