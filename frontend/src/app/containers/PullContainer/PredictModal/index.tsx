/**
 *
 * PredictModal
 *
 */
import React, {memo} from 'react';
import styled from 'styled-components/macro';
import {useTranslation} from 'react-i18next';
import Modal from 'react-modal';
import {Icon} from '../../../components/Icon';
import moment from 'moment';
import {mediaQueries, TotemsData} from '../../../../types/constants';
import {Center, Column, Row} from '../../../components/blocks';
import {TotemBackground} from 'types/interfaces';
import {ChartWithBet} from "../../../components/ChartWithBet";

interface Props {
    isOpen: boolean;
    close: () => void;
    totem: string;
    isMobile: boolean;
}

export const PredictModal = memo(({isOpen, isMobile, totem, close}: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const changeValue = (value: string | number) => {
    };
    const {t, i18n} = useTranslation();
    let styles: any;
    let customStyles = {
        overlay: {},
        content: {
            width: 800,
            height: 520,
            border: 0,
            padding: 0,
        },
    };
    if (isMobile) {
        styles = {
            overlay: {backgroundColor: 'rgba(0, 0, 0, 0)'},
            content: {
                width: '100%',
                height: '100vh',
                top: 0,
                left: 0,
            },
        };
    } else {
        styles = {
            overlay: {backgroundColor: 'rgba(0, 0, 0, .4)'},
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
            },
        };
    }
    customStyles = {
        overlay: {...customStyles.overlay, ...styles.overlay},
        content: {...customStyles.content, ...styles.content},
    };

    return (
        <Modal
            isOpen={isOpen}
            shouldCloseOnOverlayClick={true}
            style={customStyles}
        >
            <ModalHeader background={TotemsData[totem].color}>
                <TotemWrapper background={TotemsData[totem].color}>
                    <Icon url={`${totem}-white.svg`} height={20} width={20}></Icon>
                </TotemWrapper>
                <Icon
                    url={`close-${isMobile ? 'grey' : 'white'}.svg`}
                    height={15}
                    width={15}
                    cursor={'pointer'}
                    onClick={close}
                ></Icon>
            </ModalHeader>
            <Top>
                <Block align={'flex-start'}>
                    <h3>{t('Your prediction')}</h3>
                    <p>{t('This pool will mature at')}:</p>
                    <h2>
                        {moment(new Date()).format('DD/MM/YY')} at{' '}
                        {moment(new Date()).format('HH:mm')}
                    </h2>
                </Block>
                <Block align={'center'}>
                    <PredictionRange>
                        <h4>
                            {t('What will the price of bitcoin be when this pool matures?')}
                        </h4>
                        <DesktopPrediction>
                            <RowModal>
                                <p>{t('prediction')}</p>
                                <p>{t('range')}</p>
                            </RowModal>
                            <RowModal>
                                <h2>$ 13,000</h2>
                                <h2>&plusmn;$500</h2>
                            </RowModal>
                            <RowModal>
                                <small>$12,500 - $13,500</small>
                            </RowModal>
                        </DesktopPrediction>
                        <MobilePrediction background={TotemsData[totem].color}>
                            <h2>$13,000</h2>
                            <p>Range &plusmn;$500</p>
                        </MobilePrediction>
                    </PredictionRange>
                </Block>
            </Top>
            <Bottom>
                <Block align={'flex-start'}>
                    <ChartWithBet totem={totem}/>
                </Block>
                <Block align={'center'}>
                    <ConfirmPredict background={TotemsData[totem].color}>
                        <h4>{t('How much TOTM are you staking')}?</h4>
                        <h2>10,000</h2>
                        <PercentBlock>
                            {[25, 50, 75, 100].map((v, index) => (
                                <PercentValue
                                    key={index}
                                    background={`${TotemsData[totem].color}${(Math.ceil(v * 2.5)).toString(16)}`}
                                    onClick={() => changeValue(`${v}%`)}
                                >
                                    <p>{v}%</p>
                                </PercentValue>
                            ))}
                        </PercentBlock>
                        <StakeButton background={TotemsData[totem].color} onClick={() => {
                        }}>
                            <Center>
                                <p>{t('Confirm stake')}</p>
                            </Center>
                        </StakeButton>
                    </ConfirmPredict>
                </Block>
            </Bottom>
        </Modal>
    );
});

const ModalHeader = styled.div<TotemBackground>`
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
const TotemWrapper = styled(Center)<TotemBackground>`
  height: 100%;
  width: 45px;
  @media screen and (max-width: 450px) {
    background-color: ${props => props.background};
  }
`;

const Top = styled(Row)`
  width: 100%;
  padding: 0 50px;
  ${mediaQueries.lessThan('small')`
  flex-direction: column;
  background-color: #EBF3F5;
  align-items: center;
  padding: 0;
  `}
`;

const Block = styled(Column)<{ align?: string }>`
  width: 50%;
  font-family: Lato;
  align-items: ${props => props.align};

  h2 {
    font-size: 35px;
    margin: 10px 0;
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

const PredictionRange = styled(Column)`
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
const DesktopPrediction = styled.div`
  ${mediaQueries.lessThan('small')`
     display: none;
  `}
`;
const MobilePrediction = styled(Column)<TotemBackground>`
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
const ConfirmPredict = styled.div<TotemBackground>`
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
const StakeButton = styled(Center)<TotemBackground>`
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
const PercentBlock = styled(Row)`
  width: 100%;
  ${mediaQueries.lessThan('small')`
     width: 130px;
  `}
`;
const PercentValue = styled(Center)<TotemBackground>`
  height: 45px;
  width: 25%;
  background-color: ${props => props.background};
  cursor: pointer;
  ${mediaQueries.lessThan('small')`
    height: 32px;
  `}
`;
const Bottom = styled(Top)`
  width: 100%;
`;
const RowModal = styled(Row)`
  width: 100%;
`;
