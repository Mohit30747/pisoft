import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { TbBrain, TbSparkles, TbChevronRight, TbCheck, TbArrowRight } from 'react-icons/tb'
import { Link } from 'react-router-dom'

const aiCapabilities = [
  {
    id: 1,
    title: 'Delay Prediction Engine',
    desc: 'Analyzes 50+ signals across your supply chain to predict delays 72 hours in advance with 94% accuracy.',
    details: [
      'Cross-references supplier history, machine health, and workforce availability',
      'Identifies bottlenecks before they cascade into production halts',
      'Provides severity scores and suggested mitigation actions',
    ],
    preview: <DelayPreview />,
    gradient: 'from-blue-500 to-cyan-500',
    glow: 'rgba(59,130,246,0.5)',
  },
  {
    id: 2,
    title: 'AI Production Optimizer',
    desc: 'Continuously re-sequences production orders to maximize throughput and minimize idle machine time.',
    details: [
      'Real-time rescheduling when disruptions occur',
      'Balances machine load to extend equipment lifespan',
      'Considers worker skills, shifts, and fatigue patterns',
    ],
    preview: <OptimizerPreview />,
    gradient: 'from-green-500 to-emerald-500',
    glow: 'rgba(34,197,94,0.5)',
  },
  {
    id: 3,
    title: 'Executive AI Briefings',
    desc: 'Auto-generated daily summaries of factory performance, risks, and opportunities — ready for leadership.',
    details: [
      'Natural language summaries of complex production data',
      'Weekly trend analysis with root cause identification',
      'Export-ready reports in PDF, Excel, and CSV formats',
    ],
    preview: <BriefingPreview />,
    gradient: 'from-cyan-500 to-blue-500',
    glow: 'rgba(6,182,212,0.5)',
  },
]

