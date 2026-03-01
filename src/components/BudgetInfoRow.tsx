type BudgetInfoRowProps = {
    label: string
    value: string
}

export function BudgetInfoRow({ label, value }: BudgetInfoRowProps) {
    return (
        <div className="border-b border-zinc-300 py-4">
            <p className="text-[16px] font-bold text-zinc-900 sm:text-2xl">{label}</p>
            <p className="mt-1 text-[16px] font-normal text-zinc-800 sm:text-2xl">{value}</p>
        </div>
    )
}
