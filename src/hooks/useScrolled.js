import { useState, useEffect } from 'react'

/**
 * Returns true when the page has been scrolled past the given threshold.
 */
export const useScrolled = (threshold = 80) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [threshold])

  return scrolled
}
