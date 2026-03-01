export const CATEGORIAS_STORAGE_KEY = 'unicash.categorias'

const CATEGORIAS_DEFAULT = ['COMIDA', 'TRANSPORTE', 'SALIDAS']

export function getCategorias(): string[] {
    const raw = localStorage.getItem(CATEGORIAS_STORAGE_KEY)
    if (!raw) return [...CATEGORIAS_DEFAULT]
    try {
        return JSON.parse(raw) as string[]
    } catch {
        return [...CATEGORIAS_DEFAULT]
    }
}

export function saveCategorias(categorias: string[]): void {
    localStorage.setItem(CATEGORIAS_STORAGE_KEY, JSON.stringify(categorias))
}
