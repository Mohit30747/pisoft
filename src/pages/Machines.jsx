import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TbTool, TbAlertTriangle, TbCheck, TbActivity,
  TbThermometer, TbClock, TbPlus, TbEdit, TbSearch, TbX
} from 'react-icons/tb'
import {
  RadialBarChart, RadialBar, ResponsiveContainer, Tooltip
} from 'recharts'
import toast from 'react-hot-toast'

const machines = [
  { id: 'CNC-01', name: 'CNC Machining Center', type: 'CNC', status: 'Running', efficiency: 94, temp: 72, hours: 8421, lastMaint: '2024-11-15', nextMaint: '2025-02-15', operator: 'Ravi Kumar', location: 'Bay A', alerts: 0 },
  { id: 'CNC-07', name: 'CNC Turning Center', type: 'CNC', status: 'Warning', efficiency: 61, temp: 94, hours: 12048, lastMaint: '2024-08-20', nextMaint: '2024-12-30', operator: 'Priya Nair', location: 'Bay A', alerts: 2 },
  { id: 'WELD-01', name: 'MIG Welder Station', type: 'Welding', status: 'Running', efficiency: 88, temp: 65, hours: 5632, lastMaint: '2024-10-30', nextMaint: '2025-01-30', operator: 'Arjun Singh', location: 'Bay B', alerts: 0 },
  { id: 'WELD-03', name: 'TIG Welder Station', type: 'Welding', status: 'Running', efficiency: 91, temp: 68, hours: 4218, lastMaint: '2024-11-01', nextMaint: '2025-02-01', operator: 'Kavya Menon', location: 'Bay B', alerts: 0 },
  { id: 'PRESS-12', name: 'Hydraulic Press 200T', type: 'Press', status: 'Idle', efficiency: 0, temp: 28, hours: 9871, lastMaint: '2024-12-01', nextMaint: '2025-03-01', operator: 'Unassigned', location: 'Bay C', alerts: 0 },
  { id: 'LATHE-02', name: 'CNC Lathe Machine', type: 'CNC', status: 'Running', efficiency: 86, temp: 71, hours: 7234, lastMaint: '2024-10-15', nextMaint: '2025-01-15', operator: 'Rahul Verma', location: 'Bay A', alerts: 0 },
  { id: 'GRIND-04', name: 'Surface Grinder', type: 'Grinding', status: 'Maintenance', efficiency: 0, temp: 22, hours: 15420, lastMaint: '2024-12-20', nextMaint: '2025-01-20', operator: 'Unassigned', location: 'Bay D', alerts: 1 },
  { id: 'DRILL-08', name: 'CNC Drill Press', type: 'Drilling', status: 'Running', efficiency: 79, temp: 58, hours: 3891, lastMaint: '2024-11-20', nextMaint: '2025-02-20', operator: 'Sneha Rao', location: 'Bay C', alerts: 0 },
]

const statusColors = {
  Running: { dot: 'bg-green-400', badge: 'bg-green-500/20 text-green-400', label: 'Running' },
  Warning: { dot: 'bg-amber-400 animate-pulse', badge: 'bg-amber-500/20 text-amber-400', label: 'Warning' },
  Idle: { dot: 'bg-surface-500', badge: 'bg-surface-700 text-surface-400', label: 'Idle' },
  Maintenance: { dot: 'bg-blue-400', badge: 'bg-blue-500/20 text-blue-400', label: 'Maintenance' },
  Error: { dot: 'bg-red-400 animate-pulse', badge: 'bg-red-500/20 text-red-400', label: 'Error' },
}

