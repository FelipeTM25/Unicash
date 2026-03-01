import { useId } from 'react'

type FormFieldProps = {
    label: string
    placeholder?: string
    prefix?: string
    type?: 'text' | 'number'
    value?: string
    onValueChange?: (value: string) => void
}

export function FormField({ label, placeholder, prefix, type = 'text', value, onValueChange }: FormFieldProps) {
    const inputId = useId()

    return (
        <label htmlFor={inputId} className="flex w-full flex-col gap-3">
            <span className="text-[16px] leading-none font-semibold text-label sm:text-3xl">{label}</span>
            <div className="flex h-12 w-full items-center gap-3 rounded-2xl border-2 border-border px-4 sm:h-18 sm:px-5">
                {prefix ? <span className="text-3xl font-normal text-zinc-600 sm:text-4xl">{prefix}</span> : null}
                <input
                    id={inputId}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(event) => onValueChange?.(event.target.value)}
                    className="w-full border-none bg-transparent text-[15px] font-normal text-zinc-800 placeholder:text-zinc-500 outline-none sm:text-3xl"
                />
            </div>
        </label>
    )
}
