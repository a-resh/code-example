/**
 *
 * MenuButton
 *
 */
import React, {memo} from 'react';
import styled from 'styled-components/macro';
import {Icon} from '../../Icon'

interface Props {
    name?: string;
    icon: string;
    color: string;
    isMobile: boolean;
}

export const MenuButton = memo((props: Props) => {
    return (
        <Div {...props}>
            <Icon url={props.icon} width={30} height={30} margin={`0 20px 0 15px`}/>
            {props.isMobile ? null : props.name}
        </Div>
    );
});

const Div = styled.div<Props>`
  height: ${props => props.isMobile ? '100%' : '80px'};
  width: ${props => props.isMobile ? '50px' : '100%'};
  color: ${props => props.name === 'Uniswap' ? '#272E38' : 'white'};
  display: flex;
  justify-content: left;
  align-items: center;
  cursor: pointer;
  background-color: ${props => props.isMobile ? props.color : props.name === 'Uniswap' ? props.color : ''};

  :hover {
    background-color: ${props => props.isMobile ? props.color : props.name === 'Uniswap' ? '#739BA2' : '#121212'};
    border-right: ${props => props.isMobile ? null : 'solid #FF6700 6px'}
  }
`;
