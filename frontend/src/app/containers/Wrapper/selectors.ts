import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';
const tokenPrice = (state: RootState) =>
  state.wrapper?.tokenPrice || initialState.tokenPrice;
const activePage = (state: RootState) =>
  state?.wrapper?.activePage || initialState.activePage;
const user = (state: RootState) => state?.wrapper?.user || initialState.user;

export const userSelector = createSelector(user, user => user);

export const activePageSelector = createSelector(
  activePage,
  activePage => activePage,
);
export const tokenPriceSelector = createSelector(tokenPrice, price => price);
