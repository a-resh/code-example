/**
 *
 * MenuButton
 *
 */
import React, {memo} from 'react';
import styled from 'styled-components/macro';
import {Icon} from '../../Icon'
import {TotemsData} from "../../../../types/enums";
import {Center} from "../../Center";
import {useHistory} from 'react-router-dom';

interface Props {
    name: string;
    isActive?: boolean;
    setActive: (name: string) => void;
}


export const MenuButton = memo((props: Props) => {
    const history = useHistory();
    const redirect = (url) => {
        props.setActive(url)
        history.push(`/${url}`)
    }
    return (
        <Div onClick={() => redirect(props.name.toLowerCase())} {...props}>
            <Icon url={TotemsData[props.name].icon} width={30} height={30}/>
            <Title>
                {TotemsData[props.name].name}
            </Title>
            <TabletTitle>
                <Center>
                    <p>{TotemsData[props.name].message}</p>
                </Center>
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
  padding: 15px;
  background-color: ${props => props.isActive && props.name !== 'UNISWAP'
          ? '#121212'
          : props.isActive && props.name === 'UNISWAP'
                  ? '#739BA2'
                  : props.name === 'UNISWAP'
                          ? TotemsData[props.name].color
                          : null};
  border-right: ${props => props.isActive ? 'solid #FF6700 6px' : null};

  :hover {
    background-color: ${props => props.name === 'UNISWAP' ? '#739BA2' : '#121212'};
    border-right: solid #FF6700 6px;
  }

  @media only screen and (max-width: 600px) {
    background-color: ${props => TotemsData[props.name].color};
    justify-content: center;
    height: 100%;
    width: 50px;
  }
  @media only screen and (max-width: 1100px) {
    flex-direction: column;
    justify-content: center;
    background-color: ${props => TotemsData[props.name].color};
    p {
      font-size: 12px;
      font-weight: bold;
    }
  }
`;
const Title = styled.div`
  padding-left: 20px;
  @media only screen and (max-width: 1100px) {
    display: none;
  }
`;
const TabletTitle = styled.div`
  @media only screen and (min-width: 1100px) {
    display: none;
  }
`;
