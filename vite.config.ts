import type { UserConfigExport, ConfigEnv } from "vite";
import react from "@vitejs/plugin-react";
import { viteMockServe } from "vite-plugin-mock";
import path from "path";

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => ({
  plugins: [react(), viteMockServe({ localEnabled: command === "serve" })],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src/") },
  },
});
