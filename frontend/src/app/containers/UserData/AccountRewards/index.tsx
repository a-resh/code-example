/**
 *
 * AccountRewards
 *
 */
import React, {memo} from 'react';
import styled from 'styled-components/macro';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import {Icon} from "../../../components/Icon";

interface Props {
}

export const AccountRewards = memo((props: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {t, i18n} = useTranslation();

    const values = Array.apply(null, Array(5)).map(() => {
        const totems = ['fox', 'wolf', 'owl']
        return {
            totem: totems[Math.round(Math.random() + 0.6)],
            stake: Math.ceil(1000 * Math.random() * 100),
            time: new Date(`202${Math.round(Math.random())}-10-20`),
            prediction: Math.ceil(12000 + Math.random() * 100),
            projectedReturns: Math.ceil(1500 * Math.random() * 100),
            actualReturns: Math.ceil(1200 * Math.random() * 100),
        }
    });
    return (
        <Div>
            <h1>{t('Pools and rewards')}</h1>
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
                {values.map((value, index) => {
                    const now = moment();
                    const stakeDate = moment(value.time);
                    const finished = stakeDate.isBefore(now);
                    let leftTime = 'Matured';
                    if (!finished) {
                        const days = stakeDate.diff(now, 'days');
                        const hours = stakeDate.diff(now.add(days, 'days'), "hours");
                        const minutes = stakeDate.diff(now.add(hours, 'hours'), "m");
                        leftTime = `${days}d, ${hours}h, ${minutes}m`
                    }
                    return (
                        <TableRow key={index} totem={value.totem} opacity={finished? 1: 0.5}>
                            <IconColumn finished={finished}>
                                {finished ? <Icon url={`${value.totem}-warning.svg`} width={15} height={15}/>: null}
                                <p>{value.totem.charAt(0).toUpperCase() + value.totem.slice(1)}</p>
                            </IconColumn>
                            <TimeLeftColumn>
                                <p>{leftTime}</p>
                            </TimeLeftColumn>
                            <StakeColumn>
                                <p>{value.stake}TOTM</p>
                            </StakeColumn>
                            <YourPredictionColumn>
                                <p>BTC=${value.prediction}(&#xb1;500)</p>
                            </YourPredictionColumn>
                            <ProjectedReturnsColumn>
                                <p>{finished ? '-' : `${value.projectedReturns}TOTM`}</p>
                            </ProjectedReturnsColumn>
                            <ActualReturnsColumn>
                                <p>{finished ? `${value.actualReturns}TOTM` : '-'}</p>
                            </ActualReturnsColumn>
                            <RoiColumn>
                                <p>{Math.round((finished ? value.actualReturns : value.projectedReturns) * 100 / value.stake)}%</p>
                            </RoiColumn>
                            <ButtonsColumn>
                                {finished
                                    ? <Claim totem={value.totem}>
                                        <h3> CLAIM</h3>
                                    </Claim>
                                    : <p>{t('Cancel')}</p>}
                            </ButtonsColumn>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Div>
    );
});

const Div = styled.div`
  color: white;
  width: 900px;

  h1 {
    font-size: 50px;
    font-weight: 100;
    margin: 0 0 15px 30px;
  }

  h3 {
    font-size: 15px;
    font-weight: 100;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const TableHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  div {
    height: 30px;
  }

  h3 {
    margin: 0;
  }
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const TableRow = styled.div<{ totem?: string; opacity: number }>`
  color: ${props => props.totem === 'fox' 
          ? `rgba(255, 103, 31, ${props.opacity})` 
          : props.totem === 'wolf' 
                  ? `rgba(51,158,176, ${props.opacity})` 
                  : `rgba(51,158,176, ${props.opacity})`};
  div {
    height: 30px;
  }

  p {
    font-size: 12px;
  }
`;

const IconColumn = styled.div<{ finished?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.finished ? 'space-around !important': null};
  border-right: 2px solid white;
  width: 70px;
  padding: 0 7px;
`;
const TimeLeftColumn = styled.div`
  border-right: 2px solid white;
  width: 100px;
`;
const StakeColumn = styled.div`
  border-right: 2px solid white;
  width: 120px;
`;
const YourPredictionColumn = styled.div`
  border-right: 2px solid white;
  width: 160px;
`;
const ProjectedReturnsColumn = styled.div`
  border-right: 2px solid white;
  width: 120px;
`;
const ActualReturnsColumn = styled.div`
  border-right: 2px solid white;
  width: 120px;
`;
const RoiColumn = styled.div`
  border-right: 2px solid white;
  width: 50px;
`;
const ButtonsColumn = styled.div`
  div {
    height: 20px;
  }
  width: 90px;
  padding: 10px;
`;

const Claim = styled.div<{ totem: string }>`
  background-color: ${props => props.totem === 'fox' ? '#ff671f' : props.totem === 'wolf' ? '#739ba2' : 'white'};
  color: ${props => props.totem === 'fox' ? 'white' : '#272E38'};
  width: 90%;
  height: 70%;
  h3 {
    font-size: 13px;
    margin: 0;
  }
`;
