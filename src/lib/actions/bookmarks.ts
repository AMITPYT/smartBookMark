'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addBookmark(formData: FormData) {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in to add bookmarks' }
  }

  const title = formData.get('title') as string
  const url = formData.get('url') as string
  const description = formData.get('description') as string

  // Validation
  if (!title || !url) {
    return { error: 'Title and URL are required' }
  }

  // URL validation
  try {
    new URL(url)
  } catch {
    return { error: 'Please enter a valid URL' }
  }

  const { error } = await supabase
    .from('bookmarks')
    .insert({
      user_id: user.id,
      title: title.trim(),
      url: url.trim(),
      description: description?.trim() || null,
    } as any)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function deleteBookmark(bookmarkId: string) {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in to delete bookmarks' }
  }

  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('id', bookmarkId)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function updateBookmark(bookmarkId: string, formData: FormData) {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in to update bookmarks' }
  }

  const title = formData.get('title') as string
  const url = formData.get('url') as string
  const description = formData.get('description') as string

  // Validation
  if (!title || !url) {
    return { error: 'Title and URL are required' }
  }

  // URL validation
  try {
    new URL(url)
  } catch {
    return { error: 'Please enter a valid URL' }
  }

  const { error } = await supabase
    .from('bookmarks')
    .update({
      title: title.trim(),
      url: url.trim(),
      description: description?.trim() || null,
      updated_at: new Date().toISOString(),
    } as any)
    .eq('id', bookmarkId)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  return { success: true }
}
