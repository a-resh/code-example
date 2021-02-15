/**
 *
 * Wrapper
 *
 */

import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, wrapperActions } from './slice';
import { Row } from '../../components/blocks';
import { mediaQueries } from '../../../types/constants';
import { useHistory } from 'react-router-dom';
import { wrapperSaga } from './saga';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Wrapper = memo(({ children }: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: wrapperSaga });
  const { setActivePage, init } = wrapperActions;
  const dispatch = useDispatch();
  dispatch(init());
  const history = useHistory();
  history.listen(location => {
    const path =
      location.pathname !== '/'
        ? location.pathname.substr(1).toUpperCase()
        : 'FOX';
    dispatch(setActivePage(path));
  });

  return (
    <>
      <Div>{children}</Div>
    </>
  );
});

const Div = styled(Row)`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 80px);
  background: bottom right no-repeat #121212
    url('assets/images/desktop-content-background.svg');
  ${mediaQueries.lessThan('large')`
    min-height: calc(100vh - 55px);
  `}
  ${mediaQueries.lessThan('small')`
    min-height: 100vh;
    max-width: 100vw;
    background-color: rgb(39,46,56);
  `}
`;
