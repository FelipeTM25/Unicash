type ContinueButtonProps = {
    type?: 'button' | 'submit'
}

export function ContinueButton({ type = 'button' }: ContinueButtonProps) {
    return (
        <button
            type={type}
            className="h-16 w-full rounded-2xl bg-button-primary text-[20px] font-medium text-zinc-100 sm:h-18 sm:text-3xl"
        >
            Continuar
        </button>
    )
}
