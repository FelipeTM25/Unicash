import { HiOutlineCurrencyDollar } from 'react-icons/hi2'
import { LuCircleUserRound, LuHouse, LuTrendingUp } from 'react-icons/lu'

type BottomNavTab = 'home' | 'reportes' | 'presupuesto' | 'ajustes'

type BottomNavBarProps = {
    activeTab?: BottomNavTab
    onTabChange?: (tab: BottomNavTab) => void
}

const tabs: Array<{ id: BottomNavTab; label: string; icon: typeof LuHouse; iconClassName: string }> = [
    { id: 'home', label: 'Home', icon: LuHouse, iconClassName: 'h-9 w-9' },
    { id: 'reportes', label: 'Reportes', icon: LuTrendingUp, iconClassName: 'h-9 w-9' },
    { id: 'presupuesto', label: 'Presupuesto', icon: HiOutlineCurrencyDollar, iconClassName: 'h-10 w-10' },
    { id: 'ajustes', label: 'Ajustes', icon: LuCircleUserRound, iconClassName: 'h-9 w-9' },
]

export function BottomNavBar({ activeTab = 'home', onTabChange }: BottomNavBarProps) {
    return (
        <nav className="overflow-hidden rounded-t-xl border-t border-zinc-300 bg-transparent shadow-lg backdrop-blur-sm ">
            <ul className="grid grid-cols-4">
                {tabs.map((tab) => {
                    const isActive = tab.id === activeTab
                    const Icon = tab.icon

                    return (
                        <li key={tab.id}>
                            <button
                                type="button"
                                aria-current={isActive ? 'page' : undefined}
                                onClick={() => onTabChange?.(tab.id)}
                                className={`flex w-full flex-col items-center justify-center gap-1 py-3 transition-colors duration-200 ${isActive ? 'bg-title/40 text-root-bg' : 'bg-transparent text-zinc-950'
                                    }`}
                            >
                                <span className="flex h-10 items-center justify-center">
                                    <Icon className={tab.iconClassName} />
                                </span>
                                <span className="text-[14px] leading-none">{tab.label}</span>
                            </button>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}