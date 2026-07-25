import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Lazy-loaded image with fade-in, skeleton shimmer,
 * and a gorgeous "Catchy" branded SVG fallback.
 */
export default function LazyImage({ src, alt, className = '', aspectClass = 'aspect-food' }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  const showFallback = !src || error

  return (
    <div className={`relative overflow-hidden bg-gray-100 ${aspectClass} ${className}`}>

      {/* Skeleton shimmer while loading */}
      <AnimatePresence>
        {!loaded && !showFallback && (
          <motion.div
            key="skeleton"
            className="absolute inset-0 skeleton"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Beautiful "Catchy" SVG text fallback */}
      {showFallback && (
        <div className="absolute inset-0 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 40%, #047857 70%, #059669 100%)' }}>
          {/* Decorative circles */}
          <div className="absolute top-[-20%] right-[-10%] w-40 h-40 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #6ee7b7, transparent)' }} />
          <div className="absolute bottom-[-20%] left-[-10%] w-32 h-32 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #a7f3d0, transparent)' }} />
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, #6ee7b7 1px, transparent 0)',
              backgroundSize: '28px 28px',
            }} />
          {/* Catchy text */}
          <div className="relative flex flex-col items-center gap-1 select-none">
            <span style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(1.6rem, 6vw, 2.4rem)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              background: 'linear-gradient(135deg, #a7f3d0 0%, #ffffff 50%, #6ee7b7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
            }}>
              Catchy
            </span>
            <div style={{
              width: '60%',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #6ee7b7, transparent)',
              borderRadius: '99px',
            }} />
            <span style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(0.55rem, 2vw, 0.7rem)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(167,243,208,0.7)',
            }}>
              Cafe & Restaurant
            </span>
          </div>
        </div>
      )}

      {/* Actual image */}
      {!showFallback && (
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => { setError(true); setLoaded(true) }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  )
}
