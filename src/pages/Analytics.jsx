import { motion } from 'framer-motion'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import { TbChartBar, TbTrendingUp, TbActivity, TbFilter } from 'react-icons/tb'

const productionTrend = [
  { month: 'Jul', units: 8420, efficiency: 87, target: 8000 },
  { month: 'Aug', units: 8900, efficiency: 91, target: 8500 },
  { month: 'Sep', units: 8200, efficiency: 84, target: 8500 },
  { month: 'Oct', units: 9400, efficiency: 96, target: 9000 },
  { month: 'Nov', units: 9800, efficiency: 99, target: 9000 },
  { month: 'Dec', units: 9200, efficiency: 94, target: 9000 },
]

const revenueTrend = [
  { month: 'Jul', revenue: 3.2, cost: 1.8, profit: 1.4 },
  { month: 'Aug', revenue: 3.5, cost: 1.9, profit: 1.6 },
  { month: 'Sep', revenue: 3.1, cost: 1.8, profit: 1.3 },
  { month: 'Oct', revenue: 3.9, cost: 2.0, profit: 1.9 },
  { month: 'Nov', revenue: 4.2, cost: 2.1, profit: 2.1 },
  { month: 'Dec', revenue: 3.8, cost: 2.0, profit: 1.8 },
]

const ordersByStatus = [
  { name: 'Completed', value: 284, color: '#22c55e' },
  { name: 'In Progress', value: 126, color: '#3b82f6' },
  { name: 'Pending', value: 89, color: '#f59e0b' },
  { name: 'Cancelled', value: 23, color: '#ef4444' },
]

const machineEfficiency = [
  { machine: 'CNC-01', efficiency: 94, uptime: 98 },
  { machine: 'CNC-07', efficiency: 61, uptime: 78 },
  { machine: 'WELD-01', efficiency: 88, uptime: 95 },
  { machine: 'WELD-03', efficiency: 91, uptime: 96 },
  { machine: 'PRESS-12', efficiency: 45, uptime: 65 },
  { machine: 'LATHE-02', efficiency: 86, uptime: 93 },
]

const customTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass rounded-xl px-4 py-3 border border-white/10 shadow-xl text-xs">
      <p className="font-semibold text-white mb-1.5">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 mb-0.5">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-surface-400">{p.name}:</span>
          <span className="text-white font-medium">{p.value}{p.name === 'efficiency' || p.name === 'uptime' ? '%' : p.name.includes('evenue') || p.name.includes('ofit') || p.name.includes('ost') ? 'M' : ''}</span>
        </div>
      ))}
    </div>
  )
}

const kpis = [
  { label: 'Total Production Units', value: '58,920', change: '+8.4%', up: true },
  { label: 'Avg Efficiency', value: '94.2%', change: '+2.1%', up: true },
  { label: 'Revenue MTD', value: '$3.84M', change: '+18.2%', up: true },
  { label: 'Defect Rate', value: '0.8%', change: '-0.3%', up: true },
]

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="stat-card">
            <p className="text-surface-500 text-xs mb-2">{kpi.label}</p>
            <p className="text-2xl font-black text-white mb-2">{kpi.value}</p>
            <div className="flex items-center gap-1">
              <TbTrendingUp size={14} className={kpi.up ? 'text-green-400' : 'text-red-400'} />
              <span className={`text-xs font-semibold ${kpi.up ? 'text-green-400' : 'text-red-400'}`}>{kpi.change}</span>
              <span className="text-xs text-surface-600">vs last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Production trend */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="xl:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-white text-sm">Production Units vs Target</h3>
              <p className="text-xs text-surface-500">Last 6 months</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={productionTrend} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="unitsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={customTooltip} />
              <Area type="monotone" dataKey="target" name="target" stroke="#22c55e" strokeWidth={1.5} strokeDasharray="4 4" fill="none" />
              <Area type="monotone" dataKey="units" name="units" stroke="#3b82f6" strokeWidth={2.5} fill="url(#unitsGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="card p-6">
          <div className="mb-4">
            <h3 className="font-semibold text-white text-sm">Orders by Status</h3>
            <p className="text-xs text-surface-500">Current month</p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={ordersByStatus} cx="50%" cy="50%" innerRadius={50} outerRadius={74} paddingAngle={3} dataKey="value">
                {ordersByStatus.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip content={({ active, payload }) => {
                if (!active || !payload?.length) return null
                return <div className="glass rounded-xl px-3 py-2 border border-white/10 text-xs"><p className="text-white font-medium">{payload[0].name}: {payload[0].value}</p></div>
              }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {ordersByStatus.map((s, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ background: s.color }} /><span className="text-xs text-surface-400">{s.name}</span></div>
                <span className="text-xs font-semibold text-white">{s.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Revenue & Machine charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card p-6">
          <div className="mb-6">
            <h3 className="font-semibold text-white text-sm">Revenue, Cost & Profit</h3>
            <p className="text-xs text-surface-500">Last 6 months · $M</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueTrend} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={customTooltip} />
              <Bar dataKey="revenue" name="Revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="cost" name="Cost" fill="#64748b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="profit" name="Profit" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="card p-6">
          <div className="mb-6">
            <h3 className="font-semibold text-white text-sm">Machine Efficiency & Uptime</h3>
            <p className="text-xs text-surface-500">Current fleet</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={machineEfficiency} layout="vertical" margin={{ top: 0, right: 5, left: 20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <YAxis type="category" dataKey="machine" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={customTooltip} />
              <Bar dataKey="efficiency" name="efficiency" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              <Bar dataKey="uptime" name="uptime" fill="#22c55e" radius={[0, 4, 4, 0]} opacity={0.6} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  )
}
