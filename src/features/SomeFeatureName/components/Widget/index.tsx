import { yupResolver } from '@hookform/resolvers/yup';
import { Text } from '@yandex/ui/Text/desktop/bundle';
import { BigNumber } from 'bignumber.js';
import React, { useLayoutEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';

import { ActionButton } from 'components';
import { FormLeverageSlider } from 'controlledComponents';
import { cn } from 'utils';

import { MoneyInput, RateCard, RatesCard, WidgetSelect } from './components';

import './style.scss';

const b = cn('widget');

const BALANCE = new BigNumber(1007.94);
const PRECISION = 5;

export type WidgetData = {
  select: string;
  positionSize: BigNumber.Instance;
  collateral: BigNumber.Instance;
  leverage: number;
};

const schema: yup.SchemaOf<WidgetData> = yup.object().shape({
  select: yup.string().ensure().required('Select is a required field'),
  positionSize: yup
    .object()
    .shape({
      c: yup.mixed().nullable(true).required(),
      e: yup.mixed().nullable(true).required(),
      s: yup.mixed().nullable(true).required(),
    })
    .test(
      'positive',
      'Position Size must be positive',
      (value: BigNumber.Instance) => value.toNumber() > 0,
    )
    .required(),
  collateral: yup
    .object()
    .shape({
      c: yup.mixed().nullable(true).required(),
      e: yup.mixed().nullable(true).required(),
      s: yup.mixed().nullable(true).required(),
    })
    .test('balance', 'balance exceeded', (value: BigNumber.Instance) =>
      value.isLessThanOrEqualTo(BALANCE),
    )
    .test(
      'positive',
      'Collateral must be positive',
      (value: BigNumber.Instance) => value.toNumber() > 0,
    )
    .required(),
  leverage: yup.number().required(),
});

type Props = {
  onSubmit(data: WidgetData): void;
};

export function Widget({ onSubmit }: Props) {
  const form = useForm<WidgetData>({
    resolver: yupResolver(schema),
    defaultValues: {
      positionSize: new BigNumber(0),
      collateral: new BigNumber(0),
      leverage: 1,
    },
    mode: 'all',
  });
  const { setValue, watch, trigger, formState, handleSubmit } = form;
  const { isDirty } = formState;
  const [positionSize, collateral, leverage] = watch(['positionSize', 'collateral', 'leverage']);
  const [positionSizeLocked, setPositionSizeLocked] = useState<boolean>(false);
  const [collateralLocked, setCollateralLocked] = useState<boolean>(false);

  const handleFormSubmit = handleSubmit((data) => {
    onSubmit(data);
  });

  useLayoutEffect(() => {
    if (collateral.isEqualTo(0) || positionSizeLocked) return;
    const positionSizeValue = new BigNumber(collateral)
      .multipliedBy(leverage)
      .decimalPlaces(PRECISION, BigNumber.ROUND_DOWN);
    if (positionSizeValue.isEqualTo(positionSize)) return;
    setValue('positionSize', positionSizeValue);
    setCollateralLocked(true);
    setTimeout(() => {
      setCollateralLocked(false);
    }, 0);
  }, [collateral]);

  useLayoutEffect(() => {
    if (positionSize.isEqualTo(0) || collateralLocked) return;
    const collateralValue = new BigNumber(positionSize)
      .dividedBy(leverage)
      .decimalPlaces(PRECISION, BigNumber.ROUND_DOWN);
    if (collateralValue.isEqualTo(collateral)) return;
    setValue('collateral', collateralValue);
    setPositionSizeLocked(true);
    setTimeout(() => {
      setPositionSizeLocked(false);
    }, 0);
    trigger();
  }, [positionSize]);

  useLayoutEffect(() => {
    setValue('collateral', new BigNumber(0));
    setValue('positionSize', new BigNumber(0));
  }, [leverage]);

  return (
    <article className={b()}>
      <FormProvider {...form}>
        <form name="widget" onSubmit={handleFormSubmit}>
          <header className={b('header')}>
            <Text className={b('title')} typography="headline-l" as="h2">
              Exchange
            </Text>
            <Text className={b('subtitle')} typography="headline-xs">
              Trade swaps in an instant
            </Text>
          </header>
          <section className={b('content')}>
            <WidgetSelect />
            <div className={b('rates')}>
              <RateCard title="Oracle (floating) rate" value={13.52} />
              <RateCard title="Market (fixed) rate" value={91.26} />
            </div>
            <MoneyInput placeholder="position size" name="positionSize" precision={PRECISION} />
            <section className={b('leverage')}>
              <FormLeverageSlider />
              <Text className={b('value')} typography="body-short-l" weight="medium" align="center">
                {`${leverage}x`}
              </Text>
            </section>
            <MoneyInput
              name="collateral"
              placeholder="collateral"
              balance={BALANCE}
              setValue={setValue}
              precision={PRECISION}
            />
            <RatesCard
              titleLeft="Pay Fixed"
              valueLeft={91.26}
              titleRight="Receive Floating"
              valueRight={13.52}
            />
            <ActionButton className={b('submit')} type="submit" size="m" disabled={!isDirty}>
              open long position
            </ActionButton>
            <Text className={b('value')} typography="body-short-l" weight="medium" align="center">
              Slippage Tolerance 3.00%
            </Text>
          </section>
        </form>
      </FormProvider>
    </article>
  );
}
