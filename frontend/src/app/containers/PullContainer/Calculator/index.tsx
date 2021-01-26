/**
 *
 * Calculator
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import {useTranslation} from 'react-i18next';
import {messages} from './messages';
import CustomizedSlider from "../../../components/CustomSlider";
import {Switch} from "@material-ui/core";
import CustomSwitch from '../../../components/CustomSwitch';

interface Props {
}

export function Calculator(props: Props) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {t, i18n} = useTranslation();

    return (
        <Div>
            <Top>
                <Row>
                    <p>{t(...messages.ifYouStake)}</p>
                    <input className={"calculator-input-number"} type="number" value={1000} onChange={() => {}}/>
                    <p> TOTM</p>
                </Row>
                <Row>
                    <p>{t(...messages.andComeIn)}</p>
                    <select className={"calculator-select-place"} name="place" id="place">
                        <option value="1" selected>1st</option>
                        <option value="2">2nd</option>
                        <option value="3">3th</option>
                    </select>
                    <p>{t(...messages.place)}...</p>
                </Row>
                <RowSmall>
                    <p>{t(...messages.collaborativeRewards)}</p>
                    <SwitchWrapper>
                        <CustomSwitch/>
                    </SwitchWrapper>
                </RowSmall>
                <RowSmall>
                    <p>{t(...messages.enhancedRewards)}</p>
                    <SliderWrapper>
                        <CustomizedSlider/>
                    </SliderWrapper>
                </RowSmall>
            </Top>
            <Bottom>
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
            </Bottom>
        </Div>
    );

};

const Div = styled.div`
  height: 100%;
  width: 420px;
  margin: 0 30px 0 0;
  color: white;
`;

const Top = styled.div`
  height: calc(100% - 200px);
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 25px;
  font-size: 19px;
`
const RowSmall = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 20px;
  font-size: 11px;
`
const SwitchWrapper = styled.div`
  margin-left: 30px;
`
const SliderWrapper = styled.div`
  margin-left: 50px;
  width: 60px;
  height: 20px;
  padding-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Bottom = styled.div`
  opacity: 1;
  padding-top: 5px;
  width: 100%;
  height: 200px;
  background-color: #739BA2;
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
`;
const CurrencyBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 0 10px;
  p {
    font-weight: 300;
  }
`
const AmountCurrency = styled.div`
  display: flex;
  font-family: Lato;
  margin: 0;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  h5, h3, h4, h6, h2 {
    margin: 0;
  }
  h3 {
    font-weight : bold;
    font-size : 25px;
  }
  h2 {
    font-weight : bold;
    font-size : 40px;
  }
  h5, h4 {
    font-weight: 300;
  }
  h6 {
    font-size: 10px;
    opacity: .6;
  }
`
