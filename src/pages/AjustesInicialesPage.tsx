import { useState } from 'react'
import { ContinueButton } from '../components/ContinueButton'
import { FormField } from '../components/FormField'
import { MobileScreen } from '../components/MobileScreen'
import { SelectField } from '../components/SelectField'
import { TopBrandTitle } from '../components/TopBrandTitle'
import { periodoOptions } from '../Data/periodoOptions'

type PeriodoOption = (typeof periodoOptions)[number]

export function AjustesIniciales() {
    const [periodo, setPeriodo] = useState<PeriodoOption>(periodoOptions[0])

    return (
        <MobileScreen>
            <TopBrandTitle />

            <h1 className="mt-4 text-center text-3xl leading-tight font-bold text-zinc-900 sm:text-6xl" >Comencemos</h1>
            <p className="mt-8 text-[20px] leading-tight text-zinc-900 sm:text-3xl">Ingresa los siguientes datos:</p>

            <div className="mt-6 flex flex-col gap-6 sm:mt-8 sm:gap-6">
                <FormField label="Nombre" />
                <FormField label="Presupuesto" prefix="$" type="number" />
                <SelectField
                    label="Periodo"
                    value={periodo}
                    onValueChange={setPeriodo}
                    options={periodoOptions}
                />
                <FormField label="Categorías" placeholder="comida, transporte" />
            </div>

            <div className="mt-auto pb-4 pt-6 sm:pb-8 sm:pt-10">
                <ContinueButton />
            </div>
        </MobileScreen>
    )
}
