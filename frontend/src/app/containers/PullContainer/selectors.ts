import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';
import { TotemsData } from '../../../types/constants';
import { activePageSelector, drawsSelector } from '../Wrapper/selectors';

const graphicsData = (state: RootState) =>
  state.pullContainer?.graphicsData || initialState.graphicsData;
const allPayouts = (state: RootState) =>
  state.pullContainer?.allPayouts || initialState.allPayouts;
const isShowModal = (state: RootState) =>
  state?.pullContainer?.isShowModal || initialState.isShowModal;

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

export const isShowModalSelector = createSelector(
  isShowModal,
  isShowModal => isShowModal,
);
export const allPayoutsSelector = createSelector(
  allPayouts,
  allPayouts => allPayouts,
);
export const graphicsDataSelector = createSelector(graphicsData, data => data);
