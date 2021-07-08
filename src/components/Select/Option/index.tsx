import { Text } from '@yandex/ui/Text/desktop/bundle';
import React from 'react';

import { cn } from 'utils';

import './style.scss';

const b = cn('select-option');

export const Option: React.FC = ({ children }) => {
  return (
    <Text typography="body-short-m" className={b()}>
      {children}
    </Text>
  );
};
