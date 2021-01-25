/**
 *
 * Menu
 *
 */
import React, {memo, useState} from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { MenuButton } from './MenuButton';
import {TotemsData} from "../../../types/enums";

interface Props {
  isMobile: boolean;
  isLogin?: boolean;
}

export const Menu = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  let menuValues = Object.keys(TotemsData);
  if(!props.isLogin){
    menuValues = menuValues.filter(v => v !== 'USER');
  }

  return (
    <Div>
      <ButtonsContainer {...props}>
        {menuValues.map((v, index) => (
          <MenuButton key={index} name={v} />
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
  flex-direction: column;
  @media only screen and (max-width: 600px) {
    flex-direction: row;
  };
`;
