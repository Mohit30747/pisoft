import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import DashboardHeader from '../components/DashboardHeader.jsx'
import { useApp } from '../context/AppContext.jsx'
import { motion, AnimatePresence } from 'framer-motion'

export default function DashboardLayout() {
  const { sidebarOpen } = useApp()

  return (
    <div className="flex h-screen bg-dark-bg overflow-hidden">
      <Sidebar />
      <div
        className="flex-1 flex flex-col overflow-hidden transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? '260px' : '72px' }}
      >
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
