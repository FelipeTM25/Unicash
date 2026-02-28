import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { InicioPage } from './pages/InicioPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InicioPage />
  </StrictMode>,
)
