/**
 *
 * ConnectMetamaskModal
 *
 */
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';
import styled from 'styled-components/macro';
import {
  ModalHeader,
  TotemWrapper,
} from '../../../PullContainer/components/PredictModal/components';
import { mediaQueries, TotemsData } from '../../../../../types/constants';
import { Icon } from '../../../../components/Icon';
import { Center, Column, Row } from '../../../../components/blocks';
import { TotemBackground } from '../../../../../types/interfaces';

interface Props {
  isOpen: boolean;
  close: () => void;
  totem: string;
}

export const ConnectMetamaskModal = ({ isOpen, close, totem }: Props) => {
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
      <ModalHeaderMetamask background={TotemsData[totem].color}>
        <TotemWrapper background={TotemsData[totem].color}>
          <Icon url={`${totem}-white.svg`} height={20} width={20}></Icon>
        </TotemWrapper>
        <p>Connect to wallet</p>
        <Icon
          url={`close-${isMobile ? 'grey' : 'white'}.svg`}
          height={15}
          width={15}
          cursor={'pointer'}
          onClick={close}
        ></Icon>
      </ModalHeaderMetamask>
      <ModalContent>
        <WrapperLink
          background={TotemsData[totem].color}
          onClick={() => window.open('https://metamask.io', '_blank')}
        >
          {' '}
          <Message>
            <p>{t('Install Metamask')}</p>
            <small>{t('Sign in from metamask browser')}</small>
          </Message>
          <img src={'assets/images/metamask-icon.png'} width={24} height={24} />
        </WrapperLink>
      </ModalContent>
    </Modal>
  );
};

const ModalHeaderMetamask = styled(ModalHeader)`
  color: white;
  font-weight: 300;
  @media screen and (max-width: 450px) {
    background-color: ${props => props.background};
  }
`;

const WrapperLink = styled(Row)<TotemBackground>`
  cursor: pointer;
  width: 100%;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  border: 1px solid #12121236;
  font-size: 20px;

  :hover {
    border: 1px solid ${props => props.background};
  }
`;
const ModalContent = styled(Center)`
  width: 100%;
  height: calc(100% - 45px);
  padding: 20px;
`;
const Message = styled(Column)`
  small {
    font-size: 8px;
  }
  ${mediaQueries.greaterThan('large')`
  small{
    display: none;
    }
  `}
`;
