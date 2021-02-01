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

interface Props {}

export const Sidebar = memo(({}: Props) => {
  return (
    <Div>
      <Menu isLogin={true} />
      <SidebarBottom>
        <Icon
          url={'telegram-dark.svg'}
          width={30}
          height={30}
          margin={'0 0 15px 15px'}
          cursor={'pointer'}
        />
        <Icon
          url={'twitter-dark.svg'}
          width={30}
          height={30}
          margin={'0 0 0 15px'}
          cursor={'pointer'}
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
