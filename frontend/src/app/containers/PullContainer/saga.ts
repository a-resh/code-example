import { all, call, put, takeLatest } from 'redux-saga/effects';
import { pullContainerActions } from './slice';
import axios from 'axios';
import { contentActions } from '../Content/slice';
import { take } from 'rxjs/operators';
const b = () => {
  return fetch(
    'http://ec2-13-58-248-197.us-east-2.compute.amazonaws.com/btcData',
    // 'https://pure-plateau-85418.herokuapp.com/https://nomics.com/data/candles?currency=BTC&interval=365d',
    { method: 'GET' },
  ).then(v => v.json());
};
function* getGraphicsData() {
  try {
    const payload = yield call(b);
    console.log(payload);
    yield put({
      type: pullContainerActions.getGraphicsDataSuccess.type,
      payload,
    });
  } catch (e) {
    yield put({ type: contentActions.error.type });
  }
}
function* getData() {
  const payload = [
    {
      id: 1,
      type: 'draw_15',
      endTime: new Date('2021-04-15').getTime(),
      users: [
        {
          id: '0xcEF026d6d6ebeDcBF934545cCae855013c757Ced',
          bet: '10',
          prediction: '41000',
        },
        {
          id: '0xA0e57194EE7694883b20Ecb0C5aD9A52151D88ac',
          bet: '20',
          prediction: '42000',
        },
        {
          id: '0x966e0365e04873D230DA25A9bE4E80AF087eEAf8',
          bet: '10',
          prediction: '40000',
        },
      ],
    },
    {
      id: 2,
      type: 'draw_30',
      endTime: new Date('2021-03-15').getTime(),
      users: [
        {
          id: '0xcEF026d6d6ebeDcBF934545cCae855013c757Ced',
          bet: '10',
          prediction: '44000',
        },
        {
          id: '0x83854c3288f62E8B61e0CBa6c20E143a5eAe8212',
          bet: '60',
          prediction: '45000',
        },
        {
          id: '0x0D84B727CB638b245b57aB409aFf9E142484D5BC',
          bet: '10',
          prediction: '46000',
        },
      ],
    },
    {
      id: 3,
      type: 'draw_60',
      endTime: new Date('2021-05-15').getTime(),
      users: [
        {
          id: '0xcEF026d6d6ebeDcBF934545cCae855013c757Ced',
          bet: '5000',
          prediction: '39000',
        },
        {
          id: '0x966e0365e04873D230DA25A9bE4E80AF087eEAf8',
          bet: '10',
          prediction: '38000',
        },
        {
          id: '0x0D84B727CB638b245b57aB409aFf9E142484D5BC',
          bet: '40',
          prediction: '37000',
        },
      ],
    },
  ];
  yield put({ type: pullContainerActions.getDataSuccess.type, payload });
}
function* getDrawData() {
  yield takeLatest(pullContainerActions.getData.type, getData);
}
function* getBTCGraphicsData() {
  yield takeLatest(pullContainerActions.getGraphicsData.type, getGraphicsData);
}
export function* pullContainerSaga() {
  yield all([getDrawData(), getBTCGraphicsData()]);
}
