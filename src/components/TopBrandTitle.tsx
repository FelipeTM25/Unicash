type TopBrandTitleProps = {
    title?: string
}

export function TopBrandTitle({ title = 'UNICASH' }: TopBrandTitleProps) {
    return (
        <div className="sticky top-0 z-10 pb-4 text-center ">
            <h2 className="text-[28px] font-bold tracking-wide text-logo sm:text-5xl">{title}</h2>
        </div>
    )
}