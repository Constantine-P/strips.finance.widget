import { Text } from '@yandex/ui/Text/desktop/bundle';
import React from 'react';

import { cn } from 'utils';

import './style.scss';

const b = cn('rate-card');

type Props = {
  title: string;
  value: number;
};

function getDirection(value: number) {
  if (value > 0) return 'up';
  if (value < 0) return 'down';
  return 'neutral';
}

export function RateCard(props: Props) {
  const { title, value } = props;

  return (
    <section className={b()}>
      <Text className={b('title')} typography="body-short-l">
        {title}
      </Text>
      <Text
        className={b('value', { direction: getDirection(value) })}
        typography="body-short-xl"
        weight="medium"
      >
        {value}%
      </Text>
    </section>
  );
}
