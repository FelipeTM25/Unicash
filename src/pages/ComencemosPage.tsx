import { ContinueButton } from '../components/ContinueButton'
import { FormField } from '../components/FormField'
import { MobileScreen } from '../components/MobileScreen'
import { SelectField } from '../components/SelectField'

export function ComencemosPage() {
    return (
        <MobileScreen>
            <div className="mx-auto flex w-full max-w-160 flex-1 flex-col">
                <h2 className="text-center text-7xl font-bold tracking-wide text-zinc-900">UNICASH</h2>

                <h1 className="mt-10 text-[92px] leading-tight font-bold text-zinc-900">Comencemos</h1>
                <p className="mt-5 text-[54px] leading-tight text-zinc-900">Ingresa los siguientes datos:</p>

                <div className="mt-10 flex flex-col gap-8">
                    <FormField label="Nombre" />
                    <FormField label="Presupuesto" prefix="$" type="number" />
                    <SelectField label="Periodo" value="Mes" withEye />
                    <FormField label="Categorías" placeholder="comida, transporte" />
                </div>

                <div className="mt-auto pb-10 pt-12">
                    <ContinueButton />
                </div>
            </div>
        </MobileScreen>
    )
}
