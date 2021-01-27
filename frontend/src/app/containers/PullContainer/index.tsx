/**
 *
 * PullContainer
 *
 */

import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { selectPullContainer } from './selectors';
import { pullContainerSaga } from './saga';
import { Timer } from '../../components/Timer';
import { PoolInfo } from './PoolInfo';
import { Calculator } from './Calculator';
import { Reward } from './Reward';
import { CtaButton } from '../../components/CtaButton';
import { PredictModal } from './PredictModal';
import { useState } from 'react';
import { Totems } from '../../../types/enums';

interface Props {}

export function PullContainer(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: pullContainerSaga });
  const totem = Totems.FOX;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const switchIsOpenModal = () => {
    setIsOpen(!modalIsOpen);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const pullContainer = useSelector(selectPullContainer);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();
  return (
<>
      <Div>
          <Top>
            <Timer />
            <PoolInfo />
          </Top>
          <Bottom>
            <BottomContent>
              <Calculator />
              <Reward />
            </BottomContent>
            <ButtonWrapper>
              <CtaButton
                background={'#FF6701'}
                color={'white'}
                showModal={switchIsOpenModal}
              />
            </ButtonWrapper>
          </Bottom>
          <PredictModal
            isOpen={modalIsOpen}
            close={switchIsOpenModal}
            totem={totem}
          />
      </Div>
</>
  );
}

const Div = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  @media only screen and (max-width: 900px){
    flex-direction: column;
  }
`;
const BottomContent = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px 20px 30px 20px;
  background-color: rgba(39, 46, 56, 0.4);
  @media only screen and (max-width: 900px){
    flex-direction: column;
    height: 100%;
    align-items: center;
    padding: 10px;
  }
`;

const Bottom = styled.div`
  margin-top: 20px;
  height: 420px;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 900px){
    align-items: center;
    padding: 0;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 55px;
  @media only screen and (max-width: 900px){
    display: none;
  }
`;
