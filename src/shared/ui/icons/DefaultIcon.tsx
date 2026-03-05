import IonIcon from '@reacticons/ionicons'
import { resolveSize } from '@shared/lib'
import type { BaseIconProps } from '@shared/model'
import type { ComponentProps } from 'react'

type IonIconName = ComponentProps<typeof IonIcon>['name']

interface BaseIconRenderProps extends BaseIconProps {
  name: IonIconName
  solidName?: IonIconName
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
  const resolvedName: IonIconName =
    variant === 'filled' && solidName ? solidName : name

  return (
    <IonIcon
      name={resolvedName}
      style={{
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
  )
}