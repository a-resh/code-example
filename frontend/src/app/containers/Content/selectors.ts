import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';
import { useSelector } from 'react-redux';
const showConnectMetamaskModal = (state: RootState) =>
  state.content?.showConnectMetamaskModal ||
  initialState.showConnectMetamaskModal;

export const showConMetamaskModalSelector = createSelector(
  showConnectMetamaskModal,
  show => show,
);
