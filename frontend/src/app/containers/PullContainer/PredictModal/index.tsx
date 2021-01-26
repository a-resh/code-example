/**
 *
 * PredictModal
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import Modal from 'react-modal';
import { Icon } from '../../../components/Icon';
import { Totems } from '../../../../types/enums';
import moment from 'moment';
import { Row } from '../../../components/Row';
import { Center } from '../../../components/Center';

interface Props {
  isOpen: boolean;
  close: () => void;
  totem: Totems;
}

export const PredictModal = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const changeValue = (value: string | number) => {};
  const { t, i18n } = useTranslation();
  const customStyles = {
    overlay: { backgroundColor: 'rgba(0, 0, 0, .4)' },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: 0,
      width: 800,
      height: 520,
      border: 0,
    },
  };

  return (
    <Modal
      isOpen={props.isOpen}
      shouldCloseOnOverlayClick={true}
      style={customStyles}
    >
      <ModalHeader>
        <Icon url={`${props.totem}-white.svg`} height={20} width={20}></Icon>
        <Icon
          url={`close-white.svg`}
          height={15}
          width={15}
          cursor={'pointer'}
          onClick={props.close}
        ></Icon>
      </ModalHeader>
      <Row width={'100%'} padding={'0 50px'}>
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
            <Row width={'100%'}>
              <p>{t('prediction')}</p>
              <p>{t('range')}</p>
            </Row>
            <Row width={'100%'}>
              <h2>$ 13,000</h2>
              <h2>&plusmn;$500</h2>
            </Row>
            <Row width={'100%'}>
              <small>$12,500 - $13,500</small>
            </Row>
          </PredictionRange>
        </Block>
      </Row>
      <Row width={'100%'} padding={'0 50px'}>
        <Block align={'flex-start'}></Block>
        <Block align={'center'}>
          <ConfirmPredict>
            <h4>{t('How much TOTM are you staking')}?</h4>
            <h2>10,000</h2>
            <Row width={'100%'}>
              {[25, 50, 75, 100].map(v => (
                <PercentValue
                  opacity={v / 100}
                  onClick={() => changeValue(`${v}%`)}
                >
                  <Center>
                    <p>{v}%</p>
                  </Center>
                </PercentValue>
              ))}
            </Row>
            <StakeButton onClick={() => {}}>
              <Center>
                <p>{t('Confirm stake')}</p>
              </Center>
            </StakeButton>
          </ConfirmPredict>
        </Block>
      </Row>
    </Modal>
  );
});

const ModalHeader = styled.div`
  height: 45px;
  width: 100%;
  background-color: #ff6701;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
`;

const Block = styled.div<{ align?: string }>`
  width: 50%;
  display: flex;
  flex-direction: column;
  font-family: Lato;
  align-items: ${props => props.align};

  h2 {
    font-size: 35px;
    margin: 10px 0;
  }

  h4 {
    font-size: 14px;
    font-weight: 100;
  }

  h3 {
    font-weight: 700;
    font-size: 20px;
  }
`;

const PredictionRange = styled.div`
  display: flex;
  flex-direction: column;
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

const ConfirmPredict = styled.div`
  div {
    text-align: center;
    height: 45px;
    width: 100%;
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
`;
const StakeButton = styled.div`
  background-color: #ff6701;
  cursor: pointer;
  margin-top: 15px;
  p {
    font-weight: bold;
  }
`;
const PercentValue = styled.div<{ opacity: number }>`
  background-color: rgba(255, 103, 0, ${props => props.opacity});
  cursor: pointer;
`;
