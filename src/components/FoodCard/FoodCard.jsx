import { memo } from 'react'
import { motion } from 'framer-motion'
import { FiHeart } from 'react-icons/fi'
import { FaHeart } from 'react-icons/fa'
import LazyImage from '../LazyImage/LazyImage'

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

const formatPrice = (price) => `${price.toLocaleString()} ETB`

const FoodCard = memo(function FoodCard({ food, onViewDetails, isFavorite, onToggleFavorite }) {
  const {
    name = 'Unknown',
    description = '',
    price = 0,
    image,
    available = true,
    featured = false,
  } = food

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 flex flex-col"
      aria-label={name}
    >
      {/* Image */}
      <div className="food-image-wrap relative flex-shrink-0">
        <LazyImage src={image} alt={name} aspectClass="aspect-food" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {featured && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white shadow-sm"
              style={{ background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)' }}>
              ⭐ Featured
            </span>
          )}
          {!available && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-800/80 text-white">
              Unavailable
            </span>
          )}
        </div>

        {/* Favourite button */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(food._id) }}
          aria-label={isFavorite ? `Remove ${name} from favorites` : `Save ${name} to favorites`}
          id={`fav-btn-${food._id}`}
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center hover:scale-110 transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          {isFavorite
            ? <FaHeart className="w-4 h-4 text-red-500 animate-pulse" />
            : <FiHeart className="w-4 h-4 text-gray-500" />
          }
        </button>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 gap-1.5">
        <h3 className="font-bold text-dark text-base leading-snug line-clamp-2">{name}</h3>

        {description && (
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{description}</p>
        )}

        {/* Footer row */}
        <div className="flex items-center justify-between mt-auto pt-3 gap-2">
          <span className="text-lg font-extrabold text-dark">{formatPrice(price)}</span>

          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => onViewDetails(food)}
            disabled={!available}
            id={`view-details-${food._id}`}
            className="btn-ripple flex-shrink-0 text-sm font-semibold px-4 py-2 rounded-full text-white shadow-sm hover:shadow-md transition-shadow duration-200 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            style={{ background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)' }}
          >
            View
          </motion.button>
        </div>
      </div>
    </motion.article>
  )
})

export default FoodCard
