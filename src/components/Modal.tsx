'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

export default function Modal({ children, isOpen, onClose }: ModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!mounted || !isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      {/* Content */}
      <div className="relative w-full max-w-md animate-in zoom-in-95 duration-200">
        {children}
      </div>
    </div>,
    document.body
  )
}
