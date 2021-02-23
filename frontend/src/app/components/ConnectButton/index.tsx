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

interface Props {
  onConnectWallet: () => void;
  address?: string;
}

export function ConnectButton({ onConnectWallet, address }: Props) {
  const showAddress =
    address && address.length
      ? `${address.substr(0, 5)}...${address.substr(
          address.length - 4,
          address.length - 1,
        )}`
      : null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  return (
    <Div onClick={() => (!address ? onConnectWallet() : null)}>
      <p>{!address ? t(...messages.connectWallet) : showAddress}</p>
      {!address ? (
        <Icon
          url={'wallet-white.svg'}
          width={25}
          height={25}
          margin={'0 0 0 20px'}
        />
      ) : null}
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
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  ${mediaQueries.lessThan('medium')`
  width: 100px;
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
  p {
    display: none;
  }
`}
  :hover {
    background-color: #739ba2;
  }
`;
