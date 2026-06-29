import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TbPlus, TbSearch, TbFilter, TbDownload, TbEdit, TbTrash,
  TbEye, TbChevronUp, TbChevronDown, TbShoppingCart, TbAlertTriangle,
  TbCheck, TbClock, TbX
} from 'react-icons/tb'
import toast from 'react-hot-toast'

const initialOrders = [
  { id: 'ORD-2841', customer: 'Siemens AG', product: 'CNC Components Batch A', machine: 'CNC-01', employee: 'Ravi Kumar', value: 48200, status: 'In Progress', priority: 'High', deadline: '2024-12-30', created: '2024-12-20', progress: 65 },
  { id: 'ORD-2840', customer: 'Bosch GmbH', product: 'Precision Gears Set', machine: 'CNC-03', employee: 'Priya Nair', value: 32800, status: 'Completed', priority: 'Medium', deadline: '2024-12-27', created: '2024-12-18', progress: 100 },
  { id: 'ORD-2839', customer: 'ABB Ltd', product: 'Motor Assembly Units', machine: 'WELD-01', employee: 'Arjun Singh', value: 94100, status: 'Pending', priority: 'High', deadline: '2025-01-05', created: '2024-12-22', progress: 0 },
  { id: 'ORD-2838', customer: 'KUKA AG', product: 'Robotic Joint Arms', machine: 'CNC-07', employee: 'Sneha Rao', value: 128500, status: 'In Progress', priority: 'Critical', deadline: '2024-12-29', created: '2024-12-19', progress: 42 },
  { id: 'ORD-2837', customer: 'Fanuc Corp', product: 'Control Panel Housing', machine: 'PRESS-12', employee: 'Vikram Joshi', value: 21300, status: 'Completed', priority: 'Low', deadline: '2024-12-25', created: '2024-12-15', progress: 100 },
  { id: 'ORD-2836', customer: 'Mitsubishi Elec', product: 'Servo Drive Mounts', machine: 'CNC-02', employee: 'Kavya Menon', value: 67400, status: 'In Progress', priority: 'Medium', deadline: '2025-01-02', created: '2024-12-21', progress: 78 },
  { id: 'ORD-2835', customer: 'Yaskawa Corp', product: 'Precision Shafts', machine: 'CNC-05', employee: 'Rahul Verma', value: 43200, status: 'Cancelled', priority: 'Low', deadline: '2024-12-28', created: '2024-12-16', progress: 0 },
]

const statusColors = {
  'Completed': 'bg-green-500/20 text-green-400 border-green-500/20',
  'In Progress': 'bg-blue-500/20 text-blue-400 border-blue-500/20',
  'Pending': 'bg-amber-500/20 text-amber-400 border-amber-500/20',
  'Cancelled': 'bg-red-500/20 text-red-400 border-red-500/20',
}

const priorityColors = {
  'Critical': 'text-red-400 bg-red-500/10',
  'High': 'text-amber-400 bg-amber-500/10',
  'Medium': 'text-blue-400 bg-blue-500/10',
  'Low': 'text-surface-400 bg-surface-700',
}

