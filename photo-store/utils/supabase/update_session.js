import { NextResponse } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers/nextjs'

export async function updateSession(request) {
  const response = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res: response })

  // Intenta recuperar la sesión. Si el access token expiró,
  // esto usa automáticamente el refresh token para renovarla.
  await supabase.auth.getSession()

  return response
}