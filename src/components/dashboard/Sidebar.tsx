'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: '🏠' },
  { href: '/dashboard/products', label: 'Products', icon: '🌾' },
  { href: '/dashboard/orders', label: 'Orders', icon: '📦' },
  { href: '/dashboard/customers', label: 'Customers', icon: '👥' },
  { href: '/dashboard/analytics', label: 'Analytics', icon: '📊' },
  { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-[#FAF5F0] border-r border-[#E8DFD8] h-screen fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-serif font-bold text-[#8B4513]">Country Crmb</h1>
        <p className="text-sm text-[#A67C52] mt-1">Homestead Management</p>
      </div>
      <nav className="mt-6 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-3 my-1 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#8B4513] text-white'
                  : 'text-[#6B4423] hover:bg-[#E8DFD8]'
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="absolute bottom-8 px-6 w-full">
        <div className="p-4 rounded-lg bg-[#E8DFD8]">
          <p className="text-sm text-[#6B4423]">Need help?</p>
          <a href="/support" className="text-xs text-[#8B4513] hover:underline">Visit our support center</a>
        </div>
      </div>
    </aside>
  )
}
