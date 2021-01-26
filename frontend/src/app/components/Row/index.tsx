/**
 *
 * Row
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';

interface Props {
  height?: string;
  width?: string;
  align?: string;
  children?: JSX.Element | JSX.Element[];
  padding?: string;
}

export function Row(props: Props) {
  return <Div {...props}>{props.children}</Div>;
}

const Div = styled.div<Props>`
  display: flex;
  flex-direction: row;
  height: ${props => props.height};
  width: ${props => props.width};
  align-items: ${props => props.align};
  padding: ${props => props.padding};
`;
