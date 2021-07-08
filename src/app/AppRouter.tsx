import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { RoutePrivate } from 'containers/RoutePrivate';
import { MainPage } from 'pages';

type Props = {
  isAuthorized: boolean;
};

const AppRouter = (props: Props) => {
  const { isAuthorized } = props;
  return (
    <Router>
      <Switch>
        <RoutePrivate isAuthorized={isAuthorized} path="/" exact to="/" component={MainPage} />
      </Switch>
    </Router>
  );
};

export { AppRouter };
