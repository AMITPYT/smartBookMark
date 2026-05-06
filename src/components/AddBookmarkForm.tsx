'use client'

import { useState } from 'react'
import { addBookmark } from '@/lib/actions/bookmarks'
import { X, Plus, Loader2 } from 'lucide-react'
import Modal from './Modal'

interface AddBookmarkFormProps {
  onSuccess: () => void
}

export default function AddBookmarkForm({ onSuccess }: AddBookmarkFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const result = await addBookmark(formData)

    if (result.error) {
      setError(result.error)
      setIsSubmitting(false)
    } else {
      onSuccess()
      setIsOpen(false)
      setIsSubmitting(false)
      ;(e.target as HTMLFormElement).reset()
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Plus className="w-5 h-5" />
        Add Bookmark
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="bg-white rounded-2xl shadow-2xl w-full">
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">Add Bookmark</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title_add"
                name="title"
                required
                placeholder="My Favorite Website"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900"
              />
            </div>

            <div>
              <label htmlFor="url" className="block text-sm font-medium text-slate-700 mb-2">
                URL *
              </label>
              <input
                type="url"
                id="url_add"
                name="url"
                required
                placeholder="https://example.com"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
                Description <span className="text-slate-400">(optional)</span>
              </label>
              <textarea
                id="description_add"
                name="description"
                rows={3}
                placeholder="A brief description..."
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-slate-900"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Add Bookmark'
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}
