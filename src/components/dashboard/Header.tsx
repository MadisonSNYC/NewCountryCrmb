'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Header() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUserEmail(user?.email ?? null)
    }
    getUser()
  }, [supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/auth/signin')
    router.refresh()
  }

  return (
    <header className="fixed top-0 right-0 left-64 bg-white border-b border-[#E8DFD8] z-10">
      <div className="px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-serif text-[#6B4423]">Welcome Back</h2>
          {userEmail && (
            <span className="text-sm text-[#A67C52]">{userEmail}</span>
          )}
        </div>
        <div className="flex items-center space-x-6">
          <button
            className="relative p-2 text-[#6B4423] hover:bg-[#FAF5F0] rounded-full"
            aria-label="Notifications"
          >
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#8B4513] rounded-full"></span>
            🔔
          </button>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-sm font-medium text-[#8B4513] hover:text-white hover:bg-[#8B4513] rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  )
}
