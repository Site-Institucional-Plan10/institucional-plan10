# Plan10 institucional, guia de instalação e publicação

Documento de transferência do site institucional da Plan10. Escrito para quem
vai instalar, construir e publicar o projeto sem ter participado do
desenvolvimento.

Data desta versão: 11 de outubro de 2026.

---

## 1. Ambiente

| Item | Valor |
|---|---|
| Node | 24.16.0 (testado). Mínimo recomendado: 20.19 |
| Gerenciador de pacotes | npm 11.13.0, com `package-lock.json` versionado |
| Linguagem | TypeScript 5, módulos ESM (`"type": "module"`) |
| Framework | TanStack Start (SSR) sobre Vite 7 e React 19 |
| Estilo | Tailwind 4 mais CSS próprio em `src/styles.css` |
| Servidor | Nitro 3 beta, preset `cloudflare-module` |

O projeto não declara `engines` nem `packageManager`. Use npm e o lockfile que
acompanha o pacote; trocar por pnpm ou yarn muda a árvore de dependências e já
quebrou build neste projeto.

## 2. Comandos

```bash
npm ci                 # instalação limpa, respeita o package-lock.json
npm run dev            # desenvolvimento, porta 3000 por padrão
npm run dev -- --port 8080
npm run build          # build de produção
npm run preview        # pré-visualização local do build
npm run lint           # ESLint
npm run format         # Prettier em todo o projeto
```

Verificação de tipos: `npx tsc --noEmit`.

## 3. Saída de build

`npm run build` grava em `.output/`:

```
.output/
  public/        arquivos estáticos (46 MB, a maior parte são fotos .webp)
  server/
    index.mjs    entrada do servidor
  nitro.json
```

O preset do Nitro é `cloudflare-module`, então o build também gera
`.wrangler/deploy/config.json` e `.output/server/wrangler.json`.

**Isto é SSR, não site estático.** Publicar apenas `.output/public` entrega um
HTML vazio: o conteúdo das páginas é montado no servidor.

## 4. Publicação

### Como está hoje

O site é publicado na **Vercel**, com deploy automático a cada push na `main`
do repositório `Site-Institucional-Plan10/institucional-plan10`. Endereço de
revisão: `https://institucional-plan10.vercel.app`.

Não há comando manual no fluxo normal. O push publica.

### Aviso sobre o `vercel.json`

O `vercel.json` do repositório declara `buildCommand`, `outputDirectory: "dist"`,
`framework: "vite"` e um `rewrites` de `/(.*)` para `/index.html`. **Essas
quatro chaves não correspondem ao que o projeto produz** e não estão sendo
aplicadas: o build não gera `dist/`, e um rewrite para `index.html` desligaria
a renderização no servidor, que comprovadamente funciona em produção. A Vercel
detecta o framework por conta própria e usa a saída do Nitro.

As outras duas seções **são aplicadas e o site depende delas**:

- `redirects`: os 11 redirecionamentos de rotas antigas, todos `301`.
- `headers`: `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection` e
  `Referrer-Policy` em todas as rotas.

Ao mexer no `vercel.json`, preserve `redirects` e `headers`. Limpar as quatro
chaves inconsistentes é seguro e recomendado, mas é mudança de infraestrutura e
pede um deploy de teste antes.

### Cloudflare Workers

O preset do Nitro é da Cloudflare e o build gera configuração de Worker. Houve
um deploy temporário em Workers antes da Vercel. Hoje esse caminho **não está
em uso** e o `wrangler deploy` local falha no wrapper
`@lovable.dev/vite-tanstack-config`. Se a Cloudflare voltar a ser o destino,
resolva o build num worker de teste antes de publicar sobre o que está no ar.

## 5. Variáveis de ambiente

Nenhuma delas tem valor neste pacote. Todas são configuradas no painel do
provedor de hospedagem.

