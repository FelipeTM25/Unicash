import { useId } from 'react'

type CurrencyInputFieldProps = {
    value: string
    onValueChange: (value: string) => void
    placeholder?: string
}

export function CurrencyInputField({ value, onValueChange, placeholder }: CurrencyInputFieldProps) {
    const inputId = useId()

    return (
        <label htmlFor={inputId} className="block w-full">
            <div className="flex h-20 w-full items-center gap-3 rounded-2xl border-2 border-border px-4 transition-colors duration-200 hover:border-label focus-within:border-title focus-within:ring-2 focus-within:ring-title/20 sm:h-24 sm:px-6">
                <span className="text-5xl leading-none font-normal text-border sm:text-6xl">$</span>
                <input
                    id={inputId}
                    type="tel"
                    inputMode="numeric"
                    value={value}
                    placeholder={placeholder}
                    onChange={(event) => onValueChange(event.target.value)}
                    className="w-full border-none bg-transparent text-[34px] leading-none text-zinc-800 placeholder:text-zinc-500 outline-none sm:text-[40px]"
                />
            </div>
        </label>
    )
}