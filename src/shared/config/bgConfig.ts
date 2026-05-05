import type { BGConfig } from '@shared/model';

/**
 * Subtle background decoration for the admin content area.
 * Keeps the same visual language as tournament details.
 */
export const ADMIN_BG_CONFIG: BGConfig = {
  circles: [
    {
      id: 'ad-c1',
      xPercent: 90,
      yPercent: 10,
      ellipses: [
        {
          id: 'ad-e1a',
          layer: 0,
          zIndex: 0,
          width: 400,
          height: 400,
          offsetX: 0,
          offsetY: 0,
          rotation: 0,
          borderRadius: '50%',
          borderWidth: 1.2,
        },
        {
          id: 'ad-e1b',
          layer: 1,
          zIndex: 1,
          width: 240,
          height: 240,
          offsetX: 0,
          offsetY: 0,
          rotation: 25,
          borderRadius: '50%',
          borderWidth: 1,
        },
      ],
    },
    {
      id: 'ad-c2',
      xPercent: 5,
      yPercent: 80,
      ellipses: [
        {
          id: 'ad-e2a',
          layer: 0,
          zIndex: 0,
          width: 320,
          height: 320,
          offsetX: 0,
          offsetY: 0,
          rotation: 0,
          borderRadius: '50%',
          borderWidth: 1.2,
        },
        {
          id: 'ad-e2b',
          layer: 1,
          zIndex: 1,
          width: 180,
          height: 180,
          offsetX: 0,
          offsetY: 0,
          rotation: -20,
          borderRadius: '50%',
          borderWidth: 1,
        },
      ],
    },
  ],
};
