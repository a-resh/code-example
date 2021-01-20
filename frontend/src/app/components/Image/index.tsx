/**
*
* Image
*
*/
import * as React from 'react';
import styled from 'styled-components/macro';

interface Props {
  url: string;
  width: number
  height: number;
}

export function Image(props: Props) {

  return (
  <Div {...props} >
  </Div>
  );

}

const Div = styled.div<Props>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-image: url(${ props => props.url});
  background-repeat: no-repeat;
`;
