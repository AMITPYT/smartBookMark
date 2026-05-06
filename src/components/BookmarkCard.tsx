'use client'

import { ExternalLink, Calendar, Link as LinkIcon, Globe } from 'lucide-react'
import DeleteBookmarkDialog from './DeleteBookmarkDialog'
import EditBookmarkForm from './EditBookmarkForm'
import type { Database } from '@/types/database.types'

type Bookmark = Database['public']['Tables']['bookmarks']['Row']

interface BookmarkCardProps {
  bookmark: Bookmark
  onRefresh: () => void
}

export default function BookmarkCard({ bookmark, onRefresh }: BookmarkCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '')
    } catch {
      return url
    }
  }

  return (
    <div className="group relative bg-white border border-slate-200/60 rounded-2xl p-5 hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-200 transition-all duration-300 ease-out flex flex-col h-full">
      {/* Favicon / Icon Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors duration-300">
          <img 
            src={`https://www.google.com/s2/favicons?domain=${getDomain(bookmark.url)}&sz=64`}
            alt=""
            className="w-5 h-5 rounded-sm opacity-80 group-hover:opacity-100 transition-opacity"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).parentElement?.insertAdjacentHTML('beforeend', '<svg class="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>');
            }}
          />
        </div>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
          <EditBookmarkForm
            bookmark={bookmark}
            onSuccess={onRefresh}
          />
          <DeleteBookmarkDialog
            bookmarkId={bookmark.id}
            bookmarkTitle={bookmark.title}
            onSuccess={onRefresh}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1 mb-1 tracking-tight">
          {bookmark.title}
        </h3>
        
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">
          <Globe className="w-3 h-3" />
          <span className="truncate">{getDomain(bookmark.url)}</span>
        </div>

        {bookmark.description ? (
          <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-4">
            {bookmark.description}
          </p>
        ) : (
          <div className="flex-1" />
        )}

        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(bookmark.created_at)}</span>
          </div>
          
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200"
          >
            Visit
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  )
}
