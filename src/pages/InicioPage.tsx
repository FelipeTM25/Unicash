import { LogoBadge } from '../components/LogoBadge'
import { MobileScreen } from '../components/MobileScreen'
import { StartButton } from '../components/StartButton'

type InicioPageProps = {
    onStart?: () => void
}

export function InicioPage({ onStart }: InicioPageProps) {
    return (
        <MobileScreen>
            <div className="mt-4 flex flex-1 flex-col items-center">
                <LogoBadge />

                <h1 className="mt-6 text-5xl font-bold tracking-wide text-logo sm:mt-16 sm:text-6xl">UNICASH</h1>

                <div className="mt-auto w-full pb-16 sm:pb-20">
                    <StartButton onClick={onStart} />
                </div>
            </div>
        </MobileScreen>
    )
}
