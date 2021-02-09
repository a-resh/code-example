/**
 *
 * Timer
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { mediaQueries } from '../../../../types/constants';
import { Center } from '../../../components/blocks';

interface Props {}

export function Timer({}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  return (
    <Div>
      <Title>{t(...messages.nextPoolDeparts)}:</Title>
      <TimerWrapper>00:19:54</TimerWrapper>
    </Div>
  );
}

const Div = styled.div`
  font-family: "Lato Light";
  height: 210px;
  width: 40%;
  min-width: 360px;
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
  font-size: 90px;
  color: #ffffff;
  ${mediaQueries.lessThan('small')`
    font-size: 45px;
  `}
`;
