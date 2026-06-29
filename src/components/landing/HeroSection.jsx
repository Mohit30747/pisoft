import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import {
  TbArrowRight, TbPlayerPlay, TbTrendingUp, TbAlertTriangle,
  TbCheck, TbSparkles, TbCpu, TbActivity, TbBox, TbBrain
} from 'react-icons/tb'

// Particle field canvas
function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId
    const particles = []
    const particleCount = 60
    const connectionDistance = 150

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connectionDistance) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            const opacity = (1 - dist / connectionDistance) * 0.15
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  )
}

// Animated gradient orbs
function AnimatedOrbs() {
  return (
    <>
      <motion.div
        className="orb absolute w-[700px] h-[700px]"
        style={{
          background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 60%)',
          top: '5%',
          left: '50%',
          x: '-50%',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="orb absolute w-[500px] h-[500px]"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 55%)',
          bottom: '20%',
          right: '15%',
          filter: 'blur(50px)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="orb absolute w-[400px] h-[400px]"
        style={{
          background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 50%)',
          bottom: '30%',
          left: '10%',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          y: [0, -30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="orb absolute w-[300px] h-[300px]"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 50%)',
          top: '40%',
          right: '25%',
          filter: 'blur(35px)',
        }}
        animate={{
          scale: [1, 1.25, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />
    </>
  )
}

const floatingCards = [
  {
    id: 1,
    icon: TbActivity,
    title: 'Production Rate',
    value: '98.4%',
    change: '+2.1%',
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    gradient: 'from-green-500 to-emerald-500',
    glow: 'rgba(34,197,94,0.4)',
    delay: 0,
    position: 'top-16 -left-12',
  },
  {
    id: 2,
    icon: TbAlertTriangle,
    title: 'AI Alert',
    value: 'CNC-07 Overheating',
    change: 'Critical',
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    gradient: 'from-amber-500 to-orange-500',
    glow: 'rgba(245,158,11,0.4)',
    delay: 0.15,
    position: 'bottom-8 -left-16',
  },
  {
    id: 3,
    icon: TbTrendingUp,
    title: 'Revenue Today',
    value: '$284,500',
    change: '+12.4%',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    gradient: 'from-blue-500 to-cyan-500',
    glow: 'rgba(59,130,246,0.4)',
    delay: 0.3,
    position: 'top-12 -right-12',
  },
  {
    id: 4,
    icon: TbBox,
    title: 'Orders Active',
    value: '1,247',
    change: '89 pending',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    gradient: 'from-cyan-500 to-teal-500',
    glow: 'rgba(6,182,212,0.4)',
    delay: 0.45,
    position: 'bottom-4 -right-14',
  },
]

const stats = [
  { value: '500+', label: 'Factories', sub: 'worldwide' },
  { value: '99.9%', label: 'Uptime', sub: 'guaranteed' },
  { value: '38%', label: 'Less Delays', sub: 'on average' },
  { value: '$2.4B', label: 'Processed', sub: 'annually' },
]

function FloatingCard({ card, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 30, rotateX: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
      transition={{
        delay: 1 + card.delay,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={`absolute ${card.position} perspective-1000`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        animate={{
          y: [0, -8, 0],
          rotateY: [0, 2, 0],
        }}
        transition={{
          duration: 4 + index,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.3,
        }}
        whileHover={{ scale: 1.05, rotateY: 5 }}
        className="relative"
      >
        {/* Glow */}
        <motion.div
          className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at center, ${card.glow} 0%, transparent 60%)`,
            filter: 'blur(15px)',
          }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <div
          className="relative glass-card rounded-2xl p-4 w-48"
          style={{
            border: `1px solid rgba(255,255,255,0.08)`,
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className={`w-8 h-8 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg`}
              style={{ boxShadow: `0 4px 15px ${card.glow}` }}
            >
              <card.icon size={16} className="text-white" />
            </div>
            <span className="text-xs text-surface-400 font-medium">{card.title}</span>
          </div>
          <p className="text-lg font-bold text-white">{card.value}</p>
          <p className={`text-xs mt-1 ${card.color} font-medium`}>{card.change}</p>

          {/* Pulse dot */}
          <motion.div
            className="absolute top-3 right-3"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-2 h-2 rounded-full bg-green-400" style={{ boxShadow: '0 0 10px rgba(34,197,94,0.8)' }} />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function HeroSection() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 })
  const rotateX = useTransform(springY, [-400, 400], [8, -8])
  const rotateY = useTransform(springX, [-400, 400], [-8, 8])
  const lightX = useTransform(springX, [-400, 400], [0, 100])
  const lightY = useTransform(springY, [-400, 400], [0, 100])

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Gradient orbs */}
      <AnimatedOrbs />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-pattern pointer-events-none opacity-40" />

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-[15%] w-20 h-20 border border-blue-500/20 rounded-xl"
          animate={{ rotate: [0, 360], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ transformStyle: 'preserve-3d' }}
        />
        <motion.div
          className="absolute top-40 right-[20%] w-16 h-16 border border-cyan-500/20 rounded-full"
          animate={{ rotate: [0, -360], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-32 left-[25%] w-12 h-12 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg"
          animate={{ rotate: [0, 180, 360], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8"
          style={{
            background: 'rgba(59, 130, 246, 0.08)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.1)',
          }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <TbSparkles size={16} className="text-blue-400" />
          </motion.div>
          <span className="text-sm font-semibold text-blue-300">Powered by Gemini AI</span>
          <span className="w-1 h-1 rounded-full bg-surface-600" />
          <span className="text-sm text-surface-400">Smart Manufacturing Platform</span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-center leading-[0.95] tracking-tight max-w-5xl">
            <motion.span
              className="text-white block mb-3"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              The AI Brain
            </motion.span>
            <motion.span
              className="gradient-text block mb-3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 }}
            >
              Behind Your
            </motion.span>
            <motion.span
              className="text-white block"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              Factory
            </motion.span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-lg md:text-xl text-surface-400 text-center max-w-2xl leading-relaxed"
        >
          FactoryOS AI unifies machines, orders, inventory, and people into one
          intelligent command center — reducing delays by <span className="text-white font-semibold">38%</span> and boosting
          efficiency to unprecedented levels.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 mt-10"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link to="/app" className="btn-primary px-9 py-4 text-base group">
              Book a Demo
              <TbArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link to="/app" className="btn-secondary px-9 py-4 text-base">
              <TbPlayerPlay size={18} className="text-blue-400" />
              Watch Demo
            </Link>
          </motion.div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex items-center gap-4 mt-6"
        >
          <div className="flex -space-x-2">
            {['bg-blue-500', 'bg-green-500', 'bg-amber-500', 'bg-cyan-500'].map((color, i) => (
              <div key={i} className={`w-6 h-6 rounded-full ${color} border-2 border-dark-bg flex items-center justify-center text-[8px] text-white font-bold`}>
                {['TM', 'SP', 'BG', 'LT'][i]}
              </div>
            ))}
          </div>
          <p className="text-xs text-surface-500">
            Trusted by <span className="text-white font-medium">500+</span> factories worldwide
          </p>
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-20 w-full max-w-5xl"
          onMouseMove={handleMouseMove}
          style={{ perspective: 1500 }}
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            className="relative"
          >
            {/* Glow behind dashboard */}
            <motion.div
              className="absolute -inset-8 rounded-[40px]"
              style={{
                background: `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(59,130,246,0.15) 0%, transparent 50%)`,
                filter: 'blur(40px)',
              }}
            />
            <motion.div
              className="absolute -inset-4 rounded-[32px] opacity-60"
              style={{
                background: 'radial-gradient(circle at 50% 0%, rgba(6,182,212,0.1) 0%, transparent 60%)',
                filter: 'blur(30px)',
              }}
            />

            {/* Main dashboard */}
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 50px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1) inset',
              }}
            >
              <DashboardPreview />
            </div>

            {/* Floating cards */}
            {floatingCards.map((card, i) => (
              <FloatingCard key={card.id} card={card} index={i} />
            ))}
          </motion.div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.1 }}
              className="text-center group"
            >
              <motion.div
                className="text-3xl md:text-4xl font-black gradient-text-blue group-hover:scale-105 transition-transform"
                whileHover={{ scale: 1.05 }}
              >
                {s.value}
              </motion.div>
              <div className="text-sm font-semibold text-white mt-1">{s.label}</div>
              <div className="text-xs text-surface-600">{s.sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function DashboardPreview() {
  const machines = [
    { name: 'CNC-01', status: 'running', efficiency: 94 },
    { name: 'CNC-07', status: 'warning', efficiency: 61 },
    { name: 'WELD-03', status: 'running', efficiency: 88 },
    { name: 'PRESS-12', status: 'idle', efficiency: 0 },
  ]

  const orders = [
    { id: 'ORD-2841', customer: 'Siemens AG', status: 'In Progress', value: '$48,200' },
    { id: 'ORD-2840', customer: 'Bosch GmbH', status: 'Completed', value: '$32,800' },
    { id: 'ORD-2839', customer: 'ABB Ltd', status: 'Pending', value: '$94,100' },
  ]

  const statusColors = {
    running: 'bg-green-400',
    warning: 'bg-amber-400',
    idle: 'bg-surface-600',
    error: 'bg-red-400',
  }

  return (
    <div style={{ background: 'linear-gradient(180deg, #0a1628 0%, #050810 100%)' }} className="font-mono text-xs">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5">
        <div className="flex gap-1.5">
          <motion.span whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-red-500/70 cursor-pointer" />
          <motion.span whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-amber-500/70 cursor-pointer" />
          <motion.span whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-green-500/70 cursor-pointer" />
        </div>
        <div className="mx-auto flex items-center gap-2.5 px-4 py-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>
            <TbCpu size={12} className="text-blue-400" />
          </motion.div>
          <span className="text-surface-500">app.factoryos.ai/dashboard</span>
        </div>
        <div className="flex items-center gap-2">
          <TbBrain size={14} className="text-cyan-400" />
          <span className="text-cyan-400">AI Active</span>
        </div>
      </div>

      <div className="flex h-80">
        {/* Sidebar */}
        <div className="w-14 border-r border-white/5 flex flex-col items-center py-4 gap-3" style={{ background: 'rgba(255,255,255,0.02)' }}>
          {[TbActivity, TbBox, TbCpu, TbTrendingUp].map((Icon, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1, x: 2 }}
              className={`w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer ${i === 0 ? 'bg-blue-600/20 text-blue-400' : 'text-surface-600 hover:text-surface-400'}`}
              style={i === 0 ? { boxShadow: '0 0 20px rgba(59,130,246,0.3)' } : {}}
            >
              <Icon size={16} />
            </motion.div>
          ))}
        </div>

        <div className="flex-1 p-4 grid grid-cols-3 gap-3 overflow-hidden">
          {/* KPI cards */}
          {[
            { label: 'Active Orders', value: '284', change: '+12', color: 'text-blue-400' },
            { label: 'Efficiency', value: '94.2%', change: '+2.1%', color: 'text-green-400' },
            { label: 'Revenue', value: '$2.84M', change: '+18%', color: 'text-cyan-400' },
          ].map((kpi, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 + i * 0.1 }}
              className="card p-4 flex flex-col gap-1"
              whileHover={{ y: -2 }}
            >
              <span className="text-surface-500 text-[10px]">{kpi.label}</span>
              <span className="text-white font-bold text-lg">{kpi.value}</span>
              <span className={`text-[10px] ${kpi.color}`}>{kpi.change} this week</span>
            </motion.div>
          ))}

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="col-span-2 card p-4"
          >
            <div className="text-surface-500 text-[10px] mb-3">Production Output</div>
            <div className="flex items-end gap-1 h-20">
              {[60, 75, 55, 80, 90, 70, 95, 85, 72, 88, 94, 78].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-sm"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 2 + i * 0.05, duration: 0.5, ease: 'easeOut' }}
                  style={{
                    background: `linear-gradient(to top, #2563eb, #06b6d4)`,
                    opacity: i === 10 ? 1 : 0.4 + (i / 20),
                    boxShadow: i === 10 ? '0 0 10px rgba(59,130,246,0.5)' : 'none',
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Machines */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9 }}
            className="card p-4"
          >
            <div className="text-surface-500 text-[10px] mb-3">Machines</div>
            <div className="space-y-2">
              {machines.map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2 + i * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <motion.span
                    className={`w-2 h-2 rounded-full shrink-0 ${statusColors[m.status]}`}
                    animate={m.status === 'warning' ? { opacity: [1, 0.4, 1] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span className="text-white flex-1 text-[10px]">{m.name}</span>
                  <span className="text-surface-500 text-[10px]">{m.efficiency}%</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Orders */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="col-span-3 card p-4"
          >
            <div className="text-surface-500 text-[10px] mb-3">Recent Orders</div>
            <div className="space-y-2">
              {orders.map((o, i) => (
                <motion.div
                  key={o.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.1 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-blue-400 text-[10px] font-mono w-16">{o.id}</span>
                  <span className="text-white text-[10px] flex-1">{o.customer}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-md ${
                    o.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                    o.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-surface-700 text-surface-400'
                  }`}>{o.status}</span>
                  <span className="text-white text-[10px] font-semibold">{o.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
