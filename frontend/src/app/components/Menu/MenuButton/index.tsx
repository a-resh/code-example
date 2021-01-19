/**
 *
 * MenuButton
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';

interface Props {
  name?: string;
  icon: string;
}

export const MenuButton = memo(({ name, icon }: Props) => {
  const buttonColors = {
    fox: '#FF6600',
    wolf: '#455461',
    owl: '#739BA2',
    uniswap: '#272E38',
  };
  return (
    <Div>
      {icon}
      {name || null}
    </Div>
  );
});
interface ButtonProps {
  color: string;
}
const Div = styled.div<ButtonProps>`
  height: 100%;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.color};
`;
