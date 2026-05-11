import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { CookieBanner } from "@/components/common/CookieBanner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-extrabold text-orange">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Página não encontrada</h2>
        <p className="mt-2 text-sm text-neutral-700">
          A página que você procura não existe ou foi movida.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-hover"
        >
          Voltar para a Home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Esta página não carregou</h1>
        <p className="mt-2 text-sm text-neutral-700">Algo deu errado. Tente novamente ou volte para a Home.</p>
        <div className="mt-6 flex gap-2 justify-center">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-xl bg-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-hover"
          >
            Tentar novamente
          </button>
          <a href="/" className="rounded-xl border border-neutral-300 px-5 py-2.5 text-sm font-semibold">
            Voltar para a Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Plan10 | Seguros, Saúde, Consórcio e Finanças — Corretora Multimodal" },
      { name: "description", content: "Corretora multimodal credenciada pela SUSEP. Seguros, saúde, consórcio, finanças e serviços 24h em um só lugar." },
      { name: "author", content: "Plan10" },
      { property: "og:title", content: "Plan10 — Corretora Multimodal" },
      { property: "og:description", content: "Proteção, cuidados com a saúde e planejamento patrimonial em um só lugar." },
      { property: "og:type", content: "website" },
      { name: "referrer", content: "strict-origin-when-cross-origin" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main className="min-h-screen pt-0">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </QueryClientProvider>
  );
}
