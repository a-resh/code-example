/**
 *
 * ConfirmModal
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import Modal from 'react-modal';
import { TotemsData } from '../../../types/constants';
import {
  ModalHeader,
  TotemWrapper,
} from '../../containers/PullContainer/components/PredictModal/components';
import { Icon } from '../Icon';
import { TotemModalHeader } from '../../containers/Content/components/ConnectMetamaskModal';
import { Center, Row } from '../blocks';
import { TotemBackground } from '../../../types/interfaces';
import { CircularProgress } from '@material-ui/core';

interface Props {
  isOpen: boolean;
  close: () => void;
  totem: string;
  message?: string;
  confirm: () => void;
  loading?: boolean;
}

export const ConfirmModal = ({
  isOpen,
  close,
  totem,
  message,
  confirm,
  loading,
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const isMobile = false;
  const customStyles = {
    overlay: { backgroundColor: 'rgba(0, 0, 0, .4)' },
    content: {
      width: '100%',
      maxWidth: 420,
      height: 200,
      border: 0,
      padding: 0,
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
      style={customStyles}
      ariaHideApp={false}
    >
      <TotemModalHeader background={TotemsData[totem].color}>
        <TotemWrapper background={TotemsData[totem].color}>
          <Icon
            url={`${totem.toLowerCase()}-white.svg`}
            height={20}
            width={20}
          ></Icon>
        </TotemWrapper>
        <p>{loading ? 'Loading...' : 'Confirm'}</p>
        <Icon
          url={`close-${isMobile ? 'grey' : 'white'}.svg`}
          height={15}
          width={15}
          cursor={'pointer'}
          onClick={close}
        ></Icon>
      </TotemModalHeader>
      {loading ? (
        <LoadingWrapper background={TotemsData[totem].color}>
          <CircularProgress size={80} />
        </LoadingWrapper>
      ) : (
        <ModalContent>
          <p>{message}</p>
          <ButtonBlock>
            <Button background={TotemsData[totem].color} onClick={confirm}>
              {t('Yes')}
            </Button>
            <Button background={TotemsData[totem].color} onClick={close}>
              {t('No')}
            </Button>
          </ButtonBlock>
        </ModalContent>
      )}
    </Modal>
  );
};

const ModalContent = styled(Center)`
  width: 100%;
  height: calc(100% - 50px);
  flex-direction: column;
  padding: 10px 0;

  p {
    font-family: Lato;
    font-size: 20px;
  }
`;

const Button = styled(Center)<TotemBackground>`
  background-color: ${props => props.background};
  width: 80px;
  height: 30px;
  cursor: pointer;
`;

const ButtonBlock = styled(Row)`
  margin-top: 20px;
  width: 100%;
  justify-content: space-around;
  color: white;
`;

const LoadingWrapper = styled(Center)<TotemBackground>`
  width: 100%;
  height: calc(100% - 45px);
  .MuiCircularProgress-root {
    position: initial;
  }
  .MuiCircularProgress-colorPrimary {
    color: ${props => props.background};
  }
`;
