import { useMemo, useState } from 'react'
import { BottomNavBar } from '../components/BottomNavBar'
import { BudgetInfoRow } from '../components/BudgetInfoRow'
import { ConsejosModal } from '../components/ConsejosModal'
import { EditarPresupuestoModal } from '../components/EditarPresupuestoModal'
import { MobileScreen } from '../components/MobileScreen'
import { PrimaryButton } from '../components/PrimaryButton'
import { TopBrandTitle } from '../components/TopBrandTitle'
import { getAjustesIniciales } from '../Data/ajustesStorage'
import { getConsejoAleatorio, getEstado } from '../Data/consejos'
import { getGastoDiaActual, getGastoSemanaActual } from '../Data/movimientosStorage'
import type { PageName } from '../types/navigation'

const labelPorPeriodo = {
    Mensual: { presupuesto: 'Presupuesto mensual:', meta: 'Meta semanal recomendada:', gasto: 'Esta semana has usado:' },
    Semanal: { presupuesto: 'Presupuesto semanal:', meta: 'Meta diaria recomendada:', gasto: 'Hoy has usado:' },
} as const

type PresupuestoPageProps = {
    onNavigate?: (page: PageName) => void
}

function formatCOP(value: number): string {
    return `$${new Intl.NumberFormat('es-CO').format(value)}`
}

function calcularMeta(presupuesto: number, periodo: 'Mensual' | 'Semanal'): number {
    return periodo === 'Mensual' ? Math.round(presupuesto / 4) : Math.round(presupuesto / 7)
}

export function PresupuestoPage({ onNavigate }: PresupuestoPageProps) {
    const ajustes = useMemo(() => getAjustesIniciales(), [])
    const [presupuesto, setPresupuesto] = useState(() => ajustes?.presupuesto ?? 0)

    // 'Diarios' ya no aplica — si existía en localStorage lo tratamos como 'Mensual'
    const periodo: 'Mensual' | 'Semanal' =
        ajustes?.periodo === 'Semanal' ? 'Semanal' : 'Mensual'
    const labels = labelPorPeriodo[periodo]
    const meta = useMemo(() => calcularMeta(presupuesto, periodo), [presupuesto, periodo])

    // Gasto real según el período: semanal para Mensual, diario para Semanal
    const gastoReal = useMemo(
        () => (periodo === 'Mensual' ? getGastoSemanaActual() : getGastoDiaActual()),
        []
    )

    const excedido = Math.max(0, gastoReal - meta)
    const estado = getEstado(gastoReal, meta)

    const [modalConsejos, setModalConsejos] = useState(false)
    const [consejo, setConsejo] = useState('')
    const [modalEditar, setModalEditar] = useState(false)

    function handleAbrirConsejos() {
        setConsejo(getConsejoAleatorio(estado))
        setModalConsejos(true)
    }

    return (
        <>
            {modalConsejos && (
                <ConsejosModal
                    consejo={consejo}
                    estado={estado}
                    onClose={() => setModalConsejos(false)}
                    onNuevoConsejo={() => setConsejo(getConsejoAleatorio(estado))}
                />
            )}

            {modalEditar && ajustes && (
                <EditarPresupuestoModal
                    presupuestoActual={presupuesto}
                    onClose={() => setModalEditar(false)}
                    onGuardado={(nuevo) => {
                        setPresupuesto(nuevo)
                        setModalEditar(false)
                    }}
                />
            )}

            <MobileScreen>
                <TopBrandTitle />

                <h1 className="mt-4 text-center text-3xl leading-tight font-bold text-title sm:text-5xl">
                    Tu Presupuesto:
                </h1>

                <div className="mt-6 flex flex-col">
                    <BudgetInfoRow
                        label={labels.presupuesto}
                        value={formatCOP(presupuesto)}
                    />
                    <BudgetInfoRow
                        label={labels.meta}
                        value={formatCOP(meta)}
                    />
                    <BudgetInfoRow
                        label={labels.gasto}
                        value={formatCOP(gastoReal)}
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

                    <PrimaryButton text="Editar" onClick={() => setModalEditar(true)} />
                </div>

                <div className="h-30" aria-hidden />
            </MobileScreen>

            <div className="fixed inset-x-0 bottom-0 z-40 w-full">
                <BottomNavBar activeTab="presupuesto" onTabChange={onNavigate} />
            </div>
        </>
    )
}
