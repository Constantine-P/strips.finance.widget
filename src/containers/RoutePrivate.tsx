import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { RouteProps } from 'types';

export function RoutePrivate({
  component: Component,
  isAuthorized,
  to = '/',
  ...rest
}: RouteProps) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthorized ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: to,
              state: { redirect: props.location.pathname, isAuthorized },
            }}
          />
        )
      }
    />
  );
}
