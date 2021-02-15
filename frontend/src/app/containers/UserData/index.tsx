/**
 *
 * UserData
 *
 */

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { userDataSaga } from './saga';
import { WalletInfo } from './components/WalletInfo';
import { AccountRewardsAndPools } from './components/AccountRewardsAndPolls';
import { Column } from '../../components/blocks';
import { mediaQueries } from '../../../types/constants';
import { YourRewards } from './components/YourRewards';
import { ActivePools } from './components/ActivePools';
import { userSelector } from '../Wrapper/selectors';

interface Props {}

export function UserData(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: userDataSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useSelector(userSelector);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
    <>
      <Div>
        <YourRewardsWrapper>
          <YourRewards />
        </YourRewardsWrapper>
        <WalletInfo user={user} />
        <AccountRewardsAndPools />
        <ActivePools />
      </Div>
    </>
  );
}

const Div = styled(Column)`
  justify-content: space-around;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 15px;
  ${mediaQueries.lessThan('small')`
     
  `}
`;

const YourRewardsWrapper = styled.div`
  width: 100%;
  ${mediaQueries.greaterThan('small')`
     display: none;
  `}
`;
