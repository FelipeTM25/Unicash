import { useState } from 'react'
import { BottomNavBar } from '../components/BottomNavBar'
import { ConfirmacionModal } from '../components/ConfirmacionModal'
import { MovimientoItem } from '../components/MovimientoItem'
import { MobileScreen } from '../components/MobileScreen'
import { RegistrarGastoModal } from '../components/RegistrarGastoModal'
import { TopBrandTitle } from '../components/TopBrandTitle'
import { agregarMovimiento, eliminarMovimiento, getMovimientos, type Movimiento } from '../Data/movimientosStorage'
import type { PageName } from '../types/navigation'

type HistorialMovimientosPageProps = {
    onNavigate?: (page: PageName) => void
}

export function HistorialMovimientosPage({ onNavigate }: HistorialMovimientosPageProps) {
    const [movimientos, setMovimientos] = useState<Movimiento[]>(() => getMovimientos())
    const [idEliminar, setIdEliminar] = useState<string | null>(null)
    const [mostrarRegistrar, setMostrarRegistrar] = useState(false)

    function handleGuardarGasto(categoria: string, monto: number, fecha: string) {
        const nuevo = agregarMovimiento({ categoria, monto, fecha })
        setMovimientos((prev) => [nuevo, ...prev])
        setMostrarRegistrar(false)
    }

    function handleEliminarConfirmado() {
        if (!idEliminar) return
        eliminarMovimiento(idEliminar)
        setMovimientos((prev) => prev.filter((m) => m.id !== idEliminar))
        setIdEliminar(null)
    }

    return (
        <>
            <MobileScreen>
                <TopBrandTitle />

                <div className="mt-4">
                    <h1 className="text-2xl font-bold text-zinc-950 sm:text-4xl">
                        Historial de Movimientos
                    </h1>
                </div>

                <div className="mt-4 flex flex-col gap-3 pb-8">
                    {movimientos.length === 0 ? (
                        <p className="mt-8 text-center text-[15px] text-zinc-400 sm:text-xl">
                            Aún no hay movimientos registrados.
                        </p>
                    ) : (
                        movimientos.map((m) => (
                            <MovimientoItem
                                key={m.id}
                                categoria={m.categoria}
                                monto={m.monto}
                                fecha={m.fecha}
                                onDelete={() => setIdEliminar(m.id)}
                            />
                        ))
                    )}
                </div>
            </MobileScreen>

            {mostrarRegistrar && (
                <RegistrarGastoModal
                    onClose={() => setMostrarRegistrar(false)}
                    onGuardado={handleGuardarGasto}
                />
            )}

            {idEliminar && (
                <ConfirmacionModal
                    mensaje="¿Eliminar este movimiento?"
                    labelConfirmar="Eliminar"
                    labelCancelar="Cancelar"
                    onConfirmar={handleEliminarConfirmado}
                    onCancelar={() => setIdEliminar(null)}
                />
            )}

            <div className="fixed inset-x-0 bottom-0 z-40 w-full">
                <div className="flex justify-center bg-transparent py-3">
                    <button
                        onClick={() => setMostrarRegistrar(true)}
                        className="flex items-center gap-2 rounded-full bg-button-primary px-6 py-3 text-[15px] font-semibold text-white shadow-lg transition-all hover:bg-title active:scale-[0.97] sm:text-xl"
                        aria-label="Registrar gasto"
                    >
                        + Registrar gasto
                    </button>
                </div>
                <BottomNavBar activeTab="ajustes" onTabChange={onNavigate} />
            </div>
        </>
    )
}
