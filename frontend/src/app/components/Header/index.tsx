/**
 *
 * Header
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import {Menu} from '../Menu';
import {LoginButton} from './LoginButton';
import {Icon} from '../Icon'

interface Props {}

export function Header({}: Props) {
    return (
        <Div>
            <MenuWrapper>
                <Menu isMobile={true}/>
            </MenuWrapper>
            <IconWrapper>
                <Icon url={'/logo-white.svg'}
                      width={90}
                      height={25}
                      margin={'15px'}
                />
            </IconWrapper>
            <LoginButton/>
        </Div>
    );
}

const Div = styled.div`
  width: 100%;
  height: 80px;
  background-color: #272E38;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media only screen and (max-width: 600px) {
    background-color: #739BA2;
    height: 30px;
  }
`;
const MenuWrapper = styled.div`
  @media only screen and (min-width: 600px) {
    display: none;
  }
`;
const IconWrapper = styled.div`
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;
