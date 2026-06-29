import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TbBrain, TbSend, TbSparkles, TbRefresh,
  TbCopy, TbThumbUp, TbUser, TbRobot, TbChevronRight
} from 'react-icons/tb'
import toast from 'react-hot-toast'

const suggestions = [
  'Give me a production summary for today',
  'Which machines need maintenance soon?',
  'What\'s causing delays in ORD-2841?',
  'Show top 3 inventory items to reorder',
  'Analyze supplier performance this month',
  'What is our on-time delivery rate trend?',
  'Recommend shift schedule optimization',
  'Predict next week\'s production bottlenecks',
]

const aiResponses = {
  default: (q) => `I'm analyzing your factory data for: "${q}"\n\n**AI Analysis:**\n\nBased on real-time data from your production floor, here is my assessment:\n\n• **Production Rate**: Currently operating at 94.2% efficiency, which is 4.2% above the monthly target.\n\n• **Key Observation**: CNC-07 is showing thermal stress indicators with temperature readings at 94°C, which is 9°C above the safe operating threshold. Immediate maintenance attention recommended.\n\n• **Inventory Alert**: Steel Coil Grade A is at 12% capacity (120kg remaining vs. 500kg minimum threshold). Reorder from TATA Steel recommended within 48 hours.\n\n• **Recommendation**: Reassign ORD-2838 from CNC-07 to CNC-01 to reduce delay risk by an estimated 67%.\n\n**Confidence Level**: High (94%) | Data freshness: 2 minutes ago`,
  production: () => `**Today's Production Summary — December 28, 2024**\n\n**Overall Performance: 94.2% Efficiency** ✅\n\n**Units Produced**: 1,284 / Target: 1,350\n**Orders Active**: 18 | **Completed Today**: 4\n\n**By Production Line:**\n• Line A (CNC): 94% efficiency | 312 units\n• Line B (Welding): 91% efficiency | 289 units\n• Line C (Assembly): 96% efficiency | 421 units\n• Line D (Press): Idle (scheduled maintenance)\n\n**AI Insight**: Production is 4.8% below daily target due to CNC-07 downtime. Recommend extending Line A shift by 2 hours to recover 65 units.\n\n**On-Time Delivery Risk**: 3 orders at medium-high risk. See Orders module for details.`,
}

const initialMessages = [
  {
    id: 1,
    role: 'assistant',
    content: `Hello! I'm your **FactoryOS AI Assistant**, powered by Gemini AI.\n\nI have real-time access to your entire factory operation — machines, orders, inventory, employees, and suppliers.\n\n**What I can help with:**\n• Production analysis and delay prediction\n• Machine health and maintenance recommendations\n• Inventory optimization and reorder alerts\n• Supplier performance insights\n• Workforce scheduling suggestions\n• Executive summaries and reports\n\nWhat would you like to analyze today?`,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  }
]

