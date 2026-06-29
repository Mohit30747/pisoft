import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  TbBrain, TbLayoutDashboard, TbPackage,
  TbUsers, TbTruck, TbAlertTriangle, TbChartBar,
  TbShieldCheck, TbActivity, TbArrowRight
} from 'react-icons/tb'
import { Link } from 'react-router-dom'

const features = [
  {
    icon: TbBrain,
    title: 'AI Delay Prediction',
    desc: 'Gemini AI analyzes 50+ signals across machines, suppliers, and workforce to predict production delays 72h in advance with 94% accuracy.',
    gradient: 'from-blue-500 via-blue-600 to-cyan-500',
    glow: 'rgba(59,130,246,0.5)',
    glowHover: 'rgba(59,130,246,0.7)',
    tag: 'Core AI',
    featured: true,
  },
  {
    icon: TbLayoutDashboard,
    title: 'Unified Command Center',
    desc: 'Real-time visibility across all factory operations — from incoming orders to outgoing shipments — in a single premium dashboard.',
    gradient: 'from-cyan-500 via-cyan-600 to-teal-500',
    glow: 'rgba(6,182,212,0.45)',
    glowHover: 'rgba(6,182,212,0.65)',
    tag: 'Operations',
  },
  {
    icon: TbPackage,
    title: 'Inventory Intelligence',
    desc: 'Smart inventory with AI-driven reorder points, supplier recommendations, and wastage reduction across all warehouses.',
    gradient: 'from-green-500 via-emerald-600 to-teal-500',
    glow: 'rgba(34,197,94,0.4)',
    glowHover: 'rgba(34,197,94,0.6)',
    tag: 'Inventory',
  },
  {
    icon: TbActivity,
    title: 'Machine Health Monitoring',
    desc: 'IoT-connected machine monitoring with predictive maintenance alerts, thermal tracking, and downtime reduction up to 89%.',
    gradient: 'from-orange-500 via-orange-600 to-amber-500',
    glow: 'rgba(249,115,22,0.4)',
    glowHover: 'rgba(249,115,22,0.6)',
    tag: 'Machines',
  },
  {
    icon: TbUsers,
    title: 'Workforce Management',
    desc: 'Track attendance, performance, shifts, and skills. AI recommends optimal team assignments for each production run.',
    gradient: 'from-violet-500 via-violet-600 to-purple-500',
    glow: 'rgba(139,92,246,0.4)',
    glowHover: 'rgba(139,92,246,0.6)',
    tag: 'People',
  },
  {
    icon: TbTruck,
    title: 'Supplier Performance',
    desc: 'Score and monitor supplier reliability in real-time. Automated alerts for delivery delays before they impact production.',
    gradient: 'from-pink-500 via-rose-600 to-red-500',
    glow: 'rgba(236,72,153,0.4)',
    glowHover: 'rgba(236,72,153,0.6)',
    tag: 'Supply Chain',
  },
  {
    icon: TbAlertTriangle,
    title: 'Smart Alerts',
    desc: 'AI-prioritized alerts cut through the noise. Get notified about what matters, when it matters — in-app and via email.',
    gradient: 'from-amber-500 via-amber-600 to-yellow-500',
    glow: 'rgba(245,158,11,0.4)',
    glowHover: 'rgba(245,158,11,0.6)',
    tag: 'Alerts',
  },
  {
    icon: TbChartBar,
    title: 'Advanced Analytics',
    desc: 'Interactive dashboards with drill-down capabilities across production, revenue, machines, and workforce metrics.',
    gradient: 'from-teal-500 via-teal-600 to-cyan-500',
    glow: 'rgba(20,184,166,0.4)',
    glowHover: 'rgba(20,184,166,0.6)',
    tag: 'Analytics',
  },
  {
    icon: TbShieldCheck,
    title: 'Enterprise Security',
    desc: 'Role-based access, audit logs, SSO, and SOC 2 Type II compliant infrastructure for true enterprise peace of mind.',
    gradient: 'from-slate-400 via-slate-500 to-zinc-500',
    glow: 'rgba(100,116,139,0.35)',
    glowHover: 'rgba(100,116,139,0.55)',
    tag: 'Security',
  },
]

