/**
 *
 * Content
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';

interface Props {
  children: JSX.Element;
}

export function Content({ children }: Props) {
  return <Div>{children}</Div>;
}

const Div = styled.div`
  display: flex;
  justify-content: center;
  width: calc(100vw - 200px);
  align-items: center;
  padding: 20px 0;
  @media only screen and (max-width: 1100px) {
    width: calc(100vw - 80px);
  }
  @media only screen and (max-width: 900px) {
    width: calc(100vw - 55px);
  }
`;
