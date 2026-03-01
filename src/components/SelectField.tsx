type SelectFieldProps = {
    label: string
    value: string
}

export function SelectField({ label, value }: SelectFieldProps) {
    return (
        <div className="flex w-full flex-col gap-3">
            <div className="flex items-center justify-between">
                <span className="text-[16px] leading-none font-semibold text-zinc-900 sm:text-3xl">{label}</span>

            </div>

            <button
                type="button"
                className="flex h-12 w-full items-center justify-between rounded-2xl border-2 border-zinc-800 px-4 sm:h-18 sm:px-5"
            >
                <span className="text-[15px] font-normal text-zinc-600 sm:text-3xl">{value}</span>
                <span className="text-4xl font-semibold text-zinc-900 sm:text-5xl">⌄</span>
            </button>
        </div>
    )
}
