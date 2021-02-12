import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';
import { TotemsData } from '../../../types/constants';
import { useSelector } from 'react-redux';
import { activePageSelector } from '../Content/selectors';

// const selectDomain = (state: RootState) => state.pullContainer || initialState;
const isShowDrawer = (state: RootState) =>
  state.pullContainer?.isShowDrawer || initialState.isShowDrawer;
const drawData = (state: RootState) =>
  state.pullContainer?.drawData || initialState.drawData;
export const isShowDrawerSelector = createSelector(
  isShowDrawer,
  state => state,
);

export const drawDataSelector = createSelector(
  activePageSelector,
  drawData,
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

// export const Selectors = {
//     pollFill: useSelector(pollFillSelector),
//     totem: useSelector(totemSelector),
//     drawData: useSelector(drawDataSelector),
// }
