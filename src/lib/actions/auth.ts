'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function signInWithGoogle() {
  const supabase = await createClient()
  
  // Use the SITE_URL from env or fallback to headers
  let siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  
  if (!siteUrl) {
    const headerList = await headers()
    const host = headerList.get('host')
    const protocol = host?.includes('localhost') ? 'http' : 'https'
    siteUrl = `${protocol}://${host}`
  }

  // Ensure there's no trailing slash
  siteUrl = siteUrl.replace(/\/$/, '')
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${siteUrl}/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })

  if (error) {
    console.error('OAuth Error:', error)
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
