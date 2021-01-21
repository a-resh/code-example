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

interface Props {}

export function LoginButton({}: Props) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {t, i18n} = useTranslation();

    return (
        <Div>
            <MobileIcon>
                <Icon
                    url={'login-mobile.svg'}
                    width={15}
                    height={15}
                    margin={'7px'}
                />
            </MobileIcon>
            <DesktopButton>
            {t(...messages.connectWallet)}
            <Icon url={'wallet-white.svg'}
                  width={25}
                  height={25}
                  margin={'0 0 0 20px'}/>
            </DesktopButton>
        </Div>
    );
}

const Div = styled.div`
  height: 100%;
  width: 210px;
  line-height: 2em;
  font-weight: bold;
  font-size: 15px;
  color: #272E38;
  background-color: #C4DBE0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media only screen and (max-width: 600px) {
    width: 30px;
    background-color: #739BA2;
}
  :hover {
    background-color: #739BA2;
  }
`;

const MobileIcon = styled.div`
  @media only screen and (min-width: 600px) {
    display: none;
  }
`
const DesktopButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 600px) {
    display: none;
  }
`
