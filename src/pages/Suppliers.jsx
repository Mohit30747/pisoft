import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TbTruck, TbPlus, TbSearch, TbStar, TbArrowUpRight,
  TbCheck, TbX, TbAlertTriangle, TbEdit
} from 'react-icons/tb'
import toast from 'react-hot-toast'

const suppliers = [
  { id: 'SUP-001', name: 'TATA Steel Ltd', category: 'Raw Material', country: 'India', rating: 4.8, onTime: 96, quality: 98, active: true, orders: 142, totalValue: 2840000, contact: 'Suresh Patel', email: 'suresh@tatasteel.com', leadTime: '3-5 days', risk: 'Low' },
  { id: 'SUP-002', name: 'Sandvik AB', category: 'Tooling', country: 'Sweden', rating: 4.9, onTime: 99, quality: 99, active: true, orders: 89, totalValue: 1240000, contact: 'Erik Larsson', email: 'erik@sandvik.com', leadTime: '7-10 days', risk: 'Low' },
  { id: 'SUP-003', name: 'Hindalco Industries', category: 'Raw Material', country: 'India', rating: 4.3, onTime: 88, quality: 94, active: true, orders: 67, totalValue: 980000, contact: 'Amit Shah', email: 'amit@hindalco.com', leadTime: '4-6 days', risk: 'Medium' },
  { id: 'SUP-004', name: 'Castrol Industrial', category: 'Consumable', country: 'UK', rating: 4.6, onTime: 94, quality: 97, active: true, orders: 210, totalValue: 420000, contact: 'James Wilson', email: 'jwilson@castrol.com', leadTime: '2-3 days', risk: 'Low' },
  { id: 'SUP-005', name: 'Polycab Wires', category: 'Electrical', country: 'India', rating: 3.9, onTime: 81, quality: 91, active: true, orders: 44, totalValue: 320000, contact: 'Ramesh Kumar', email: 'ramesh@polycab.com', leadTime: '5-8 days', risk: 'High' },
  { id: 'SUP-006', name: 'SPS Technologies', category: 'Fasteners', country: 'USA', rating: 4.7, onTime: 97, quality: 98, active: false, orders: 188, totalValue: 560000, contact: 'Mike Johnson', email: 'mjohnson@sps.com', leadTime: '10-14 days', risk: 'Low' },
  { id: 'SUP-007', name: 'ESAB Welding', category: 'Consumable', country: 'USA', rating: 4.5, onTime: 93, quality: 96, active: true, orders: 76, totalValue: 280000, contact: 'Sarah Brown', email: 'sbrown@esab.com', leadTime: '3-5 days', risk: 'Low' },
]

const riskColors = {
  Low: 'bg-green-500/20 text-green-400',
  Medium: 'bg-amber-500/20 text-amber-400',
  High: 'bg-red-500/20 text-red-400',
}

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <TbStar key={i} size={12} className={i < Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-surface-700'} />
      ))}
      <span className="ml-1 text-xs font-semibold text-white">{rating}</span>
    </div>
  )
}

export default function Suppliers() {
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('All')

  const cats = ['All', ...new Set(suppliers.map(s => s.category))]

  const filtered = suppliers.filter(s =>
    (catFilter === 'All' || s.category === catFilter) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Suppliers', value: suppliers.length, color: 'text-blue-400 bg-blue-400/10', icon: TbTruck },
          { label: 'Active', value: suppliers.filter(s => s.active).length, color: 'text-green-400 bg-green-400/10', icon: TbCheck },
          { label: 'At Risk', value: suppliers.filter(s => s.risk === 'High').length, color: 'text-red-400 bg-red-400/10', icon: TbAlertTriangle },
          { label: 'Avg On-Time', value: Math.round(suppliers.reduce((a, s) => a + s.onTime, 0) / suppliers.length) + '%', color: 'text-cyan-400 bg-cyan-400/10', icon: TbStar },
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
          <input className="input pl-9" placeholder="Search suppliers..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {cats.map(c => (
            <button key={c} onClick={() => setCatFilter(c)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${catFilter === c ? 'bg-blue-600 text-white' : 'bg-white/5 text-surface-400 hover:bg-white/10'}`}>
              {c}
            </button>
          ))}
        </div>
        <button onClick={() => toast.success('Add supplier form coming soon')} className="btn-primary text-sm px-4 py-2 gap-2 ml-auto">
          <TbPlus size={15} /> Add Supplier
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((sup, i) => (
          <motion.div
            key={sup.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card p-6 hover:border-white/10 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-white text-sm">{sup.name}</h3>
                  {!sup.active && <span className="text-xs px-2 py-0.5 rounded-full bg-surface-700 text-surface-500">Inactive</span>}
                </div>
                <p className="text-xs text-surface-500">{sup.category} · {sup.country}</p>
                <StarRating rating={sup.rating} />
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${riskColors[sup.risk]}`}>{sup.risk} Risk</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: 'On-Time Delivery', value: sup.onTime + '%', color: sup.onTime >= 95 ? 'text-green-400' : sup.onTime >= 85 ? 'text-amber-400' : 'text-red-400' },
                { label: 'Quality Score', value: sup.quality + '%', color: 'text-blue-400' },
                { label: 'Total Orders', value: sup.orders, color: 'text-white' },
                { label: 'Lead Time', value: sup.leadTime, color: 'text-surface-300' },
              ].map((m, j) => (
                <div key={j} className="glass rounded-xl p-2.5">
                  <p className="text-xs text-surface-600 mb-0.5">{m.label}</p>
                  <p className={`text-sm font-bold ${m.color}`}>{m.value}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-white/5 pt-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-surface-600">{sup.contact}</p>
                <p className="text-xs text-surface-500">{sup.email}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => toast.success('Opening supplier profile')} className="p-1.5 rounded-lg hover:bg-white/5 text-surface-500 hover:text-blue-400 transition-colors">
                  <TbArrowUpRight size={15} />
                </button>
                <button onClick={() => toast.success('Editing supplier')} className="p-1.5 rounded-lg hover:bg-white/5 text-surface-500 hover:text-white transition-colors">
                  <TbEdit size={15} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
