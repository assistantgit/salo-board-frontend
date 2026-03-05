import type { ComponentProps } from 'react'
import IonIcon from '@reacticons/ionicons'

import type { BaseIconProps } from '@shared/model'
import { BaseIcon } from '@shared/ui'

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