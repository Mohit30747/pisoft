import { motion } from 'framer-motion'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import {
  TbTrendingUp, TbTrendingDown, TbPackage, TbShoppingCart,
  TbTool, TbUsers, TbAlertTriangle, TbCheck, TbActivity,
  TbArrowUpRight, TbBrain, TbSparkles, TbClock, TbDots
} from 'react-icons/tb'
import { Link } from 'react-router-dom'

const productionData = [
  { day: 'Mon', actual: 82, target: 90, efficiency: 91 },
  { day: 'Tue', actual: 88, target: 90, efficiency: 97 },
  { day: 'Wed', actual: 75, target: 90, efficiency: 83 },
  { day: 'Thu', actual: 91, target: 90, efficiency: 101 },
  { day: 'Fri', actual: 94, target: 90, efficiency: 104 },
  { day: 'Sat', actual: 86, target: 90, efficiency: 95 },
  { day: 'Sun', actual: 79, target: 90, efficiency: 87 },
]

const revenueData = [
  { month: 'Jan', revenue: 2.1, orders: 218 },
  { month: 'Feb', revenue: 2.4, orders: 245 },
  { month: 'Mar', revenue: 2.2, orders: 231 },
  { month: 'Apr', revenue: 2.8, orders: 287 },
  { month: 'May', revenue: 3.1, orders: 312 },
  { month: 'Jun', revenue: 2.9, orders: 295 },
  { month: 'Jul', revenue: 3.4, orders: 341 },
  { month: 'Aug', revenue: 3.2, orders: 328 },
  { month: 'Sep', revenue: 3.7, orders: 374 },
  { month: 'Oct', revenue: 3.5, orders: 352 },
  { month: 'Nov', revenue: 4.1, orders: 418 },
  { month: 'Dec', revenue: 3.8, orders: 389 },
]

const machineStatus = [
  { name: 'Running', value: 18, color: '#22c55e' },
  { name: 'Idle', value: 4, color: '#64748b' },
  { name: 'Maintenance', value: 2, color: '#f59e0b' },
  { name: 'Error', value: 1, color: '#ef4444' },
]

const recentOrders = [
  { id: 'ORD-2841', customer: 'Siemens AG', product: 'CNC Components', value: '$48,200', status: 'In Progress', priority: 'High', date: '2024-12-28' },
  { id: 'ORD-2840', customer: 'Bosch GmbH', product: 'Precision Parts', value: '$32,800', status: 'Completed', priority: 'Medium', date: '2024-12-27' },
  { id: 'ORD-2839', customer: 'ABB Ltd', product: 'Motor Assemblies', value: '$94,100', status: 'Pending', priority: 'High', date: '2024-12-26' },
  { id: 'ORD-2838', customer: 'KUKA AG', product: 'Robotic Arms', value: '$128,500', status: 'In Progress', priority: 'Critical', date: '2024-12-26' },
  { id: 'ORD-2837', customer: 'Fanuc Corp', product: 'Control Panels', value: '$21,300', status: 'Completed', priority: 'Low', date: '2024-12-25' },
]

const recentActivity = [
  { icon: TbCheck, text: 'Order ORD-2837 completed ahead of schedule', time: '5m ago', color: 'text-green-400 bg-green-400/10' },
  { icon: TbAlertTriangle, text: 'Machine CNC-07 temperature alert triggered', time: '12m ago', color: 'text-amber-400 bg-amber-400/10' },
  { icon: TbPackage, text: 'Low inventory alert: Steel Coil A (12% remaining)', time: '34m ago', color: 'text-red-400 bg-red-400/10' },
  { icon: TbUsers, text: '3 employees added to Night Shift schedule', time: '1h ago', color: 'text-blue-400 bg-blue-400/10' },
  { icon: TbTrendingUp, text: 'Production efficiency exceeded target by 4%', time: '2h ago', color: 'text-cyan-400 bg-cyan-400/10' },
]

