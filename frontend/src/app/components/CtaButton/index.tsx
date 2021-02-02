/**
 *
 * CtaButton
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { Center } from '../blocks';

interface Props {
  background: string;
  color: string;
  showModal?: () => void;
}

export const CtaButton = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
    <Div onClick={props.showModal} {...props}>
      <b>{t(...messages.predictNow)}</b>
    </Div>
  );
});

const Div = styled(Center)<Props>`
  height: 100%;
  width: 100%;
  color: ${props => props.color};
  background-color: ${props => props.background};
  cursor: pointer;
  b {
    font-size: 20px;
    font-weight: 700;
  }
`;
