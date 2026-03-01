import { useState } from 'react'
import { BottomNavBar } from '../components/BottomNavBar'
import { CategoriaItem } from '../components/CategoriaItem'
import { MobileScreen } from '../components/MobileScreen'
import { TopBrandTitle } from '../components/TopBrandTitle'
import { getCategorias } from '../Data/categoriasStorage'
import type { PageName } from '../types/navigation'

type EditarCategoriasPageProps = {
    onNavigate?: (page: PageName) => void
}

export function EditarCategoriasPage({ onNavigate }: EditarCategoriasPageProps) {
    const [categorias, setCategorias] = useState<string[]>(() => getCategorias())

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

            <div className="fixed inset-x-0 bottom-0 z-40 w-full">
                <BottomNavBar activeTab="ajustes" onTabChange={onNavigate} />
            </div>
        </>
    )
}
