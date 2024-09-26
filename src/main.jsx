import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CityProvider } from './context/CityContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CityProvider>
      <App />
    </CityProvider>
  </StrictMode>,
)
