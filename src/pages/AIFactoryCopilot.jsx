import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TbBrain, TbSend, TbSparkles, TbUpload, TbFileText, TbFileAnalytics,
  TbAlertTriangle, TbCopy, TbThumbUp, TbUser, TbRobot, TbChevronRight,
  TbRefresh, TbHistory, TbShieldCheck, TbBug, TbChartBar, TbSettings,
  TbX, TbDownload, TbEye, TbAnalyze
} from 'react-icons/tb'
import toast from 'react-hot-toast'
import { supabase } from '../lib/supabase'

const modes = [
  { id: 'chat', label: 'AI Chat', icon: TbBrain, desc: 'Natural language queries' },
  { id: 'analysis', label: 'File Analysis', icon: TbFileAnalytics, desc: 'Upload files for AI review' },
  { id: 'anomaly', label: 'Anomaly Detection', icon: TbAlertTriangle, desc: 'Detect unusual patterns' },
]

const suggestions = [
  'Predict next week\'s production bottlenecks',
  'Analyze machine efficiency trends',
  'Identify supplier risk factors',
  'Generate executive summary report',
  'Optimize shift scheduling',
  'Forecast inventory needs',
]

const mockAnomalies = [
  {
    id: 'A001',
    type: 'Machine Temperature',
    severity: 'High',
    source: 'CNC-07',
    detected: '5 min ago',
    description: 'Temperature exceeded normal range by 12°C. Immediate cooling recommended.',
    confidence: 94,
  },
  {
    id: 'A002',
    type: 'Inventory Depletion',
    severity: 'Medium',
    source: 'Steel Coil A',
    detected: '1 hour ago',
    description: 'Consumption rate 23% higher than predicted. Reorder within 48 hours.',
    confidence: 87,
  },
  {
    id: 'A003',
    type: 'Order Delay Risk',
    severity: 'High',
    source: 'ORD-2838',
    detected: '2 hours ago',
    description: 'Production schedule conflict may cause 3-day delay. Recommend reassignment.',
    confidence: 91,
  },
]

const analysisResults = {
  production: `**Production Analysis Report**

**Overview:**
Production efficiency is currently at 94.2%, which is 4.2% above the monthly target. However, there are several areas requiring attention.

**Key Findings:**
1. **Machine CNC-07 Thermal Stress**: Operating at 94°C (9°C above threshold)
2. **Line A Bottleneck**: 12% slower than other lines due to raw material delays
3. **Quality Rate**: 99.2% pass rate, exceeding the 98% target

**Recommendations:**
• Immediate maintenance for CNC-07 to prevent failure
• Expedite Steel Coil A delivery from alternate supplier
• Consider extending Line A shift by 2 hours to recover production

**Predicted Impact:**
Implementing recommendations could increase efficiency to 97.8% within 2 weeks.`,
}

