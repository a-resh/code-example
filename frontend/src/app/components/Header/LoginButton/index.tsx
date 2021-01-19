/**
 *
 * LoginButton
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';

interface Props {
  isMobile: boolean;
}

export function LoginButton({ isMobile }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
    <Div>
      {t('')}
      {isMobile ? t(...messages.connectWallet) : <p>Mobile</p>}
    </Div>
  );
}

const Div = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
