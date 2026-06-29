import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TbSettings, TbBell, TbShield, TbPalette, TbLink,
  TbDatabase, TbKey, TbMail, TbToggleLeft, TbToggleRight,
  TbCheck
} from 'react-icons/tb'
import toast from 'react-hot-toast'

const sections = [
  { id: 'general', label: 'General', icon: TbSettings },
  { id: 'notifications', label: 'Notifications', icon: TbBell },
  { id: 'security', label: 'Security', icon: TbShield },
  { id: 'appearance', label: 'Appearance', icon: TbPalette },
  { id: 'integrations', label: 'Integrations', icon: TbLink },
]

function Toggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`w-10 h-6 rounded-full transition-all duration-300 relative ${value ? 'bg-blue-600' : 'bg-surface-700'}`}
    >
      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${value ? 'left-5' : 'left-1'}`} />
    </button>
  )
}

function SettingRow({ label, desc, children }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
      <div className="flex-1 mr-6">
        <p className="text-sm font-medium text-white">{label}</p>
        {desc && <p className="text-xs text-surface-500 mt-0.5">{desc}</p>}
      </div>
      {children}
    </div>
  )
}

export default function Settings() {
  const [activeSection, setActiveSection] = useState('general')
  const [settings, setSettings] = useState({
    emailAlerts: true,
    machineAlerts: true,
    inventoryAlerts: true,
    orderAlerts: true,
    aiInsights: true,
    weeklyReport: true,
    twoFactor: false,
    sessionTimeout: '8h',
    theme: 'dark',
    language: 'en',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
  })

  const update = (key, value) => setSettings(prev => ({ ...prev, [key]: value }))

  return (
    <div className="flex gap-6 max-w-5xl">
      {/* Sidebar */}
      <div className="w-52 shrink-0">
        <nav className="space-y-1">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`nav-item w-full ${activeSection === s.id ? 'active' : ''}`}
            >
              <s.icon size={18} />
              {s.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 card p-6"
      >
        {activeSection === 'general' && (
          <div>
            <h3 className="font-semibold text-white mb-1">General Settings</h3>
            <p className="text-xs text-surface-500 mb-6">Configure your factory OS preferences</p>
            <SettingRow label="Factory Name" desc="Displayed across all reports and dashboards">
              <input className="input w-48 text-sm" defaultValue="FactoryOS Plant 1" />
            </SettingRow>
            <SettingRow label="Timezone" desc="Used for scheduling and reports">
              <select className="input w-48 text-sm" value={settings.timezone} onChange={e => update('timezone', e.target.value)}>
                <option>Asia/Kolkata</option>
                <option>Europe/Berlin</option>
                <option>America/New_York</option>
                <option>UTC</option>
              </select>
            </SettingRow>
            <SettingRow label="Language" desc="Interface language">
              <select className="input w-48 text-sm" value={settings.language} onChange={e => update('language', e.target.value)}>
                <option value="en">English</option>
                <option value="de">Deutsch</option>
                <option value="hi">Hindi</option>
                <option value="ja">Japanese</option>
              </select>
            </SettingRow>
            <SettingRow label="Date Format">
              <select className="input w-48 text-sm" value={settings.dateFormat} onChange={e => update('dateFormat', e.target.value)}>
                <option>DD/MM/YYYY</option>
                <option>MM/DD/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </SettingRow>
            <div className="mt-6">
              <button onClick={() => toast.success('Settings saved!')} className="btn-primary text-sm px-6 py-2.5 gap-2">
                <TbCheck size={15} /> Save Changes
              </button>
            </div>
          </div>
        )}

        {activeSection === 'notifications' && (
          <div>
            <h3 className="font-semibold text-white mb-1">Notification Preferences</h3>
            <p className="text-xs text-surface-500 mb-6">Control what you get notified about</p>
            {[
              { key: 'machineAlerts', label: 'Machine Alerts', desc: 'Overheating, errors, maintenance due' },
              { key: 'inventoryAlerts', label: 'Inventory Alerts', desc: 'Low stock, critical shortages, reorder prompts' },
              { key: 'orderAlerts', label: 'Order Alerts', desc: 'Status changes, delays, completions' },
              { key: 'emailAlerts', label: 'Email Notifications', desc: 'Receive alerts via email' },
              { key: 'aiInsights', label: 'AI Insights', desc: 'Daily AI-generated factory briefings' },
              { key: 'weeklyReport', label: 'Weekly Report Email', desc: 'Automated weekly summary every Monday' },
            ].map(s => (
              <SettingRow key={s.key} label={s.label} desc={s.desc}>
                <Toggle value={settings[s.key]} onChange={v => update(s.key, v)} />
              </SettingRow>
            ))}
          </div>
        )}

        {activeSection === 'security' && (
          <div>
            <h3 className="font-semibold text-white mb-1">Security Settings</h3>
            <p className="text-xs text-surface-500 mb-6">Protect your account and data</p>
            <SettingRow label="Two-Factor Authentication" desc="Require OTP on every login">
              <Toggle value={settings.twoFactor} onChange={v => { update('twoFactor', v); toast.success(v ? '2FA enabled!' : '2FA disabled') }} />
            </SettingRow>
            <SettingRow label="Session Timeout" desc="Auto logout after inactivity">
              <select className="input w-32 text-sm" value={settings.sessionTimeout} onChange={e => update('sessionTimeout', e.target.value)}>
                <option value="1h">1 hour</option>
                <option value="8h">8 hours</option>
                <option value="24h">24 hours</option>
                <option value="never">Never</option>
              </select>
            </SettingRow>
            <div className="mt-6 space-y-3">
              <button onClick={() => toast.success('Password reset email sent')} className="btn-secondary text-sm px-5 py-2.5 gap-2">
                <TbKey size={15} /> Change Password
              </button>
              <div className="p-4 rounded-xl bg-surface-900 border border-white/5">
                <p className="text-xs font-semibold text-white mb-1">Active Sessions</p>
                <p className="text-xs text-surface-500">1 active session · Mumbai, India · Chrome on Windows</p>
                <button onClick={() => toast.success('Other sessions revoked')} className="text-xs text-red-400 hover:text-red-300 mt-2">Revoke other sessions</button>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'appearance' && (
          <div>
            <h3 className="font-semibold text-white mb-1">Appearance</h3>
            <p className="text-xs text-surface-500 mb-6">Customize your experience</p>
            <div className="space-y-4">
              <div>
                <label className="label">Theme</label>
                <div className="grid grid-cols-3 gap-3">
                  {['dark', 'light', 'system'].map(t => (
                    <button
                      key={t}
                      onClick={() => { update('theme', t); toast.success(`${t} theme selected`) }}
                      className={`p-4 rounded-xl border text-sm font-medium capitalize transition-all ${settings.theme === t ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 'border-white/8 bg-white/3 text-surface-400 hover:border-white/15'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <SettingRow label="Compact Mode" desc="Reduce padding for more data density">
                <Toggle value={false} onChange={() => toast.success('Compact mode toggled')} />
              </SettingRow>
              <SettingRow label="Animations" desc="Enable smooth UI transitions">
                <Toggle value={true} onChange={() => toast.success('Animation setting changed')} />
              </SettingRow>
            </div>
          </div>
        )}

        {activeSection === 'integrations' && (
          <div>
            <h3 className="font-semibold text-white mb-1">Integrations</h3>
            <p className="text-xs text-surface-500 mb-6">Connect external systems</p>
            <div className="space-y-3">
              {[
                { name: 'SAP ERP', status: 'Connected', icon: TbDatabase, color: 'text-green-400 bg-green-400/10' },
                { name: 'Gemini AI', status: 'Connected', icon: TbKey, color: 'text-blue-400 bg-blue-400/10' },
                { name: 'Salesforce CRM', status: 'Not Connected', icon: TbLink, color: 'text-surface-500 bg-surface-700' },
                { name: 'Slack', status: 'Not Connected', icon: TbMail, color: 'text-surface-500 bg-surface-700' },
              ].map((int, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/3 border border-white/5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${int.color}`}>
                    <int.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{int.name}</p>
                    <p className={`text-xs ${int.status === 'Connected' ? 'text-green-400' : 'text-surface-500'}`}>{int.status}</p>
                  </div>
                  <button
                    onClick={() => toast.success(int.status === 'Connected' ? `Disconnecting ${int.name}` : `Connecting ${int.name}`)}
                    className={`text-xs px-4 py-2 rounded-xl font-medium transition-all ${int.status === 'Connected' ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30'}`}
                  >
                    {int.status === 'Connected' ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
