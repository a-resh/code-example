import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { contentActions } from './slice';

function* initRequest() {
  const payload = {
    id: '0xcEF026d6d6ebeDcBF934545cCae855013c757Ced',
    balance: 15450,
    frozenTokens: 1500,
    inGame: 1500,
  };
  yield put({ type: contentActions.initSuccess.type, payload });
}

export function* contentSaga() {
  yield takeLatest(contentActions.init.type, initRequest);
}
