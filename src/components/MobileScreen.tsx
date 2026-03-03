import type { ReactNode } from 'react'

type MobileScreenProps = {
    children: ReactNode
}

export function MobileScreen({ children }: MobileScreenProps) {
    return (
        <main className="mx-auto flex min-h-dvh w-full justify-center p-3 md:p-5 lg:p-6">
            <section className="flex w-full max-w-5xl flex-1 flex-col px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8">
                {children}
            </section>
        </main>
    )
}
