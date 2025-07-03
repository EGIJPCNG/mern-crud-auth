import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  tailwindcss(),
  ],
    // ...existing code...
    // server: {
    //   allowedHosts: [
    //     'n61f5m-ip-190-73-49-58.tunnelmole.net'
    //   ],
    //   hmr: {
    //     host: 'n61f5m-ip-190-73-49-58.tunnelmole.net',
    //     protocol: 'wss'
    //   }
    // }
  // ...existing code...
})
