import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AjustesIniciales } from './pages/AjustesInicialesPage.tsx'
import { InicioPage } from './pages/InicioPage.tsx'
import { HomePage } from './pages/HomePage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HomePage />
  </StrictMode>,
)
