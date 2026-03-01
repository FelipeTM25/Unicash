import { useMemo, useState } from 'react'
import { BottomNavBar } from '../components/BottomNavBar'
import { BudgetInfoRow } from '../components/BudgetInfoRow'
import { ConsejosModal } from '../components/ConsejosModal'
import { MobileScreen } from '../components/MobileScreen'
import { PrimaryButton } from '../components/PrimaryButton'
import { TopBrandTitle } from '../components/TopBrandTitle'
import { calcularMetaSemanal, getAjustesIniciales } from '../Data/ajustesStorage'
import { getConsejoAleatorio, getEstado } from '../Data/consejos'

import type { PageName } from '../types/navigation'

type PresupuestoPageProps = {
    onNavigate?: (page: PageName) => void
}

function formatCOP(value: number): string {
    return `$${new Intl.NumberFormat('es-CO').format(value)}`
}

export function PresupuestoPage({ onNavigate }: PresupuestoPageProps) {
    const ajustes = useMemo(() => getAjustesIniciales(), [])
    const metaSemanal = useMemo(() => ajustes ? calcularMetaSemanal(ajustes) : 0, [ajustes])

    // Gasto semanal: en 0 hasta que exista el módulo de movimientos
    const gastoSemanal = 0
    const excedido = Math.max(0, gastoSemanal - metaSemanal)
    const estado = getEstado(gastoSemanal, metaSemanal)

    const [modalAbierto, setModalAbierto] = useState(false)
    const [consejo, setConsejo] = useState('')

    function handleAbrirConsejos() {
        setConsejo(getConsejoAleatorio(estado))
        setModalAbierto(true)
    }

    function handleNuevoConsejo() {
        setConsejo(getConsejoAleatorio(estado))
    }

    const labelPresupuesto = ajustes?.periodo === 'Mensual'
        ? 'Presupuesto mensual:'
        : ajustes?.periodo === 'Semanal'
            ? 'Presupuesto semanal:'
            : 'Presupuesto diario:'

    return (
        <>
            {modalAbierto && (
                <ConsejosModal
                    consejo={consejo}
                    estado={estado}
                    onClose={() => setModalAbierto(false)}
                    onNuevoConsejo={handleNuevoConsejo}
                />
            )}

            <MobileScreen>
                <TopBrandTitle />

                <h1 className="mt-4 text-center text-3xl leading-tight font-bold text-title sm:text-5xl">
                    Tu Presupuesto:
                </h1>

                <div className="mt-6 flex flex-col">
                    <BudgetInfoRow
                        label={labelPresupuesto}
                        value={ajustes ? formatCOP(ajustes.presupuesto) : '$0'}
                    />
                    <BudgetInfoRow
                        label="Meta semanal recomendada:"
                        value={formatCOP(metaSemanal)}
                    />
                    <BudgetInfoRow
                        label="Esta semana has usado:"
                        value={formatCOP(gastoSemanal)}
                    />
                    <BudgetInfoRow
                        label="Te pasaste por:"
                        value={formatCOP(excedido)}
                    />
                </div>

                <div className="mt-8 flex flex-col gap-4">
                    <button
                        type="button"
                        onClick={handleAbrirConsejos}
                        className="w-full rounded-2xl border-2 border-button-primary bg-transparent py-3 text-[16px] font-medium text-button-primary transition-all duration-200 hover:bg-button-primary/10 active:scale-[0.99] sm:text-2xl"
                    >
                        Consejos para tus movimientos
                    </button>

                    <PrimaryButton text="Editar" />
                </div>

                <div className="h-30" aria-hidden />
            </MobileScreen>

            <div className="fixed inset-x-0 bottom-0 z-40 w-full">
                <BottomNavBar activeTab="presupuesto" onTabChange={onNavigate} />
            </div>
        </>
    )
}
