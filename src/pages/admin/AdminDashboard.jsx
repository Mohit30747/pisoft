import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TbUsers, TbShoppingCart, TbCreditCard, TbChartBar,
  TbSettings, TbSearch, TbFilter, TbDownload, TbRefresh,
  TbUserPlus, TbEye, TbEdit, TbTrash, TbShield, TbActivity,
  TbTrendingUp, TbTrendingDown, TbDots, TbCheck, TbX,
  TbMail, TbCalendar, TbBuildingFactory, TbChevronLeft
} from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import toast from 'react-hot-toast'

const tabs = [
  { id: 'overview', label: 'Overview', icon: TbChartBar },
  { id: 'users', label: 'Users', icon: TbUsers },
  { id: 'orders', label: 'Orders', icon: TbShoppingCart },
  { id: 'payments', label: 'Payments', icon: TbCreditCard },
]

const mockUsers = [
  { id: '1', name: 'Acme Manufacturing', email: 'admin@acme.com', plan: 'Professional', status: 'Active', factories: 3, created: '2024-01-15', revenue: 1299 },
  { id: '2', name: 'TechCorp Industries', email: 'ops@techcorp.com', plan: 'Enterprise', status: 'Active', factories: 12, created: '2024-02-20', revenue: null },
  { id: '3', name: 'Steel Dynamics', email: 'pm@steeldyn.com', plan: 'Professional', status: 'Trialing', factories: 2, created: '2024-06-01', revenue: 0 },
  { id: '4', name: 'Precision Parts Co', email: 'info@precision.com', plan: 'Starter', status: 'Active', factories: 1, created: '2024-03-10', revenue: 499 },
  { id: '5', name: 'Global Auto Parts', email: 'admin@globalauto.com', plan: 'Enterprise', status: 'Active', factories: 8, created: '2024-04-05', revenue: null },
]

const mockPayments = [
  { id: 'INV-001', user: 'Acme Manufacturing', amount: 1299, status: 'Paid', date: '2024-06-15', method: 'Card' },
  { id: 'INV-002', user: 'TechCorp Industries', amount: null, status: 'Pending', date: '2024-06-20', method: 'Invoice' },
  { id: 'INV-003', user: 'Steel Dynamics', amount: 0, status: 'Trial', date: '2024-06-25', method: '-' },
  { id: 'INV-004', user: 'Precision Parts Co', amount: 499, status: 'Paid', date: '2024-06-01', method: 'Card' },
  { id: 'INV-005', user: 'Global Auto Parts', amount: null, status: 'Pending', date: '2024-06-28', method: 'Invoice' },
]

const statusColors = {
  'Active': 'bg-green-500/20 text-green-400',
  'Trialing': 'bg-blue-500/20 text-blue-400',
  'Churned': 'bg-red-500/20 text-red-400',
  'Paid': 'bg-green-500/20 text-green-400',
  'Pending': 'bg-amber-500/20 text-amber-400',
  'Trial': 'bg-surface-500/20 text-surface-400',
  'Failed': 'bg-red-500/20 text-red-400',
}

