import { BGLayout } from '@widgets/bg-layout';
import { Header } from '@widgets/header';
import { Hero } from '@widgets/hero';
import { TournamentBoard } from '@widgets/tournament-board';
import { BG_LAYOUT_CONFIG } from '../config/BGLayout';
import './HomePage.css';

export function HomePage() {
  return (
    <div>
      <Header />
      <BGLayout bgConfig={BG_LAYOUT_CONFIG} className='home-page'>
        <Hero />
        <TournamentBoard />
      </BGLayout>
    </div>
  );
}
