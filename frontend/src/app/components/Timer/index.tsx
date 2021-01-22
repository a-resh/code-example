/**
*
* Timer
*
*/
import * as React from 'react';
import styled from 'styled-components/macro';
import {useTranslation} from "react-i18next";
import { messages } from './messages';

interface Props {}

export function Timer(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  return (
  <Div>
    <Title>
      {  t(...messages.nextPoolDeparts)  }:
    </Title>
    <TimerWrapper>
    00:19:54
    </TimerWrapper>
  </Div>
  );

};

const Div = styled.div`
  font-family: Lato;
  height: 210px;
  width: 380px;
`;
const Title = styled.div`
  font-size : 20px;
  color : #FFFFFF;
`
const TimerWrapper = styled.div`
  
  font-size : 90px;
  color : #FFFFFF;
  display: flex;
  align-items: center;
`
