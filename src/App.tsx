import { useState } from 'react'
import { ComencemosPage } from './pages/ComencemosPage'
import { InicioPage } from './pages/InicioPage'

type PageName = 'inicio' | 'comencemos'

export function App() {
  const [currentPage, setCurrentPage] = useState<PageName>('inicio')

  if (currentPage === 'comencemos') {
    return <ComencemosPage />
  }

  return <InicioPage onStart={() => setCurrentPage('comencemos')} />
}
