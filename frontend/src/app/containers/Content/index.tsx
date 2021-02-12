/**
 *
 * Content
 *
 */

import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { contentActions, reducer, sliceKey } from './slice';
import { contentSaga } from './saga';
import { Center } from '../../components/blocks';
import { mediaQueries } from '../../../types/constants';
import { useHistory } from 'react-router-dom';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Content = memo(({ children }: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: contentSaga });
  const { init, setActivePage } = contentActions;
  const dispatch = useDispatch();
  const history = useHistory();
  const path =
    history.location.pathname !== '/'
      ? history.location.pathname.substr(1).toUpperCase()
      : 'FOX';
  dispatch(setActivePage(path));
  dispatch(init());

  return (
    <>
      <Div>{children}</Div>
    </>
  );
});

const Div = styled(Center)`
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
