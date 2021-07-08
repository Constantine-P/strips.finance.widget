import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { RouteProps } from 'types';

export function RoutePublic({
  component: Component,
  isAuthorized,
  to = '/private',
  ...rest //
}: RouteProps) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthorized ? <Redirect to={{ pathname: to }} /> : <Component {...props} />
      }
    />
  );
}
