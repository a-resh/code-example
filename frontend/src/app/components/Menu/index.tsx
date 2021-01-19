/**
 *
 * Menu
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { MenuButton } from './MenuButton';

interface Props {
  isMobile?: boolean;
  isLogin?: boolean;
}

export const Menu = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const menuValues = [
    { name: 'Fox', icon: '' },
    { name: 'Wolf', icon: '' },
    { name: 'Owl', icon: '' },
    { name: 'Uniswap', icon: '' },
  ];
  const buttons =
    props.isMobile || !props.isLogin
      ? menuValues
      : menuValues.concat({ name: 'My Account', icon: '' });

  return (
    <Div>
      <ButtonsContainer {...props}>
        {buttons.map(value => (
          <MenuButton {...value} />
        ))}
      </ButtonsContainer>
      {t('')}
      {/*  {t(...messages.someThing)}  */}
    </Div>
  );
});

const Div = styled.div``;

const ButtonsContainer = styled.div<Props>`
  height: 100%;
  display: flex;
  flex-direction: ${props => (props.isMobile ? 'row' : 'column')};
`;
