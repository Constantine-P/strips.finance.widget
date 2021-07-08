import React, { useCallback } from 'react';

import { cn } from 'utils';

import { Widget } from './components';

import './style.scss';

const b = cn('some-feature-name');

export const SomeFeatureName = () => {
  const handleWidgetSubmit = useCallback((data) => {
    console.log(data);
  }, []);

  return (
    <article className={b()}>
      <Widget onSubmit={handleWidgetSubmit} />
    </article>
  );
};
