/**
 *
 * MenuButton
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { Icon } from '../../Icon';
import { useHistory } from 'react-router-dom';
import { mediaQueries, TotemsData } from '../../../../types/constants';

interface Props {
  name: string;
  isActive?: boolean;
  isMobile?: boolean;
}

export const MenuButton = memo((props: Props) => {
  const history = useHistory();
  const redirect = url => history.push(`/${url}`);
  return (
    <Div onClick={() => redirect(props.name.toLowerCase())} {...props}>
      <Icon
        url={
          props.isMobile && TotemsData[props.name].iconMobile
            ? TotemsData[props.name].iconMobile
            : TotemsData[props.name].icon
        }
        width={30}
        height={30}
      />
      <Title>{TotemsData[props.name].name}</Title>
      <TabletTitle>{TotemsData[props.name].message}</TabletTitle>
    </Div>
  );
});

const Div = styled.div<Props>`
  height: 80px;
  width: 100%;
  color: ${props => (props.name === 'UNISWAP' ? '#272E38' : 'white')};
  display: flex;
  justify-content: left;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  background-color: ${props =>
    props.isActive && props.name !== 'UNISWAP'
      ? '#121212'
      : props.isActive && props.name === 'UNISWAP'
      ? '#739BA2'
      : props.name === 'UNISWAP'
      ? TotemsData[props.name].color
      : null};
  border-right: ${props => (props.isActive ? 'solid #FF6700 6px' : null)};

  :hover {
    background-color: ${props =>
      props.name === 'UNISWAP' ? '#739BA2' : '#121212'};
    border-right: solid #ff6700 6px;
  }

  div {
    font-weight: bold;
  }

  @media only screen and (max-width: 450px) {
    background-color: ${props => TotemsData[props.name].color};
    justify-content: center;
    height: 100%;
    width: 45px;
    padding: 0;
    :hover {
      background-color: ${props => TotemsData[props.name].color};
    }
  }
  @media only screen and (max-width: 1100px) {
    flex-direction: column;
    justify-content: center;
    background-color: ${props => TotemsData[props.name].color};
    padding: 0;
    p {
      font-size: 12px;
      font-weight: bold;
    }

    border-right: none;
    :hover {
      border-right: none;
    }
  }
`;
const Title = styled.div`
  padding-left: 20px;
  ${mediaQueries.lessThan('large')`
    display: none;
  `}
`;
const TabletTitle = styled.div`
  display: none;
  font-size: 12px;
  ${mediaQueries.between('small', 'large')`
    display: block;
  `}
`;
