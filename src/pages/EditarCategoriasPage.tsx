import { useState } from 'react'
import { AnadirCategoriaModal } from '../components/AnadirCategoriaModal'
import { BottomNavBar } from '../components/BottomNavBar'
import { CategoriaItem } from '../components/CategoriaItem'
import { ConfirmacionModal } from '../components/ConfirmacionModal'
import { EditarCategoriaModal } from '../components/EditarCategoriaModal'
import { MobileScreen } from '../components/MobileScreen'
import { TopBrandTitle } from '../components/TopBrandTitle'
import { getCategorias, saveCategorias } from '../Data/categoriasStorage'
import type { PageName } from '../types/navigation'

type EditarCategoriasPageProps = {
    onNavigate?: (page: PageName) => void
}

export function EditarCategoriasPage({ onNavigate }: EditarCategoriasPageProps) {
    const [categorias, setCategorias] = useState<string[]>(() => getCategorias())
    const [mostrarAnadir, setMostrarAnadir] = useState(false)
    const [indiceEditar, setIndiceEditar] = useState<number | null>(null)
    const [indiceEliminar, setIndiceEliminar] = useState<number | null>(null)

    function handleAnadirGuardado(nuevaCategoria: string) {
        const actualizadas = [...categorias, nuevaCategoria]
        saveCategorias(actualizadas)
        setCategorias(actualizadas)
        setMostrarAnadir(false)
    }

    function handleEditarGuardado(nuevoNombre: string) {
        if (indiceEditar === null) return
        const actualizadas = categorias.map((cat, i) => (i === indiceEditar ? nuevoNombre : cat))
        saveCategorias(actualizadas)
        setCategorias(actualizadas)
        setIndiceEditar(null)
    }

    function handleEliminarConfirmado() {
        if (indiceEliminar === null) return
        const actualizadas = categorias.filter((_, i) => i !== indiceEliminar)
        saveCategorias(actualizadas)
        setCategorias(actualizadas)
        setIndiceEliminar(null)
    }

    return (
        <>
            <MobileScreen>
                <TopBrandTitle />

                <div className="mt-4">
                    <h1 className="text-2xl font-bold text-zinc-950 sm:text-4xl">
                        Editar Categorías
                    </h1>
                </div>

                <div className="mt-4">
                    {categorias.map((cat, i) => (
                        <CategoriaItem
                            key={cat + i}
                            label={cat}
                            onEdit={() => setIndiceEditar(i)}
                            onDelete={() => setIndiceEliminar(i)}
                        />
                    ))}
                </div>
            </MobileScreen>

            {mostrarAnadir && (
                <AnadirCategoriaModal
                    onClose={() => setMostrarAnadir(false)}
                    onGuardado={handleAnadirGuardado}
                />
            )}

            {indiceEditar !== null && (
                <EditarCategoriaModal
                    categoriaActual={categorias[indiceEditar]}
                    onClose={() => setIndiceEditar(null)}
                    onGuardado={handleEditarGuardado}
                />
            )}

            {indiceEliminar !== null && (
                <ConfirmacionModal
                    mensaje={`¿Eliminar la categoría "${categorias[indiceEliminar]}"?`}
                    labelConfirmar="Eliminar"
                    labelCancelar="Cancelar"
                    onConfirmar={handleEliminarConfirmado}
                    onCancelar={() => setIndiceEliminar(null)}
                />
            )}

            <div className="fixed inset-x-0 bottom-0 z-40 w-full">
                <div className="flex justify-center bg-transparent py-3">
                    <button
                        onClick={() => setMostrarAnadir(true)}
                        className="flex items-center gap-2 rounded-full bg-button-primary px-6 py-3 text-[15px] font-semibold text-white shadow-lg transition-all hover:bg-title active:scale-[0.97] sm:text-xl"
                        aria-label="Añadir categoría"
                    >
                        + Añadir categoría
                    </button>
                </div>
                <BottomNavBar activeTab="ajustes" onTabChange={onNavigate} />
            </div>
        </>
    )
}
