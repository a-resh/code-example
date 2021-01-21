/**
*
* Reward
*
*/
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';

interface Props {}

export function Reward({}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
  <Div>
    {t('')}
    {/*  {t(...messages.someThing)}  */}
  </Div>
  );

};

const Div = styled.div`
  height: 360px;
  width: 420px;
  margin-top: 40px;
  background-color: #FF6701;
`;
