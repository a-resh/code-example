/**
 *
 * PredictModal
 *
 */
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';
import { Icon } from '../../../../components/Icon';
import moment from 'moment';
import { TotemsData } from '../../../../../types/constants';
import { Center } from '../../../../components/blocks';
import { ChartWithBet } from '../../../../components/ChartWithBet';
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

interface Props {
  isOpen: boolean;
  close: () => void;
  totem: string;
  isMobile: boolean;
  makeBet: (bitcoinValue: number, betValue: number) => void;
}

export const PredictModal = memo(
  ({ isOpen, isMobile, totem, close, makeBet }: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();
    const startValue = 32000;
    const initBetValue = 10000;
    const [bitcoinValue, setBitcoinValue] = useState(startValue);
    const [isActivePercent, setIsActivePercent] = useState(50);
    const [betValue, setBetValue] = useState(
      initBetValue ? (initBetValue * 50) / 100 : 0,
    );
    const [betError, setBetError] = useState('');
    const [bitcoinError, setBitcoinError] = useState('');
    const changeBetValue = (value: number) => {
      setIsActivePercent(value);
      setBetValue((initBetValue * value) / 100);
    };
    const makeStake = () => {
      if (betValue > initBetValue) {
        setBetError(t('To big bet'));
        return;
      }
      if (bitcoinValue < 0) {
        setBitcoinError('To small');
        return;
      }
      makeBet(bitcoinValue, betValue);
    };

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
        overlay: { backgroundColor: 'rgba(0, 0, 0, 0)' },
        content: {
          width: '100%',
          height: '100vh',
          top: 0,
          left: 0,
        },
      };
    } else {
      styles = {
        overlay: { backgroundColor: 'rgba(0, 0, 0, .4)' },
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
      overlay: { ...customStyles.overlay, ...styles.overlay },
      content: { ...customStyles.content, ...styles.content },
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
                  <InputWrapper>
                    ${' '}
                    <input
                      type="number"
                      defaultValue={bitcoinValue}
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
            <ChartWithBet
              totem={totem}
              startValue={startValue}
              betValue={bitcoinValue}
            />
          </Block>
          <Block align={'center'}>
            <ConfirmPredict background={TotemsData[totem].color}>
              <h4>{t('How much TOTM are you staking')}?</h4>
              <InputWrapperBottom>
                <input
                  type="number"
                  value={betValue}
                  onChange={e => setBetValue(+e.target.value)}
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
                    isActive={isActivePercent === v}
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
