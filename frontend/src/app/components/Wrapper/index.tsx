/**
 *
 * ContentWrapper
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import media from 'styled-media-query';
import { mediaQueries } from '../../../types/constants';

interface Props {
  children: React.ReactNode[];
}

export const Wrapper = memo(({ children }: Props) => {
  return <Div>{children}</Div>;
});

const Div = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 80px);
  //overflow: auto;
  background: bottom right no-repeat #121212
    url('assets/images/desktop-content-background.svg');
  ${mediaQueries.lessThan('large')`
    min-height: calc(100vh - 55px);
  `}
  ${mediaQueries.lessThan('small')`
    min-height: 100%;
    background-color: rgb(39,46,56);
  `}
`;
