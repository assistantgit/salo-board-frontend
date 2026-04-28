import type { BGConfig } from '@shared/model';

/**
 * Subtle background decoration for the tournament details content area.
 * Lighter than the tournament page — sidebar already defines the visual boundary.
 */
export const DETAILS_BG_CONFIG: BGConfig = {
  circles: [
    {
      id: 'td-c1',
      xPercent: 85,
      yPercent: 15,
      ellipses: [
        {
          id: 'td-e1a',
          layer: 0,
          zIndex: 0,
          width: 360,
          height: 360,
          offsetX: 0,
          offsetY: 0,
          rotation: 0,
          borderRadius: '50%',
          borderWidth: 1.2,
        },
        {
          id: 'td-e1b',
          layer: 1,
          zIndex: 1,
          width: 220,
          height: 220,
          offsetX: 0,
          offsetY: 0,
          rotation: 20,
          borderRadius: '50%',
          borderWidth: 1,
        },
        {
          id: 'td-e1c',
          layer: 2,
          zIndex: 2,
          width: 100,
          height: 100,
          offsetX: 0,
          offsetY: 0,
          rotation: 40,
          borderRadius: '50%',
          borderWidth: 1,
        },
      ],
    },
    {
      id: 'td-c2',
      xPercent: 10,
      yPercent: 75,
      ellipses: [
        {
          id: 'td-e2a',
          layer: 0,
          zIndex: 0,
          width: 300,
          height: 300,
          offsetX: 0,
          offsetY: 0,
          rotation: 0,
          borderRadius: '50%',
          borderWidth: 1.2,
        },
        {
          id: 'td-e2b',
          layer: 1,
          zIndex: 1,
          width: 180,
          height: 180,
          offsetX: 0,
          offsetY: 0,
          rotation: -15,
          borderRadius: '50%',
          borderWidth: 1,
        },
      ],
    },
  ],
};
