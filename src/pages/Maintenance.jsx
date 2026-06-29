import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TbTool, TbPlus, TbCalendar, TbAlertTriangle,
  TbCheck, TbClock, TbEdit
} from 'react-icons/tb'
import toast from 'react-hot-toast'

const maintenanceTasks = [
  { id: 'MNT-001', machine: 'CNC-07', type: 'Emergency', issue: 'Overheating — Temperature at 94°C', technician: 'Rahul Verma', scheduled: '2024-12-28', status: 'In Progress', priority: 'Critical', estimatedHours: 4, notes: 'Check coolant system and thermal paste on spindle.' },
  { id: 'MNT-002', machine: 'GRIND-04', type: 'Preventive', issue: 'Monthly PM Schedule', technician: 'Vikram Joshi', scheduled: '2024-12-29', status: 'Scheduled', priority: 'Medium', estimatedHours: 2, notes: 'Lubrication, wheel dressing, and belt check.' },
  { id: 'MNT-003', machine: 'CNC-01', type: 'Inspection', issue: 'Quarterly full inspection', technician: 'Ravi Kumar', scheduled: '2024-12-30', status: 'Scheduled', priority: 'Low', estimatedHours: 3, notes: 'Full axis calibration and tool changer check.' },
  { id: 'MNT-004', machine: 'PRESS-12', type: 'Preventive', issue: 'Hydraulic fluid change', technician: 'Arjun Singh', scheduled: '2025-01-02', status: 'Scheduled', priority: 'Medium', estimatedHours: 1, notes: 'Change ISO 46 hydraulic oil. Check seals.' },
  { id: 'MNT-005', machine: 'WELD-01', type: 'Corrective', issue: 'Wire feed mechanism jamming', technician: 'Sneha Rao', scheduled: '2024-12-28', status: 'Completed', priority: 'High', estimatedHours: 2, notes: 'Cleaned and adjusted wire guide. Problem resolved.' },
  { id: 'MNT-006', machine: 'LATHE-02', type: 'Preventive', issue: 'Spindle bearing replacement', technician: 'Priya Nair', scheduled: '2025-01-05', status: 'Scheduled', priority: 'High', estimatedHours: 6, notes: 'Replace front and rear spindle bearings per 12-month schedule.' },
]

const priorityColors = {
  Critical: 'bg-red-500/20 text-red-400',
  High: 'bg-amber-500/20 text-amber-400',
  Medium: 'bg-blue-500/20 text-blue-400',
  Low: 'bg-surface-700 text-surface-400',
}

const statusColors = {
  'In Progress': 'bg-blue-500/20 text-blue-400',
  'Scheduled': 'bg-amber-500/20 text-amber-400',
  'Completed': 'bg-green-500/20 text-green-400',
}

const typeColors = {
  Emergency: 'text-red-400',
  Corrective: 'text-amber-400',
  Preventive: 'text-blue-400',
  Inspection: 'text-cyan-400',
}

export default function Maintenance() {
  const [filter, setFilter] = useState('All')

  const filtered = maintenanceTasks.filter(t => filter === 'All' || t.status === filter)

  const summary = {
    total: maintenanceTasks.length,
    inProgress: maintenanceTasks.filter(t => t.status === 'In Progress').length,
    scheduled: maintenanceTasks.filter(t => t.status === 'Scheduled').length,
    completed: maintenanceTasks.filter(t => t.status === 'Completed').length,
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Tasks', value: summary.total, color: 'text-blue-400 bg-blue-400/10', icon: TbTool },
          { label: 'In Progress', value: summary.inProgress, color: 'text-blue-400 bg-blue-400/10', icon: TbClock },
          { label: 'Scheduled', value: summary.scheduled, color: 'text-amber-400 bg-amber-400/10', icon: TbCalendar },
          { label: 'Completed', value: summary.completed, color: 'text-green-400 bg-green-400/10', icon: TbCheck },
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

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {['All', 'In Progress', 'Scheduled', 'Completed'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${filter === f ? 'bg-blue-600 text-white' : 'bg-white/5 text-surface-400 hover:bg-white/10'}`}>
              {f}
            </button>
          ))}
        </div>
        <button onClick={() => toast.success('Opening maintenance scheduler')} className="btn-primary text-sm px-4 py-2 gap-2">
          <TbPlus size={15} /> Schedule Task
        </button>
      </div>

      <div className="space-y-3">
        {filtered.map((task, i) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`card p-5 border transition-all ${task.priority === 'Critical' ? 'border-red-500/20' : task.priority === 'High' ? 'border-amber-500/20' : ''}`}
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                <TbTool size={18} className={typeColors[task.type]} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-semibold text-white text-sm">{task.machine}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[task.priority]}`}>{task.priority}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[task.status]}`}>{task.status}</span>
                  <span className={`text-xs font-medium ${typeColors[task.type]}`}>{task.type}</span>
                </div>
                <p className="text-sm text-surface-300 mb-2">{task.issue}</p>
                <p className="text-xs text-surface-500 mb-2">{task.notes}</p>
                <div className="flex flex-wrap gap-4 text-xs text-surface-500">
                  <span className="flex items-center gap-1"><TbCalendar size={12} /> {task.scheduled}</span>
                  <span className="flex items-center gap-1"><TbClock size={12} /> Est. {task.estimatedHours}h</span>
                  <span>Technician: <span className="text-white">{task.technician}</span></span>
                  <span className="font-mono text-surface-600">{task.id}</span>
                </div>
              </div>
              <button onClick={() => toast.success('Opening task editor')} className="p-2 rounded-xl hover:bg-white/5 text-surface-500 hover:text-white transition-colors shrink-0">
                <TbEdit size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
