import logoImage from '../assets/images/logo.png'

export function LogoBadge() {
    return (
        <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-full  sm:h-52 sm:w-52">
            <img src={logoImage} alt="Logo Unicash" className="h-[62%] w-[62%] object-contain" />
        </div>
    )
}
