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
import { VerticalTabBar } from "@/components/layout/VerticalTabBar";
import { MobileVerticalStrip } from "@/components/layout/MobileVerticalStrip";
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
      { title: "Plan10, Corretora Multimodal" },
      { name: "description", content: "Seguros, saúde, consórcio, finanças e serviços 24h em um só lugar." },
      { name: "author", content: "Plan10" },
      { property: "og:site_name", content: "Plan10" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Plan10, Corretora Multimodal" },
      { property: "og:description", content: "Seguros, saúde, consórcio, finanças e serviços 24h em um só lugar." },
      { name: "referrer", content: "strict-origin-when-cross-origin" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Plan10, Corretora Multimodal" },
      { name: "twitter:description", content: "Seguros, saúde, consórcio, finanças e serviços 24h em um só lugar." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4b82903b-675f-4b87-8df0-0e2e01048669/id-preview-f8148893--689f256d-9728-46c0-af33-cb23a0f95002.lovable.app-1778596887323.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4b82903b-675f-4b87-8df0-0e2e01048669/id-preview-f8148893--689f256d-9728-46c0-af33-cb23a0f95002.lovable.app-1778596887323.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Plan10",
          url: "https://institucional-plan10.lovable.app",
          description: "Corretora multimodal credenciada. Seguros, saúde, consórcio, finanças e serviços 24h.",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Plan10",
          url: "https://institucional-plan10.lovable.app",
        }),
      },
    ],
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,opsz,wght@0,6..30,300;0,6..30,400;0,6..30,500;0,6..30,600;0,6..30,700;0,6..30,800;1,6..30,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
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
      <MobileVerticalStrip />
      <main className="min-h-screen pt-0 vertical-page-main">
        <Outlet />
      </main>
      <VerticalTabBar />
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </QueryClientProvider>
  );
}
