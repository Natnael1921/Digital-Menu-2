import { useState, useCallback, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import { restaurantInfo, menuCategories, menuFoods } from '../../data/menuData'
import { useActiveCategory } from '../../hooks/useActiveCategory'
import Header from '../../components/Header/Header'
import CategoryTabs from '../../components/CategoryTabs/CategoryTabs'
import FoodGrid from '../../components/FoodGrid/FoodGrid'
import FoodModal from '../../components/FoodModal/FoodModal'
import Footer from '../../components/Footer/Footer'
import SplashScreen from '../../components/Splash/SplashScreen'
import Sidebar from '../../components/Sidebar/Sidebar'
import ContactFormModal from '../../components/ContactForm/ContactFormModal'
import FeedbackFormModal from '../../components/FeedbackForm/FeedbackFormModal'
import { EmptyState } from '../../components/States/States'

export default function MenuPage() {
  const [showSplash, setShowSplash] = useState(true)
  const [selectedFood, setSelectedFood] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [feedbackOpen, setFeedbackOpen] = useState(false)

  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('catchy_favorites') || '[]') }
    catch { return [] }
  })

  // Build categorised food groups from static data
  const categorisedFoods = useMemo(() => {
    const allFoods = menuFoods
    const groups = menuCategories
      .map((cat) => ({
        category: cat,
        foods: allFoods.filter((f) => f.category === cat._id),
      }))
      .filter((g) => g.foods.length > 0)

    return [
      { category: { _id: 'all', name: 'All', icon: '✨' }, foods: allFoods },
      ...groups,
    ]
  }, [])

  // Append favorites
  const favoriteFoods = useMemo(
    () => menuFoods.filter((f) => favorites.includes(f._id)),
    [favorites]
  )

  const categorisedFoodsWithFavorites = useMemo(() => [
    ...categorisedFoods,
    { category: { _id: 'favorites', name: 'Favorites', icon: '❤️' }, foods: favoriteFoods },
  ], [categorisedFoods, favoriteFoods])

  const categories = useMemo(
    () => categorisedFoodsWithFavorites.map((g) => g.category),
    [categorisedFoodsWithFavorites]
  )

  const categoryIds = useMemo(() => categories.map((c) => c._id), [categories])
  const { activeId, scrollToCategory } = useActiveCategory(categoryIds)

  const handleViewDetails = useCallback((food) => setSelectedFood(food), [])
  const handleCloseModal = useCallback(() => setSelectedFood(null), [])

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
      localStorage.setItem('catchy_favorites', JSON.stringify(next))
      return next
    })
  }, [])

  const handleGoToMenu = useCallback(() => scrollToCategory('all'), [scrollToCategory])

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen name="Catchy" onDone={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {!showSplash && (
        <div className="min-h-screen bg-white pt-[175px]">
          <Header
            restaurant={restaurantInfo}
            onToggleSidebar={() => setSidebarOpen(true)}
          />

          <CategoryTabs
            categories={categories}
            activeId={activeId}
            onSelect={scrollToCategory}
          />

          <main className="max-w-5xl mx-auto px-4 py-8 space-y-14">
            {categorisedFoodsWithFavorites.length === 0 ? (
              <EmptyState message="No menu items are available right now." />
            ) : (
              categorisedFoodsWithFavorites.map((group) => {
                const catId = group.category._id
                const isFavSection = catId === 'favorites'

                return (
                  <div
                    key={catId}
                    id={`category-section-${catId}`}
                    data-category-id={catId}
                    className="scroll-mt-36"
                  >
                    {isFavSection && group.foods.length === 0 ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-5">
                          <h2 className="text-xl md:text-2xl font-extrabold text-dark">Favorites</h2>
                          <div className="flex-1 h-px bg-border" />
                        </div>
                        <div className="bg-light/60 border border-dashed border-gray-300 rounded-2xl p-8 text-center text-sm text-gray-500 shadow-inner flex flex-col items-center gap-2">
                          <span className="text-3xl">❤️</span>
                          <p className="font-semibold text-dark">No favorites saved yet</p>
                          <p className="text-xs text-gray-400 max-w-xs">
                            Tap the heart icon on any item to save your favorites for quick access.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <FoodGrid
                        categoryName={group.category.name}
                        foods={group.foods}
                        onViewDetails={handleViewDetails}
                        favorites={favorites}
                        onToggleFavorite={toggleFavorite}
                      />
                    )}
                  </div>
                )
              })
            )}
          </main>

          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            onOpenContact={() => setContactOpen(true)}
            onOpenFeedback={() => setFeedbackOpen(true)}
            restaurant={restaurantInfo}
            onGoToMenu={handleGoToMenu}
          />

          <ContactFormModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
          <FeedbackFormModal isOpen={feedbackOpen} onClose={() => setFeedbackOpen(false)} />

          <Footer restaurant={restaurantInfo} />

          <AnimatePresence>
            {selectedFood && (
              <FoodModal
                key={selectedFood._id}
                food={selectedFood}
                onClose={handleCloseModal}
              />
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  )
}
