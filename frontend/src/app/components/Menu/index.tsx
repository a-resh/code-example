/**
 *
 * Menu
 *
 */
import React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { MenuButton } from './MenuButton';
import { mediaQueries, TotemsData } from '../../../types/constants';
import { Column } from '../blocks';
import { useSelector } from 'react-redux';
import { activePageSelector } from '../../containers/Wrapper/selectors';

interface Props {
  isLogin?: boolean;
  isMobile?: boolean;
}

export const Menu = ({ isLogin, isMobile }: Props) => {
  const active = useSelector(activePageSelector);
  let menuValues = Object.keys(TotemsData);
  if (!isLogin) {
    menuValues = menuValues.filter(v => v !== 'USER');
  }
  if (isMobile) {
    menuValues = menuValues.filter(v => v !== 'UNISWAP');
  }

  return (
    <Div>
      <ButtonsContainer isLogin={isLogin}>
        {menuValues.map((v, index) => (
          <MenuButton
            key={index}
            name={v}
            isActive={active === v && window.innerWidth > 450}
            isMobile={isMobile}
          />
        ))}
      </ButtonsContainer>
    </Div>
  );
};

const Div = styled.div`
  ${mediaQueries.lessThan('small')`
    height: 100%;
  `};
`;

const ButtonsContainer = styled(Column)<Props>`
  ${mediaQueries.lessThan('small')`
    height: 100%;
    flex-direction: row;
  `};
`;
