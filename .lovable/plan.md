
# Scaffold Plan10 — Site Institucional

Adaptação do prompt original (React Router + Vercel + Resend) para o stack do Lovable: **TanStack Start** (rotas em `src/routes/`), rodando em Cloudflare Workers, com **Lovable Cloud + Lovable Emails** para envio de formulários. Todo o design system, copy, tom de voz, conteúdo das 12 páginas, regras LGPD, hub colors e o sistema do logo são preservados integralmente.

## Fase 1 — Estrutura completa com placeholders

Objetivo: ter as 12 rotas navegáveis, design system aplicado, header/footer/WhatsApp/cookies funcionais, formulários enviando e-mail, e cada página renderizando todas as seções na ordem correta com conteúdo placeholder claramente marcado.

### 1. Design system & fundação
- `src/styles.css`: tokens de marca (orange, blue, amber, ink, escala neutra, 5 hub colors) em oklch + utilitários para JetBrains Mono (`font-spec`).
- Importar Plus Jakarta Sans (300–800) e JetBrains Mono via `<link>` em `__root.tsx`.
- Type scale (display/h1/h2/h3/eyebrow/body/small/spec) como classes utilitárias.
- `Plan10Logo` SVG inline com props `variant`, `hubColor`, `light`, `size` — símbolo sempre laranja, "10" + descritivo recebem `hubColor`.

### 2. Layout & componentes compartilhados
- `__root.tsx` recebe Header fixo (com blur ao rolar), Outlet, Footer, `WhatsAppButton`, `CookieBanner`, HelmetProvider para SEO.
- `Header`: nav desktop com dot colorido por hub no hover, search expansível, botão WhatsApp pequeno, CTA "Fale Conosco". `MobileMenu` full-screen.
- `Footer`: 4 colunas, SUSEP em `font-spec`, links legais, créditos.
- UI base do zero (sem shadcn): Button, Card, Badge, Input, Select, Textarea, Accordion, Carousel (autoplay simples), Modal, CountdownTimer, Toggle.
- Comuns: `WhatsAppButton` (pulse), `RedirectPopup` (countdown 5s), `CookieBanner` (localStorage), `SEOMeta` (helmet wrapper), `SUSEPDisclaimer`.

### 3. Rotas TanStack (12)
Em `src/routes/`:
- `index.tsx` (Home), `quem-somos.tsx`, `fale-conosco.tsx`, `blog.tsx`
- `seguros.tsx`, `saude.tsx`, `consorcios.tsx`, `financas.tsx`, `servicos-24h.tsx`
- `privacidade.tsx`, `lgpd.tsx`, `termos.tsx`
- Cada rota define seu próprio `head()` com title/description/og conforme spec SEO.
- Verticais consomem `VerticalPageTemplate` parametrizado pelo `verticals.ts`.

### 4. Dados estáticos
- `src/data/verticals.ts`, `testimonials.ts`, `partners.ts`, `content.ts` exatamente como definido no prompt.

### 5. Home — 10 seções na ordem
HeroBanner → ProofNumbers → VerticalCards → WhyPlan10 → HowItWorks → Testimonials → Loja Virtual (tabs com RedirectPopup) → Partners → ContactForm → FAQ. Cada seção com copy e estrutura do prompt; placeholders marcados com `{/* PLACEHOLDER */}` ou `{/* TODO */}`.

### 6. Páginas verticais (template único)
Hero (cor do hub) → Banners rotativos → Toggle PF/PJ (Saúde e Seguros) → Products Grid placeholder → Free Services → How It Works → Testimonials filtrados → ContactForm pré-preenchido → FAQ → SUSEPDisclaimer. Conteúdo específico por vertical conforme prompt (Seguros, Saúde, Consórcio, Finanças, Serviços 24h).

### 7. Quem Somos, Fale Conosco, Blog
Estrutura conforme prompt, com placeholders para fotos da equipe e cards do blog (filtros por hub).

### 8. Páginas legais
Hero + bloco `max-w-3xl` com seções listadas e `{/* TODO: texto jurídico */}`.

### 9. Formulários (Lovable Emails)
- Habilitar Lovable Cloud + setup do email infra (queue, tabelas, cron).
- Template React Email `contact-form-confirmation` em `src/lib/email-templates/` (confirmação para o remetente) + template `contact-form-internal` (notificação para `contato@plan10.com.br`).
- Server route público `src/routes/api/contact.ts` (não autenticado): valida com zod, rate-limit por IP em memória, dispara os dois e-mails via fila transacional, **não persiste dados além do necessário** (LGPD).
- `useContactForm` (react-hook-form + zod): máscara `(00) 00000-0000`, validação real-time, checkbox LGPD obrigatório, mensagens inline (verde sucesso / vermelho erro), sem redirect.

### 10. LGPD & segurança
- CookieBanner com `localStorage.plan10_cookies`.
- Checkbox LGPD desmarcado por padrão em todos os formulários, link para `/privacidade`.
- Sem trackers; comentários `{/* TODO: pixel após consentimento */}` nos pontos de inserção.
- Headers de segurança via meta tags (X-Frame-Options não aplicável fora do servidor, mas Content-Security-Policy via meta + Referrer-Policy). Como roda em Cloudflare Workers e não Vercel, `vercel.json` é substituído por headers configurados na resposta do server route + nota no README explicando.

### 11. Critério da Fase 1 (build verde)
- `tsc --noEmit` sem erros.
- 12 rotas navegáveis.
- Header/Footer/WhatsApp/Cookies em todas as páginas.
- Formulário envia e-mail real (Lovable Emails).
- Hub colors aplicados corretamente em cada vertical, símbolo sempre laranja.
- Sem em dash (—) na UI visível.

---

## Fase 2 — Polimento (depois da sua aprovação da Fase 1)

- Animações Framer Motion (page transitions, reveals on scroll, count-up nos números).
- Microinterações de hover finalizadas (border accent expandindo nos cards, underline animado na nav).
- Carousels de banner com indicadores e pause-on-hover.
- Marquee dos depoimentos e parceiros com pausa no hover.
- Refinamento tipográfico, espaçamentos, sombras e dark surfaces.
- QA de copy contra as regras de tom de voz (sem urgência, sem caps lock).
- Acessibilidade: foco visível, aria-labels, contraste AA verificado.
- Otimização de SEO: JSON-LD Organization no root, sitemap, robots.

---

## Decisões técnicas que diferem do prompt original (e por quê)

| Pediu | Vou fazer | Motivo |
|---|---|---|
| React Router v6 (`src/pages/`) | TanStack Router (`src/routes/`) | Stack obrigatório do Lovable; mantém SSR e SEO nativos |
| Vercel serverless `api/contact.ts` | TanStack server route `src/routes/api/contact.ts` | Lovable deploya em Cloudflare Workers |
| Resend direto + `RESEND_API_KEY` | Lovable Emails (queue + React Email) | Built-in, sem setup de chaves; mesma capacidade |
| `vercel.json` com security headers | Headers no server route + meta tags | Não há Vercel no deploy |
| `react-helmet-async` | `head()` nativo do TanStack Router | API oficial do framework, sem dependência extra |

Tudo o mais (design system, hub colors, copy literal, ordem de seções, regra do símbolo sempre laranja, regras LGPD, tom de voz, placeholders marcados, JetBrains Mono só para spec) é preservado **exatamente** como no prompt.

Ao aprovar, começo pela Fase 1.
