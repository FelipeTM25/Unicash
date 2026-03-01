import { AjustesMenuItem } from '../components/AjustesMenuItem'
import { BottomNavBar } from '../components/BottomNavBar'
import { MobileScreen } from '../components/MobileScreen'
import { TopBrandTitle } from '../components/TopBrandTitle'
import type { PageName } from '../types/navigation'

type AjustesPageProps = {
    onNavigate?: (page: PageName) => void
}

export function AjustesPage({ onNavigate }: AjustesPageProps) {
    return (
        <>
            <MobileScreen>
                <TopBrandTitle />

                <h1 className="mt-4 text-center text-3xl leading-tight font-bold text-zinc-950 sm:text-5xl">
                    Ajustes
                </h1>

                <div className="mt-6 flex flex-col">
                    <AjustesMenuItem label="Editar Categorías" />
                    <AjustesMenuItem label="Cambiar Presupuesto" />
                    <AjustesMenuItem label="Resetear Datos" />
                    <AjustesMenuItem label="Historial de Movimientos" />
                </div>
            </MobileScreen>

            <div className="fixed inset-x-0 bottom-0 z-40 w-full">
                <BottomNavBar activeTab="ajustes" onTabChange={onNavigate} />
            </div>
        </>
    )
}
