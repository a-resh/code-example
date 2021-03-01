/**
 *
 * ErrorModal
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import Modal from 'react-modal';
import { TotemsData } from '../../../../../types/constants';
import {
  ModalHeader,
  TotemWrapper,
} from '../../../PullContainer/components/PredictModal/components';
import { Icon } from '../../../../components/Icon';
import { TotemModalHeader } from '../ConnectMetamaskModal';
import { Center } from '../../../../components/blocks';

interface Props {
  isOpen: boolean;
  close: () => void;
  totem: string;
}

export const ErrorModal = ({ isOpen, close, totem }: Props) => {
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
      <TotemModalHeader background={TotemsData.WOLF.color}>
        <TotemWrapper background={TotemsData.WOLF.color}>
          <Icon url={`wolf-white.svg`} height={20} width={20}></Icon>
        </TotemWrapper>
        <p>Error</p>
        <Icon
          url={`close-${isMobile ? 'grey' : 'white'}.svg`}
          height={15}
          width={15}
          cursor={'pointer'}
          onClick={close}
        ></Icon>
      </TotemModalHeader>
      <ModalContent>
        <p>Something went terribly wrong...</p>
      </ModalContent>
    </Modal>
  );
};

const ModalContent = styled(Center)`
  width: 100%;
  height: calc(100% - 50px);
  p {
    font-family: Lato;
    font-size: 20px;
  }
`;
