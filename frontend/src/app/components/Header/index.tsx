/**
 *
 * Header
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { Menu } from '../Menu';
import { LoginButton } from './LoginButton';

interface Props {
  isMobile: boolean;
}

export function Header({ isMobile }: Props) {
  return (
    <Div>
      {isMobile ? <Menu isMobile={isMobile}/> : <Logo />}
      <LoginButton isMobile={isMobile} />
    </Div>
  );
}

const Div = styled.div`
  width: 100%;
  height: 80px;
  background-color: #739ba2;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Logo = styled.div``;