function Message({ msg }) {
  const isAI = msg.role === 'assistant'

  const formatContent = (text) => {
    return text
      .split('\n')
      .map((line, i) => {
        if (line.startsWith('**') && line.endsWith('**')) {
          return <p key={i} className="font-bold text-white mt-2 mb-1">{line.replace(/\*\*/g, '')}</p>
        }
        if (line.startsWith('• ')) {
          const parts = line.substring(2).split(/\*\*(.*?)\*\*/g)
          return (
            <div key={i} className="flex items-start gap-2 mb-0.5">
              <span className="text-blue-400 mt-0.5 shrink-0">•</span>
              <p className="text-surface-300 text-sm leading-relaxed">
                {parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="text-white">{p}</strong> : p)}
              </p>
            </div>
          )
        }
        if (!line) return <br key={i} />
        const parts = line.split(/\*\*(.*?)\*\*/g)
        return (
          <p key={i} className="text-surface-300 text-sm leading-relaxed mb-0.5">
            {parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="text-white">{p}</strong> : p)}
          </p>
        )
      })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isAI ? '' : 'flex-row-reverse'}`}
    >
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${isAI ? 'bg-blue-600/20 text-blue-400' : 'bg-white/10 text-white'}`}>
        {isAI ? <TbRobot size={16} /> : <TbUser size={16} />}
      </div>
      <div className={`max-w-[85%] ${isAI ? '' : 'items-end flex flex-col'}`}>
        <div className={`rounded-2xl px-4 py-3 ${isAI ? 'bg-dark-card border border-white/5' : 'bg-blue-600 text-white'}`}>
          {isAI ? (
            <div>{formatContent(msg.content)}</div>
          ) : (
            <p className="text-sm">{msg.content}</p>
          )}
        </div>
        <div className={`flex items-center gap-2 mt-1.5 ${isAI ? '' : 'flex-row-reverse'}`}>
          <span className="text-xs text-surface-600">{msg.time}</span>
          {isAI && (
            <div className="flex gap-1">
              <button onClick={() => { navigator.clipboard.writeText(msg.content); toast.success('Copied!') }} className="p-1 rounded hover:bg-white/5 text-surface-600 hover:text-white transition-colors">
                <TbCopy size={13} />
              </button>
              <button onClick={() => toast.success('Feedback noted!')} className="p-1 rounded hover:bg-white/5 text-surface-600 hover:text-green-400 transition-colors">
                <TbThumbUp size={13} />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function AIAssistant() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text) => {
    const q = text || input.trim()
    if (!q) return
    setInput('')

    const userMsg = {
      id: Date.now(),
      role: 'user',
      content: q,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800))

    const response = q.toLowerCase().includes('production')
      ? aiResponses.production()
      : aiResponses.default(q)

    const aiMsg = {
      id: Date.now() + 1,
      role: 'assistant',
      content: response,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages(prev => [...prev, aiMsg])
    setLoading(false)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-10rem)] gap-5">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-blue-600/10 border border-blue-500/20 shrink-0">
        <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
          <TbBrain size={22} className="text-blue-400" />
        </div>
        <div className="flex-1">
          <h2 className="font-bold text-white text-sm">FactoryOS AI Assistant</h2>
          <p className="text-xs text-surface-500">Powered by Gemini AI · Real-time factory intelligence</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-green-400 font-medium">Live</span>
        </div>
      </motion.div>

      <div className="flex flex-1 gap-5 min-h-0">
        {/* Chat area */}
        <div className="flex-1 flex flex-col card min-h-0">
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map(msg => <Message key={msg.id} msg={msg} />)}
            <AnimatePresence>
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600/20 flex items-center justify-center">
                    <TbRobot size={16} className="text-blue-400" />
                  </div>
                  <div className="bg-dark-card border border-white/5 rounded-2xl px-4 py-3">
                    <div className="flex gap-1 items-center h-5">
                      {[0, 1, 2].map(i => (
                        <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-400"
                          animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                      ))}
                      <span className="ml-2 text-xs text-surface-500">Analyzing factory data...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-white/5 p-4">
            <div className="flex gap-3">
              <textarea
                className="input flex-1 resize-none text-sm py-3"
                placeholder="Ask anything about your factory..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                rows={1}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="btn-primary px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <TbSend size={18} />
              </button>
            </div>
            <p className="text-xs text-surface-600 mt-2">Press Enter to send · Shift+Enter for new line</p>
          </div>
        </div>

        {/* Suggestions panel */}
        <div className="hidden xl:flex flex-col w-64 gap-4 shrink-0">
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-3">
              <TbSparkles size={15} className="text-blue-400" />
              <span className="text-xs font-semibold text-white">Quick Prompts</span>
            </div>
            <div className="space-y-1.5">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(s)}
                  className="w-full text-left px-3 py-2.5 rounded-xl bg-white/3 hover:bg-white/7 text-surface-400 hover:text-white text-xs transition-all flex items-start gap-2"
                >
                  <TbChevronRight size={13} className="shrink-0 mt-0.5" />
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="card p-4">
            <div className="flex items-center gap-2 mb-3">
              <TbRefresh size={14} className="text-surface-500" />
              <span className="text-xs font-semibold text-white">AI Status</span>
            </div>
            <div className="space-y-2">
              {[
                { label: 'Production Data', status: 'Live', color: 'text-green-400' },
                { label: 'Machine Sensors', status: 'Live', color: 'text-green-400' },
                { label: 'Inventory DB', status: 'Live', color: 'text-green-400' },
                { label: 'Model Version', status: 'Gemini Pro', color: 'text-blue-400' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-xs text-surface-500">{item.label}</span>
                  <span className={`text-xs font-medium ${item.color}`}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
