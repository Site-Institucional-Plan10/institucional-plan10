// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    css: {
      transformer: "lightningcss",
      lightningcss: {
        drafts: {
          customMedia: true,
        },
      },
    },
    plugins: [
      {
        name: "strip-google-fonts-import",
        enforce: "pre" as const,
        load(id: string) {
          if (id.endsWith("styles.css")) {
            const fs = require("fs") as typeof import("fs");
            const content = fs.readFileSync(id, "utf-8");
            return content.replace(
              /@import\s+(?:url\()?["]https:\/\/fonts\.googleapis\.com[^"]*["]\)?;?\n?/g,
              "",
            );
          }
          return null;
        },
      },
    ],
  },
});
