import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

async function getStats(supabase: any) {
  const { data: products } = await supabase
    .from('products')
    .select('*', { count: 'exact' })
    .limit(1)

  const { data: orders } = await supabase
    .from('orders')
    .select('*', { count: 'exact' })
    .limit(1)

  const { data: customers } = await supabase
    .from('customers')
    .select('*', { count: 'exact' })
    .limit(1)

  return {
    products: products?.length || 0,
    orders: orders?.length || 0,
    customers: customers?.length || 0,
  }
}

export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies })
  const stats = await getStats(supabase)

  const quickActions = [
    { label: 'Add Product', href: '/dashboard/products/new', icon: '➕' },
    { label: 'New Order', href: '/dashboard/orders/new', icon: '🛍' },
    { label: 'Add Customer', href: '/dashboard/customers/new', icon: '👤' },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-sky-blue bg-opacity-10">
          <h3 className="text-lg font-medium text-warm-brown">Products</h3>
          <p className="text-3xl font-bold text-barn-red mt-2">{stats.products}</p>
        </div>
        <div className="card bg-grass-green bg-opacity-10">
          <h3 className="text-lg font-medium text-warm-brown">Orders</h3>
          <p className="text-3xl font-bold text-barn-red mt-2">{stats.orders}</p>
        </div>
        <div className="card bg-cornfield-yellow bg-opacity-10">
          <h3 className="text-lg font-medium text-warm-brown">Customers</h3>
          <p className="text-3xl font-bold text-barn-red mt-2">{stats.customers}</p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold text-warm-brown mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center p-4 bg-cream rounded-lg hover:bg-opacity-80 transition-colors"
            >
              <span className="text-2xl mr-3">{action.icon}</span>
              <span className="text-warm-brown font-medium">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold text-warm-brown mb-4">Recent Activity</h2>
        <p className="text-soft-gray">No recent activity</p>
      </div>
    </div>
  )
}
