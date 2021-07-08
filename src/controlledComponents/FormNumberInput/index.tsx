import { ITextinputProps, Textinput } from '@yandex/ui/Textinput/desktop/bundle';
import { BigNumber } from 'bignumber.js';
import React, { useCallback, useMemo } from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';

import { cn, classnames } from 'utils';

import './style.scss';

const b = cn('form-number-input');

const sizesDict = {
  s: 's',
  m: 'm',
  l: 'm',
} as const;

export type FormNumberInput<T extends FieldValues> = {
  precision?: number;
  size?: 's' | 'm' | 'l';
} & Omit<ITextinputProps, 'size' | 'type'> &
  UseControllerProps<T>;

type Props<T extends FieldValues> = FormNumberInput<T>;

const DEFAULT_PRECISION = 5;

function FormTextInput<T extends FieldValues>(props: Props<T>) {
  const {
    className,
    name,
    defaultValue,
    rules,
    shouldUnregister,
    size = 'm',
    precision,
    ...textInputProps
  } = props;
  const { iconRight, iconLeft, ...inputProps } = textInputProps;
  const { fieldState, field } = useController({
    name,
    defaultValue,
    rules,
    shouldUnregister,
  });
  const {
    ref: fieldRef,
    onChange: fieldOnChange,
    onBlur: fieldOnBlur,
    value: fieldValue,
    ...fieldProps
  } = field;
  const { error, invalid } = fieldState;
  const handleTextInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = new BigNumber(e.target?.value || 0).decimalPlaces(
      precision ?? DEFAULT_PRECISION,
      BigNumber.ROUND_DOWN,
    );
    fieldOnChange(value);
  }, []);
  const handleTextInputBlur = useCallback(() => {
    fieldOnBlur();
  }, [fieldOnBlur]);
  const value = useMemo(() => (fieldValue as BigNumber.Instance).toNumber(), [fieldValue]);

  return (
    <div className={b({ size })}>
      <Textinput
        className={classnames(className, b('input'))}
        view="default"
        size={sizesDict[size ?? 'm']}
        state={invalid ? 'error' : undefined}
        hint={error?.message ?? ''}
        iconRight={iconRight}
        iconLeft={iconLeft}
        renderControl={() => (
          <input
            className="Textinput-Control"
            ref={fieldRef}
            type="number"
            inputMode="decimal"
            onChange={handleTextInputChange}
            onBlur={handleTextInputBlur}
            value={value === 0 ? '' : value}
            step="0.00001"
            {...fieldProps}
            {...inputProps}
          />
        )}
      />
    </div>
  );
}

export { FormTextInput as Component };
