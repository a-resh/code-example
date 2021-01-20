import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '../../components/Header';
import {ContentWrapper} from "../../components/ContentWrapper";

export function HomePage() {
  const isMobile = false;
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <Header isMobile={isMobile} />
      <ContentWrapper isMobile={isMobile}/>
    </>
  );
}
