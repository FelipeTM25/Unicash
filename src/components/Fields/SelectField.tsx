import { useId } from 'react'
import { IoChevronDown } from 'react-icons/io5'

type SelectFieldProps<TOption extends string> = {
    label: string
    value: TOption
    onValueChange: (value: TOption) => void
    options: readonly TOption[]
    error?: string
}

export function SelectField<TOption extends string>({ label, value, onValueChange, options, error }: SelectFieldProps<TOption>) {
    const selectId = useId()

    return (
        <label htmlFor={selectId} className="flex w-full flex-col gap-3">
            <span className="text-base leading-none font-semibold text-label sm:text-lg md:text-xl">{label}</span>

            <div className="relative">
                <select
                    id={selectId}
                    value={value}
                    onChange={(event) => onValueChange(event.target.value as TOption)}
                    className={`h-12 w-full cursor-pointer appearance-none rounded-2xl border-2 bg-transparent px-4 pr-12 text-[15px] font-normal text-zinc-600 outline-none transition-colors duration-200 sm:h-14 sm:px-5 sm:pr-14 sm:text-base md:h-15 md:text-lg ${error
                        ? 'border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                        : 'border-border hover:border-label focus:border-title focus:ring-2 focus:ring-title/20'
                        }`}
                >
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>

                <IoChevronDown
                    aria-hidden
                    className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-900 transition-colors duration-200 sm:right-5 sm:h-6 sm:w-6 md:h-7 md:w-7"
                />
            </div>
            {error ? <p className="text-sm text-rose-600 sm:text-base">{error}</p> : null}
        </label>
    )
}
