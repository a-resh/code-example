/**
 *
 * Header
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { Menu } from '../Menu';
import { LoginButton } from './LoginButton';
import { Icon } from '../Icon';
import media from 'styled-media-query';
import { mediaQueries } from '../../../types/constants';

interface Props {}

export function Header({}: Props) {
  return (
    <Div>
      <MenuWrapper>
        <Menu />
      </MenuWrapper>
      <IconWrapper>
        <Icon url={'/logo-white.svg'} width={90} height={25} margin={'15px'} />
      </IconWrapper>
      <LoginButton />
    </Div>
  );
}

const Div = styled.div`
  width: 100%;
  height: 80px;
  background-color: #272e38;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${mediaQueries.lessThan('small')`
    background-color: #739ba2;
    height: 45px;
    position: fixed;
  `}
  ${mediaQueries.between('small', 'large')` 
    padding-left: calc(50% - 45px);
    height: 55px;
  `}
`;
const MenuWrapper = styled.div`
  height: 100%;
  ${mediaQueries.greaterThan('small')`
    display: none;
    `}
`;
const IconWrapper = styled.div`
  ${mediaQueries.lessThan('small')`
    display: none;
    `}
`;
