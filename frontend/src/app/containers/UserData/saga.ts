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
  try {
    const result = yield call(
        api.setBtcAddress,
        action.payload.publicAddress,
        action.payload.btcAddress,
    );
    if (result.ok) {
      yield put({
        type: wrapperActions.setBtcAddress.type,
        payload: action.payload.btcAddress,
      });
    } else {
      yield put({type: contentActions.error.type, payload: result});
    }
  } catch (e) {
    yield put({type: contentActions.error.type, payload: e});
  }
}

export function* userDataSaga() {
  yield takeLatest(userDataActions.setBtcAddress.type, _setBtcAddress);
}
