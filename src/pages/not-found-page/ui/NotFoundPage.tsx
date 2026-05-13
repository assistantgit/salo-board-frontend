import { BGLayout } from '@widgets/bg-layout';
import { useNavigate } from 'react-router-dom';
import './NotFoundPage.css';
import { BG_LAYOUT_CONFIG } from '../config/BGLayout';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className='not-found-wrapper'>
      <BGLayout bgConfig={BG_LAYOUT_CONFIG} style={{ flex: 1 }}>
        <div className='not-found-content'>
          <p className='not-found-code'>404</p>

          <h1 className='not-found-title'>Сторінку не знайдено</h1>

          <p className='not-found-description'>
            Здається, ця сторінка втекла разом із залишками сала. Але ми знайдемо щось смачніше для
            вас!
          </p>

          <button type='button' className='not-found-btn' onClick={() => navigate('/')}>
            Повернутися на головну
          </button>
        </div>
      </BGLayout>
    </div>
  );
};

export default NotFoundPage;
