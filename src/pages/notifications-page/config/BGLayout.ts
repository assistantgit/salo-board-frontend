import type { BGConfig } from '@shared/model';

/**
 * Background configuration for the Home Page.
 */
export const BG_LAYOUT_CONFIG: BGConfig = {
  tileHeight: 1100,
  tileGap: 300,
  mobileMaxCircles: 2,
  mobileScale: 0.5,
  circles: [
    {
      id: 'notif-c1',
      xPercent: 100,
      yPercent: 0,
      ellipses: [
        {
          id: 'ne1a',
          layer: 0,
          zIndex: 0,
          width: 400,
          height: 400,
          offsetX: 0,
          offsetY: 0,
          rotation: -10,
          borderRadius: '50%',
          borderWidth: 32,
        },
        {
          id: 'ne1b',
          layer: 2,
          zIndex: 1,
          width: 400,
          height: 400,
          offsetX: 5,
          offsetY: -5,
          rotation: -90,
          borderRadius: '50%',
          borderWidth: 32,
        },
        {
          id: 'ne1c',
          layer: 1,
          zIndex: 2,
          width: 400,
          height: 400,
          offsetX: 2,
          offsetY: -2,
          rotation: -10,
          borderRadius: '50%',
          borderWidth: 32,
        },
      ],
    },
  ],
  images: [
    {
      id: 'notif-paper1',
      src: 'paper.svg',
      xPercent: 5,
      yPercent: 40,
      width: 150,
      height: 220,
      rotation: 10,
      opacity: 0.8,
    },
  ],
};
