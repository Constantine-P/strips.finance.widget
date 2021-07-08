import { Button, IButtonProps } from '@yandex/ui/Button/desktop/bundle';
import React from 'react';

import { cn, classnames } from 'utils';

import './style.scss';

const b = cn('action-button');

export type ActionButtonProps = {
  className?: string;
  color?: 'project';
  solid?: boolean;
} & IButtonProps;

type Props = ActionButtonProps;

export const ActionButton: React.FC<Props> = ({
  className,
  children,
  color = 'project',
  solid = true,
  ...props
}) => {
  return (
    <Button
      className={classnames(className, b({ color, solid }))}
      view={solid ? 'action' : 'link'}
      size="l"
      width="max"
      {...props}
    >
      {children}
    </Button>
  );
};
