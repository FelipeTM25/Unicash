import { useMemo, useState } from 'react'
import { BottomNavBar } from '../components/BottomNavBar'
import { BudgetStatusBadge } from '../components/BudgetStatusBadge'
import { CurrencyInputField } from '../components/CurrencyInputField'
import { MobileScreen } from '../components/MobileScreen'
import { PrimaryButton } from '../components/PrimaryButton'
import { TopBrandTitle } from '../components/TopBrandTitle'

function formatAmount(value: number): string {
    return new Intl.NumberFormat('es-CO', {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
    }).format(value)
}

export function HomePage() {
    const [movementInput, setMovementInput] = useState('')
    const [totalUsed] = useState(0)

    const todayUsed = useMemo(() => formatAmount(totalUsed), [totalUsed])

    return (
        <>
            <MobileScreen>


                <TopBrandTitle />

                <h1 className="mt-3 text-center text-5xl leading-tight font-bold text-zinc-950 sm:mt-6 sm:text-6xl">Hola, User!</h1>

                <h2 className="mt-10 text-center text-5xl leading-tight font-bold text-zinc-950 sm:mt-14 sm:text-6xl">Hoy has usado:</h2>
                <p className="mt-5 text-center text-6xl font-normal text-zinc-950 sm:mt-7 sm:text-7xl">$ {todayUsed}</p>

                <BudgetStatusBadge message="Aún estás dentro de tu presupuesto" />

                <section className="mx-auto mt-18 w-full max-w-[80%] sm:mt-22">
                    <h3 className="text-center text-6xl leading-tight font-bold text-zinc-950 sm:text-7xl">
                        Ingresa tu nuevo
                        <br />
                        movimiento
                    </h3>

                    <div className="mt-8 sm:mt-10">
                        <CurrencyInputField
                            value={movementInput}
                            onValueChange={(value) => setMovementInput(value.replace(/\D/g, ''))}
                        />
                    </div>

                    <div className="mx-auto mt-8 w-full max-w-[78%] sm:mt-10">
                        <PrimaryButton text="Registrar" className="h-20 bg-zinc-400 text-5xl font-semibold text-zinc-950 hover:bg-zinc-500 sm:h-24 sm:text-6xl" />
                    </div>
                </section>

                <div className="h-48" aria-hidden />
            </MobileScreen>
            <div className="fixed inset-x-0 bottom-0 z-40 w-full">
                <BottomNavBar activeTab="home" />
            </div>
        </>
    )
}
