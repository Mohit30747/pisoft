import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  TbCar, TbFlask, TbCpu, TbBottle, TbShirt, TbTool,
  TbPlane, TbBuildingFactory
} from 'react-icons/tb'

const industries = [
  { icon: TbCar, name: 'Automotive', desc: 'Complex multi-tier supply chain management', metrics: '41% fewer delays', gradient: 'from-blue-500 to-cyan-500', glow: 'rgba(59,130,246,0.45)' },
  { icon: TbFlask, name: 'Pharmaceuticals', desc: 'Compliance-first batch manufacturing control', metrics: '99.8% batch accuracy', gradient: 'from-green-500 to-emerald-500', glow: 'rgba(34,197,94,0.45)' },
  { icon: TbCpu, name: 'Electronics', desc: 'High-mix, low-volume precision manufacturing', metrics: '35% faster changeovers', gradient: 'from-cyan-500 to-blue-500', glow: 'rgba(6,182,212,0.45)' },
  { icon: TbBottle, name: 'Food & Beverage', desc: 'Shelf-life and FIFO inventory optimization', metrics: '28% less wastage', gradient: 'from-amber-500 to-orange-500', glow: 'rgba(245,158,11,0.45)' },
  { icon: TbShirt, name: 'Textile & Apparel', desc: 'Seasonal demand forecasting and scheduling', metrics: '44% capacity boost', gradient: 'from-pink-500 to-rose-500', glow: 'rgba(236,72,153,0.45)' },
  { icon: TbTool, name: 'Heavy Manufacturing', desc: 'Large-scale machine coordination', metrics: '52% uptime increase', gradient: 'from-orange-500 to-red-500', glow: 'rgba(249,115,22,0.45)' },
  { icon: TbPlane, name: 'Aerospace', desc: 'Zero-defect quality management workflows', metrics: '100% traceability', gradient: 'from-violet-500 to-purple-500', glow: 'rgba(139,92,246,0.45)' },
  { icon: TbBuildingFactory, name: 'General Manufacturing', desc: 'Universal factory OS for any vertical', metrics: '38% avg efficiency gain', gradient: 'from-teal-500 to-cyan-500', glow: 'rgba(20,184,166,0.45)' },
]

function IndustryCard({ industry, index }) {
  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-60, 60], [6, -6]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-70, 70], [-6, 6]), { stiffness: 200, damping: 20 })
  const lightX = useTransform(mouseX, [-70, 70], [0, 100])
  const lightY = useTransform(mouseY, [-60, 60], [0, 100])

  const onMouseMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1]
      }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); mouseX.set(0); mouseY.set(0) }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative group cursor-pointer"
      >
        {/* Glow */}
        <motion.div
          className="absolute -inset-2 rounded-3xl"
          style={{
            background: `radial-gradient(circle at ${lightX}% ${lightY}%, ${industry.glow} 0%, transparent 55%)`,
            filter: 'blur(20px)',
          }}
          animate={{ opacity: hovered ? 0.5 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div
          className="relative rounded-2xl p-6 overflow-hidden transition-all duration-300"
          style={{
            background: hovered
              ? 'linear-gradient(135deg, rgba(15,23,42,0.98) 0%, rgba(10,16,28,0.98) 100%)'
              : 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
            border: hovered ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.06)',
            boxShadow: hovered
              ? `0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 40px ${industry.glow.replace('0.45', '0.12')}`
              : '0 8px 25px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.03)',
          }}
        >
          {/* Light reflection */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255,255,255,0.06) 0%, transparent 45%)`,
            }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Icon */}
          <motion.div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${industry.gradient} flex items-center justify-center mb-4 shadow-lg`}
            style={{ boxShadow: `0 10px 25px ${industry.glow}` }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <industry.icon size={24} className="text-white drop-shadow-md" />
          </motion.div>

          <h3 className="font-bold text-white text-sm mb-1.5 group-hover:text-blue-300 transition-colors">{industry.name}</h3>
          <p className="text-surface-400 text-xs mb-4 leading-relaxed">{industry.desc}</p>

          {/* Metric badge */}
          <motion.div
            className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{
              background: `linear-gradient(135deg, ${industry.glow.replace('0.45', '0.15')} 0%, ${industry.glow.replace('0.45', '0.08')} 100%)`,
              border: `1px solid ${industry.glow.replace('0.45', '0.25')}`,
              color: industry.glow.replace('rgba(', 'rgb(').replace('0.45', '0.95').split(',').slice(0,3).join(',') + ')',
            }}
            whileHover={{ scale: 1.05 }}
          >
            {industry.metrics}
          </motion.div>

          {/* Bottom accent */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${industry.glow.replace('0.45', '1')} 0%, transparent 100%)`,
            }}
            initial={{ width: 0 }}
            animate={{ width: hovered ? '50%' : 0 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function IndustriesSection() {
  return (
    <section id="industries" className="py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 55%)',
            filter: 'blur(70px)',
            transform: 'translate(30%, 30%)',
          }}
        />
        <div
          className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 55%)',
            filter: 'blur(60px)',
            transform: 'translate(-30%, 0)',
          }}
        />
      </div>

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
            <span className="text-xs font-bold text-surface-400 uppercase tracking-widest">Industry Solutions</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Built for every<br />
            <span className="gradient-text">manufacturing vertical</span>
          </h2>
          <p className="text-surface-400 text-lg max-w-xl mx-auto leading-relaxed">
            FactoryOS AI adapts to the unique challenges of your industry with purpose-built workflows and AI models.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {industries.map((ind, i) => (
            <IndustryCard key={i} industry={ind} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
