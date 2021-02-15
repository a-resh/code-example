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
  isShowModalSelector,
  pollFillSelector,
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
import { Center, Column, Row } from '../../components/blocks';
import { useEffect, useState } from 'react';
import { activePageSelector, userSelector } from '../Wrapper/selectors';
import { wrapperActions } from '../Wrapper/slice';

export function PullContainer() {
  const dispatch = useDispatch();
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: pullContainerSaga });
  const drawData = useSelector(drawDataSelector);
  const totem = useSelector(activePageSelector);
  const poolFill = useSelector(pollFillSelector);
  const user = useSelector(userSelector);
  const isShowModal = useSelector(isShowModalSelector);
  const { makePredict, getData, showModal } = pullContainerActions;
  const { setUserAddress } = wrapperActions;
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
  const makePredictFromModal = (bitcoinPrice: number, stakeValue: number) => {
    dispatch(showModal());
    dispatch(makePredict({ bitcoinPrice, stakeValue, user: 1 }));
  };
  return (
    <>
      <Div>
        <Top>
          <TimerWrapper>
            <Timer endTime={drawData?.endTime} />
          </TimerWrapper>
          <PoolInfo
            totem={totem}
            showModal={() =>
              user.id ? dispatch(showModal()) : dispatch(setUserAddress(true))
            }
            poolFill={poolFill}
            endTime={drawData?.endTime}
          />
        </Top>
        <Bottom>
          <BottomContent>
            <Calculator
              showModal={() => dispatch(showModal())}
              totem={totem}
              currency={15000}
            />
            <Reward totem={totem} />
          </BottomContent>
          <ButtonWrapper>
            <CtaButton
              background={TotemsData[totem].color}
              color={'white'}
              showModal={() =>
                user.id ? dispatch(showModal()) : dispatch(setUserAddress(true))
              }
            />
          </ButtonWrapper>
        </Bottom>
        <PredictModal
          isMobile={isMobile}
          isOpen={isShowModal}
          close={() => dispatch(showModal())}
          totem={totem}
          makeBet={makePredictFromModal}
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
