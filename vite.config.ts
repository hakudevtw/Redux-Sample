import type { UserConfigExport, ConfigEnv } from "vite";
import react from "@vitejs/plugin-react";
import { viteMockServe } from "vite-plugin-mock";
// import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => ({
  plugins: [react(), tsconfigPaths(), viteMockServe({ localEnabled: command === "serve" })],
});
