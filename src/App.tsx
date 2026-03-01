import { useState } from 'react'
import { AjustesIniciales } from './pages/AjustesInicialesPage'
import { HomePage } from './pages/HomePage'
import { InicioPage } from './pages/InicioPage'
import { PresupuestoPage } from './pages/PresupuestoPage'
import type { PageName } from './types/navigation'

export function App() {
  const [currentPage, setCurrentPage] = useState<PageName>('presupuesto')

  if (currentPage === 'ajustes-iniciales') {
    return <AjustesIniciales onContinue={() => setCurrentPage('home')} />
  }

  if (currentPage === 'home') {
    return <HomePage onNavigate={setCurrentPage} />
  }

  if (currentPage === 'presupuesto') {
    return <PresupuestoPage onNavigate={setCurrentPage} />
  }

  return <InicioPage onStart={() => setCurrentPage('ajustes-iniciales')} />
}
