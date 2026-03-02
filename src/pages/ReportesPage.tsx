import { useMemo, useState } from 'react'
import { BottomNavBar } from '../components/Menus/BottomNavBar'
import { MobileScreen } from '../components/MobileScreen'
import { ReporteAccordionItem } from '../components/Menus/ReporteAccordionItem'
import { ReporteBarChart } from '../components/Graphics/ReporteBarChart'
import { TopBrandTitle } from '../components/TopBrandTitle'
import { getMovimientos } from '../Data/movimientosStorage'

type SectionId = 'categoria' | 'valor' | 'dia' | 'semanal'

function formatCOP(value: number): string {
    return `$${new Intl.NumberFormat('es-CO').format(value)}`
}

function formatFechaCorta(isoDate: string): string {
    const fecha = new Date(`${isoDate}T12:00:00`)
    return fecha.toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })
}

function inicioDeSemana(isoDate: string): string {
    const fecha = new Date(`${isoDate}T12:00:00`)
    const dia = fecha.getDay()
    const diasDesdeLunes = (dia + 6) % 7
    fecha.setDate(fecha.getDate() - diasDesdeLunes)
    return fecha.toISOString().slice(0, 10)
}

function finDeSemana(isoInicio: string): string {
    const fecha = new Date(`${isoInicio}T12:00:00`)
    fecha.setDate(fecha.getDate() + 6)
    return fecha.toISOString().slice(0, 10)
}

type FilaResumenProps = {
    label: string
    value: string
    secondary?: string
}

function FilaResumen({ label, value, secondary }: FilaResumenProps) {
    return (
        <div className="flex items-center justify-between border-b border-zinc-200 py-3 last:border-b-0">
            <div className="min-w-0">
                <p className="truncate text-[16px] font-medium text-zinc-900 sm:text-xl">{label}</p>
                {secondary && <p className="text-[13px] text-zinc-500 sm:text-lg">{secondary}</p>}
            </div>
            <p className="ml-4 text-[16px] font-semibold text-zinc-900 sm:text-xl">{value}</p>
        </div>
    )
}

function PlaceholderReporte() {
    return (
        <div className="mt-2 flex h-56 items-center justify-center">
            <p className="text-center text-[16px] font-medium text-zinc-500 sm:text-xl">
                No hay datos actualmente.
            </p>
        </div>
    )
}

