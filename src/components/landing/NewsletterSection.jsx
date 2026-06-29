import { useState } from 'react'
import { motion } from 'framer-motion'
import { TbArrowRight, TbCheck, TbBrandLinkedin } from 'react-icons/tb'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    toast.success('You\'re on the list! Welcome to FactoryOS AI.')
  }

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="orb w-[600px] h-[600px] bg-blue-600/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="gradient-border rounded-3xl p-12 text-center mb-16"
        >
          <div className="orb w-96 h-96 bg-blue-600/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Start transforming your<br />
              <span className="gradient-text">factory today</span>
            </h2>
            <p className="text-surface-400 text-lg max-w-xl mx-auto mb-10">
              Join 500+ manufacturers who've already cut delays, boosted efficiency, and unlocked the power of AI-driven production management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/app" className="btn-primary px-8 py-4 text-base group">
                Book a Demo
                <TbArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/app" className="btn-secondary px-8 py-4 text-base">
                Try Dashboard Free
              </Link>
            </div>
            <p className="mt-6 text-xs text-surface-600">14-day free trial · No credit card · Full access</p>
          </div>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto text-center"
        >
          <h3 className="text-xl font-bold text-white mb-2">Manufacturing Intelligence Weekly</h3>
          <p className="text-surface-500 text-sm mb-6">
            AI trends, factory efficiency tips, and FactoryOS product updates — every Friday.
          </p>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 text-green-400"
            >
              <TbCheck size={18} />
              <span className="font-medium">You're subscribed! Check your inbox.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="input flex-1"
                required
              />
              <button type="submit" className="btn-primary px-5 py-3 shrink-0">
                <TbArrowRight size={18} />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
