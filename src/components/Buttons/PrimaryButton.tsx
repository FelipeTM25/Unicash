type PrimaryButtonProps = {
    text: string
    type?: 'button' | 'submit'
    onClick?: () => void
    className?: string
}

export function PrimaryButton({ text, type = 'button', onClick, className }: PrimaryButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`h-14 w-full rounded-2xl bg-button-primary text-base font-medium transition-all duration-200 hover:bg-title focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-title/40 active:scale-[0.99] sm:h-16 sm:text-lg md:text-xl ${className ?? ''}`.trim()}
        >
            {text}
        </button>
    )
}
