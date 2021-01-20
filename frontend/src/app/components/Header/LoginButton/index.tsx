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
      {isMobile ? null : t(...messages.connectWallet)}
      <Image isMobile={isMobile}/>
      {isMobile ? <img src="" alt=""/>: <img src="" alt=""/>}
    </Div>
  );
}
interface ImageProps {isMobile: boolean}
const Image = styled.div<ImageProps>`
  width: 25px;
  height: 25px;
  margin-left: 20px;
  background-image: url(${props => props.isMobile? '' :'/assets/images/wallet-white.svg'});
`
const Div = styled.div`
  height: 100%;
  width: 210px;
  line-height: 2em;
  font-weight : bold;
  font-size : 15px;
  color : #272E38;
  background-color: #C4DBE0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
