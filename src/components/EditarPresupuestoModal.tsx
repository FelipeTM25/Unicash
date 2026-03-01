import type { FormEvent } from 'react'
import { useState } from 'react'
import { FormField } from './FormField'
import { AJUSTES_STORAGE_KEY, getAjustesIniciales } from '../Data/ajustesStorage'

type EditarPresupuestoModalProps = {
    presupuestoActual: number
    onClose: () => void
    onGuardado: (nuevoPresupuesto: number) => void
}

function formatMiles(value: string): string {
    if (!value) return ''
    const parsed = Number.parseInt(value, 10)
    if (!Number.isFinite(parsed)) return ''
    return new Intl.NumberFormat('es-CO').format(parsed)
}

export function EditarPresupuestoModal({ presupuestoActual, onClose, onGuardado }: EditarPresupuestoModalProps) {
    const [valor, setValor] = useState(String(presupuestoActual))

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const numero = Number.parseInt(valor, 10)
        if (!Number.isFinite(numero) || numero < 0) return

        const actual = getAjustesIniciales()
        if (!actual) return

        const actualizado = { ...actual, presupuesto: numero }
        window.localStorage.setItem(AJUSTES_STORAGE_KEY, JSON.stringify(actualizado))
        onGuardado(numero)
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6"
            onClick={onClose}
        >
            <div
                className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <p className="text-center text-[20px] font-bold text-title sm:text-3xl">
                    Editar presupuesto
                </p>

                <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-5">
                    <FormField
                        label="Nuevo presupuesto"
                        prefix="$"
                        type="tel"
                        inputMode="numeric"
                        value={formatMiles(valor)}
                        onValueChange={(v) => setValor(v.replace(/\D/g, ''))}
                    />

                    <div className="flex flex-col gap-3">
                        <button
                            type="submit"
                            className="w-full rounded-2xl bg-button-primary py-3 text-[15px] font-medium text-zinc-100 transition-all duration-200 hover:bg-title active:scale-[0.99] sm:text-2xl"
                        >
                            Guardar
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full rounded-2xl border-2 border-button-primary bg-transparent py-3 text-[15px] font-medium text-button-primary transition-all duration-200 hover:bg-button-primary/10 active:scale-[0.99] sm:text-2xl"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
