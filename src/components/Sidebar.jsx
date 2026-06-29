import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext.jsx'
import {
  TbBuildingFactory, TbLayoutDashboard, TbShoppingCart, TbPackage,
  TbTool, TbUsers, TbTruck, TbHammer, TbChartBar,
  TbFileReport, TbBrain, TbBell, TbUser, TbSettings,
  TbChevronLeft, TbChevronRight, TbLogout, TbSparkles,
  TbCreditCard, TbKey, TbShieldCheck
} from 'react-icons/tb'

const navGroups = [
  {
    label: 'Overview',
    items: [
      { icon: TbLayoutDashboard, label: 'Dashboard', path: '/app' },
    ]
  },
  {
    label: 'Operations',
    items: [
      { icon: TbShoppingCart, label: 'Orders', path: '/app/orders' },
      { icon: TbPackage, label: 'Inventory', path: '/app/inventory' },
      { icon: TbTool, label: 'Machines', path: '/app/machines' },
      { icon: TbHammer, label: 'Maintenance', path: '/app/maintenance' },
    ]
  },
  {
    label: 'People & Partners',
    items: [
      { icon: TbUsers, label: 'Employees', path: '/app/employees' },
      { icon: TbTruck, label: 'Suppliers', path: '/app/suppliers' },
    ]
  },
  {
    label: 'Intelligence',
    items: [
      { icon: TbChartBar, label: 'Analytics', path: '/app/analytics' },
      { icon: TbFileReport, label: 'Reports', path: '/app/reports' },
      { icon: TbBrain, label: 'AI Assistant', path: '/app/ai-assistant', badge: 'AI' },
      { icon: TbSparkles, label: 'AI Copilot', path: '/app/ai-copilot', badge: 'NEW' },
    ]
  },
  {
    label: 'Account',
    items: [
      { icon: TbBell, label: 'Notifications', path: '/app/notifications', badge: '3' },
      { icon: TbUser, label: 'Profile', path: '/app/profile' },
      { icon: TbSettings, label: 'Settings', path: '/app/settings' },
    ]
  },
  {
    label: 'Billing & Admin',
    items: [
      { icon: TbCreditCard, label: 'Billing', path: '/app/billing' },
      { icon: TbKey, label: 'API Keys', path: '/app/api-keys' },
      { icon: TbShieldCheck, label: 'Admin Panel', path: '/app/admin' },
    ]
  }
]

