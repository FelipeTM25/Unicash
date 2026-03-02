import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export type ReporteBarChartItem = {
    name: string
    total: number
}

type ReporteBarChartProps = {
    title: string
    data: ReporteBarChartItem[]
    formatValue: (value: number) => string
}

export function ReporteBarChart({ title, data, formatValue }: ReporteBarChartProps) {
    if (data.length === 0) return null

    function formatLabel(value: string): string {
        return value.length > 12 ? `${value.slice(0, 12)}…` : value
    }

    return (
        <div className="mb-4 rounded-xl border border-zinc-200 p-3">
            <p className="mb-3 text-[13px] font-semibold tracking-wide text-zinc-600 uppercase sm:text-base text-center">{title}</p>

            <div className="chart-no-focus h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 4, right: 6, left: 0, bottom: 26 }} accessibilityLayer={false}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.2} vertical={false} />
                        <YAxis
                            type="number"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 12, fill: 'var(--color-label)' }}
                        />
                        <XAxis
                            dataKey="name"
                            type="category"
                            tickLine={false}
                            axisLine={false}
                            interval={0}
                            tickFormatter={formatLabel}
                            tickMargin={12}
                            height={44}
                            angle={-22}
                            textAnchor="end"
                            tick={{ fontSize: 11, fill: 'var(--color-label)' }}
                        />
                        <Tooltip
                            cursor={false}
                            formatter={(value: number | string | undefined) => formatValue(Number(value ?? 0))}
                            contentStyle={{ borderRadius: 10, borderColor: 'var(--color-border)' }}
                            labelStyle={{ color: 'var(--color-logo)', fontWeight: 600 }}
                        />
                        <Bar dataKey="total" fill="var(--color-title)" radius={[6, 6, 0, 0]} stroke="none" activeBar={false} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}