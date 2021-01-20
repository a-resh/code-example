/**
 *
 * LoginButton
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import {Icon} from "../../Icon";

interface Props {
  isMobile: boolean;
}

export function LoginButton({ isMobile }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
    <Div>
      {t('')}
      {isMobile ? null : t(...messages.connectWallet)}
      <Icon url={isMobile? '' : 'wallet-white.svg'} width={25} height={25} margin={'0 0 0 20px'}/>
    </Div>
  );
}

const Div = styled.div`
  height: 100%;
  width: 210px;
  line-height: 2em;
  font-weight : bold;
  font-size : 15px;
  color : #272E38;
  background-color: #C4DBE0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  :hover{
    background-color: #739BA2;
  }
`;
