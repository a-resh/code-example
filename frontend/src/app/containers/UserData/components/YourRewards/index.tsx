/**
 *
 * YourReward
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { Center, Row } from '../../../../components/blocks';
import { TotemBackground } from '../../../../../types/interfaces';
import { Icon } from '../../../../components/Icon';
import { TotemsData } from '../../../../../types/constants';
import { Claim } from '../AccountRewardsAndPolls';

interface Props {}

export function YourRewards(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const values = Array.apply(null, Array(5)).map(() => {
    const totems = ['fox', 'wolf', 'owl'];
    return {
      totem: totems[Math.round(Math.random() + 0.3)],
      stake: Math.ceil(1000 * Math.random() * 100),
      time: new Date(`202${Math.round(Math.random())}-10-20`),
      prediction: Math.ceil(12000 + Math.random() * 100),
      projectedReturns: Math.ceil(1500 * Math.random() * 100),
      actualReturns: Math.ceil(1200 * Math.random() * 100),
    };
  });

  return (
    <Div>
      <h1>{t('Your rewards')}</h1>
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
      {values.map(v => {
        return (
          <TableRow background={TotemsData[v.totem.toUpperCase()].color}>
            <StakingPool>
              <Icon
                url={TotemsData[v.totem.toUpperCase()].icon}
                width={15}
                height={15}
              />
              <select name="totem" id="">
                <option value={v.totem}>{v.totem}</option>
                <option value={v.totem}>{v.totem}</option>
                <option value={v.totem}>{v.totem}</option>
              </select>
            </StakingPool>
            <TOTM>
              <p>100</p>
            </TOTM>
            <BTC>
              <p>0.03</p>
            </BTC>
            <Total>
              <p>$300</p>
            </Total>
            <ButtonBlock>
              <ClaimMobile totem={v.totem}>
                <h3>Claim</h3>
              </ClaimMobile>
            </ButtonBlock>
          </TableRow>
        );
      })}
    </Div>
  );
}

const Div = styled.div`
  width: 100%;
  color: white;
  font-size: 8px;
  h1 {
    font-weight: 100;
    font-size: 27px;
  }
`;

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
  select,
  option {
    width: calc(100% - 30px);
    margin-left: 5px;
    background-color: #272e38;
    border: none;
    color: white;
    padding: 0 5px;
    font-weight: bold;
    border-radius: 2px;
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