| Nome | Onde roda | Para que serve | Sem ela |
|---|---|---|---|
| `RESEND_API_KEY` | servidor | chave da API do Resend, que envia o e-mail do formulário | o formulário aceita o envio e não dispara e-mail |
| `LEAD_FROM_EMAIL` | servidor | remetente do e-mail de lead. Precisa ser de um domínio verificado no Resend | o envio é recusado pelo Resend |
| `LEAD_TO_EMAIL` | servidor | destinatários do lead, separados por vírgula | cai no padrão `contato@plan10.com.br, contato@plan10.email-bot.chat` |
| `MEGAZAP_TOKEN` | servidor | token da API do Megazap | a integração fica dormente e o lead segue só por e-mail |
| `MEGAZAP_CHANNEL_ID` | servidor | canal de destino no Megazap | idem |
| `MEGAZAP_CHANNEL_TYPE` | servidor | tipo do canal no Megazap | idem |
| `VITE_GA_ID` | navegador | identificador do Google Analytics 4 | o script de medição não é carregado |

`VITE_GA_ID` tem prefixo `VITE_` e por isso vai para o pacote do navegador. As
demais são de servidor e nunca devem ganhar esse prefixo.

## 6. Integrações externas

| Serviço | Uso | Endereço |
|---|---|---|
| Resend | envio do e-mail de lead | `api.resend.com` |
| Megazap | abertura de atendimento a partir do lead | `api.mzworkspace.com` |
| WhatsApp | botões de conversa | `wa.me`, `api.whatsapp.com` |
| Google Analytics 4 | medição, desligada enquanto `VITE_GA_ID` estiver vazia | `googletagmanager.com` |
| Porto Seguro | contratação online de 36 soluções | `porto.vc`, com o código de corretor da Plan10 |

Formulário: `POST /api/contact`, implementado em `src/routes/api/contact.ts`.
Ele envia o lead por e-mail e, quando o Megazap estiver configurado, também
para lá. O canal de e-mail do Megazap (`contato@plan10.email-bot.chat`) abre
atendimento a partir de mensagem recebida, então ele funciona pelo mesmo envio
de e-mail, sem API.

## 7. Domínios

| Domínio | Situação |
|---|---|
| `institucional-plan10.vercel.app` | endereço de revisão, no ar |
| `plan10.com.br` | ainda aponta para o site anterior. A virada acontece depois da aprovação |

`src/lib/seo.ts` define `SITE_URL` como `https://plan10.com.br`, e é dele que
saem os `canonical` e o `sitemap.xml`. Isso é proposital: os endereços
canônicos já apontam para o domínio final.

## 8. Rotas

### Estrutura

| Nível | Padrão | Quantidade |
|---|---|---|
| Vertical | `/solucoes/<vertical>` | 5 |
| Modalidade | `/solucoes/<vertical>/<modalidade>` | 33 |
| Caminho | `/solucoes/<vertical>/<modalidade>/<caminho>` | 104 |
| Soluções no catálogo | âncora `#<id>` dentro do caminho | 397 |

Mais home, quem somos, blog, mobilidade, soluções online, em um clique,
fale conosco e as três páginas legais. O `sitemap.xml` é gerado em
`src/routes/sitemap[.]xml.ts` e lista 296 endereços.

### Link profundo

O formato é `?abrir=<modalidade>/<caminho>#<id-da-solução>` na página da
vertical. O servidor já entrega a sanfona aberta, então o link funciona antes
de o JavaScript rodar.

Quatro pontos do site montam esse endereço, todos a partir de `rota` em
`src/lib/verticais.ts`: o mega menu, a descoberta da Home, a busca do
cabeçalho e o painel de favoritos. Mexer no formato do endereço é mexer num
lugar só.

**Atenção ao identificador da solução.** O `id` do produto no catálogo não é
único: sete deles se repetem entre caminhos da mesma vertical. Nas páginas que
mostram vários caminhos, o `id` do elemento é prefixado pelo caminho
(`<caminho>--<id>`) e o `id` do produto vive em `data-solucao`. O hash do
endereço continua sendo o `id` do produto, e quem o procura busca dentro do
caminho que o `abrir` nomeia, nunca com `getElementById` na página inteira.

Exemplos reais:

```
/solucoes/protecao?abrir=veiculos-e-frotas%2Fautomoveis#seguro-automovel
/solucoes/protecao?abrir=agronegocio-e-campo%2Fagronegocio#seguro-agricola-empresarial
/solucoes/crescimento?abrir=veiculos-e-frotas%2Fautomoveis#consorcio-automovel
```

A página do caminho aceita a âncora sozinha e abre a mesma solução:

```
/solucoes/protecao/agronegocio-e-campo/agronegocio#seguro-agricola-empresarial
```

