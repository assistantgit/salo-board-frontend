import IonIcon from '@reacticons/ionicons';
import type { BaseIconProps } from '@shared/model';
import type { ComponentProps } from 'react';
import { resolveSize } from '../../lib/resolve-size';

type IonIconName = ComponentProps<typeof IonIcon>['name'];

interface BaseIconRenderProps extends BaseIconProps {
  name: IonIconName;
  solidName?: IonIconName;
}

export function BaseIcon({
  name,
  solidName,
  size = 'md',
  variant = 'outline',
  className,
  onClick,
  style,
  'aria-label': ariaLabel,
  ...rest
}: BaseIconRenderProps) {
  const resolvedName: IonIconName = variant === 'filled' && solidName ? solidName : name;

  return (
    <IonIcon
      name={resolvedName}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: resolveSize(size),
        color: 'var(--color-icon, currentColor)',
        ...style,
      }}
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      role={onClick ? 'button' : undefined}
      {...rest}
    />
  );
}
