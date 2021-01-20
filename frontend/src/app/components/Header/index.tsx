/**
 *
 * Header
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import {Menu} from '../Menu';
import {LoginButton} from './LoginButton';
import {Image} from '../Image'

interface Props {
    isMobile: boolean;
}

export function Header({isMobile}: Props) {
    return (
        <Div>
            {isMobile ? <Menu isMobile={isMobile}/>
                : <Image url={'/assets/images/logo-white.svg'}
                         width={90}
                         height={25}/>}
            <LoginButton isMobile={isMobile}/>
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
  padding-left: 10px;
`;
