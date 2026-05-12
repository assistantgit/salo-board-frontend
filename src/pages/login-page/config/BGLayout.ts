import type { BGConfig } from '@shared/model';

/**
 * Background configuration for the Home Page.
 */
export const BG_LAYOUT_CONFIG: BGConfig = {
  tileHeight: 1000,
  tileGap: 500,
  mobileMaxCircles: 1,
  mobileScale: 0.5,
  circles: [
    {
      id: 'login-c1',
      xPercent: 85,
      yPercent: 20,
      ellipses: [
        {
          id: 'le1a',
          layer: 0,
          zIndex: 0,
          width: 450,
          height: 450,
          offsetX: 0,
          offsetY: 0,
          rotation: -10,
          borderRadius: '50%',
          borderWidth: 35,
        },
        {
          id: 'le1b',
          layer: 2,
          zIndex: 1,
          width: 450,
          height: 450,
          offsetX: 5,
          offsetY: 5,
          rotation: -45,
          borderRadius: '50%',
          borderWidth: 35,
        },
        {
          id: 'le1c',
          layer: 1,
          zIndex: 2,
          width: 450,
          height: 450,
          offsetX: 2,
          offsetY: 0,
          rotation: -10,
          borderRadius: '50%',
          borderWidth: 35,
        },
      ],
    },
  ],
  images: [
    {
      id: 'login-paper1',
      src: 'paper.svg',
      xPercent: 15,
      yPercent: 70,
      width: 160,
      height: 240,
      rotation: 15,
      opacity: 0.9,
    },
  ],
};
