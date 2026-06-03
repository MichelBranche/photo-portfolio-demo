import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Base relative cosi il sito funziona anche servito da una sottocartella.
export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    port: 5173,
  },
});
