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
            className={`w-full rounded-2xl bg-button-primary font-medium transition-all duration-200 hover:bg-title focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-title/40 active:scale-[0.99] h-16  sm:h-18 sm:text-3xl ${className ?? ''}`.trim()}
        >
            {text}
        </button>
    )
}
