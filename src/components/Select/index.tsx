import { Icon } from '@yandex/ui/Icon/desktop/bundle';
import { Select as YandexSelect, ISelectProps } from '@yandex/ui/Select/desktop/bundle';
import React, { useCallback, useState } from 'react';

import { ReactComponent as ExpandIcon } from 'assets/icons/arrow-bottom.svg';
import { cn, classnames } from 'utils';

import './style.scss';

const b = cn('select');

export type SelectProps = {
  invalid?: boolean;
  controlled?: boolean;
  options?: {
    value: string;
    icon: string;
    id: string;
    content: JSX.Element;
    checkedText: string;
  }[];
} & Omit<ISelectProps, 'Options'>;

function Select(props: SelectProps) {
  const { className, onChange, defaultValue, invalid, value, controlled, ...selectProps } = props;
  const [selectedValue, setSelectedValue] = useState<string | string[] | undefined>(
    (typeof defaultValue === 'number' ? `${defaultValue}` : defaultValue) as
      | string
      | string[]
      | undefined,
  );

  const handleSelectChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedValue(e.target.value);
      if (onChange) {
        onChange(e);
      }
    },
    [onChange],
  );

  const icon = selectProps.options.find((o) => o.value === value)?.icon;

  return (
    <div
      className={b({
        invalid,
        selected: controlled ? !!value : !!selectedValue,
        'with-icon': !!icon,
      })}
    >
      <YandexSelect
        theme="normal"
        size="m"
        className={classnames(className, b('select'))}
        renderTriggerIcon={() => <ExpandIcon className={b('icon')} />}
        addonBefore={<Icon className={b('before-icon')} url={icon} />}
        onChange={handleSelectChange}
        value={controlled ? value : selectedValue}
        {...(selectProps as any)}
      />
    </div>
  );
}

export { Select as Component };

export { Option as OptionComponent } from './Option';

export type {
  Option,
  ISelectProps,
  OptionGroup,
  OptionSimple,
} from '@yandex/ui/Select/desktop/bundle';
