type ConfirmacionModalProps = {
    mensaje: string
    labelConfirmar?: string
    labelCancelar?: string
    onConfirmar: () => void
    onCancelar: () => void
}

export function ConfirmacionModal({
    mensaje,
    labelConfirmar = 'Confirmar',
    labelCancelar = 'Cancelar',
    onConfirmar,
    onCancelar,
}: ConfirmacionModalProps) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6"
            onClick={onCancelar}
        >
            <div
                className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <p className="text-center text-[18px] leading-snug font-semibold text-zinc-900 sm:text-2xl">
                    {mensaje}
                </p>

                <div className="mt-6 flex flex-col gap-3">
                    <button
                        type="button"
                        onClick={onConfirmar}
                        className="w-full rounded-2xl bg-red-500 py-3 text-[15px] font-medium text-white transition-all duration-200 hover:bg-red-600 active:scale-[0.99] sm:text-2xl"
                    >
                        {labelConfirmar}
                    </button>
                    <button
                        type="button"
                        onClick={onCancelar}
                        className="w-full rounded-2xl border-2 border-zinc-400 bg-transparent py-3 text-[15px] font-medium text-zinc-700 transition-all duration-200 hover:bg-zinc-100 active:scale-[0.99] sm:text-2xl"
                    >
                        {labelCancelar}
                    </button>
                </div>
            </div>
        </div>
    )
}