const kpis = [
  {
    title: 'Total Orders',
    value: '1,284',
    change: '+12.4%',
    up: true,
    sub: 'vs last month',
    icon: TbShoppingCart,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  {
    title: 'Revenue MTD',
    value: '$3.84M',
    change: '+18.2%',
    up: true,
    sub: 'vs last month',
    icon: TbTrendingUp,
    color: 'text-green-400',
    bg: 'bg-green-400/10',
  },
  {
    title: 'Active Machines',
    value: '18 / 25',
    change: '-1',
    up: false,
    sub: 'CNC-07 in maintenance',
    icon: TbTool,
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
  },
  {
    title: 'Inventory Health',
    value: '84%',
    change: '-3.1%',
    up: false,
    sub: '4 items low stock',
    icon: TbPackage,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
  },
  {
    title: 'Workforce Active',
    value: '142 / 165',
    change: '+5',
    up: true,
    sub: '23 on leave',
    icon: TbUsers,
    color: 'text-violet-400',
    bg: 'bg-violet-400/10',
  },
  {
    title: 'On-Time Delivery',
    value: '96.2%',
    change: '+2.1%',
    up: true,
    sub: 'vs 94.1% last month',
    icon: TbActivity,
    color: 'text-pink-400',
    bg: 'bg-pink-400/10',
  },
]

const statusColors = {
  'Completed': 'bg-green-500/20 text-green-400',
  'In Progress': 'bg-blue-500/20 text-blue-400',
  'Pending': 'bg-amber-500/20 text-amber-400',
  'Cancelled': 'bg-red-500/20 text-red-400',
}

const priorityColors = {
  'Critical': 'text-red-400',
  'High': 'text-amber-400',
  'Medium': 'text-blue-400',
  'Low': 'text-surface-500',
}

const customTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass rounded-xl px-4 py-3 border border-white/10 shadow-xl text-sm">
      <p className="font-semibold text-white mb-1">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-surface-400">{p.name}:</span>
          <span className="text-white font-medium">{p.value}{p.name === 'Revenue' ? 'M' : p.name.includes('eff') ? '%' : ''}</span>
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* AI Insight Banner */}
      <motion.div
        initial={{ opacity: 0, y: -15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex items-center gap-4 px-5 py-4 rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(6,182,212,0.1) 100%)',
          border: '1px solid rgba(59,130,246,0.2)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 10px 30px rgba(59,130,246,0.1)',
        }}
      >
        {/* Animated glow */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 0% 50%, rgba(37,99,235,0.2) 0%, transparent 50%)',
          }}
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="relative w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #0891b2 100%)',
            boxShadow: '0 8px 20px rgba(37,99,235,0.4)',
          }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <TbBrain size={22} className="text-white" />
          </motion.div>
        </motion.div>
        <div className="flex-1 min-w-0 relative z-10">
          <p className="text-sm text-white font-medium">
            <span className="text-blue-400 font-semibold">AI Insight:</span> Production efficiency is at <span className="text-green-400 font-semibold">94.2%</span> — up 2.1% from yesterday.
            CNC-07 needs maintenance attention. Steel Coil A inventory is critically low at 12%.
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.05, x: 3 }} whileTap={{ scale: 0.97 }}>
          <Link to="/app/ai-assistant" className="shrink-0 text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
            Full Analysis <TbArrowUpRight size={14} />
          </Link>
        </motion.div>
      </motion.div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: i * 0.06,
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1]
            }}
            whileHover={{ scale: 1.02, y: -3 }}
            className="stat-card group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-surface-500 text-xs font-semibold mb-1.5 uppercase tracking-wide">{kpi.title}</p>
                <p className="text-3xl font-black text-white">{kpi.value}</p>
              </div>
              <motion.div
                className={`w-11 h-11 rounded-xl ${kpi.bg} flex items-center justify-center group-hover:scale-110 transition-all duration-300`}
                style={{ boxShadow: `0 5px 15px ${kpi.color.replace('text-', 'rgba(').replace('-400,', ',150,').replace('-400)', ',0.2)')}` }}
                whileHover={{ rotate: 8 }}
              >
                <kpi.icon size={22} className={kpi.color} />
              </motion.div>
            </div>
            <div className="flex items-center gap-2">
              {kpi.up ? (
                <TbTrendingUp size={15} className="text-green-400" />
              ) : (
                <TbTrendingDown size={15} className="text-red-400" />
              )}
              <span className={`text-xs font-bold ${kpi.up ? 'text-green-400' : 'text-red-400'}`}>
                {kpi.change}
              </span>
              <span className="text-xs text-surface-500">{kpi.sub}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Production chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="xl:col-span-2 card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-white text-sm">Production vs Target</h3>
              <p className="text-xs text-surface-500">This week · Units per shift</p>
            </div>
            <span className="text-xs px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 font-medium">
              +4.1% above target
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={productionData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={customTooltip} />
              <Area type="monotone" dataKey="target" name="Target" stroke="#22c55e" strokeWidth={1.5} strokeDasharray="4 4" fill="url(#targetGrad)" />
              <Area type="monotone" dataKey="actual" name="Actual" stroke="#3b82f6" strokeWidth={2} fill="url(#actualGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Machine status pie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="card p-6"
        >
          <div className="mb-6">
            <h3 className="font-semibold text-white text-sm">Machine Status</h3>
            <p className="text-xs text-surface-500">25 total machines</p>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={machineStatus}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={72}
                paddingAngle={3}
                dataKey="value"
              >
                {machineStatus.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={({ active, payload }) => {
                if (!active || !payload?.length) return null
                return (
                  <div className="glass rounded-xl px-3 py-2 border border-white/10 text-xs">
                    <p className="text-white font-medium">{payload[0].name}: {payload[0].value}</p>
                  </div>
                )
              }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {machineStatus.map((s, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  <span className="text-xs text-surface-400">{s.name}</span>
                </div>
                <span className="text-xs font-semibold text-white">{s.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Revenue chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-white text-sm">Revenue & Orders — 2024</h3>
            <p className="text-xs text-surface-500">Monthly breakdown</p>
          </div>
          <span className="text-xs px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 font-medium">
            $38.2M total
          </span>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={revenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={customTooltip} />
            <Bar dataKey="revenue" name="Revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} opacity={0.85} />
            <Bar dataKey="orders" name="Orders" fill="#06b6d4" radius={[4, 4, 0, 0]} opacity={0.6} yAxisId="right" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="xl:col-span-3 card p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-white text-sm">Recent Orders</h3>
              <p className="text-xs text-surface-500">Latest 5 orders</p>
            </div>
            <Link to="/app/orders" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
              View all <TbArrowUpRight size={13} />
            </Link>
          </div>
          <div className="space-y-2">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/3 transition-colors duration-200">
                <div className="w-8 h-8 rounded-lg bg-blue-600/15 flex items-center justify-center shrink-0">
                  <TbShoppingCart size={15} className="text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-blue-400">{order.id}</span>
                    <span className={`text-xs font-semibold ${priorityColors[order.priority]}`}>
                      {order.priority}
                    </span>
                  </div>
                  <p className="text-xs text-surface-400 truncate">{order.customer} · {order.product}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                  <p className="text-xs font-semibold text-white mt-1">{order.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="xl:col-span-2 card p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-white text-sm">Activity Feed</h3>
            <TbDots size={16} className="text-surface-500" />
          </div>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-7 h-7 rounded-lg ${item.color} flex items-center justify-center shrink-0 mt-0.5`}>
                  <item.icon size={14} />
                </div>
                <div>
                  <p className="text-xs text-surface-300 leading-relaxed">{item.text}</p>
                  <p className="text-xs text-surface-600 mt-0.5 flex items-center gap-1">
                    <TbClock size={11} /> {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