function DelayPreview() {
  const risks = [
    { order: 'ORD-2849', risk: 85, reason: 'Supplier CNC-Parts AG delayed by 2d', impact: 'High' },
    { order: 'ORD-2851', risk: 62, reason: 'Machine PRESS-12 maintenance due', impact: 'Medium' },
    { order: 'ORD-2853', risk: 34, reason: 'Labor shortage on Night shift', impact: 'Low' },
  ]

  return (
    <div className="p-5 space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>
          <TbBrain className="text-blue-400" size={18} />
        </motion.div>
        <span className="text-sm font-semibold text-white">AI Delay Analysis</span>
        <span className="ml-auto text-xs px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-400 font-medium">3 Risks Detected</span>
      </div>
      {risks.map((r, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
          className="rounded-xl p-4 border border-white/5"
          style={{ background: 'rgba(255,255,255,0.03)' }}
        >
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-sm font-semibold text-white">{r.order}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              r.impact === 'High' ? 'bg-red-500/20 text-red-400' :
              r.impact === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
              'bg-green-500/20 text-green-400'
            }`}>{r.impact} Risk</span>
          </div>
          <div className="w-full rounded-full h-2 mb-2 overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <motion.div
              className={`h-2 rounded-full ${r.risk > 70 ? 'bg-red-500' : r.risk > 50 ? 'bg-amber-500' : 'bg-green-500'}`}
              initial={{ width: 0 }}
              animate={{ width: `${r.risk}%` }}
              transition={{ duration: 1, delay: 0.5 + i * 0.15, ease: 'easeOut' }}
              style={{ boxShadow: r.risk > 70 ? '0 0 10px rgba(239,68,68,0.5)' : r.risk > 50 ? '0 0 10px rgba(245,158,11,0.5)' : '0 0 10px rgba(34,197,94,0.5)' }}
            />
          </div>
          <p className="text-xs text-surface-500">{r.reason}</p>
        </motion.div>
      ))}
    </div>
  )
}

function OptimizerPreview() {
  const machines = [
    { name: 'CNC-01', load: 94, color: 'bg-green-500' },
    { name: 'CNC-07', load: 61, color: 'bg-amber-500' },
    { name: 'WELD-03', load: 88, color: 'bg-blue-500' },
    { name: 'PRESS-12', load: 45, color: 'bg-cyan-500' },
  ]

  return (
    <div className="p-5 space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
          <TbSparkles className="text-green-400" size={18} />
        </motion.div>
        <span className="text-sm font-semibold text-white">Schedule Optimizer</span>
        <span className="ml-auto text-xs px-2.5 py-1 rounded-full bg-green-400/10 text-green-400 font-medium">+18% Throughput</span>
      </div>
      <div className="rounded-xl p-4 border border-white/5" style={{ background: 'rgba(255,255,255,0.03)' }}>
        <div className="text-xs text-surface-500 mb-3">Machine Load Balance</div>
        {machines.map((m, i) => (
          <div key={i} className="flex items-center gap-3 mb-2.5">
            <span className="text-xs text-surface-400 w-16 shrink-0">{m.name}</span>
            <div className="flex-1 rounded-full h-2 overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <motion.div
                className={`h-2 rounded-full ${m.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${m.load}%` }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
              />
            </div>
            <span className="text-xs text-white w-10 text-right font-medium">{m.load}%</span>
          </div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="rounded-xl p-4 border border-green-500/20"
        style={{ background: 'rgba(34,197,94,0.05)' }}
      >
        <p className="text-xs text-green-400 font-medium mb-1">AI Recommendation</p>
        <p className="text-xs text-surface-400">Move ORD-2851 from PRESS-12 to PRESS-09 to optimize utilization and reduce delay risk by 34%.</p>
      </motion.div>
    </div>
  )
}

function BriefingPreview() {
  return (
    <div className="p-5 space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}>
          <TbBrain className="text-cyan-400" size={18} />
        </motion.div>
        <span className="text-sm font-semibold text-white">Executive Briefing</span>
        <span className="ml-auto text-xs text-surface-500">Today 8:00 AM</span>
      </div>
      <div className="rounded-xl p-4 border border-white/5" style={{ background: 'rgba(255,255,255,0.03)' }}>
        <p className="text-sm text-surface-300 leading-relaxed">
          <span className="text-white font-semibold">Good morning, John.</span> Factory performance is at <span className="text-green-400 font-medium">94.2%</span> efficiency today — up 2.1% from yesterday. 3 critical alerts need your attention: CNC-07 overheating, Steel Coil inventory at 12% capacity, and Supplier ACME delayed on PO-8821.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {[
          { label: 'Active Orders', value: '284', color: 'text-blue-400' },
          { label: 'On-Time', value: '96%', color: 'text-green-400' },
          { label: 'Revenue', value: '$2.84M', color: 'text-cyan-400' },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="rounded-xl p-3 text-center border border-white/5"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            <div className={`text-lg font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-surface-600">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function Preview3DPanel({ children, glow, activeIndex }) {
  const panelRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-120, 120], [5, -5]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-120, 120], [-5, 5]), { stiffness: 150, damping: 20 })
  const lightX = useTransform(mouseX, [-120, 120], [0, 100])
  const lightY = useTransform(mouseY, [-120, 100], [0, 100])

  const onMouseMove = useCallback((e) => {
    const rect = panelRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }, [])

  return (
    <motion.div
      ref={panelRef}
      key={activeIndex}
      initial={{ opacity: 0, x: 40, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); mouseX.set(0); mouseY.set(0) }}
      style={{ perspective: 1400 }}
      className="lg:col-span-3"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative rounded-3xl overflow-hidden"
      >
        {/* Animated glow */}
        <motion.div
          className="absolute -inset-4 rounded-[32px]"
          style={{
            background: `radial-gradient(circle at ${lightX}% ${lightY}%, ${glow} 0%, transparent 55%)`,
            filter: 'blur(35px)',
          }}
          animate={{ opacity: hovered ? 0.5 : 0.3 }}
          transition={{ duration: 0.3 }}
        />

        {/* Browser chrome */}
        <div
          className="relative border-b"
          style={{
            background: 'linear-gradient(180deg, rgba(15,23,42,0.98) 0%, rgba(10,16,28,0.98) 100%)',
            borderColor: 'rgba(255,255,255,0.06)',
          }}
        >
          <div className="px-5 py-3.5 flex items-center gap-2">
            <div className="flex gap-1.5">
              <motion.span whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-red-500/60 cursor-pointer" />
              <motion.span whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-amber-500/60 cursor-pointer" />
              <motion.span whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-green-500/60 cursor-pointer" />
            </div>
            <div className="flex-1 mx-4">
              <div className="rounded-xl px-4 py-1.5 text-xs text-surface-500 text-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
                app.factoryos.ai/ai-assistant
              </div>
            </div>
          </div>
        </div>

        {/* Content area */}
        <motion.div
          className="relative overflow-hidden"
          style={{
            background: hovered
              ? 'linear-gradient(180deg, rgba(8,14,28,0.98) 0%, rgba(5,8,16,0.98) 100%)'
              : 'linear-gradient(180deg, rgba(8,12,22,0.98) 0%, rgba(5,8,14,0.98) 100%)',
            boxShadow: hovered
              ? `0 50px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 60px ${glow.replace('0.5', '0.12')}`
              : '0 30px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* Light reflection */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255,255,255,0.05) 0%, transparent 45%)`,
            }}
          />

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function AISection() {
  const [active, setActive] = useState(0)
  const activeCap = aiCapabilities[active]

  return (
    <section id="ai" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 55%)',
            filter: 'blur(100px)',
            transform: 'translate(30%, -30%)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 55%)',
            filter: 'blur(80px)',
            transform: 'translate(-30%, 30%)',
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
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8"
            style={{
              background: 'rgba(59,130,246,0.1)',
              border: '1px solid rgba(59,130,246,0.25)',
              boxShadow: '0 0 30px rgba(59,130,246,0.1)',
            }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>
              <TbBrain size={16} className="text-blue-400" />
            </motion.div>
            <span className="text-sm font-semibold text-blue-300">Powered by Gemini AI</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            AI that thinks<br />
            <span className="gradient-text">before problems happen</span>
          </h2>
          <p className="text-surface-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Not just dashboards — a genuine AI co-pilot that monitors, predicts, and recommends actions across your entire operation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Left: capability list */}
          <div className="lg:col-span-2 space-y-4">
            {aiCapabilities.map((cap, i) => (
              <motion.div
                key={cap.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                onClick={() => setActive(i)}
                className="relative cursor-pointer rounded-2xl p-5 transition-all duration-300 group"
                style={{
                  background: active === i
                    ? `linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(6,182,212,0.08) 100%)`
                    : 'rgba(255,255,255,0.03)',
                  border: active === i
                    ? `1px solid ${cap.glow.replace('0.5', '0.3')}`
                    : '1px solid rgba(255,255,255,0.06)',
                  boxShadow: active === i
                    ? `0 15px 40px rgba(59,130,246,0.15), inset 0 1px 0 rgba(255,255,255,0.1)`
                    : 'none',
                }}
                whileHover={{ x: 6 }}
              >
                {/* Active indicator */}
                {active === i && (
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 rounded-full"
                    style={{ background: `linear-gradient(180deg, ${cap.glow.replace('0.5', '1')} 0%, ${cap.glow.replace('0.5', '0.3')} 100%)` }}
                    layoutId="activeIndicator"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className={`font-bold text-sm mb-1.5 transition-colors ${active === i ? 'text-white' : 'text-surface-300'}`}>
                      {cap.title}
                    </h3>
                    <p className="text-xs text-surface-500 leading-relaxed">{cap.desc}</p>
                  </div>
                  <motion.div
                    animate={{ rotate: active === i ? 90 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <TbChevronRight
                      size={18}
                      className={`shrink-0 mt-0.5 transition-colors ${active === i ? 'text-blue-400' : 'text-surface-600'}`}
                    />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {active === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 space-y-2 overflow-hidden"
                    >
                      {cap.details.map((d, j) => (
                        <motion.div
                          key={j}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: j * 0.08 }}
                          className="flex items-start gap-2"
                        >
                          <TbCheck size={14} className="text-blue-400 mt-0.5 shrink-0" />
                          <span className="text-xs text-surface-400">{d}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Right: 3D preview panel */}
          <Preview3DPanel
            glow={activeCap.glow}
            activeIndex={active}
          >
            {activeCap.preview}
          </Preview3DPanel>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link to="/app/ai-assistant">
            <motion.button
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary px-9 py-4 text-base group"
            >
              Try AI Assistant
              <TbArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
