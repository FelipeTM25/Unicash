import type { ReactNode } from 'react'

type MobileScreenProps = {
    children: ReactNode
}

export function MobileScreen({ children }: MobileScreenProps) {
    return (
        <main className="mx-auto flex min-h-dvh w-full max-w-107.5 justify-center p-3 sm:p-4">
            <section className="flex w-full flex-1 flex-col px-6 py-6 sm:px-7 sm:py-8">
                {children}
            </section>
        </main>
    )
}
