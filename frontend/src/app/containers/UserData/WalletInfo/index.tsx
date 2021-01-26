/**
*
* WalletInfo
*
*/
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import {Center} from "../../../components/Center";
import {Icon} from "../../../components/Icon";

interface Props {}

export const WalletInfo = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
  <Div>
    <h1>{t('Your Wallet')}</h1>
    <Column>
      <Row>
      <Amount width={'41%'}>
        <h3>{t('Total balance')}</h3>
        <Row><h1>1,000</h1><p>TOTM</p></Row>
      </Amount>
      <Amount width={'33%'}>
        <h3>{t('Amount staked')}</h3>
        <Row><h2>264</h2><p>TOTM</p></Row>
      </Amount>
      <Amount>
        <h3>{t('Available to stake')}</h3>
        <Row><h2>736</h2><p>TOTM</p></Row>
      </Amount>
      </Row>
      <Row>
        <AddTotm onClick={() => {}}>
          <p>{t('Add TOTM')}</p>
        </AddTotm>
        <BtcAddress>
          <label>BTC Address</label>
          <p>1345678912345678987</p>
          <Connected><p>{t('Connected')}</p><Icon url={'connected.svg'} width={10} height={10} /></Connected>
        </BtcAddress>
      </Row>
    </Column>
    {/*  {t(...messages.someThing)}  */}
  </Div>
  );

});

const Div = styled.div`
  color: white;
  width: 820px;
  h1 {
    font-size: 50px;
    font-weight: 100;
    margin: 0 0 15px 0;
  }
  h3 {
    font-weight: 100;
    font-size: 20px;
    margin: 15px 0;
  }
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #272E38;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Amount = styled.div<{width?: string}>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 0 30px 30px;
  width: ${props => props.width};
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
`;

const AddTotm = styled.div`
  height: 60px;
  color: black;
  background-color: white;
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  p {
    font-weight: bold;
    font-size: 15px;
  }
`

const BtcAddress = styled.div`
  background-color: #232830;
  width: 80%;
  height: 60px;
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
  padding-right: 30px;
  label {
    margin: 10px;
  }
  p {
    border: solid 2px black;
    padding: 0 10px;
  }
`;

const Connected = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: black;
  font-size: 14px;
  margin: 0;
  height: 28px;
  line-height: 28px;
  padding: 10px; 
`;