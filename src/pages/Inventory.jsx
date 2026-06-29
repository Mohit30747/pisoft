import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TbPlus, TbSearch, TbPackage, TbAlertTriangle, TbEdit,
  TbTrash, TbArrowUp, TbArrowDown, TbRefresh, TbX, TbCheck
} from 'react-icons/tb'
import toast from 'react-hot-toast'

const initialInventory = [
  { id: 'INV-001', name: 'Steel Coil Grade A', category: 'Raw Material', warehouse: 'WH-01', quantity: 120, unit: 'kg', minStock: 500, maxStock: 2000, supplier: 'TATA Steel', cost: 2.4, status: 'Critical' },
  { id: 'INV-002', name: 'Aluminum Sheet 3mm', category: 'Raw Material', warehouse: 'WH-01', quantity: 850, unit: 'kg', minStock: 400, maxStock: 2000, supplier: 'Hindalco', cost: 3.8, status: 'Healthy' },
  { id: 'INV-003', name: 'CNC Cutting Tool Set', category: 'Tooling', warehouse: 'WH-02', quantity: 48, unit: 'pcs', minStock: 20, maxStock: 200, supplier: 'Sandvik', cost: 145, status: 'Healthy' },
  { id: 'INV-004', name: 'Hydraulic Oil ISO 46', category: 'Consumable', warehouse: 'WH-03', quantity: 280, unit: 'L', minStock: 100, maxStock: 1000, supplier: 'Castrol', cost: 0.8, status: 'Healthy' },
  { id: 'INV-005', name: 'Stainless Bolts M8', category: 'Fasteners', warehouse: 'WH-02', quantity: 3200, unit: 'pcs', minStock: 1000, maxStock: 10000, supplier: 'SPS Technologies', cost: 0.12, status: 'Healthy' },
  { id: 'INV-006', name: 'Copper Wire 2.5mm', category: 'Electrical', warehouse: 'WH-04', quantity: 180, unit: 'm', minStock: 500, maxStock: 3000, supplier: 'Polycab', cost: 0.9, status: 'Low' },
  { id: 'INV-007', name: 'Safety Gloves Class A', category: 'PPE', warehouse: 'WH-05', quantity: 65, unit: 'pairs', minStock: 50, maxStock: 500, supplier: 'Honeywell', cost: 12, status: 'Low' },
  { id: 'INV-008', name: 'Welding Wire ER70S', category: 'Consumable', warehouse: 'WH-03', quantity: 940, unit: 'kg', minStock: 200, maxStock: 2000, supplier: 'ESAB', cost: 2.1, status: 'Healthy' },
]

const statusColors = {
  Healthy: 'bg-green-500/20 text-green-400',
  Low: 'bg-amber-500/20 text-amber-400',
  Critical: 'bg-red-500/20 text-red-400',
  Overstocked: 'bg-blue-500/20 text-blue-400',
}

const categories = ['All', 'Raw Material', 'Tooling', 'Consumable', 'Fasteners', 'Electrical', 'PPE']

