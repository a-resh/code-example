import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.userData || initialState;

export const selectUserData = createSelector(
  [selectDomain],
  userDataState => userDataState,
);
