import React from 'react';

import { SomeFeatureName } from 'features/SomeFeatureName';
import { cn } from 'utils';

import './style.scss';

const b = cn('main-page');

export function MainPage() {
  return (
    <div className={b()}>
      <SomeFeatureName />
    </div>
  );
}
