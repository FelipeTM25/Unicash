import { BottomNavBar } from '../components/BottomNavBar'
import { MobileScreen } from '../components/MobileScreen'
import { TopBrandTitle } from '../components/TopBrandTitle'

import type { PageName } from '../types/navigation'

type PresupuestoPageProps = {
    onNavigate?: (page: PageName) => void
}

export function PresupuestoPage({ onNavigate }: PresupuestoPageProps) {
    return (
        <>
            <MobileScreen>
                <TopBrandTitle />

                <h1 className="mt-4 text-center text-3xl leading-tight font-bold text-title sm:text-5xl">
                    Tu Presupuesto:
                </h1>
            </MobileScreen>

            <div className="fixed inset-x-0 bottom-0 z-40 w-full">
                <BottomNavBar activeTab="presupuesto" onTabChange={onNavigate} />
            </div>
        </>
    )
}
