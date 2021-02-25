import { wrapperActions } from './slice';

import Web3 from 'web3';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { contentActions } from '../Content/slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { pullContainerActions } from '../PullContainer/slice';
import { ChainId, Fetcher, Route, Token, WETH } from '@uniswap/sdk';
import { api } from '../../../utils/api';
import { LocalStorageKeys } from '../../../types/enums';
import { abi } from '../../../types/abis';
import { User } from '../../../types/interfaces';
declare const window: any;

async function getUserBalance(address) {
  const contract = new window.web3.eth.Contract(
    abi.general,
    '0x5755ba0BE69bF681447322CFb87fBa117B9905ad',
  );
  return contract.methods.balanceOf(address).call((error, balance) => balance);
}

function* getData() {
  try {
    const payload = yield call(api.getDrawsData);
    if (payload) {
      yield put({
        type: wrapperActions.getDataDrawSuccess.type,
        payload,
      });
    }
  } catch (e) {
    yield put({ type: contentActions.error.type });
  }
}

async function getAuthToken(address: string) {
  const preJWT = await api.auth(address);
  const msgParams = [
    {
      type: 'string',
      name: `I a'm sign one-time nonce for auth`,
      value: preJWT.toString(),
    },
  ];
  const signed = await window.ethereum
    .send('eth_signTypedData', [msgParams, address])
    .then(res => res.result);
  const token = await api.authGetToken(address, signed);
  localStorage.setItem(LocalStorageKeys.AUTH_TOKEN, token);
}

function* getLastBtcPrice() {
  try {
    const payload = yield call(api.getLastBtcPrice);
    if (payload) {
      yield put({ type: wrapperActions.getLastBtcPriceSuccess.type, payload });
    }
  } catch (e) {
    yield put({ type: contentActions.error });
  }
}

function* getTokenPrice() {
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

function* initUser() {
  const data = yield call(initUserAddress);
  if (data) {
    try {
      const payload: User = yield call(api.getUserData, data);
      payload.balance = +(yield call(getUserBalance, data));
      yield put({ type: wrapperActions.initSuccess.type, payload });
    } catch (e) {
      yield put({ type: contentActions.error.type, payload: e });
    }
  }
}

function* setUserEthAddress(action: PayloadAction<boolean>) {
  const data = yield call(setUserAddress);
  if (!data) {
    yield put({ type: contentActions.showConnectMetamaskModal.type });
  } else {
    try {
      yield call(getAuthToken, data);
      const payload: User = yield call(api.getUserData, data);
      payload.balance = +(yield call(getUserBalance, data));
      yield put({ type: wrapperActions.initSuccess.type, payload });
      if (action.payload) {
        yield put({ type: pullContainerActions.showModal.type });
      }
    } catch (e) {
      yield put({ type: contentActions.error.type, payload: e });
    }
  }
}

function* _getDrawData() {
  yield takeLatest(pullContainerActions.getData.type, getData);
}

function* _initUser() {
  yield takeLatest(wrapperActions.init.type, initUser);
}

function* _getTokenPrice() {
  yield takeLatest(wrapperActions.getTokenPrice.type, getTokenPrice);
}

function* _getLastBtcPrice() {
  yield takeLatest(wrapperActions.getLastBtcPrice.type, getLastBtcPrice);
}

function* _setUserSaga() {
  yield takeLatest(wrapperActions.setUserAddress.type, setUserEthAddress);
}

export function* wrapperSaga() {
  yield all([
    _initUser(),
    _setUserSaga(),
    _getTokenPrice(),
    _getLastBtcPrice(),
    _getDrawData(),
  ]);
}
