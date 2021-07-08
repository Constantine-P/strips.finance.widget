import React, { useCallback, useMemo } from 'react';

import NerveIcon from 'assets/icons/nerve.svg';
import { FormSelect } from 'controlledComponents';
import { cn } from 'utils';
import './style.scss';

const b = cn('widget-select');

type Props = {
  onChange?(countryID: string): void;
  defaultValue?: string;
};

export const WidgetSelect: React.FC<Props> = ({ onChange, defaultValue }) => {
  const options = useMemo(() => {
    return [
      {
        content: <FormSelect.OptionComponent>Nerve 🢒 3pool</FormSelect.OptionComponent>,
        value: '1',
        checkedText: 'Nerve 🢒 3pool',
        id: '1',
        icon: NerveIcon,
      },
      {
        content: <FormSelect.OptionComponent>Nerve 🢒 3pool 2</FormSelect.OptionComponent>,
        value: '2',
        checkedText: 'Nerve 🢒 3pool 2',
        id: '2',
        icon: '',
      },
    ];
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const nextValue = e.target.value;
      if (onChange) {
        onChange(nextValue);
      }
    },
    [onChange],
  );

  return (
    <FormSelect.Component
      name="select"
      className={b()}
      options={options}
      onChange={handleChange}
      defaultValue={defaultValue}
    />
  );
};
