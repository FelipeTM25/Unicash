export type EstadoPresupuesto = 'bien' | 'alerta' | 'excedido'

export const consejos: Record<EstadoPresupuesto, string[]> = {
    bien: [
        '¡Vas muy bien! Considera guardar el dinero restante como ahorro de emergencia.',
        'Estás dentro de tu meta. Aprovecha para pagar deudas pendientes si las tienes.',
        '¡Excelente control! Destina el sobrante de esta semana a una meta de ahorro.',
        'Tu disciplina financiera está funcionando. ¡Sigue así!',
        'Buen ritmo. Recuerda que pequeños gastos diarios se acumulan al final del mes.',
    ],
    alerta: [
        'Estás cerca de tu límite semanal. Revisa en qué estás gastando más de lo planeado.',
        'Tienes poco margen esta semana. Prioriza solo los gastos esenciales.',
        '¡Cuidado! Estás bordeando tu meta. Evita compras impulsivas por los próximos días.',
        'Considera postponer gastos no urgentes para la próxima semana.',
        'Revisa tus suscripciones y gastos fijos, pueden estar consumiendo más de lo esperado.',
    ],
    excedido: [
        'Te pasaste del presupuesto esta semana. Analiza qué gastos puedes reducir la próxima.',
        'Intenta compensar el exceso siendo más estricto las siguientes semanas.',
        'Revisa tus gastos hormiga: pequeñas compras frecuentes que suman sin darte cuenta.',
        'Considera ajustar tu presupuesto si esto ocurre seguido — puede que sea muy ajustado.',
        'Registra cada gasto esta semana para identificar en qué puedes ahorrar.',
    ],
}

export function getEstado(gastoSemanal: number, metaSemanal: number): EstadoPresupuesto {
    if (gastoSemanal > metaSemanal) return 'excedido'
    if (gastoSemanal > metaSemanal * 0.8) return 'alerta'
    return 'bien'
}

export function getConsejoAleatorio(estado: EstadoPresupuesto): string {
    const lista = consejos[estado]
    return lista[Math.floor(Math.random() * lista.length)]
}
