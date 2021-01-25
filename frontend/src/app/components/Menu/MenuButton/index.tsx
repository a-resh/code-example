/**
 *
 * MenuButton
 *
 */
import React, {memo} from 'react';
import styled from 'styled-components/macro';
import {Icon} from '../../Icon'
import {TotemsData} from "../../../../types/enums";

interface Props {
    name: string;
}

export const MenuButton = memo((props: Props) => {
    console.log(props, props.name === 'UNISWAP')
    return (
        <Div {...props}>
            <Icon url={TotemsData[props.name].icon} width={30} height={30} margin={`0 20px 0 15px`}/>
            <Title>
                {TotemsData[props.name].name}
            </Title>
            <TabletTitle>
                {TotemsData[props.name].message}
            </TabletTitle>
        </Div>
    );
});

const Div = styled.div<Props>`
  height: 80px;
  width: 100%;
  color: ${props => props.name === 'UNISWAP' ? '#272E38' : 'white'};
  display: flex;
  justify-content: left;
  align-items: center;
  cursor: pointer;
  background-color: ${props => props.name === 'UNISWAP' ? TotemsData[props.name].color : ''};

  :hover {
    background-color: ${props => props.name === 'UNISWAP' ? '#739BA2' : '#121212'};
    border-right: solid #FF6700 6px
  }

  @media only screen and (max-width: 600px) {
    background-color: ${props => TotemsData[props.name].color};
    height: 100%;
    width: 50px;
  }
  @media only screen and (max-width: 1100px) {
    flex-direction: column;
    background-color: ${props => TotemsData[props.name].color};
    font-size: 12px;
  }
`;
const Title = styled.div`
  @media only screen and (min-width: 1100px) {
    display: none;
  }
`;
const TabletTitle = styled.div`
  @media only screen and (min-width: 600px) {
    display: none;
  }
`;
