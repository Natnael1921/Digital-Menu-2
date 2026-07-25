import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiCheckCircle, FiXCircle } from 'react-icons/fi'
import LazyImage from '../LazyImage/LazyImage'

const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } }
const modalVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: 40, scale: 0.96, transition: { duration: 0.25 } },
}

const formatPrice = (price) => `${price.toLocaleString()} ETB`

export default function FoodModal({ food, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!food) return null

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-[60] modal-backdrop bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.25 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={food.name}
      >
        <motion.div
          key="modal"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[92vh] flex flex-col shadow-2xl"
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            id="food-modal-close"
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <FiX className="w-5 h-5" />
          </button>

          {/* Image */}
          <div className="food-image-wrap flex-shrink-0">
            <LazyImage src={food.image} alt={food.name} aspectClass="aspect-food" width={800} />
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto flex-1 p-5 space-y-4">
            {/* Header row */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-extrabold text-dark leading-snug">{food.name}</h2>
              </div>
              <span className="text-2xl font-extrabold text-dark flex-shrink-0">
                {formatPrice(food.price)}
              </span>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {food.available ? (
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                  <FiCheckCircle className="w-3.5 h-3.5" /> Available
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                  <FiXCircle className="w-3.5 h-3.5" /> Unavailable
                </span>
              )}
              {food.featured && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                  style={{ background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)' }}>
                  ⭐ Featured
                </span>
              )}
            </div>

            {/* Description */}
            {food.description && (
              <div>
                <h3 className="text-sm font-bold text-dark mb-1">Description</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{food.description}</p>
              </div>
            )}

            {/* Promo notice */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
              <p className="text-xs text-emerald-700 font-semibold">
                🎁 For one food order one water is free
              </p>
              <p className="text-[11px] text-emerald-600 mt-1">
                📞 0946850000 / 0946980000
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
