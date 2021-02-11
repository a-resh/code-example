/**
 *
 * PullContainer
 *
 */

import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { pullContainerActions, reducer, sliceKey } from './slice';
import {
  drawDataSelector,
  isShowDrawerSelector,
  pollFillSelector,
  totemSelector,
} from './selectors';
import { pullContainerSaga } from './saga';
import { Timer } from './components/Timer';
import { PoolInfo } from './components/PoolInfo';
import { Calculator } from './components/Calculator';
import { Reward } from './components/Reward';
import { CtaButton } from '../../components/CtaButton';
import { PredictModal } from './components/PredictModal';
import { mediaQueries, TotemsData } from '../../../types/constants';
import { fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LoginButton } from '../../components/LoginButton';
import { Center, Column, Row } from '../../components/blocks';
import CustomDrawer from '../../components/Drawer';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function PullContainer() {
  const dispatch = useDispatch();
  const history = useHistory();
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: pullContainerSaga });
  const isShowDrawer = useSelector(isShowDrawerSelector);
  const drawData = useSelector(drawDataSelector);
  const totem = useSelector(totemSelector);
  const poolFill = useSelector(pollFillSelector);
  const { showDrawer, makePredict, getData, setTotem } = pullContainerActions;
  const [modalIsOpen, setIsOpen] = useState(false);
  const path =
    history.location.pathname !== '/'
      ? history.location.pathname.substr(1).toUpperCase()
      : 'FOX';
  dispatch(setTotem(path));
  useEffect(() => {
    dispatch(getData());
  }, []);
  const checkIsMobile = value => value < 450;
  let isMobile = checkIsMobile(window.innerWidth);
  fromEvent(window, 'resize')
    .pipe(
      map((e: any) => e.currentTarget.innerWidth),
      filter(width => isMobile !== checkIsMobile(width)),
    )
    .subscribe(data => (isMobile = checkIsMobile(data)));

  const switchIsOpenModal = () => setIsOpen(!modalIsOpen);
  const makePredictFromModal = (bitcoinPrice: number, stakeValue: number) => {
    switchIsOpenModal();
    dispatch(makePredict({ bitcoinPrice, stakeValue, user: 1 }));
  };
  return (
    <>
      <Div>
        <Top>
          <TimerWrapper>
            <Timer endTime={drawData?.endTime || new Date().getTime()} />
          </TimerWrapper>
          <PoolInfo
            totem={totem}
            showModal={switchIsOpenModal}
            poolFill={poolFill}
          />
        </Top>
        <Bottom>
          <BottomContent>
            <Calculator
              showModal={switchIsOpenModal}
              totem={totem}
              currency={15000}
            />
            <Reward totem={totem} />
          </BottomContent>
          <ButtonWrapper>
            <CtaButton
              background={TotemsData[totem].color}
              color={'white'}
              showModal={switchIsOpenModal}
            />
          </ButtonWrapper>
        </Bottom>
        <PredictModal
          isMobile={isMobile}
          isOpen={modalIsOpen}
          close={switchIsOpenModal}
          totem={totem}
          makeBet={makePredictFromModal}
        />
        <LoginButtonWrapper>
          <LoginButton />
        </LoginButtonWrapper>
        <CustomDrawer
          isShow={isShowDrawer}
          setIsShow={() => dispatch(showDrawer())}
        />
      </Div>
    </>
  );
}

const Div = styled(Center)`
  height: 100%;
  width: 100%;
  flex-direction: column;
`;

const Top = styled(Row)`
  width: 100%;
  justify-content: center;
  min-width: 720px;
  ${mediaQueries.lessThan('medium')`
    min-width: auto;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `}
`;
const TimerWrapper = styled.div`
  ${mediaQueries.lessThan('small')`
    display: none;
  `}
`;
const BottomContent = styled(Row)`
  padding: 5px 20px 30px 20px;
  background-color: rgba(39, 46, 56, 0.4);
  ${mediaQueries.lessThan('medium')`
    flex-direction: column;
    height: 100%;
    align-items: center;
    padding: 10px 20px;
  `}
  ${mediaQueries.lessThan('small')`
    width: 100%;
    flex-direction: column-reverse;
  `}
`;

const Bottom = styled(Column)`
  margin-top: 20px;
  align-items: center;
  ${mediaQueries.lessThan('medium')`
    align-items: center;
    padding: 0;
  `}
  ${mediaQueries.lessThan('medium')`
    width: 100%;
  `}
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 55px;
  ${mediaQueries.lessThan('medium')`
    display: none;
  `}
`;

const LoginButtonWrapper = styled.div`
  ${mediaQueries.greaterThan('small')`
    display: none;
  `}
`;
