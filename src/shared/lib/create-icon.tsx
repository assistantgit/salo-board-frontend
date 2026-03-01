import type { ComponentProps } from 'react'
import IonIcon from '@reacticons/ionicons'

import type { BaseIconProps } from '../model/icon.types'
import { BaseIcon } from '@shared/ui/icons/BaseIcon'

type IonIconName = ComponentProps<typeof IonIcon>['name']

export function createIcon(outlineName: IonIconName, solidName?: IonIconName) {
  const Icon = (props: BaseIconProps) => (
    <BaseIcon
      name={outlineName}
      solidName={solidName}
      {...props}
    />
  )

  Icon.displayName = outlineName
    .replace(/-outline$/, '')
    .replace(/(^\w|-\w)/g, (c) => c.replace('-', '').toUpperCase())
    .concat('Icon')

  return Icon
}