import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TbCreditCard, TbDownload, TbReceipt, TbCalendar, TbCheck,
  TbX, TbArrowRight, TbSparkles, TbClock, TbBuildingFactory,
  TbUser, TbHelp, TbSettings, TbRefresh
} from 'react-icons/tb'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { supabase } from '../lib/supabase'

const plans = [
  {
    name: 'Starter',
    price: 499,
    desc: 'Perfect for single-site operations',
    features: ['1 Factory Site', 'Up to 50 machines', 'Basic AI alerts', 'Standard analytics', '10 user seats'],
    current: false,
    gradient: 'from-surface-500 to-surface-600',
  },
  {
    name: 'Professional',
    price: 1299,
    desc: 'For growing manufacturers',
    features: ['Up to 5 Factory Sites', 'Unlimited machines', 'Full AI delay prediction', 'Advanced analytics', '50 user seats', '24×7 support'],
    current: true,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Enterprise',
    price: null,
    desc: 'For large-scale operations',
    features: ['Unlimited factory sites', 'Unlimited machines & users', 'Custom AI model training', 'Dedicated AI analyst', 'On-premise deployment', 'Custom SLA'],
    current: false,
    gradient: 'from-violet-500 to-purple-500',
  },
]

const mockInvoices = [
  { id: 'INV-2024-0012', date: 'Jun 15, 2024', amount: 1299, status: 'Paid', plan: 'Professional' },
  { id: 'INV-2024-0011', date: 'May 15, 2024', amount: 1299, status: 'Paid', plan: 'Professional' },
  { id: 'INV-2024-0010', date: 'Apr 15, 2024', amount: 1299, status: 'Paid', plan: 'Professional' },
  { id: 'INV-2024-0009', date: 'Mar 15, 2024', amount: 1299, status: 'Paid', plan: 'Professional' },
  { id: 'INV-2024-0008', date: 'Feb 15, 2024', amount: 499, status: 'Paid', plan: 'Starter' },
  { id: 'INV-2024-0007', date: 'Jan 15, 2024', amount: 499, status: 'Paid', plan: 'Starter' },
]

const usageData = [
  { label: 'API Calls', used: 4521, limit: 10000, color: 'bg-blue-500' },
  { label: 'AI Predictions', used: 892, limit: 2000, color: 'bg-cyan-500' },
  { label: 'Storage', used: 12.4, limit: 50, unit: 'GB', color: 'bg-green-500' },
  { label: 'Team Members', used: 23, limit: 50, color: 'bg-violet-500' },
]

const statusColors = {
  'Paid': 'bg-green-500/20 text-green-400',
  'Pending': 'bg-amber-500/20 text-amber-400',
  'Failed': 'bg-red-500/20 text-red-400',
}

