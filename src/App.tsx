import { useState } from 'react'
import { AjustesIniciales } from './pages/AjustesInicialesPage'
import { AjustesPage } from './pages/AjustesPage'
import { HomePage } from './pages/HomePage'
import { InicioPage } from './pages/InicioPage'
import { PresupuestoPage } from './pages/PresupuestoPage'
import { getAjustesIniciales } from './Data/ajustesStorage'
import type { PageName } from './types/navigation'

export function App() {
  const [currentPage, setCurrentPage] = useState<PageName>('inicio')

  function handleComenzar() {
    const datosGuardados = getAjustesIniciales()
    setCurrentPage(datosGuardados ? 'home' : 'ajustes-iniciales')
  }

  if (currentPage === 'ajustes-iniciales') {
    return <AjustesIniciales onContinue={() => setCurrentPage('home')} />
  }

  if (currentPage === 'home') {
    return <HomePage onNavigate={setCurrentPage} />
  }

  if (currentPage === 'presupuesto') {
    return <PresupuestoPage onNavigate={setCurrentPage} />
  }

  if (currentPage === 'ajustes') {
    return <AjustesPage onNavigate={setCurrentPage} />
  }

  return <InicioPage onStart={handleComenzar} />
}
