/**
*
* Sidebar
*
*/
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import {Menu} from "../Menu";
import {Icon} from "../Icon";

interface Props {}

export const Sidebar = memo(({}: Props) => {

  return (
  <Div>
    <Menu isMobile={false}/>
    <SidebarBottom>
      <Icon url={'telegram-dark.svg'} width={30} height={30} margin={'0 0 15px 15px'} cursor={'pointer'}/>
      <Icon url={'twitter-dark.svg'} width={30} height={30} margin={'0 0 0 15px'} cursor={'pointer'}/>
    </SidebarBottom>
  </Div>
  );

});

const Div = styled.div`
  width: 200px;
  height: calc(100vh - 80px);
  background-color: #272E38;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;
const SidebarBottom = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
  padding-top: 100%;
  background-color: #C4DBE0;
`
