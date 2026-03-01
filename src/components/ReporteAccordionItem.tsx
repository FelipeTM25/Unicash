import type { ReactNode } from 'react'
import { LuChevronDown, LuChevronUp } from 'react-icons/lu'

type ReporteAccordionItemProps = {
    title: string
    isOpen: boolean
    onToggle: () => void
    children?: ReactNode
}

export function ReporteAccordionItem({ title, isOpen, onToggle, children }: ReporteAccordionItemProps) {
    return (
        <section className="border-b border-zinc-800">
            <button
                type="button"
                onClick={onToggle}
                className="flex w-full items-center justify-between py-4 text-left text-[22px] text-zinc-950 transition-colors duration-200 hover:bg-zinc-100 sm:text-3xl"
                aria-expanded={isOpen}
            >
                <span>{title}</span>
                {isOpen ? <LuChevronUp className="h-11 w-11" /> : <LuChevronDown className="h-11 w-11" />}
            </button>

            {isOpen && <div className="pb-4">{children}</div>}
        </section>
    )
}