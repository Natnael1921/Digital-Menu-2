import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function SplashScreen({ name = 'Catchy', onDone }) {
  const [lineWidth, setLineWidth] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const duration = 1800
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      setLineWidth(progress * 100)
      if (progress < 1) requestAnimationFrame(tick)
      else setTimeout(onDone, 300)
    }
    requestAnimationFrame(tick)
  }, [onDone])

  return (
    <motion.div
      key="splash"
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(160deg, #064e3b 0%, #065f46 35%, #047857 65%, #059669 100%)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* Background decorative rings */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 border border-emerald-200" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-5 border border-emerald-200" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full opacity-10 border border-emerald-300" />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #a7f3d0 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }} />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center gap-8 px-8 text-center max-w-lg">
        {/* Brand name */}
        <div className="flex flex-col items-center gap-2">
          <motion.span
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(3rem, 10vw, 5.5rem)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              background: 'linear-gradient(135deg, #a7f3d0 0%, #ffffff 50%, #6ee7b7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 4px 24px rgba(52,211,153,0.4))',
              lineHeight: 1,
            }}
          >
            {name}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(0.7rem, 2.5vw, 0.95rem)',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'rgba(167,243,208,0.75)',
            }}
          >
            Cafe &amp; Restaurant
          </motion.span>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-[3px] rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.1)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${lineWidth}%`,
              background: 'linear-gradient(90deg, #6ee7b7, #ffffff)',
              boxShadow: '0 0 10px rgba(110,231,183,0.6)',
            }}
          />
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 'clamp(0.6rem, 2vw, 0.78rem)',
            color: 'rgba(167,243,208,0.5)',
            letterSpacing: '0.15em',
          }}
        >
          For one food order one water is free
        </motion.p>
      </div>
    </motion.div>
  )
}
