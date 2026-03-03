export type BudgetStatus = 'ok' | 'warning' | 'over'

type BudgetStatusBadgeProps = {
    message: string
    status: BudgetStatus
}

const statusColors: Record<BudgetStatus, string> = {
    ok: 'text-emerald-600',
    warning: 'text-amber-500',
    over: 'text-rose-600',
}

export function BudgetStatusBadge({ message, status }: BudgetStatusBadgeProps) {
    return (
        <div className="mt-7 flex items-center justify-center gap-3 sm:mt-10">
            <p className={`text-[20px] leading-snug sm:text-3xl text-center font-medium ${statusColors[status]}`}>{message}</p>
        </div>
    )
}