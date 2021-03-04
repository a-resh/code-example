import { take, call, put, select, takeLatest, all } from 'redux-saga/effects';
import { userDataActions } from './slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../../utils/api';
import { wrapperSaga } from '../Wrapper/saga';
import { wrapperActions } from '../Wrapper/slice';
import { contentActions } from '../Content/slice';

function* setBtcAddress(
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
      yield put({ type: contentActions.error.type, payload: result });
    }
  } catch (e) {
    yield put({ type: contentActions.error.type, payload: e });
  }
}
function* payout(action: PayloadAction<string>) {
  try {
    yield call(api.payout, action.payload);
  } catch (e) {
    put({ type: contentActions.error.type, payload: e });
  }
}
function* _payout() {
  yield takeLatest(userDataActions.payout.type, payout);
}
function* _setBtcAddress() {
  yield takeLatest(userDataActions.setBtcAddress.type, setBtcAddress);
}
export function* userDataSaga() {
  yield all([_setBtcAddress(), _payout()]);
}
