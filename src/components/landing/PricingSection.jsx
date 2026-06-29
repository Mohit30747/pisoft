import { useState, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { TbCheck, TbArrowRight, TbSparkles } from 'react-icons/tb'
import { Link } from 'react-router-dom'

const plans = [
  {
    name: 'Starter',
    price: { monthly: 499, annual: 399 },
    desc: 'Perfect for single-site operations and SME manufacturers.',
    features: [
      '1 Factory Site',
      'Up to 50 machines',
      'Orders & Inventory management',
      'Basic AI alerts',
      'Standard analytics dashboard',
      'Email notifications',
      '8×5 support',
      '10 user seats',
    ],
    cta: 'Start Free Trial',
    popular: false,
    gradient: 'from-slate-500 to-slate-600',
    glow: 'rgba(100,116,139,0.4)',
  },
  {
    name: 'Professional',
    price: { monthly: 1299, annual: 999 },
    desc: 'For growing manufacturers with multi-shift and multi-machine complexity.',
    features: [
      'Up to 5 Factory Sites',
      'Unlimited machines',
      'Full AI delay prediction suite',
      'AI executive briefings',
      'Advanced analytics & reports',
      'Real-time notifications',
      'Supplier performance module',
      '50 user seats',
      '24×7 priority support',
      'Custom integrations',
    ],
    cta: 'Start Free Trial',
    popular: true,
    gradient: 'from-blue-500 to-cyan-500',
    glow: 'rgba(59,130,246,0.5)',
  },
  {
    name: 'Enterprise',
    price: { monthly: null, annual: null },
    desc: 'For large-scale manufacturers and industrial conglomerates.',
    features: [
      'Unlimited factory sites',
      'Unlimited machines & users',
      'Custom AI model training',
      'Dedicated AI operations analyst',
      'White-label options',
      'On-premise deployment',
      'SSO & advanced security',
      'Custom SLA & compliance',
      '24×7 dedicated support',
      'Custom integrations & APIs',
    ],
    cta: 'Contact Sales',
    popular: false,
    gradient: 'from-violet-500 to-purple-500',
    glow: 'rgba(139,92,246,0.45)',
  },
]

function PricingCard({ plan, i, annual }) {
  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-80, 80], [8, -8]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-90, 90], [-8, 8]), { stiffness: 200, damping: 20 })
  const lightX = useTransform(mouseX, [-90, 90], [0, 100])
  const lightY = useTransform(mouseY, [-80, 80], [0, 100])
  const scale = useSpring(1, { stiffness: 300, damping: 25 })

  const onMouseMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }, [])

  const onMouseEnter = useCallback(() => {
    setHovered(true)
    scale.set(plan.popular ? 1.03 : 1.02)
  }, [])

  const onMouseLeave = useCallback(() => {
    setHovered(false)
    mouseX.set(0)
    mouseY.set(0)
    scale.set(1)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: i * 0.12,
        ease: [0.16, 1, 0.3, 1]
      }}
      style={{ perspective: 1200 }}
      className={plan.popular ? 'lg:-mt-4 lg:mb-[-16px]' : ''}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
        }}
        className="relative group"
      >
        {/* Glow */}
        <motion.div
          className="absolute -inset-3 rounded-[32px]"
          style={{
            background: `radial-gradient(circle at ${lightX}% ${lightY}%, ${plan.glow} 0%, transparent 55%)`,
            filter: 'blur(30px)',
          }}
          animate={{ opacity: hovered ? 0.5 : plan.popular ? 0.3 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Popular badge */}
        {plan.popular && (
          <motion.div
            className="absolute -top-4 left-1/2 -translate-x-1/2 z-20"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span
              className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold"
              style={{
                background: `linear-gradient(135deg, #2563eb 0%, #0891b2 100%)`,
                color: 'white',
                boxShadow: '0 10px 30px rgba(37,99,235,0.4)',
              }}
            >
              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>
                <TbSparkles size={14} />
              </motion.div>
              Most Popular
            </span>
          </motion.div>
        )}

        {/* Card body */}
        <div
          className={`relative rounded-3xl p-8 overflow-hidden transition-all duration-300 ${plan.popular ? 'pb-10' : ''}`}
          style={{
            background: hovered
              ? 'linear-gradient(180deg, rgba(15,23,42,0.98) 0%, rgba(10,16,28,0.98) 100%)'
              : 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
            border: plan.popular
              ? `1px solid ${plan.glow.replace('0.5', '0.4')}`
              : '1px solid rgba(255,255,255,0.08)',
            boxShadow: plan.popular
              ? `0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(59,130,246,0.2), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 60px ${plan.glow.replace('0.5', '0.15')}`
              : hovered
                ? `0 30px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 40px ${plan.glow.replace('0.4', '0.1')}`
                : '0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
          }}
        >
          {/* Light reflection */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255,255,255,0.06) 0%, transparent 40%)`,
            }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Top accent */}
          {plan.popular && (
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${plan.glow.replace('0.5', '0.8')} 50%, transparent)`,
              }}
            />
          )}

          <div className="relative z-10">
            {/* Name & description */}
            <h3 className="font-bold text-white text-xl mb-2">{plan.name}</h3>
            <p className="text-surface-400 text-sm mb-6">{plan.desc}</p>

            {/* Price */}
            <div className="mb-6">
              {plan.price.monthly ? (
                <div>
                  <span className="text-5xl font-black text-white">
                    ${annual ? plan.price.annual : plan.price.monthly}
                  </span>
                  <span className="text-surface-400 text-lg ml-2">/mo</span>
                  {annual && (
                    <p className="text-sm text-green-400 mt-1.5 font-medium">
                      Save ${plan.price.monthly - plan.price.annual}/mo annually
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <span className="text-4xl font-black text-white">Custom</span>
                  <p className="text-sm text-surface-500 mt-1">Volume-based pricing</p>
                </div>
              )}
            </div>

            {/* CTA */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                to={plan.cta === 'Contact Sales' ? '#contact' : '/register'}
                className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 mb-7 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg'
                    : 'bg-white/8 hover:bg-white/12 text-white border border-white/10 hover:border-white/20'
                }`}
                style={plan.popular ? { boxShadow: '0 10px 30px rgba(37,99,235,0.3)' } : {}}
              >
                {plan.cta}
                <TbArrowRight size={16} />
              </Link>
            </motion.div>

            {/* Features */}
            <div className="space-y-3">
              {plan.features.map((f, j) => (
                <motion.div
                  key={j}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + j * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${plan.popular ? 'bg-blue-500/20' : 'bg-green-500/20'}`}
                  >
                    <TbCheck size={12} className={plan.popular ? 'text-blue-400' : 'text-green-400'} />
                  </motion.div>
                  <span className="text-surface-300 text-sm">{f}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom accent */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${plan.glow.replace('0.5', '1').replace('0.4', '1')} 0%, transparent 100%)`,
            }}
            initial={{ width: 0 }}
            animate={{ width: hovered ? '80%' : 0 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function PricingSection() {
  const [annual, setAnnual] = useState(true)

  return (
    <section id="pricing" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(37,99,235,0.1) 0%, transparent 55%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-xs font-bold text-surface-400 uppercase tracking-widest">Transparent Pricing</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Simple, predictable<br />
            <span className="gradient-text">pricing for any scale</span>
          </h2>
          <p className="text-surface-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            All plans include a 14-day free trial with full feature access. No credit card required.
          </p>

          {/* Toggle */}
          <motion.div
            className="inline-flex items-center gap-2 rounded-2xl p-1.5 border"
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            <motion.button
              onClick={() => setAnnual(false)}
              className="px-6 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{
                background: !annual ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: !annual ? 'white' : '#64748b',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Monthly
            </motion.button>
            <motion.button
              onClick={() => setAnnual(true)}
              className="px-6 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2"
              style={{
                background: annual ? 'linear-gradient(135deg, #2563eb 0%, #0891b2 100%)' : 'transparent',
                color: annual ? 'white' : '#64748b',
                boxShadow: annual ? '0 5px 20px rgba(37,99,235,0.3)' : 'none',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Annual
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{
                  background: annual ? 'rgba(34,197,94,0.25)' : 'rgba(34,197,94,0.15)',
                  color: '#34d399',
                }}
              >
                Save 23%
              </span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6">
          {plans.map((plan, i) => (
            <PricingCard key={i} plan={plan} i={i} annual={annual} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-surface-500 text-sm mt-12"
        >
          All prices in USD · Billed annually · Cancel anytime · Enterprise invoicing available
        </motion.p>
      </div>
    </section>
  )
}
