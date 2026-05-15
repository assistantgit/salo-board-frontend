import type React from 'react';
import './AuthErrorBanner.css';

interface AuthErrorBannerProps {
  message?: string;
}

export const AuthErrorBanner: React.FC<AuthErrorBannerProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className='auth-error-banner' role='alert'>
      {message}
    </div>
  );
};