### Redirecionamentos

Onze rotas antigas, todas `301`, declaradas em `vercel.json`. Nenhuma delas
aponta para outra origem de redirecionamento, então não há cadeia.

| Antiga | Canônica |
|---|---|
| `/saude` | `/solucoes/saude` |
| `/seguros` | `/solucoes/protecao` |
| `/financas` | `/solucoes/financeiras` |
| `/consorcios` | `/solucoes/crescimento` |
| `/consorcio` | `/solucoes/crescimento` |
| `/servicos-24h` | `/solucoes/assistencia` |
| `/servicos` | `/solucoes/assistencia` |
| `/seguros/empresarial` | `/solucoes/protecao` |
| `/seguros/automovel` | `/solucoes/protecao?abrir=veiculos-e-frotas%2Fautomoveis` |
| `/seguros/residencial` | `/solucoes/protecao?abrir=patrimonio-e-alto-valor%2Fimovel-residencial` |
| `/seguros/vida` | `/solucoes/protecao?abrir=vida%2Fvida` |

Nenhuma rota foi removida nesta revisão. Os 296 endereços do sitemap continuam
respondendo 200, com título, descrição, H1 e canônico próprios.

## 9. Verificações executadas

Medidas em 11 de outubro de 2026, sobre o build de produção servido localmente.

| Verificação | Resultado |
|---|---|
| `npx tsc --noEmit` | sem erro |
| `npm run build` | sem erro |
| 296 rotas do sitemap | todas 200 |
| Modal no fluxo de soluções | nenhum em nenhuma rota |
| Título, descrição, H1 e canônico próprios | 296 de 296 |
| Canônico apontando para a própria URL | 296 de 296 |
| `noindex` indevido | nenhum |
| Soluções no HTML inicial | 794 ocorrências em 137 páginas, nenhuma página vazia |
| Imagens com largura e altura declaradas | 100%, e todo arquivo existe no build |
| Leiaute em 360, 390, 414, 768, 1024 e 1440 px | sem rolagem horizontal em nenhuma combinação |
| Cabeçalho em 18 larguras, de 360 a 1920 px | nenhum elemento ultrapassa a janela; acesso a contato em todas |
| Identificador de elemento duplicado | nenhum em 296 rotas |
| Console do navegador | limpo em 13 rotas, incluindo as de link profundo |
| Menu, cards, busca e favoritos | os quatro chegam à vertical com a solução certa aberta |
| Aviso de hidratação no console | nenhum |
| Hierarquia de títulos nas 296 rotas | sem salto de nível, menos `/blog`, que é anterior e fora deste escopo |
| Links internos | 447 destinos distintos, nenhum quebrado |
| Barra fixa do celular sobre título, CTA, formulário e consentimento | não cobre nenhum deles em definitivo; a folga reservada acompanha a altura medida da barra |

ESLint acusa cerca de 13.500 apontamentos, quase todos do Prettier e
anteriores a esta revisão: o projeto nunca passou por uma formatação completa.
Rodar `npm run format` resolve, mas reformata o repositório inteiro e deixa o
histórico difícil de ler. Fica como decisão de quem assumir.

## 10. Pendências

1. **Resend sem conta configurada.** O formulário não entrega e-mail até que a
   conta exista, um domínio esteja verificado e as três variáveis estejam no
   painel da Vercel.
2. **Google Analytics sem identificador.** `VITE_GA_ID` está vazia e o script
   não carrega.
3. **Search Console.** O `sitemap.xml` ainda não foi submetido.
4. **Virada de domínio.** `plan10.com.br` ainda aponta para o site anterior.
5. **Componentes sem uso.** `src/components/plan10/ProductChooser.tsx`,
   `ProductCard.tsx` e `PerfilToggle.tsx` existiam para a grade com modal e
   ficaram sem referência depois desta revisão. Foram mantidos em disco de
   propósito, para a remoção ser uma decisão de quem revisar, e não um efeito
   colateral. O mesmo vale para o componente `Modal` em
   `src/components/ui/primitives.tsx`, que já não era usado antes.
6. **Links de contratação da Porto.** As 36 soluções com contratação online
   apontam para `porto.vc`. A planilha de catálogo marca essas linhas como
   pendentes de validação comercial, técnica ou jurídica. A decisão registrada
   foi manter e validar depois.
