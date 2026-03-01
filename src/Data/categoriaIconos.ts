import { MdDirectionsBus, MdRestaurant } from 'react-icons/md'
import { RiCupLine } from 'react-icons/ri'
import type { ComponentType } from 'react'

type IconComponent = ComponentType<{ className?: string }>

// Íconos para categorías default
const ICONOS_DEFAULT: Record<string, IconComponent> = {
    COMIDA: MdRestaurant,
    TRANSPORTE: MdDirectionsBus,
    SALIDAS: RiCupLine,
}

// Paleta de colores para categorías personalizadas (basada en la inicial)
const COLORES = [
    'bg-violet-500',
    'bg-blue-500',
    'bg-emerald-500',
    'bg-orange-500',
    'bg-pink-500',
    'bg-teal-500',
    'bg-amber-500',
    'bg-rose-500',
]

function colorParaCategoria(nombre: string): string {
    const index = nombre.charCodeAt(0) % COLORES.length
    return COLORES[index]
}

export type CategoriaIconInfo =
    | { tipo: 'icono'; Icon: IconComponent }
    | { tipo: 'inicial'; inicial: string; color: string }

export function getCategoriaIconInfo(categoria: string): CategoriaIconInfo {
    const icon = ICONOS_DEFAULT[categoria.toUpperCase()]
    if (icon) return { tipo: 'icono', Icon: icon }
    return {
        tipo: 'inicial',
        inicial: categoria.charAt(0).toUpperCase(),
        color: colorParaCategoria(categoria.toUpperCase()),
    }
}
