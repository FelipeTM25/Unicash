import { useMemo, useState } from 'react'
import { BottomNavBar } from '../components/BottomNavBar'
import { BudgetStatusBadge } from '../components/BudgetStatusBadge'
import { FormField } from '../components/FormField'
import { MobileScreen } from '../components/MobileScreen'
import { PrimaryButton } from '../components/PrimaryButton'
import { SelectField } from '../components/SelectField'
import { TopBrandTitle } from '../components/TopBrandTitle'
import { getCategorias } from '../Data/categoriasStorage'
import { agregarMovimiento, fechaHoy, getGastoDiaActual } from '../Data/movimientosStorage'
import type { PageName } from '../types/navigation'

function formatCOP(value: number): string {
    return `$${new Intl.NumberFormat('es-CO').format(value)}`
}

type HomePageProps = {
    onNavigate?: (page: PageName) => void
}

export function HomePage({ onNavigate }: HomePageProps) {
    const categorias = useMemo(() => getCategorias(), [])
    const [categoria, setCategoria] = useState(categorias[0] ?? '')
    const [montoInput, setMontoInput] = useState('')
    const [gastoHoy, setGastoHoy] = useState(() => getGastoDiaActual())

    function handleRegistrar(e: React.FormEvent) {
        e.preventDefault()
        const numero = Number.parseInt(montoInput, 10)
        if (!Number.isFinite(numero) || numero <= 0 || !categoria) return
        agregarMovimiento({ categoria, monto: numero, fecha: fechaHoy() })
        setGastoHoy((prev) => prev + numero)
        setMontoInput('')
    }

    return (
        <>
            <MobileScreen>
                <TopBrandTitle />

                <h1 className="mt-3 text-center text-5xl leading-tight font-bold text-zinc-950 sm:mt-6 sm:text-6xl">Hola, User!</h1>

                <h2 className="mt-10 text-center text-[30px] leading-tight font-bold text-zinc-950 sm:mt-14 sm:text-6xl">Hoy has usado:</h2>
                <p className="mt-5 text-center text-[40px] font-normal text-zinc-950 sm:mt-7 sm:text-7xl">{formatCOP(gastoHoy)}</p>

                <BudgetStatusBadge message="Aún estás dentro de tu presupuesto" />

                <section className="mx-auto mt-10 w-full max-w-[80%] sm:mt-22">
                    <h3 className="text-center text-[27px] leading-tight font-bold text-zinc-950 sm:text-7xl">
                        Ingresa tu nuevo
                        <br />
                        movimiento
                    </h3>
                    <form onSubmit={handleRegistrar} className="mt-8 flex flex-1 flex-col gap-5 sm:mt-8">
                        <SelectField
                            label="Categoría"
                            value={categoria}
                            onValueChange={setCategoria}
                            options={categorias}
                        />

                        <FormField
                            label="Monto"
                            hideLabel
                            prefix="$"
                            type="tel"
                            inputMode="numeric"
                            value={montoInput}
                            onValueChange={(v) => setMontoInput(v.replace(/\D/g, ''))}
                        />

                        <div className="mx-auto mt-3 w-full max-w-[78%] sm:mt-10">
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
