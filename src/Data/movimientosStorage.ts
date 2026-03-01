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

export function fechaHoy(): string {
    return new Date().toISOString().slice(0, 10)
}

/** Devuelve la fecha del lunes de la semana actual (YYYY-MM-DD) */
function inicioSemanaActual(): string {
    const hoy = new Date()
    const dia = hoy.getDay() // 0=dom, 1=lun...
    const lunes = new Date(hoy)
    lunes.setDate(hoy.getDate() - ((dia + 6) % 7))
    return lunes.toISOString().slice(0, 10)
}

/** Suma de movimientos en la semana actual (lunes a hoy) */
export function getGastoSemanaActual(): number {
    const inicio = inicioSemanaActual()
    const hoy = fechaHoy()
    return getMovimientos()
        .filter((m) => m.fecha >= inicio && m.fecha <= hoy)
        .reduce((sum, m) => sum + m.monto, 0)
}

/** Suma de movimientos del día de hoy */
export function getGastoDiaActual(): number {
    const hoy = fechaHoy()
    return getMovimientos()
        .filter((m) => m.fecha === hoy)
        .reduce((sum, m) => sum + m.monto, 0)
}
