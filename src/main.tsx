import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AuthProvider  from 'react-auth-kit'
import store from './AuthStore.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider store={store}>
      <App />
    </AuthProvider>
  </StrictMode>,
)
