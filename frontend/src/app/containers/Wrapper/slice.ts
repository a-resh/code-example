import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';
import { User } from '../../../types/interfaces';

// The initial state of the Wrapper container
export const initialState: ContainerState = {
  activePage: 'FOX',
  user: {
    id: '',
    balance: 0,
    frozenTokens: 0,
    inGame: 0,
  },
  tokenPrice: 0,
  btcLastPrice: 32000,
};

const wrapperSlice = createSlice({
  name: 'wrapper',
  initialState,
  reducers: {
    getLastBtcPrice() {},
    getLastBtcPriceSuccess(state, action: PayloadAction<number>) {
      state.btcLastPrice = action.payload;
    },
    getTokenPrice() {},
    getTokenPriceSuccess(state, action: PayloadAction<number>) {
      state.tokenPrice = action.payload;
    },
    setActivePage(state, action: PayloadAction<string>) {
      state.activePage = action.payload;
    },
    init() {},
    initSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setUserAddress(state, action: PayloadAction<boolean>) {},
  },
});

export const {
  actions: wrapperActions,
  reducer,
  name: sliceKey,
} = wrapperSlice;
