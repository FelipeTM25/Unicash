type BudgetStatusBadgeProps = {
    message: string
}

export function BudgetStatusBadge({ message }: BudgetStatusBadgeProps) {
    return (
        <div className="mt-7 flex items-center justify-center gap-3 sm:mt-10">
            <p className="text-[20px] leading-snug text-zinc-900 sm:text-3xl text-center">{message}</p>
        </div>
    )
}