import { wrapperActions } from './slice';

import Web3 from 'web3';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { contentActions } from '../Content/slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { pullContainerActions } from '../PullContainer/slice';

declare const window: any;
const initUserAddress = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    return await window.web3.eth.getAccounts().then(([account]) => account);
  }
  return null;
};

const setUserAddress = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    return null;
  }
  return await window.web3.eth.getAccounts().then(([account]) => account);
};

function* initUser() {
  const payload = {
    id: '0xcEF026d6d6ebeDcBF934545cCae855013c757Ced',
    balance: 15450,
    frozenTokens: 1500,
    inGame: 1500,
  };
  const data = yield call(initUserAddress);
  if (data) {
    try {
      yield put({ type: wrapperActions.initSuccess.type, payload });
    } catch (e) {
      yield put({ type: contentActions.error.type, payload: e });
    }
  }
}

function* setUser(action: PayloadAction<boolean>) {
  const data = yield call(setUserAddress);
  const payload = {
    id: '0xcEF026d6d6ebeDcBF934545cCae855013c757Ced',
    balance: 15450,
    frozenTokens: 1500,
    inGame: 1500,
  };
  if (!data) {
    yield put({ type: contentActions.showConnectMetamaskModal.type });
  } else {
    try {
      yield put({ type: wrapperActions.initSuccess.type, payload });
      if (action.payload) {
        yield put({ type: pullContainerActions.showModal.type });
      }
    } catch (e) {
      yield put({ type: contentActions.error.type, payload: e });
    }
  }
}

function* initSaga() {
  yield takeLatest(wrapperActions.init.type, initUser);
}

function* setUserSaga() {
  yield takeLatest(wrapperActions.setUserAddress.type, setUser);
}

export function* wrapperSaga() {
  yield all([initSaga(), setUserSaga()]);
}
