import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    emptyOutDir: true,
    outDir: "./docs",
    target: "esnext",
    minify: true,
  },
  plugins: [tailwindcss()],
  base: "",
});
