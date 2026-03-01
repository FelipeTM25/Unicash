type StartButtonProps = {
    onClick?: () => void
}

export function StartButton({ onClick }: StartButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-full rounded-2xl bg-button-primary py-4 text-3xl font-medium text-zinc-100 sm:py-5 sm:text-4xl"
        >
            Comenzar
        </button>
    )
}
