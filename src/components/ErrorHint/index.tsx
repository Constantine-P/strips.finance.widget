import { Text } from '@yandex/ui/Text/desktop/bundle';
import React from 'react';

import { cn, classnames } from 'utils';

import './style.scss';

const b = cn('error-hint');

type Props = {
  error:
    | {
        message?: string;
      }
    | undefined;
  isVisible?: boolean;
};

export const ErrorHint: React.FC<Props> = ({ error, isVisible = true }) => {
  return (
    <div className={b()}>
      {isVisible && error && (
        <Text
          className={classnames('Textinput-Hint', b('message'))}
          typography="body-short-s"
          color="alert"
        >
          {error.message}
        </Text>
      )}
    </div>
  );
};
