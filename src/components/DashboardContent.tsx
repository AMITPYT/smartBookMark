'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import AddBookmarkForm from './AddBookmarkForm'
import SearchBar from './SearchBar'
import BookmarkCard from './BookmarkCard'
import { Loader2, Bookmark as BookmarkIcon, SearchX } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Database } from '@/types/database.types'

type Bookmark = Database['public']['Tables']['bookmarks']['Row']

interface DashboardContentProps {
  initialBookmarks: Bookmark[]
}

export default function DashboardContent({ initialBookmarks }: DashboardContentProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Set up real-time subscription
  useEffect(() => {
    const supabase = createClient()

    const channel = supabase
      .channel('bookmarks-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookmarks',
        },
        async () => {
          const { data, error } = await supabase
            .from('bookmarks')
            .select('*')
            .order('created_at', { ascending: false })

          if (!error && data) {
            setBookmarks(data)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const handleRefresh = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('bookmarks')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setBookmarks(data)
    }
  }

  // Filter bookmarks based on search query
  const filteredBookmarks = bookmarks.filter((bookmark) => {
    const query = searchQuery.toLowerCase()
    return (
      bookmark.title.toLowerCase().includes(query) ||
      bookmark.url.toLowerCase().includes(query) ||
      (bookmark.description && bookmark.description.toLowerCase().includes(query))
    )
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="space-y-8">
      {/* Search and Action Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-2 rounded-2xl shadow-sm border border-slate-200/60">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <div className="w-px h-8 bg-slate-200 hidden md:block" />
        <AddBookmarkForm onSuccess={handleRefresh} />
      </div>

      {/* Loading State */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-24 gap-4"
          >
            <div className="relative">
              <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <BookmarkIcon className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <p className="text-slate-500 font-medium animate-pulse">Syncing your vault...</p>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial="hidden"
            animate="show"
            variants={container}
          >
            {filteredBookmarks.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-3xl border-2 border-dashed border-slate-200"
              >
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-slate-50/50">
                  {searchQuery ? (
                    <SearchX className="w-10 h-10 text-slate-400" />
                  ) : (
                    <BookmarkIcon className="w-10 h-10 text-slate-400" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {searchQuery ? 'No matching bookmarks' : 'Start your collection'}
                </h3>
                <p className="text-slate-500 text-center max-w-sm mb-8 leading-relaxed">
                  {searchQuery
                    ? `We couldn't find anything matching "${searchQuery}". Try different keywords.`
                    : 'Your bookmark vault is currently empty. Add your first favorite link to get started!'}
                </p>
                {!searchQuery && (
                  <div className="transform scale-110">
                    <AddBookmarkForm onSuccess={handleRefresh} />
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBookmarks.map((bookmark) => (
                  <motion.div key={bookmark.id} variants={item}>
                    <BookmarkCard
                      bookmark={bookmark}
                      onRefresh={handleRefresh}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Info */}
      {!isLoading && searchQuery && filteredBookmarks.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center gap-2 text-sm font-medium text-slate-400 pt-4"
        >
          <div className="h-px w-12 bg-slate-200" />
          <span>Found {filteredBookmarks.length} result{filteredBookmarks.length !== 1 ? 's' : ''}</span>
          <div className="h-px w-12 bg-slate-200" />
        </motion.div>
      )}
    </div>
  )
}
