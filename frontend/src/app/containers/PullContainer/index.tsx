/**
 *
 * PullContainer
 *
 */

import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { pullContainerActions, reducer, sliceKey } from './slice';
import {
  allPayoutsSelector,
  drawDataSelector,
  graphicsDataSelector,
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
import {
  activePageSelector,
  btcLastPriceSelector,
  tokenPriceSelector,
  userSelector,
} from '../Wrapper/selectors';
import { wrapperActions } from '../Wrapper/slice';
import { ConnectMetamaskModal } from '../Content/components/ConnectMetamaskModal';

export function PullContainer() {
  const dispatch = useDispatch();
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: pullContainerSaga });
  const drawData = useSelector(drawDataSelector);
  const totem = useSelector(activePageSelector);
  const poolFill = useSelector(pollFillSelector);
  const user = useSelector(userSelector);
  const isShowModal = useSelector(isShowModalSelector);
  const graphicsData = useSelector(graphicsDataSelector);
  const btcLastPrice = useSelector(btcLastPriceSelector);
  const allPayouts = useSelector(allPayoutsSelector);
  const tokenPrice = useSelector(tokenPriceSelector);
  const {
    makePredict,
    getData,
    showModal,
    getGraphicsData,
  } = pullContainerActions;
  const { setUserAddress } = wrapperActions;
  useEffect(() => {
    dispatch(getData());
  }, []);
  const makePredictFromModal = (bitcoinPrice: number, stakeValue: number) => {
    dispatch(showModal());
    dispatch(
      makePredict({ bitcoinPrice, stakeValue, user: user.publicAddress }),
    );
  };
  return (
    <>
      <Div>
        <Top>
          <TimerWrapper>
            <Timer endTime={+drawData?.endTime} />
          </TimerWrapper>
          <PoolInfo
            totem={totem}
            showModal={() =>
              user.publicAddress
                ? dispatch(showModal())
                : dispatch(setUserAddress(true))
            }
            poolFill={poolFill}
            endTime={+drawData?.endTime}
          />
        </Top>
        <Bottom>
          <BottomContent>
            <Calculator
              showModal={() => dispatch(showModal())}
              totem={totem}
              tokenPrice={8.8}
              btcLastPrice={btcLastPrice}
            />
            <Reward totem={totem} allPayouts={allPayouts} />
          </BottomContent>
          <ButtonWrapper>
            <CtaButton
              background={TotemsData[totem].color}
              color={'white'}
              showModal={() =>
                user.publicAddress
                  ? dispatch(showModal())
                  : dispatch(setUserAddress(true))
              }
            />
          </ButtonWrapper>
        </Bottom>
        <PredictModal
          endTime={+drawData?.endTime || new Date().getTime()}
          isOpen={isShowModal}
          initBet={user.balance}
          graphicsData={graphicsData}
          getGraphicsData={() => dispatch(getGraphicsData())}
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
  width: 100%;
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
  width: 100%;
  max-width: 820px;
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
