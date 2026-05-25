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
              "Seu imóvel é muito mais do que um endereço, é a expressão do seu patrimônio. Cobertura ampla e personalizada para residências diferenciadas, com assistência 24h e coberturas customizadas.",
          },
          {
            id: "seg-bp-pf-02",
            name: "Proteção do seu condomínio",
            description:
              "Blindagem completa para áreas comuns, danos a terceiros e responsabilidades do síndico. Sua tranquilidade começa na porta de entrada do condomínio.",
          },
          {
            id: "seg-bp-pf-03",
            name: "Proteção do imóvel alugado",
            description:
              "Seu imóvel alugado é um ativo que trabalha por você. Cobertura completa durante a locação, garantindo que sinistros não comprometam o retorno do investimento.",
          },
          {
            id: "seg-bp-pf-04",
            name: "Proteção de equipamentos portáteis",
            description:
              "Notebooks, câmeras, tablets e smartphones merecem proteção de última geração. Cobre roubo, furto qualificado e danos acidentais onde quer que você esteja.",
          },
          {
            id: "seg-bp-pf-05",
            name: "Proteção do seu smartphone",
            description:
              "Seu smartphone premium é seu escritório, sua carteira e sua vida conectada. Proteção contra roubo, furto, danos elétricos e quebra acidental.",
          },
          {
            id: "seg-bp-pf-06",
            name: "Proteção de joias, obras de arte e coleções",
            description:
              "Joias únicas, obras de arte e coleções raras merecem proteção igualmente exclusiva, com avaliação técnica especializada e indenização pelo valor real de mercado.",
          },
          {
            id: "seg-bp-pf-07",
            name: "Proteção de placas e do sistema solar",
            description:
              "Invista em energia solar com tranquilidade. Proteção do sistema de placas contra danos físicos, queda de raio e surtos elétricos.",
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
          },
          {
            id: "seg-bp-pj-02",
            name: "Proteção coletiva do condomínio",
            description:
              "Cobertura da estrutura coletiva, danos a terceiros e responsabilidades da administração, protegendo a gestão e o valor de edifícios corporativos de alto padrão.",
          },
          {
            id: "seg-bp-pj-03",
            name: "Proteção da carteira de locação imobiliária",
            description:
              "Para imobiliárias e investidores com múltiplos imóveis: cobertura ampliada por carteira com operação contínua e receita de locação protegida.",
          },
          {
            id: "seg-bp-pj-04",
            name: "Proteção de dispositivos eletrônicos empresariais",
            description:
              "Notebooks, tablets e smartphones corporativos cobertos contra roubo, furto e danos, incluindo equipamentos em home office e operação externa.",
          },
          {
            id: "seg-bp-pj-05",
            name: "Proteção de smartphones corporativos",
            description:
              "Gestão centralizada e reposição ágil de smartphones corporativos contra roubo, furto, danos elétricos e quebra acidental.",
          },
          {
            id: "seg-bp-pj-06",
            name: "Proteção de acervo e bens de alto valor",
            description:
              "Para galerias, museus e joalherias: proteção de bens de alto valor em transporte, exposição, leilão e armazenamento com avaliação técnica especializada.",
          },
          {
            id: "seg-bp-pj-07",
            name: "Proteção de obras e engenharia",
            description:
              "Obras civis, montagens industriais e grandes instalações cobertas: danos materiais, atrasos e responsabilidades durante toda a execução.",
          },
          {
            id: "seg-bp-pj-08",
            name: "Proteção de receita e continuidade do negócio",
            description:
              "Um sinistro não precisa paralisar seu negócio. Compensação financeira pela interrupção de atividades, mantendo fluxo de caixa e honrando compromissos.",
          },
          {
            id: "seg-bp-pj-09",
            name: "Proteção de máquinas e equipamentos",
            description:
              "Máquinas paradas significam produção perdida. Cobertura para danos elétricos, mecânicos e operacionais com restituição ágil e continuidade do parque produtivo.",
          },
          {
            id: "seg-bp-pj-10",
            name: "Proteção de usinas e sistemas solares",
            description:
              "Usinas fotovoltaicas cobertas contra danos materiais, queda de raio, surtos elétricos e lucros cessantes, garantindo retorno do investimento em energia limpa.",
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
          },
          {
            id: "seg-mob-pf-02",
            name: "Proteção de responsabilidade no trânsito",
            description:
              "Cobertura para danos materiais, corporais e morais causados a terceiros em acidentes de trânsito, com limites robustos e atendimento especializado.",
          },
          {
            id: "seg-mob-pf-03",
            name: "Proteção da sua moto",
            description:
              "Cobertura completa contra roubo, furto, colisão e assistência em qualquer situação, para que nada interrompa a sua jornada.",
          },
          {
            id: "seg-mob-pf-04",
            name: "Proteção da sua bike ou e-bike",
            description:
              "Proteção total para bicicleta ou e-bike: roubo, danos acidentais e responsabilidade civil no percurso diário, treino ou competição.",
          },
          {
            id: "seg-mob-pf-05",
            name: "Proteção de veículo por APP",
            description:
              "Use seu veículo para gerar renda com proteção. Cobertura específica para uso comercial em plataformas de mobilidade e motorista profissional.",
          },
          {
            id: "seg-mob-pf-06",
            name: "Proteção veicular no Mercosul",
            description:
              "Cruzar as fronteiras do Mercosul com segurança. Cobertura de responsabilidade civil ampliada para danos a terceiros durante o trânsito internacional.",
          },
          {
            id: "seg-mob-pf-07",
            name: "Proteção com rastreamento veicular",
            description:
              "Rastreamento e proteção andam juntos: tecnologia de monitoramento aliada à cobertura securitária, com controle total sobre a localização do veículo.",
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
          },
          {
            id: "seg-mob-pj-02",
            name: "Proteção de responsabilidade do transportador",
            description:
              "Cobertura para danos a terceiros pela frota com limites majorados, atendendo operações de transporte de alta frequência.",
          },
          {
            id: "seg-mob-pj-03",
            name: "Proteção de motos e frotas de entrega",
            description:
              "Cobertura coletiva para frotas de motocicletas com gestão simplificada e coberturas adaptadas a operações de última milha.",
          },
          {
            id: "seg-mob-pj-04",
            name: "Proteção de frota para plataformas digitais",
            description:
              "Coberturas para frotas terceirizadas, operações de locação e plataformas de mobilidade com estrutura flexível que acompanha o crescimento do negócio.",
          },
          {
            id: "seg-mob-pj-05",
            name: "Proteção veicular internacional, Mercosul",
            description:
              "Garantia obrigatória de RC ampliada para frotas em trânsito internacional, com emissão ágil e gestão centralizada.",
          },
          {
            id: "seg-mob-pj-06",
            name: "Proteção e rastreamento de frota",
            description:
              "Rastreamento integrado à cobertura securitária com vantagens de precificação e controle operacional completo sobre cada ativo da frota.",
          },
          {
            id: "seg-mob-pj-07",
            name: "Proteção de máquinas pesadas e móveis",
            description:
              "Escavadeiras, empilhadeiras, gruas e equipamentos móveis cobertos: danos materiais, basculamento, colisão e RC em operação.",
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
          },
          {
            id: "seg-vida-pf-02",
            name: "Proteção de vida por prazo definido",
            description:
              "Proteção precisa para obrigações financeiras temporárias, financiamentos, investimentos, com capital exato para essa finalidade.",
          },
          {
            id: "seg-vida-pf-03",
            name: "Proteção de vida vitalícia e sucessória",
            description:
              "Cobertura vitalícia com acumulação de capital: solução ideal para transmissão de patrimônio e blindagem financeira entre gerações.",
          },
          {
            id: "seg-vida-pf-04",
            name: "Proteção contra acidentes pessoais",
            description:
              "Cobre morte acidental, invalidez e despesas hospitalares para que um imprevisto não comprometa o que você levou anos para construir.",
          },
          {
            id: "seg-vida-pf-05",
            name: "Proteção financeira em doenças graves",
            description:
              "Capital antecipado em caso de doenças como câncer, AVC ou infarto para que você e sua família se concentrem na recuperação.",
          },
          {
            id: "seg-vida-pf-06",
            name: "Proteção por invalidez",
            description:
              "Indenização por perda funcional permanente, mantendo sua independência financeira e o padrão de vida da família.",
          },
          {
            id: "seg-vida-pf-07",
            name: "Proteção de renda por incapacidade",
            description:
              "Em caso de afastamento por acidente ou doença, sua renda é substituída mensalmente, garantindo contas, compromissos e planos intactos.",
          },
          {
            id: "seg-vida-pf-08",
            name: "Assistência funeral familiar",
            description:
              "Nos momentos mais difíceis, sua família merece suporte e dignidade. Cobertura integral das despesas com o serviço funeral.",
          },
          {
            id: "seg-vida-pf-09",
            name: "Proteção educacional dos filhos",
            description:
              "Garante a continuidade dos estudos dos dependentes mesmo em caso de falecimento ou invalidez do responsável financeiro.",
          },
          {
            id: "seg-vida-pf-10",
            name: "Proteção de financiamentos e dívidas",
            description:
              "Quita automaticamente financiamentos e compromissos financeiros em caso de morte ou invalidez, protegendo a família de qualquer endividamento.",
          },
          {
            id: "seg-vida-pf-11",
            name: "Proteção do planejamento sucessório (VGBL)",
            description:
              "Acumulação financeira, proteção securitária e eficiência tributária em uma estrutura elegante para preservar e transmitir patrimônio entre gerações.",
          },
          {
            id: "seg-vida-pf-12",
            name: "Assistência médica pessoal e familiar",
            description:
              "Saúde premium: acesso irrestrito aos melhores médicos, hospitais e tratamentos com cobertura nacional e internacional e reembolso ampliado.",
          },
          {
            id: "seg-vida-pf-13",
            name: "Assistência odontológica pessoal e familiar",
            description:
              "Plano odontológico premium cobrindo procedimentos preventivos, restauradores e cirúrgicos com a melhor rede de especialistas.",
          },
          {
            id: "seg-vida-pf-14",
            name: "Proteção pessoal e proteção do pet",
            description:
              "Cobertura veterinária, assistência doméstica e proteção de RC do animal, porque cuidar bem é cuidar de tudo o que você ama.",
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
          },
          {
            id: "seg-vida-pj-02",
            name: "Proteção de sócios e executivos-chave (Keyman)",
            description:
              "Garante capital de compensação em caso de falecimento ou invalidez de fundadores, sócios e executivos estratégicos, preservando a continuidade dos negócios.",
          },
          {
            id: "seg-vida-pj-03",
            name: "Proteção coletiva contra acidentes pessoais",
            description:
              "Cobre morte acidental, invalidez e despesas hospitalares para todo o quadro de pessoal, atendendo exigências de convenções coletivas.",
          },
          {
            id: "seg-vida-pj-04",
            name: "Proteção financeira de executivos em doenças graves",
            description:
              "Capital antecipado em caso de doenças graves para líderes, garantindo que o tratamento não interrompa a estratégia da empresa.",
          },
          {
            id: "seg-vida-pj-05",
            name: "Proteção coletiva por invalidez",
            description:
              "Cobertura de perda funcional permanente para o quadro de pessoal, reduzindo passivos trabalhistas e demonstrando compromisso com o bem-estar dos colaboradores.",
          },
          {
            id: "seg-vida-pj-06",
            name: "Proteção coletiva de renda do colaborador",
            description:
              "Renda mensal substitutiva para colaboradores afastados por acidente ou doença, benefício diferenciador na política de retenção de talentos.",
          },
          {
            id: "seg-vida-pj-07",
            name: "Assistência funeral coletiva",
            description:
              "Cobertura de despesas funerárias do colaborador e dependentes, compondo um pacote de benefícios que vai além do esperado.",
          },
          {
            id: "seg-vida-pj-08",
            name: "Proteção da carteira de crédito",
            description:
              "Garante que inadimplência por morte ou invalidez não comprometa a carteira, viabilizando políticas mais competitivas de concessão de crédito.",
          },
          {
            id: "seg-vida-pj-09",
            name: "Previdência privada corporativa (VGBL)",
            description:
              "Acumulação financeira, componente securitário e eficiência tributária em programas exclusivos de compensação e retenção de lideranças de alto desempenho.",
          },
          {
            id: "seg-vida-pj-10",
            name: "Assistência médica empresarial",
            description:
              "Planos com ampla rede credenciada, cobertura nacional e opções premium para diferentes níveis hierárquicos, pilar central da política de benefícios.",
          },
          {
            id: "seg-vida-pj-11",
            name: "Assistência odontológica empresarial",
            description:
              "Cobertura completa para procedimentos preventivos e restauradores, compondo o pacote de benefícios com um diferencial valorizado pelos colaboradores.",
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
          },
          {
            id: "seg-rc-pf-02",
            name: "Proteção de responsabilidade profissional",
            description:
              "Cobre erros, omissões e alegações de negligência no exercício profissional, com suporte jurídico especializado para quem não abre mão de excelência.",
          },
          {
            id: "seg-rc-pf-03",
            name: "Proteção de riscos ambientais",
            description:
              "Responsabilidade ambiental com consciência: cobre danos ao meio ambiente, custos de remediação e RC ambiental para produtores rurais e proprietários.",
          },
          {
            id: "seg-rc-pf-04",
            name: "Proteção para eventos privados",
            description:
              "Eventos exclusivos merecem proteção exclusiva: cancelamento, RC do organizador, danos à infraestrutura e acidentes com convidados.",
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
          },
          {
            id: "seg-rc-pj-02",
            name: "Proteção de responsabilidade profissional coletiva",
            description:
              "E&O para empresas de serviços intelectuais e técnicos: cobertura coletiva, suporte jurídico especializado e limites compatíveis com contratos de alto valor.",
          },
          {
            id: "seg-rc-pj-03",
            name: "Proteção de diretores e administradores (D&O)",
            description:
              "Protege o patrimônio pessoal de diretores, conselheiros e executivos por atos na função. Indispensável em governança, holdings e companhias com compliance ativo.",
          },
          {
            id: "seg-rc-pj-04",
            name: "Proteção de responsabilidade ambiental empresarial",
            description:
              "Cobre danos ao meio ambiente causados pela operação, incluindo poluição gradual e súbita, custos de remediação e RC ambiental.",
          },
          {
            id: "seg-rc-pj-05",
            name: "Proteção de responsabilidade trabalhista",
            description:
              "Cobertura para indenizações decorrentes de acidentes de trabalho e RC do empregador, blindando o resultado financeiro de condenações trabalhistas imprevistas.",
          },
          {
            id: "seg-rc-pj-06",
            name: "Proteção de eventos corporativos",
            description:
              "Cancelamento, RC do organizador, danos à infraestrutura e acidentes com participantes, para que cada evento reforce a imagem da empresa.",
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
          },
          {
            id: "seg-gar-pf-02",
            name: "Proteção contra fraudes financeiras",
            description:
              "Cobre transações não reconhecidas, fraudes em cartões e golpes digitais. Suas finanças blindadas contra as ameaças financeiras modernas.",
          },
          {
            id: "seg-gar-pf-03",
            name: "Proteção em arremates e leilões",
            description:
              "Garante o cumprimento das obrigações do arrematante em leilões públicos e privados, com proteção especializada em ativos judiciais e patrimoniais.",
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
          },
          {
            id: "seg-gar-pj-02",
            name: "Garantia de execução contratual",
            description:
              "O seguro garantia substitui depósitos em dinheiro e cartas de fiança bancária, liberando capital de giro com comprovação de solidez financeira.",
          },
          {
            id: "seg-gar-pj-03",
            name: "Garantia judicial e substituição de depósito",
            description:
              "Substitui depósitos recursais e penhoras por garantia securitária, liberando liquidez para gestão inteligente de passivos jurídicos.",
          },
          {
            id: "seg-gar-pj-04",
            name: "Garantia de licitações públicas (Bid Bond)",
            description:
              "Emissão ágil de Bid Bonds para editais governamentais, demonstrando capacidade financeira sem imobilizar capital.",
          },
          {
            id: "seg-gar-pj-05",
            name: "Proteção de crédito e recebíveis",
            description:
              "Cobre perdas por inadimplência comercial no mercado interno e nas exportações, habilitando políticas de crédito mais competitivas.",
          },
          {
            id: "seg-gar-pj-06",
            name: "Proteção em fusões e aquisições (W&I)",
            description:
              "Representations & Warranties para M&A: protege compradores e vendedores de quebras de declarações e garantias pós-fechamento.",
          },
          {
            id: "seg-gar-pj-07",
            name: "Proteção de meios de pagamento corporativos",
            description:
              "Cobre perdas por fraudes em meios de pagamento e transações não reconhecidas para empresas com alto volume transacional digital.",
          },
          {
            id: "seg-gar-pj-08",
            name: "Proteção em arremates e leilões empresariais",
            description:
              "Emissão ágil da garantia do arrematante para leilões de ativos judiciais, patrimônio estatal e bens de alto valor.",
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
          },
          {
            id: "seg-cyber-pf-02",
            name: "Proteção contra golpes e fraudes online",
            description:
              "Golpes via Pix, transferências fraudulentas e engenharia social indenizados com agilidade, complemento essencial à sua estratégia de segurança digital.",
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
              "Cobre resposta a incidentes, notificações à ANPD, RC por violação de LGPD e lucros cessantes cibernéticos, protegendo operação, imagem e dados dos clientes.",
          },
          {
            id: "seg-cyber-pj-02",
            name: "Proteção contra crimes cibernéticos corporativos",
            description:
              "Fraudes eletrônicas, engenharia social e transferências não autorizadas indenizados: complemento essencial às políticas de segurança da informação.",
          },
          {
            id: "seg-cyber-pj-03",
            name: "Proteção por violação de dados (LGPD)",
            description:
              "Cobre multas regulatórias da ANPD, custos de defesa e indenizações a titulares em incidentes de dados, obrigação legal com risco financeiro real.",
          },
        ],
      },
    ],
  },

  // ─── 7. LOGÍSTICA & TRANSPORTE ───────────────────────────────────────────
  {
    id: "logistica-transporte",
    route: "/seguros/logistica-transporte",
    eyebrow: "TRANSPORTE DE CARGAS E EMBARCAÇÕES",
    title: "Logística & Transporte",
    description:
      "Soluções para movimentação de cargas, frotas de transporte e responsabilidade do transportador, do bem pessoal até operações de comércio exterior.",
    hubColor: "#3D8BF2",
    icon: "Truck",
    pf: [
      {
        groupTitle: "Transporte e mobilidade pessoal",
        products: [
          {
            id: "seg-log-pf-01",
            name: "Proteção de bens pessoais em mudança",
            description:
              "Móveis, obras de arte, joias e pertences cobertos durante o transporte. Cada item precioso chega ao destino com a mesma integridade com que saiu.",
          },
          {
            id: "seg-log-pf-02",
            name: "Proteção de embarcações de lazer",
            description:
              "Cobre casco, RC e tripulação de lancha, veleiro ou jet ski, para que cada saída ao mar seja uma experiência sem preocupações.",
          },
          {
            id: "seg-log-pf-03",
            name: "Proteção de aeronaves particulares",
            description:
              "Proteção para o ativo aeronáutico: casco, RC e acidentes com passageiros, estruturada para o exigente padrão da aviação executiva premium.",
          },
        ],
      },
    ],
    pj: [
      {
        groupTitle: "Transporte e logística empresarial",
        products: [
          {
            id: "seg-log-pj-01",
            name: "Proteção de cargas nacionais",
            description:
              "Cobertura obrigatória para mercadorias em trânsito nacional com gestão centralizada de sinistros e políticas adaptáveis ao perfil logístico da operação.",
          },
          {
            id: "seg-log-pj-02",
            name: "Proteção de cargas internacionais",
            description:
              "Cobertura para importação e exportação por modal aéreo, marítimo e rodoviário com cláusulas Institute Cargo Clauses e gestão especializada.",
          },
          {
            id: "seg-log-pj-03",
            name: "Proteção do transportador rodoviário",
            description:
              "RCTR-C e RCF-DC para transportadoras: conformidade regulatória e proteção financeira para operações rodoviárias de qualquer porte.",
          },
          {
            id: "seg-log-pj-04",
            name: "Proteção de operadores logísticos e armazéns",
            description:
              "Cobre responsabilidades durante movimentação e armazenagem, protegendo a operação logística de indenizações que comprometem o resultado.",
          },
          {
            id: "seg-log-pj-05",
            name: "Proteção de embarcações comerciais",
            description:
              "Casco, RC e tripulação para embarcações comerciais, navios e frotas de pesca e transporte aquaviário com coberturas técnicas estruturadas.",
          },
          {
            id: "seg-log-pj-06",
            name: "Proteção de aeronaves comerciais e executivas",
            description:
              "Casco e RC para táxi aéreo, frota corporativa e aviação agrícola, com acesso às melhores resseguradoras do mercado global.",
          },
        ],
      },
    ],
  },

  // ─── 8. RURAL & AGRONEGÓCIO ──────────────────────────────────────────────
  {
    id: "rural-agronegocio",
    route: "/seguros/rural-agronegocio",
    eyebrow: "PROTEÇÃO DA ATIVIDADE RURAL",
    title: "Rural & Agronegócio",
    description:
      "Proteção da atividade rural com cobertura agrícola, pecuária, florestal e aquícola, integradas ao planejamento patrimonial do produtor.",
    hubColor: "#3D8BF2",
    icon: "Leaf",
    pf: [
      {
        groupTitle: "Proteção para produtor rural",
        products: [
          {
            id: "seg-rural-pf-01",
            name: "Proteção do produtor rural",
            description:
              "Cobertura integrada para benfeitorias, máquinas, lavouras e rebanhos, dando ao produtor de alto padrão a tranquilidade para focar na produção.",
          },
          {
            id: "seg-rural-pf-02",
            name: "Proteção de lavoura e safra",
            description:
              "Sua safra protegida contra intempéries, pragas e doenças. Fenômenos climáticos e imprevistos não comprometem o resultado do seu trabalho no campo.",
          },
          {
            id: "seg-rural-pf-03",
            name: "Proteção de animais de produção",
            description:
              "Cobertura para cavalos, bovinos de elite e animais de alto valor zootécnico contra mortalidade por acidente e doença, com avaliação técnica rigorosa.",
          },
          {
            id: "seg-rural-pf-04",
            name: "Proteção do patrimônio rural",
            description:
              "Sede, imóveis e benfeitorias rurais protegidos com cobertura completa, preservando o legado rural e a continuidade da atividade produtiva.",
          },
        ],
      },
    ],
    pj: [
      {
        groupTitle: "Proteção para empresas do agronegócio",
        products: [
          {
            id: "seg-rural-pj-01",
            name: "Proteção integrada do agronegócio",
            description:
              "Solução integrada para fazendas, agroindústrias e tradings: benfeitorias, máquinas, lavouras e rebanhos com profundidade técnica e visão de longo prazo.",
          },
          {
            id: "seg-rural-pj-02",
            name: "Proteção de lavouras e safras empresariais",
            description:
              "Pré-requisito para financiamento agrícola: protege áreas e safras contra intempéries, pragas e doenças em escala empresarial.",
          },
          {
            id: "seg-rural-pj-03",
            name: "Proteção de rebanhos e pecuária",
            description:
              "Cobertura empresarial para pecuária bovina, suína e avícola, mortalidade e perdas por doença garantindo continuidade das operações.",
          },
          {
            id: "seg-rural-pj-04",
            name: "Proteção de florestas plantadas",
            description:
              "Áreas florestais de celulose, papel e reflorestamento cobertas contra incêndio, raio e explosão durante toda a maturação do investimento.",
          },
          {
            id: "seg-rural-pj-05",
            name: "Proteção de operações aquícolas",
            description:
              "Cobertura para piscicultura, carcinicultura e ostreicultura contra mortandade e perdas estruturais neste setor de alto valor agregado.",
          },
          {
            id: "seg-rural-pj-06",
            name: "Garantia de crédito rural",
            description:
              "Atua como garantia em financiamentos rurais, vinculando produção ou bens ao crédito e habilitando o produtor a acessar as melhores condições do mercado.",
          },
        ],
      },
    ],
  },

  // ─── 9. VIAGEM & MOBILIDADE GLOBAL ───────────────────────────────────────
  {
    id: "viagem-mobilidade",
    route: "/seguros/viagem-mobilidade",
    eyebrow: "VIAGENS NACIONAIS E INTERNACIONAIS",
    title: "Viagem & Mobilidade Global",
    description:
      "Proteção em deslocamentos nacionais e internacionais: saúde, bagagem, RC e cancelamento para cada tipo de viajante.",
    hubColor: "#3D8BF2",
    icon: "Plane",
    pf: [
      {
        groupTitle: "Proteção para viajantes",
        products: [
          {
            id: "seg-viag-pf-01",
            name: "Proteção em viagens internacionais",
            description:
              "Cobertura médica global irrestrita, assistência 24h em qualquer país, traslado aeromédico, bagagem extraviada e proteção jurídica, explore o mundo com liberdade total.",
          },
          {
            id: "seg-viag-pf-02",
            name: "Proteção para intercâmbio e estudos no exterior",
            description:
              "Cobertura médica integral, assistência jurídica e suporte logístico para permanências prolongadas, concentre-se na experiência, não nos imprevistos.",
          },
          {
            id: "seg-viag-pf-03",
            name: "Proteção para esportes e aventura",
            description:
              "Adrenalina e aventura fazem parte do seu estilo de vida. Cobertura para acidentes em esportes radicais e atividades de alto risco.",
          },
          {
            id: "seg-viag-pf-04",
            name: "Proteção contra cancelamento de viagem",
            description:
              "Indenização por despesas não reembolsáveis em caso de cancelamento por doença, acidente ou força maior, sua viagem planejada não vira prejuízo.",
          },
        ],
      },
    ],
    pj: [
      {
        groupTitle: "Mobilidade corporativa",
        products: [
          {
            id: "seg-viag-pj-01",
            name: "Proteção em viagens corporativas (Business Travel)",
            description:
              "Cobertura médica global, assistência 24h, repatriação e suporte jurídico integrados à política corporativa de mobilidade e conformidade internacional.",
          },
          {
            id: "seg-viag-pj-02",
            name: "Proteção de expatriados e mobilidade global",
            description:
              "Cobertura médica integral, suporte logístico e assistência jurídica para colaboradores em permanência prolongada no exterior, pilar dos programas de expatriação.",
          },
          {
            id: "seg-viag-pj-03",
            name: "Proteção de atletas e equipes profissionais",
            description:
              "Cobre atletas e equipes durante competições e treinamentos, viabilizando operações esportivas de alto nível com a segurança que patrocinadores exigem.",
          },
          {
            id: "seg-viag-pj-04",
            name: "Proteção contra cancelamento de eventos",
            description:
              "Indenização por despesas não reembolsáveis em cancelamentos corporativos, a decisão de cancelar não resulta em prejuízo financeiro adicional.",
          },
        ],
      },
    ],
  },

  // ─── 10. GRANDES RISCOS & NEGÓCIOS ───────────────────────────────────────
  {
    id: "grandes-riscos",
    route: "/seguros/grandes-riscos",
    eyebrow: "RISCOS ESPECIAIS E ALTO PATRIMÔNIO",
    title: "Grandes Riscos & Negócios",
    description:
      "Soluções para grandes exposições e nichos técnicos exclusivos, de operações de petróleo e gás a programas customizados para Family Offices.",
    hubColor: "#3D8BF2",
    icon: "Globe",
    pf: [
      {
        groupTitle: "Proteção de alto patrimônio",
        products: [
          {
            id: "seg-gr-pf-01",
            name: "Proteção integrada para alto patrimônio",
            description:
              "Programa sob medida reunindo vida, RC, kidnap & ransom e cobertura internacional em estrutura exclusiva para Family Offices e Private Wealth.",
          },
          {
            id: "seg-gr-pf-02",
            name: "Proteção contra sequestro e extorsão",
            description:
              "Perfis de alta visibilidade pública merecem proteção especializada. Cobre sequestro, extorsão e detenção ilegal com equipe de resposta a crises e total discrição.",
          },
        ],
      },
    ],
    pj: [
      {
        groupTitle: "Grandes riscos empresariais",
        products: [
          {
            id: "seg-gr-pj-01",
            name: "Proteção de operações de petróleo e gás",
            description:
              "Cobertura para plataformas, oleodutos, refinarias e operações upstream, midstream e downstream, estruturada via resseguro internacional.",
          },
          {
            id: "seg-gr-pj-02",
            name: "Proteção de riscos nucleares",
            description:
              "Instalações nucleares com cobertura altamente especializada, regulada pela CNEN e SUSEP, em parceria com as principais resseguradoras globais.",
          },
          {
            id: "seg-gr-pj-03",
            name: "Proteção de satélites e riscos aeroespaciais",
            description:
              "Cobertura para fabricação, lançamento e operação em órbita, para empresas e agências que operam na fronteira da tecnologia e inovação aeroespacial.",
          },
          {
            id: "seg-gr-pj-04",
            name: "Proteção customizada para alto patrimônio",
            description:
              "Programa estruturado reunindo vida, RC, D&O, kidnap & ransom e cobertura internacional para Family Offices, holdings e grupos empresariais complexos.",
          },
          {
            id: "seg-gr-pj-05",
            name: "Proteção de executivos contra sequestro (K&R)",
            description:
              "Cobertura K&R com equipe de resposta a crises de classe mundial e total discrição operacional, protegendo quem a empresa não pode se dar ao luxo de perder.",
          },
          {
            id: "seg-gr-pj-06",
            name: "Proteção de garantia estendida de produtos",
            description:
              "Extensão da garantia do fabricante como diferencial competitivo para varejistas e fabricantes que querem fidelizar clientes com experiência premium.",
          },
        ],
      },
    ],
  },

  // ─── 11. PREVIDÊNCIA & ACUMULAÇÃO ────────────────────────────────────────
  {
    id: "previdencia-acumulacao",
    route: "/seguros/previdencia-acumulacao",
    eyebrow: "PLANEJAMENTO DE LONGO PRAZO",
    title: "Previdência & Acumulação",
    description:
      "Acumulação financeira de longo prazo integrada ao planejamento sucessório, tributário e à estratégia de aposentadoria. Estruturada com fundos exclusivos e governança.",
    hubColor: "#3D8BF2",
    icon: "TrendingUp",
    pf: [
      {
        groupTitle: "Planejamento e acumulação pessoal",
        products: [
          {
            id: "seg-prev-pf-01",
            name: "Plano de previdência com benefício fiscal (PGBL)",
            description:
              "Deduz até 12% da renda bruta tributável no IR, acumulando recursos de longo prazo com a disciplina de quem planeja o futuro com método e visão estratégica.",
          },
          {
            id: "seg-prev-pf-02",
            name: "Plano de previdência e sucessão (VGBL)",
            description:
              "Fundos exclusivos, portabilidade flexível e gestão personalizada integrando acumulação financeira ao planejamento sucessório da família.",
          },
          {
            id: "seg-prev-pf-03",
            name: "Previdência para filhos e netos",
            description:
              "Acumulação de longo prazo para educação internacional, primeira aquisição de patrimônio e independência financeira, com o cuidado de quem pensa em gerações.",
          },
          {
            id: "seg-prev-pf-04",
            name: "Acumulação com capital garantido",
            description:
              "Estrutura dotal combinando acumulação disciplinada com garantia contratual de recebimento para planejamento sucessório com previsibilidade.",
          },
          {
            id: "seg-prev-pf-05",
            name: "Capitalização programática",
            description:
              "Poupança com propósito e sorteios: acumulação mensal com a chance de antecipar objetivos para quem quer construir reservas com disciplina.",
          },
        ],
      },
    ],
    pj: [
      {
        groupTitle: "Previdência corporativa",
        products: [
          {
            id: "seg-prev-pj-01",
            name: "Previdência empresarial coletiva (PGBL)",
            description:
              "Benefício fiscal de até 12% da renda bruta em programas de remuneração diferida, fortalecendo a proposta de valor e fidelizando executivos estratégicos.",
          },
          {
            id: "seg-prev-pj-02",
            name: "Previdência corporativa e sucessória (VGBL)",
            description:
              "Fundos exclusivos e portabilidade flexível integrando acumulação de longo prazo a remuneração diferida e transmissão de patrimônio empresarial.",
          },
          {
            id: "seg-prev-pj-03",
            name: "Capitalização empresarial e garantia locação",
            description:
              "Ferramenta versátil: garantia locatícia, incentivo comercial e fidelização de canais com liquidez programada e custo reduzido.",
          },
        ],
      },
    ],
  },

  // ─── 12. PROTEÇÃO ANIMAL & PET ────────────────────────────────────────────
  {
    id: "protecao-animal",
    route: "/seguros/protecao-animal",
    eyebrow: "PETS, EQUINOS E ANIMAIS DE VALOR",
    title: "Proteção Animal & Pet",
    description:
      "Proteção para animais de estimação, esportivos e de alto valor zootécnico, saúde veterinária, RC e mortalidade para famílias premium, criadores e haras.",
    hubColor: "#3D8BF2",
    icon: "PawPrint",
    pf: [
      {
        groupTitle: "Proteção para pets e animais",
        products: [
          {
            id: "seg-pet-pf-01",
            name: "Plano de saúde para o seu pet",
            description:
              "Consultas, exames, internação e cirurgias de cães e gatos com acesso à rede de clínicas e hospitais veterinários de referência.",
          },
          {
            id: "seg-pet-pf-02",
            name: "Proteção de vida do seu pet",
            description:
              "Indenização em caso de morte por acidente ou doença, além de cobertura para serviços funerários pet, para que você não enfrente esse momento sozinho.",
          },
          {
            id: "seg-pet-pf-03",
            name: "Proteção de responsabilidade do seu pet",
            description:
              "Cobre RC do animal por danos materiais e corporais a terceiros, protegendo você de eventuais indenizações sem que isso afete o seu patrimônio.",
          },
          {
            id: "seg-pet-pf-04",
            name: "Proteção de equinos e cavalos de valor",
            description:
              "Mortalidade, invalidez e custos veterinários especializados para cavalos de alto valor esportivo, genético ou de lazer.",
          },
          {
            id: "seg-pet-pf-05",
            name: "Proteção do pet em viagem",
            description:
              "Assistência veterinária emergencial e suporte logístico para animais em viagens nacionais e internacionais, mobilidade premium para famílias com pets.",
          },
        ],
      },
    ],
    pj: [
      {
        groupTitle: "Proteção animal empresarial",
        products: [
          {
            id: "seg-pet-pj-01",
            name: "Plano de saúde pet como benefício corporativo",
            description:
              "Saúde pet coletiva cobrindo procedimentos veterinários, internações e cirurgias para pets dos colaboradores, benefício diferenciado para atrair novas gerações.",
          },
          {
            id: "seg-pet-pj-02",
            name: "Proteção de responsabilidade de estabelecimentos pet",
            description:
              "Pet shops, hotéis e creches pet: cobertura para danos a terceiros durante a prestação de serviços, protegendo negócio e reputação.",
          },
          {
            id: "seg-pet-pj-03",
            name: "Proteção de equinos empresariais, haras e leilões",
            description:
              "Mortalidade, invalidez e custos veterinários de plantéis inteiros para haras, coudelarias e operadores de leilões equinos.",
          },
        ],
      },
    ],
  },
];