function MachineCard({ machine }) {
  const s = statusColors[machine.status]
  const effColor = machine.efficiency > 80 ? '#22c55e' : machine.efficiency > 50 ? '#f59e0b' : '#ef4444'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`card p-5 hover:border-white/10 transition-all duration-300 cursor-pointer ${machine.alerts > 0 ? 'border-amber-500/20' : ''}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-2 h-2 rounded-full ${s.dot}`} />
            <span className="text-xs font-bold text-blue-400 font-mono">{machine.id}</span>
          </div>
          <h3 className="font-semibold text-white text-sm">{machine.name}</h3>
          <p className="text-xs text-surface-500">{machine.location} · {machine.type}</p>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${s.badge}`}>{s.label}</span>
      </div>

      {/* Efficiency ring */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-16 h-16">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%" cy="50%"
              innerRadius="60%" outerRadius="100%"
              barSize={6}
              data={[{ value: machine.efficiency, fill: effColor }]}
              startAngle={90} endAngle={90 - (machine.efficiency / 100) * 360}
            >
              <RadialBar dataKey="value" cornerRadius={3} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold" style={{ color: effColor }}>{machine.efficiency}%</span>
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <TbThermometer size={13} className={machine.temp > 85 ? 'text-red-400' : 'text-surface-500'} />
            <span className={`text-xs font-medium ${machine.temp > 85 ? 'text-red-400' : 'text-white'}`}>{machine.temp}°C</span>
          </div>
          <div className="flex items-center gap-2">
            <TbClock size={13} className="text-surface-500" />
            <span className="text-xs text-surface-400">{machine.hours.toLocaleString()} hrs</span>
          </div>
          {machine.alerts > 0 && (
            <div className="flex items-center gap-2">
              <TbAlertTriangle size={13} className="text-amber-400" />
              <span className="text-xs text-amber-400">{machine.alerts} alert{machine.alerts > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-white/5 pt-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-surface-600">Operator</p>
          <p className="text-xs font-medium text-white">{machine.operator}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-surface-600">Next Maint.</p>
          <p className="text-xs font-medium text-white">{machine.nextMaint}</p>
        </div>
      </div>

      <button
        onClick={() => toast.success(`Scheduling maintenance for ${machine.id}`)}
        className="mt-3 w-full py-2 rounded-xl bg-white/3 hover:bg-white/7 text-surface-400 hover:text-white text-xs font-medium transition-all flex items-center justify-center gap-1"
      >
        <TbEdit size={13} /> Schedule Maintenance
      </button>
    </motion.div>
  )
}

export default function Machines() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filtered = machines.filter(m =>
    (statusFilter === 'All' || m.status === statusFilter) &&
    (m.id.toLowerCase().includes(search.toLowerCase()) || m.name.toLowerCase().includes(search.toLowerCase()))
  )

  const summary = {
    running: machines.filter(m => m.status === 'Running').length,
    warning: machines.filter(m => m.status === 'Warning').length,
    maintenance: machines.filter(m => m.status === 'Maintenance').length,
    idle: machines.filter(m => m.status === 'Idle').length,
  }

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Running', value: summary.running, icon: TbActivity, color: 'text-green-400 bg-green-400/10' },
          { label: 'Warning', value: summary.warning, icon: TbAlertTriangle, color: 'text-amber-400 bg-amber-400/10' },
          { label: 'Maintenance', value: summary.maintenance, icon: TbTool, color: 'text-blue-400 bg-blue-400/10' },
          { label: 'Idle', value: summary.idle, icon: TbClock, color: 'text-surface-400 bg-surface-700' },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-surface-500 text-xs mb-1">{s.label}</p>
                <p className="text-2xl font-black text-white">{s.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon size={20} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <TbSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" />
          <input className="input pl-9" placeholder="Search machines..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['All', 'Running', 'Warning', 'Idle', 'Maintenance'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${statusFilter === s ? 'bg-blue-600 text-white' : 'bg-white/5 text-surface-400 hover:bg-white/10'}`}>
              {s}
            </button>
          ))}
        </div>
        <button onClick={() => toast.success('Adding machine...')} className="btn-primary text-sm px-4 py-2 gap-2 ml-auto">
          <TbPlus size={15} /> Add Machine
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map(machine => <MachineCard key={machine.id} machine={machine} />)}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-surface-500">
          <TbTool size={40} className="mx-auto mb-3 opacity-30" />
          <p>No machines match your filter</p>
        </div>
      )}
    </div>
  )
}
