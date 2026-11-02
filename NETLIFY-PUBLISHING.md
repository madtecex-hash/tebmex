# 🚀 GUÍA ÚNICA PARA PUBLICAR EN NETLIFY
## Actualizada y corregida — sigue estos pasos en orden

---

## ⚠️ ANTES DE EMPEZAR: LO QUE NECESITAS

Tu tienda necesita **2 cosas** para funcionar en internet:

1. **Compilarse en Netlify** (Netlify lo hace solo si conectas tu repositorio Git)
2. **Una base de datos en la nube** (Neon o Supabase — gratis) porque Netlify no puede usar la base de datos de tu computadora

---

## PASO 1 — Crear la base de datos en la nube (Neon, 5 minutos, gratis)

1. Entra a **https://neon.tech** y crea una cuenta (puedes usar tu cuenta de Google o GitHub)
2. Crea un proyecto nuevo (el nombre no importa, ej: `tienda`)
3. Cuando termine, Neon te muestra una **"Connection string"** que se ve así:
   ```
   postgresql://neondb_owner:AbCdEf12@ep-nombre-abc123.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
4. **Cópiala y guárdala** — la necesitas en el Paso 3. 📋

> ¿Por qué Neon? Es gratis, no expira, y funciona perfecto con Next.js.
> Alternativa: Supabase (https://supabase.com) — mismo proceso, la conexión está en *Settings → Database → Connection string → URI*.

---

## PASO 2 — Subir tu proyecto a GitHub

> ⚠️ Importante: sube SOLO la carpeta `web` (el proyecto). Los archivos `.env`, `.pgdata` y `node_modules` están excluidos automáticamente gracias al `.gitignore` que ya está configurado.

1. Entra a **https://github.com/new** y crea un repositorio nuevo:
   - Nombre: `tienda-web` (o el que quieras)
   - Visibilidad: **Private** (recomendado)
   - NO marques "Add a README"
2. Abre **PowerShell** en tu computadora y ejecuta **una línea a la vez**:
   ```powershell
   cd "C:\Users\user\Documents\Default Project\web"
   git init
   git add .
   git commit -m "Tienda lista para Netlify"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/tienda-web.git
   git push -u origin main
   ```
   (Reemplaza `TU-USUARIO` con tu usuario de GitHub. GitHub te pedirá iniciar sesión la primera vez.)

---

## PASO 3 — Conectar el repositorio con Netlify

1. Entra a **https://app.netlify.com**
2. Clic en **"Add new site" → "Import an existing project"**
3. Elige **"Deploy with GitHub"** y autoriza el acceso
4. Selecciona el repositorio `tienda-web`
5. Netlify detecta que es Next.js **y llena la configuración solo**. Verifica que quede así:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   (Esto también está en el archivo `netlify.toml`, no tienes que cambiar nada)
6. **ANTES de pulsar Deploy**, baja hasta **"Advanced deploy settings" → "Add environment variables"** y agrega estas 4 variables:

   | Key | Value |
   |---|---|
   | `DATABASE_URL` | *(la connection string de Neon del Paso 1)* |
   | `ADMIN_USERNAME` | `Daniel` |
   | `ADMIN_PASSWORD` | `Administrador@` |
   | `NODE_VERSION` | `22` |

7. Pulsa **"Deploy site"** y espera 2–4 minutos ☕

---

## PASO 4 — Verificar que funciona

Cuando Netlify diga **"Your site is live"**, prueba:

1. **Página principal:** `https://TU-SITIO.netlify.app` → deben aparecer los 12 productos automáticamente (tu código los crea solos la primera vez)
2. **Panel admin:** `https://TU-SITIO.netlify.app/admin`
   - Usuario: `Daniel`
   - Contraseña: `Administrador@`
3. **Pedidos:** agrega un producto al carrito y envía un pedido de prueba → revísalo en el panel admin

---

## ❓ SOLUCIÓN DE ERRORES

### "Page not found" (404)
- Causa: subiste archivos arrastrándolos a Netlify en vez de conectar Git, o había un redirect antiguo en `netlify.toml` (**ya corregido**).
- Solución: borra el sitio en Netlify (*Site settings → General → Delete site*) y repite el Paso 3 conectando el repositorio de GitHub.

### "Build failed"
- Revisa *Deploys → el deploy fallido → ver logs*.
- Lo más común: falta la variable `DATABASE_URL` (Paso 3.6).

### "500 Internal Server Error" o la página carga sin productos
- Causa: la variable `DATABASE_URL` es incorrecta o expiró.
- Solución: copia de nuevo la connection string de Neon (asegúrate de incluir `?sslmode=require`) y guárdala en *Site configuration → Environment variables*. Luego *Deploys → Trigger deploy → Clear cache and deploy site*.

### Los productos se ven pero sin fotos
- Normal si las imágenes no están en `public/products/final/` — tú dijiste que te encargas de las imágenes. Súbelas desde el panel admin (Galería) y se guardan en la base de datos en la nube, así funcionan en internet.

---

## 📌 NOTAS IMPORTANTES

- **Tu código NO fue modificado.** Solo se corrigieron archivos de configuración (`netlify.toml`, `next.config.ts`, `.gitignore`) y se creó `scripts/db-only.mjs` (para encender solo la base de datos local cuando necesites compilar).
- **La base de datos en la nube arranca vacía pero se llena sola:** tu código crea las tablas e inserta los 12 productos y banners automáticamente la primera vez que alguien entra.
- **Los pedidos y las fotos que subas desde el panel admin se guardan en la base de datos en la nube** — seguros y disponibles para todos.
- **Cada vez que quieras actualizar el sitio**, solo haz `git add . && git commit -m "cambios" && git push` y Netlify lo publica automáticamente.
- **500+ usuarios simultáneos:** Netlify sirve el sitio por CDN global, así que el soporta sin problema. Los pedidos van a la base de datos de Neon (el plan gratis aguanta tu operación inicial con holgura).
