/**
 *
 * Content
 *
 */

import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { contentActions, reducer, sliceKey } from './slice';
import { Center } from '../../components/blocks';
import { mediaQueries, TotemsData } from '../../../types/constants';
import { ConnectButton } from '../../components/ConnectButton';
import { activePageSelector, userSelector } from '../Wrapper/selectors';
import { wrapperActions } from '../Wrapper/slice';
import { contentSaga } from './saga';
import { ConnectMetamaskModal } from './components/ConnectMetamaskModal';
import {showConMetamaskModalSelector, showErrorModalSelector} from './selectors';
import {ErrorModal} from "./components/ErrorModal";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Content = memo(({ children }: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: contentSaga });
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  let totem = useSelector(activePageSelector);
  if (!TotemsData[totem]) {
    totem = 'FOX';
  }
  const isShowConnectMetamaskModal = useSelector(showConMetamaskModalSelector);
  const isShowErrorModal = useSelector(showErrorModalSelector);
  const { setUserAddress } = wrapperActions;
  const { showConnectMetamaskModal, error } = contentActions;

  return (
    <>
      <Div>
        {children}
        <LoginButtonWrapper isShow={!user.publicAddress}>
          <ConnectButton
            address={user.publicAddress}
            onConnectWallet={() => dispatch(setUserAddress(false))}
          />
        </LoginButtonWrapper>
        <ConnectMetamaskModal
          isOpen={isShowConnectMetamaskModal}
          close={() => dispatch(showConnectMetamaskModal())}
          totem={totem}
        />
        <ErrorModal
            isOpen={isShowErrorModal}
            close={() => dispatch(error(false))}
            totem={totem}
        />
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
