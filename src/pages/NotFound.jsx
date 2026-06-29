import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TbHome, TbArrowLeft, TbBuildingFactory } from 'react-icons/tb'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center animated-bg grid-pattern px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        <div className="w-20 h-20 rounded-3xl bg-blue-600/20 flex items-center justify-center mx-auto mb-8">
          <TbBuildingFactory size={40} className="text-blue-400" />
        </div>
        <h1 className="text-8xl font-black gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-3">Page Not Found</h2>
        <p className="text-surface-400 text-lg mb-10">
          This route doesn't exist in FactoryOS AI. Let's get you back on track.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/" className="btn-secondary px-6 py-3 gap-2">
            <TbArrowLeft size={18} /> Go Back
          </Link>
          <Link to="/app" className="btn-primary px-6 py-3 gap-2">
            <TbHome size={18} /> Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
