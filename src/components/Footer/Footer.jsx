import { FiPhone, FiMapPin, FiClock } from 'react-icons/fi'

export default function Footer({ restaurant }) {
  const name = restaurant?.name || 'Catchy Cafe & Restaurant'
  const phone = restaurant?.phone || '0946850000 / 0946980000'
  const address = restaurant?.address || 'Bole Road, Addis Ababa, Ethiopia'
  const hours = restaurant?.openingHours || 'Daily: 7:00 AM - 10:00 PM'

  return (
    <footer className="mt-16 border-t border-border">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Top section */}
        <div className="flex flex-col sm:flex-row gap-8 justify-between mb-8">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <span
              className="font-black text-2xl uppercase tracking-widest"
              style={{
                background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Catchy
            </span>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              Premium cafe experience with bold flavors, fresh ingredients, and warm Ethiopian hospitality.
            </p>
            {/* Promo */}
            <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 rounded-full border border-emerald-200 bg-emerald-50">
              <span className="text-emerald-600 text-xs font-semibold">🎁 For one food order one water is free</span>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold text-dark uppercase tracking-wider">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="flex items-center gap-2">
                <FiPhone className="text-emerald-500 flex-shrink-0" />
                <a href="tel:+251946850000" className="hover:text-emerald-600 transition-colors">{phone}</a>
              </li>
              <li className="flex items-start gap-2">
                <FiMapPin className="text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-2">
                <FiClock className="text-emerald-500 flex-shrink-0" />
                <span>{hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider line */}
        <div className="h-px w-full"
          style={{ background: 'linear-gradient(90deg, transparent, #059669, transparent)' }} />

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
          <p>Crafted with ❤️ in Addis Ababa</p>
        </div>
      </div>
    </footer>
  )
}
