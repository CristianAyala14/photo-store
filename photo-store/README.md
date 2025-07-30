https://www.youtube.com/watch?v=21gOL_PIfAA&list=PLhVyf4SAdAugrkT3dLuVeHkxMNlLEcIOP


proyecto orientado a entender la autenticacion de supabase. En la practica, en authForm se usa el metodo de autenticacion
"Normal" estilo email, contraseña, pero dejo por sentado informacion sobre el metodo passwordless. Ademas mas abajo
explico que sucede luego de la autenticacion.


// MÉTODO PASSWORDLESS (sin contraseña):
  //
  // Este método utiliza el envío de un "magic link" al correo del usuario y no requiere contraseña.
  // Por eso, no se usa `signUp`, ya que `signInWithOtp` sirve tanto para registrar como para iniciar sesión.
  //
  // ➤ Requiere que configures una ruta en tu backend, por ejemplo: `/api/auth/confirm/route.js`.
  // En esa ruta, debes:
  //
  //  1. Crear el cliente de Supabase con `createServerClient`.
  //  2. Leer las cookies de la solicitud.
  //  3. Usar `verifyOtp()` para validar el token que viene en el link del correo.
  //     Este token es temporal y solo sirve para verificar que el usuario hizo clic en el enlace.
  //  4. Si la verificación es exitosa, se guarda la sesión en una cookie (mediante Supabase).
  //  5. Finalmente, rediriges al usuario a la página que quieras (por ejemplo, `/dashboard`).
  //
  // Ejemplo de uso en cliente:
  // ```js
  // const { data, error } = await supabase.auth.signInWithOtp({ email });
  // ```
  //
  // ⚠️ Importante: el link que se envía al correo debe tener como parámetro de redirección
  // una URL válida y debe estar configurado en Supabase (en `Authentication > URL Configuration`).
  //
  // ✅ Ventajas:
  // - No requiere contraseña.
  // - El mismo flujo sirve para login o registro.
  // - Más simple para el usuario.
  //
  // 🚫 No es compatible directamente con `signUp`, porque `signUp` requiere contraseña.

    // async function handleSignIn(e) {
    //   e.preventDefault();
    //   const { data, error } = await supabase.auth.signInWithOtp({
    //     email,
    // 
    //   })
    //     if(!error) {
    //     setIsSigningIn(true);
    //   }
    //   console.log({data, error});
    // }


  
    // 🔐 AUTENTICACIÓN EN NEXT.JS (App Router con Supabase).
    // Una vez que el usuario inicia sesión (ya sea con contraseña o con OTP/passwordless),
    // Supabase guarda la sesión, lo que significa que entrega un `access_token` (JWT) y un `refresh_token`.
    //
    // Esto lo hace así:
    // - En el CLIENTE (navegador): guarda los tokens en `localStorage`.
    // - En el SERVER (SSR con Next.js): trabaja con COOKIES httpOnly (manejadas automáticamente por Supabase).
    //
    // Desde ese momento, podés acceder a la sesión activa del usuario de dos formas:
    //
    // 🧠 1. EN COMPONENTES SERVER (Next.js App Router):
    //    Usás `createServerClient()` de `@supabase/ssr`, que lee automáticamente las cookies del request.
    //    Ejemplo:
    //      const supabase = createServerClient()
    //      const { data: { session } } = await supabase.auth.getSession()
    //
    // 🧠 2. EN COMPONENTES CLIENTE (React):
    //    Usás `createClient()` para inicializar Supabase y acceder al estado actual de la sesión:
    //      const supabase = createClient()
    //      const { data: { session } } = await supabase.auth.getSession()
    //
    // ⚠️ Importante:
    // - En el CLIENTE, Supabase puede renovar automáticamente el `access_token` usando el `refresh_token`.
    // - En el SERVER, eso no ocurre automáticamente: si el token expiró, tenés que manejar la renovación manualmente si querés.
    //
    // ✅ No importa si el usuario se autenticó por OTP o contraseña: una vez autenticado, el acceso a la sesión funciona igual.
    //

