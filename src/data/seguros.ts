export interface SeguroProduct {
  id: string;
  name: string;
  description: string;
  imageSlot: boolean;
}

export interface SeguroGroup {
  groupTitle: string;
  products: SeguroProduct[];
}

export interface SeguroCategory {
  id: string;
  route: string;
  eyebrow: string;
  title: string;
  description: string;
  hubColor: string;
  icon: string; // lucide-react icon name
  pf: SeguroGroup[];
  pj: SeguroGroup[];
}

export const seguroCategories: SeguroCategory[] = [
  // ─── 1. BLINDAGEM PATRIMONIAL ────────────────────────────────────────────
  {
    id: "blindagem-patrimonial",
    route: "/seguros/blindagem-patrimonial",
    eyebrow: "PROTEÇÃO DE IMÓVEIS E PATRIMÔNIO",
    title: "Blindagem Patrimonial",
    description:
      "Soluções de proteção para imóveis, conteúdo e estruturas. Planejadas para preservar capital, garantir continuidade da moradia ou da operação e mitigar perdas em eventos críticos.",
    hubColor: "#3D8BF2",
    icon: "Building",
    pf: [
      {
        groupTitle: "Proteção residencial e patrimonial",
        products: [
          {
            id: "seg-bp-pf-01",
            name: "Proteção do seu imóvel premium",
            description:
              "Seu imóvel é muito mais do que um endereço — é a expressão do seu patrimônio. Cobertura ampla e personalizada para residências diferenciadas, com assistência 24h e coberturas customizadas.",
            imageSlot: true,
          },
          {
            id: "seg-bp-pf-02",
            name: "Proteção do seu condomínio",
            description:
              "Blindagem completa para áreas comuns, danos a terceiros e responsabilidades do síndico. Sua tranquilidade começa na porta de entrada do condomínio.",
            imageSlot: true,
          },
          {
            id: "seg-bp-pf-03",
            name: "Proteção do imóvel alugado",
            description:
              "Seu imóvel alugado é um ativo que trabalha por você. Cobertura completa durante a locação, garantindo que sinistros não comprometam o retorno do investimento.",
            imageSlot: true,
          },
          {
            id: "seg-bp-pf-04",
            name: "Proteção de equipamentos portáteis",
            description:
              "Notebooks, câmeras, tablets e smartphones merecem proteção de última geração. Cobre roubo, furto qualificado e danos acidentais onde quer que você esteja.",
            imageSlot: true,
          },
          {
            id: "seg-bp-pf-05",
            name: "Proteção do seu smartphone",
            description:
              "Seu smartphone premium é seu escritório, sua carteira e sua vida conectada. Proteção contra roubo, furto, danos elétricos e quebra acidental.",
            imageSlot: true,
          },
          {
            id: "seg-bp-pf-06",
            name: "Proteção de joias, obras de arte e coleções",
            description:
              "Joias únicas, obras de arte e coleções raras merecem proteção igualmente exclusiva, com avaliação técnica especializada e indenização pelo valor real de mercado.",
            imageSlot: true,
          },
          {
            id: "seg-bp-pf-07",
            name: "Proteção de placas e sistema solar",
            description:
              "Invista em energia solar com tranquilidade. Proteção do sistema de placas contra danos físicos, queda de raio e surtos elétricos.",
            imageSlot: true,
          },
        ],
      },
    ],
    pj: [
      {
        groupTitle: "Proteção empresarial e corporativa",
        products: [
          {
            id: "seg-bp-pj-01",
            name: "Proteção patrimonial empresarial",
            description:
              "Cobertura modular para sede, filiais, escritórios e holdings com diagnóstico técnico de riscos, garantindo continuidade operacional mesmo diante dos sinistros mais críticos.",
            imageSlot: true,
          },
          {
            id: "seg-bp-pj-02",
            name: "Proteção coletiva do condomínio",
            description:
              "Cobertura da estrutura coletiva, danos a terceiros e responsabilidades da administração — protegendo a gestão e o valor de edifícios corporativos de alto padrão.",
            imageSlot: true,
          },
          {
            id: "seg-bp-pj-03",
            name: "Proteção da carteira de locação imobiliária",
            description:
              "Para imobiliárias e investidores com múltiplos imóveis: cobertura ampliada por carteira com operação contínua e receita de locação protegida.",
            imageSlot: true,
          },
          {
            id: "seg-bp-pj-04",
            name: "Proteção de dispositivos eletrônicos empresariais",
            description:
              "Notebooks, tablets e smartphones corporativos cobertos contra roubo, furto e danos, incluindo equipamentos em home office e operação externa.",
            imageSlot: true,
          },
          {
            id: "seg-bp-pj-05",
            name: "Proteção de smartphones corporativos",
            description:
              "Gestão centralizada e reposição ágil de smartphones corporativos contra roubo, furto, danos elétricos e quebra acidental.",
            imageSlot: true,
          },
          {
            id: "seg-bp-pj-06",
            name: "Proteção de acervo e bens de alto valor",
            description:
              "Para galerias, museus e joalherias: proteção de bens de alto valor em transporte, exposição, leilão e armazenamento com avaliação técnica especializada.",
            imageSlot: true,
          },
          {
            id: "seg-bp-pj-07",
            name: "Proteção de obras e engenharia",
            description:
              "Obras civis, montagens industriais e grandes instalações cobertas: danos materiais, atrasos e responsabilidades durante toda a execução.",
            imageSlot: true,
          },
          {
            id: "seg-bp-pj-08",
            name: "Proteção de receita e continuidade do negócio",
            description:
              "Um sinistro não precisa paralisar seu negócio. Compensação financeira pela interrupção de atividades, mantendo fluxo de caixa e honrando compromissos.",
            imageSlot: true,
          },
          {
            id: "seg-bp-pj-09",
            name: "Proteção de máquinas e equipamentos",
            description:
              "Máquinas paradas significam produção perdida. Cobertura para danos elétricos, mecânicos e operacionais com restituição ágil e continuidade do parque produtivo.",
            imageSlot: true,
          },
          {
            id: "seg-bp-pj-10",
            name: "Proteção de usinas e sistemas solares",
            description:
              "Usinas fotovoltaicas cobertas contra danos materiais, queda de raio, surtos elétricos e lucros cessantes — garantindo retorno do investimento em energia limpa.",
            imageSlot: true,
          },
        ],
      },
    ],
  },

  // ─── 2. MOBILIDADE INTELIGENTE ───────────────────────────────────────────
  {
    id: "mobilidade-inteligente",
    route: "/seguros/mobilidade-inteligente",
    eyebrow: "PROTEÇÃO DE VEÍCULOS E FROTAS",
    title: "Mobilidade Inteligente",
    description:
      "Proteção para veículos, frotas e ativos de mobilidade. Combina casco, responsabilidade civil e serviços de assistência com linhas voltadas à experiência premium.",
    hubColor: "#3D8BF2",
    icon: "Car",
    pf: [
      {
        groupTitle: "Proteção veicular pessoal",
        products: [
          {
            id: "seg-mob-pf-01",
            name: "Proteção do seu veículo premium",
            description:
              "Cobertura integral de casco, assistência 24h exclusiva, carro reserva de categoria equivalente e reparo em oficinas autorizadas. Mobilidade premium não admite improvisos.",
            imageSlot: true,
          },
          {
            id: "seg-mob-pf-02",
            name: "Proteção de responsabilidade no trânsito",
            description:
              "Cobertura para danos materiais, corporais e morais causados a terceiros em acidentes de trânsito, com limites robustos e atendimento especializado.",
            imageSlot: true,
          },
          {
            id: "seg-mob-pf-03",
            name: "Proteção da sua moto",
            description:
              "Cobertura completa contra roubo, furto, colisão e assistência em qualquer situação, para que nada interrompa a sua jornada.",
            imageSlot: true,
          },
          {
            id: "seg-mob-pf-04",
            name: "Proteção da sua bike ou e-bike",
            description:
              "Proteção total para bicicleta ou e-bike: roubo, danos acidentais e responsabilidade civil no percurso diário, treino ou competição.",
            imageSlot: true,
          },
          {
            id: "seg-mob-pf-05",
            name: "Proteção de veículo por APP",
            description:
              "Use seu veículo para gerar renda com proteção. Cobertura específica para uso comercial em plataformas de mobilidade e motorista profissional.",
            imageSlot: true,
          },
          {
            id: "seg-mob-pf-06",
            name: "Proteção veicular no Mercosul",
            description:
              "Cruzar as fronteiras do Mercosul com segurança. Cobertura de responsabilidade civil ampliada para danos a terceiros durante o trânsito internacional.",
            imageSlot: true,
          },
          {
            id: "seg-mob-pf-07",
            name: "Proteção com rastreamento veicular",
            description:
              "Rastreamento e proteção andam juntos: tecnologia de monitoramento aliada à cobertura securitária, com controle total sobre a localização do veículo.",
            imageSlot: true,
          },
        ],
      },
    ],
    pj: [
      {
        groupTitle: "Gestão e proteção de frotas",
        products: [
          {
            id: "seg-mob-pj-01",
            name: "Gestão e proteção de frotas",
            description:
              "Cobertura integral de casco, políticas customizadas de franquia, telemetria e rastreamento com central de gestão dedicada para frotas corporativas de qualquer porte.",
            imageSlot: true,
          },
          {
            id: "seg-mob-pj-02",
            name: "Proteção de responsabilidade do transportador",
            description:
              "Cobertura para danos a terceiros pela frota com limites majorados, atendendo operações de transporte de alta frequência.",
            imageSlot: true,
          },
          {
            id: "seg-mob-pj-03",
            name: "Proteção de motos e frotas de entrega",
            description:
              "Cobertura coletiva para frotas de motocicletas com gestão simplificada e coberturas adaptadas a operações de última milha.",
            imageSlot: true,
          },
          {
            id: "seg-mob-pj-04",
            name: "Proteção de frota para plataformas digitais",
            description:
              "Coberturas para frotas terceirizadas, operações de locação e plataformas de mobilidade com estrutura flexível que acompanha o crescimento do negócio.",
            imageSlot: true,
          },
          {
            id: "seg-mob-pj-05",
            name: "Proteção veicular internacional — Mercosul",
            description:
              "Garantia obrigatória de RC ampliada para frotas em trânsito internacional, com emissão ágil e gestão centralizada.",
            imageSlot: true,
          },
          {
            id: "seg-mob-pj-06",
            name: "Proteção e rastreamento de frota",
            description:
              "Rastreamento integrado à cobertura securitária com vantagens de precificação e controle operacional completo sobre cada ativo da frota.",
            imageSlot: true,
          },
          {
            id: "seg-mob-pj-07",
            name: "Proteção de máquinas pesadas e móveis",
            description:
              "Escavadeiras, empilhadeiras, gruas e equipamentos móveis cobertos: danos materiais, basculamento, colisão e RC em operação.",
            imageSlot: true,
          },
        ],
      },
    ],
  },

  // ─── 3. VIDA & LEGADO FAMILIAR ────────────────────────────────────────────
  {
    id: "vida-legado-familiar",
    route: "/seguros/vida-legado-familiar",
    eyebrow: "PROTEÇÃO DE VIDA E RENDA",
    title: "Vida & Legado Familiar",
    description:
      "Soluções que asseguram a continuidade financeira da família e dos colaboradores. Integram proteção de vida, saúde, renda e planejamento sucessório.",
    hubColor: "#3D8BF2",
    icon: "Heart",
    pf: [
      {
        groupTitle: "Proteção de vida e renda pessoal",
        products: [
          {
            id: "seg-vida-pf-01",
            name: "Proteção de vida e legado familiar",
            description:
              "Capital imediato para beneficiários em caso de morte ou invalidez, protegendo o padrão de vida e o planejamento sucessório que você construiu.",
            imageSlot: true,
          },
          {
            id: "seg-vida-pf-02",
            name: "Proteção de vida por prazo definido",
            description:
              "Proteção precisa para obrigações financeiras temporárias — financiamentos, investimentos — com capital exato para essa finalidade.",
            imageSlot: true,
          },
          {
            id: "seg-vida-pf-03",
            name: "Proteção de vida vitalícia e sucessória",
            description:
              "Cobertura vitalícia com acumulação de capital: solução ideal para transmissão de patrimônio e blindagem financeira entre gerações.",
            imageSlot: true,
          },
          {
            id: "seg-vida-pf-04",
            name: "Proteção contra acidentes pessoais",
            description:
              "Cobre morte acidental, invalidez e despesas hospitalares para que um imprevisto não comprometa o que você levou anos para construir.",
            imageSlot: true,
          },
          {
            id: "seg-vida-pf-05",
            name: "Proteção financeira em doenças graves",
            description:
              "Capital antecipado em caso de doenças como câncer, AVC ou infarto para que você e sua família se concentrem na recuperação.",
            imageSlot: true,
          },
          {
            id: "seg-vida-pf-06",
            name: "Proteção por invalidez",
            description:
              "Indenização por perda funcional permanente, mantendo sua independência financeira e o padrão de vida da família.",
            imageSlot: true,
          },
          {
            id: "seg-vida-pf-07",
            name: "Proteção de renda por incapacidade",
            description:
              "Em caso de afastamento por acidente ou doença, sua renda é substituída mensalmente, garantindo contas, compromissos e planos intactos.",
            imageSlot: true,
          },
          {
            id: "seg-vida-pf-08",
            name: "Assistência funeral familiar",
            description:
              "Nos momentos mais difíceis, sua família merece suporte e dignidade. Cobertura integral das despesas com o serviço funeral.",
            imageSlot: true,
          },
          {
            id: "seg-vida-pf-09",
            name: "Proteção educacional dos filhos",
            description:
              "Garante a continuidade dos estudos dos dependentes mesmo em caso de falecimento ou invalidez do responsável financeiro.",
            imageSlot: true,
          },
          {
            id: "seg-vida-pf-10",
            name: "Proteção de financiamentos e dívidas",
            description:
              "Quita automaticamente financiamentos e compromissos financeiros em caso de morte ou invalidez, protegendo a família de qualquer endividamento.",
            imageSlot: true,
          },
          {
            id: "seg-vida-pf-11",
            name: "Proteção do planejamento sucessório (VGBL)",
            description:
              "Acumulação financeira, proteção securitária e eficiência tributária em uma estrutura elegante para preservar e transmitir patrimônio entre gerações.",
            imageSlot: true,
          },
          {
            id: "seg-vida-pf-12",
            name: "Assistência médica pessoal e familiar",
            description:
              "Saúde premium: acesso irrestrito aos melhores médicos, hospitais e tratamentos com cobertura nacional e internacional e reembolso ampliado.",
            imageSlot: true,
          },
          {
            id: "seg-vida-pf-13",
            name: "Assistência odontológica pessoal e familiar",
            description:
              "Plano odontológico premium cobrindo procedimentos preventivos, restauradores e cirúrgicos com a melhor rede de especialistas.",
            imageSlot: true,
          },
          {
            id: "seg-vida-pf-14",
            name: "Proteção pessoal e proteção do pet",
            description:
              "Cobertura veterinária, assistência doméstica e proteção de RC do animal — porque cuidar bem é cuidar de tudo o que você ama.",
            imageSlot: true,
          },
        ],
      },
    ],
    pj: [
      {
        groupTitle: "Proteção coletiva de colaboradores",
        products: [
          {
            id: "seg-vida-pj-01",
            name: "Proteção de vida coletiva para colaboradores",
            description:
              "Capital imediato para o quadro de pessoal em caso de morte ou invalidez, fortalecendo a política de benefícios e redução de passivos trabalhistas.",
            imageSlot: true,
          },
          {
            id: "seg-vida-pj-02",
            name: "Proteção de sócios e executivos-chave (Keyman)",
            description:
              "Garante capital de compensação em caso de falecimento ou invalidez de fundadores, sócios e executivos estratégicos, preservando a continuidade dos negócios.",
            imageSlot: true,
          },
          {
            id: "seg-vida-pj-03",
            name: "Proteção coletiva contra acidentes pessoais",
            description:
              "Cobre morte acidental, invalidez e despesas hospitalares para todo o quadro de pessoal, atendendo exigências de convenções coletivas.",
            imageSlot: true,
          },
          {
            id: "seg-vida-pj-04",
            name: "Proteção financeira de executivos em doenças graves",
            description:
              "Capital antecipado em caso de doenças graves para líderes, garantindo que o tratamento não interrompa a estratégia da empresa.",
            imageSlot: true,
          },
          {
            id: "seg-vida-pj-05",
            name: "Proteção coletiva por invalidez",
            description:
              "Cobertura de perda funcional permanente para o quadro de pessoal, reduzindo passivos trabalhistas e demonstrando compromisso com o bem-estar dos colaboradores.",
            imageSlot: true,
          },
          {
            id: "seg-vida-pj-06",
            name: "Proteção coletiva de renda do colaborador",
            description:
              "Renda mensal substitutiva para colaboradores afastados por acidente ou doença — benefício diferenciador na política de retenção de talentos.",
            imageSlot: true,
          },
          {
            id: "seg-vida-pj-07",
            name: "Assistência funeral coletiva",
            description:
              "Cobertura de despesas funerárias do colaborador e dependentes, compondo um pacote de benefícios que vai além do esperado.",
            imageSlot: true,
          },
          {
            id: "seg-vida-pj-08",
            name: "Proteção da carteira de crédito",
            description:
              "Garante que inadimplência por morte ou invalidez não comprometa a carteira, viabilizando políticas mais competitivas de concessão de crédito.",
            imageSlot: true,
          },
          {
            id: "seg-vida-pj-09",
            name: "Previdência privada corporativa (VGBL)",
            description:
              "Acumulação financeira, componente securitário e eficiência tributária em programas exclusivos de compensação e retenção de lideranças de alto desempenho.",
            imageSlot: true,
          },
          {
            id: "seg-vida-pj-10",
            name: "Assistência médica empresarial",
            description:
              "Planos com ampla rede credenciada, cobertura nacional e opções premium para diferentes níveis hierárquicos — pilar central da política de benefícios.",
            imageSlot: true,
          },
          {
            id: "seg-vida-pj-11",
            name: "Assistência odontológica empresarial",
            description:
              "Cobertura completa para procedimentos preventivos e restauradores, compondo o pacote de benefícios com um diferencial valorizado pelos colaboradores.",
            imageSlot: true,
          },
        ],
      },
    ],
  },

  // ─── 4. RESPONSABILIDADE & PROFISSÃO ─────────────────────────────────────
  {
    id: "responsabilidade-profissional",
    route: "/seguros/responsabilidade-profissional",
    eyebrow: "RC GERAL, D&O E E&O",
    title: "Responsabilidade & Profissão",
    description:
      "Proteção contra riscos de danos materiais, corporais, morais e financeiros causados a terceiros no exercício de atividade pessoal ou profissional.",
    hubColor: "#3D8BF2",
    icon: "Scale",
    pf: [
      {
        groupTitle: "Responsabilidade civil pessoal e profissional",
        products: [
          {
            id: "seg-rc-pf-01",
            name: "Proteção de responsabilidade pessoal e familiar",
            description:
              "Famílias de alto patrimônio têm exposições que a maioria desconhece. Cobertura para danos involuntários a terceiros com limites robustos e assessoria jurídica.",
            imageSlot: true,
          },
          {
            id: "seg-rc-pf-02",
            name: "Proteção de responsabilidade profissional",
            description:
              "Cobre erros, omissões e alegações de negligência no exercício profissional, com suporte jurídico especializado para quem não abre mão de excelência.",
            imageSlot: true,
          },
          {
            id: "seg-rc-pf-03",
            name: "Proteção de riscos ambientais",
            description:
              "Responsabilidade ambiental com consciência: cobre danos ao meio ambiente, custos de remediação e RC ambiental para produtores rurais e proprietários.",
            imageSlot: true,
          },
          {
            id: "seg-rc-pf-04",
            name: "Proteção para eventos privados",
            description:
              "Eventos exclusivos merecem proteção exclusiva: cancelamento, RC do organizador, danos à infraestrutura e acidentes com convidados.",
            imageSlot: true,
          },
        ],
      },
    ],
    pj: [
      {
        groupTitle: "Responsabilidade civil empresarial",
        products: [
          {
            id: "seg-rc-pj-01",
            name: "Proteção de responsabilidade civil empresarial",
            description:
              "Cobertura para indenizações por danos a clientes, visitantes e terceiros nas instalações, com limites compatíveis com o porte e complexidade do negócio.",
            imageSlot: true,
          },
          {
            id: "seg-rc-pj-02",
            name: "Proteção de responsabilidade profissional coletiva",
            description:
              "E&O para empresas de serviços intelectuais e técnicos: cobertura coletiva, suporte jurídico especializado e limites compatíveis com contratos de alto valor.",
            imageSlot: true,
          },
          {
            id: "seg-rc-pj-03",
            name: "Proteção de diretores e administradores (D&O)",
            description:
              "Protege o patrimônio pessoal de diretores, conselheiros e executivos por atos na função. Indispensável em governança, holdings e companhias com compliance ativo.",
            imageSlot: true,
          },
          {
            id: "seg-rc-pj-04",
            name: "Proteção de responsabilidade ambiental empresarial",
            description:
              "Cobre danos ao meio ambiente causados pela operação, incluindo poluição gradual e súbita, custos de remediação e RC ambiental.",
            imageSlot: true,
          },
          {
            id: "seg-rc-pj-05",
            name: "Proteção de responsabilidade trabalhista",
            description:
              "Cobertura para indenizações decorrentes de acidentes de trabalho e RC do empregador, blindando o resultado financeiro de condenações trabalhistas imprevistas.",
            imageSlot: true,
          },
          {
            id: "seg-rc-pj-06",
            name: "Proteção de eventos corporativos",
            description:
              "Cancelamento, RC do organizador, danos à infraestrutura e acidentes com participantes — para que cada evento reforce a imagem da empresa.",
            imageSlot: true,
          },
        ],
      },
    ],
  },

  // ─── 5. GARANTIAS & CRÉDITO ──────────────────────────────────────────────
  {
    id: "garantias-credito",
    route: "/seguros/garantias-credito",
    eyebrow: "GARANTIAS E SOLUÇÕES FINANCEIRAS",
    title: "Garantias & Crédito",
    description:
      "Soluções que substituem fiadores, garantem operações financeiras e mitigam riscos de crédito e de execução contratual.",
    hubColor: "#3D8BF2",
    icon: "Landmark",
    pf: [
      {
        groupTitle: "Garantias para pessoa física",
        products: [
          {
            id: "seg-gar-pf-01",
            name: "Proteção do aluguel sem fiador",
            description:
              "Substitui o fiador com agilidade, protegendo o proprietário em caso de inadimplência e tornando a assinatura do contrato simples e segura.",
            imageSlot: true,
          },
          {
            id: "seg-gar-pf-02",
            name: "Proteção contra fraudes financeiras",
            description:
              "Cobre transações não reconhecidas, fraudes em cartões e golpes digitais. Suas finanças blindadas contra as ameaças financeiras modernas.",
            imageSlot: true,
          },
          {
            id: "seg-gar-pf-03",
            name: "Proteção em arremates e leilões",
            description:
              "Garante o cumprimento das obrigações do arrematante em leilões públicos e privados, com proteção especializada em ativos judiciais e patrimoniais.",
            imageSlot: true,
          },
        ],
      },
    ],
    pj: [
      {
        groupTitle: "Garantias para empresas",
        products: [
          {
            id: "seg-gar-pj-01",
            name: "Proteção de locação comercial",
            description:
              "Substitui fiadores em contratos comerciais e residenciais com velocidade e segurança, viabilizando carteiras imobiliárias de grande porte.",
            imageSlot: true,
          },
          {
            id: "seg-gar-pj-02",
            name: "Garantia de execução contratual",
            description:
              "O seguro garantia substitui depósitos em dinheiro e cartas de fiança bancária, liberando capital de giro com comprovação de solidez financeira.",
            imageSlot: true,
          },
          {
            id: "seg-gar-pj-03",
            name: "Garantia judicial e substituição de depósito",
            description:
              "Substitui depósitos recursais e penhoras por garantia securitária, liberando liquidez para gestão inteligente de passivos jurídicos.",
            imageSlot: true,
          },
          {
            id: "seg-gar-pj-04",
            name: "Garantia de licitações públicas (Bid Bond)",
            description:
              "Emissão ágil de Bid Bonds para editais governamentais, demonstrando capacidade financeira sem imobilizar capital.",
            imageSlot: true,
          },
          {
            id: "seg-gar-pj-05",
            name: "Proteção de crédito e recebíveis",
            description:
              "Cobre perdas por inadimplência comercial no mercado interno e nas exportações, habilitando políticas de crédito mais competitivas.",
            imageSlot: true,
          },
          {
            id: "seg-gar-pj-06",
            name: "Proteção em fusões e aquisições (W&I)",
            description:
              "Representations & Warranties para M&A: protege compradores e vendedores de quebras de declarações e garantias pós-fechamento.",
            imageSlot: true,
          },
          {
            id: "seg-gar-pj-07",
            name: "Proteção de meios de pagamento corporativos",
            description:
              "Cobre perdas por fraudes em meios de pagamento e transações não reconhecidas para empresas com alto volume transacional digital.",
            imageSlot: true,
          },
          {
            id: "seg-gar-pj-08",
            name: "Proteção em arremates e leilões empresariais",
            description:
              "Emissão ágil da garantia do arrematante para leilões de ativos judiciais, patrimônio estatal e bens de alto valor.",
            imageSlot: true,
          },
        ],
      },
    ],
  },

  // ─── 6. PROTEÇÃO DIGITAL & CYBER ─────────────────────────────────────────
  {
    id: "protecao-digital",
    route: "/seguros/protecao-digital",
    eyebrow: "RISCOS CIBERNÉTICOS E PROTEÇÃO ONLINE",
    title: "Proteção Digital & Cyber",
    description:
      "Soluções contra ameaças digitais, fraudes online, vazamento de dados e responsabilidade cibernética. Linha estratégica para o atual cenário regulatório (LGPD).",
    hubColor: "#3D8BF2",
    icon: "Shield",
    pf: [
      {
        groupTitle: "Proteção cibernética pessoal",
        products: [
          {
            id: "seg-cyber-pf-01",
            name: "Proteção digital e cibernética pessoal",
            description:
              "Sua vida digital é tão valiosa quanto seus bens físicos. Cobre ataques cibernéticos, fraudes digitais, sequestro de dados e roubo de identidade.",
            imageSlot: true,
          },
          {
            id: "seg-cyber-pf-02",
            name: "Proteção contra golpes e fraudes online",
            description:
              "Golpes via Pix, transferências fraudulentas e engenharia social indenizados com agilidade — complemento essencial à sua estratégia de segurança digital.",
            imageSlot: true,
          },
        ],
      },
    ],
    pj: [
      {
        groupTitle: "Proteção cibernética empresarial",
        products: [
          {
            id: "seg-cyber-pj-01",
            name: "Proteção de riscos cibernéticos empresariais",
            description:
              "Cobre resposta a incidentes, notificações à ANPD, RC por violação de LGPD e lucros cessantes cibernéticos — protegendo operação, imagem e dados dos clientes.",
            imageSlot: true,
          },
          {
            id: "seg-cyber-pj-02",
            name: "Proteção contra crimes cibernéticos corporativos",
            description:
              "Fraudes eletrônicas, engenharia social e transferências não autorizadas indenizados: complemento essencial às políticas de segurança da informação.",
            imageSlot: true,
          },
          {
            id: "seg-cyber-pj-03",
            name: "Proteção por violação de dados (LGPD)",
            description:
              "Cobre multas regulatórias da ANPD, custos de defesa e indenizações a titulares em incidentes de dados — obrigação legal com risco financeiro real.",
            imageSlot: true,
          },
        ],
      },
    ],
  },

  // ─── CATEGORIES 7-12 ARE ADDED IN PROMPT PART 2 ──────────────────────────
  // Do NOT close the array or export yet — wait for Part 2.
];
// NOTE: This file is incomplete — Part 2 will add categories 7-12 before closing.
// After running Part 2, the seguroCategories array will be complete.
