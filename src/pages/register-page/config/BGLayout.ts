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
      id: 'reg-c1',
      xPercent: 15,
      yPercent: 80,
      ellipses: [
        {
          id: 're1a',
          layer: 0,
          zIndex: 0,
          width: 480,
          height: 480,
          offsetX: 0,
          offsetY: 0,
          rotation: 20,
          borderRadius: '50%',
          borderWidth: 38,
        },
        {
          id: 're1b',
          layer: 2,
          zIndex: 1,
          width: 480,
          height: 480,
          offsetX: -5,
          offsetY: 5,
          rotation: 60,
          borderRadius: '50%',
          borderWidth: 38,
        },
        {
          id: 're1c',
          layer: 1,
          zIndex: 2,
          width: 480,
          height: 480,
          offsetX: -2,
          offsetY: 0,
          rotation: 20,
          borderRadius: '50%',
          borderWidth: 38,
        },
      ],
    },
  ],
  images: [
    {
      id: 'reg-paper1',
      src: 'paper.svg',
      xPercent: 85,
      yPercent: 30,
      width: 160,
      height: 240,
      rotation: -10,
      opacity: 0.9,
    },
  ],
};
