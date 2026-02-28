import type { ReactNode } from 'react'

type MobileScreenProps = {
    children: ReactNode
}

export function MobileScreen({ children }: MobileScreenProps) {
    return (
        <main className="mx-auto flex min-h-screen w-full max-w-107.5 items-center justify-center p-3 sm:p-4">
            <section className="flex min-h-195 w-full flex-col px-6 py-8 sm:min-h-205 sm:px-7 sm:py-10">
                {children}
            </section>
        </main>
    )
}
