import { useId } from 'react'
import { IoChevronDown } from 'react-icons/io5'

type SelectFieldProps<TOption extends string> = {
    label: string
    value: TOption
    onValueChange: (value: TOption) => void
    options: readonly TOption[]
}

export function SelectField<TOption extends string>({ label, value, onValueChange, options }: SelectFieldProps<TOption>) {
    const selectId = useId()

    return (
        <label htmlFor={selectId} className="flex w-full flex-col gap-3">
            <span className="text-[16px] leading-none font-semibold text-zinc-900 sm:text-3xl">{label}</span>

            <div className="relative">
                <select
                    id={selectId}
                    value={value}
                    onChange={(event) => onValueChange(event.target.value as TOption)}
                    className="h-12 w-full appearance-none rounded-2xl border-2 border-zinc-800 bg-transparent px-4 pr-12 text-[15px] font-normal text-zinc-600 outline-none sm:h-18 sm:px-5 sm:pr-14 sm:text-3xl"
                >
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>

                <IoChevronDown
                    aria-hidden
                    className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-900 sm:right-5 sm:h-7 sm:w-7"
                />
            </div>
        </label>
    )
}
