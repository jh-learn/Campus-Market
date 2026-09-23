import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

async function bootstrap () {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser.ts')
    await worker.start({
      onUnhandledRequest: 'bypass', // 静态资源等未匹配请求放行
      serviceWorker: { url: '/mockServiceWorker.js' },
    })
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />  
    </StrictMode>
  )
}

bootstrap()