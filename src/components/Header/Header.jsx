import { motion } from 'framer-motion'
import { FiMenu } from 'react-icons/fi'

/**
 * Fixed top header bar for Catchy Cafe.
 * Green gradient accent, centered brand name.
 */
export default function Header({ restaurant, onToggleSidebar }) {
  const name = restaurant?.name || 'Catchy'
  const isOpen = restaurant?.isOpen ?? true
  const rating = restaurant?.rating || null

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0A0A0A] border-b border-white/5 flex items-center justify-between px-4 sm:px-6 shadow-xl overflow-hidden">
      {/* Decorative background glow — green */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at center, rgba(5,150,105,0.07) 0%, transparent 70%)' }} />

      {/* Left: Hamburger */}
      <div className="flex items-center gap-2.5 w-1/4">
        <button
          onClick={onToggleSidebar}
          aria-label="Open sidebar menu"
          id="sidebar-toggle-btn"
          className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/20 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 flex-shrink-0"
        >
          <FiMenu className="w-5 h-5" />
        </button>
      </div>

      {/* Center: Brand Name */}
      <div className="flex justify-center flex-1 text-center">
        <h1 className="font-black text-base sm:text-xl tracking-widest uppercase"
          style={{
            background: 'linear-gradient(135deg, #6ee7b7 0%, #ffffff 50%, #34d399 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 12px rgba(52,211,153,0.3))',
          }}>
          {name}
        </h1>
      </div>

      {/* Right: Status badge + rating */}
      <div className="flex items-center justify-end gap-1.5 w-1/4">
        {isOpen ? (
          <span className="text-[10px] sm:text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/30 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Open
          </span>
        ) : (
          <span className="text-[10px] sm:text-xs font-semibold text-red-400 bg-red-950/40 border border-red-800/30 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            Closed
          </span>
        )}
        {rating && (
          <span className="hidden sm:inline-flex text-[10px] sm:text-xs font-bold text-emerald-300 bg-emerald-950/40 border border-emerald-800/30 px-2 py-0.5 rounded-full items-center gap-0.5 shadow-sm">
            ⭐ {rating}
          </span>
        )}
      </div>

      {/* Glowing green border underline */}
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(52,211,153,0.4), transparent)' }} />
    </header>
  )
}
