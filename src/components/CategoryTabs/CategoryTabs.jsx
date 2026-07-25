import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const EMOJIS = {
  All: '✨', Favorites: '❤️', Breakfast: '🌅', Wrap: '🌯', Burger: '🍔',
  Pizza: '🍕', Lunch: '🍲', Cake: '🍰', Torta: '🎂', Cookies: '🍪',
  'Hot Drinks': '☕', 'Fresh Juice': '🥤', 'Cold Drinks': '🥤', Extras: '🍽️',
  'Hot Beverage': '☕', Juice: '🥤', 'Cold Drink': '🥤', Extra: '🍽️',
}

const getEmoji = (name = '') => {
  for (const [k, v] of Object.entries(EMOJIS)) {
    if (name.toLowerCase().includes(k.toLowerCase())) return v
  }
  return '🍽️'
}

/**
 * Sticky horizontal category pill tabs — Green/Emerald theme.
 */
export default function CategoryTabs({ categories = [], activeId, onSelect }) {
  const listRef = useRef(null)

  useEffect(() => {
    if (!activeId || !listRef.current) return
    const btn = listRef.current.querySelector(`[data-id="${activeId}"]`)
    if (btn) btn.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })
  }, [activeId])

  return (
    <div className="fixed left-0 right-0 top-16 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5 shadow-md">
      <div
        ref={listRef}
        role="tablist"
        aria-label="Menu categories"
        className="flex gap-2 px-4 py-3 overflow-x-auto hide-scroll"
      >
        {categories.map((cat) => {
          const isActive = cat._id === activeId
          const emoji = getEmoji(cat.icon || cat.name)

          return (
            <motion.button
              key={cat._id}
              data-id={cat._id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(cat._id)}
              whileTap={{ scale: 0.95 }}
              className={`
                relative flex-shrink-0 flex flex-col items-center justify-between rounded-2xl w-[88px] h-[84px] p-2.5
                transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 border
                ${isActive
                  ? 'border-emerald-500/50 shadow-[0_4px_20px_rgba(5,150,105,0.3)] text-white'
                  : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:border-white/10 hover:text-white'}
              `}
              style={isActive ? {
                background: 'linear-gradient(160deg, rgba(5,150,105,0.22) 0%, rgba(16,185,129,0.32) 100%)',
              } : {}}
            >
              <div className="w-11 h-11 flex items-center justify-center rounded-xl overflow-hidden bg-black/20">
                <span className="text-2xl leading-none select-none">{emoji}</span>
              </div>

              <span className="text-[10px] font-bold tracking-tight text-center truncate w-full mt-1 whitespace-nowrap">
                {cat.name}
              </span>

              {/* Active neon green bottom bar */}
              {isActive && (
                <motion.span
                  layoutId="cat-indicator"
                  className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full"
                  style={{ background: '#34d399', boxShadow: '0 0 8px #34d399' }}
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
