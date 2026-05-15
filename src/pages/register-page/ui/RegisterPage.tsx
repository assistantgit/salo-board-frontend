import { BGLayout } from '@widgets/bg-layout';
import { RegisterForm } from '@widgets/register-form';
import { BG_LAYOUT_CONFIG } from '../config/BGLayout';

export function RegisterPage() {
  return (
    <div className='register-page'>
      <BGLayout bgConfig={BG_LAYOUT_CONFIG}>
        <RegisterForm />
      </BGLayout>
    </div>
  );
}
