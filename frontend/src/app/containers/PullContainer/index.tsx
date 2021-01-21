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

interface Props {
}


export function PullContainer(props: Props) {
    useInjectReducer({key: sliceKey, reducer: reducer});
    useInjectSaga({key: sliceKey, saga: pullContainerSaga});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
    const pullContainer = useSelector(selectPullContainer);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dispatch = useDispatch();

    return (
        <>
            <Div>
                <ContentWrapper>
                    <Timer/>
                    <PoolInfo/>
                    <Calculator/>
                    <Reward/>
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
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`
