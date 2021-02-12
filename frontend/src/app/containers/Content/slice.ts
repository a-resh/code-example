import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';
import { User } from '../../../types/interfaces';

// The initial state of the Content container
export const initialState: ContainerState = {
  user: {
    id: '',
    balance: 0,
    frozenTokens: 0,
    inGame: 0,
  },
  activePage: 'FOX',
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    init() {},
    initSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setActivePage(state, action: PayloadAction<string>) {
      state.activePage = action.payload;
    },
  },
});

export const {
  actions: contentActions,
  reducer,
  name: sliceKey,
} = contentSlice;
