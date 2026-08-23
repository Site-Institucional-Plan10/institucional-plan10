import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { blogArticles } from "@/data/blogArticles";
import { solutions } from "@/data/solutions";
import { SITE_URL } from "@/lib/seo";

const BASE_URL = SITE_URL;

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticEntries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/quem-somos", changefreq: "monthly", priority: "0.8" },
          { path: "/solucoes", changefreq: "weekly", priority: "0.9" },
          { path: "/blog", changefreq: "weekly", priority: "0.7" },
          { path: "/fale-conosco", changefreq: "monthly", priority: "0.6" },
          { path: "/privacidade", changefreq: "yearly", priority: "0.3" },
          { path: "/lgpd", changefreq: "yearly", priority: "0.3" },
          { path: "/termos", changefreq: "yearly", priority: "0.3" },
        ];

        // Catálogo: soluções, caminhos e núcleos (as páginas de conteúdo real).
        const catalogEntries: SitemapEntry[] = [];
        for (const s of solutions) {
          catalogEntries.push({ path: `/solucoes/${s.slug}`, changefreq: "monthly", priority: "0.8" });
          for (const c of s.categorias) {
            if (c.nucleos.length === 0) continue;
            catalogEntries.push({ path: `/solucoes/${s.slug}/${c.slug}`, changefreq: "monthly", priority: "0.7" });
            for (const n of c.nucleos) {
              catalogEntries.push({ path: `/solucoes/${s.slug}/${c.slug}/${n.slug}`, changefreq: "monthly", priority: "0.6" });
            }
          }
        }

        const blogEntries: SitemapEntry[] = blogArticles.map((a) => ({
          path: `/blog/${a.slug}`,
          changefreq: "monthly",
          priority: "0.6",
        }));

        const entries = [...staticEntries, ...catalogEntries, ...blogEntries];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
