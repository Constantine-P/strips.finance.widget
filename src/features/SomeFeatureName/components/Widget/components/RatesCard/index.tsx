import { Text } from '@yandex/ui/Text/desktop/bundle';
import React from 'react';

import { ActionButton } from 'components';
import { cn } from 'utils';

import './style.scss';

const b = cn('rates-card');

type Props = {
  titleLeft: string;
  titleRight: string;
  valueLeft: number;
  valueRight: number;
};

export function RatesCard(props: Props) {
  const { titleLeft, titleRight, valueLeft, valueRight } = props;

  return (
    <section className={b()}>
      <div className={b('wrapper')}>
        <Text className={b('title')} typography="body-short-xl" align="end">
          {titleLeft}
        </Text>
        <Text className={b('value')} typography="body-short-xl" weight="medium" align="end">
          {valueLeft}%
        </Text>
      </div>
      <ActionButton className={b('button')} size="s">
        ⇄
      </ActionButton>
      <div className={b('wrapper')}>
        <Text className={b('title')} typography="body-short-xl" align="start">
          {titleRight}
        </Text>
        <Text className={b('value')} typography="body-short-xl" weight="medium" align="start">
          {valueRight}%
        </Text>
      </div>
    </section>
  );
}
