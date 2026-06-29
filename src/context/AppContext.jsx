import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'warning', title: 'Machine CNC-07 overheating', time: '2m ago', read: false },
    { id: 2, type: 'error', title: 'Low inventory: Steel Coil A', time: '15m ago', read: false },
    { id: 3, type: 'success', title: 'Order #ORD-2841 completed', time: '1h ago', read: true },
    { id: 4, type: 'info', title: 'AI report ready for review', time: '2h ago', read: true },
    { id: 5, type: 'warning', title: 'Supplier delivery delayed', time: '3h ago', read: true },
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const markRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  return (
    <AppContext.Provider value={{
      darkMode,
      setDarkMode,
      sidebarOpen,
      setSidebarOpen,
      notifications,
      unreadCount,
      markAllRead,
      markRead,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
