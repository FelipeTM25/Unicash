import { useId } from 'react'

type FormFieldProps = {
    label: string
    hideLabel?: boolean
    placeholder?: string
    prefix?: string
    type?: 'text' | 'number' | 'tel' | 'date'
    inputMode?: 'text' | 'numeric' | 'decimal'
    value?: string
    onValueChange?: (value: string) => void
    error?: string
}

export function FormField({ label, hideLabel = false, placeholder, prefix, type = 'text', inputMode, value, onValueChange, error }: FormFieldProps) {
    const inputId = useId()

    return (
        <label htmlFor={inputId} className="flex w-full flex-col gap-3">
            <span className={hideLabel ? 'sr-only' : 'text-base leading-none font-semibold text-label sm:text-lg md:text-xl'}>{label}</span>
            <div className={`flex h-12 w-full items-center gap-3 rounded-2xl border-2 px-4 transition-colors duration-200 sm:h-14 sm:px-5 md:h-15 ${error
                ? 'border-rose-500 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-200'
                : 'border-border hover:border-label focus-within:border-title focus-within:ring-2 focus-within:ring-title/20'
                }`}>
                {prefix ? <span className="text-2xl font-normal text-border sm:text-3xl">{prefix}</span> : null}
                <input
                    id={inputId}
                    type={type}
                    inputMode={inputMode}
                    placeholder={placeholder}
                    value={value}
                    onChange={(event) => onValueChange?.(event.target.value)}
                    className="w-full border-none bg-transparent text-[15px] font-normal text-zinc-800 placeholder:text-zinc-500 outline-none focus-visible:outline-none sm:text-base md:text-lg"
                />
            </div>
            {error ? <p className="text-sm text-rose-600 sm:text-base">{error}</p> : null}
        </label>
    )
}
