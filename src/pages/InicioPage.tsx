import { useNavigate } from 'react-router-dom'
import { LogoBadge } from '../components/LogoBadge'
import { MobileScreen } from '../components/MobileScreen'
import { PrimaryButton } from '../components/Buttons/PrimaryButton'
import { getAjustesIniciales } from '../Data/ajustesStorage'

export function InicioPage() {
    const navigate = useNavigate()

    function handleComenzar() {
        const datosGuardados = getAjustesIniciales()
        navigate(datosGuardados ? '/home' : '/ajustes-iniciales')
    }

    return (
        <MobileScreen>
            <div className="mt-4 flex flex-1 flex-col items-center">
                <LogoBadge />

                <h1 className="mt-6 text-4xl font-bold tracking-wide text-logo sm:mt-12 sm:text-5xl md:text-6xl">UNICASH</h1>

                <div className="mt-auto w-full max-w-xl pb-12 sm:pb-16 md:pb-20">
                    <PrimaryButton text="Comenzar" onClick={handleComenzar} className="text-zinc-100 text-lg sm:text-xl md:text-2xl" />
                </div>
            </div>
        </MobileScreen>
    )
}
