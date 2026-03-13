import type { ReactNode } from 'react'
import { LuChevronDown } from 'react-icons/lu'

type ReporteAccordionItemProps = {
    title: string
    isOpen: boolean
    onToggle: () => void
    children?: ReactNode
}

export function ReporteAccordionItem({ title, isOpen, onToggle, children }: ReporteAccordionItemProps) {
    return (
        <section className="overflow-hidden rounded-xl border-b border-border">
            <button
                type="button"
                onClick={onToggle}
                className="flex w-full items-center justify-between py-4 text-left text-[22px] text-label transition-all duration-200 ease-out active:scale-[0.99]  sm:text-3xl"
                aria-expanded={isOpen}
            >
                <span >{title}</span>
                <LuChevronDown
                    className={`h-11 w-11 transition-transform duration-200 ease-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                />
            </button>

            <div
                className={`grid transition-[grid-template-rows,opacity,padding] duration-550 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 pb-4' : 'grid-rows-[0fr] opacity-0 pb-0'
                }`}
            >
                <div className="overflow-hidden">{children}</div>
            </div>
        </section>
    )
}