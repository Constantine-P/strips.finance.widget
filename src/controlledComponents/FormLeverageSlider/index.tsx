import { Slider, useSliderState } from '@yandex/ui/Slider/desktop/bundle';
import { SliderThumb, SliderThumbProps } from '@yandex/ui/Slider/Thumb/Slider-Thumb';
import {
  SliderTickLabel,
  SliderTickLabelProps,
} from '@yandex/ui/Slider/TickLabel/Slider-TickLabel';
import React, { useCallback } from 'react';
import { useController } from 'react-hook-form';

import { ErrorHint } from 'components';
import { cn } from 'utils';

import './style.scss';

const MIN_VALUE = 1;
const MAX_VALUE = 10;

const Thumb: React.FC<SliderThumbProps> = (props) => {
  return <SliderThumb className={b('thumb')} {...props} />;
};

const Tick: React.FC<SliderTickLabelProps> = (props) => {
  const { index } = props;
  const value = (index + 1) % 5 === 0 || index === 0 ? `${index + 1}x` : '';
  return <SliderTickLabel {...props}>{value}</SliderTickLabel>;
};

const b = cn('form-leverage-slider');

type Props = {
  defaultValue?: [number];
};

export function FormLeverageSlider(props: Props) {
  const { defaultValue } = props;
  const { field, fieldState } = useController({
    name: 'leverage',
    defaultValue,
  });
  const { value: fieldValue, onChange: fieldOnChange } = field;
  const { error } = fieldState;

  const state = useSliderState({ value: [fieldValue] });

  const handleChange = useCallback(
    (e: unknown, value: number[]) => {
      fieldOnChange(value[0]);
    },
    [fieldOnChange],
  );

  return (
    <div className={b()}>
      <Slider
        className={b()}
        view="default"
        showTickValues
        min={MIN_VALUE}
        max={MAX_VALUE}
        filled
        renderThumb={Thumb}
        renderTickLabel={Tick}
        onChange={handleChange}
        {...state}
      />
      <ErrorHint error={error} />
    </div>
  );
}
