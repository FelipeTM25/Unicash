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

                <h1 className="mt-6 text-5xl font-bold tracking-wide text-logo sm:mt-16 sm:text-6xl">UNICASH</h1>

                <div className="mt-auto w-full pb-16 sm:pb-20">
                    <PrimaryButton text="Comenzar" onClick={handleComenzar} className=" text-zinc-100 h-16 text-[20px] sm:h-18 sm:text-3xl" />
                </div>
            </div>
        </MobileScreen>
    )
}
