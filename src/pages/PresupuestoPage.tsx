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
import { getGastoDia, getGastoSemana, labelDia, labelSemana } from '../Data/movimientosStorage'
import type { PageName } from '../types/navigation'

const labelPorPeriodo = {
    Mensual: { presupuesto: 'Presupuesto mensual:', meta: 'Meta semanal recomendada:', gasto: 'Has usado:' },
    Semanal: { presupuesto: 'Presupuesto semanal:', meta: 'Meta diaria recomendada:', gasto: 'Has usado:' },
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
    const [offset, setOffset] = useState(0)

    // 'Diarios' ya no aplica — si existía en localStorage lo tratamos como 'Mensual'
    const periodo: 'Mensual' | 'Semanal' =
        ajustes?.periodo === 'Semanal' ? 'Semanal' : 'Mensual'
    const labels = labelPorPeriodo[periodo]
    const meta = useMemo(() => calcularMeta(presupuesto, periodo), [presupuesto, periodo])

    const gastoReal = periodo === 'Mensual' ? getGastoSemana(offset) : getGastoDia(offset)
    const periodoLabel = periodo === 'Mensual' ? labelSemana(offset) : labelDia(offset)

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
                    <BudgetInfoRow label={labels.presupuesto} value={formatCOP(presupuesto)} />
                    <BudgetInfoRow label={labels.meta} value={formatCOP(meta)} />

                    {/* Paginación */}
                    <div className="flex items-center justify-between border-b border-zinc-300 py-3">
                        <button
                            onClick={() => setOffset((o) => o - 1)}
                            className="rounded-lg px-3 py-1 text-xl text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                            aria-label="Período anterior"
                        >
                            ‹
                        </button>
                        <span className="text-[14px] font-semibold text-zinc-600 sm:text-xl">
                            {periodoLabel}
                        </span>
                        <button
                            onClick={() => setOffset((o) => o + 1)}
                            disabled={offset >= 0}
                            className="rounded-lg px-3 py-1 text-xl text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-30"
                            aria-label="Período siguiente"
                        >
                            ›
                        </button>
                    </div>

                    <BudgetInfoRow label={labels.gasto} value={formatCOP(gastoReal)} />
                    <BudgetInfoRow label="Te pasaste por:" value={formatCOP(excedido)} />
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