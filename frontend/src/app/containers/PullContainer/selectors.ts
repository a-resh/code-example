import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

// const selectDomain = (state: RootState) => state.pullContainer || initialState;
const isShowDrawer = (state: RootState) => state.pullContainer?.isShowDrawer || initialState.isShowDrawer;

export const selectPullContainer = createSelector(
  [isShowDrawer],
  pullContainerState => pullContainerState,
);
