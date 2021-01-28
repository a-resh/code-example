/**
 *
 * Sidebar
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { Menu } from '../Menu';
import { Icon } from '../Icon';
import media from 'styled-media-query';
import { mediaQueries } from '../../../types/constants';

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

const Div = styled.div`
  width: 200px;
  background-color: #272e38;
  display: flex;
  flex-direction: column;
  ${mediaQueries.lessThan('small')`
    display: none;
  `}
  ${mediaQueries.lessThan('large')`
    width: 80px;
  `}
`;
const SidebarBottom = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: flex-end;
  padding-bottom: 20px;
  background-color: #c4dbe0;
`;
