/**
 *
 * Header
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { Menu } from '../../components/Menu';
import { ConnectButton } from '../../components/ConnectButton';
import { Icon } from '../../components/Icon';
import { mediaQueries } from '../../../types/constants';
import { Row } from '../../components/blocks';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../Wrapper/selectors';
import { wrapperActions } from '../Wrapper/slice';
import { isShowPredictModalSelector } from '../PullContainer/selectors';

interface Props {}

export function Header({}: Props) {
  const { setUserAddress } = wrapperActions;
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const isShowModal = useSelector(isShowPredictModalSelector);
  return (
    <Div hidden={isShowModal}>
      <MenuWrapper>
        <Menu isLogin={!!user.publicAddress} isMobile={true} />
      </MenuWrapper>
      <IconWrapper>
        <Icon url={'logo-white.svg'} width={90} height={25} />
      </IconWrapper>
      <DesktopButton>
        <ConnectButton
          address={user.publicAddress}
          onConnectWallet={() => dispatch(setUserAddress(false))}
        />
      </DesktopButton>
      <MobileButton onClick={() => {}}>
        <Icon
          url={'uniswap-black.svg'}
          width={15}
          height={15}
          onClick={() =>
            window.open(
              `https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=${process.env.REACT_APP_UNISWAP_CONTRACT_ADDRESS}`,
              '_blank',
            )
          }
        />
      </MobileButton>
    </Div>
  );
}

const Div = styled(Row)<{ hidden?: boolean }>`
  width: 100%;
  height: 80px;
  background-color: #272e38;
  justify-content: space-between;
  align-items: center;
  padding-left: 15px;
  ${mediaQueries.lessThan('small')`
    z-index: 10;
    background-color: #739ba2;
    height: 45px;
    position: fixed;
    padding: 0 10px 0 0;
  `}
  ${mediaQueries.between('small', 'large')` 
    padding-left: calc(50% - 45px);
    height: 55px;
  `}
  @media screen and (max-width: 450px) {
    display: ${props => (props.hidden ? 'none' : 'flex')};
  }
`;
const MenuWrapper = styled.div`
  height: 100%;
  ${mediaQueries.greaterThan('small')`
    display: none;
    `}
`;
const IconWrapper = styled.div`
  ${mediaQueries.lessThan('small')`
    display: none;
    `}
`;

const DesktopButton = styled.div`
  height: 100%;
  ${mediaQueries.lessThan('small')`
    display: none;
    `}
`;
const MobileButton = styled.div`
  ${mediaQueries.greaterThan('small')`
    display: none;
    `}
`;
