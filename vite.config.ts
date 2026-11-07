import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
// Con `--mode tablet` (npm run dev:tablet) sirve por HTTPS con un certificado de prueba,
// para poder abrir la app desde otros dispositivos de la red (crypto.randomUUID exige HTTPS).
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), ...(mode === 'tablet' ? [basicSsl()] : [])],
}))
