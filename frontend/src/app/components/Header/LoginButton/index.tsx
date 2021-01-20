/**
 *
 * LoginButton
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import {useTranslation} from 'react-i18next';
import {messages} from './messages';
import {Icon} from "../../Icon";

interface Props {
    isMobile: boolean;
}

export function LoginButton({isMobile}: Props) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {t, i18n} = useTranslation();

    return (
        <Div isMobile={isMobile}>
            {t('')}
            {isMobile ? null : t(...messages.connectWallet)}
            <Icon url={isMobile ? 'login-mobile.svg' : 'wallet-white.svg'}
                  width={isMobile ? 15: 25}
                  height={isMobile ? 15: 25}
                  margin={isMobile ? '7px' : '0 0 0 20px'}/>
        </Div>
    );
}

const Div = styled.div<Props>`
  height: 100%;
  width: ${props => props.isMobile ? '30px' : '210px'};
  line-height: 2em;
  font-weight: bold;
  font-size: 15px;
  color: #272E38;
  background-color: ${props => props.isMobile ? null : '#C4DBE0'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: ${props => props.isMobile? 'fixed': null}

  :hover {
    background-color: #739BA2;
  }
`;
