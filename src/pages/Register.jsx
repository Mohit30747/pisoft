import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  TbBuildingFactory, TbMail, TbLock, TbUser, TbBriefcase,
  TbArrowRight, TbCheck
} from 'react-icons/tb'
import toast from 'react-hot-toast'

const benefits = [
  '14-day free trial, no credit card required',
  'Full access to all AI features',
  'White-glove onboarding support',
  'Cancel anytime',
]

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', company: '', password: '', role: 'Plant Manager' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) { toast.error('Please fill all required fields'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    toast.success('Account created! Welcome to FactoryOS AI!')
    navigate('/app')
  }

  return (
    <div className="min-h-screen flex animated-bg grid-pattern">
      {/* Left */}
      <div className="hidden lg:flex flex-col justify-between w-2/5 p-12 border-r border-white/5">
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
          <h2 className="text-3xl font-black text-white mb-4">
            Start your free<br />14-day trial today
          </h2>
          <p className="text-surface-400 mb-8">
            Join 500+ manufacturers who've transformed their operations with AI-powered management.
          </p>
          <div className="space-y-3">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                  <TbCheck size={12} className="text-green-400" />
                </div>
                <span className="text-sm text-surface-300">{b}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-surface-600 text-sm">© 2024 FactoryOS AI. All rights reserved.</p>
      </div>

      {/* Right */}
      <div className="flex-1 flex items-center justify-center p-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <h1 className="text-3xl font-black text-white mb-2">Create your account</h1>
          <p className="text-surface-500 mb-8">Start your free 14-day trial — no credit card needed.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Full Name</label>
                <div className="relative">
                  <TbUser size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" />
                  <input className="input pl-10" placeholder="John Doe" value={form.name} onChange={e => update('name', e.target.value)} />
                </div>
              </div>
              <div>
                <label className="label">Your Role</label>
                <select className="input" value={form.role} onChange={e => update('role', e.target.value)}>
                  {['Plant Manager', 'Operations Director', 'CTO', 'Production Lead', 'CEO', 'Other'].map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="label">Work Email</label>
              <div className="relative">
                <TbMail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" />
                <input type="email" className="input pl-10" placeholder="john@company.com" value={form.email} onChange={e => update('email', e.target.value)} />
              </div>
            </div>

            <div>
              <label className="label">Company Name</label>
              <div className="relative">
                <TbBriefcase size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" />
                <input className="input pl-10" placeholder="Acme Manufacturing Ltd" value={form.company} onChange={e => update('company', e.target.value)} />
              </div>
            </div>

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <TbLock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" />
                <input type="password" className="input pl-10" placeholder="Min. 8 characters" value={form.password} onChange={e => update('password', e.target.value)} />
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
                <>Start Free Trial <TbArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>

            <p className="text-center text-xs text-surface-600">
              By signing up, you agree to our{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
            </p>
          </form>

          <p className="text-center text-surface-500 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
