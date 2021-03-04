/**
 *
 * PredictModal
 *
 */
import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';
import { Icon } from '../../../../components/Icon';
import moment from 'moment';
import { TotemsData } from '../../../../../types/constants';
import { Center } from '../../../../components/blocks';
import { GraphWithBet } from '../../../../components/GraphWithBet';
import {
  Block,
  Bottom,
  ConfirmPredict,
  DesktopPrediction,
  InputWrapper,
  InputWrapperBottom,
  MobilePrediction,
  ModalHeader,
  PercentBlock,
  PercentValue,
  PredictionRange,
  RowModal,
  StakeButton,
  Top,
  TotemWrapper,
} from './components';
import { GraphicData } from '../../types';
import { fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';

interface Props {
  endTime: number;
  isOpen: boolean;
  close: () => void;
  totem: string;
  initBet: number;
  makeBet: (bitcoinValue: number, betValue: number) => void;
  graphicsData: GraphicData[];
  getGraphicsData: () => void;
}

export const PredictModal = memo(
  ({
    endTime,
    isOpen,
    initBet,
    totem,
    close,
    makeBet,
    graphicsData,
    getGraphicsData,
  }: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();
    let startValue = 32000;
    const initBetValue = 10000;
    const [bitcoinValue, setBitcoinValue] = useState(startValue);
    const [activePercent, setIsActivePercent] = useState(50);
    const [betValue, setBetValue] = useState((initBet * 50) / 100);
    const [betError, setBetError] = useState('');
    const [bitcoinError, setBitcoinError] = useState('');
    const checkIsMobile = value => value < 600;
    const [isMobile, setIsMobile] = useState(checkIsMobile(window.innerWidth));
    const [customStyles, setCustomStyles] = useState(setModalStyle(isMobile));
    const subscribe = fromEvent(window, 'resize')
      .pipe(
        map((e: any) => e.currentTarget.innerWidth),
        filter(width => isMobile !== checkIsMobile(width)),
      )
      .subscribe(data => {
        setIsMobile(checkIsMobile(data));
        setCustomStyles(setModalStyle(isMobile));
      });
    if (!graphicsData?.length) {
      getGraphicsData();
    }

    useEffect(() => {
      if (graphicsData.length) {
        setBitcoinValue(
          Math.round(+graphicsData[graphicsData.length - 1].close),
        );
      }
      setBetValue((initBet * activePercent) / 100);
      return () => subscribe.unsubscribe();
    }, [graphicsData, totem, initBet]);

    const changeBetValue = (value: number) => {
      setIsActivePercent(value);
      setBetValue(Math.ceil((initBet * value) / 100));
    };
    const makeStake = () => {
      // if (betValue > initBetValue) {
      //   setBetError(t('To big bet'));
      //   return;
      // }
      // if (bitcoinValue < 0) {
      //   setBitcoinError('To small');
      //   return;
      // }
      makeBet(bitcoinValue, betValue);
    };

    return (
      <Modal
        isOpen={isOpen}
        shouldCloseOnOverlayClick={true}
        style={customStyles}
        ariaHideApp={false}
      >
        <ModalHeader background={TotemsData[totem].color}>
          <TotemWrapper background={TotemsData[totem].color}>
            <Icon url={`${totem}-white.svg`} height={20} width={20} />
          </TotemWrapper>
          <Icon
            url={`close-${isMobile ? 'grey' : 'white'}.svg`}
            height={15}
            width={15}
            cursor={'pointer'}
            onClick={close}
          />
        </ModalHeader>
        <Top>
          <Block align={'flex-start'}>
            <h3>{t('Your prediction')}</h3>
            <p>{t('This pool will mature at')}:</p>
            <h2>
              {moment(endTime).format('DD/MM/YY')} at{' '}
              {moment(endTime).format('HH:mm')}
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
                  <InputWrapper>
                    ${' '}
                    <input
                      type="number"
                      defaultValue={bitcoinValue}
                      pattern="([0-9]+.{0,1}[0-9]*,{0,1})*[0-9]"
                      onChange={e => setBitcoinValue(+e.target.value)}
                    />
                  </InputWrapper>
                  <h2>&plusmn;$500</h2>
                </RowModal>
                <RowModal>
                  <small>
                    ${bitcoinValue - 500} - ${bitcoinValue + 500}
                  </small>
                </RowModal>
              </DesktopPrediction>
              <MobilePrediction background={TotemsData[totem].color}>
                <InputWrapper background={TotemsData[totem].color}>
                  ${' '}
                  <input
                    type="number"
                    pattern="([0-9]+.{0,1}[0-9]*,{0,1})*[0-9]"
                    defaultValue={bitcoinValue}
                    onChange={e => setBitcoinValue(+e.target.value)}
                  />
                </InputWrapper>
                <p>Range &plusmn;$500</p>
              </MobilePrediction>
            </PredictionRange>
          </Block>
        </Top>
        <Bottom>
          <Block align={'flex-start'}>
            <GraphWithBet
              totem={totem}
              startValue={bitcoinValue}
              betValue={bitcoinValue}
              data={graphicsData}
            />
          </Block>
          <Block align={'center'}>
            <ConfirmPredict background={TotemsData[totem].color}>
              <h4>{t('How much TOTM are you staking')}?</h4>
              <InputWrapperBottom>
                <input
                  type="number"
                  value={betValue}
                  onChange={e => {
                    console.log(
                      +e.target.value,
                      e.target.value,
                      !!+e.target.value.charAt(0),
                    );
                    e.target.value && +e.target.value.charAt(0)
                      ? setBetValue(+e.target.value)
                      : setBetValue(+e.target.value.substr(1) || 0);
                  }}
                />
              </InputWrapperBottom>
              <PercentBlock>
                {[25, 50, 75, 100].map((v, index) => (
                  <PercentValue
                    key={index}
                    background={`${TotemsData[totem].color}${Math.ceil(
                      v * 2.5,
                    ).toString(16)}`}
                    onClick={() => changeBetValue(v)}
                    isActive={activePercent === v}
                  >
                    <p>{v}%</p>
                  </PercentValue>
                ))}
              </PercentBlock>
              <StakeButton
                background={TotemsData[totem].color}
                onClick={makeStake}
              >
                <Center>
                  <p>{t('Confirm stake')}</p>
                </Center>
              </StakeButton>
            </ConfirmPredict>
          </Block>
        </Bottom>
      </Modal>
    );
  },
);

function setModalStyle(isMobile: boolean) {
  let styles: any;

  let customStyles = {
    overlay: {},
    content: {
      width: '100%',
      maxWidth: 800,
      height: '100%',
      maxHeight: 520,
      border: 0,
      padding: 0,
    },
  };
  if (isMobile) {
    styles = {
      overlay: { backgroundColor: 'rgba(0, 0, 0, 0, 0.7)' },
      content: {
        width: '100%',
        maxHeight: '100vh',
        height: 'auto',
        inset: 'auto',
        left: 0,
        top: 0,
      },
    };
  } else {
    styles = {
      overlay: { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
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
  return {
    overlay: { ...customStyles.overlay, ...styles.overlay },
    content: { ...customStyles.content, ...styles.content },
  };
}
