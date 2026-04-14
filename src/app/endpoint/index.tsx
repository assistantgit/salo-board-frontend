import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/globals.css'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider, AuthProvider, QueryProvider } from '@app/providers'
import { router } from '@app/routes/routes'

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
)