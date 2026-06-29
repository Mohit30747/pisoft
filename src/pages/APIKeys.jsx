import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TbKey, TbPlus, TbCopy, TbTrash, TbEye, TbEyeOff,
  TbRefresh, TbShieldCheck, TbAlertTriangle, TbCode,
  TbClock, TbCheck, TbX, TbSettings, TbHelp, TbExternalLink
} from 'react-icons/tb'
import toast from 'react-hot-toast'
import { supabase } from '../lib/supabase'

const mockKeys = [
  {
    id: '1',
    name: 'Production API Key',
    prefix: 'fac_prod_****',
    created: '2024-01-15',
    lastUsed: '2 hours ago',
    permissions: { read: true, write: true, admin: false },
    active: true,
  },
  {
    id: '2',
    name: 'Development Key',
    prefix: 'fac_dev_****',
    created: '2024-03-20',
    lastUsed: '5 minutes ago',
    permissions: { read: true, write: true, admin: false },
    active: true,
  },
  {
    id: '3',
    name: 'CI/CD Pipeline',
    prefix: 'fac_ci_****',
    created: '2024-05-10',
    lastUsed: '1 day ago',
    permissions: { read: true, write: false, admin: false },
    active: true,
  },
]

const codeExample = `// Example: Fetch machines using FactoryOS API
const response = await fetch('https://api.factoryos.io/v1/machines', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`

const endpoints = [
  { method: 'GET', path: '/v1/machines', desc: 'List all machines' },
  { method: 'GET', path: '/v1/machines/:id', desc: 'Get machine details' },
  { method: 'GET', path: '/v1/orders', desc: 'List all orders' },
  { method: 'POST', path: '/v1/orders', desc: 'Create new order' },
  { method: 'GET', path: '/v1/inventory', desc: 'List inventory items' },
  { method: 'PUT', path: '/v1/inventory/:id', desc: 'Update inventory item' },
  { method: 'GET', path: '/v1/ai/predict', desc: 'AI delay prediction' },
  { method: 'POST', path: '/v1/ai/analyze', desc: 'AI analysis request' },
]

const methodColors = {
  'GET': 'bg-green-500/20 text-green-400',
  'POST': 'bg-blue-500/20 text-blue-400',
  'PUT': 'bg-amber-500/20 text-amber-400',
  'DELETE': 'bg-red-500/20 text-red-400',
}

