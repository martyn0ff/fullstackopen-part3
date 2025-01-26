import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import URLUtil from "../../common/util/URLUtil.js";

const FRONTEND_URI = new URL(process.env.VITE_FRONTEND_SERVER_URI || "http://localhost:3001");

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: +URLUtil.getPort(FRONTEND_URI)
  },
  define: {
    "process.env": {}
  }
});
