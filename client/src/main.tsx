import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { store } from './store'
import './index.css'
import App from './App.tsx'

// Create emotion cache
const cache = createCache({
  key: 'css',
  prepend: true,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CacheProvider value={cache}>
      <Provider store={store}>
        <App />
      </Provider>
    </CacheProvider>
  </StrictMode>,
)
