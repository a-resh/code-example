/**
 *
 * PredictModal
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';
import { Icon } from '../../../components/Icon';
import { Totems } from '../../../../types/enums';
import moment from 'moment';
import { Row } from '../../../components/blocks/Row';
import { Center } from '../../../components/blocks/Center';
import { mediaQueries } from '../../../../types/constants';
import { Column } from '../../../components/blocks/Column';

interface Props {
  isOpen: boolean;
  close: () => void;
  totem: Totems;
  isMobile: boolean;
}

export const PredictModal = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const changeValue = (value: string | number) => {};
  const { t, i18n } = useTranslation();
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
  if (props.isMobile) {
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
      isOpen={props.isOpen}
      shouldCloseOnOverlayClick={true}
      style={customStyles}
    >
      <ModalHeader>
        <TotemWrapper>
          <Icon url={`${props.totem}-white.svg`} height={20} width={20}></Icon>
        </TotemWrapper>
        <Icon
          url={`close-${props.isMobile ? 'grey' : 'white'}.svg`}
          height={15}
          width={15}
          cursor={'pointer'}
          onClick={props.close}
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
            </DesktopPrediction>
            <MobilePrediction>
              <h2>$13,000</h2>
              <p>Range &plusmn;$500</p>
            </MobilePrediction>
          </PredictionRange>
        </Block>
      </Top>
      <Bottom>
        <Block align={'flex-start'}></Block>
        <Block align={'center'}>
          <ConfirmPredict>
            <h4>{t('How much TOTM are you staking')}?</h4>
            <h2>10,000</h2>
            <PercentBlock>
              {[25, 50, 75, 100].map(v => (
                <PercentValue
                  opacity={v / 100}
                  onClick={() => changeValue(`${v}%`)}
                >
                  <p>{v}%</p>
                </PercentValue>
              ))}
            </PercentBlock>
            <StakeButton onClick={() => {}}>
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

const ModalHeader = styled.div`
  height: 45px;
  width: 100%;
  background-color: #ff6701;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  ${mediaQueries.lessThan('small')`
  background-color: #EBF3F5;
  padding: 0 15px 0 0;
  `}
`;
const TotemWrapper = styled(Center)`
  height: 100%;
  width: 45px;
  ${mediaQueries.lessThan('small')`
  background-color: #ff6701;
  `}
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
const DesktopPrediction = styled.div`
  ${mediaQueries.lessThan('small')`
     display: none;
  `}
`;
const MobilePrediction = styled(Column)`
  width: 130px;
  background-color: #ff6701;
  color: white;
  h2,
  p {
    width: 100%;
    font-weight: 100;
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
const ConfirmPredict = styled.div`
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
  ${mediaQueries.lessThan('small')`
     display: flex;
     flex-direction: column;
     align-items: center;
     width: 100%;
     h2 {
        width: 130px;
        font-size: 30px;
        font-weight: 100;
        background-color: #ff6701;
        color: white;
        border: none;
     }
  `}
`;
const StakeButton = styled(Center)`
  background-color: #ff6701;
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
const PercentValue = styled(Center)<{ opacity: number }>`
  height: 45px;
  width: 25%;
  background-color: rgba(255, 103, 0, ${props => props.opacity});
  cursor: pointer;
  ${mediaQueries.lessThan('small')`
    height: 32px;
  `}
`;
const Bottom = styled(Top)`
  width: 100%;
`;
