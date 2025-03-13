import Link from 'next/link'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-cream py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-barn-red mb-6">
              Grow Your Food Business from Seed to Harvest
            </h1>
            <p className="text-xl text-warm-brown mb-8">
              The complete CRM solution for homesteaders, farm stands, and cottage food businesses
            </p>
            <div className="space-x-4">
              <Link href="/auth/signin" className="btn-primary">
                Get Started
              </Link>
              <Link href="/auth/signup" className="btn-secondary">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-warm-brown text-center mb-12">
            Built for Small-Scale Food Producers
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-4xl mb-4">🌾</div>
              <h3 className="text-xl font-semibold text-warm-brown mb-2">
                Custom Website Builder
              </h3>
              <p className="text-warm-brown">
                Create a beautiful online presence with our farm-themed templates
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-warm-brown mb-2">
                Order Management
              </h3>
              <p className="text-warm-brown">
                Track orders, manage inventory, and handle customer requests
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-warm-brown mb-2">
                Business Analytics
              </h3>
              <p className="text-warm-brown">
                Make data-driven decisions with clear insights and reporting
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-cornfield-yellow bg-opacity-20 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-warm-brown mb-6">
            Ready to Start Growing?
          </h2>
          <p className="text-xl text-warm-brown mb-8">
            Join other successful food producers who trust Country Crmb
          </p>
          <Link href="/auth/signup" className="btn-primary">
            Start Free Trial
          </Link>
        </div>
      </section>
    </div>
  )
}
