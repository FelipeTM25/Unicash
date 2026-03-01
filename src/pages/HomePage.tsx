import { useState } from 'react'
import { BottomNavBar } from '../components/BottomNavBar'
import { BudgetStatusBadge } from '../components/BudgetStatusBadge'
import { MobileScreen } from '../components/MobileScreen'
import { RegistrarGastoModal } from '../components/RegistrarGastoModal'
import { TopBrandTitle } from '../components/TopBrandTitle'
import { getAjustesIniciales } from '../Data/ajustesStorage'
import { agregarMovimiento, getGastoDiaActual } from '../Data/movimientosStorage'
import type { PageName } from '../types/navigation'

function formatCOP(value: number): string {
    return `$${new Intl.NumberFormat('es-CO').format(value)}`
}

type HomePageProps = {
    onNavigate?: (page: PageName) => void
}

export function HomePage({ onNavigate }: HomePageProps) {
    const [gastoHoy, setGastoHoy] = useState(() => getGastoDiaActual())
    const [mostrarRegistrar, setMostrarRegistrar] = useState(false)
    const nombreGuardado = getAjustesIniciales()?.nombre ?? ''
    const primerNombre = nombreGuardado.trim().split(/\s+/)[0] || 'User'

    function handleGuardarGasto(categoria: string, monto: number, fecha: string) {
        agregarMovimiento({ categoria, monto, fecha })
        setGastoHoy(getGastoDiaActual())
        setMostrarRegistrar(false)
    }

    return (
        <>
            <MobileScreen>
                <TopBrandTitle />

                <h1 className="mt-15 mb-5 text-center text-5xl leading-tight font-bold text-title sm:mt-6 sm:text-6xl">Hola, {primerNombre}!</h1>

                <h2 className="mt-10 text-center text-[30px] leading-tight font-bold text-zinc-950 sm:mt-14 sm:text-6xl">Hoy has usado:</h2>
                <p className="mt-5 text-center text-[40px] font-normal text-label sm:mt-7 sm:text-7xl">{formatCOP(gastoHoy)}</p>

                <BudgetStatusBadge message="Aún estás dentro de tu presupuesto" />

                <section className="mx-auto mt-10 w-full max-w-[80%] sm:mt-22">
                    {/* <h3 className="text-center text-[18px] leading-tight font-bold text-zinc-950 sm:text-7xl">
                        Ingresa tu nuevo movimiento
                    </h3> */}

                    <div className="mt-4 flex justify-center sm:mt-10">
                        <button
                            onClick={() => setMostrarRegistrar(true)}
                            className="flex items-center gap-2 rounded-full bg-button-primary px-10 py-5 text-[18px] font-semibold text-white shadow-lg transition-all hover:bg-title active:scale-[0.97] sm:text-xl"
                            aria-label="Registrar gasto"
                        >
                            + Registrar gasto
                        </button>
                    </div>

                </section>

                {/* <div className="h-30" aria-hidden /> */}
            </MobileScreen>

            {mostrarRegistrar && (
                <RegistrarGastoModal
                    onClose={() => setMostrarRegistrar(false)}
                    onGuardado={handleGuardarGasto}
                />
            )}

            <div className="fixed inset-x-0 bottom-[env(safe-area-inset-bottom)] z-40 w-full">
                <BottomNavBar activeTab="home" onTabChange={onNavigate} />
            </div>
        </>
    )
}
