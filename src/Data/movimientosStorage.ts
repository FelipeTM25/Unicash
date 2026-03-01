export const MOVIMIENTOS_STORAGE_KEY = 'unicash.movimientos'

export type Movimiento = {
    id: string
    categoria: string
    monto: number
    fecha: string // ISO date string: YYYY-MM-DD
}

export function getMovimientos(): Movimiento[] {
    const raw = localStorage.getItem(MOVIMIENTOS_STORAGE_KEY)
    if (!raw) return []
    try {
        return JSON.parse(raw) as Movimiento[]
    } catch {
        return []
    }
}

export function saveMovimientos(movimientos: Movimiento[]): void {
    localStorage.setItem(MOVIMIENTOS_STORAGE_KEY, JSON.stringify(movimientos))
}

export function agregarMovimiento(movimiento: Omit<Movimiento, 'id'>): Movimiento {
    const nuevo: Movimiento = {
        ...movimiento,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    }
    const actuales = getMovimientos()
    saveMovimientos([nuevo, ...actuales])
    return nuevo
}

export function eliminarMovimiento(id: string): void {
    const actuales = getMovimientos().filter((m) => m.id !== id)
    saveMovimientos(actuales)
}

export function formatFecha(isoDate: string): string {
    const [year, month, day] = isoDate.split('-')
    return `${day} / ${month} / ${year}`
}
