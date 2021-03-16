/**
 *
 * PullContainer
 *
 */

import * as React from 'react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/macro';

import {useInjectReducer, useInjectSaga} from 'utils/redux-injectors';
import {pullContainerActions, reducer, sliceKey} from './slice';
import {
    allPayoutsSelector,
    drawDataSelector,
    graphicsDataSelector,
    isShowConfirmModalSelector,
    isShowPredictModalSelector,
    loadingSelector,
    pollFillSelector,
} from './selectors';
import {pullContainerSaga} from './saga';
import {Timer} from './components/Timer';
import {PoolInfo} from './components/PoolInfo';
import {Calculator} from './components/Calculator';
import {Reward} from './components/Reward';
import {CtaButton} from '../../components/CtaButton';
import {PredictModal} from './components/PredictModal';
import {mediaQueries, TotemsData} from '../../../types/constants';
import {fromEvent} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {Center, Column, Row} from '../../components/blocks';
import {
    activePageSelector,
    btcLastPriceSelector,
    tokenPriceSelector,
    userSelector,
} from '../Wrapper/selectors';
import {wrapperActions} from '../Wrapper/slice';
import {ConnectMetamaskModal} from '../Content/components/ConnectMetamaskModal';
import {Draw} from '../../../types/interfaces';
import {ConfirmModal} from 'app/components/ConfirmModal';
import {MakePredictData} from './types';

export function PullContainer() {
    const dispatch = useDispatch();
    useInjectReducer({key: sliceKey, reducer: reducer});
    useInjectSaga({key: sliceKey, saga: pullContainerSaga});
    const drawData = useSelector(drawDataSelector) as Draw;
    const totem = useSelector(activePageSelector);
    const poolFill = useSelector(pollFillSelector);
    const user = useSelector(userSelector);
    const isShowPredictModal = useSelector(isShowPredictModalSelector);
    const isShowConfirmModal = useSelector(isShowConfirmModalSelector);
    const graphicsData = useSelector(graphicsDataSelector);
    const btcLastPrice = useSelector(btcLastPriceSelector);
    const allPayouts = useSelector(allPayoutsSelector);
    const tokenPrice = useSelector(tokenPriceSelector);
    const loading = useSelector(loadingSelector);
    const {
        makePredict,
        getData,
        showPredictModal,
        showConfirmModal,
        getGraphicsData,
    } = pullContainerActions;
    const {setUserAddress} = wrapperActions;
    const [confirmMessage, setConfirmMessage] = useState('');
    const [predictValue, setPredictValue] = useState({});
    useEffect(() => {
        dispatch(getData());
    }, []);
    const makePredictFromModal = (bitcoinPrice: number, stakeValue: number) => {
        dispatch(showPredictModal());
        setPredictValue({
            bitcoinPrice,
            stakeValue,
            address: user.publicAddress,
            days: TotemsData[totem].days,
        });
        setConfirmMessage(
            `You want stake ${stakeValue} TOTM. BTC will cost $${bitcoinPrice}`,
        );
        dispatch(showConfirmModal(true));
        // dispatch(
        //   makePredict({ bitcoinPrice, stakeValue, address: user.publicAddress, days: TotemsData[totem].days }),
        // );
    };
    return (
        <>
            <Div>
                <Top>
                    <TimerWrapper>
                        <Timer endTime={+drawData?.endTime}/>
                    </TimerWrapper>
                    <PoolInfo
                        totem={totem}
                        showModal={() =>
                            user.publicAddress
                                ? dispatch(showPredictModal())
                                : dispatch(setUserAddress(true))
                        }
                        poolFill={poolFill}
                        endTime={+drawData?.endTime}
                    />
                </Top>
                <Bottom>
                    <BottomContent>
                        <Calculator
                            showModal={() => dispatch(showPredictModal())}
                            totem={totem}
                            tokenPrice={tokenPrice}
                            btcLastPrice={btcLastPrice}
                        />
                        <Reward totem={totem} allPayouts={allPayouts}/>
                    </BottomContent>
                    <ButtonWrapper>
                        <CtaButton
                            background={TotemsData[totem].color}
                            color={'white'}
                            showModal={() =>
                                user.publicAddress
                                    ? dispatch(showPredictModal())
                                    : dispatch(setUserAddress(true))
                            }
                        />
                    </ButtonWrapper>
                </Bottom>
                <PredictModal
                    endTime={+drawData?.endTime || new Date().getTime()}
                    isOpen={isShowPredictModal}
                    initBet={user.balance}
                    graphicsData={graphicsData}
                    getGraphicsData={() => dispatch(getGraphicsData())}
                    close={() => dispatch(showPredictModal())}
                    totem={totem}
                    makeBet={(bitcoinValue, betValue) =>
                        makePredictFromModal(bitcoinValue, betValue)
                    }
                />
                <ConfirmModal
                    totem={totem}
                    isOpen={isShowConfirmModal}
                    close={() => dispatch(showConfirmModal(false))}
                    message={confirmMessage}
                    confirm={() => dispatch(makePredict(predictValue as MakePredictData))}
                    loading={loading}
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
