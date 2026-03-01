import { BottomNavBar } from '../components/BottomNavBar'
import { MobileScreen } from '../components/MobileScreen'
import { TopBrandTitle } from '../components/TopBrandTitle'
import type { PageName } from '../types/navigation'

type EditarCategoriasPageProps = {
    onNavigate?: (page: PageName) => void
}

export function EditarCategoriasPage({ onNavigate }: EditarCategoriasPageProps) {
    return (
        <>
            <MobileScreen>
                <TopBrandTitle />

                <div className="mt-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-zinc-950 sm:text-4xl">
                        Editar Categorías
                    </h1>
                </div>
            </MobileScreen>

            <div className="fixed inset-x-0 bottom-0 z-40 w-full">
                <BottomNavBar activeTab="ajustes" onTabChange={onNavigate} />
            </div>
        </>
    )
}
