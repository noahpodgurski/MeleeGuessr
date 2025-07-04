import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  assetsInclude: [/.*zip$/, /.*ttf$/, /.*otf$/],
  plugins: [solidPlugin(), tsConfigPaths()],
  resolve: {
    conditions: ["browser"],
  },
});
