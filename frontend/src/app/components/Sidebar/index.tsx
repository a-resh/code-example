/**
 *
 * Sidebar
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { Menu } from '../Menu';
import { Icon } from '../Icon';
import { mediaQueries } from '../../../types/constants';
import { Column } from '../blocks';
import { useSelector } from 'react-redux';
import { userSelector } from '../../containers/Wrapper/selectors';

interface Props {}

export const Sidebar = memo(({}: Props) => {
  const user = useSelector(userSelector);
  return (
    <Div>
      <Menu isLogin={!!user.id} />
      <SidebarBottom>
        <Icon
          url={'telegram-dark.svg'}
          width={30}
          height={30}
          margin={'0 0 15px 15px'}
          cursor={'pointer'}
          onClick={() => window.open('https://t.me/totemfi', '_blank')}
        />
        <Icon
          url={'twitter-dark.svg'}
          width={30}
          height={30}
          margin={'0 0 0 15px'}
          cursor={'pointer'}
          onClick={() => window.open('https://twitter.com/TotemFi', '_blank')}
        />
      </SidebarBottom>
    </Div>
  );
});

const Div = styled(Column)`
  width: 200px;
  background-color: #272e38;
  ${mediaQueries.lessThan('small')`
    display: none;
  `}
  ${mediaQueries.lessThan('large')`
    width: 80px;
  `}
`;
const SidebarBottom = styled(Column)`
  width: 100%;
  height: 100%;
  align-items: end;
  justify-content: flex-end;
  padding-bottom: 20px;
  background-color: #c4dbe0;
`;
