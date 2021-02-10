/**
 *
 * WalletInfo
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { Icon } from '../../../components/Icon';
import { mediaQueries } from '../../../../types/constants';
import { Center, Column, Row } from '../../../components/blocks';
import { User } from 'types/interfaces';

interface Props {
  user: User;
}

export const WalletInfo = memo(({ user }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
    <Div>
      <h1>{t('Your Wallet')}</h1>
      <ColumnWallet>
        <Row>
          <TotalBalance>
            <h3>{t('Total balance')}</h3>
            <Row>
              <h1>{user.balance}</h1>
              <p>TOTM</p>
            </Row>
          </TotalBalance>
          <Staked>
            <h3>{t('Amount staked')}</h3>
            <Row>
              <h2>{user.inGame}</h2>
              <p>TOTM</p>
            </Row>
          </Staked>
          <Available>
            <h3>{t('Available to stake')}</h3>
            <Row>
              <h2>{user.balance - user.inGame - user.frozenTokens}</h2>
              <p>TOTM</p>
            </Row>
          </Available>
        </Row>
        <Row>
          <AddTotm onClick={() => {}}>
            <p>{t('Add TOTM')}</p>
          </AddTotm>
          <BtcAddress>
            <label>
              BTC <small>Address</small>
            </label>
            <p>1345678912345678987</p>
            <Connected>
              <p>{t('Connected')}</p>
              <Icon url={'connected.svg'} width={10} height={10} />
            </Connected>
          </BtcAddress>
        </Row>
      </ColumnWallet>
      {/*  {t(...messages.someThing)}  */}
    </Div>
  );
});

const Div = styled.div`
  color: white;
  width: 100%;
  max-width: 820px;
  h1 {
    font-size: 50px;
    font-weight: 100;
    margin: 0 0 15px 0;
  }
  h3 {
    font-weight: 300;
    font-size: 20px;
    margin: 15px 0;
  }
`;
const ColumnWallet = styled(Column)`
  background-color: #272e38;
`;

const TotalBalance = styled(Column)`
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 0 30px 30px;
  width: 41%;
  h1 {
    margin: 0 5px 0 0;
    line-height: 18px;
    font-weight: bold;
  }
  p {
    font-size: 10px;
    line-height: 50px;
  }
  h2 {
    margin: 0 5px 0 0;
    font-weight: bold;
    font-size: 36px;
    line-height: 27px;
  }
  h3 {
    margin-bottom: 30px;
  }
  ${mediaQueries.lessThan('medium')`
    width: 50%;
    padding: 0 0 15px 15px;
    h1 {
      font-size: 36px;
    }
  `}
`;

const Staked = styled(TotalBalance)`
  width: 33%;
  ${mediaQueries.lessThan('medium')`
    display: none;
  `}
`;
const Available = styled(TotalBalance)`
  width: 27%;
  ${mediaQueries.lessThan('medium')`
    width: 50%;
  `}
`;

const AddTotm = styled(Center)`
  height: 60px;
  color: black;
  background-color: white;
  width: 20%;
  cursor: pointer;
  p {
    font-weight: bold;
    font-size: 15px;
  }
  ${mediaQueries.lessThan('medium')`
    p {
      font-size: 12px;
    }
  `}
`;

const BtcAddress = styled(Row)`
  background-color: #232830;
  width: 80%;
  height: 60px;
  justify-content: flex-end;
  align-items: center;
  padding-right: 30px;
  label {
    margin: 10px;
  }
  p {
    border: solid 2px black;
    padding: 0 10px;
  }
  ${mediaQueries.lessThan('medium')`
    padding-right: 10px;
    small {
      display: none;
    }
  `}
`;

const Connected = styled(Center)`
  flex-direction: row;
  background-color: black;
  font-size: 14px;
  margin: 0;
  height: 28px;
  line-height: 28px;
  padding: 10px;
  ${mediaQueries.lessThan('medium')`
    display: none;
  `}
`;