function FeatureCard({ feature, index }) {
  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotX = useSpring(useTransform(mouseY, [-80, 80], [10, -10]), { stiffness: 200, damping: 20 })
  const rotY = useSpring(useTransform(mouseX, [-100, 100], [-10, 10]), { stiffness: 200, damping: 20 })
  const lightX = useTransform(mouseX, [-100, 100], ['0%', '100%'])
  const lightY = useTransform(mouseY, [-80, 80], ['0%', '100%'])
  const scale = useSpring(1, { stiffness: 300, damping: 25 })

  const onMouseMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }, [])

  const onMouseEnter = useCallback(() => {
    setHovered(true)
    scale.set(1.02)
  }, [])

  const onMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
    setHovered(false)
    scale.set(1)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1]
      }}
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ perspective: 1200 }}
      className="relative group"
    >
      <motion.div
        style={{
          rotateX: rotX,
          rotateY: rotY,
          scale,
          transformStyle: 'preserve-3d',
        }}
        className="relative h-full"
      >
        {/* Animated glow */}
        <motion.div
          className="absolute -inset-2 rounded-3xl"
          style={{
            background: `radial-gradient(circle at center, ${feature.glowHover} 0%, transparent 60%)`,
            filter: 'blur(25px)',
          }}
          animate={{ opacity: hovered ? 0.5 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Card body */}
        <motion.div
          className="relative h-full rounded-2xl p-6 overflow-hidden transition-all duration-300"
          style={{
            background: hovered
              ? 'linear-gradient(135deg, rgba(15,23,42,0.98) 0%, rgba(10,16,28,0.98) 100%)'
              : 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
            border: hovered ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.06)',
            boxShadow: hovered
              ? `0 25px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 40px ${feature.glow.replace('0.4', '0.12')}`
              : '0 8px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)',
          }}
        >
          {/* Light reflection */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${lightX} ${lightY}, rgba(255,255,255,0.06) 0%, transparent 50%)`,
            }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Top accent line */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${feature.glow.replace('0.4', '0.8')} 50%, transparent)`,
            }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Icon */}
          <motion.div
            className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg`}
            style={{ boxShadow: `0 10px 25px ${feature.glow}, 0 4px 10px rgba(0,0,0,0.3)` }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <feature.icon size={24} className="text-white drop-shadow-md" />
            {/* Icon pulse */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{ background: 'inherit', filter: 'blur(10px)' }}
              animate={hovered ? { scale: [1, 1.2, 1], opacity: [0.4, 0, 0.4] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Tag */}
          <div className="absolute top-5 right-5">
            <span
              className="text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: feature.glow.replace('rgba(', 'rgb(').replace('0.4', '0.9').split(',').slice(0,3).join(',') + ')',
              }}
            >
              {feature.tag}
            </span>
          </div>

          <h3 className="font-bold text-white text-sm mb-2.5 leading-snug">{feature.title}</h3>
          <p className="text-surface-400 text-xs leading-relaxed">{feature.desc}</p>

          {/* Bottom arrow */}
          <motion.div
            className="flex items-center gap-1.5 mt-4 text-xs font-semibold"
            style={{ color: feature.glow.replace('rgba(', 'rgb(').replace('0.4', '1').split(',').slice(0,3).join(',') + ')' }}
            initial={{ opacity: 0, y: 6 }}
            animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.25 }}
          >
            Learn more <TbArrowRight size={14} />
          </motion.div>

          {/* Bottom accent */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${feature.glow.replace('0.4', '1')} 0%, transparent 100%)`,
            }}
            initial={{ width: 0 }}
            animate={{ width: hovered ? '50%' : 0 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function FeaturesSection() {
  return (
    <section id="features" className="py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 60%)',
            filter: 'blur(70px)',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(34,197,94,0.05) 0%, transparent 50%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-xs font-bold text-surface-400 uppercase tracking-widest">Powerful Features</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-5 leading-tight">
            Everything you need to run<br />
            <span className="gradient-text">a smarter factory</span>
          </h2>
          <p className="text-surface-400 text-lg max-w-2xl mx-auto leading-relaxed">
            From AI predictions to real-time monitoring — FactoryOS AI covers every dimension
            of modern manufacturing management with enterprise-grade precision.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: 1200 }}>
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-14"
        >
          <Link to="/app">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary px-8 py-4 text-base group"
            >
              Explore All Features
              <TbArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