function AddModal({ onClose }) {
  const [form, setForm] = useState({ name: '', category: 'Raw Material', warehouse: 'WH-01', quantity: '', unit: 'kg', minStock: '', maxStock: '', supplier: '', cost: '' })

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-lg glass-strong rounded-3xl border border-white/8 p-7">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">Add Inventory Item</h2>
          <button onClick={onClose}><TbX size={18} className="text-surface-400" /></button>
        </div>
        <div className="space-y-3">
          {[
            { label: 'Item Name', key: 'name', placeholder: 'e.g. Steel Coil Grade A' },
            { label: 'Supplier', key: 'supplier', placeholder: 'e.g. TATA Steel' },
            { label: 'Cost per Unit ($)', key: 'cost', placeholder: 'e.g. 2.4' },
          ].map(f => (
            <div key={f.key}>
              <label className="label">{f.label}</label>
              <input className="input" placeholder={f.placeholder} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Category', key: 'category', options: ['Raw Material', 'Tooling', 'Consumable', 'Fasteners', 'Electrical', 'PPE'] },
              { label: 'Warehouse', key: 'warehouse', options: ['WH-01', 'WH-02', 'WH-03', 'WH-04', 'WH-05'] },
            ].map(f => (
              <div key={f.key}>
                <label className="label">{f.label}</label>
                <select className="input" value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}>
                  {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Quantity', key: 'quantity' },
              { label: 'Min Stock', key: 'minStock' },
              { label: 'Max Stock', key: 'maxStock' },
            ].map(f => (
              <div key={f.key}>
                <label className="label">{f.label}</label>
                <input type="number" className="input" value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="btn-secondary flex-1 justify-center">Cancel</button>
          <button onClick={() => { toast.success('Item added!'); onClose() }} className="btn-primary flex-1 justify-center">Add Item</button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Inventory() {
  const [items, setItems] = useState(initialInventory)
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('All')
  const [showModal, setShowModal] = useState(false)

  const filtered = items.filter(item =>
    (catFilter === 'All' || item.category === catFilter) &&
    (item.name.toLowerCase().includes(search.toLowerCase()) || item.id.toLowerCase().includes(search.toLowerCase()))
  )

  const alerts = items.filter(i => i.status === 'Critical' || i.status === 'Low')

  return (
    <div className="space-y-6">
      {/* Alerts */}
      {alerts.length > 0 && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-amber-500/8 border border-amber-500/20">
          <TbAlertTriangle size={20} className="text-amber-400 shrink-0" />
          <p className="text-sm text-amber-200 flex-1">
            <span className="font-semibold">{alerts.length} inventory alerts:</span>{' '}
            {alerts.map(a => a.name).join(', ')} — reorder recommended.
          </p>
          <button className="btn-secondary text-xs px-4 py-2 gap-1">
            <TbRefresh size={14} /> Auto-Reorder
          </button>
        </motion.div>
      )}

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Items', value: items.length, color: 'text-blue-400 bg-blue-400/10', icon: TbPackage },
          { label: 'Healthy Stock', value: items.filter(i => i.status === 'Healthy').length, color: 'text-green-400 bg-green-400/10', icon: TbCheck },
          { label: 'Low Stock', value: items.filter(i => i.status === 'Low').length, color: 'text-amber-400 bg-amber-400/10', icon: TbArrowDown },
          { label: 'Critical', value: items.filter(i => i.status === 'Critical').length, color: 'text-red-400 bg-red-400/10', icon: TbAlertTriangle },
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

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <TbSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" />
            <input className="input pl-9" placeholder="Search inventory..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(c => (
              <button key={c} onClick={() => setCatFilter(c)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${catFilter === c ? 'bg-blue-600 text-white' : 'bg-white/5 text-surface-400 hover:bg-white/10'}`}>
                {c}
              </button>
            ))}
          </div>
          <button onClick={() => setShowModal(true)} className="btn-primary text-sm px-4 py-2 gap-2">
            <TbPlus size={15} /> Add Item
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {['ID', 'Item Name', 'Category', 'Warehouse', 'Stock Level', 'Unit', 'Supplier', 'Cost/Unit', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-surface-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id} className="border-b border-white/3 hover:bg-white/2 transition-colors">
                  <td className="py-3.5 px-3 font-mono text-xs text-surface-500">{item.id}</td>
                  <td className="py-3.5 px-3 font-medium text-white text-xs">{item.name}</td>
                  <td className="py-3.5 px-3 text-xs text-surface-400">{item.category}</td>
                  <td className="py-3.5 px-3 text-xs text-surface-400">{item.warehouse}</td>
                  <td className="py-3.5 px-3 min-w-[120px]">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-dark-bg rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${item.status === 'Critical' ? 'bg-red-500' : item.status === 'Low' ? 'bg-amber-500' : 'bg-green-500'}`}
                          style={{ width: `${Math.min(100, (item.quantity / item.maxStock) * 100)}%` }}
                        />
                      </div>
                      <span className="text-xs text-white w-16 text-right">{item.quantity.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-xs text-surface-500">{item.unit}</td>
                  <td className="py-3.5 px-3 text-xs text-surface-400">{item.supplier}</td>
                  <td className="py-3.5 px-3 text-xs font-semibold text-white">${item.cost}</td>
                  <td className="py-3.5 px-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[item.status]}`}>{item.status}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex gap-1">
                      <button onClick={() => toast.success('Updated!')} className="p-1.5 rounded-lg hover:bg-white/5 text-surface-500 hover:text-blue-400 transition-colors"><TbEdit size={15} /></button>
                      <button onClick={() => { setItems(prev => prev.filter(i => i.id !== item.id)); toast.success('Removed') }} className="p-1.5 rounded-lg hover:bg-red-500/10 text-surface-500 hover:text-red-400 transition-colors"><TbTrash size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {showModal && <AddModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
