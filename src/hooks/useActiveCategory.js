import { useState, useEffect, useCallback } from 'react'

/**
 * Tracks the currently-visible category section while scrolling.
 * Returns activeId + a scrollToCategory helper.
 */
export function useActiveCategory(categoryIds = []) {
  const [activeId, setActiveId] = useState(categoryIds[0] || null)

  useEffect(() => {
    if (!categoryIds.length) return

    const observers = []
    categoryIds.forEach((id) => {
      const el = document.getElementById(`category-section-${id}`)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [categoryIds.join(',')])

  const scrollToCategory = useCallback((id) => {
    const el = document.getElementById(`category-section-${id}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveId(id)
  }, [])

  return { activeId, scrollToCategory }
}
