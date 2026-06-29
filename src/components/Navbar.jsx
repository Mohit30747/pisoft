import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { TbBuildingFactory, TbSparkles } from 'react-icons/tb'

const navLinks = [
  { label: 'Product', href: '#features' },
  { label: 'Solutions', href: '#industries' },
  { label: 'AI Features', href: '#ai' },
  { label: 'Pricing', href: '#pricing' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isLanding = location.pathname === '/'
  const { scrollY } = useScroll()

  const navBackground = useTransform(scrollY, [0, 80], [0, 1])
  const navBorder = useTransform(scrollY, [0, 60], [0, 1])
  const smoothNavBg = useSpring(navBackground, { stiffness: 300, damping: 30 })

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled
          ? 'linear-gradient(180deg, rgba(8,14,26,0.95) 0%, rgba(5,8,16,0.92) 100%)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        boxShadow: scrolled ? '0 10px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              className="relative w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #2563eb 0%, #0891b2 100%)',
                boxShadow: scrolled
                  ? '0 5px 20px rgba(37,99,235,0.4)'
                  : '0 8px 25px rgba(37,99,235,0.5)',
              }}
              whileHover={{
                boxShadow: '0 10px 30px rgba(37,99,235,0.6)',
              }}
            >
              <TbBuildingFactory className="text-white text-xl" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{
                  background: 'radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)',
                }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
            <div className="flex items-baseline gap-1">
              <span className="font-black text-white text-lg tracking-tight">FactoryOS</span>
              <span className="text-blue-400 font-black text-lg tracking-tight">AI</span>
            </div>
          </Link>
        </motion.div>

        {/* Nav Links */}
        {isLanding && (
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-surface-400 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/5 relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                whileHover={{ y: -1 }}
              >
                {link.label}
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #2563eb, #0891b2)' }}
                  initial={{ width: 0 }}
                  whileHover={{ width: '60%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>
        )}

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-surface-300 hover:text-white transition-colors duration-200"
            >
              Login
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              to="/app"
              className="relative px-6 py-2.5 text-sm font-semibold text-white rounded-xl overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                boxShadow: '0 5px 20px rgba(37,99,235,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
              }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                }}
                animate={{ x: [-200, 200] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Launch App
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Mobile menu button */}
        <motion.button
          className="md:hidden p-2.5 rounded-xl text-white relative overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
          onClick={() => setMobileOpen(!mobileOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <HiX size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <HiMenuAlt3 size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, rgba(8,14,26,0.98) 0%, rgba(5,8,16,0.98) 100%)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="px-6 py-5 space-y-1.5">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="block px-4 py-3 text-surface-300 hover:text-white rounded-xl transition-all duration-200 relative overflow-hidden group"
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <span className="relative z-10">{link.label}</span>
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.a>
              ))}

              <div className="pt-4 mt-4 border-t border-white/5 flex flex-col gap-3">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link to="/login" className="btn-secondary w-full justify-center" onClick={() => setMobileOpen(false)}>
                    Login
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <Link to="/app" className="btn-primary w-full justify-center" onClick={() => setMobileOpen(false)}>
                    Launch App
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
