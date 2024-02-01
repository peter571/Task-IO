import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      app: `${path.resolve(__dirname, "./src/app/")}`,
      components: `${path.resolve(__dirname, "./src/components/")}`,
      assets: `${path.resolve(__dirname, "./src/assets/")}`,
      context: `${path.resolve(__dirname, "./src/context/")}`,
      features: `${path.resolve(__dirname, "./src/features/")}`,
      firebaseapp: `${path.resolve(__dirname, "./src/firebase/")}`,
      hooks: `${path.resolve(__dirname, "./src/hooks/")}`,
      socket: `${path.resolve(__dirname, "./src/socket/")}`,
      utils: `${path.resolve(__dirname, "./src/utils/")}`,
      types: `${path.resolve(__dirname, "./src/types/")}`
    },
  },
});
