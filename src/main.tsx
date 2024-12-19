import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './context/theme-provider.tsx'
import QueryProvider from './context/query-provider.tsx'
import { Toaster } from './components/ui/toaster.tsx'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ColorThemeProvider } from './context/theme-swither.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider defaultTheme="dark" storageKey="app-ui-theme">
        <ColorThemeProvider defaultTheme='default' storageKey='app-color-theme'>
          <App />
          <Toaster />
        </ColorThemeProvider>
      </ThemeProvider>
    </QueryProvider>
  </StrictMode>,
)
