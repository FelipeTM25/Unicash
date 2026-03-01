type BudgetStatusBadgeProps = {
    message: string
}

export function BudgetStatusBadge({ message }: BudgetStatusBadgeProps) {
    return (
        <div className="mt-7 flex items-center gap-3 sm:mt-10">
            <span aria-hidden className="h-1 w-18 -rotate-25 rounded-full bg-zinc-700 sm:w-24" />
            <p className="text-[22px] leading-snug text-zinc-900 sm:text-3xl">{message}</p>
        </div>
    )
}