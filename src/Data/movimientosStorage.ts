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

/** Rango ISO de una semana con offset (0 = esta semana, -1 = semana pasada...) */
function rangoSemana(offset: number): { inicio: string; fin: string } {
    const hoy = new Date()
    const dia = hoy.getDay()
    const lunes = new Date(hoy)
    lunes.setDate(hoy.getDate() - ((dia + 6) % 7) + offset * 7)
    const domingo = new Date(lunes)
    domingo.setDate(lunes.getDate() + 6)
    return {
        inicio: lunes.toISOString().slice(0, 10),
        fin: domingo.toISOString().slice(0, 10),
    }
}

/** Suma de movimientos para la semana con el offset dado */
export function getGastoSemana(offset: number): number {
    const { inicio, fin } = rangoSemana(offset)
    // Si es la semana actual solo contamos hasta hoy
    const tope = offset === 0 ? fechaHoy() : fin
    return getMovimientos()
        .filter((m) => m.fecha >= inicio && m.fecha <= tope)
        .reduce((sum, m) => sum + m.monto, 0)
}

/** Suma de movimientos para el día con offset dado (0=hoy, -1=ayer...) */
export function getGastoDia(offset: number): number {
    const d = new Date()
    d.setDate(d.getDate() + offset)
    const fecha = d.toISOString().slice(0, 10)
    return getMovimientos()
        .filter((m) => m.fecha === fecha)
        .reduce((sum, m) => sum + m.monto, 0)
}

/** Etiqueta legible para la semana con offset */
export function labelSemana(offset: number): string {
    const { inicio, fin } = rangoSemana(offset)
    const fmt = (iso: string) => {
        const [, m, d] = iso.split('-')
        return `${Number(d)}/${Number(m)}`
    }
    if (offset === 0) return `Esta semana`
    if (offset === -1) return `Semana pasada`
    return `${fmt(inicio)} – ${fmt(fin)}`
}

/** Etiqueta legible para el día con offset */
export function labelDia(offset: number): string {
    if (offset === 0) return 'Hoy'
    if (offset === -1) return 'Ayer'
    const d = new Date()
    d.setDate(d.getDate() + offset)
    return d.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'short' })
}
