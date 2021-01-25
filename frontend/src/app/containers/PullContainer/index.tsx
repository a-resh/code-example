/**
 *
 * PullContainer
 *
 */

import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components/macro';

import {useInjectReducer, useInjectSaga} from 'utils/redux-injectors';
import {reducer, sliceKey} from './slice';
import {selectPullContainer} from './selectors';
import {pullContainerSaga} from './saga';
import {Timer} from "../../components/Timer";
import {PoolInfo} from "../../components/PoolInfo";
import {Calculator} from "../../components/Calculator";
import {Reward} from "../../components/Reward";
import {CtaButton} from "../../components/CtaButton";
import {PredictModal} from "../../components/PredictModal";
import {useState} from "react";
import {Totems} from "../../../types/enums";

interface Props {
}


export function PullContainer(props: Props) {
    useInjectReducer({key: sliceKey, reducer: reducer});
    useInjectSaga({key: sliceKey, saga: pullContainerSaga});
    const totem = Totems.FOX
    const [modalIsOpen,setIsOpen] = React.useState(false);
    const switchIsOpenModal = () => {
        setIsOpen(!modalIsOpen);
    }


// eslint-disable-next-line @typescript-eslint/no-unused-vars
    const pullContainer = useSelector(selectPullContainer);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dispatch = useDispatch();
    return (
        <>
            <Div>
                <ContentWrapper>
                    <Top>
                        <Timer/>
                        <PoolInfo/>
                    </Top>
                    <BottomContent>
                        <Bottom>
                            <Calculator/>
                            <Reward/>
                        </Bottom>
                        <ButtonWrapper>
                            <CtaButton background={'#FF6701'} color={'white'} showModal={switchIsOpenModal}/>
                        </ButtonWrapper>
                    </BottomContent>
                    <PredictModal isOpen={modalIsOpen} close={switchIsOpenModal} totem={totem}/>
                </ContentWrapper>
            </Div>
        </>
    );

};

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  width: 880px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
`

const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  height: 340px;
  width: 100%;
  padding: 5px 20px 30px 20px;
  background-color: rgba(39, 46, 56, .4);
`

const BottomContent = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 420px;
  display: flex;
  flex-direction: column;
  padding: 10px 30px 30px 0px;
`

const ButtonWrapper = styled.div`
  width: 100%;
  height: 55px;
`
