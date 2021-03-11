import { all, call, put, takeLatest } from 'redux-saga/effects';
import { pullContainerActions } from './slice';
import { contentActions } from '../Content/slice';
import { api } from '../../../utils/api';
import { PayloadAction } from '@reduxjs/toolkit';
import { MakePredictData } from './types';
import { generalContract, predictContract } from '../Wrapper/saga';

function predict(action: PayloadAction<MakePredictData>) {
  return predictContract.methods
    .addNewPlayer(
      action.payload.stakeValue,
      action.payload.bitcoinPrice,
      action.payload.days,
    )
    .send({ from: action.payload.address });
}
function approve(action: PayloadAction<MakePredictData>) {
  return generalContract.methods
    .approve(action.payload.address, action.payload.stakeValue)
    .send({ from: action.payload.address }, (err, result) =>
      err ? null : result.blockHash,
    );
}

function* makePredict(action: PayloadAction<MakePredictData>) {
  try {
    yield put({ type: pullContainerActions.loading.type });
    const result = yield call(approve, action);
    if (result) {
      yield call(predict, action);
      yield put({
        type: pullContainerActions.showConfirmModal.type,
        payload: false,
      });
      yield put({ type: pullContainerActions.loading.type });
    }
  } catch (e) {
    yield put({
      type: pullContainerActions.showConfirmModal.type,
      payload: false,
    });
    yield put({ type: pullContainerActions.loading.type });
  }
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
