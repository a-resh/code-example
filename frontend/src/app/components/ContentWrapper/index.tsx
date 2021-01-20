/**
*
* ContentWrapper
*
*/
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import {Sidebar} from "../Sidebar";
import {Content} from "../Content";

interface Props {isMobile: boolean}

export const ContentWrapper = memo(({isMobile}: Props) => {

  return (
  <Div>
    {isMobile? null: <Sidebar/>}
    <Content/>
  </Div>
  );

});

const Div = styled.div`
  background: bottom no-repeat #121212 url('assets/images/desktop-content-background.svg');
`;
