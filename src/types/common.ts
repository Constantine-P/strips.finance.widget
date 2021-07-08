import React from 'react';

export interface RouteProps {
  component: React.ComponentType<any>;
  exact?: boolean;
  isAuthorized: boolean;
  path: string;
  to?: string;
}
