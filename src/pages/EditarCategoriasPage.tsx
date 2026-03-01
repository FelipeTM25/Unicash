import { useState } from 'react'
import { AnadirCategoriaModal } from '../components/AnadirCategoriaModal'
import { BottomNavBar } from '../components/BottomNavBar'
import { CategoriaItem } from '../components/CategoriaItem'
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

    function handleAnadirGuardado(nuevaCategoria: string) {
        const actualizadas = [...categorias, nuevaCategoria]
        saveCategorias(actualizadas)
        setCategorias(actualizadas)
        setMostrarAnadir(false)
    }

    function handleEdit(_index: number) {
        // TODO: open edit modal (Commit 4)
    }

    function handleDelete(_index: number) {
        // TODO: open confirm modal (Commit 4)
    }

    return (
        <>
            <MobileScreen>
                <TopBrandTitle />

                <div className="mt-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-zinc-950 sm:text-4xl">
                        Editar Categorías
                    </h1>
                    <button
                        onClick={() => setMostrarAnadir(true)}
                        className="flex items-center gap-1 rounded-xl bg-button-primary px-3 py-2 text-[13px] font-semibold text-zinc-100 transition-all hover:bg-title active:scale-[0.98] sm:text-xl"
                        aria-label="Añadir categoría"
                    >
                        + AÑADIR
                    </button>
                </div>

                <div className="mt-4">
                    {categorias.map((cat, i) => (
                        <CategoriaItem
                            key={cat}
                            label={cat}
                            onEdit={() => handleEdit(i)}
                            onDelete={() => handleDelete(i)}
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

            <div className="fixed inset-x-0 bottom-0 z-40 w-full">
                <BottomNavBar activeTab="ajustes" onTabChange={onNavigate} />
            </div>
        </>
    )
}
