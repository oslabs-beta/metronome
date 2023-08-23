// import path from "node:path";
// import process from "node:process";
import { defineConfig } from "vite";
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   open: "index.html",
  // },
  // root: "../frontend/src",
  // publicDir: "../frontend/public",
  // build: {
  //   outDir: "../frontend/dist"
  // },
  // resolve: {
  //   alias: { "/src": path.resolve(process.cwd(), "src") }
  // },
})
