/**
 *
 * LoginButton
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { Icon } from '../Icon';
import { mediaQueries } from '../../../types/constants';
import { Center } from '../blocks';

interface Props {}

export function LoginButton({}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
    <Div>
      <p>{t(...messages.connectWallet)}</p>
      <Icon
        url={'wallet-white.svg'}
        width={25}
        height={25}
        margin={'0 0 0 20px'}
      />
    </Div>
  );
}

const Div = styled(Center)`
  height: 100%;
  width: 210px;
  font-weight: bold;
  font-size: 15px;
  color: #272e38;
  background-color: #c4dbe0;
  cursor: pointer;

  ${mediaQueries.lessThan('medium')`
  width: 60px;
  p {
   display: none;
  }
  div {
    margin: 0;
  }
  `}
  ${mediaQueries.lessThan('small')`
  position: fixed;
  height: 45px;
  width: 45px;
  top: 85%;
  left: 80%;
  border-radius: 50%;
  width: 45px;
  background-color: #739ba2;
`}
  :hover {
    background-color: #739ba2;
  }
`;
