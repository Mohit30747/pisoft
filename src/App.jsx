import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AppProvider } from './context/AppContext.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Orders from './pages/Orders.jsx'
import Inventory from './pages/Inventory.jsx'
import Machines from './pages/Machines.jsx'
import Employees from './pages/Employees.jsx'
import Suppliers from './pages/Suppliers.jsx'
import Analytics from './pages/Analytics.jsx'
import Reports from './pages/Reports.jsx'
import AIAssistant from './pages/AIAssistant.jsx'
import Notifications from './pages/Notifications.jsx'
import Profile from './pages/Profile.jsx'
import Settings from './pages/Settings.jsx'
import Maintenance from './pages/Maintenance.jsx'
import NotFound from './pages/NotFound.jsx'
// New pages
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AIFactoryCopilot from './pages/AIFactoryCopilot.jsx'
import Billing from './pages/Billing.jsx'
import APIKeys from './pages/APIKeys.jsx'

const pageVariants = {
  initial: {
    opacity: 0,
    y: 15,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: {
      duration: 0.25,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full"
    >
      {children}
    </motion.div>
  )
}

// Animated routes for dashboard pages
const AnimatedDashboard = () => <PageWrapper><Dashboard /></PageWrapper>
const AnimatedOrders = () => <PageWrapper><Orders /></PageWrapper>
const AnimatedInventory = () => <PageWrapper><Inventory /></PageWrapper>
const AnimatedMachines = () => <PageWrapper><Machines /></PageWrapper>
const AnimatedEmployees = () => <PageWrapper><Employees /></PageWrapper>
const AnimatedSuppliers = () => <PageWrapper><Suppliers /></PageWrapper>
const AnimatedMaintenance = () => <PageWrapper><Maintenance /></PageWrapper>
const AnimatedAnalytics = () => <PageWrapper><Analytics /></PageWrapper>
const AnimatedReports = () => <PageWrapper><Reports /></PageWrapper>
const AnimatedAIAssistant = () => <PageWrapper><AIAssistant /></PageWrapper>
const AnimatedNotifications = () => <PageWrapper><Notifications /></PageWrapper>
const AnimatedProfile = () => <PageWrapper><Profile /></PageWrapper>
const AnimatedSettings = () => <PageWrapper><Settings /></PageWrapper>
// New animated pages
const AnimatedAdminDashboard = () => <PageWrapper><AdminDashboard /></PageWrapper>
const AnimatedAICopilot = () => <PageWrapper><AIFactoryCopilot /></PageWrapper>
const AnimatedBilling = () => <PageWrapper><Billing /></PageWrapper>
const AnimatedAPIKeys = () => <PageWrapper><APIKeys /></PageWrapper>

export default function App() {
  const location = useLocation()

  return (
    <AppProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
            <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
          </Route>
          <Route path="/app" element={<DashboardLayout />}>
            <Route index element={<AnimatedDashboard />} />
            <Route path="orders" element={<AnimatedOrders />} />
            <Route path="inventory" element={<AnimatedInventory />} />
            <Route path="machines" element={<AnimatedMachines />} />
            <Route path="employees" element={<AnimatedEmployees />} />
            <Route path="suppliers" element={<AnimatedSuppliers />} />
            <Route path="maintenance" element={<AnimatedMaintenance />} />
            <Route path="analytics" element={<AnimatedAnalytics />} />
            <Route path="reports" element={<AnimatedReports />} />
            <Route path="ai-assistant" element={<AnimatedAIAssistant />} />
            <Route path="notifications" element={<AnimatedNotifications />} />
            <Route path="profile" element={<AnimatedProfile />} />
            <Route path="settings" element={<AnimatedSettings />} />
            {/* New routes */}
            <Route path="admin" element={<AnimatedAdminDashboard />} />
            <Route path="ai-copilot" element={<AnimatedAICopilot />} />
            <Route path="billing" element={<AnimatedBilling />} />
            <Route path="api-keys" element={<AnimatedAPIKeys />} />
          </Route>
          <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </AppProvider>
  )
}
