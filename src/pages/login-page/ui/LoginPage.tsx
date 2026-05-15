import { BGLayout } from '@widgets/bg-layout';
import { LoginForm } from '@widgets/login-form';
import { BG_LAYOUT_CONFIG } from '../config/BGLayout';

export function LoginPage() {
  return (
    <div className='login-page'>
      <BGLayout bgConfig={BG_LAYOUT_CONFIG}>
        <LoginForm />
      </BGLayout>
    </div>
  );
}
