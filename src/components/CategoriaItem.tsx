import { FiEdit2, FiTrash2 } from 'react-icons/fi'

type CategoriaItemProps = {
    label: string
    onEdit: () => void
    onDelete: () => void
}

export function CategoriaItem({ label, onEdit, onDelete }: CategoriaItemProps) {
    return (
        <div className="flex items-center justify-between border-b border-zinc-300 py-4">
            <p className="text-[16px] font-semibold text-zinc-900 sm:text-2xl">{label}</p>
            <div className="flex gap-4">
                <button
                    onClick={onEdit}
                    className="text-zinc-500 transition-colors hover:text-zinc-800"
                    aria-label={`Editar ${label}`}
                >
                    <FiEdit2 size={20} />
                </button>
                <button
                    onClick={onDelete}
                    className="text-zinc-500 transition-colors hover:text-red-600"
                    aria-label={`Eliminar ${label}`}
                >
                    <FiTrash2 size={20} />
                </button>
            </div>
        </div>
    )
}
