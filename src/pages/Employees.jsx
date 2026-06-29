import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TbUsers, TbPlus, TbSearch, TbEdit, TbTrash,
  TbStar, TbBriefcase, TbCheck, TbCalendar, TbPhone
} from 'react-icons/tb'
import toast from 'react-hot-toast'

const employees = [
  { id: 'EMP-001', name: 'Ravi Kumar', role: 'CNC Operator', dept: 'Production', shift: 'Day', status: 'Active', performance: 94, attendance: 98, skills: ['CNC Machining', 'CAD', 'Quality Control'], salary: 52000, phone: '+91 98765 43210', joined: '2021-03-15', avatar: 'RK' },
  { id: 'EMP-002', name: 'Priya Nair', role: 'Sr. Machinist', dept: 'Production', shift: 'Day', status: 'Active', performance: 89, attendance: 95, skills: ['Lathe Operation', 'Precision Measurement', 'CNC'], salary: 58000, phone: '+91 87654 32109', joined: '2020-08-22', avatar: 'PN' },
  { id: 'EMP-003', name: 'Arjun Singh', role: 'Welding Specialist', dept: 'Fabrication', shift: 'Night', status: 'Active', performance: 91, attendance: 92, skills: ['MIG Welding', 'TIG Welding', 'Structural', 'SMAW'], salary: 54000, phone: '+91 76543 21098', joined: '2019-11-10', avatar: 'AS' },
  { id: 'EMP-004', name: 'Kavya Menon', role: 'Quality Inspector', dept: 'QA', shift: 'Day', status: 'Active', performance: 97, attendance: 99, skills: ['CMM Operation', 'Six Sigma', 'ISO 9001', 'SPC'], salary: 61000, phone: '+91 65432 10987', joined: '2022-01-05', avatar: 'KM' },
  { id: 'EMP-005', name: 'Rahul Verma', role: 'Maintenance Tech', dept: 'Maintenance', shift: 'Rotating', status: 'On Leave', performance: 86, attendance: 88, skills: ['Hydraulics', 'Electrical', 'PLC', 'Pneumatics'], salary: 56000, phone: '+91 54321 09876', joined: '2020-05-18', avatar: 'RV' },
  { id: 'EMP-006', name: 'Sneha Rao', role: 'CNC Programmer', dept: 'Engineering', shift: 'Day', status: 'Active', performance: 93, attendance: 96, skills: ['G-Code', 'Mastercam', 'SolidWorks', 'CNC Setup'], salary: 72000, phone: '+91 43210 98765', joined: '2021-09-01', avatar: 'SR' },
  { id: 'EMP-007', name: 'Vikram Joshi', role: 'Production Lead', dept: 'Production', shift: 'Day', status: 'Active', performance: 88, attendance: 94, skills: ['Team Leadership', 'Lean Manufacturing', 'Scheduling'], salary: 78000, phone: '+91 32109 87654', joined: '2018-06-12', avatar: 'VJ' },
  { id: 'EMP-008', name: 'Ananya Krishnan', role: 'Supply Chain Analyst', dept: 'Logistics', shift: 'Day', status: 'Active', performance: 91, attendance: 97, skills: ['SAP', 'Procurement', 'Supplier Management', 'ERP'], salary: 65000, phone: '+91 21098 76543', joined: '2022-07-25', avatar: 'AK' },
]

const deptColors = {
  Production: 'bg-blue-500/20 text-blue-400',
  Fabrication: 'bg-orange-500/20 text-orange-400',
  QA: 'bg-green-500/20 text-green-400',
  Maintenance: 'bg-cyan-500/20 text-cyan-400',
  Engineering: 'bg-violet-500/20 text-violet-400',
  Logistics: 'bg-pink-500/20 text-pink-400',
}

const avatarColors = ['from-blue-500 to-cyan-500', 'from-green-500 to-teal-500', 'from-orange-500 to-red-500', 'from-violet-500 to-purple-500', 'from-pink-500 to-rose-500', 'from-amber-500 to-yellow-500']

export default function Employees() {
  const [search, setSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState('All')

  const depts = ['All', ...new Set(employees.map(e => e.dept))]

  const filtered = employees.filter(e =>
    (deptFilter === 'All' || e.dept === deptFilter) &&
    (e.name.toLowerCase().includes(search.toLowerCase()) || e.role.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Employees', value: employees.length, color: 'text-blue-400 bg-blue-400/10', icon: TbUsers },
          { label: 'Active Today', value: employees.filter(e => e.status === 'Active').length, color: 'text-green-400 bg-green-400/10', icon: TbCheck },
          { label: 'On Leave', value: employees.filter(e => e.status === 'On Leave').length, color: 'text-amber-400 bg-amber-400/10', icon: TbCalendar },
          { label: 'Avg Performance', value: Math.round(employees.reduce((a, e) => a + e.performance, 0) / employees.length) + '%', color: 'text-cyan-400 bg-cyan-400/10', icon: TbStar },
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

      {/* Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <TbSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" />
          <input className="input pl-9" placeholder="Search employees..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {depts.map(d => (
            <button key={d} onClick={() => setDeptFilter(d)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${deptFilter === d ? 'bg-blue-600 text-white' : 'bg-white/5 text-surface-400 hover:bg-white/10'}`}>
              {d}
            </button>
          ))}
        </div>
        <button onClick={() => toast.success('Opening add employee form...')} className="btn-primary text-sm px-4 py-2 gap-2 ml-auto">
          <TbPlus size={15} /> Add Employee
        </button>
      </div>

      {/* Employee grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((emp, i) => (
          <motion.div
            key={emp.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            className="card p-5 hover:border-white/10 transition-all duration-300 group"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${avatarColors[i % 6]} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                {emp.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white text-sm truncate">{emp.name}</h3>
                <p className="text-xs text-surface-500 truncate">{emp.role}</p>
                <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-md ${deptColors[emp.dept] || 'bg-surface-700 text-surface-400'}`}>
                  {emp.dept}
                </span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${emp.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
                {emp.status}
              </span>
            </div>

            <div className="space-y-2.5 mb-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-surface-500">Performance</span>
                  <span className="font-semibold text-white">{emp.performance}%</span>
                </div>
                <div className="h-1.5 bg-dark-bg rounded-full">
                  <div className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: `${emp.performance}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-surface-500">Attendance</span>
                  <span className="font-semibold text-white">{emp.attendance}%</span>
                </div>
                <div className="h-1.5 bg-dark-bg rounded-full">
                  <div className="h-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: `${emp.attendance}%` }} />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {emp.skills.slice(0, 3).map(s => (
                <span key={s} className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-surface-400">{s}</span>
              ))}
              {emp.skills.length > 3 && <span className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-surface-500">+{emp.skills.length - 3}</span>}
            </div>

            <div className="border-t border-white/5 pt-3 flex items-center gap-2">
              <TbBriefcase size={13} className="text-surface-600" />
              <span className="text-xs text-surface-500 flex-1">{emp.shift} Shift · Joined {emp.joined.split('-')[0]}</span>
              <button onClick={() => toast.success(`Editing ${emp.name}`)} className="p-1.5 rounded-lg hover:bg-white/5 text-surface-500 hover:text-blue-400 transition-colors">
                <TbEdit size={15} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
