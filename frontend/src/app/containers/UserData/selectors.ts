import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';
import { drawsSelector, userSelector } from '../Wrapper/selectors';
import { TableData } from './types';
import moment from 'moment';
import { TotemsData } from '../../../types/constants';
const TotemsById = {
  [TotemsData.FOX.id]: TotemsData.FOX.name.toLowerCase(),
  [TotemsData.WOLF.id]: TotemsData.WOLF.name.toLowerCase(),
  [TotemsData.OWL.id]: TotemsData.OWL.name.toLowerCase(),
};

export const stakesAndRewardsSelector = createSelector(
  drawsSelector,
  userSelector,
  (draws, user) => {
    if (user.publicAddress) {
      return draws
        .map(draw => {
          const userStakes = draw.users.filter(
            u => u.id === user.publicAddress,
          );
          return userStakes.map(stake => {
            return {
              totem: TotemsById[draw.id],
              stake: stake.bet,
              prediction: stake.prediction,
              projectedReturns: Math.round(stake.bet * 1.4),
              actualReturns: Math.round(stake.bet * 1.3),
              time: new Date(+draw.endTime),
            } as TableData;
          });
        })
        .reduce((acc, data) => [...acc, ...data], []);
    }
    return [];
  },
);

export const activeStakesSelector = createSelector(
  stakesAndRewardsSelector,
  data => data.filter(v => !moment(v.time).isBefore(new Date())),
);

export const oldStakesSelector = createSelector(
  stakesAndRewardsSelector,
  data => data.filter(v => moment(v.time).isBefore(new Date())),
);
