import { HiOutlineCurrencyDollar } from 'react-icons/hi2'
import { LuCircleUserRound, LuHouse, LuTrendingUp } from 'react-icons/lu'

type BottomNavTab = 'home' | 'reportes' | 'presupuesto' | 'ajustes'

type BottomNavBarProps = {
    activeTab?: BottomNavTab
}

const tabs: Array<{ id: BottomNavTab; label: string; icon: typeof LuHouse }> = [
    { id: 'home', label: 'Home', icon: LuHouse },
    { id: 'reportes', label: 'Reportes', icon: LuTrendingUp },
    { id: 'presupuesto', label: 'Presupuesto', icon: HiOutlineCurrencyDollar },
    { id: 'ajustes', label: 'Ajustes', icon: LuCircleUserRound },
]

export function BottomNavBar({ activeTab = 'home' }: BottomNavBarProps) {
    return (
        <nav className="overflow-hidden  bg-zinc-400">
            <ul className="grid grid-cols-4">
                {tabs.map((tab) => {
                    const isActive = tab.id === activeTab
                    const Icon = tab.icon

                    return (
                        <li key={tab.id}>
                            <button
                                type="button"
                                aria-current={isActive ? 'page' : undefined}
                                className={`flex w-full flex-col items-center justify-center gap-1 py-5 transition-colors duration-200 ${isActive ? 'bg-zinc-700 text-zinc-100' : 'bg-zinc-400 text-zinc-950'
                                    }`}
                            >
                                <Icon className="h-11 w-11" />
                                <span className="text-[14px] leading-none">{tab.label}</span>
                            </button>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}