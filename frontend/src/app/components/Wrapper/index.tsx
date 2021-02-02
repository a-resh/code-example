/**
 *
 * ContentWrapper
 *
 */
import styled from 'styled-components/macro';
import { mediaQueries } from '../../../types/constants';
import { Row } from '../blocks';

export const Wrapper = styled(Row)`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 80px);
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
