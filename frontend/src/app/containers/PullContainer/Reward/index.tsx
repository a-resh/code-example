/**
 *
 * Reward
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import media from 'styled-media-query';
import { mediaQueries } from '../../../../types/constants';

interface Props {}

export function Reward({}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
    <Div>
      <Top>
        <Column>
          <p>{t(...messages.rewardDistribution)}:</p>
          <Row>
            <LightFont>
              <ul>
                <li>1st</li>
                <li>2nd</li>
                <li>4th - 10th</li>
                <li>11th - 25th</li>
              </ul>
            </LightFont>
            <h1>|</h1>
            <ul>
              <li>
                <b>30%</b>
              </li>
              <li>
                <b>20%</b>
              </li>
              <li>
                <b>7.5%</b>
              </li>
              <li>
                <b>7.5%</b>
              </li>
            </ul>
          </Row>
        </Column>
        <Column>
          <p>{t(...messages.stakingReturns)}:</p>
          <h2>40%</h2>
        </Column>
      </Top>
      <Bottom>
        <p>{t(...messages.totalDistributionToCommunity)}:</p>
        <h4>$ 1,856,566,875</h4>
      </Bottom>
    </Div>
  );
}

const Div = styled.div`
  height: 100%;
  width: 50%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 20px;
  ${mediaQueries.greaterThan('small')`background-color: #ff6701;`}
  ${mediaQueries.lessThan('medium')`
    width: 100%
  `}
`;
const Top = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: #ff6701;
`;
const Column = styled.div`
  font-family: Lato;
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
  padding-top: 10px;

  h1 {
    margin: 0;
    line-height: 120px;
    font-size: 120px;
    font-weight: 500;
    font-family: 'Roboto Thin';
    margin-block-start: 0;
    margin-block-end: 0;
    opacity: 0.4;
  }

  h2 {
    font-size: 69px;
    line-height: 69px;
    font-weight: 100;
    margin: 0;
  }

  ul {
    padding: 0;
  }

  li {
    list-style-type: none;
    font-size: 19px;
    text-align: right;
  }
  ${mediaQueries.lessThan('small')`
    li {font-size: 12px; padding-top: 5px}
    p {font-size: 12px;}
    h1 {font-size: 90px; line-height: 110px;}
    h2 {font-size: 42px; line-height: 45px;}
  `}
`;

const LightFont = styled.div`
  font-weight: 100;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
const Bottom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #ff6701;
  p,
  h4 {
    display: block;
  }
  p {
    width: 40%;
    font-size: 19px;
    text-align: right;
    padding-right: 10px;
  }

  h4 {
    font-weight: 100;
    font-size: 26px;
    margin: 0;
    font-family: 'Lato Light';
  }

  ${mediaQueries.lessThan('small')`
    justify-content: flex-start;
    p, h4 {text-align: center;}
    p {font-size: 12px; padding: 20px 10px;}
    h4 {font-size: 16px; padding: 20px 10px;}
    background-color: rgba(39, 46, 56, 0.4);
  `}
`;
