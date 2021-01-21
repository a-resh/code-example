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
  isMobile: boolean;
  isLogin?: boolean;
}

export const Menu = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const menuValues = [
    { name: 'Fox', icon: 'fox-white.svg', color: '#FF6600' },
    { name: 'Wolf', icon: 'wolf-white.svg', color: '#455461' },
    { name: 'Owl', icon: props.isMobile? 'owl-mobile-menu.svg': 'owl-white.svg', color: props.isMobile? '#C4DBE0': '#739BA2' },
    { name: 'Uniswap', icon: 'uniswap-black.svg', color: props.isMobile? '#739BA2': '#C4DBE0' },
  ];
  const buttons =
    props.isMobile || !props.isLogin
      ? menuValues
      : menuValues.concat({ name: 'My Account', icon: '', color: ''});

  return (
    <Div>
      <ButtonsContainer {...props}>
        {buttons.map(({name, icon, color}) => (
          <MenuButton name={ name} color={color} icon={icon} isMobile={props.isMobile} />
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
