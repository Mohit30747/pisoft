import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TbBell, TbCheck, TbTrash, TbAlertTriangle,
  TbInfoCircle, TbX, TbFilter
} from 'react-icons/tb'
import { useApp } from '../context/AppContext.jsx'
import toast from 'react-hot-toast'

const allNotifications = [
  { id: 1, type: 'warning', title: 'Machine CNC-07 overheating', body: 'Temperature reached 94°C — above safe threshold of 85°C. Immediate maintenance recommended.', time: '2m ago', read: false, category: 'Machine' },
  { id: 2, type: 'error', title: 'Low inventory: Steel Coil A', body: 'Current stock at 12% capacity (120kg). Minimum threshold is 500kg. Reorder from TATA Steel immediately.', time: '15m ago', read: false, category: 'Inventory' },
  { id: 3, type: 'success', title: 'Order #ORD-2840 completed', body: 'Precision Gears Set for Bosch GmbH delivered on time. Customer satisfaction score: 4.9/5.', time: '1h ago', read: true, category: 'Order' },
  { id: 4, type: 'info', title: 'AI report ready for review', body: 'December production analysis report has been generated. Efficiency improved 4.2% from November.', time: '2h ago', read: true, category: 'AI' },
  { id: 5, type: 'warning', title: 'Supplier delivery delayed', body: 'Polycab Wires PO-8821 delayed by 3 days. This may impact production orders ORD-2845, ORD-2847.', time: '3h ago', read: true, category: 'Supplier' },
  { id: 6, type: 'success', title: 'New employee onboarded', body: 'Ananya Krishnan has completed onboarding and is now assigned to Logistics department.', time: '5h ago', read: true, category: 'HR' },
  { id: 7, type: 'error', title: 'Machine GRIND-04 offline', body: 'Surface Grinder went offline for scheduled maintenance. Estimated downtime: 6 hours.', time: '6h ago', read: true, category: 'Machine' },
  { id: 8, type: 'info', title: 'Shift change reminder', body: 'Night shift begins at 22:00. 42 employees scheduled. 3 absentees reported.', time: '8h ago', read: true, category: 'HR' },
  { id: 9, type: 'success', title: 'Revenue target achieved', body: 'Monthly revenue target of $3.5M has been achieved with 5 days remaining in December.', time: '1d ago', read: true, category: 'Finance' },
  { id: 10, type: 'warning', title: 'Maintenance overdue: LATHE-02', body: 'Spindle bearing replacement is 2 days overdue from schedule. Risk of unexpected downtime increasing.', time: '1d ago', read: true, category: 'Machine' },
]

const typeConfig = {
  warning: { icon: TbAlertTriangle, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-500/20' },
  error: { icon: TbX, color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-500/20' },
  success: { icon: TbCheck, color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-500/20' },
  info: { icon: TbInfoCircle, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-500/20' },
}

export default function Notifications() {
  const { markAllRead } = useApp()
  const [notifications, setNotifications] = useState(allNotifications)
  const [filter, setFilter] = useState('All')
  const [catFilter, setCatFilter] = useState('All')

  const cats = ['All', ...new Set(allNotifications.map(n => n.category))]

  const filtered = notifications.filter(n => {
    const typeMatch = filter === 'All' || (filter === 'Unread' ? !n.read : n.read)
    const catMatch = catFilter === 'All' || n.category === catFilter
    return typeMatch && catMatch
  })

  const markRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  const deleteNotif = (id) => { setNotifications(prev => prev.filter(n => n.id !== id)); toast.success('Notification removed') }
  const markAll = () => { setNotifications(prev => prev.map(n => ({ ...n, read: true }))); markAllRead(); toast.success('All marked as read') }

  const unread = notifications.filter(n => !n.read).length

  return (
    <div className="space-y-6">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          <h2 className="font-bold text-white">Notifications</h2>
          <p className="text-sm text-surface-500">{unread} unread notifications</p>
        </div>
        <div className="flex gap-2">
          <button onClick={markAll} className="btn-secondary text-xs px-4 py-2 gap-1.5">
            <TbCheck size={14} /> Mark all read
          </button>
          <button onClick={() => toast.success('Filter settings')} className="btn-secondary text-xs px-4 py-2 gap-1.5">
            <TbFilter size={14} /> Filter
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          {['All', 'Unread', 'Read'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${filter === f ? 'bg-blue-600 text-white' : 'bg-white/5 text-surface-400 hover:bg-white/10'}`}>
              {f}
              {f === 'Unread' && unread > 0 && <span className="ml-1.5 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{unread}</span>}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {cats.map(c => (
            <button key={c} onClick={() => setCatFilter(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${catFilter === c ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-white/3 text-surface-500 hover:bg-white/8'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Notification list */}
      <div className="space-y-2">
        {filtered.map((notif, i) => {
          const cfg = typeConfig[notif.type]
          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`card p-4 transition-all ${!notif.read ? `border-l-2 ${cfg.border.replace('border', 'border-l')}` : ''}`}
              onClick={() => markRead(notif.id)}
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl ${cfg.bg} flex items-center justify-center shrink-0`}>
                  <cfg.icon size={18} className={cfg.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className={`text-sm font-semibold ${notif.read ? 'text-surface-300' : 'text-white'}`}>{notif.title}</p>
                        {!notif.read && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />}
                      </div>
                      <p className="text-xs text-surface-500 mt-0.5 leading-relaxed">{notif.body}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="text-xs text-surface-600">{notif.time}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteNotif(notif.id) }}
                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-surface-600 hover:text-red-400 transition-colors"
                      >
                        <TbTrash size={13} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={`text-xs px-2 py-0.5 rounded-md ${cfg.bg} ${cfg.color}`}>{notif.category}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-surface-500">
            <TbBell size={40} className="mx-auto mb-3 opacity-30" />
            <p>No notifications in this filter</p>
          </div>
        )}
      </div>
    </div>
  )
}
