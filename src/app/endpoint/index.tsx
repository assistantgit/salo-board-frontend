import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/globals.css';
import { AuthProvider, QueryProvider, ThemeProvider } from '@app/providers';
import { router } from '@app/routes/routes';
import { RouterProvider } from 'react-router-dom';

window.addEventListener('auth:logout', () => {
  window.location.href = '/login';
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </QueryProvider>
  </StrictMode>,
);
