import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext.jsx'
import {
  TbSearch, TbBell, TbChevronDown, TbUser,
  TbSettings, TbLogout, TbSun, TbMoon, TbCommand
} from 'react-icons/tb'

const pathLabels = {
  '/app': 'Dashboard',
  '/app/orders': 'Orders',
  '/app/inventory': 'Inventory',
  '/app/machines': 'Machines',
  '/app/employees': 'Employees',
  '/app/suppliers': 'Suppliers',
  '/app/maintenance': 'Maintenance',
  '/app/analytics': 'Analytics',
  '/app/reports': 'Reports',
  '/app/ai-assistant': 'AI Assistant',
  '/app/notifications': 'Notifications',
  '/app/profile': 'Profile',
  '/app/settings': 'Settings',
}

export default function DashboardHeader() {
  const { unreadCount, notifications, markAllRead, darkMode, setDarkMode } = useApp()
  const [showNotif, setShowNotif] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const location = useLocation()
  const title = pathLabels[location.pathname] || 'Dashboard'

  const notifColors = {
    warning: 'text-amber-400 bg-amber-400/10',
    error: 'text-red-400 bg-red-400/10',
    success: 'text-green-400 bg-green-400/10',
    info: 'text-blue-400 bg-blue-400/10',
  }

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 glass-strong shrink-0">
      <div>
        <h1 className="text-lg font-semibold text-white">{title}</h1>
        <p className="text-xs text-surface-500 hidden sm:block">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/8 text-surface-500 text-sm cursor-pointer hover:bg-white/8 transition-all duration-200 min-w-[200px]">
          <TbSearch size={15} />
          <span className="flex-1">Search...</span>
          <span className="flex items-center gap-0.5 text-xs bg-white/5 px-1.5 py-0.5 rounded-md">
            <TbCommand size={11} />K
          </span>
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl bg-white/5 border border-white/8 text-surface-400 hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          {darkMode ? <TbSun size={18} /> : <TbMoon size={18} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotif(!showNotif); setShowProfile(false) }}
            className="relative p-2 rounded-xl bg-white/5 border border-white/8 text-surface-400 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <TbBell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotif && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-80 glass-strong rounded-2xl border border-white/8 shadow-2xl overflow-hidden z-50"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                  <span className="font-semibold text-white text-sm">Notifications</span>
                  <button onClick={markAllRead} className="text-xs text-blue-400 hover:text-blue-300">
                    Mark all read
                  </button>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`flex items-start gap-3 px-4 py-3 border-b border-white/3 hover:bg-white/3 transition-colors ${!n.read ? 'bg-blue-500/3' : ''}`}
                    >
                      <span className={`mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 ${notifColors[n.type]}`}>
                        {n.type === 'warning' ? '!' : n.type === 'error' ? '×' : n.type === 'success' ? '✓' : 'i'}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${n.read ? 'text-surface-400' : 'text-white font-medium'}`}>
                          {n.title}
                        </p>
                        <p className="text-xs text-surface-600 mt-0.5">{n.time}</p>
                      </div>
                      {!n.read && <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />}
                    </div>
                  ))}
                </div>
                <Link
                  to="/app/notifications"
                  onClick={() => setShowNotif(false)}
                  className="block px-4 py-3 text-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  View all notifications
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotif(false) }}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/8 hover:bg-white/10 transition-all duration-200"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
              JD
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-medium text-white leading-tight">John Doe</p>
              <p className="text-xs text-surface-500 leading-tight">Admin</p>
            </div>
            <TbChevronDown size={14} className="text-surface-500" />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-52 glass-strong rounded-2xl border border-white/8 shadow-2xl overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-white/5">
                  <p className="text-sm font-semibold text-white">John Doe</p>
                  <p className="text-xs text-surface-500">john@factoryos.ai</p>
                </div>
                <div className="p-2">
                  {[
                    { icon: TbUser, label: 'Profile', path: '/app/profile' },
                    { icon: TbSettings, label: 'Settings', path: '/app/settings' },
                  ].map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setShowProfile(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-surface-400 hover:text-white hover:bg-white/5 transition-all text-sm"
                    >
                      <item.icon size={16} />
                      {item.label}
                    </Link>
                  ))}
                  <div className="border-t border-white/5 mt-2 pt-2">
                    <Link
                      to="/login"
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all text-sm"
                    >
                      <TbLogout size={16} />
                      Sign Out
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
