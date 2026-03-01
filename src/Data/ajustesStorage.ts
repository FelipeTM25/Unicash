import { periodoOptions } from './periodoOptions'

type PeriodoOption = (typeof periodoOptions)[number]

export type AjustesInicialesData = {
    nombre: string
    presupuesto: number
    periodo: PeriodoOption
}

export const AJUSTES_STORAGE_KEY = 'unicash.ajustesIniciales'

function isPeriodoOption(value: string): value is PeriodoOption {
    return (periodoOptions as readonly string[]).includes(value)
}

export function getAjustesIniciales(): AjustesInicialesData | null {
    try {
        const savedData = window.localStorage.getItem(AJUSTES_STORAGE_KEY)
        if (!savedData) return null

        const parsed = JSON.parse(savedData) as Record<string, unknown>

        const nombre = typeof parsed.nombre === 'string' ? parsed.nombre : ''
        const presupuesto = typeof parsed.presupuesto === 'number' ? parsed.presupuesto : null
        const periodo = typeof parsed.periodo === 'string' && isPeriodoOption(parsed.periodo)
            ? parsed.periodo
            : null

        if (presupuesto === null || periodo === null) return null

        return { nombre, presupuesto, periodo }
    } catch {
        return null
    }
}

// Mensual → meta semanal (÷4) | Semanal → meta diaria (÷7)
export function calcularMetaSecundaria(data: AjustesInicialesData): number {
    switch (data.periodo) {
        case 'Mensual': return Math.round(data.presupuesto / 4)
        case 'Semanal': return data.presupuesto
        case 'Diarios': return data.presupuesto * 7
    }
}
