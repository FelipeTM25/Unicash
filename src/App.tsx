import { Navigate, Route, Routes } from 'react-router-dom'
import { getAjustesIniciales } from './Data/ajustesStorage'
import { AjustesIniciales } from './pages/AjustesInicialesPage'
import { AjustesPage } from './pages/AjustesPage'
import { EditarCategoriasPage } from './pages/EditarCategoriasPage'
import { HistorialMovimientosPage } from './pages/HistorialMovimientosPage'
import { HomePage } from './pages/HomePage'
import { InicioPage } from './pages/InicioPage'
import { PresupuestoPage } from './pages/PresupuestoPage'
import { ReportesPage } from './pages/ReportesPage'

export function App() {
  const hasAjustesIniciales = Boolean(getAjustesIniciales())

  return (
    <Routes>
      <Route path="/" element={<Navigate to={hasAjustesIniciales ? '/home' : '/inicio'} replace />} />
      <Route path="/inicio" element={<InicioPage />} />
      <Route path="/ajustes-iniciales" element={<AjustesIniciales />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/presupuesto" element={<PresupuestoPage />} />
      <Route path="/reportes" element={<ReportesPage />} />
      <Route path="/ajustes" element={<AjustesPage />} />
      <Route path="/ajustes/editar-categorias" element={<EditarCategoriasPage />} />
      <Route path="/ajustes/historial" element={<HistorialMovimientosPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
