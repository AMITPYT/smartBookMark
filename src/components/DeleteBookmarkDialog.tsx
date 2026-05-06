'use client'

import { useState } from 'react'
import { deleteBookmark } from '@/lib/actions/bookmarks'
import { Trash2, Loader2, X } from 'lucide-react'
import Modal from './Modal'

interface DeleteBookmarkDialogProps {
  bookmarkId: string
  bookmarkTitle: string
  onSuccess: () => void
}

export default function DeleteBookmarkDialog({
  bookmarkId,
  bookmarkTitle,
  onSuccess,
}: DeleteBookmarkDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    const result = await deleteBookmark(bookmarkId)

    if (result.success) {
      onSuccess()
      setIsOpen(false)
    }
    setIsDeleting(false)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-all"
        title="Delete bookmark"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="bg-white rounded-2xl shadow-2xl w-full">
          <div className="p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            
            <h3 className="text-lg font-semibold text-slate-900 text-center mb-2">
              Delete Bookmark?
            </h3>
            
            <p className="text-sm text-slate-600 text-center mb-6">
              Are you sure you want to delete{' '}
              <span className="font-medium text-slate-900">"{bookmarkTitle}"</span>? 
              This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setIsOpen(false)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
