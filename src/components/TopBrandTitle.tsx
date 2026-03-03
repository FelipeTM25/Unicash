type TopBrandTitleProps = {
    title?: string
}

export function TopBrandTitle({ title = 'UNICASH' }: TopBrandTitleProps) {
    return (
        <div className="sticky top-0 z-10 bg-root-bg pb-3 text-center md:pb-4">
            <h2 className="text-2xl font-bold tracking-wide text-logo sm:text-3xl md:text-4xl">{title}</h2>
        </div>
    )
}