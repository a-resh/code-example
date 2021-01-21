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
    00:19:54
  </Div>
  );

};

const Div = styled.div`
  font-family: Lato;
  font-size : 90px;
  color : #FFFFFF;
  height: 200px;
`;
const Title = styled.div`
  font-size : 20px;
  color : #FFFFFF;
`
