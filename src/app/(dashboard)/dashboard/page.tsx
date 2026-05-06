import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/lib/actions/auth'
import DashboardContent from '@/components/DashboardContent'
import { LogOut, Bookmark } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - SmartBookmarks',
  description: 'Manage your bookmarks',
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null // Middleware will redirect
  }

  // Fetch initial bookmarks
  const { data: bookmarks, error } = await supabase
    .from('bookmarks')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching bookmarks:', error)
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] selection:bg-blue-100 selection:text-blue-900">
      {/* Premium Header with Glassmorphism */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            <div className="flex items-center gap-3.5 group cursor-default">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative flex items-center justify-center w-11 h-11 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/20">
                  <Bookmark className="w-5.5 h-5.5 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight">
                  SmartBookmarks
                </h1>
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest leading-none mt-0.5">
                  Premium Edition
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-3 pl-4 pr-1.5 py-1.5 bg-slate-100/50 border border-slate-200/50 rounded-full">
                <span className="text-sm font-semibold text-slate-700">
                  {user.user_metadata?.full_name || user.email?.split('@')[0]}
                </span>
                {user.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt={user.user_metadata?.full_name || 'User'}
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 flex items-center justify-center border-2 border-white shadow-sm">
                    <span className="text-xs font-bold text-blue-700">
                      {(user.user_metadata?.full_name || user.email || 'U')[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              <form action={signOut}>
                <button
                  type="submit"
                  className="group flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 font-medium text-sm"
                >
                  <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                  <span>Sign Out</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            My Collection
          </h2>
          <p className="text-slate-500 font-medium">
            Manage and organize your essential web resources.
          </p>
        </div>
        
        <DashboardContent initialBookmarks={bookmarks || []} />
      </main>
    </div>
  )
}
