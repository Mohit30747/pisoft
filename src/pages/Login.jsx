import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TbBuildingFactory, TbMail, TbLock, TbArrowRight, TbEye, TbEyeOff } from 'react-icons/tb'
import toast from 'react-hot-toast'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) { toast.error('Please fill all fields'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    toast.success('Welcome back, John!')
    navigate('/app')
  }

  return (
    <div className="min-h-screen flex animated-bg grid-pattern">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 border-r border-white/5">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
            <TbBuildingFactory className="text-white text-xl" />
          </div>
          <div>
            <span className="font-bold text-white text-xl">FactoryOS</span>
            <span className="text-blue-400 font-bold text-xl"> AI</span>
          </div>
        </Link>

        <div>
          <h2 className="text-4xl font-black text-white mb-4 leading-tight">
            The AI command center<br />for modern manufacturing
          </h2>
          <p className="text-surface-400 text-lg mb-8">
            Monitor, predict, and optimize every aspect of your factory operations in real-time.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '500+', label: 'Factories' },
              { value: '38%', label: 'Less Delays' },
              { value: '96%', label: 'On-Time Delivery' },
              { value: '99.9%', label: 'Platform Uptime' },
            ].map((s, i) => (
              <div key={i} className="glass rounded-2xl p-4 border border-white/5">
                <p className="text-2xl font-black gradient-text-blue">{s.value}</p>
                <p className="text-sm text-surface-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-surface-600 text-sm">© 2024 FactoryOS AI. All rights reserved.</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8 lg:hidden">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
                <TbBuildingFactory className="text-white text-lg" />
              </div>
              <span className="font-bold text-white text-lg">FactoryOS <span className="text-blue-400">AI</span></span>
            </Link>
          </div>

          <h1 className="text-3xl font-black text-white mb-2">Welcome back</h1>
          <p className="text-surface-500 mb-8">Sign in to your manufacturing command center</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Email Address</label>
              <div className="relative">
                <TbMail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" />
                <input
                  type="email"
                  className="input pl-10"
                  placeholder="john@factoryos.ai"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="label mb-0">Password</label>
                <Link to="/forgot-password" className="text-xs text-blue-400 hover:text-blue-300">Forgot password?</Link>
              </div>
              <div className="relative">
                <TbLock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" />
                <input
                  type={showPass ? 'text' : 'password'}
                  className="input pl-10 pr-10"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-500 hover:text-white">
                  {showPass ? <TbEyeOff size={16} /> : <TbEye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <TbArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <div className="mt-4 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <p className="text-xs text-blue-300 text-center">
              Demo: use any email + password to enter the dashboard
            </p>
          </div>

          <p className="text-center text-surface-500 text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium">Start free trial</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
