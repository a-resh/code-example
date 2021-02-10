import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const user = (state: RootState) => state.content?.user || initialState.user;

export const userSelector = createSelector(user, user => user);