function Message({ msg }) {
  const isAI = msg.role === 'assistant'

  const formatContent = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-bold text-white mt-3 mb-1">{line.replace(/\*\*/g, '')}</p>
      }
      if (line.startsWith('• ')) {
        return (
          <div key={i} className="flex items-start gap-2 mb-1">
            <span className="text-blue-400 mt-0.5 shrink-0">•</span>
            <p className="text-surface-300 text-sm leading-relaxed">{line.substring(2)}</p>
          </div>
        )
      }
      if (line.match(/^\d+\./)) {
        return (
          <div key={i} className="flex items-start gap-2 mb-1">
            <span className="text-cyan-400 mt-0.5 shrink-0 text-xs font-bold">{line.split('.')[0]}.</span>
            <p className="text-surface-300 text-sm leading-relaxed">
              <strong className="text-white">{line.split(':')[0]?.split('. ')[1]?.replace(/\*\*/g, '')}</strong>
              {line.includes(':') ? ':' + line.split(':').slice(1).join(':').replace(/\*\*/g, '') : ''}
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
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isAI ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : 'bg-white/10'}`}>
        {isAI ? <TbRobot size={18} className="text-white" /> : <TbUser size={18} className="text-white" />}
      </div>
      <div className={`max-w-[85%] ${isAI ? '' : 'items-end flex flex-col'}`}>
        <div className={`rounded-2xl px-4 py-3.5 ${isAI ? 'bg-dark-card border border-white/5' : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'}`}>
          {isAI ? <div>{formatContent(msg.content)}</div> : <p className="text-sm">{msg.content}</p>}
        </div>
        <div className={`flex items-center gap-2 mt-2 ${isAI ? '' : 'flex-row-reverse'}`}>
          <span className="text-xs text-surface-600">{msg.time}</span>
          {isAI && (
            <div className="flex gap-1">
              <button onClick={() => { navigator.clipboard.writeText(msg.content); toast.success('Copied!') }} className="p-1.5 rounded-lg hover:bg-white/5 text-surface-600 hover:text-white transition-colors">
                <TbCopy size={14} />
              </button>
              <button onClick={() => toast.success('Thanks for feedback!')} className="p-1.5 rounded-lg hover:bg-white/5 text-surface-600 hover:text-green-400 transition-colors">
                <TbThumbUp size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function AnomalyCard({ anomaly, index }) {
  const severityColors = {
    'High': 'bg-red-500/20 text-red-400 border-red-500/30',
    'Medium': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    'Low': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card p-5 border-l-4"
      style={{ borderLeftColor: anomaly.severity === 'High' ? '#ef4444' : anomaly.severity === 'Medium' ? '#f59e0b' : '#3b82f6' }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${severityColors[anomaly.severity].split(' ')[0]}`}>
            <TbAlertTriangle size={20} className={severityColors[anomaly.severity].split(' ')[1]} />
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm">{anomaly.type}</h4>
            <p className="text-xs text-surface-500">{anomaly.source} · {anomaly.detected}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-3 py-1.5 rounded-full font-semibold border ${severityColors[anomaly.severity]}`}>
            {anomaly.severity}
          </span>
          <span className="text-xs text-surface-500 bg-white/5 px-2 py-1 rounded-lg">
            {anomaly.confidence}% conf
          </span>
        </div>
      </div>
      <p className="text-sm text-surface-400 mb-4 leading-relaxed">{anomaly.description}</p>
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-semibold transition-colors"
        >
          <TbEye size={14} />
          View Details
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-surface-400 hover:text-white text-xs font-medium transition-colors"
        >
          <TbSettings size={14} />
          Take Action
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function AIFactoryCopilot() {
  const [activeMode, setActiveMode] = useState('chat')
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: `**FactoryOS AI Copilot Activated**

I have full access to your factory systems and can:
• **Predict** production delays and bottlenecks
• **Analyze** uploaded files (CSV, PDF, Excel)
• **Detect** anomalies across machines, inventory, and orders
• **Generate** executive reports and insights

Select a mode above or ask me anything about your operations.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState([])
  const [analyzing, setAnalyzing] = useState(false)
  const bottomRef = useRef(null)
  const fileInputRef = useRef(null)

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

    await new Promise(r => setTimeout(r, 1500))

    const aiMsg = {
      id: Date.now() + 1,
      role: 'assistant',
      content: q.toLowerCase().includes('production')
        ? analysisResults.production
        : `Based on your query about "${q}", here is my analysis:

**Summary:**
Your factory operations are performing well with some areas for optimization.

**Key Data Points:**
• Current efficiency: 94.2%
• Active machines: 18/25
• Orders in progress: 18
• On-time delivery rate: 96.2%

**Recommendations:**
1. Schedule maintenance for CNC-07 within 24 hours
2. Reorder Steel Coil A from alternate supplier
3. Consider shift optimization for Line A

Would you like me to dive deeper into any specific area?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages(prev => [...prev, aiMsg])
    setLoading(false)
  }

  const handleFileUpload = async (e) => {
    const uploadedFiles = Array.from(e.target.files)
    if (uploadedFiles.length === 0) return

    setFiles(prev => [...prev, ...uploadedFiles.map(f => ({ name: f.name, size: f.size, status: 'pending' }))])
    setAnalyzing(true)

    await new Promise(r => setTimeout(r, 2500))

    setFiles(prev => prev.map(f => ({ ...f, status: 'analyzed' })))
    setAnalyzing(false)

    const analysisMsg = {
      id: Date.now(),
      role: 'assistant',
      content: `**File Analysis Complete**

I've analyzed ${uploadedFiles.length} uploaded file(s):

**Findings:**
• Data quality: Excellent (97% completeness)
• Detected patterns: 3 production trends
• Anomalies found: 2 items flagged for review

**Key Insights:**
1. **Production Volume**: Consistent growth trend (+8.3% MoM)
2. **Machine Utilization**: CNC-07 underperforming by 12%
3. **Quality Metrics**: Above target by 1.2%

Would you like me to generate a detailed report or investigate specific anomalies?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages(prev => [...prev, analysisMsg])
    toast.success('Files analyzed successfully!')
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center" style={{ boxShadow: '0 10px 30px rgba(37,99,235,0.3)' }}>
            <TbBrain size={26} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">AI Factory Copilot</h1>
            <p className="text-sm text-surface-500">Advanced AI analysis with file processing and anomaly detection</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-green-400 font-medium">AI Active · Gemini Pro</span>
        </div>
      </div>

      {/* Mode tabs */}
      <div className="flex gap-3">
        {modes.map((mode) => (
          <motion.button
            key={mode.id}
            onClick={() => setActiveMode(mode.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-3 px-5 py-3.5 rounded-xl transition-all ${
              activeMode === mode.id
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                : 'bg-white/5 hover:bg-white/10 text-surface-400 border border-white/10'
            }`}
            style={activeMode === mode.id ? { boxShadow: '0 8px 25px rgba(37,99,235,0.3)' } : {}}
          >
            <mode.icon size={20} />
            <div className="text-left">
              <div className="text-sm font-semibold">{mode.label}</div>
              <div className="text-xs opacity-70">{mode.desc}</div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeMode === 'chat' && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 xl:grid-cols-4 gap-5"
          >
            {/* Chat */}
            <div className="xl:col-span-3 card flex flex-col min-h-[500px]">
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {messages.map(msg => <Message key={msg.id} msg={msg} />)}
                <AnimatePresence>
                  {loading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <TbRobot size={18} className="text-white" />
                      </div>
                      <div className="bg-dark-card border border-white/5 rounded-2xl px-4 py-3.5">
                        <div className="flex gap-1.5 items-center h-5">
                          {[0, 1, 2].map(i => (
                            <motion.div key={i} className="w-2 h-2 rounded-full bg-blue-400"
                              animate={{ y: [0, -8, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                          ))}
                          <span className="ml-3 text-xs text-surface-500">Analyzing factory data...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={bottomRef} />
              </div>
              <div className="border-t border-white/5 p-4">
                <div className="flex gap-3">
                  <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" multiple accept=".csv,.pdf,.xlsx,.xls" />
                  <button onClick={() => fileInputRef.current?.click()} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-surface-400 hover:text-white transition-colors">
                    <TbUpload size={20} />
                  </button>
                  <textarea
                    className="input flex-1 resize-none text-sm py-3"
                    placeholder="Ask about production, machines, inventory, or upload files for analysis..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    rows={1}
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || loading}
                    className="btn-primary px-5 py-3 disabled:opacity-50"
                  >
                    <TbSend size={20} />
                  </button>
                </div>
                {files.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {files.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-xs">
                        <TbFileText size={14} className="text-blue-400" />
                        <span className="text-surface-300">{f.name}</span>
                        {f.status === 'analyzed' ? <TbShieldCheck size={14} className="text-green-400" /> : <TbRefresh size={14} className="text-surface-500 animate-spin" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
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
                      <TbChevronRight size={13} className="shrink-0 mt-0.5 text-blue-400" />
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TbHistory size={14} className="text-surface-500" />
                  <span className="text-xs font-semibold text-white">AI Capabilities</span>
                </div>
                <div className="space-y-2">
                  {[
                    { label: 'Delay Prediction', status: 'Active', color: 'text-green-400' },
                    { label: 'Anomaly Detection', status: 'Alert', color: 'text-amber-400' },
                    { label: 'File Analysis', status: 'Ready', color: 'text-blue-400' },
                    { label: 'Executive Reports', status: 'Active', color: 'text-green-400' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-surface-500">{item.label}</span>
                      <span className={`font-medium ${item.color}`}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeMode === 'analysis' && (
          <motion.div
            key="analysis"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 xl:grid-cols-2 gap-5"
          >
            {/* Upload */}
            <div className="card p-6">
              <h3 className="font-semibold text-white text-sm mb-4 flex items-center gap-2">
                <TbUpload size={18} className="text-blue-400" />
                Upload Files for Analysis
              </h3>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/10 hover:border-blue-500/50 rounded-2xl p-12 text-center cursor-pointer transition-colors bg-white/2 hover:bg-blue-500/5"
              >
                <TbFileAnalytics size={48} className="mx-auto text-surface-600 mb-4" />
                <p className="text-white font-medium mb-2">Drop files here or click to upload</p>
                <p className="text-xs text-surface-500">Supports CSV, Excel, PDF files up to 50MB</p>
              </div>
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" multiple accept=".csv,.pdf,.xlsx,.xls" />

              {files.length > 0 && (
                <div className="mt-6 space-y-3">
                  {files.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center">
                        <TbFileText size={18} className="text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white font-medium">{f.name}</p>
                        <p className="text-xs text-surface-500">{(f.size / 1024).toFixed(1)} KB</p>
                      </div>
                      {analyzing ? (
                        <TbRefresh size={18} className="text-blue-400 animate-spin" />
                      ) : f.status === 'analyzed' ? (
                        <span className="text-xs text-green-400 font-medium">Analyzed</span>
                      ) : (
                        <span className="text-xs text-surface-500">Pending</span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { if (files.length > 0) { setAnalyzing(true); setTimeout(() => { setAnalyzing(false); toast.success('Analysis complete!') }, 2000) }}}
                disabled={files.length === 0 || analyzing}
                className="w-full mt-4 btn-primary py-3 text-sm disabled:opacity-50"
              >
                {analyzing ? 'Analyzing...' : 'Start Analysis'}
              </motion.button>
            </div>

            {/* Results */}
            <div className="card p-6">
              <h3 className="font-semibold text-white text-sm mb-4 flex items-center gap-2">
                <TbAnalyze size={18} className="text-cyan-400" />
                Analysis Results
              </h3>
              {files.length === 0 ? (
                <div className="text-center py-12">
                  <TbChartBar size={48} className="mx-auto text-surface-700 mb-4" />
                  <p className="text-surface-500 text-sm">Upload files to see analysis results</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                    <p className="text-sm text-green-400 font-semibold">Analysis Complete</p>
                    <p className="text-xs text-green-400/70 mt-1">3 production trends identified</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-surface-500">Data Quality</span>
                      <span className="text-green-400 font-medium">97%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-surface-500">Records Processed</span>
                      <span className="text-white">12,847</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-surface-500">Anomalies Detected</span>
                      <span className="text-amber-400 font-medium">2</span>
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-sm font-semibold transition-colors">
                    <TbDownload size={16} />
                    Download Report
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeMode === 'anomaly' && (
          <motion.div
            key="anomaly"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-5"
          >
            {/* Anomaly header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
                  <TbAlertTriangle size={20} className="text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Active Anomalies</h3>
                  <p className="text-xs text-surface-500">AI-detected patterns requiring attention</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs px-3 py-1.5 rounded-full bg-red-500/15 text-red-400 font-medium border border-red-500/20">
                  2 High Priority
                </span>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-surface-300 text-sm transition-colors">
                  <TbRefresh size={16} />
                  Scan Now
                </button>
              </div>
            </div>

            {/* Anomaly cards */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {mockAnomalies.map((anomaly, i) => (
                <AnomalyCard key={anomaly.id} anomaly={anomaly} index={i} />
              ))}
            </div>

            {/* Empty state */}
            {mockAnomalies.length === 0 && (
              <div className="card p-12 text-center">
                <TbShieldCheck size={48} className="mx-auto text-green-500 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">All Systems Normal</h3>
                <p className="text-sm text-surface-500">No anomalies detected across your factory operations</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
