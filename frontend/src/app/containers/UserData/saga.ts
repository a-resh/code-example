import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { userDataActions } from './slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../../utils/api';
import { wrapperSaga } from '../Wrapper/saga';
import { wrapperActions } from '../Wrapper/slice';
import { contentActions } from '../Content/slice';

export function* _setBtcAddress(
  action: PayloadAction<{ publicAddress: string; btcAddress: string }>,
) {
  const result = yield call(
    api.setBtcAddress,
    action.payload.publicAddress,
    action.payload.btcAddress,
  );
  if (result) {
    yield put({
      type: wrapperActions.setBtcAddress.type,
      payload: action.payload.btcAddress,
    });
  } else {
    yield put({ type: contentActions.error.type });
  }
}

export function* userDataSaga() {
  yield takeLatest(userDataActions.setBtcAddress.type, _setBtcAddress);
}
