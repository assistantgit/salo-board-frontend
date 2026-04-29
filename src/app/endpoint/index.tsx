import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/globals.css';
import { AuthProvider, QueryProvider, ThemeProvider } from '@app/providers';
import { router } from '@app/routes/routes';
import { RouterProvider } from 'react-router-dom';

window.addEventListener('auth:logout', () => {
  window.location.href = '/login';
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

createRoot(rootElement).render(
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
