/**
 *
 * Content
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { mediaQueries } from '../../../types/constants';
import { Center } from '../blocks';

export const Content = styled(Center)`
  width: calc(100vw - 200px);
  align-items: center;
  padding: 20px 0;
  ${mediaQueries.greaterThan('large')`
    width: calc(100% - 200px);
  `}
  ${mediaQueries.lessThan('large')`
    width: calc(100% - 55px);
  `}
  ${mediaQueries.lessThan('small')`
    width: 100%;
    padding: 45px 0 0 0;
    background-color: rgba(39,46,56, .4);
  `}
`;
