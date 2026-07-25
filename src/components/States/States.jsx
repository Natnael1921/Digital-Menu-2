import { motion } from 'framer-motion'
import { FiAlertCircle, FiRefreshCw, FiInbox } from 'react-icons/fi'

export function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-sm space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto">
          <FiAlertCircle className="w-8 h-8 text-red-400" />
        </div>
        <h2 className="text-lg font-bold text-dark">Oops! Something went wrong</h2>
        <p className="text-sm text-gray-500">{message}</p>
        {onRetry && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)' }}
          >
            <FiRefreshCw className="w-4 h-4" />
            Try Again
          </motion.button>
        )}
      </div>
    </div>
  )
}

export function EmptyState({ message = 'No items available right now.' }) {
  return (
    <div className="py-20 flex flex-col items-center justify-center gap-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center">
        <FiInbox className="w-8 h-8 text-emerald-400" />
      </div>
      <h3 className="text-base font-bold text-dark">Nothing here yet</h3>
      <p className="text-sm text-gray-400 max-w-xs">{message}</p>
    </div>
  )
}
