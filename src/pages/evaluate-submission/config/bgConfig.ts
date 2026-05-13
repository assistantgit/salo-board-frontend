import type { BGConfig } from '@shared/model';

/**
 * Background configuration for the Evaluation Page.
 * Matches the decorative circular patterns from the design.
 */
export const EVALUATION_BG_CONFIG: BGConfig = {
  circles: [
    {
      id: 'c1',
      xPercent: 10,
      yPercent: 15,
      ellipses: [
        {
          id: 'e1a',
          layer: 0,
          zIndex: 0,
          width: 380,
          height: 380,
          offsetX: 0,
          offsetY: 0,
          rotation: 0,
          borderRadius: '50%',
          borderWidth: 1.2,
        },
        {
          id: 'e1b',
          layer: 1,
          zIndex: 1,
          width: 240,
          height: 240,
          offsetX: 0,
          offsetY: 0,
          rotation: 10,
          borderRadius: '50%',
          borderWidth: 1,
        },
      ],
    },
    {
      id: 'c2',
      xPercent: 90,
      yPercent: 80,
      ellipses: [
        {
          id: 'e2a',
          layer: 0,
          zIndex: 0,
          width: 450,
          height: 450,
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
