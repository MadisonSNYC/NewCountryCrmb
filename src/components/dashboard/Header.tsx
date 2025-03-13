import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/auth/signin')
    router.refresh()
  }

  return (
    <header className="bg-white border-b border-soft-gray">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-warm-brown">Dashboard</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleSignOut}
            className="text-warm-brown hover:text-barn-red"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  )
}
