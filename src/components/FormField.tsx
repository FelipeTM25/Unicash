type FormFieldProps = {
    label: string
    placeholder?: string
    prefix?: string
    type?: 'text' | 'number'
}

export function FormField({ label, placeholder, prefix, type = 'text' }: FormFieldProps) {
    return (
        <label className="flex w-full flex-col gap-3">
            <span className="text-[52px] leading-none font-semibold text-zinc-900">{label}</span>
            <div className="flex h-24 w-full items-center gap-3 rounded-2xl border-[3px] border-zinc-800 px-5">
                {prefix ? <span className="text-6xl font-normal text-zinc-600">{prefix}</span> : null}
                <input
                    type={type}
                    placeholder={placeholder}
                    className="w-full border-none bg-transparent text-5xl font-normal text-zinc-800 placeholder:text-zinc-500 outline-none"
                />
            </div>
        </label>
    )
}
