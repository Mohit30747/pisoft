import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion'
import {
  TbTrendingUp, TbClock, TbAlertTriangleOff, TbChartLine
} from 'react-icons/tb'

const stats = [
  {
    icon: TbTrendingUp,
    value: 38,
    suffix: '%',
    label: 'Reduction in Production Delays',
    color: 'text-blue-400',
    gradient: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-400/10',
    glow: 'rgba(59,130,246,0.5)',
    desc: 'Average across all deployments',
  },
  {
    icon: TbClock,
    value: 96,
    suffix: '%',
    label: 'On-Time Delivery Rate',
    color: 'text-green-400',
    gradient: 'from-green-500 to-emerald-500',
    bg: 'bg-green-400/10',
    glow: 'rgba(34,197,94,0.5)',
    desc: 'Vs 72% industry average',
  },
  {
    icon: TbAlertTriangleOff,
    value: 89,
    suffix: '%',
    label: 'Fewer Unplanned Downtime Events',
    color: 'text-cyan-400',
    gradient: 'from-cyan-500 to-teal-500',
    bg: 'bg-cyan-400/10',
    glow: 'rgba(6,182,212,0.5)',
    desc: 'Through predictive AI alerts',
  },
  {
    icon: TbChartLine,
    value: 45,
    suffix: '%',
    label: 'Better Machine Utilization',
    color: 'text-amber-400',
    gradient: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-400/10',
    glow: 'rgba(245,158,11,0.5)',
    desc: 'Optimized through AI scheduling',
  },
]

function AnimatedCounter({ value, suffix, inView }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 2200
    const startTime = performance.now()

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 4)
      const current = Math.floor(easeOut * value)
      setDisplayValue(current)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [inView, value])

  return <span>{displayValue}{suffix}</span>
}

function StatCard({ stat, index }) {
  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-60, 60], [8, -8]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-70, 70], [-8, 8]), { stiffness: 200, damping: 20 })
  const lightX = useTransform(mouseX, [-70, 70], [0, 100])
  const lightY = useTransform(mouseY, [-60, 60], [0, 100])
  const scale = useSpring(1, { stiffness: 300, damping: 25 })

  const onMouseMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }, [])

  const onMouseEnter = useCallback(() => {
    setHovered(true)
    scale.set(1.03)
  }, [])

  const onMouseLeave = useCallback(() => {
    setHovered(false)
    mouseX.set(0)
    mouseY.set(0)
    scale.set(1)
  }, [])

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1]
      }}
      style={{ perspective: 1000 }}
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
        className="relative group cursor-pointer"
      >
        {/* Animated glow */}
        <motion.div
          className="absolute -inset-2 rounded-3xl"
          style={{
            background: `radial-gradient(circle at ${lightX}% ${lightY}%, ${stat.glow} 0%, transparent 60%)`,
            filter: 'blur(25px)',
          }}
          animate={{ opacity: hovered ? 0.5 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Card body */}
        <motion.div
          className="relative rounded-2xl p-6 overflow-hidden"
          style={{
            background: hovered
              ? 'linear-gradient(135deg, rgba(15,23,42,0.98) 0%, rgba(10,16,28,0.98) 100%)'
              : 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
            border: hovered ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.06)',
            boxShadow: hovered
              ? `0 30px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 50px ${stat.glow.replace('0.5', '0.15')}`
              : '0 10px 30px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)',
          }}
        >
          {/* Light reflection */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255,255,255,0.08) 0%, transparent 45%)`,
            }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Top accent */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${stat.glow.replace('0.5', '0.8')} 50%, transparent)`,
            }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Icon */}
          <motion.div
            className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-5 shadow-lg`}
            style={{ boxShadow: `0 12px 30px ${stat.glow}, 0 4px 12px rgba(0,0,0,0.4)` }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <stat.icon size={26} className="text-white drop-shadow-lg" />
            {/* Icon pulse */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{ background: 'inherit', filter: 'blur(12px)' }}
              animate={hovered ? { scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Counter */}
          <div
            className="text-5xl font-black mb-2"
            style={{
              color: stat.color.replace('400', '300'),
              textShadow: `0 0 30px ${stat.glow}`,
            }}
          >
            <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
          </div>

          {/* Label */}
          <p className="text-white font-semibold text-sm mb-1">{stat.label}</p>
          <p className="text-surface-500 text-xs">{stat.desc}</p>

          {/* Bottom accent */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${stat.glow.replace('0.5', '1')} 0%, transparent 100%)`,
            }}
            initial={{ width: 0 }}
            animate={{ width: hovered ? '70%' : 0 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function StatsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/5 to-transparent" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px]"
          style={{
            background: 'radial-gradient(ellipse, rgba(37,99,235,0.1) 0%, transparent 60%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern-dense pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
