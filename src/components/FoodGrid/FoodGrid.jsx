import { motion } from 'framer-motion'
import FoodCard from '../FoodCard/FoodCard'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

export default function FoodGrid({ categoryName, foods = [], onViewDetails, favorites = [], onToggleFavorite }) {
  if (!foods.length) return null

  return (
    <section aria-labelledby={`cat-heading-${categoryName}`}>
      {/* Category heading */}
      <div className="flex items-center gap-3 mb-5">
        <h2
          id={`cat-heading-${categoryName}`}
          className="text-xl md:text-2xl font-extrabold text-dark"
        >
          {categoryName}
        </h2>
        <div className="flex-1 h-px bg-border" />
        <span className="text-sm text-gray-400 font-medium">{foods.length} items</span>
      </div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {foods.map((food) => (
          <FoodCard
            key={food._id}
            food={food}
            onViewDetails={onViewDetails}
            isFavorite={favorites.includes(food._id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </motion.div>
    </section>
  )
}
