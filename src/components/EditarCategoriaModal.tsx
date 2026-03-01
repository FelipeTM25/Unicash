import type { FormEvent } from 'react'
import { useState } from 'react'
import { FormField } from './FormField'

type EditarCategoriaModalProps = {
    categoriaActual: string
    onClose: () => void
    onGuardado: (nuevoNombre: string) => void
}

export function EditarCategoriaModal({ categoriaActual, onClose, onGuardado }: EditarCategoriaModalProps) {
    const [nombre, setNombre] = useState(categoriaActual)

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const trimmed = nombre.trim().toUpperCase()
        if (!trimmed) return
        onGuardado(trimmed)
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
                    Editar categoría
                </p>

                <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-5">
                    <FormField
                        label="Nombre de la categoría"
                        type="text"
                        value={nombre}
                        onValueChange={setNombre}
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
