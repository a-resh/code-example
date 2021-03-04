/**
 *
 * AccountRewards
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { Icon } from '../../../../components/Icon';
import { mediaQueries } from '../../../../../types/constants';
import { Center, Column, Row } from '../../../../components/blocks';
import { convertDate } from '../../helpers';
import { TableData } from '../../types';

interface Props {
  rewards: TableData[];
  payout: () => void;
}

export const AccountRewardsAndPools = memo(({ rewards, payout }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  // const totems = ['fox', 'wolf', 'owl'];
  // const values = Array.apply(null, Array(5))
  //   .map(() => {
  //     const totems = ['fox', 'wolf', 'owl'];
  //     return {
  //       totem: totems[Math.round(Math.random() + 0.6)],
  //       stake: Math.ceil(1000 * Math.random() * 100),
  //       time: new Date(`202${Math.round(Math.random())}-10-20`),
  //       prediction: Math.ceil(12000 + Math.random() * 100),
  //       projectedReturns: Math.ceil(1500 * Math.random() * 100),
  //       actualReturns: Math.ceil(1200 * Math.random() * 100),
  //     };
  //   })
  //   .sort((a, b) => a.time.getTime() - b.time.getTime());
  return (
    <Div>
      <h1>{t('Pools and rewards')}</h1>
      {rewards.length ? (
        <Table>
          <TableHeader>
            <IconColumn></IconColumn>
            <TimeLeftColumn>
              <h3>{t('Time left')}</h3>
            </TimeLeftColumn>
            <StakeColumn>
              <h3>{t('Stake')}</h3>
            </StakeColumn>
            <YourPredictionColumn>
              <h3>{t('Your prediction')}</h3>
            </YourPredictionColumn>
            <ProjectedReturnsColumn>
              <h3>{t('Projected returns')}</h3>
            </ProjectedReturnsColumn>
            <ActualReturnsColumn>
              <h3>{t('Actual returns')}</h3>
            </ActualReturnsColumn>
            <RoiColumn>
              <h3>{t('ROI')}</h3>
            </RoiColumn>
            <ButtonsColumn></ButtonsColumn>
          </TableHeader>
          <TableBody>
            {rewards.map((value, index) => {
              const finished = moment(value.time).isBefore(moment());
              let leftTime = 'Matured';
              if (!finished) {
                leftTime = convertDate(value.time);
              }
              return (
                <TableRow
                  key={index}
                  totem={value.totem}
                  opacity={finished ? 1 : 0.5}
                >
                  <IconColumn finished={finished}>
                    {finished ? (
                      <Icon
                        url={`${value.totem}-warning.svg`}
                        width={15}
                        height={15}
                      />
                    ) : null}
                    <p>
                      {value.totem.charAt(0).toUpperCase() +
                        value.totem.slice(1)}
                    </p>
                  </IconColumn>
                  <TimeLeftColumn>
                    <p>{leftTime}</p>
                  </TimeLeftColumn>
                  <StakeColumn>
                    <p>
                      {value.stake}
                      <small>TOTM</small>
                    </p>
                  </StakeColumn>
                  <YourPredictionColumn>
                    <p>
                      <small>BTC=</small>${value.prediction}(&#xb1;500)
                    </p>
                  </YourPredictionColumn>
                  <ProjectedReturnsColumn>
                    <p>{finished ? '-' : `${value.projectedReturns}TOTM`}</p>
                  </ProjectedReturnsColumn>
                  <ActualReturnsColumn>
                    <p>{finished ? `${value.actualReturns}TOTM` : '-'}</p>
                  </ActualReturnsColumn>
                  <RoiColumn>
                    <p>
                      {Math.round(
                        ((finished
                          ? value.actualReturns
                          : value.projectedReturns) *
                          100) /
                          value.stake,
                      )}
                      %
                    </p>
                  </RoiColumn>
                  <ButtonsColumn>
                    {finished ? (
                      <Claim totem={value.totem} onClick={payout}>
                        <h3> CLAIM</h3>
                      </Claim>
                    ) : null}
                  </ButtonsColumn>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <h3>{t(`You don't have active pools and rewards`)}</h3>
      )}
    </Div>
  );
});

const Div = styled.div`
  color: white;
  width: 100%;
  max-width: 900px;

  h1 {
    font-size: 50px;
    font-weight: 300;
    margin: 0 0 15px 30px;
  }

  h3 {
    font-size: 20px;
    font-weight: 300;
    margin-left: 40px;
  }

  ${mediaQueries.lessThan('medium')`
    h1 {
      margin: 0 0 15px 0;
    }
  `}
  ${mediaQueries.lessThan('small')`
    display: none;
  `}
`;
const Table = styled(Column)``;

const TableHeader = styled(Row)`
  width: 100%;

  div {
    height: 30px;
  }

  h3 {
    margin: 0;
  }
`;

const TableBody = styled(Column)`
  width: 100%;
`;
const TableRow = styled.div<{ totem?: string; opacity: number }>`
  color: ${props =>
    props.totem === 'fox'
      ? `rgba(255, 103, 31, ${props.opacity})`
      : props.totem === 'wolf'
      ? `rgba(51,158,176, ${props.opacity})`
      : `rgba(256,256,256, ${props.opacity})`};
  display: flex !important;
  flex-direction: row;

  div {
    height: 30px;
  }

  p,
  small {
    font-size: 12px;
  }

  ${mediaQueries.lessThan('medium')`
   p { font-size: 10px};
   small {display: none};
  `}
`;

const IconColumn = styled(Center)<{ finished?: boolean }>`
  flex-direction: row;
  justify-content: ${props =>
    props.finished ? 'space-around !important' : null};
  border-right: 2px solid white;
  width: 8%;
  padding: 0 7px;
  ${mediaQueries.lessThan('medium')`
   width: 17%;
  `}
`;
const TimeLeftColumn = styled(Center)`
  border-right: 2px solid white;
  width: 11%;
  ${mediaQueries.lessThan('medium')`
  width: 20%;
  `}
`;
const StakeColumn = styled(Center)`
  border-right: 2px solid white;
  width: 15%;
  ${mediaQueries.lessThan('medium')`
  h3 {font-size: 10px;}
  `}
`;
const YourPredictionColumn = styled(Center)`
  border-right: 2px solid white;
  width: 20%;

  small {
    font-size: 12px;
  }

  ${mediaQueries.lessThan('large')`
    width: 120px;
    small {
      display: none !important;
    }
  `}
  ${mediaQueries.lessThan('medium')`
  width: 23%;
    h3 {font-size: 10px;}
  `}
`;
const ProjectedReturnsColumn = styled(Center)`
  border-right: 2px solid white;
  width: 18%;
  ${mediaQueries.lessThan('large')`
  h3 {font-size: 10px;}
`}

  ${mediaQueries.lessThan('medium')`
  display: none !important;
`}
`;
const ActualReturnsColumn = styled(Center)`
  border-right: 2px solid white;
  width: 15%;
  ${mediaQueries.lessThan('medium')`
    display: none !important;
  `}
`;
const RoiColumn = styled(Center)`
  border-right: 2px solid white;
  width: 5%;
  ${mediaQueries.lessThan('medium')`
   width: 12%;
  `}
`;
const ButtonsColumn = styled(Center)`
  div {
    height: 20px;
  }

  width: 10%;
  padding: 10px;
  ${mediaQueries.lessThan('medium')`
   width: 22%;
  `}
`;

export const Claim = styled(Center)<{ totem: string }>`
  background-color: ${props =>
    props.totem === 'fox'
      ? '#ff671f'
      : props.totem === 'wolf'
      ? '#739ba2'
      : 'white'};
  color: ${props => (props.totem === 'fox' ? 'white' : '#272E38')};
  width: 90%;
  height: 70%;
  cursor: pointer;
  h3 {
    font-size: 13px;
    margin: 0;
  }
`;
