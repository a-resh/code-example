/**
*
* PoolInfo
*
*/
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import {CtaButton} from "../CtaButton";
import {Icon} from "../Icon";
import {Scale} from "../Scale";

interface Props {}

export function PoolInfo(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const totem = 'Fox';

  return (
  <Div>
    {t('')}
    <Title>
      <Icon height={40} width={40} url={`${totem.toLowerCase()}-white.svg`}/>
      <p>{totem} {t(...messages.predictorPool)}</p>
    </Title>
    <ScaleContainer>
    <p><b>{t(...messages.thisPoolIs)} 63% {t(...messages.full)}</b></p>
    <Scale fill={63}/>
    </ScaleContainer>
    <ButtonWrapper>
      <CtaButton color={'#181818'} background={'white'}/>
    </ButtonWrapper>
  </Div>
  );

};

const Div = styled.div`
  height: 210px;
  width: 430px;
  background-color: #FF6701;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Title = styled.div`
  width: 100%;
  height: 70px;
  font-size : 18px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 15px;
  justify-content: space-between;
  p {
    font-size: 20px;
  };
`
const ScaleContainer = styled.div`
  width: 100%;
  padding: 0 30px;
  text-align: center;
  p {
    font-size: 15px;
  };
`

const ButtonWrapper = styled.div`
  width: 100%;
  height: 50px;
  align-self: end;
`;
