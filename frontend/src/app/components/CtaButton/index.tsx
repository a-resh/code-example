/**
*
* CtaButton
*
*/
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';

interface Props {
  background: string;
  color: string;
}

export const CtaButton = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
  <Div {...props}>
    {t(...messages.predictNow)}
  </Div>
  );

});

const Div = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  color: ${props => props.color};
  background-color: ${props => props.background};
  cursor: pointer;
`;
