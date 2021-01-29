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
  justify?: string;
  children?: JSX.Element | JSX.Element[];
  padding?: string;
}

export const Row = styled.div<Props>`
  display: flex;
  flex-direction: row;
  height: ${props => props.height};
  width: ${props => props.width};
  align-items: ${props => props.align};
  justify-content: ${props => props.justify};
  padding: ${props => props.padding};
`;
