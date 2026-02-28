import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ComencemosPage } from './pages/ComencemosPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ComencemosPage />
  </StrictMode>,
)
