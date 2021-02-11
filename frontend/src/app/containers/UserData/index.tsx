/**
 *
 * UserData
 *
 */

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { selectUserData } from './selectors';
import { userDataSaga } from './saga';
import { messages } from './messages';
import { WalletInfo } from './WalletInfo';
import { AccountRewards } from './AccountRewards';
import { Column } from '../../components/blocks';
import { userSelector } from '../Content/selectors';

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
        <WalletInfo user={user} />
        <AccountRewards />
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
`;
