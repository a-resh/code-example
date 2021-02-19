/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { Header } from './containers/Header';
import { Wrapper } from './containers/Wrapper/Loadable';
import { Sidebar } from './components/Sidebar';
import { PullContainer } from './containers/PullContainer/Loadable';
import { UserData } from './containers/UserData/Loadable';
import { Content } from './containers/Content';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="Totem Defy"
        defaultTitle="Totem Defy"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Totem" />
      </Helmet>
      <Header />
      <Wrapper>
        <Sidebar />
        <Content>
          <Switch>
            <Route exact path="/" component={PullContainer} />
            <Route exact path="/fox" component={PullContainer} />
            <Route exact path="/wolf" component={PullContainer} />
            <Route exact path="/owl" component={PullContainer} />
            <Route exact path="/user" component={UserData} />
            <Route component={NotFoundPage} />
          </Switch>
        </Content>
      </Wrapper>
      <GlobalStyle />
    </BrowserRouter>
  );
}
