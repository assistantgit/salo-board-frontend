import type { BGConfig } from '@shared/model';
import { ActionInput, AttachIcon } from '@shared/ui';
import { BGLayout } from '@widgets/bg-layout';
import { Header } from '@widgets/header';
import { Hero } from '@widgets/hero';
import { TournamentBoard } from '@widgets/tournament-board';
import './HomePage.css';

/**
 * HomePage.
 * Composition Layer (FSD Page Layer).
 * Assembles widgets and features without direct business logic.
 */
const HOME_BG_CONFIG: BGConfig = {
  circles: [
    {
      id: 'c1',
      xPercent: 15,
      yPercent: 25,
      ellipses: [
        {
          id: 'e1a',
          layer: 0,
          zIndex: 0,
          width: 420,
          height: 420,
          offsetX: 0,
          offsetY: 0,
          rotation: 0,
          borderRadius: '50%',
          borderWidth: 1.5,
        },
        {
          id: 'e1b',
          layer: 1,
          zIndex: 1,
          width: 280,
          height: 280,
          offsetX: 0,
          offsetY: 0,
          rotation: 15,
          borderRadius: '50%',
          borderWidth: 1,
        },
        {
          id: 'e1c',
          layer: 2,
          zIndex: 2,
          width: 140,
          height: 140,
          offsetX: 0,
          offsetY: 0,
          rotation: 30,
          borderRadius: '50%',
          borderWidth: 1,
        },
      ],
    },
    {
      id: 'c2',
      xPercent: 82,
      yPercent: 70,
      ellipses: [
        {
          id: 'e2a',
          layer: 0,
          zIndex: 0,
          width: 500,
          height: 500,
          offsetX: 0,
          offsetY: 0,
          rotation: 0,
          borderRadius: '50%',
          borderWidth: 1.5,
        },
        {
          id: 'e2b',
          layer: 1,
          zIndex: 1,
          width: 320,
          height: 320,
          offsetX: 0,
          offsetY: 0,
          rotation: -20,
          borderRadius: '50%',
          borderWidth: 1,
        },
        {
          id: 'e2c',
          layer: 2,
          zIndex: 2,
          width: 160,
          height: 160,
          offsetX: 0,
          offsetY: 0,
          rotation: 10,
          borderRadius: '50%',
          borderWidth: 1,
        },
      ],
    },
    {
      id: 'c3',
      xPercent: 50,
      yPercent: 90,
      ellipses: [
        {
          id: 'e3a',
          layer: 0,
          zIndex: 0,
          width: 300,
          height: 300,
          offsetX: 0,
          offsetY: 0,
          rotation: 5,
          borderRadius: '50%',
          borderWidth: 1,
        },
        {
          id: 'e3b',
          layer: 1,
          zIndex: 1,
          width: 180,
          height: 180,
          offsetX: 0,
          offsetY: 0,
          rotation: 25,
          borderRadius: '50%',
          borderWidth: 1,
        },
      ],
    },
  ],
};

export function HomePage() {
  return (
    <div>
      <Header />
      <BGLayout bgConfig={HOME_BG_CONFIG} className='home-page'>
        <Hero />
        <TournamentBoard />
        <div className='home-demo-input'>
          <ActionInput
            label='Demo'
            icon={<AttachIcon size='sm' />}
            placeholder='Введіть DemoURL'
            onAction={(url) => console.log('Demo URL:', url)}
          />
        </div>
      </BGLayout>
    </div>
  );
}
