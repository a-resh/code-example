import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';
import { useSelector } from 'react-redux';
const showConnectMetamaskModal = (state: RootState) =>
  state.content?.showConnectMetamaskModal ||
  initialState.showConnectMetamaskModal;

const showErrorModal = (state: RootState) =>
  state.content?.showErrorModal || initialState.showErrorModal;

export const showConMetamaskModalSelector = createSelector(
  showConnectMetamaskModal,
  show => show,
);

export const showErrorModalSelector = createSelector(
  showErrorModal,
  show => show,
);
