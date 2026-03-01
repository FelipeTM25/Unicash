import { FiTrash2 } from 'react-icons/fi'
import { getCategoriaIconInfo } from '../Data/categoriaIconos'
import { formatFecha } from '../Data/movimientosStorage'

type MovimientoItemProps = {
    categoria: string
    monto: number
    fecha: string
    onDelete: () => void
}

function formatCOP(value: number): string {
    return `$${new Intl.NumberFormat('es-CO').format(value)}`
}

export function MovimientoItem({ categoria, monto, fecha, onDelete }: MovimientoItemProps) {
    const iconInfo = getCategoriaIconInfo(categoria)

    return (
        <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            {/* Ícono de categoría */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-100 sm:h-16 sm:w-16">
                {iconInfo.tipo === 'icono' ? (
                    <iconInfo.Icon className="h-7 w-7 text-zinc-600 sm:h-9 sm:w-9" />
                ) : (
                    <div className={`flex h-full w-full items-center justify-center rounded-xl ${iconInfo.color}`}>
                        <span className="text-[18px] font-bold text-white sm:text-2xl">
                            {iconInfo.inicial}
                        </span>
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex flex-1 flex-col">
                <p className="text-[15px] font-bold capitalize text-zinc-900 sm:text-xl">
                    {categoria.charAt(0) + categoria.slice(1).toLowerCase()}
                </p>
                <p className="text-[14px] font-semibold text-zinc-700 sm:text-lg">
                    {formatCOP(monto)}
                </p>
                <p className="text-[12px] text-zinc-500 sm:text-base">
                    {formatFecha(fecha)}
                </p>
            </div>

            {/* Eliminar */}
            <button
                onClick={onDelete}
                className="text-zinc-400 transition-colors hover:text-red-500"
                aria-label="Eliminar movimiento"
            >
                <FiTrash2 size={18} />
            </button>
        </div>
    )
}
