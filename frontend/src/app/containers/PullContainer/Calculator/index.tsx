/**
 *
 * Calculator
 *
 */
import * as React from 'react';
import {useState} from 'react';
import styled from 'styled-components/macro';
import {useTranslation} from 'react-i18next';
import {messages} from './messages';
import CustomizedSlider from '../../../components/CustomSlider';
import CustomSwitch from '../../../components/CustomSwitch';
import {mediaQueries, TotemsData} from '../../../../types/constants';
import {Icon} from 'app/components/Icon';
import {CtaButton} from '../../../components/CtaButton';
import {Center, Column, Row} from '../../../components/blocks';
import {TotemBackground} from "../../../../types/interfaces";

interface Props {
    showModal: () => void;
    currency?: number;
    totem: string;
}

export function Calculator({showModal, currency, totem}: Props) {
    const [selectValue, setSelectValue] = useState(1);
    const [inputValue, setInputValue] = useState(1000);
    const [checkBoxValue, setCheckBoxValue] = useState(true);
    const [sliderValue, setSliderValue] = useState(50);
    const onChangeSelect = (e) => setSelectValue(e.target.value)
    const onChangeInput = (e) => setInputValue(e.target.value)
    const onChangeCheckBox = (e: boolean) => setCheckBoxValue(e)
    const onChangeSlider = (e: number) => setSliderValue(e)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {t, i18n} = useTranslation();

    return (
        <Div>
            <Top>
                <IconWrapper>
                    <IconMobile url={`${totem}-white.svg`} width={20} height={20}/>
                </IconWrapper>
                <RowCalc>
                    <p>{t(...messages.ifYouStake)}</p>
                    <input
                        className={'calculator-input-number'}
                        type="number"
                        defaultValue={inputValue}
                        onChange={onChangeInput}
                    />
                    <p> TOTM</p>
                </RowCalc>
                <RowCalc>
                    <p>{t(...messages.andComeIn)}</p>
                    <select className={'calculator-select-place'} value={selectValue} onChange={onChangeSelect}>
                        <option value="1">
                            1st
                        </option>
                        <option value="2">2nd</option>
                        <option value="3">3th</option>
                    </select>
                    <p>{t(...messages.place)}...</p>
                </RowCalc>
                <SpaceBetween/>
                <RowSmall>
                    <p>{t(...messages.collaborativeRewards)}</p>
                    <SwitchWrapper>
                        <CustomSwitch totem={totem} value={checkBoxValue} onChangeValue={onChangeCheckBox}/>
                    </SwitchWrapper>
                </RowSmall>
                <RowSmall>
                    <p>{t(...messages.enhancedRewards)}</p>
                    <SliderWrapper>
                        <CustomizedSlider totem={totem} value={sliderValue} onChangeValue={onChangeSlider}/>
                    </SliderWrapper>
                </RowSmall>
            </Top>
            <Bottom background={TotemsData[totem].color}>
                <span>{t(...messages.youStandToWin)}:</span>
                <CurrencyBlock>
                    <AmountCurrency>
                        <h5>BTC</h5>
                        <h3>0.135,1347</h3>
                        <h6>(USD 0.16)</h6>
                    </AmountCurrency>
                    <p>&</p>
                    <AmountCurrency>
                        <h5>TOTM</h5>
                        <h3>100.056,56</h3>
                        <h6>(USD 0.16)</h6>
                    </AmountCurrency>
                </CurrencyBlock>
                <AmountCurrency>
                    <h4>{t(...messages.totalReward)}:</h4>
                    <h2>$ 1500.20</h2>
                </AmountCurrency>
                <ButtonWrapper
                    color={'white'}
                    background={TotemsData[totem].color}
                    showModal={showModal}
                />
            </Bottom>
        </Div>
    );
}

const Div = styled.div`
  height: 100%;
  width: 50%;
  margin: 0 30px 0 0;
  color: white;
  ${mediaQueries.lessThan('medium')`
    width: 100%;
    margin: 0 0 30px 0;
  `}
`;

const Top = styled.div`
  padding-bottom: 10px;
  ${mediaQueries.lessThan('small')`
    background-color: black;
    padding-bottom: 15px;
  `}
`;

const IconMobile = styled(Icon)`
  ${mediaQueries.greaterThan('small')`
    display: none
  `}
`;
const IconWrapper = styled(Center)`
  width: 100%;
  height: 50px;
`;
const RowCalc = styled(Row)`
  align-items: center;
  height: 25px;
  font-size: 19px;
  ${mediaQueries.lessThan('small')`
    font-size: 11px;
    padding: 0 0 0 30px;
    input {
      width: 50px;
    }
    select, input {
      height: 15px;
      font-size: 10px;
    }
  `}
`;
const SpaceBetween = styled.div`
  width: 100%;
  height: 20px;
  ${mediaQueries.greaterThan('small')`
    display: none;
  `}
`;
const RowSmall = styled(Row)`
  align-items: center;
  height: 20px;
  font-size: 11px;
  ${mediaQueries.lessThan('small')`
    padding: 0 0 0 30px;
  `}
`;
const SwitchWrapper = styled.div`
  margin-left: 30px;
`;
const SliderWrapper = styled(Center)`
  margin-left: 50px;
  width: 60px;
  height: 20px;
  padding-top: 12px;
`;

const Bottom = styled.div<TotemBackground>`
  opacity: 1;
  padding-top: 5px;
  width: 100%;
  background-color: ${props => props.background};
  text-align: center;

  p {
    font-size: 21px;
    margin: 0;
    line-height: 60px;
    font-weight: 700;
  }

  span {
    font-size: 19px;
    margin-bottom: 10px;
  }

  @media screen and (max-width: 450px) {
    span {
      display: none;
    }

    p {
      font-size: 15px;
    }

    background-color: ${props => `${props.background}80`};
  }
`;
const CurrencyBlock = styled(Row)`
  justify-content: space-around;
  padding: 0 10px;

  p {
    font-weight: 300;
  }
`;
const AmountCurrency = styled(Column)`
  font-family: Lato;
  margin: 0;
  justify-content: space-around;
  align-items: center;

  h5,
  h3,
  h4,
  h6,
  h2 {
    margin: 0;
  }

  h3 {
    font-weight: bold;
    font-size: 25px;
  }

  h2 {
    font-weight: bold;
    font-size: 40px;
  }

  h5,
  h4 {
    font-weight: 300;
  }

  h6 {
    font-size: 10px;
    opacity: 0.6;
  }

  ${mediaQueries.lessThan('small')`
    h3 {
      font-weight: bold;
      font-size: 20px;
    }
    h4 {
      margin-top: 10px;
      font-size: 12px;
    }
    h6, h5 {font-size: 8px;}
    h5 {
      font-weight: bold;
      margin-top: 10px;
    }
    h2 {
      font-size: 30px;
      margin-bottom: 10px;
    }
  `}
`;

const ButtonWrapper = styled(CtaButton)`
  height: 40px;
  font-size: 15px;
  ${mediaQueries.greaterThan('small')`
    display: none;
  `}
`;
