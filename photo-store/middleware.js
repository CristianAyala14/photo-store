import { updateSession } from '@/utils/supabase/update_session'

export async function middleware(request) {
  return await updateSession(request)
}

// Opcional: limitar las rutas donde se aplica
export const config = {
  matcher: ["/dashboard/:path*", "/perfil/:path*"] // rutas protegidas
}