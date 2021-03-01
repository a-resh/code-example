import styled from 'styled-components/macro';
import { Center, Column, Row } from '../../../../../components/blocks';
import { TotemBackground } from '../../../../../../types/interfaces';
import { mediaQueries } from '../../../../../../types/constants';

export const ModalHeader = styled.div<TotemBackground>`
  height: 45px;
  width: 100%;
  background-color: ${props => props.background};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  ${mediaQueries.lessThan('small')`
  background-color: #EBF3F5;
  padding: 0 15px 0 0;
  `}
`;
export const TotemWrapper = styled(Center)<TotemBackground>`
  height: 100%;
  width: 45px;
  @media screen and (max-width: 450px) {
    background-color: ${props => props.background};
  }

  input {
    text-align: center;
    border: none;
    border-bottom: solid 2px #c4dbe0;

    :focus {
      outline: none;
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
`;
export const Top = styled(Row)`
  width: 100%;
  padding: 0 50px;
  ${mediaQueries.lessThan('medium')`
    padding: 0 0 0 20px;
  `}
  ${mediaQueries.lessThan('small')`
  flex-direction: column;
  background-color: #EBF3F5;
  align-items: center;
  padding: 0;
  `}
`;
export const Block = styled(Column)<{ align?: string }>`
  width: 50%;
  font-family: Lato;
  align-items: ${props => props.align};

  h2 {
    font-size: 35px;
    margin: 10px 0;
    font-weight: 300;
  }

  h4 {
    font-size: 14px;
    font-weight: 300;
  }

  h3 {
    font-weight: 700;
    font-size: 20px;
  }

  ${mediaQueries.lessThan('small')`
  width: 100%;
  align-items: center;
  h2 {
    font-size: 20px;
  }
  h4, p {
    font-size: 8px;
    font-weight: bold;
  }
  `}
`;
export const PredictionRange = styled(Column)`
  justify-content: center;
  align-items: center;
  width: 220px;

  h4 {
    margin: 20px 0 10px 0;
  }

  p,
  h2,
  small {
    border: solid 2px #c4dbe0;
    text-align: center;
    margin: 0;
  }

  p,
  h2 {
    width: 50%;
    font-size: 20px;
  }

  h2 {
    height: 60px;
    font-weight: 700;
    line-height: 50px;
  }

  small {
    width: 220px;
    border-top: 0;
    height: 25px;
    font-size: 10px;
    line-height: 24px;
  }

  p {
    border-bottom: 0;
    height: 25px;
    line-height: 20px;
  }

  h2:first-child {
    border-right: 0;
  }

  p:first-child {
    border-right: 0;
  }
`;
export const DesktopPrediction = styled.div`
  ${mediaQueries.lessThan('small')`
     display: none;
  `}
`;
export const MobilePrediction = styled(Column)<TotemBackground>`
  width: 130px;
  background-color: ${props => props.background};
  color: white;

  h2,
  p {
    width: 100%;
    font-weight: 300;
    border: none;
  }

  h2 {
    font-size: 30px;
    height: 50px;
  }

  p {
    font-size: 11px;
  }

  ${mediaQueries.greaterThan('small')`
     display: none;
  `}
`;
export const ConfirmPredict = styled.div<TotemBackground>`
  div {
    text-align: center;
    color: white;
  }

  h5 {
    font-weight: bold;
    font-size: 10px;
  }

  h4 {
    margin: 40px 0 10px 0;
  }

  h2 {
    border: solid 2px #c4dbe0;
    text-align: center;
    margin: 0;
  }

  @media screen and (max-width: 450px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    h2 {
      width: 130px;
      font-size: 30px;
      font-weight: 100;
      background-color: ${props => props.background};
      color: white;
      border: none;
    }
  }
`;
export const StakeButton = styled(Center)<TotemBackground>`
  background-color: ${props => props.background};
  cursor: pointer;
  margin-top: 15px;
  height: 45px;

  p {
    font-weight: bold;
  }

  ${mediaQueries.lessThan('small')`
     width: 100%;
     p {font-size: 15px}
  `}
`;
export const PercentBlock = styled(Row)`
  width: 100%;
  ${mediaQueries.lessThan('small')`
     width: 130px;
  `}
`;
export const PercentValue = styled(Center)<{
  isActive: boolean;
  background: string;
}>`
  height: 45px;
  width: 25%;
  background-color: ${props => props.background};
  border: ${props => (props.isActive ? `3px solid #c4dbe0` : null)};
  cursor: pointer;
  ${mediaQueries.lessThan('small')`
    height: 32px;
  `}
`;
export const Bottom = styled(Top)`
  width: 100%;
`;
export const RowModal = styled(Row)`
  width: 100%;
`;
export const InputWrapper = styled(Center)<TotemBackground>`
  width: 50%;
  border: solid 2px #c4dbe0;
  border-right: none;
  font-size: 22px;
  flex-direction: row;

  input {
    text-align: center;
    border: none;
    border-bottom: solid 2px #c4dbe0;
    width: 80%;

    :focus {
      outline: none;
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  @media screen and (max-width: 450px) {
    input[type='number'] {
      background-color: ${props => props.background};
      color: white;
    }

    width: 100%;
    border: none;
  }
`;
export const InputWrapperBottom = styled(InputWrapper)`
  width: 202px;
  border-right: solid 2px #c4dbe0;
  font-size: 30px;
  padding-bottom: 10px;
  ${mediaQueries.lessThan('small')`
    width: 130px;
    input[type='number'] {
      background-color: #EBF3F5;
      color: black;
     }
  `}
`;
