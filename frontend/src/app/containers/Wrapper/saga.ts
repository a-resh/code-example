import { wrapperActions } from './slice';

import Web3 from 'web3';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { contentActions } from '../Content/slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { pullContainerActions } from '../PullContainer/slice';
import { ChainId, Fetcher, Route, Token, WETH } from '@uniswap/sdk';
import { api } from '../../../utils/api';
declare const window: any;

async function getAuthToken(address: string) {
  const preJWT = await api.auth(address);
  const msgParams = [
    {
      type: 'bytes',
      name: `I a'm sign one-time nonce for auth`,
      value: preJWT,
    },
  ];
  const signed = await window.ethereum
    .send('eth_signTypedData', [msgParams, address])
    .then(res => res.result);
  const token = await api.authGetToken(address, signed);
  localStorage.setItem('token', token);
}

function* _getLastBtcPrice() {
  try {
    const payload = yield call(api.getLastBtcPrice);
    if (payload) {
      yield put({ type: wrapperActions.getLastBtcPriceSuccess.type, payload });
    }
  } catch (e) {
    yield put({ type: contentActions.error });
  }
}

function* _getTokenPrice() {
  const DAI = new Token(
    ChainId.MAINNET,
    '0x72e9D9038cE484EE986FEa183f8d8Df93f9aDA13',
    18,
  );
}

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
    await window.ethereum.send('eth_requestAccounts');
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    return null;
  }
  return await window.web3.eth.getAccounts().then(([account]) => account);
};

function* _initUser() {
  const data = yield call(initUserAddress);
  if (data) {
    try {
      const user = yield call(api.getUserData, data);
      yield put({ type: wrapperActions.initSuccess.type, payload: user });
    } catch (e) {
      yield put({ type: contentActions.error.type, payload: e });
    }
  }
}

function* _setUserAddress(action: PayloadAction<boolean>) {
  const data = yield call(setUserAddress);
  if (!data) {
    yield put({ type: contentActions.showConnectMetamaskModal.type });
  } else {
    try {
      yield call(getAuthToken, data);
      const payload = yield call(api.getUserData, data);
      yield put({ type: wrapperActions.initSuccess.type, payload });
      if (action.payload) {
        yield put({ type: pullContainerActions.showModal.type });
      }
    } catch (e) {
      yield put({ type: contentActions.error.type, payload: e });
    }
  }
}

function* initUser() {
  yield takeLatest(wrapperActions.init.type, _initUser);
}

function* getTokenPrice() {
  yield takeLatest(wrapperActions.getTokenPrice.type, _getTokenPrice);
}

function* getLastBtcPrice() {
  yield takeLatest(wrapperActions.getLastBtcPrice.type, _getLastBtcPrice);
}

function* setUserSaga() {
  yield takeLatest(wrapperActions.setUserAddress.type, _setUserAddress);
}

export function* wrapperSaga() {
  yield all([initUser(), setUserSaga(), getTokenPrice(), getLastBtcPrice()]);
}