function CreateKeyModal({ isOpen, onClose, onCreate }) {
  const [name, setName] = useState('')
  const [permissions, setPermissions] = useState({ read: true, write: false, admin: false })

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-lg rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(15,23,42,0.98) 0%, rgba(8,12,24,0.98) 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center">
              <TbKey size={20} className="text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-white">Create API Key</h3>
              <p className="text-xs text-surface-500">Generate a new API key for programmatic access</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 text-surface-500 hover:text-white transition-colors">
            <TbX size={20} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div>
            <label className="text-sm text-surface-400 mb-2 block">Key Name</label>
            <input
              type="text"
              placeholder="e.g., Production API Key"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input w-full py-3"
            />
          </div>

          <div>
            <label className="text-sm text-surface-400 mb-3 block">Permissions</label>
            <div className="space-y-3">
              {[
                { key: 'read', label: 'Read Access', desc: 'View machines, orders, inventory' },
                { key: 'write', label: 'Write Access', desc: 'Create and update resources' },
                { key: 'admin', label: 'Admin Access', desc: 'Full access including user management' },
              ].map((perm) => (
                <label
                  key={perm.key}
                  className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-colors ${
                    permissions[perm.key] ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-white/3 border border-transparent hover:bg-white/5'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={permissions[perm.key]}
                    onChange={(e) => setPermissions({ ...permissions, [perm.key]: e.target.checked })}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium">{perm.label}</p>
                    <p className="text-xs text-surface-500">{perm.desc}</p>
                  </div>
                  {permissions[perm.key] && <TbCheck size={18} className="text-blue-400" />}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-5 border-t border-white/5">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-surface-300 text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { onCreate(name, permissions); onClose(); setName(''); setPermissions({ read: true, write: false, admin: false }) }}
            disabled={!name.trim()}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold disabled:opacity-50"
          >
            Create Key
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function APIKeys() {
  const [keys, setKeys] = useState(mockKeys)
  const [showModal, setShowModal] = useState(false)
  const [showCode, setShowCode] = useState(false)

  const createKey = useCallback((name, permissions) => {
    const newKey = {
      id: Date.now().toString(),
      name,
      prefix: `fac_new_${Math.random().toString(36).substring(2, 6)}****`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      permissions,
      active: true,
    }
    setKeys([...keys, newKey])
    toast.success('API key created successfully!')
  }, [])

  const deleteKey = useCallback((id) => {
    setKeys(keys.filter((k) => k.id !== id))
    toast.success('API key deleted')
  }, [keys])

  const toggleKey = useCallback((id) => {
    setKeys(keys.map((k) => (k.id === id ? { ...k, active: !k.active } : k)))
    toast.success('Key status updated')
  }, [keys])

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">API Keys</h1>
          <p className="text-sm text-surface-500">Manage API keys for programmatic access to FactoryOS</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/8 border border-white/10 text-surface-300 hover:text-white text-sm font-medium transition-colors"
          >
            <TbExternalLink size={16} />
            API Docs
          </a>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold"
            style={{ boxShadow: '0 8px 25px rgba(37,99,235,0.3)' }}
          >
            <TbPlus size={18} />
            Create API Key
          </motion.button>
        </div>
      </div>

      {/* Warning banner */}
      <div className="flex items-start gap-4 p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
        <TbAlertTriangle size={22} className="text-amber-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-amber-300 font-medium">Security Notice</p>
          <p className="text-sm text-amber-400/70 mt-1">
            API keys provide full access to your FactoryOS data. Never share keys publicly or commit them to version control.
            Rotate keys regularly for maximum security.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Keys list */}
        <div className="xl:col-span-2 space-y-4">
          {keys.map((key, index) => (
            <motion.div
              key={key.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card p-5"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${key.active ? 'bg-green-500/15' : 'bg-surface-500/15'}`}>
                    <TbKey size={20} className={key.active ? 'text-green-400' : 'text-surface-500'} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-white">{key.name}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${key.active ? 'bg-green-500/20 text-green-400' : 'bg-surface-500/20 text-surface-500'}`}>
                        {key.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-sm text-surface-500 font-mono">{key.prefix}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { navigator.clipboard.writeText(key.prefix); toast.success('Key prefix copied!') }}
                    className="p-2 rounded-lg hover:bg-white/5 text-surface-500 hover:text-white transition-colors"
                  >
                    <TbCopy size={18} />
                  </button>
                  <button
                    onClick={() => toggleKey(key.id)}
                    className="p-2 rounded-lg hover:bg-white/5 text-surface-500 hover:text-blue-400 transition-colors"
                  >
                    <TbRefresh size={18} />
                  </button>
                  <button
                    onClick={() => deleteKey(key.id)}
                    className="p-2 rounded-lg hover:bg-white/5 text-surface-500 hover:text-red-400 transition-colors"
                  >
                    <TbTrash size={18} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-surface-500">
                <div className="flex items-center gap-1.5">
                  <TbClock size={14} />
                  Created {key.created}
                </div>
                <div className="flex items-center gap-1.5">
                  <TbRefresh size={14} />
                  Last used {key.lastUsed}
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
                <span className="text-xs text-surface-500">Permissions:</span>
                {key.permissions.read && (
                  <span className="text-xs px-2 py-1 rounded-lg bg-green-500/15 text-green-400">Read</span>
                )}
                {key.permissions.write && (
                  <span className="text-xs px-2 py-1 rounded-lg bg-blue-500/15 text-blue-400">Write</span>
                )}
                {key.permissions.admin && (
                  <span className="text-xs px-2 py-1 rounded-lg bg-violet-500/15 text-violet-400">Admin</span>
                )}
              </div>
            </motion.div>
          ))}

          {keys.length === 0 && (
            <div className="card p-12 text-center">
              <TbKey size={48} className="mx-auto text-surface-600 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No API Keys</h3>
              <p className="text-sm text-surface-500 max-w-md mx-auto mb-4">
                Create an API key to start integrating with FactoryOS programmatically.
              </p>
              <button onClick={() => setShowModal(true)} className="btn-primary px-5 py-2.5 text-sm">
                <TbPlus size={16} className="inline mr-2" />
                Create First Key
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick start */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <TbCode size={18} className="text-blue-400" />
              <h3 className="font-semibold text-white text-sm">Quick Start</h3>
            </div>
            <div className="rounded-xl bg-surface-900/50 border border-white/5 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
                <span className="text-xs text-surface-500">Example Request</span>
                <button
                  onClick={() => { navigator.clipboard.writeText(codeExample); toast.success('Code copied!') }}
                  className="p-1 rounded hover:bg-white/5 text-surface-500 hover:text-white transition-colors"
                >
                  <TbCopy size={14} />
                </button>
              </div>
              <pre className="p-4 text-xs text-surface-300 overflow-x-auto leading-relaxed">
                {codeExample}
              </pre>
            </div>
          </div>

          {/* API endpoints */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TbExternalLink size={16} className="text-surface-500" />
                <h3 className="font-semibold text-white text-sm">API Endpoints</h3>
              </div>
              <button
                onClick={() => setShowCode(!showCode)}
                className="text-xs text-blue-400 hover:text-blue-300 font-medium"
              >
                {showCode ? 'Hide' : 'Show All'}
              </button>
            </div>
            <div className="space-y-2">
              {endpoints.slice(0, showCode ? undefined : 4).map((ep, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/3">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded-md font-mono font-semibold ${methodColors[ep.method]}`}>
                      {ep.method}
                    </span>
                    <code className="text-xs text-surface-400">{ep.path}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security tips */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <TbShieldCheck size={18} className="text-green-400" />
              <h3 className="font-semibold text-white text-sm">Security Tips</h3>
            </div>
            <div className="space-y-3">
              {[
                'Use separate keys for dev and production',
                'Rotate keys every 90 days',
                'Never commit keys to version control',
                'Use environment variables for keys',
                'Monitor API usage regularly',
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-2">
                  <TbCheck size={14} className="text-green-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-surface-400">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create key modal */}
      <AnimatePresence>
        {showModal && <CreateKeyModal isOpen={showModal} onClose={() => setShowModal(false)} onCreate={createKey} />}
      </AnimatePresence>
    </div>
  )
}
