import { HiOutlineCurrencyDollar } from 'react-icons/hi2'
import { LuCircleUserRound, LuHouse, LuTrendingUp } from 'react-icons/lu'
import { useLocation, useNavigate } from 'react-router-dom'

type BottomNavTab = 'home' | 'reportes' | 'presupuesto' | 'ajustes'

const tabs: Array<{ id: BottomNavTab; label: string; icon: typeof LuHouse; iconClassName: string }> = [
    { id: 'home', label: 'Home', icon: LuHouse, iconClassName: 'h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9' },
    { id: 'reportes', label: 'Reportes', icon: LuTrendingUp, iconClassName: 'h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9' },
    { id: 'presupuesto', label: 'Presupuesto', icon: HiOutlineCurrencyDollar, iconClassName: 'h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10' },
    { id: 'ajustes', label: 'Ajustes', icon: LuCircleUserRound, iconClassName: 'h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9' },
]

const pathByTab: Record<BottomNavTab, string> = {
    home: '/home',
    reportes: '/reportes',
    presupuesto: '/presupuesto',
    ajustes: '/ajustes',
}

function getActiveTab(pathname: string): BottomNavTab {
    if (pathname.startsWith('/presupuesto')) return 'presupuesto'
    if (pathname.startsWith('/reportes')) return 'reportes'
    if (pathname.startsWith('/ajustes')) return 'ajustes'
    return 'home'
}

export function BottomNavBar() {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const activeTab = getActiveTab(pathname)

    return (
        <div className="mx-auto w-full max-w-6xl px-2 sm:px-4 lg:px-6">
            <nav className="w-full overflow-hidden rounded-t-xl border-t border-zinc-300 bg-transparent shadow-lg backdrop-blur-sm lg:mb-3 lg:rounded-2xl lg:border">
                <ul className="grid grid-cols-4">
                    {tabs.map((tab) => {
                        const isActive = tab.id === activeTab
                        const Icon = tab.icon

                        return (
                            <li key={tab.id}>
                                <button
                                    type="button"
                                    aria-current={isActive ? 'page' : undefined}
                                    onClick={() => navigate(pathByTab[tab.id])}
                                    className={`flex w-full flex-col items-center justify-center gap-1 py-2 text-xs transition-colors duration-200 sm:py-2.5 sm:text-sm md:py-3 md:text-base ${isActive ? 'bg-title/80 text-root-bg' : 'bg-transparent text-zinc-950'
                                        }`}
                                >
                                    <span className="flex h-8 items-center justify-center sm:h-9 md:h-10">
                                        <Icon className={tab.iconClassName} />
                                    </span>
                                    <span className="leading-none">{tab.label}</span>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
}