export function ReportesPage() {
    const [openSection, setOpenSection] = useState<SectionId | null>('categoria')
    const movimientos = useMemo(() => getMovimientos(), [])

    const porCategoria = useMemo(() => {
        const totales = new Map<string, { total: number; cantidad: number }>()

        movimientos.forEach((movimiento) => {
            const actual = totales.get(movimiento.categoria)
            if (!actual) {
                totales.set(movimiento.categoria, { total: movimiento.monto, cantidad: 1 })
                return
            }
            totales.set(movimiento.categoria, {
                total: actual.total + movimiento.monto,
                cantidad: actual.cantidad + 1,
            })
        })

        return Array.from(totales.entries())
            .map(([categoria, data]) => ({ categoria, ...data }))
            .sort((a, b) => b.total - a.total)
    }, [movimientos])

    const porValor = useMemo(
        () => [...movimientos].sort((a, b) => b.monto - a.monto).slice(0, 8),
        [movimientos],
    )

    const porDia = useMemo(() => {
        const totales = new Map<string, { total: number; cantidad: number }>()

        movimientos.forEach((movimiento) => {
            const actual = totales.get(movimiento.fecha)
            if (!actual) {
                totales.set(movimiento.fecha, { total: movimiento.monto, cantidad: 1 })
                return
            }
            totales.set(movimiento.fecha, {
                total: actual.total + movimiento.monto,
                cantidad: actual.cantidad + 1,
            })
        })

        return Array.from(totales.entries())
            .map(([fecha, data]) => ({ fecha, ...data }))
            .sort((a, b) => (a.fecha < b.fecha ? 1 : -1))
    }, [movimientos])

    const reporteSemanal = useMemo(() => {
        const totales = new Map<string, { total: number; cantidad: number }>()

        movimientos.forEach((movimiento) => {
            const inicio = inicioDeSemana(movimiento.fecha)
            const actual = totales.get(inicio)
            if (!actual) {
                totales.set(inicio, { total: movimiento.monto, cantidad: 1 })
                return
            }
            totales.set(inicio, {
                total: actual.total + movimiento.monto,
                cantidad: actual.cantidad + 1,
            })
        })

        return Array.from(totales.entries())
            .map(([inicio, data]) => ({ inicio, fin: finDeSemana(inicio), ...data }))
            .sort((a, b) => (a.inicio < b.inicio ? 1 : -1))
    }, [movimientos])

    function toggleSection(section: SectionId) {
        setOpenSection((current) => (current === section ? null : section))
    }

    return (
        <>
            <MobileScreen>
                <TopBrandTitle />

                <h1 className="mt-4 text-center text-5xl leading-tight font-bold text-title sm:text-6xl">
                    Tus Movimientos
                </h1>

                <div className="mt-8 flex flex-col border-t border-border">
                    <ReporteAccordionItem
                        title="Por categoría"
                        isOpen={openSection === 'categoria'}
                        onToggle={() => toggleSection('categoria')}
                    >
                        {porCategoria.length === 0 ? (
                            <PlaceholderReporte />
                        ) : (
                            <div className="mt-2 rounded-lg px-3">
                                <ReporteBarChart
                                    title="Distribución por categoría"
                                    data={porCategoria.slice(0, 5).map((item) => ({
                                        name: item.categoria,
                                        total: item.total,
                                    }))}
                                    formatValue={formatCOP}
                                />

                                {porCategoria.map((item) => (
                                    <FilaResumen
                                        key={item.categoria}
                                        label={item.categoria}
                                        secondary={`${item.cantidad} movimiento${item.cantidad === 1 ? '' : 's'}`}
                                        value={formatCOP(item.total)}
                                    />
                                ))}
                            </div>
                        )}
                    </ReporteAccordionItem>

                    <ReporteAccordionItem
                        title="Por valor"
                        isOpen={openSection === 'valor'}
                        onToggle={() => toggleSection('valor')}
                    >
                        {porValor.length === 0 ? (
                            <PlaceholderReporte />
                        ) : (
                            <div className="mt-2 rounded-lg px-3">


                                {porValor.map((movimiento) => (
                                    <FilaResumen
                                        key={movimiento.id}
                                        label={movimiento.categoria}
                                        secondary={formatFechaCorta(movimiento.fecha)}
                                        value={formatCOP(movimiento.monto)}
                                    />
                                ))}
                            </div>
                        )}
                    </ReporteAccordionItem>

                    <ReporteAccordionItem
                        title="Por día"
                        isOpen={openSection === 'dia'}
                        onToggle={() => toggleSection('dia')}
                    >
                        {porDia.length === 0 ? (
                            <PlaceholderReporte />
                        ) : (
                            <div className="mt-2 rounded-lg px-3">
                                <ReporteBarChart
                                    title="Gasto total por día"
                                    data={[...porDia]
                                        .sort((a, b) => (a.fecha > b.fecha ? 1 : -1))
                                        .slice(0, 5)
                                        .map((item) => ({
                                            name: item.fecha,
                                            total: item.total,
                                        }))}
                                    formatValue={formatCOP}
                                />

                                {porDia.map((item) => (
                                    <FilaResumen
                                        key={item.fecha}
                                        label={item.fecha}
                                        secondary={`${item.cantidad} movimiento${item.cantidad === 1 ? '' : 's'}`}
                                        value={formatCOP(item.total)}
                                    />
                                ))}
                            </div>
                        )}
                    </ReporteAccordionItem>

                    <ReporteAccordionItem
                        title="Reporte semanal"
                        isOpen={openSection === 'semanal'}
                        onToggle={() => toggleSection('semanal')}
                    >
                        {reporteSemanal.length === 0 ? (
                            <PlaceholderReporte />
                        ) : (
                            <div className="mt-2 rounded-lg px-3">
                                <ReporteBarChart
                                    title="Comparativo semanal"
                                    data={reporteSemanal.slice(0, 5).map((item) => ({
                                        name: `${formatFechaCorta(item.inicio)}-${formatFechaCorta(item.fin)}`,
                                        total: item.total,
                                    }))}
                                    formatValue={formatCOP}
                                />

                                {reporteSemanal.map((item) => (
                                    <FilaResumen
                                        key={item.inicio}
                                        label={`${formatFechaCorta(item.inicio)} - ${formatFechaCorta(item.fin)}`}
                                        secondary={`${item.cantidad} movimiento${item.cantidad === 1 ? '' : 's'}`}
                                        value={formatCOP(item.total)}
                                    />
                                ))}
                            </div>
                        )}
                    </ReporteAccordionItem>
                </div>

                <div className="h-32" aria-hidden />
            </MobileScreen>

            <div className="fixed inset-x-0 bottom-[env(safe-area-inset-bottom)] z-40 w-full">
                <BottomNavBar />
            </div>
        </>
    )
}