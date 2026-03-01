type FormFieldProps = {
    label: string
    placeholder?: string
    prefix?: string
    type?: 'text' | 'number'
}

export function FormField({ label, placeholder, prefix, type = 'text' }: FormFieldProps) {
    return (
        <label className="flex w-full flex-col gap-3">
            <span className="text-[16px] leading-none font-semibold text-zinc-900 sm:text-3xl">{label}</span>
            <div className="flex h-12 w-full items-center gap-3 rounded-2xl border-2 border-zinc-800 px-4 sm:h-18 sm:px-5">
                {prefix ? <span className="text-3xl font-normal text-zinc-600 sm:text-4xl">{prefix}</span> : null}
                <input
                    type={type}
                    placeholder={placeholder}
                    className="w-full border-none bg-transparent text-[15px] font-normal text-zinc-800 placeholder:text-zinc-500 outline-none sm:text-3xl"
                />
            </div>
        </label>
    )
}
