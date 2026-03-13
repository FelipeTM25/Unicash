import type { FormEvent } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormField } from '../components/Fields/FormField'
import { MobileScreen } from '../components/MobileScreen'
import { PrimaryButton } from '../components/Buttons/PrimaryButton'
import { SelectField } from '../components/Fields/SelectField'
import { TerminosModal } from '../components/Modals/TerminosModal'
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

function formatPresupuestoWithThousands(value: string): string {
    if (!value) {
        return ''
    }

    const parsedValue = Number.parseInt(value, 10)

    if (!Number.isFinite(parsedValue)) {
        return ''
    }

    return new Intl.NumberFormat('es-CO').format(parsedValue)
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
    const navigate = useNavigate()
    const [formData, setFormData] = useState<AjustesInicialesFormData>(getInitialFormData)
    const [errors, setErrors] = useState<{ nombre?: string; presupuesto?: string }>({})
    
    // Estados para los Términos y Condiciones
    const [aceptaTerminos, setAceptaTerminos] = useState(false)
    const [mostrarTerminos, setMostrarTerminos] = useState(false)

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const nextErrors: { nombre?: string; presupuesto?: string } = {}

        if (!formData.nombre.trim()) {
            nextErrors.nombre = 'Ingresa tu nombre para continuar.'
        }

        const presupuesto = parsePresupuestoToInt(formData.presupuesto)
        if (presupuesto === null || presupuesto <= 0) {
            nextErrors.presupuesto = 'Ingresa un presupuesto mayor a 0.'
        }

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors)
            return
        }

        setErrors({})

        const dataToSave: AjustesInicialesStorageData = {
            nombre: formData.nombre.trim(),
            presupuesto: presupuesto as number,
            periodo: formData.periodo,
        }

        window.localStorage.setItem(AJUSTES_STORAGE_KEY, JSON.stringify(dataToSave))
        navigate('/home')
    }

    return (
        <>
            {mostrarTerminos && <TerminosModal onClose={() => setMostrarTerminos(false)} />}
        
            <MobileScreen>
                <TopBrandTitle />

            <h1 className="mt-4 text-center text-3xl leading-tight font-bold text-title sm:text-4xl md:text-5xl">Comencemos</h1>
            <p className="mt-10 text-lg leading-tight text-zinc-900 sm:text-xl md:mt-12 md:text-2xl">Ingresa los siguientes datos:</p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-1 flex-col">
                <div className="flex flex-col gap-6 md:gap-7">
                    <FormField
                        label="Nombre"
                        value={formData.nombre}
                        onValueChange={(value) => {
                            setFormData((previousData) => ({ ...previousData, nombre: value }))
                            if (errors.nombre) {
                                setErrors((prev) => ({ ...prev, nombre: undefined }))
                            }
                        }}
                        error={errors.nombre}
                    />
                    <FormField
                        label="Presupuesto"
                        prefix="$"
                        type="tel"
                        inputMode="numeric"
                        value={formatPresupuestoWithThousands(formData.presupuesto)}
                        onValueChange={(value) => {
                            const onlyDigits = value.replace(/\D/g, '')
                            setFormData((previousData) => ({ ...previousData, presupuesto: onlyDigits }))
                            if (errors.presupuesto) {
                                setErrors((prev) => ({ ...prev, presupuesto: undefined }))
                            }
                        }}
                        error={errors.presupuesto}
                    />
                    <SelectField
                        label="Periodo"
                        value={formData.periodo}
                        onValueChange={(value) => setFormData((previousData) => ({ ...previousData, periodo: value }))}
                        options={periodoOptions}
                    />
                </div>

                <div className="mt-8 flex items-start gap-3 px-1">
                    <input
                        type="checkbox"
                        id="terminos"
                        checked={aceptaTerminos}
                        onChange={(e) => setAceptaTerminos(e.target.checked)}
                        className="mt-1 h-5 w-5 shrink-0 rounded border-zinc-300 text-button-primary focus:ring-button-primary cursor-pointer"
                    />
                    <label htmlFor="terminos" className="text-[15px] leading-tight text-zinc-700 sm:text-lg select-none cursor-pointer">
                        He leído y acepto los{' '}
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                setMostrarTerminos(true)
                            }}
                            className="font-semibold text-button-primary underline decoration-2 underline-offset-2 hover:text-title"
                        >
                            Términos y Condiciones
                        </button>
                    </label>
                </div>

                <div className="mt-4 max-w-xl pb-4 pt-4 sm:pb-6 sm:pt-6 md:pb-8">
                    <button 
                        type="submit" 
                        disabled={!aceptaTerminos}
                        className={`w-full rounded-2xl py-4 text-center font-bold shadow-lg transition-all duration-300 active:scale-[0.98] sm:text-xl md:text-2xl ${
                            aceptaTerminos 
                                ? 'bg-button-primary text-zinc-100 hover:bg-title focus:ring-4 focus:ring-title/50' 
                                : 'bg-zinc-300 text-zinc-500 cursor-not-allowed opacity-50'
                        }`}
                    >
                        Continuar
                    </button>
                </div>
            </form>
        </MobileScreen>
        </>
    )
}
