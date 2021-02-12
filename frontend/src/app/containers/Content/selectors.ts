import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const user = (state: RootState) => state.content?.user || initialState.user;
const activePage = (state: RootState) =>
  state.content?.activePage || initialState.activePage;

export const userSelector = createSelector(user, user => user);
export const activePageSelector = createSelector(
  activePage,
  activePage => activePage,
);
