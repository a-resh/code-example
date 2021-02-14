/**
 *
 * ActivePools
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { mediaQueries, TotemsData } from '../../../../../types/constants';
import { Center, Column, Row } from '../../../../components/blocks';
import { convertDate } from '../../helpers';
import { TotemBackground } from '../../../../../types/interfaces';

interface Props {}

export function ActivePools(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const values = Array.apply(null, Array(3)).map(() => {
    const totems = ['fox', 'wolf', 'owl'];
    return {
      totem: totems[Math.round(Math.random() + 0.3)],
      stake: Math.ceil(1000 * Math.random() * 100),
      time: new Date(`2021-10-${Math.round(Math.random() * 10)}`),
      prediction: Math.ceil(12000 + Math.random() * 100),
      projectedReturns: Math.ceil(1500 * Math.random() * 100),
      actualReturns: Math.ceil(1200 * Math.random() * 100),
    };
  });
  return (
    <Div>
      <h1>{t('Active pools')}</h1>
      {values.map((v, index) => {
        return (
          <PullData key={index}>
            <h2>{v.totem}</h2>
            <DataWrapper
              background={`${TotemsData[v.totem.toUpperCase()].color}99`}
            >
              <DataRow>
                <Left>{t('Time left')}</Left>
                <Right>{convertDate(v.time)}</Right>
              </DataRow>
              <DataRow>
                <Left>{t('Stake')}</Left>
                <Right>{v.stake} TOTM</Right>
              </DataRow>
              <DataRow>
                <Left>{t('Your Prediction')}</Left>
                <Right>${v.prediction}(&#xb1;500)</Right>
              </DataRow>
              <DataRow>
                <Left>{t('Projected returns')}</Left>
                <Right>{v.projectedReturns} TOTM</Right>
              </DataRow>
            </DataWrapper>
          </PullData>
        );
      })}
    </Div>
  );
}

const Div = styled(Column)`
  width: 100%;
  color: white;

  h1,
  h2 {
    font-weight: 100;
  }
  h1 {
    font-size: 27px;
    margin: 25px 0 0 0;
  }
  h2 {
    margin: 25px 0 15px 0;
  }

  ${mediaQueries.greaterThan('small')`
    display: none;
  `}
`;

const PullData = styled(Column)`
  width: 100%;
`;

const DataWrapper = styled(Column)<TotemBackground>`
  background-color: ${props => props.background};
  padding: 10px 0;
  border-radius: 5px;
`;

const DataRow = styled(Row)`
  width: 100%;
`;
const Left = styled.div`
  padding-left: 30px;
  font-size: 11px;
  width: 50%;
  height: 25px;
`;
const Right = styled(Left)`
  border-left: solid 1px #acb5bf;
  font-size: 13px;
  font-weight: bold;
`;
