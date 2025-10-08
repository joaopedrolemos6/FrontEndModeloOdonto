import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// O import do 'lovable-tagger' pode ser removido, mas não é estritamente necessário.

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  // CORREÇÃO APLICADA AQUI:
  // Removemos o plugin 'componentTagger' que estava causando os avisos no console.
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));