import type IonIcon from '@reacticons/ionicons';
import type { ComponentProps } from 'react';

type IonIconNativeProps = ComponentProps<typeof IonIcon>;

export type IconSizePreset = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

export type IconSize = IconSizePreset | number;

export type IconVariant = 'outline' | 'sharp' | 'filled';

export interface BaseIconProps extends Omit<IonIconNativeProps, 'name' | 'size'> {
  size?: IconSize;
  variant?: IconVariant;
  'aria-label'?: string;
}
