/**
*
* Centred
*
*/
import * as React from 'react';
import styled from 'styled-components/macro';

interface Props {
  children: JSX.Element | JSX.Element[]
}

export function Center(props: Props) {

  return (
  <Div>
    {props.children}
  </Div>
  );

};

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
