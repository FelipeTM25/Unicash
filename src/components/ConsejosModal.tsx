import type { EstadoPresupuesto } from '../Data/consejos'

type ConsejosModalProps = {
    consejo: string
    estado: EstadoPresupuesto
    onClose: () => void
    onNuevoConsejo: () => void
}

const estadoConfig: Record<EstadoPresupuesto, { label: string; color: string }> = {
    bien: { label: '¡Vas muy bien!', color: 'text-title' },
    alerta: { label: '¡Atención!', color: 'text-yellow-600' },
    excedido: { label: '¡Te pasaste!', color: 'text-red-500' },
}

export function ConsejosModal({ consejo, estado, onClose, onNuevoConsejo }: ConsejosModalProps) {
    const config = estadoConfig[estado]

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6"
            onClick={onClose}
        >
            <div
                className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <p className={`text-center text-[20px] font-bold sm:text-3xl ${config.color}`}>
                    {config.label}
                </p>

                <p className="mt-4 text-center text-[16px] leading-relaxed text-zinc-800 sm:text-2xl">
                    {consejo}
                </p>

                <div className="mt-6 flex flex-col gap-3">
                    <button
                        type="button"
                        onClick={onNuevoConsejo}
                        className="w-full rounded-2xl border-2 border-button-primary bg-transparent py-3 text-[15px] font-medium text-button-primary transition-all duration-200 hover:bg-button-primary/10 active:scale-[0.99] sm:text-2xl"
                    >
                        Otro consejo
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full rounded-2xl bg-button-primary py-3 text-[15px] font-medium text-zinc-100 transition-all duration-200 hover:bg-title active:scale-[0.99] sm:text-2xl"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    )
}
