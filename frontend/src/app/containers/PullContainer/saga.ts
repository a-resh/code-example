import { all, call, put, takeLatest } from 'redux-saga/effects';
import { pullContainerActions } from './slice';
import { contentActions } from '../Content/slice';
import { api } from '../../../utils/api';
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
    let payload = yield call(api.getDrawsData);
    if (payload) {
      yield put({
        type: pullContainerActions.getDataDrawSuccess.type,
        payload,
      });
    }
    payload = yield call(api.getAllPayouts);
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
function* getBTCGraphicsData() {
  yield takeLatest(pullContainerActions.getGraphicsData.type, getGraphicsData);
}
export function* pullContainerSaga() {
  yield all([_getDrawData(), getBTCGraphicsData()]);
}
