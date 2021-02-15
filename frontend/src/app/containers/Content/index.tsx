/**
 *
 * Content
 *
 */

import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { Center } from '../../components/blocks';
import { mediaQueries } from '../../../types/constants';
import { ConnectButton } from '../../components/ConnectButton';
import { userSelector } from '../Wrapper/selectors';
import { wrapperActions } from '../Wrapper/slice';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Content = memo(({ children }: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const { setUserAddress } = wrapperActions;

  return (
    <>
      <Div>
        {children}
        <LoginButtonWrapper isShow={!user.id}>
          <ConnectButton
            address={user.id}
            onConnectWallet={() => dispatch(setUserAddress(false))}
          />
        </LoginButtonWrapper>
      </Div>
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
const LoginButtonWrapper = styled.div<{ isShow: boolean }>`
  display: ${props => (props.isShow ? 'block' : 'none')};
  ${mediaQueries.greaterThan('small')`
    display: none;
  `}
`;
