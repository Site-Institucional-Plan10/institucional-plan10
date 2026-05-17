export interface SearchItem {
  id: string;
  label: string;
  description: string;
  category: string;
  route: string;
  anchor?: string;
  keywords: string[];
}

export const searchIndex: SearchItem[] = [
  // PÁGINAS PRINCIPAIS
  { id: "home", label: "Home", description: "Página inicial da Plan10", category: "Páginas", route: "/", keywords: ["home", "início", "principal"] },
  { id: "quem-somos", label: "Quem somos", description: "Conheça a história e os valores da Plan10", category: "Páginas", route: "/quem-somos", keywords: ["quem somos", "sobre", "história", "missão", "visão", "valores", "equipe"] },
  { id: "fale-conosco", label: "Fale conosco", description: "Entre em contato com a Plan10", category: "Páginas", route: "/fale-conosco", keywords: ["contato", "fale conosco", "mensagem", "whatsapp", "email"] },
  { id: "blog", label: "Blog Plan10", description: "Artigos, cases e dicas sobre seguros e finanças", category: "Páginas", route: "/blog", keywords: ["blog", "artigos", "notícias", "dicas", "cases"] },

  // SEGUROS
  { id: "seguros", label: "Seguros Gerais", description: "Auto, vida, residencial, viagem e empresarial", category: "Seguros", route: "/seguros", keywords: ["seguro", "seguros", "apólice", "proteção"] },
  { id: "seg-auto", label: "Seguro Auto", description: "Proteção completa para seu veículo", category: "Seguros", route: "/seguros", keywords: ["seguro auto", "seguro carro", "seguro veículo", "automóvel"] },
  { id: "seg-residencial", label: "Seguro Residencial", description: "Proteção para sua casa e patrimônio", category: "Seguros", route: "/seguros", keywords: ["seguro residencial", "seguro casa", "seguro imóvel", "residência"] },
  { id: "seg-vida", label: "Seguro de Vida", description: "Proteção financeira para você e sua família", category: "Seguros", route: "/seguros", keywords: ["seguro de vida", "vida", "proteção familiar"] },
  { id: "seg-viagem", label: "Seguro Viagem", description: "Cobertura completa para suas viagens", category: "Seguros", route: "/seguros", keywords: ["seguro viagem", "viagem", "cobertura internacional"] },
  { id: "seg-celular", label: "Seguro Celular", description: "Proteção para smartphone, notebook e tablet", category: "Seguros", route: "/seguros", keywords: ["seguro celular", "seguro smartphone", "seguro notebook", "equipamento portátil"] },
  { id: "seg-empresarial", label: "Seguro Empresarial", description: "Soluções de proteção para empresas", category: "Seguros", route: "/seguros", keywords: ["seguro empresarial", "seguro empresa", "pj", "responsabilidade civil"] },

  // SAÚDE
  { id: "saude", label: "Saúde e Odonto", description: "Planos de saúde e odontológicos", category: "Saúde", route: "/saude", keywords: ["saúde", "plano de saúde", "médico", "odontológico"] },
  { id: "saude-individual", label: "Plano Individual", description: "Plano de saúde para pessoa física", category: "Saúde", route: "/saude", keywords: ["plano individual", "plano pessoal", "saúde individual"] },
  { id: "saude-familiar", label: "Plano Familiar", description: "Cobertura completa para toda a família", category: "Saúde", route: "/saude", keywords: ["plano familiar", "família", "saúde família", "dependentes"] },
  { id: "saude-pme", label: "Plano PME", description: "Planos para empresas com até 29 vidas", category: "Saúde", route: "/saude", keywords: ["pme", "plano pme", "pequena empresa", "plano empresarial saúde", "até 29 vidas"] },
  { id: "saude-odonto", label: "Plano Odontológico", description: "Cobertura dental individual e empresarial", category: "Saúde", route: "/saude", keywords: ["odonto", "odontológico", "dentista", "dental"] },

  // CONSÓRCIO
  { id: "consorcios", label: "Consórcio", description: "Imóveis, veículos e serviços sem juros", category: "Consórcio", route: "/consorcios", keywords: ["consórcio", "consorcio", "sem juros", "contemplação"] },
  { id: "cons-imovel", label: "Consórcio Imobiliário", description: "Compre seu imóvel sem juros", category: "Consórcio", route: "/consorcios", keywords: ["consórcio imóvel", "consórcio casa", "imobiliário", "apartamento", "terreno", "fgts"] },
  { id: "cons-veiculo", label: "Consórcio de Veículos", description: "Carros e motos sem entrada e sem juros", category: "Consórcio", route: "/consorcios", keywords: ["consórcio carro", "consórcio veículo", "consórcio moto", "automóvel"] },
  { id: "cons-pesados", label: "Consórcio de Pesados", description: "Caminhões, ônibus e maquinário", category: "Consórcio", route: "/consorcios", keywords: ["caminhão", "ônibus", "pesados", "maquinário", "veículos pesados"] },
  { id: "fgts", label: "Usar FGTS no Consórcio", description: "Como usar seu FGTS para lance ou entrada", category: "Consórcio", route: "/consorcios", keywords: ["fgts", "fundo de garantia", "lance", "fgts consórcio"] },

  // FINANÇAS
  { id: "financas", label: "Produtos Financeiros", description: "Crédito, investimentos e consultoria financeira", category: "Finanças", route: "/financas", keywords: ["finanças", "crédito", "financeiro", "empréstimo", "investimento"] },
  { id: "fin-pessoal", label: "Crédito Pessoal", description: "Crédito para pessoa física", category: "Finanças", route: "/financas", keywords: ["crédito pessoal", "empréstimo pessoal", "dinheiro rápido"] },
  { id: "fin-consignado", label: "Crédito Consignado", description: "Crédito descontado em folha de pagamento", category: "Finanças", route: "/financas", keywords: ["consignado", "crédito consignado", "desconto em folha", "servidor público"] },
  { id: "fin-portabilidade", label: "Portabilidade de Crédito", description: "Reduza os juros migrando sua dívida", category: "Finanças", route: "/financas", keywords: ["portabilidade", "portabilidade crédito", "reduzir juros", "migrar dívida"] },
  { id: "fin-dividas", label: "Reestruturação de Dívidas", description: "Reorganize suas finanças com orientação", category: "Finanças", route: "/financas", keywords: ["dívida", "dívidas", "reestruturação", "reorganizar finanças", "negativado"] },

  // SERVIÇOS 24H
  { id: "servicos", label: "Serviços 24h", description: "Assistência veicular e residencial", category: "Serviços", route: "/servicos-24h", keywords: ["serviços", "assistência", "24h", "emergência"] },
  { id: "srv-guincho", label: "Guincho", description: "Reboque e transporte veicular 24 horas", category: "Serviços", route: "/servicos-24h", keywords: ["guincho", "reboque", "pane", "socorro veicular"] },
  { id: "srv-chaveiro", label: "Chaveiro", description: "Abertura de fechaduras residencial e veicular", category: "Serviços", route: "/servicos-24h", keywords: ["chaveiro", "fechadura", "trancado", "abertura de porta"] },
  { id: "srv-pneu", label: "Troca de Pneu", description: "Assistência para troca de pneu na estrada", category: "Serviços", route: "/servicos-24h", keywords: ["pneu", "troca de pneu", "furo", "pneu furado"] },
  { id: "srv-eletrica", label: "Elétrica Veicular", description: "Assistência elétrica para veículos", category: "Serviços", route: "/servicos-24h", keywords: ["elétrica", "bateria", "pane elétrica", "carga de bateria"] },
  { id: "srv-residencial", label: "Assistência Residencial", description: "Encanamento, elétrica e muito mais em casa", category: "Serviços", route: "/servicos-24h", keywords: ["assistência residencial", "encanamento", "elétrica residencial", "vazamento"] },
];
