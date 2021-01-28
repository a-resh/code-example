/**
 *
 * Image
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import media from 'styled-media-query';
import { mediaQueries } from '../../../types/constants';

interface Props {
  url: string;
  width: number;
  height: number;
  margin?: string;
  cursor?: string;
  onClick?: () => void;
}

export function Icon(props: Props) {
  return <Div onClick={props.onClick} {...props}></Div>;
}

const Div = styled.div<Props>`
  margin: ${props => props.margin || null};
  cursor: ${props => props.cursor || null};
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background: center no-repeat url('assets/images/${props => props.url}');
  ${mediaQueries.lessThan('small')`
    width: 20px;
    height: 20px;
    margin: 0;
  `}
`;
