import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';
import { TotemsData } from '../../../types/constants';
import { activePageSelector } from '../Wrapper/selectors';

const isShowModal = (state: RootState) =>
  state?.pullContainer?.isShowModal || initialState.isShowModal;
const drawData = (state: RootState) =>
  state.pullContainer?.drawData || initialState.drawData;

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

export const isShowModalSelector = createSelector(
  isShowModal,
  isShowModal => isShowModal,
);
