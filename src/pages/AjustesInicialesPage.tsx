import type { FormEvent } from 'react'
import { useState } from 'react'
import { ContinueButton } from '../components/ContinueButton'
import { FormField } from '../components/FormField'
import { MobileScreen } from '../components/MobileScreen'
import { SelectField } from '../components/SelectField'
import { TopBrandTitle } from '../components/TopBrandTitle'
import { periodoOptions } from '../Data/periodoOptions'

type PeriodoOption = (typeof periodoOptions)[number]
type AjustesInicialesFormData = {
    nombre: string
    presupuesto: string
    periodo: PeriodoOption
}

type AjustesInicialesStorageData = {
    nombre: string
    presupuesto: number
    periodo: PeriodoOption
}

const AJUSTES_STORAGE_KEY = 'unicash.ajustesIniciales'

function isPeriodoOption(value: string): value is PeriodoOption {
    return (periodoOptions as readonly string[]).includes(value)
}

function parsePresupuestoToInt(value: string): number | null {
    const presupuesto = Number.parseInt(value, 10)
    return Number.isInteger(presupuesto) && presupuesto >= 0 ? presupuesto : null
}

function getInitialFormData(): AjustesInicialesFormData {
    const defaultData: AjustesInicialesFormData = {
        nombre: '',
        presupuesto: '',
        periodo: periodoOptions[0],
    }

    if (typeof window === 'undefined') {
        return defaultData
    }

    try {
        const savedData = window.localStorage.getItem(AJUSTES_STORAGE_KEY)

        if (!savedData) {
            return defaultData
        }

        const parsedData = JSON.parse(savedData) as Partial<AjustesInicialesFormData & AjustesInicialesStorageData>

        const presupuestoFromStorage = typeof parsedData.presupuesto === 'number'
            ? parsedData.presupuesto
            : parsePresupuestoToInt(String(parsedData.presupuesto ?? ''))

        return {
            nombre: typeof parsedData.nombre === 'string' ? parsedData.nombre : defaultData.nombre,
            presupuesto: presupuestoFromStorage !== null ? String(presupuestoFromStorage) : defaultData.presupuesto,
            periodo: typeof parsedData.periodo === 'string' && isPeriodoOption(parsedData.periodo)
                ? parsedData.periodo
                : defaultData.periodo,
        }
    } catch {
        return defaultData
    }
}

export function AjustesIniciales() {
    const [formData, setFormData] = useState<AjustesInicialesFormData>(getInitialFormData)

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const presupuesto = parsePresupuestoToInt(formData.presupuesto)
        if (presupuesto === null) {
            return
        }

        const dataToSave: AjustesInicialesStorageData = {
            nombre: formData.nombre.trim(),
            presupuesto,
            periodo: formData.periodo,
        }

        window.localStorage.setItem(AJUSTES_STORAGE_KEY, JSON.stringify(dataToSave))
    }

    return (
        <MobileScreen>
            <TopBrandTitle />

            <h1 className="mt-4 text-center text-3xl leading-tight font-bold text-zinc-900 sm:text-6xl" >Comencemos</h1>
            <p className="mt-20 text-[20px] leading-tight text-zinc-900 sm:text-3xl">Ingresa los siguientes datos:</p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-1 flex-col sm:mt-8">
                <div className="flex flex-col gap-6 sm:gap-6">
                    <FormField
                        label="Nombre"
                        value={formData.nombre}
                        onValueChange={(value) => setFormData((previousData) => ({ ...previousData, nombre: value }))}
                    />
                    <FormField
                        label="Presupuesto"
                        prefix="$"
                        type="number"
                        value={formData.presupuesto}
                        onValueChange={(value) => {
                            const onlyDigits = value.replace(/\D/g, '')
                            setFormData((previousData) => ({ ...previousData, presupuesto: onlyDigits }))
                        }}
                    />
                    <SelectField
                        label="Periodo"
                        value={formData.periodo}
                        onValueChange={(value) => setFormData((previousData) => ({ ...previousData, periodo: value }))}
                        options={periodoOptions}
                    />
                </div>

                <div className="mt-auto pb-4 pt-6 sm:pb-8 sm:pt-10">
                    <ContinueButton type="submit" />
                </div>
            </form>
        </MobileScreen>
    )
}
