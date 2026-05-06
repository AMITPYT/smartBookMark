'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function signInWithGoogle() {
  const supabase = await createClient()
  const headerList = await headers()
  const host = headerList.get('host')
  const protocol = host?.includes('localhost') ? 'http' : 'https'
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${protocol}://${host}/callback`,
    },
  })

  if (error) {
    redirect('/error?message=Could not authenticate with Google')
  }

  if (data.url) {
    redirect(data.url)
  }
}

export async function signOut() {
  const supabase = await createClient()
  
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    redirect('/error?message=Could not sign out')
  }

  redirect('/')
}