function Modal({ order, onClose }) {
  const [form, setForm] = useState(order || {
    id: `ORD-${Math.floor(Math.random() * 1000) + 2900}`,
    customer: '', product: '', machine: '', employee: '',
    value: '', status: 'Pending', priority: 'Medium', deadline: '', progress: 0,
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg glass-strong rounded-3xl border border-white/8 p-7 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">{order ? 'Edit Order' : 'Create New Order'}</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/5 text-surface-400"><TbX size={18} /></button>
        </div>
        <div className="space-y-4">
          {[
            { label: 'Customer', key: 'customer', placeholder: 'e.g. Siemens AG' },
            { label: 'Product', key: 'product', placeholder: 'e.g. CNC Components' },
            { label: 'Machine', key: 'machine', placeholder: 'e.g. CNC-01' },
            { label: 'Assigned Employee', key: 'employee', placeholder: 'e.g. Ravi Kumar' },
            { label: 'Order Value ($)', key: 'value', placeholder: 'e.g. 48200' },
            { label: 'Delivery Deadline', key: 'deadline', type: 'date' },
          ].map((f) => (
            <div key={f.key}>
              <label className="label">{f.label}</label>
              <input
                type={f.type || 'text'}
                className="input"
                placeholder={f.placeholder}
                value={form[f.key]}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Status</label>
              <select className="input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                {['Pending', 'In Progress', 'Completed', 'Cancelled'].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Priority</label>
              <select className="input" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
                {['Low', 'Medium', 'High', 'Critical'].map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-7">
          <button onClick={onClose} className="btn-secondary flex-1 justify-center">Cancel</button>
          <button
            onClick={() => { toast.success(order ? 'Order updated!' : 'Order created!'); onClose() }}
            className="btn-primary flex-1 justify-center"
          >
            {order ? 'Save Changes' : 'Create Order'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Orders() {
  const [orders, setOrders] = useState(initialOrders)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [editOrder, setEditOrder] = useState(null)
  const [sortKey, setSortKey] = useState('id')
  const [sortDir, setSortDir] = useState('desc')

  const filtered = orders
    .filter((o) => {
      const q = search.toLowerCase()
      return (
        (statusFilter === 'All' || o.status === statusFilter) &&
        (o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q) || o.product.toLowerCase().includes(q))
      )
    })
    .sort((a, b) => {
      let av = a[sortKey], bv = b[sortKey]
      if (typeof av === 'string') av = av.toLowerCase()
      if (typeof bv === 'string') bv = bv.toLowerCase()
      return sortDir === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1)
    })

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const handleDelete = (id) => {
    setOrders(prev => prev.filter(o => o.id !== id))
    toast.success('Order removed')
  }

  const summary = {
    total: orders.length,
    inProgress: orders.filter(o => o.status === 'In Progress').length,
    completed: orders.filter(o => o.status === 'Completed').length,
    pending: orders.filter(o => o.status === 'Pending').length,
  }

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Orders', value: summary.total, icon: TbShoppingCart, color: 'text-blue-400 bg-blue-400/10' },
          { label: 'In Progress', value: summary.inProgress, icon: TbClock, color: 'text-blue-400 bg-blue-400/10' },
          { label: 'Completed', value: summary.completed, icon: TbCheck, color: 'text-green-400 bg-green-400/10' },
          { label: 'Pending', value: summary.pending, icon: TbAlertTriangle, color: 'text-amber-400 bg-amber-400/10' },
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

      {/* Table card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <TbSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" />
            <input
              className="input pl-9"
              placeholder="Search orders, customers, products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['All', 'Pending', 'In Progress', 'Completed', 'Cancelled'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${statusFilter === s ? 'bg-blue-600 text-white' : 'bg-white/5 text-surface-400 hover:bg-white/10'}`}
              >
                {s}
              </button>
            ))}
          </div>
          <button onClick={() => toast.success('Exported!')} className="btn-secondary text-sm px-4 py-2 gap-2">
            <TbDownload size={15} /> Export
          </button>
          <button onClick={() => { setEditOrder(null); setShowModal(true) }} className="btn-primary text-sm px-4 py-2 gap-2">
            <TbPlus size={15} /> New Order
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {[
                  { key: 'id', label: 'Order ID' },
                  { key: 'customer', label: 'Customer' },
                  { key: 'product', label: 'Product' },
                  { key: 'value', label: 'Value' },
                  { key: 'status', label: 'Status' },
                  { key: 'priority', label: 'Priority' },
                  { key: 'progress', label: 'Progress' },
                  { key: 'deadline', label: 'Deadline' },
                  { key: null, label: 'Actions' },
                ].map((col) => (
                  <th
                    key={col.key || 'actions'}
                    onClick={() => col.key && toggleSort(col.key)}
                    className={`text-left py-3 px-3 text-xs font-semibold text-surface-500 whitespace-nowrap ${col.key ? 'cursor-pointer hover:text-white select-none' : ''}`}
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      {col.key && sortKey === col.key && (
                        sortDir === 'asc' ? <TbChevronUp size={13} /> : <TbChevronDown size={13} />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id} className="border-b border-white/3 hover:bg-white/2 transition-colors">
                  <td className="py-3.5 px-3">
                    <span className="text-blue-400 font-mono font-semibold text-xs">{order.id}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="text-white text-xs font-medium">{order.customer}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="text-surface-400 text-xs">{order.product}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="text-white font-semibold text-xs">${order.value.toLocaleString()}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${priorityColors[order.priority]}`}>
                      {order.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 min-w-[100px]">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-dark-bg rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${order.progress === 100 ? 'bg-green-500' : order.progress > 60 ? 'bg-blue-500' : 'bg-amber-500'}`}
                          style={{ width: `${order.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-surface-500 w-8 text-right">{order.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="text-xs text-surface-400">{order.deadline}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => toast.success(`Viewing ${order.id}`)} className="p-1.5 rounded-lg hover:bg-white/5 text-surface-500 hover:text-white transition-colors">
                        <TbEye size={15} />
                      </button>
                      <button onClick={() => { setEditOrder(order); setShowModal(true) }} className="p-1.5 rounded-lg hover:bg-white/5 text-surface-500 hover:text-blue-400 transition-colors">
                        <TbEdit size={15} />
                      </button>
                      <button onClick={() => handleDelete(order.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-surface-500 hover:text-red-400 transition-colors">
                        <TbTrash size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-surface-500">
              <TbShoppingCart size={36} className="mx-auto mb-3 opacity-30" />
              <p>No orders found</p>
            </div>
          )}
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-surface-500">
          <span>Showing {filtered.length} of {orders.length} orders</span>
          <span>Page 1 of 1</span>
        </div>
      </motion.div>

      {showModal && <Modal order={editOrder} onClose={() => { setShowModal(false); setEditOrder(null) }} />}
    </div>
  )
}
