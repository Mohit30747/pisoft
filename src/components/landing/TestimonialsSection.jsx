import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { TbStar, TbQuote } from 'react-icons/tb'

const testimonials = [
  {
    name: 'Rajesh Sharma',
    role: 'VP of Operations',
    company: 'Tata Motors',
    avatar: 'RS',
    rating: 5,
    text: 'FactoryOS AI transformed how we manage our 12-plant network. The AI delay prediction alone saved us $4.2M in the first year by catching supplier issues before they halted production lines.',
    gradient: 'from-blue-600 to-cyan-600',
    glow: 'rgba(59,130,246,0.45)',
    quote: '“',
  },
  {
    name: 'Priya Mehta',
    role: 'Manufacturing Director',
    company: 'Sun Pharma',
    avatar: 'PM',
    rating: 5,
    text: 'The batch traceability and compliance features are exceptional. We passed our FDA audit with zero findings, and our machine downtime dropped from 18% to just 4% in six months.',
    gradient: 'from-green-600 to-teal-600',
    glow: 'rgba(34,197,94,0.45)',
  },
  {
    name: 'Klaus Weber',
    role: 'Plant Manager',
    company: 'Bosch GmbH',
    avatar: 'KW',
    rating: 5,
    text: 'Incredible platform. The AI assistant generates executive briefs every morning that our leadership team now relies on. We went from reactive fire-fighting to genuinely proactive operations.',
    gradient: 'from-orange-600 to-red-600',
    glow: 'rgba(249,115,22,0.45)',
  },
  {
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'Flex Electronics',
    avatar: 'SC',
    rating: 5,
    text: 'Integration took just 3 days. The API is clean, the team is responsive, and the ROI was visible within the first month. Our changeover times are down 35% — exactly as promised.',
    gradient: 'from-violet-500 to-pink-600',
    glow: 'rgba(139,92,246,0.45)',
  },
  {
    name: 'Mohammed Al-Rashid',
    role: 'COO',
    company: 'SABIC',
    avatar: 'MA',
    rating: 5,
    text: 'We evaluated 8 MES platforms. FactoryOS AI was the only one that had genuine AI built in — not just bolted on. The supplier performance module alone is worth the subscription.',
    gradient: 'from-amber-600 to-orange-600',
    glow: 'rgba(245,158,11,0.45)',
  },
  {
    name: 'Ananya Iyer',
    role: 'Head of Smart Factory',
    company: 'L&T Manufacturing',
    avatar: 'AI',
    rating: 5,
    text: 'The employee shift optimization AI reduced our overtime costs by 22% while maintaining the same output. The ROI calculation was almost embarrassingly good in our business case.',
    gradient: 'from-cyan-600 to-blue-600',
    glow: 'rgba(6,182,212,0.45)',
  },
]

function TestimonialCard({ testimonial, index }) {
  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-70, 70], [6, -6]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-80, 80], [-6, 6]), { stiffness: 200, damping: 20 })
  const lightX = useTransform(mouseX, [-80, 80], [0, 100])
  const lightY = useTransform(mouseY, [-70, 70], [0, 100])
  const scale = useSpring(1, { stiffness: 300, damping: 20 })

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
    setHovered(false)
    mouseX.set(0)
    mouseY.set(0)
    scale.set(1)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1]
      }}
      style={{ perspective: 1000 }}
      className="break-inside-avoid"
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
          className="absolute -inset-3 rounded-3xl"
          style={{
            background: `radial-gradient(circle at ${lightX}% ${lightY}%, ${testimonial.glow} 0%, transparent 55%)`,
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
              ? `0 30px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 40px ${testimonial.glow.replace('0.45', '0.12')}`
              : '0 10px 30px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.03)',
          }}
        >
          {/* Light reflection */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255,255,255,0.07) 0%, transparent 40%)`,
            }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Quote icon */}
          <motion.div
            className="absolute top-4 right-4 opacity-10"
            animate={hovered ? { rotate: [0, -10, 0], opacity: 0.2 } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <TbQuote size={36} className="text-white" />
          </motion.div>

          {/* Star rating */}
          <div className="flex gap-1 mb-4 relative z-10">
            {[...Array(testimonial.rating)].map((_, j) => (
              <motion.div
                key={j}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: j * 0.05 + index * 0.08, type: 'spring', stiffness: 300 }}
              >
                <TbStar size={14} className="text-amber-400 fill-amber-400" style={{ filter: 'drop-shadow(0 0 4px rgba(251,191,36,0.5))' }} />
              </motion.div>
            ))}
          </div>

          {/* Quote text */}
          <p className="text-surface-300 text-sm leading-relaxed mb-5 relative z-10">"{testimonial.text}"</p>

          {/* Author */}
          <div className="flex items-center gap-3 relative z-10">
            <motion.div
              className={`w-11 h-11 rounded-xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white text-xs font-bold shrink-0`}
              style={{ boxShadow: `0 8px 20px ${testimonial.glow}` }}
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              {testimonial.avatar}
            </motion.div>
            <div>
              <p className="text-sm font-semibold text-white">{testimonial.name}</p>
              <p className="text-xs text-surface-500">{testimonial.role} · {testimonial.company}</p>
            </div>
          </div>

          {/* Bottom accent */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${testimonial.glow.replace('0.45', '1')} 0%, transparent 100%)`,
            }}
            initial={{ width: 0 }}
            animate={{ width: hovered ? '60%' : 0 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function TestimonialsSection() {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/5 to-transparent" />
        <div
          className="absolute top-1/3 left-0 w-[550px] h-[550px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 55%)',
            filter: 'blur(70px)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 55%)',
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
            <span className="text-xs font-bold text-surface-400 uppercase tracking-widest">Customer Stories</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Trusted by the world's<br />
            <span className="gradient-text">leading manufacturers</span>
          </h2>
          <p className="text-surface-400 text-lg max-w-xl mx-auto leading-relaxed">
            Over 500 factories across 40 countries have transformed their operations with FactoryOS AI.
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
