import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TbUser, TbMail, TbPhone, TbBriefcase, TbEdit,
  TbCamera, TbShield, TbActivity, TbCheck
} from 'react-icons/tb'
import toast from 'react-hot-toast'

const activity = [
  { action: 'Updated Order ORD-2841 status', time: '10m ago', icon: TbActivity },
  { action: 'Generated December Production Report', time: '1h ago', icon: TbBriefcase },
  { action: 'Scheduled maintenance for CNC-07', time: '2h ago', icon: TbCheck },
  { action: 'Added supplier Sandvik AB', time: '1d ago', icon: TbUser },
  { action: 'Exported Inventory Audit Report', time: '2d ago', icon: TbCheck },
]

export default function Profile() {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    name: 'John Doe',
    role: 'Plant Manager',
    dept: 'Operations',
    email: 'john.doe@factoryos.ai',
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra',
    bio: 'Experienced manufacturing operations leader with 12+ years in automotive and industrial manufacturing. Passionate about AI-driven production optimization.',
  })

  const handleSave = () => {
    setEditing(false)
    toast.success('Profile updated successfully!')
  }

  const stats = [
    { label: 'Orders Managed', value: '1,284' },
    { label: 'Reports Generated', value: '142' },
    { label: 'Alerts Resolved', value: '89' },
    { label: 'Days Active', value: '847' },
  ]

  return (
    <div className="max-w-4xl space-y-6">
      {/* Profile card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-8">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-blue-500/30">
              JD
            </div>
            <button
              onClick={() => toast.success('Upload photo feature coming soon')}
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg hover:bg-blue-500 transition-colors"
            >
              <TbCamera size={15} className="text-white" />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-white">{form.name}</h2>
                <p className="text-surface-400">{form.role} · {form.dept}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 font-medium">Admin</span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-green-500/20 text-green-400 font-medium">Active</span>
                </div>
              </div>
              <button
                onClick={() => editing ? handleSave() : setEditing(true)}
                className={editing ? 'btn-primary text-sm px-4 py-2' : 'btn-secondary text-sm px-4 py-2 gap-2'}
              >
                {editing ? <><TbCheck size={15} /> Save</> : <><TbEdit size={15} /> Edit Profile</>}
              </button>
            </div>

            {!editing ? (
              <p className="text-sm text-surface-400 mt-4 leading-relaxed">{form.bio}</p>
            ) : (
              <textarea
                className="input mt-4 text-sm resize-none"
                rows={3}
                value={form.bio}
                onChange={e => setForm({ ...form, bio: e.target.value })}
              />
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/5">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl font-black gradient-text-blue">{s.value}</p>
              <p className="text-xs text-surface-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Contact info */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6">
        <h3 className="font-semibold text-white mb-5">Contact Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: TbMail, label: 'Email', key: 'email', type: 'email' },
            { icon: TbPhone, label: 'Phone', key: 'phone', type: 'tel' },
            { icon: TbBriefcase, label: 'Department', key: 'dept', type: 'text' },
            { icon: TbUser, label: 'Location', key: 'location', type: 'text' },
          ].map((field) => (
            <div key={field.key} className="flex items-center gap-3 p-4 rounded-xl bg-white/3 border border-white/5">
              <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                <field.icon size={17} className="text-surface-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-surface-600 mb-0.5">{field.label}</p>
                {editing ? (
                  <input
                    type={field.type}
                    className="bg-transparent text-white text-sm font-medium outline-none w-full"
                    value={form[field.key]}
                    onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                  />
                ) : (
                  <p className="text-sm font-medium text-white truncate">{form[field.key]}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent activity */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-6">
        <h3 className="font-semibold text-white mb-5">Recent Activity</h3>
        <div className="space-y-3">
          {activity.map((a, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                <a.icon size={15} className="text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-surface-300">{a.action}</p>
              </div>
              <span className="text-xs text-surface-600 shrink-0">{a.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
