/**
 *
 * Header
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { Menu } from '../../components/Menu';
import { LoginButton } from '../../components/LoginButton';
import { Icon } from '../../components/Icon';
import { mediaQueries } from '../../../types/constants';
import { Row } from '../../components/blocks';
import { useDispatch } from 'react-redux';
import { usePullContainerSlice } from '../PullContainer/slice';

interface Props {}

export function Header({}: Props) {
  const { actions } = usePullContainerSlice();
  const dispatch = useDispatch();
  return (
    <Div>
      <MenuWrapper>
        <Menu />
      </MenuWrapper>
      <IconWrapper>
        <Icon url={'logo-white.svg'} width={90} height={25} />
      </IconWrapper>
      <DesktopButton>
        <LoginButton />
      </DesktopButton>
      <MobileButton onClick={() => dispatch(actions.showDrawer())}>
        <Icon url={'account-mobile.svg'} width={15} height={15} />
      </MobileButton>
    </Div>
  );
}

const Div = styled(Row)`
  width: 100%;
  height: 80px;
  background-color: #272e38;
  justify-content: space-between;
  align-items: center;
  padding-left: 15px;
  ${mediaQueries.lessThan('small')`
    background-color: #739ba2;
    height: 45px;
    position: fixed;
    padding: 0 10px 0 0;
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

const DesktopButton = styled.div`
  height: 100%;
  ${mediaQueries.lessThan('small')`
    display: none;
    `}
`;
const MobileButton = styled.div`
  ${mediaQueries.greaterThan('small')`
    display: none;
    `}
`;