export default function Billing() {
  const [showPlans, setShowPlans] = useState(false)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Billing & Subscription</h1>
          <p className="text-sm text-surface-500">Manage your subscription, invoices, and usage</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/8 border border-white/10 text-surface-300 hover:text-white text-sm font-medium transition-colors"
        >
          <TbHelp size={16} />
          Contact Support
        </motion.button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Current plan */}
        <div className="xl:col-span-2 space-y-6">
          <div className="card p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center" style={{ boxShadow: '0 10px 30px rgba(37,99,235,0.3)' }}>
                  <TbSparkles size={24} className="text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-white">Professional Plan</h2>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-green-500/20 text-green-400 font-medium">Active</span>
                  </div>
                  <p className="text-sm text-surface-500">$1,299/month · Renews on July 15, 2024</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowPlans(!showPlans)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-sm font-semibold transition-colors"
              >
                Change Plan
                <TbArrowRight size={16} />
              </motion.button>
            </div>

            {/* Usage meters */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h3 className="text-sm font-semibold text-white">Current Usage</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {usageData.map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-surface-400">{item.label}</span>
                      <span className="text-xs text-surface-500">
                        {item.used.toLocaleString()}{item.unit || ''} / {item.limit.toLocaleString()}{item.unit || ''}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((item.used / item.limit) * 100, 100)}%` }}
                        transition={{ delay: i * 0.1 }}
                        className={`h-full rounded-full ${item.color}`}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-xs text-surface-600">{((item.used / item.limit) * 100).toFixed(1)}% used</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Plan comparison */}
          <AnimatePresence>
            {showPlans && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {plans.map((plan, i) => (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`card p-5 ${plan.current ? 'ring-2 ring-blue-500/50' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-white">{plan.name}</h4>
                      {plan.current && (
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 font-medium">Current</span>
                      )}
                    </div>
                    <p className="text-2xl font-black text-white mb-1">
                      {plan.price ? `$${plan.price}` : 'Custom'}
                      {plan.price && <span className="text-sm font-normal text-surface-500">/mo</span>}
                    </p>
                    <p className="text-xs text-surface-500 mb-4">{plan.desc}</p>
                    <div className="space-y-2 mb-4">
                      {plan.features.map((f, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <TbCheck size={14} className="text-green-400 shrink-0" />
                          <span className="text-xs text-surface-400">{f}</span>
                        </div>
                      ))}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={plan.current}
                      className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                        plan.current
                          ? 'bg-white/5 text-surface-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                      }`}
                    >
                      {plan.current ? 'Current Plan' : plan.price ? 'Upgrade' : 'Contact Sales'}
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Payment method */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white text-sm">Payment Method</h3>
              <button className="text-xs text-blue-400 hover:text-blue-300 font-medium">Update</button>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
              <div className="w-12 h-8 rounded bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center">
                <TbCreditCard size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white font-medium">•••• •••• •••• 4242</p>
                <p className="text-xs text-surface-500">Expires 12/2025</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-green-500/15 text-green-400 font-medium border border-green-500/25">Default</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Billing summary */}
          <div className="card p-6">
            <h3 className="font-semibold text-white text-sm mb-4 flex items-center gap-2">
              <TbReceipt size={16} className="text-surface-500" />
              Billing Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-surface-400">Current Period</span>
                <span className="text-sm text-white font-medium">$1,299</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-surface-400">Next Invoice</span>
                <span className="text-sm text-white font-medium">Jul 15, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-surface-400">Billing Cycle</span>
                <span className="text-sm text-white font-medium">Monthly</span>
              </div>
              <div className="border-t border-white/5 pt-3">
                <div className="flex justify-between">
                  <span className="text-sm text-surface-400">Total Paid (2024)</span>
                  <span className="text-sm text-green-400 font-semibold">$8,394</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Factory sites */}
          <div className="card p-6">
            <h3 className="font-semibold text-white text-sm mb-4 flex items-center gap-2">
              <TbBuildingFactory size={16} className="text-surface-500" />
              Factory Sites
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Main Production Facility', location: 'Detroit, MI', active: true },
                { name: 'Assembly Plant East', location: 'Columbus, OH', active: true },
                { name: 'Warehouse & Distribution', location: 'Chicago, IL', active: true },
              ].map((site, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/3">
                  <div className={`w-2 h-2 rounded-full ${site.active ? 'bg-green-400' : 'bg-surface-500'}`} />
                  <div className="flex-1">
                    <p className="text-sm text-white">{site.name}</p>
                    <p className="text-xs text-surface-500">{site.location}</p>
                  </div>
                </div>
              ))}
              <div className="text-center text-xs text-surface-500 pt-2">
                3 of 5 sites used · Professional plan
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="card p-6">
            <h3 className="font-semibold text-white text-sm mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/8 text-surface-300 hover:text-white text-sm transition-colors text-left">
                <TbCreditCard size={18} className="text-surface-500" />
                Add Payment Method
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/8 text-surface-300 hover:text-white text-sm transition-colors text-left">
                <TbClock size={18} className="text-surface-500" />
                View Billing History
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/8 text-surface-300 hover:text-white text-sm transition-colors text-left">
                <TbDownload size={18} className="text-surface-500" />
                Download All Invoices
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice history */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <TbCalendar size={18} className="text-surface-500" />
            <h3 className="font-semibold text-white text-sm">Invoice History</h3>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-surface-500 hover:text-white text-xs transition-colors">
            <TbRefresh size={14} />
            Refresh
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-5 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">Invoice</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">Date</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">Plan</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">Amount</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-surface-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockInvoices.map((invoice) => (
                <motion.tr
                  key={invoice.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-white/3 transition-colors"
                >
                  <td className="px-5 py-4">
                    <span className="text-sm font-mono font-medium text-blue-400">{invoice.id}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-surface-400">{invoice.date}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs px-2.5 py-1 rounded-lg bg-white/5 text-surface-300">{invoice.plan}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-medium text-white">${invoice.amount.toLocaleString()}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[invoice.status]}`}>
                      {invoice.status}
                    </span>
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
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
