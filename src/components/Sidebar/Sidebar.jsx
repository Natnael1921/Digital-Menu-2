import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiPhone, FiMapPin, FiClock, FiGrid, FiMail, FiMessageSquare } from 'react-icons/fi'

export default function Sidebar({ isOpen, onClose, onOpenContact, onOpenFeedback, restaurant, onGoToMenu }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const name = restaurant?.name || 'Catchy Cafe'
  const address = restaurant?.address || ''
  const phone = restaurant?.phone || ''
  const hours = restaurant?.openingHours || ''

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] modal-backdrop bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            className="fixed top-0 left-0 bottom-0 z-[90] w-[280px] sm:w-[320px] border-r border-white/5 shadow-2xl p-6 flex flex-col justify-between"
            style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #052e16 100%)' }}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          >
            <div className="space-y-8">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span
                  className="font-extrabold uppercase tracking-wider text-sm"
                  style={{
                    background: 'linear-gradient(135deg, #6ee7b7 0%, #ffffff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Catchy Menu
                </span>
                <button
                  onClick={onClose}
                  aria-label="Close menu"
                  id="sidebar-close-btn"
                  className="w-8 h-8 rounded-full bg-white/5 text-gray-400 hover:text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col gap-2">
                <button
                  onClick={() => { onGoToMenu(); onClose() }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  <FiGrid className="w-4 h-4 text-emerald-400" />
                  <span>Digital Menu</span>
                </button>
                <button
                  onClick={() => { onClose(); setTimeout(onOpenContact, 200) }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  <FiMail className="w-4 h-4 text-emerald-400" />
                  <span>Contact Us</span>
                </button>
                <button
                  onClick={() => { onClose(); setTimeout(onOpenFeedback, 200) }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  <FiMessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Give Feedback</span>
                </button>
              </nav>
            </div>

            {/* Bottom info */}
            <div className="space-y-5 pt-6 border-t border-white/10 text-gray-400">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Restaurant Info</h4>
              <ul className="space-y-3 text-xs">
                {hours && (
                  <li className="flex items-start gap-2.5">
                    <FiClock className="mt-0.5 text-emerald-400 flex-shrink-0" />
                    <span>{hours}</span>
                  </li>
                )}
                {phone && (
                  <li className="flex items-center gap-2.5">
                    <FiPhone className="text-emerald-400 flex-shrink-0" />
                    <a href={`tel:${phone}`} className="hover:text-white transition-colors">{phone}</a>
                  </li>
                )}
                {address && (
                  <li className="flex items-start gap-2.5">
                    <FiMapPin className="mt-0.5 text-emerald-400 flex-shrink-0" />
                    <span>{address}</span>
                  </li>
                )}
              </ul>
              <p className="text-[10px] text-gray-600">© {new Date().getFullYear()} {name}.</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
