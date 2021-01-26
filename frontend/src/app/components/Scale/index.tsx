/**
 *
 * Scale
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';

interface Props {
  fill: number;
}

export function Scale(props: Props) {
  return (
    <Div>
      <ScaleFill {...props} />
    </Div>
  );
}

const Div = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background-color: rgba(256, 256, 256, 0.4);
`;

const ScaleFill = styled.div<Props>`
  width: ${props => props.fill}%;
  height: 100%;
  background-color: white;
  border-radius: 4px 0 0 4px;
`;
