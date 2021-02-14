/**
 *
 * Reward
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { mediaQueries, TotemsData } from '../../../../../types/constants';
import { Column, Row } from '../../../../components/blocks';
import { TotemBackground } from '../../../../../types/interfaces';
import { Chart } from '../../../../components/Chart';

interface Props {
  totem: string;
}

export function Reward({ totem }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
    <Div background={TotemsData[totem].color}>
      <Top background={TotemsData[totem].color}>
        <ColumnReward>
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
        </ColumnReward>
        {/*<ColumnReward>*/}
        {/*  <p>{t(...messages.stakingReturns)}:</p>*/}
        {/*  <h2>40%</h2>*/}
        {/*  <Chart />*/}
        {/*</ColumnReward>*/}
      </Top>
      <Bottom background={TotemsData[totem].color}>
        <p>{t(...messages.totalDistributionToCommunity)}:</p>
        <h4>$ 1,856,566,875</h4>
      </Bottom>
    </Div>
  );
}

const Div = styled(Column)<TotemBackground>`
  height: 100%;
  width: 50%;
  color: white;
  justify-content: space-between;
  padding-bottom: 20px;
  @media screen and (min-width: 450px) {
    background-color: ${props => props.background};
  }
  ${mediaQueries.lessThan('medium')`
    width: 100%
  `}
`;
const Top = styled(Row)<TotemBackground>`
  width: 100%;
  background-color: ${props => props.background};
`;
const ColumnReward = styled(Column)`
  font-family: Lato;
  width: 50%;
  align-items: center;
  padding-top: 10px;

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
    padding-left: 5px;
  }
  ${mediaQueries.lessThan('small')`
    li {font-size: 12px; padding-top: 5px}
    p {font-size: 12px;}
    h1 {font-size: 90px; line-height: 110px;}
    h2 {font-size: 42px; line-height: 45px;}
  `}
`;

const LightFont = styled.div`
  font-weight: 300;
  li {
    border-right: 2px solid white;
    padding-right: 5px;
  }
  ${mediaQueries.greaterThan('large')`
    li {padding-right: 7px}
  `}
`;

const Bottom = styled(Row)<TotemBackground>`
  width: 100%;
  justify-content: space-around;
  background-color: ${props => props.background};
  p,
  h4 {
    display: block;
  }
  p {
    width: 40%;
    font-size: 18px;
    text-align: right;
    padding-right: 10px;
    font-weight: 300;
  }

  h4 {
    font-weight: 100;
    font-size: 26px;
    margin: 0;
    font-family: 'Lato Light';
  }

  ${mediaQueries.lessThan('small')`
    justify-content: flex-start;
    p, h4 {text-align: right;}
    p {font-size: 12px; padding: 20px 10px;}
    h4 {font-size: 16px; padding: 20px 10px;}
    background-color: rgba(39, 46, 56, 0.4);
  `}
`;
