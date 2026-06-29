import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TbBuildingFactory, TbBrandLinkedin, TbBrandTwitter, TbBrandGithub, TbBrandYoutube } from 'react-icons/tb'

const links = {
  Product: ['Features', 'Dashboard', 'AI Assistant', 'Integrations', 'Security', 'Changelog'],
  Solutions: ['Automotive', 'Pharmaceuticals', 'Electronics', 'Food & Beverage', 'Aerospace', 'Heavy Manufacturing'],
  Company: ['About Us', 'Careers', 'Blog', 'Press', 'Partners', 'Contact'],
  Resources: ['Documentation', 'API Reference', 'Case Studies', 'Webinars', 'Help Center', 'Status Page'],
}

export default function Footer() {
  return (
    <footer className="border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
                <TbBuildingFactory className="text-white text-lg" />
              </div>
              <div>
                <span className="font-bold text-white text-lg leading-none">FactoryOS</span>
                <span className="text-blue-400 font-bold text-lg leading-none"> AI</span>
              </div>
            </Link>
            <p className="text-surface-500 text-sm leading-relaxed mb-6 max-w-xs">
              The AI-powered manufacturing command center that predicts delays, optimizes production, and helps you deliver on time — every time.
            </p>
            <div className="flex gap-3">
              {[TbBrandLinkedin, TbBrandTwitter, TbBrandYoutube, TbBrandGithub].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-surface-500 hover:text-white transition-all duration-200 border border-white/5"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="font-semibold text-white text-sm mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-surface-500 hover:text-white text-sm transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-surface-600 text-xs">
            © 2024 FactoryOS AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'].map((item) => (
              <a key={item} href="#" className="text-surface-600 hover:text-surface-400 text-xs transition-colors">
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-surface-600">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
