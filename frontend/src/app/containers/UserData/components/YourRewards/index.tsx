/**
 *
 * YourReward
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { Center, Column, Row } from '../../../../components/blocks';
import { TotemBackground } from '../../../../../types/interfaces';
import { Icon } from '../../../../components/Icon';
import {mediaQueries, TotemsData} from '../../../../../types/constants';
import { Claim } from '../AccountRewardsAndPolls';
import { TableData } from '../../types';

interface Props {
  btcLastPrice: number;
  tokenPrice: number;
  stakes: TableData[];
  payout: () => void;
}

export function YourRewards({ stakes, payout, btcLastPrice, tokenPrice }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  // const values = Array.apply(null, Array(5)).map(() => {
  //   const totems = ['fox', 'wolf', 'owl'];
  //   return {
  //     totem: totems[Math.round(Math.random() + 0.3)],
  //     stake: Math.ceil(1000 * Math.random() * 100),
  //     time: new Date(`202${Math.round(Math.random())}-10-20`),
  //     prediction: Math.ceil(12000 + Math.random() * 100),
  //     projectedReturns: Math.ceil(1500 * Math.random() * 100),
  //     actualReturns: Math.ceil(1200 * Math.random() * 100),
  //   };
  // });

  return (
    <Div>
      <h1>{t('Your rewards')}</h1>
      {stakes.length ? (
        <Table>
          <TableHeader>
            <StakingPool>
              <p>{t('Staking poll')}</p>
            </StakingPool>
            <TOTM>
              <p>TOTM</p>
            </TOTM>
            <BTC>
              <p>BTC</p>
            </BTC>
            <Total>
              <p>{t('Total')}</p>
            </Total>
            <ButtonBlock></ButtonBlock>
          </TableHeader>
          {stakes.map((v, index) => {
            return (
              <TableRow
                key={index}
                background={TotemsData[v.totem.toUpperCase()].color}
              >
                <StakingPool>
                  <Icon
                    url={TotemsData[v.totem.toUpperCase()].icon}
                    width={15}
                    height={15}
                  />
                  <p>{`${v.totem.charAt(0).toUpperCase()}${v.totem.substr(
                    1,
                  )}`}</p>
                </StakingPool>
                <TOTM>
                  <p>{v.actualReturns}</p>
                </TOTM>
                <BTC>
                  <p>0.03</p>
                </BTC>
                <Total>
                  <p>${Math.round(v.actualReturns * tokenPrice)}</p>
                </Total>
                <ButtonBlock>
                  <ClaimMobile totem={v.totem} onClick={payout}>
                    <h3>{t('Claim')}</h3>
                  </ClaimMobile>
                </ButtonBlock>
              </TableRow>
            );
          })}
        </Table>
      ) : (
        <h3>{t(`You don't have a reward`)}</h3>
      )}
    </Div>
  );
}

const Div = styled.div`
  width: 100%;
  color: white;
  font-size: 8px;

  h1 {
    font-weight: 300;
    font-size: 27px;
  }
  h3 {
    font-weight: 300;
    font-size: 20px;
  }
  ${mediaQueries.greaterThan('small')`
     display: none;
  `}
`;

const Table = styled(Column)``;

const TableHeader = styled(Row)`
  width: 100%;
  justify-content: space-between;

  p {
    opacity: 0.4;
  }

  margin-bottom: 10px;
`;
const TableRow = styled(Center)<TotemBackground>`
  flex-direction: row;
  width: 100%;
  height: 25px;
  background-color: ${props => props.background};
  margin-bottom: 5px;
  font-weight: bold;
  justify-content: space-between;
`;
const StakingPool = styled(Row)`
  width: 40%;
  padding: 0 0 0 5px;

  p {
    width: calc(100% - 30px);
    margin-left: 5px;
    //background-color: #272e38;
    border: none;
    color: white;
    padding: 0 5px;
    font-weight: bold;
    border-radius: 2px;
    text-align: center;
  }
`;
const TOTM = styled(Center)`
  width: 10%;
`;
const BTC = styled(Center)`
  width: 10%;
`;
const Total = styled(Center)`
  width: 10%;
`;
const ButtonBlock = styled(Center)`
  width: 20%;
  height: 100%;
`;

const ClaimMobile = styled(Claim)`
  width: 100%;
  height: 100%;
  color: white;
  background-color: ${props =>
    props.totem === 'fox'
      ? '#FB8331'
      : props.totem === 'wolf'
      ? '#3B424B'
      : '#AFC7CB'};
`;
