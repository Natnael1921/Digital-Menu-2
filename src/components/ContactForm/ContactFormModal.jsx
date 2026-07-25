import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiSend, FiCheckCircle } from 'react-icons/fi'

const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } }
const modalVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: 40, scale: 0.96, transition: { duration: 0.25 } },
}

export default function ContactFormModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1200)
  }

  const handleClose = () => { onClose(); setTimeout(() => { setSent(false); setForm({ name: '', email: '', message: '' }) }, 400) }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] modal-backdrop bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4"
          variants={backdropVariants}
          initial="hidden" animate="visible" exit="hidden"
          transition={{ duration: 0.25 }}
          onClick={handleClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden" animate="visible" exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[90vh] flex flex-col shadow-2xl"
          >
            <button onClick={handleClose} aria-label="Close"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <FiX className="w-5 h-5" />
            </button>

            <div className="p-6 overflow-y-auto flex-1">
              {sent ? (
                <div className="flex flex-col items-center gap-4 py-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                    <FiCheckCircle className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h2 className="text-xl font-extrabold text-dark">Message Sent!</h2>
                  <p className="text-sm text-gray-500">Thanks for reaching out. We'll get back to you soon.</p>
                  <motion.button whileTap={{ scale: 0.95 }} onClick={handleClose}
                    className="mt-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white"
                    style={{ background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)' }}>
                    Close
                  </motion.button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-extrabold text-dark mb-1">Contact Us</h2>
                  <p className="text-sm text-gray-500 mb-6">We'd love to hear from you!</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</label>
                      <input required value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                        className="mt-1 w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        placeholder="Your name" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</label>
                      <input type="email" value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                        className="mt-1 w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Message</label>
                      <textarea required rows={4} value={form.message} onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                        className="mt-1 w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
                        placeholder="How can we help you?" />
                    </div>
                    <motion.button whileTap={{ scale: 0.95 }} type="submit" disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold text-white disabled:opacity-60"
                      style={{ background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)' }}>
                      {loading ? 'Sending…' : <><FiSend className="w-4 h-4" /> Send Message</>}
                    </motion.button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
