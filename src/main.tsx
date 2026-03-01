import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AjustesIniciales } from './pages/AjustesInicialesPage.tsx'
import { InicioPage } from './pages/InicioPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InicioPage />
  </StrictMode>,
)
