/**
*
* ContentWrapper
*
*/
import React, { memo } from 'react';
import styled from 'styled-components/macro';

interface Props {children: React.ReactNode[]}

export const Wrapper = memo(({children}: Props) => {

  return (
  <Div>
    {children}
  </Div>
  );

});

const Div = styled.div`
  display: flex;
  flex-direction: row;
  background: bottom no-repeat #121212 url('assets/images/desktop-content-background.svg');
`;
