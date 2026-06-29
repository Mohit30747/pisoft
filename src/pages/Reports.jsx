import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TbFileReport, TbDownload, TbCalendar, TbChartBar,
  TbFile, TbFileTypePdf, TbCheck, TbBrain
} from 'react-icons/tb'
import toast from 'react-hot-toast'

const reports = [
  {
    id: 'RPT-001',
    name: 'Production Summary Report',
    type: 'Production',
    period: 'December 2024',
    generated: '2024-12-28 08:00',
    size: '2.4 MB',
    status: 'Ready',
    pages: 14,
    aiInsight: 'Production exceeded target by 4.2%. Machine CNC-07 identified as key bottleneck.',
  },
  {
    id: 'RPT-002',
    name: 'Financial Performance Report',
    type: 'Finance',
    period: 'Q4 2024',
    generated: '2024-12-28 07:30',
    size: '1.8 MB',
    status: 'Ready',
    pages: 22,
    aiInsight: 'Revenue up 18.2% YoY. Profit margin improved to 45.2% from 41.8%.',
  },
  {
    id: 'RPT-003',
    name: 'Machine Health Report',
    type: 'Maintenance',
    period: 'Week 52, 2024',
    generated: '2024-12-28 06:00',
    size: '3.1 MB',
    status: 'Ready',
    pages: 18,
    aiInsight: '2 machines require immediate attention. CNC-07 overheating risk at 94°C.',
  },
  {
    id: 'RPT-004',
    name: 'Inventory Audit Report',
    type: 'Inventory',
    period: 'December 2024',
    generated: '2024-12-27 20:00',
    size: '1.2 MB',
    status: 'Ready',
    pages: 9,
    aiInsight: 'Steel Coil A critically low. 4 items need immediate reorder to prevent production stoppage.',
  },
  {
    id: 'RPT-005',
    name: 'Supplier Performance Report',
    type: 'Supply Chain',
    period: 'Q4 2024',
    generated: '2024-12-27 18:00',
    size: '2.0 MB',
    status: 'Ready',
    pages: 16,
    aiInsight: 'Polycab Wires performance declining. On-time delivery dropped to 81%. Consider alternative supplier.',
  },
  {
    id: 'RPT-006',
    name: 'Employee Performance Report',
    type: 'HR',
    period: 'December 2024',
    generated: '2024-12-27 16:00',
    size: '1.6 MB',
    status: 'Ready',
    pages: 11,
    aiInsight: 'Kavya Menon leads quality scores at 97%. Attendance improved 3.2% company-wide.',
  },
  {
    id: 'RPT-007',
    name: 'Annual Report 2024',
    type: 'Executive',
    period: 'Full Year 2024',
    generated: 'Generating...',
    size: '-',
    status: 'Generating',
    pages: null,
    aiInsight: null,
  },
]

const typeColors = {
  Production: 'bg-blue-500/20 text-blue-400',
  Finance: 'bg-green-500/20 text-green-400',
  Maintenance: 'bg-amber-500/20 text-amber-400',
  Inventory: 'bg-cyan-500/20 text-cyan-400',
  'Supply Chain': 'bg-orange-500/20 text-orange-400',
  HR: 'bg-violet-500/20 text-violet-400',
  Executive: 'bg-pink-500/20 text-pink-400',
}

export default function Reports() {
  const [period, setPeriod] = useState('Monthly')
  const [typeFilter, setTypeFilter] = useState('All')

  const types = ['All', ...new Set(reports.map(r => r.type))]
  const filtered = reports.filter(r => typeFilter === 'All' || r.type === typeFilter)

  return (
    <div className="space-y-6">
      {/* Actions bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-2 flex-wrap">
          {['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Annual'].map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${period === p ? 'bg-blue-600 text-white' : 'bg-white/5 text-surface-400 hover:bg-white/10'}`}>
              {p}
            </button>
          ))}
        </div>
        <div className="flex gap-2 ml-auto">
          <button onClick={() => toast.success('Generating report...')} className="btn-primary text-sm px-4 py-2 gap-2">
            <TbBrain size={15} /> Generate AI Report
          </button>
        </div>
      </div>

      {/* Type filter */}
      <div className="flex gap-2 flex-wrap">
        {types.map(t => (
          <button key={t} onClick={() => setTypeFilter(t)}
            className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${typeFilter === t ? 'bg-blue-600 text-white' : 'bg-white/5 text-surface-400 hover:bg-white/10'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Report list */}
      <div className="space-y-3">
        {filtered.map((report, i) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card p-5 hover:border-white/10 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${typeColors[report.type]}`}>
                {report.type === 'Finance' ? <TbChartBar size={22} /> : <TbFileReport size={22} />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white text-sm">{report.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[report.type]}`}>{report.type}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-surface-500">
                      <span className="flex items-center gap-1"><TbCalendar size={12} /> {report.period}</span>
                      {report.pages && <span>{report.pages} pages</span>}
                      {report.size !== '-' && <span>{report.size}</span>}
                      <span>Generated: {report.generated}</span>
                    </div>
                  </div>
                  <div className="shrink-0">
                    {report.status === 'Ready' ? (
                      <span className="flex items-center gap-1 text-xs text-green-400">
                        <TbCheck size={13} /> Ready
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-blue-400">
                        <div className="w-3 h-3 border border-blue-400 border-t-transparent rounded-full animate-spin" />
                        Generating
                      </span>
                    )}
                  </div>
                </div>

                {report.aiInsight && (
                  <div className="mt-2 px-3 py-2 rounded-xl bg-blue-500/8 border border-blue-500/15 flex items-start gap-2">
                    <TbBrain size={13} className="text-blue-400 mt-0.5 shrink-0" />
                    <p className="text-xs text-surface-300">{report.aiInsight}</p>
                  </div>
                )}
              </div>

              {report.status === 'Ready' && (
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => toast.success(`Downloading ${report.name} as PDF`)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-surface-400 hover:text-white text-xs transition-all"
                  >
                    <TbFileTypePdf size={14} /> PDF
                  </button>
                  <button
                    onClick={() => toast.success(`Downloading ${report.name} as Excel`)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-surface-400 hover:text-white text-xs transition-all"
                  >
                    <TbDownload size={14} /> Excel
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
