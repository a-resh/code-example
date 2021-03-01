import { all, call, put, takeLatest } from 'redux-saga/effects';
import { pullContainerActions } from './slice';
import { contentActions } from '../Content/slice';
import { api } from '../../../utils/api';
import { PayloadAction } from '@reduxjs/toolkit';
import { MakePredictData } from './types';
import { generalContract } from '../Wrapper/saga';

function* makePredict(action: PayloadAction<MakePredictData>) {
  try {
    yield call(
      generalContract.methods.approve,
      action.payload.user.publicAddress,
      action.payload.stakeValue,
    );
  } catch (e) {}
}
function* getGraphicsData() {
  try {
    const payload = yield call(api.getBtcPrices);
    if (payload) {
      yield put({
        type: pullContainerActions.getGraphicsDataSuccess.type,
        payload,
      });
    }
  } catch (e) {
    yield put({ type: contentActions.error.type });
  }
}
function* getData() {
  try {
    const payload = yield call(api.getAllPayouts);
    if (payload) {
      yield put({
        type: pullContainerActions.getAllPayoutSuccess.type,
        payload,
      });
    }
  } catch (e) {
    yield put({ type: contentActions.error.type });
  }
}
function* _getDrawData() {
  yield takeLatest(pullContainerActions.getData.type, getData);
}
function* _getBTCGraphicsData() {
  yield takeLatest(pullContainerActions.getGraphicsData.type, getGraphicsData);
}
function* _makePredict() {
  yield takeLatest(pullContainerActions.makePredict.type, makePredict);
}
export function* pullContainerSaga() {
  yield all([_getDrawData(), _getBTCGraphicsData(), _makePredict()]);
}
