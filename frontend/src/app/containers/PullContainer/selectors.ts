import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.pullContainer || initialState;

export const selectPullContainer = createSelector(
  [selectDomain],
  pullContainerState => pullContainerState,
);
