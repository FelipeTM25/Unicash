import type { FormEvent } from 'react'
import { useState } from 'react'
import { FormField } from './FormField'
import { SelectField } from './SelectField'
import { getCategorias } from '../Data/categoriasStorage'

type RegistrarGastoModalProps = {
    onClose: () => void
    onGuardado: (categoria: string, monto: number, fecha: string) => void
}

function hoy(): string {
    return new Date().toISOString().slice(0, 10)
}

function formatMiles(value: string): string {
    if (!value) return ''
    const parsed = Number.parseInt(value, 10)
    if (!Number.isFinite(parsed)) return ''
    return new Intl.NumberFormat('es-CO').format(parsed)
}

export function RegistrarGastoModal({ onClose, onGuardado }: RegistrarGastoModalProps) {
    const categorias = getCategorias()
    const [categoria, setCategoria] = useState(categorias[0] ?? '')
    const [monto, setMonto] = useState('')
    const [fecha, setFecha] = useState(hoy())

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const numero = Number.parseInt(monto, 10)
        if (!Number.isFinite(numero) || numero <= 0) return
        if (!categoria || !fecha) return
        onGuardado(categoria, numero, fecha)
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
                    Registrar gasto
                </p>

                <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
                    <SelectField
                        label="Categoría"
                        value={categoria}
                        onValueChange={setCategoria}
                        options={categorias}
                    />

                    <FormField
                        label="Monto"
                        prefix="$"
                        type="tel"
                        inputMode="numeric"
                        value={formatMiles(monto)}
                        onValueChange={(v) => setMonto(v.replace(/\D/g, ''))}
                    />

                    <FormField
                        label="Fecha"
                        type="date"
                        value={fecha}
                        onValueChange={setFecha}
                    />

                    <div className="flex flex-col gap-3 pt-1">
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
