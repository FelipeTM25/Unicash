type AjustesMenuItemProps = {
    label: string
    onClick?: () => void
}

export function AjustesMenuItem({ label, onClick }: AjustesMenuItemProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-full border-b border-zinc-300 py-5 text-left text-[18px] font-bold text-zinc-900 transition-colors duration-200 hover:bg-zinc-100 active:bg-zinc-200 sm:text-2xl"
        >
            {label}
        </button>
    )
}
