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

interface Props {
    isMobile: boolean;
}

export function Header({isMobile}: Props) {
    return (
        <Div isMobile={isMobile}>
            {isMobile ? <Menu isMobile={isMobile}/>
                : <Icon url={'/logo-white.svg'}
                        width={90}
                        height={25}/>}
            <LoginButton isMobile={isMobile}/>
        </Div>
    );
}

const Div = styled.div<Props>`
  width: 100%;
  height: ${ props => props.isMobile? '100%' : '80px'};
  background-color: ${ props => props.isMobile? '#739BA2' : '#272E38'};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
