import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AuthProvider from 'react-auth-kit'
import store from './AuthStore.tsx'
import { HeroUIProvider } from '@heroui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider store={store}>
        <HeroUIProvider>
          <App />
        </HeroUIProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
