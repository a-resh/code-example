import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';
const drawsData = (state: RootState) =>
  state.wrapper?.drawsData || initialState.drawsData;

export const drawsSelector = createSelector(drawsData, drawsData => drawsData);
const btcLastPrice = (state: RootState) =>
  state.wrapper?.btcLastPrice || initialState.btcLastPrice;
const tokenPrice = (state: RootState) =>
  state.wrapper?.tokenPrice || initialState.tokenPrice;
const activePage = (state: RootState) =>
  state?.wrapper?.activePage || initialState.activePage;
const user = (state: RootState) => state?.wrapper?.user || initialState.user;

export const userSelector = createSelector(user, user => user);
export const btcLastPriceSelector = createSelector(
  btcLastPrice,
  price => price,
);

export const activePageSelector = createSelector(
  activePage,
  activePage => activePage,
);
export const tokenPriceSelector = createSelector(tokenPrice, price => price);
