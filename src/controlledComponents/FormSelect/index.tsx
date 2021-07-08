import React, { useCallback } from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';

import { Select, ErrorHint } from 'components';
import { cn, classnames } from 'utils';

import './style.scss';

const b = cn('form-select');

type Props<T extends FieldValues> = Omit<Select.SelectProps, 'value'> & UseControllerProps<T>;

function FormSelect<T extends FieldValues>({
  className,
  name,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...selectProps
}: Props<T>) {
  const {
    fieldState,
    field: { ref: fieldRef, onChange: fieldOnChange, onBlur, ...field },
  } = useController({
    name,
    defaultValue,
    rules,
    shouldUnregister,
  });
  const { invalid, error } = fieldState;

  const handleSelectChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) {
        onChange(e);
      }
      fieldOnChange(e);
    },
    [fieldOnChange, onChange],
  );

  return (
    <div className={classnames(className, b())}>
      <Select.Component
        aria-invalid={invalid}
        onChange={handleSelectChange}
        invalid={invalid}
        controlled
        {...(selectProps as any)}
        {...field}
      />
      <ErrorHint error={error} />
    </div>
  );
}

export { FormSelect as Component };

export { OptionComponent } from 'components/Select';

export type { Option, ISelectProps, OptionGroup, OptionSimple } from 'components/Select';
