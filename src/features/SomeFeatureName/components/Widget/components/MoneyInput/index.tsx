import { Text } from '@yandex/ui/Text/desktop/bundle';
import { BigNumber } from 'bignumber.js';
import React from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { ReactComponent as BUSDIcon } from 'assets/icons/busd.svg';
import { ActionButton } from 'components';
import { FormNumberInput } from 'controlledComponents';
import { cn } from 'utils';

import { WidgetData } from '../../index';

import './style.scss';

const b = cn('money-input');

type Props = {
  setValue?: UseFormSetValue<WidgetData>;
  name: keyof WidgetData;
  placeholder: string;
  balance?: BigNumber.Instance;
  precision?: number;
};

export function MoneyInput(props: Props) {
  const { name, setValue, balance, placeholder, precision } = props;

  const handleMaxButtonClick = () => {
    if (!setValue || balance === undefined) return;
    setValue(name, balance);
  };

  const BUSDRender = (
    <div className={b('addon')}>
      {balance !== undefined && (
        <Text className={b('balance')} typography="body-short-m" weight="medium">
          Balance {balance.toNumber()}
        </Text>
      )}
      <div className={b('currency')}>
        {balance !== undefined && (
          <ActionButton className={b('max-button')} size="s" onClick={handleMaxButtonClick}>
            MAX
          </ActionButton>
        )}
        <BUSDIcon className={b('currency-icon')} />
        <Text className={b('currency-name')} typography="body-short-m" weight="medium">
          BUSD
        </Text>
      </div>
    </div>
  );

  return (
    <FormNumberInput.Component
      className={b()}
      size="m"
      iconRight={BUSDRender}
      name={name}
      maxLength={40}
      placeholder={placeholder}
      min="0"
      precision={precision}
    />
  );
}
