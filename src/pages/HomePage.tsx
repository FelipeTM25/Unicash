import { useState } from 'react'
import { BottomNavBar } from '../components/Menus/BottomNavBar'
import { BudgetStatusBadge, type BudgetStatus } from '../components/BudgetStatusBadge'
import { MobileScreen } from '../components/MobileScreen'
import { RegistrarGastoModal } from '../components/Modals/RegistrarGastoModal'
import { TopBrandTitle } from '../components/TopBrandTitle'
import { getAjustesIniciales } from '../Data/ajustesStorage'
import { agregarMovimiento, getGastoDiaActual, getGastoMesActual, getGastoSemanaActual } from '../Data/movimientosStorage'

function formatCOP(value: number): string {
    return `$${new Intl.NumberFormat('es-CO').format(value)}`
}

export function HomePage() {
    const [gastoHoy, setGastoHoy] = useState(() => getGastoDiaActual())
    const [mostrarRegistrar, setMostrarRegistrar] = useState(false)
    const ajustes = getAjustesIniciales()
    const nombreGuardado = ajustes?.nombre ?? ''
    const primerNombre = nombreGuardado.trim().split(/\s+/)[0] || 'User'

    // Gasto acumulado en el periodo configurado
    const gastoPeriodo = ajustes?.periodo === 'Mensual'
        ? getGastoMesActual()
        : getGastoSemanaActual()

    function getBudgetStatus(): { message: string; status: BudgetStatus } {
        if (!ajustes || ajustes.presupuesto === 0) {
            return { message: 'Configura tu presupuesto para empezar a hacer seguimiento', status: 'ok' }
        }
        const ratio = gastoPeriodo / ajustes.presupuesto
        if (ratio >= 1.5) {
            return { message: 'Te fuiste muy lejos del presupuesto... Vale la pena revisar tus gastos', status: 'over' }
        }
        if (ratio >= 1) {
            return { message: 'Te pasaste un poco este periodo, ¡mañana es una nueva oportunidad!', status: 'over' }
        }
        if (ratio >= 0.8) {
            return { message: 'Vas cerca del límite de tu presupuesto, ¡tú puedes controlarlo!', status: 'warning' }
        }
        return { message: '¡Vas genial! Sigues dentro de tu presupuesto ', status: 'ok' }
    }

    const { message: budgetMessage, status: budgetStatus } = getBudgetStatus()

    function handleGuardarGasto(categoria: string, monto: number, fecha: string) {
        agregarMovimiento({ categoria, monto, fecha })
        setGastoHoy(getGastoDiaActual())
        setMostrarRegistrar(false)
    }

    return (
        <>
            <MobileScreen>
                <TopBrandTitle />

                <h1 className="mt-10 mb-4 text-center text-4xl leading-tight font-bold text-title sm:mt-8 sm:text-5xl md:text-6xl">Hola, {primerNombre}!</h1>

                <h2 className="mt-8 text-center text-2xl leading-tight font-bold text-zinc-950 sm:mt-10 sm:text-3xl md:text-4xl">Hoy has usado:</h2>
                <p className="mt-4 text-center text-4xl font-normal text-label sm:mt-6 sm:text-5xl md:text-6xl">{formatCOP(gastoHoy)}</p>

                <BudgetStatusBadge message={budgetMessage} status={budgetStatus} />

                <section className="mx-auto mt-5 w-full max-w-xl sm:mt-10 md:mt-12">
                    {/* <h3 className="text-center text-[18px] leading-tight font-bold text-zinc-950 sm:text-7xl">
                        Ingresa tu nuevo movimiento
                    </h3> */}

                    <div className="mt-2 flex justify-center sm:mt-5 md:mt-6">
                        <button
                            onClick={() => setMostrarRegistrar(true)}
                            className="flex items-center gap-2 rounded-full bg-button-primary px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-title active:scale-[0.97] sm:px-10 sm:py-5 sm:text-lg md:text-xl"
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
            <div className="h-0 lg:h-28 mdh-28" />
            <div className="fixed inset-x-0 bottom-[env(safe-area-inset-bottom)] z-40 w-full">
                <BottomNavBar />
            </div>
        </>
    )
}
