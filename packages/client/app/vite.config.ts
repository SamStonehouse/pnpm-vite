import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { checker } from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  // envDir: '../../../env/browser',
  // envPrefix: 'pnpm-vite_',
  root: "./standalone",
  plugins: [
    react(),
    checker({
      // e.g. use TypeScript check
      // typescript: {
      //   root: '.',
      //   tsconfigPath: './tsconfig.json',
      // },
      typescript: true,
    }),
  ],
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
});
