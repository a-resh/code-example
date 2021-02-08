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
import { selectPullContainer } from './selectors';
import { pullContainerSaga } from './saga';
import { Timer } from './Timer';
import { PoolInfo } from './PoolInfo';
import { Calculator } from './Calculator';
import { Reward } from './Reward';
import { CtaButton } from '../../components/CtaButton';
import { PredictModal } from './PredictModal';
import { mediaQueries, TotemsData } from '../../../types/constants';
import { fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LoginButton } from '../../components/LoginButton';
import { Center, Column, Row } from '../../components/blocks';
import CustomDrawer from '../../components/Drawer';
import { useHistory } from 'react-router-dom';
import { Totems } from '../../../types/enums';

export function PullContainer() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: pullContainerSaga });
  const isShowDrawer = useSelector(selectPullContainer);
  const { showDrawer } = pullContainerActions;
  const history = useHistory();
  const totem =
    history.location.pathname !== '/'
      ? history.location.pathname.substr(1).toUpperCase()
      : 'FOX';
  console.log(history.location);
  const checkIsMobile = value => value < 450;
  let isMobile = checkIsMobile(window.innerWidth);
  fromEvent(window, 'resize')
    .pipe(
      map((e: any) => e.currentTarget.innerWidth),
      filter(width => isMobile !== checkIsMobile(width)),
    )
    .subscribe(data => (isMobile = checkIsMobile(data)));
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const switchIsOpenModal = () => {
    setIsOpen(!modalIsOpen);
  };
  const dispatch = useDispatch();
  return (
    <>
      <Div>
        <Top>
          <TimerWrapper>
            <Timer />
          </TimerWrapper>
          <PoolInfo totem={totem} showModal={switchIsOpenModal} />
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
