/**
 *
 * WalletInfo
 *
 */
import React, { memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { Icon } from '../../../../components/Icon';
import { mediaQueries } from '../../../../../types/constants';
import { Center, Column, Row } from '../../../../components/blocks';
import { User } from 'types/interfaces';
import { validate, getAddressInfo } from 'bitcoin-address-validation';

interface Props {
  user: User;
  setBtcAddress: (a: string, b: string) => void;
}

export const WalletInfo = ({ user, setBtcAddress }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const prevBtcAddress = usePrevious(user.btcAddress);
  const [btcAddressError, setBtcAddressError] = useState(false);
  const [editBtcAddress, setEditBtcAddress] = useState(false);
  const [btcAddress, setBtcAddr] = useState('');
  useEffect(() => {
    if (user.btcAddress !== prevBtcAddress) {
      setEditBtcAddress(false);
    }
  }, [user]);
  const handleInput = (value: string) => {
    setBtcAddr(value);
    setBtcAddressError(false);
    setEditBtcAddress(!!value);
  };
  const setBitcoinAddress = () => {
    if (btcAddress === user.btcAddress || !btcAddress) {
      return;
    }
    if (validate(btcAddress)) {
      setBtcAddress(user.publicAddress, btcAddress);
    } else {
      setBtcAddressError(true);
    }
  };
  return (
    <Div>
      <h1>{t('Your Wallet')}</h1>
      <ColumnWallet>
        <RowWalletInfo>
          <TotalBalance>
            <h3>{t('Total balance')}</h3>
            <Row>
              <h1>{user.balance}</h1>
              <p>TOTM</p>
            </Row>
          </TotalBalance>
          <RowAvailableStaked>
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
                <h2>{user.balance - user.inGame}</h2>
                <p>TOTM</p>
              </Row>
            </Available>
          </RowAvailableStaked>
        </RowWalletInfo>
        <Row>
          <AddTotm
            onClick={() =>
              window.open(
                `https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x72e9D9038cE484EE986FEa183f8d8Df93f9aDA13`,
                '_blank',
              )
            }
          >
            <p>{t('Add TOTM')}</p>
          </AddTotm>
          <BtcAddress
            onClick={() => setBitcoinAddress()}
            error={btcAddressError}
          >
            <label>
              BTC <small>Address</small>
            </label>
            <input
              type="text"
              // disabled={!!user.btcAddress}
              placeholder={
                user.btcAddress
                  ? user.btcAddress
                  : (t('please input your btc address') as string)
              }
              onChange={e => handleInput(e.target.value)}
            />
            <Connected>
              <p>
                {user.btcAddress && !editBtcAddress
                  ? (t('Connected') as string)
                  : editBtcAddress
                  ? t('Edit')
                  : (t('Not Connected') as string)}
              </p>
              {user.btcAddress && !editBtcAddress ? (
                <Icon url={'connected.svg'} width={10} height={10} />
              ) : null}
            </Connected>
          </BtcAddress>
        </Row>
      </ColumnWallet>
    </Div>
  );
};

const Div = styled.div`
  color: white;
  width: 100%;
  max-width: 820px;

  h1 {
    font-size: 50px;
    font-weight: 300;
    margin: 0 0 15px 0;
  }

  h3 {
    font-weight: 300;
    font-size: 20px;
    margin: 15px 0;
  }

  ${mediaQueries.lessThan('small')`
    h1 {
      font-size: 27px;
      margin: 25px 0;
    }
  `}
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

  ${mediaQueries.lessThan('small')`
    padding: 15px 0 0 15px;
    h3 {
      font-size: 12px;
      margin: 0;
    }
    h1 {
      font-size: 27px;
      line-height: 36px;
    }
    h2 {
      font-size: 27px;
      line-height: 36px;
    }
    p {
      font-size: 8px;
    }
  `}
`;

const Staked = styled(TotalBalance)`
  width: 50%;
`;
const Available = styled(TotalBalance)`
  width: 50%;
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
    display: none;
  `}
`;

const BtcAddress = styled(Row)<{ error: boolean }>`
  background-color: #232830;
  width: 80%;
  height: 60px;
  justify-content: flex-end;
  align-items: center;
  padding-right: 30px;
  cursor: pointer;

  label {
    margin-right: 10px;
  }

  p {
    padding: 0 10px;
  }

  input[type='text'] {
    border-radius: 0;
    background-color: #232830;
    border: solid 2px ${props => (props.error ? 'red' : 'black')};
    padding: 0 5px;
    color: white;
    width: 340px;
    height: 28px;
  }

  input:focus {
    outline: none;
    border-radius: 0;
  }
  
  @media screen and (max-width: 850px) {
    padding-right: 20px;
    input[type='text'] {
      width: 300px;
    }
  }

  ${mediaQueries.lessThan('medium')`
  padding-right: 0;
    background-color: #202020;
    width: 100%;
    height: 25px;
    justify-content: center;
    p, label, small, input[type='text'] {
      font-size: 12px;
    }
    input[type='text']{
        width: 170px;
        height: 20px;
    }
    small {
      display: inline;
    }
  `}
  ${mediaQueries.lessThan('small')`
        p, label, small, input[type='text'] {
      font-size: 9px;
    }
        input[type='text']{
        width: 135px;
        height: 20px;
    }
  `}
`;

const Connected = styled(Center)`
  flex-direction: row;
  background-color: black;
  font-size: 14px;
  margin: 0;
  height: 28px;
  width: 135px;
  line-height: 28px;
  ${mediaQueries.lessThan('medium')`
    background-color: inherit;
    height: 17px;
    width: 100px;
    font-size: 12px;
    display: flex;
    padding: 4px;
    p {
      line-height: 7px;
      border: none;
      padding: 0 5px;
    }
  `}
  ${mediaQueries.lessThan('small')`
    font-size: 9px;
    width: 80px;
  `}
`;

const RowWalletInfo = styled(Row)`
  ${mediaQueries.lessThan('medium')`
    flex-direction: column;
    background-color: #232830;
  `}
`;

const RowAvailableStaked = styled(Row)`
  width: 59%;
  ${mediaQueries.lessThan('medium')`
    width: 100%;
  `}
`;

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
