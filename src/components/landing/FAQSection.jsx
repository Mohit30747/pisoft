import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TbChevronDown } from 'react-icons/tb'

const faqs = [
  {
    q: 'How quickly can we get up and running?',
    a: 'Most customers are fully operational within 48–72 hours. Our white-glove onboarding team handles all integrations with your ERP, WMS, and IoT systems. We also provide a sandbox environment so your team can learn the platform without risk.'
  },
  {
    q: 'What systems does FactoryOS AI integrate with?',
    a: 'We support native integrations with SAP, Oracle NetSuite, Microsoft Dynamics, Epicor, Infor, and 40+ other ERP/MES systems. We also provide a REST API and webhooks for custom integrations. IoT connectivity supports MQTT, OPC-UA, Modbus, and major industrial protocols.'
  },
  {
    q: 'How does the AI delay prediction work?',
    a: 'Our Gemini-powered AI analyzes real-time and historical data across 50+ signals including supplier lead times, machine health metrics, workforce availability, and order complexity. It assigns risk scores to each active order and surfaces the root cause with recommended actions — all updated every 15 minutes.'
  },
  {
    q: 'Is our factory data secure?',
    a: 'Yes. FactoryOS AI is SOC 2 Type II certified and GDPR compliant. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We offer dedicated cloud tenants and on-premise deployment for Enterprise customers. We never share or sell your data.'
  },
  {
    q: 'Can we customize the AI models for our specific factory?',
    a: 'Enterprise customers get custom AI model training using your historical production data. This typically improves prediction accuracy by 15–25% over the base model. Our AI team works with you quarterly to retrain and optimize the models as your operations evolve.'
  },
  {
    q: 'What kind of support is included?',
    a: 'Starter plans include 8×5 email support with 24-hour SLA. Professional plans get 24×7 priority support via chat and phone. Enterprise customers get a dedicated Customer Success Manager, quarterly business reviews, and a direct line to our engineering team.'
  },
  {
    q: 'Do you offer an on-premise or private cloud option?',
    a: 'Yes, for Enterprise customers. We can deploy FactoryOS AI into your private cloud (AWS, Azure, GCP) or fully on-premise within your data center. This option includes all the same features with added data residency controls and compliance features.'
  },
]

export default function FAQSection() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light border border-white/8 mb-6">
            <span className="text-xs font-semibold text-surface-400">FAQ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Common <span className="gradient-text">questions</span>
          </h2>
          <p className="text-surface-400 text-lg">
            Everything you need to know before getting started.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`glass rounded-2xl border overflow-hidden transition-all duration-300 ${open === i ? 'border-blue-500/30' : 'border-white/5'}`}
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className={`font-semibold text-sm transition-colors ${open === i ? 'text-white' : 'text-surface-300'}`}>
                  {faq.q}
                </span>
                <TbChevronDown
                  size={18}
                  className={`shrink-0 text-surface-500 transition-transform duration-300 ${open === i ? 'rotate-180 text-blue-400' : ''}`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-surface-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