function NavItem({ item, sidebarOpen }) {
  return (
    <NavLink
      to={item.path}
      end={item.path === '/app'}
      className={({ isActive }) =>
        `relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group ${
          isActive
            ? 'text-white'
            : 'text-surface-400 hover:text-white'
        }`
      }
      style={({ isActive }) => ({
        background: isActive
          ? 'linear-gradient(135deg, rgba(37,99,235,0.2) 0%, rgba(6,182,212,0.1) 100%)'
          : 'transparent',
        border: isActive
          ? '1px solid rgba(59,130,246,0.25)'
          : '1px solid transparent',
        boxShadow: isActive
          ? 'inset 0 1px 0 rgba(255,255,255,0.08), 0 0 20px rgba(59,130,246,0.15)'
          : 'none',
      })}
      title={!sidebarOpen ? item.label : undefined}
    >
      {({ isActive }) => (
        <>
          {/* Active indicator */}
          {isActive && (
            <motion.div
              layoutId="activeNavIndicator"
              className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full"
              style={{
                background: 'linear-gradient(180deg, #2563eb 0%, #0891b2 100%)',
                boxShadow: '0 0 15px rgba(59,130,246,0.5)',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}

          {/* Glow on hover */}
          <motion.div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              background: 'rgba(255,255,255,0.03)',
            }}
          />

          <motion.div
            className="relative shrink-0"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <item.icon size={20} className={isActive ? 'text-blue-400' : ''} />
          </motion.div>

          <AnimatePresence>
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10, width: 0 }}
                animate={{ opacity: 1, x: 0, width: 'auto' }}
                exit={{ opacity: 0, x: -10, width: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 whitespace-nowrap text-sm font-medium relative z-10"
              >
                {item.label}
              </motion.span>
            )}
          </AnimatePresence>

          {item.badge && sidebarOpen && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-[10px] px-2 py-0.5 rounded-lg font-bold"
              style={{
                background: item.badge === 'AI'
                  ? 'linear-gradient(135deg, rgba(37,99,235,0.25) 0%, rgba(6,182,212,0.2) 100%)'
                  : 'linear-gradient(135deg, rgba(239,68,68,0.25) 0%, rgba(220,38,38,0.2) 100%)',
                color: item.badge === 'AI' ? '#60a5fa' : '#f87171',
                border: item.badge === 'AI'
                  ? '1px solid rgba(59,130,246,0.3)'
                  : '1px solid rgba(239,68,68,0.3)',
                boxShadow: item.badge !== 'AI' ? '0 0 10px rgba(239,68,68,0.3)' : 'none',
              }}
            >
              {item.badge}
            </motion.span>
          )}

          {item.badge && !sidebarOpen && (
            <motion.span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
              style={{
                background: item.badge === 'AI' ? '#3b82f6' : '#ef4444',
                boxShadow: '0 0 8px rgba(239,68,68,0.6)',
              }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </>
      )}
    </NavLink>
  )
}

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useApp()

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 260 : 76 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 top-0 h-full z-40 flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, rgba(8,14,26,0.98) 0%, rgba(5,8,16,0.98) 100%)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderRight: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '20px 0 60px rgba(0,0,0,0.4), inset -1px 0 0 rgba(255,255,255,0.03)',
      }}
    >
      {/* Logo */}
      <motion.div
        className="flex items-center gap-3 px-4 py-5 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <motion.div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #0891b2 100%)',
            boxShadow: '0 8px 25px rgba(37,99,235,0.4)',
          }}
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <TbBuildingFactory className="text-white text-xl" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
          {/* Glow animation */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, rgba(255,255,255,0.25) 0%, transparent 70%)',
            }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0, x: -15, width: 0 }}
              animate={{ opacity: 1, x: 0, width: 'auto' }}
              exit={{ opacity: 0, x: -15, width: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden whitespace-nowrap"
            >
              <div className="font-black text-white text-sm tracking-tight">FactoryOS</div>
              <div className="text-xs text-blue-400 font-semibold tracking-tight">AI Platform</div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-5 px-3 space-y-6">
        {navGroups.map((group, groupIdx) => (
          <div key={group.label}>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="px-3 mb-2 text-[10px] font-bold text-surface-600 uppercase tracking-[0.15em]"
                >
                  {group.label}
                </motion.div>
              )}
            </AnimatePresence>
            <div className="space-y-1.5">
              {group.items.map((item, itemIdx) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: groupIdx * 0.05 + itemIdx * 0.03, duration: 0.3 }}
                >
                  <NavItem item={item} sidebarOpen={sidebarOpen} />
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* AI Badge */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 15, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mx-3 mb-3 p-4 rounded-2xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(6,182,212,0.08) 100%)',
              border: '1px solid rgba(59,130,246,0.15)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 30px rgba(59,130,246,0.1)',
            }}
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                background: 'radial-gradient(circle at 30% 50%, rgba(37,99,235,0.2) 0%, transparent 50%)',
              }}
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                >
                  <TbSparkles className="text-blue-400" size={16} />
                </motion.div>
                <span className="text-sm font-bold text-blue-400">AI Powered</span>
              </div>
              <p className="text-xs text-surface-400 leading-relaxed">
                Gemini AI analyzes your production in real-time.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom actions */}
      <motion.div
        className="border-t p-3 space-y-2"
        style={{ borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <motion.button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-surface-400 hover:text-white transition-all duration-200 group"
          style={{ background: 'transparent' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            animate={{ rotate: sidebarOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {sidebarOpen ? <TbChevronLeft size={18} /> : <TbChevronRight size={18} />}
          </motion.div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="text-sm font-medium whitespace-nowrap"
              >
                Collapse
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <Link
          to="/login"
          className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-surface-400 hover:text-white hover:bg-red-500/10 transition-all duration-200 group"
        >
          <motion.div whileHover={{ x: -2 }}>
            <TbLogout size={18} />
          </motion.div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="text-sm font-medium whitespace-nowrap"
              >
                Sign Out
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </motion.div>
    </motion.aside>
  )
}
