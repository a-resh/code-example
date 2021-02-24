/**
 *
 * Timer
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { mediaQueries } from '../../../../../types/constants';
import { Center } from '../../../../components/blocks';
import moment from 'moment';
import { useEffect, useState } from 'react';

interface Props {
  endTime?: number;
}

export function Timer({ endTime }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const updateTime = () => {
    endTime = endTime ? endTime : new Date().getTime();
    const timeToEnd = moment(endTime);
    const timeToEndForMinutesAndSeconds = moment(endTime);
    const now = moment();
    const minutesAndSeconds = moment(
      timeToEndForMinutesAndSeconds.diff(now),
    ).format('mm:ss');
    const days = timeToEnd.diff(now, 'days');
    const hours = timeToEnd.diff(now.add(days, 'days'), 'hours');
    return `${days * 24 + hours}:${minutesAndSeconds}`;
  };
  const [time, setTime] = useState(updateTime() || '00:00:00');

  useEffect(() => {
    setTime(updateTime());
    const interval = setInterval(() => {
      setTime(updateTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime]);
  return (
    <Div>
      <Title>{t(...messages.nextPoolDeparts)}:</Title>
      <TimerWrapper>{time}</TimerWrapper>
    </Div>
  );
}

const Div = styled.div`
  font-family: Lato;
  height: 210px;
  width: 40%;
  min-width: 360px;
  font-weight: 300;
  ${mediaQueries.lessThan('medium')`
    width: 100%;
  `}
  ${mediaQueries.lessThan('small')`
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
    min-width: auto;
  `}
`;
const Title = styled.div`
  font-size: 20px;
  color: #ffffff;
  ${mediaQueries.lessThan('small')`
    font-size: 15px;
  `}
`;
const TimerWrapper = styled(Center)`
  font-size: 70px;
  color: #ffffff;
  ${mediaQueries.lessThan('small')`
    font-size: 45px;
  `}
`;
