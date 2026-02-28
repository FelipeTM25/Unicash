type SelectFieldProps = {
    label: string
    value: string
    withEye?: boolean
}

export function SelectField({ label, value, withEye = false }: SelectFieldProps) {
    return (
        <div className="flex w-full flex-col gap-3">
            <div className="flex items-center justify-between">
                <span className="text-[52px] leading-none font-semibold text-zinc-900">{label}</span>
                {withEye ? (
                    <span className="text-5xl text-zinc-400" aria-hidden>
                        ◌
                    </span>
                ) : null}
            </div>

            <button
                type="button"
                className="flex h-24 w-full items-center justify-between rounded-2xl border-[3px] border-zinc-800 px-5"
            >
                <span className="text-6xl font-normal text-zinc-600">{value}</span>
                <span className="text-6xl font-semibold text-zinc-900">⌄</span>
            </button>
        </div>
    )
}
