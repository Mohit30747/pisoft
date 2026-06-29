import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { TbDatabase, TbBrain, TbAlertTriangle, TbBell, TbShieldCheck } from 'react-icons/tb'

const steps = [
  {
    number: '01',
    icon: TbDatabase,
    title: 'Connect Your Factory',
    desc: 'Integrate machines via IoT, import orders from your ERP, sync inventory from your WMS — in under 48 hours.',
    color: 'from-blue-600 to-cyan-500',
    glow: 'rgba(59,130,246,0.5)',
  },
  {
    number: '02',
    icon: TbBrain,
    title: 'AI Learns Your Patterns',
    desc: 'Gemini AI ingests 90 days of historical data to establish baselines and learn your factory\'s unique operational DNA.',
    color: 'from-cyan-600 to-teal-500',
    glow: 'rgba(6,182,212,0.5)',
  },
  {
    number: '03',
    icon: TbAlertTriangle,
    title: 'Risks Are Identified',
    desc: 'The AI continuously scans for delay signals, inefficiencies, and anomalies — scoring each risk by severity and impact.',
    color: 'from-amber-600 to-orange-500',
    glow: 'rgba(245,158,11,0.5)',
  },
  {
    number: '04',
    icon: TbBell,
    title: 'You Get Actionable Alerts',
    desc: 'The right person gets notified at the right time with specific recommended actions to prevent the issue.',
    color: 'from-orange-600 to-red-500',
    glow: 'rgba(249,115,22,0.5)',
  },
  {
    number: '05',
    icon: TbShieldCheck,
    title: 'Production Stays on Track',
    desc: 'With proactive management, orders ship on time, machines stay healthy, and your team stays ahead of every challenge.',
    color: 'from-green-600 to-emerald-500',
    glow: 'rgba(34,197,94,0.5)',
  },
]

function StepCard({ step, index, total }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="relative text-center group"
    >
      {/* Connector line (hidden on mobile) */}
      {index < total - 1 && (
        <div className="hidden lg:block absolute top-7 left-full w-full h-0.5 z-0" style={{ background: 'linear-gradient(90deg, rgba(59,130,246,0.2) 0%, transparent 100%)' }} />
      )}

      {/* Icon container */}
      <motion.div
        className="relative w-16 h-16 mx-auto mb-6"
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {/* Glow ring */}
        <motion.div
          className="absolute -inset-3 rounded-3xl"
          style={{
            background: `radial-gradient(circle at center, ${step.glow} 0%, transparent 60%)`,
            filter: 'blur(15px)',
          }}
          initial={{ opacity: 0.3 }}
          whileHover={{ opacity: 0.6 }}
          transition={{ duration: 0.3 }}
        />

        {/* Main icon container */}
        <motion.div
          className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
          style={{ boxShadow: `0 15px 35px ${step.glow}, 0 5px 15px rgba(0,0,0,0.3)` }}
          whileHover={{ rotate: 5 }}
        >
          <step.icon size={28} className="text-white drop-shadow-lg" />

          {/* Step number badge */}
          <div
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
            style={{
              background: 'rgba(8,14,26,0.9)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#60a5fa',
              boxShadow: '0 0 15px rgba(59,130,246,0.3)',
            }}
          >
            {index + 1}
          </div>
        </motion.div>
      </motion.div>

      <h3 className="font-bold text-white text-base mb-2.5 group-hover:text-blue-300 transition-colors">{step.title}</h3>
      <p className="text-surface-400 text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>

      {/* Bottom accent line */}
      <motion.div
        className="mt-4 h-0.5 rounded-full mx-auto"
        style={{
          background: `linear-gradient(90deg, transparent, ${step.glow.replace('0.5', '0.8')} 50%, transparent)`,
          width: '40%',
        }}
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 + index * 0.12 }}
      />
    </motion.div>
  )
}

export default function HowItWorksSection() {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/5 to-transparent" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(37,99,235,0.08) 0%, transparent 60%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-xs font-bold text-surface-400 uppercase tracking-widest">How It Works</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            From setup to insights<br />
            <span className="gradient-text">in 48 hours</span>
          </h2>
          <p className="text-surface-400 text-lg max-w-xl mx-auto leading-relaxed">
            Our white-glove onboarding team handles the integration. You start seeing results immediately.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
          {steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} total={steps.length} />
          ))}
        </div>
      </div>
    </section>
  )
}
