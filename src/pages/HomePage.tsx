import { useMemo, useState } from 'react'
import { BottomNavBar } from '../components/BottomNavBar'
import { BudgetStatusBadge } from '../components/BudgetStatusBadge'
import { FormField } from '../components/FormField'
import { MobileScreen } from '../components/MobileScreen'
import { PrimaryButton } from '../components/PrimaryButton'
import { TopBrandTitle } from '../components/TopBrandTitle'

function formatAmount(value: number): string {
    return new Intl.NumberFormat('es-CO', {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
    }).format(value)
}

import type { PageName } from '../types/navigation'

type HomePageProps = {
    onNavigate?: (page: PageName) => void
}

export function HomePage({ onNavigate }: HomePageProps) {
    const [movementInput, setMovementInput] = useState('')
    const [totalUsed] = useState(0)

    const todayUsed = useMemo(() => formatAmount(totalUsed), [totalUsed])

    return (
        <>
            <MobileScreen>


                <TopBrandTitle />

                <h1 className="mt-3 text-center text-5xl leading-tight font-bold text-zinc-950 sm:mt-6 sm:text-6xl">Hola, User!</h1>

                <h2 className="mt-10 text-center text-[30px] leading-tight font-bold text-zinc-950 sm:mt-14 sm:text-6xl">Hoy has usado:</h2>
                <p className="mt-5 text-center text-[40px] font-normal text-zinc-950 sm:mt-7 sm:text-7xl">$ {todayUsed}</p>

                <BudgetStatusBadge message="Aún estás dentro de tu presupuesto" />

                <section className="mx-auto mt-10 w-full max-w-[80%] sm:mt-22">
                    <h3 className="text-center text-[27px] leading-tight font-bold text-zinc-950 sm:text-7xl">
                        Ingresa tu nuevo
                        <br />
                        movimiento
                    </h3>
                    <form onSubmit={(e) => e.preventDefault()} className="mt-8 flex flex-1 flex-col sm:mt-8">

                        <FormField
                            label="Nuevo movimiento"
                            hideLabel
                            prefix="$"
                            type="tel"
                            inputMode="numeric"
                            value={movementInput}
                            onValueChange={(value) => setMovementInput(value.replace(/\D/g, ''))}
                        />


                        <div className="mx-auto mt-8 w-full max-w-[78%] sm:mt-10">
                            <PrimaryButton text="Registrar" />
                        </div>

                    </form>
                </section>

                <div className="h-30" aria-hidden />
            </MobileScreen>
            <div className="fixed inset-x-0 bottom-0 z-40 w-full">
                <BottomNavBar activeTab="home" onTabChange={onNavigate} />
            </div>
        </>
    )
}