const planColors = {
  'Starter': 'bg-surface-500/20 text-surface-300',
  'Professional': 'bg-blue-500/20 text-blue-400',
  'Enterprise': 'bg-violet-500/20 text-violet-400',
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [users, setUsers] = useState(mockUsers)

  const stats = [
    { label: 'Total Users', value: '1,247', change: '+12.4%', up: true, icon: TbUsers, color: 'text-blue-400' },
    { label: 'Active Subscriptions', value: '892', change: '+8.2%', up: true, icon: TbCreditCard, color: 'text-green-400' },
    { label: 'Monthly Revenue', value: '$847K', change: '+15.3%', up: true, icon: TbTrendingUp, color: 'text-cyan-400' },
    { label: 'Trial Conversions', value: '68%', change: '-2.1%', up: false, icon: TbActivity, color: 'text-violet-400' },
  ]

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/app" className="p-2 rounded-lg hover:bg-white/5 text-surface-400 hover:text-white transition-colors">
            <TbChevronLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-white">Admin Dashboard</h1>
            <p className="text-sm text-surface-500">Manage users, orders, and platform analytics</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/8 border border-white/10 text-surface-300 hover:text-white text-sm font-medium transition-colors"
          >
            <TbDownload size={16} />
            Export Data
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold shadow-lg"
            style={{ boxShadow: '0 8px 25px rgba(37,99,235,0.3)' }}
          >
            <TbUserPlus size={16} />
            Add User
          </motion.button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 rounded-2xl bg-dark-card border border-white/5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                : 'text-surface-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="card p-5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-${stat.color.split('-')[1]}-500/15 flex items-center justify-center`}>
                      <stat.icon size={20} className={stat.color} />
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-semibold ${stat.up ? 'text-green-400' : 'text-red-400'}`}>
                      {stat.up ? <TbTrendingUp size={14} /> : <TbTrendingDown size={14} />}
                      {stat.change}
                    </div>
                  </div>
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                  <p className="text-xs text-surface-500 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              <div className="card p-6">
                <h3 className="font-semibold text-white text-sm mb-4">Revenue by Plan</h3>
                <div className="space-y-4">
                  {[
                    { plan: 'Starter', revenue: '$124K', percent: 15, color: 'bg-surface-500' },
                    { plan: 'Professional', revenue: '$498K', percent: 59, color: 'bg-blue-500' },
                    { plan: 'Enterprise', revenue: '$225K', percent: 26, color: 'bg-violet-500' },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-surface-400">{item.plan}</span>
                        <span className="text-sm font-semibold text-white">{item.revenue}</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percent}%` }}
                          transition={{ delay: i * 0.1, duration: 0.6 }}
                          className={`h-full rounded-full ${item.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-6">
                <h3 className="font-semibold text-white text-sm mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { action: 'New user signup', user: 'Bosch Manufacturing', time: '5m ago', icon: TbUserPlus, color: 'text-green-400' },
                    { action: 'Plan upgraded', user: 'Steel Dynamics', time: '23m ago', icon: TbTrendingUp, color: 'text-blue-400' },
                    { action: 'Invoice paid', user: 'Acme Manufacturing', time: '1h ago', icon: TbCreditCard, color: 'text-cyan-400' },
                    { action: 'Trial expired', user: 'Test Corp', time: '2h ago', icon: TbX, color: 'text-red-400' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/3">
                      <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center ${item.color}`}>
                        <item.icon size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white">{item.action}</p>
                        <p className="text-xs text-surface-500">{item.user}</p>
                      </div>
                      <span className="text-xs text-surface-600">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'users' && (
          <motion.div
            key="users"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Search and filters */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 relative">
                <TbSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-500" />
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input w-full pl-11 pr-4 py-2.5 text-sm"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/8 border border-white/10 text-surface-300 text-sm font-medium transition-colors">
                <TbFilter size={16} />
                Filters
              </button>
              <button className="p-2.5 rounded-xl bg-white/5 hover:bg-white/8 border border-white/10 text-surface-400 hover:text-white transition-colors">
                <TbRefresh size={18} />
              </button>
            </div>

            {/* Users table */}
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="px-5 py-4 text-left">
                        <input type="checkbox" className="rounded border-white/20 bg-white/5 text-blue-500" />
                      </th>
                      <th className="px-5 py-4 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">Company</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">Plan</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">Status</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">Factories</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">Revenue</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">Created</th>
                      <th className="px-5 py-4 text-right text-xs font-semibold text-surface-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredUsers.map((user) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-white/3 transition-colors"
                      >
                        <td className="px-5 py-4">
                          <input type="checkbox" className="rounded border-white/20 bg-white/5 text-blue-500" />
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                              {user.name[0]}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">{user.name}</p>
                              <p className="text-xs text-surface-500">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${planColors[user.plan]}`}>
                            {user.plan}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${statusColors[user.status]}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-sm text-surface-300 flex items-center gap-1.5">
                            <TbBuildingFactory size={14} className="text-surface-500" />
                            {user.factories}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-sm font-medium text-white">
                            {user.revenue ? `$${user.revenue}` : 'Custom'}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-sm text-surface-400 flex items-center gap-1.5">
                            <TbCalendar size={14} />
                            {user.created}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <button className="p-2 rounded-lg hover:bg-white/5 text-surface-500 hover:text-blue-400 transition-colors">
                              <TbEye size={16} />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-white/5 text-surface-500 hover:text-amber-400 transition-colors">
                              <TbEdit size={16} />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-white/5 text-surface-500 hover:text-red-400 transition-colors">
                              <TbTrash size={16} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'orders' && (
          <motion.div
            key="orders"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card p-6"
          >
            <div className="text-center py-12">
              <TbShoppingCart size={48} className="mx-auto text-surface-600 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Platform Orders</h3>
              <p className="text-sm text-surface-500 max-w-md mx-auto">
                View and manage all orders across all factory sites on the platform.
              </p>
            </div>
          </motion.div>
        )}

        {activeTab === 'payments' && (
          <motion.div
            key="payments"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="px-5 py-4 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">Invoice</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">Customer</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">Amount</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">Status</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">Method</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">Date</th>
                      <th className="px-5 py-4 text-right text-xs font-semibold text-surface-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {mockPayments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-white/3 transition-colors">
                        <td className="px-5 py-4">
                          <span className="text-sm font-mono font-medium text-blue-400">{payment.id}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-sm text-surface-300">{payment.user}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-sm font-medium text-white">
                            {payment.amount ? `$${payment.amount}` : 'Custom'}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${statusColors[payment.status]}`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-sm text-surface-400">{payment.method}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-sm text-surface-400">{payment.date}</span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <button className="p-2 rounded-lg hover:bg-white/5 text-surface-500 hover:text-white transition-colors">
                              <TbEye size={16} />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-white/5 text-surface-500 hover:text-blue-400 transition-colors">
                              <TbDownload size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
