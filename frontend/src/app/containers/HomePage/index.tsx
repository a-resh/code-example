import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '../../components/Header';
import { Menu } from '../../components/Menu';

export function HomePage() {
  const isMobile = true;
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <Header isMobile={isMobile} />
      {isMobile ? null : <Menu />}
      <span>HomePage container</span>
    </>
  );
}
