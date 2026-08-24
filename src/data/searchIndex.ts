export interface SearchItem {
  id: string;
  label: string;
  description: string;
  category: string;
  route: string;
  anchor?: string;
  keywords: string[];
}

// Índice da busca do header. Aponta para a arquitetura atual (soluções,
// mobilidade, blog). As palavras-chave mantêm os termos antigos (seguro,
// consórcio, etc.) para que quem busca por eles chegue na página certa.
export const searchIndex: SearchItem[] = [
  // PÁGINAS
  { id: "home", label: "Home", description: "Página inicial da Plan10", category: "Páginas", route: "/", keywords: ["home", "início", "principal"] },
  { id: "solucoes", label: "Mapa de soluções", description: "As cinco soluções Plan10", category: "Páginas", route: "/solucoes", keywords: ["soluções", "solucoes", "mapa", "tudo", "serviços"] },
  { id: "em-um-clique", label: "Plan10 em um clique", description: "Encontre por tema ou necessidade", category: "Páginas", route: "/em-um-clique", keywords: ["em um clique", "índice", "temas", "necessidade", "busca"] },
  { id: "quem-somos", label: "Quem somos", description: "A consultoria por trás das soluções", category: "Páginas", route: "/quem-somos", keywords: ["quem somos", "sobre", "história", "missão", "visão", "valores", "equipe"] },
  { id: "blog", label: "Blog Plan10", description: "Conteúdos, leitura de mercado e cases", category: "Páginas", route: "/blog", keywords: ["blog", "artigos", "conteúdo", "dicas", "cases", "mercado"] },
  { id: "fale-conosco", label: "Fale conosco", description: "Fale com um consultor Plan10", category: "Páginas", route: "/fale-conosco", keywords: ["contato", "fale conosco", "mensagem", "whatsapp", "email", "consultor"] },

  // SAÚDE
  { id: "saude", label: "Saúde e vida saudável", description: "Cuidado, acesso, prevenção e bem-estar", category: "Saúde", route: "/solucoes/saude", keywords: ["saúde", "plano de saúde", "médico", "odontológico", "odonto", "dentista", "bem-estar", "pet"] },
  { id: "saude-empresa", label: "Saúde para empresas", description: "Benefício de saúde para times", category: "Saúde", route: "/solucoes/saude", keywords: ["plano empresarial", "pme", "benefício", "colaboradores", "saúde corporativa"] },

  // PROTEÇÃO
  { id: "protecao", label: "Proteção à vida e ao patrimônio", description: "Vida, patrimônio, riscos e responsabilidades", category: "Proteção", route: "/solucoes/protecao", keywords: ["seguro", "seguros", "apólice", "proteção", "vida", "residencial", "casa", "imóvel", "patrimônio", "empresarial", "responsabilidade civil", "cyber"] },
  { id: "protecao-vida", label: "Proteção de vida e renda", description: "Segurança financeira para a família", category: "Proteção", route: "/solucoes/protecao", keywords: ["seguro de vida", "renda", "família", "proteção familiar", "sucessão"] },

  // SOLUÇÕES FINANCEIRAS
  { id: "financeiras", label: "Soluções financeiras", description: "Crédito, liquidez, investimentos e previdência", category: "Finanças", route: "/solucoes/financeiras", keywords: ["finanças", "crédito", "empréstimo", "consignado", "portabilidade", "dívida", "investimento", "previdência", "liquidez", "capital de giro"] },

  // CRESCIMENTO E MOBILIDADE
  { id: "crescimento", label: "Crescimento e mobilidade", description: "Aquisição, veículos e expansão", category: "Crescimento", route: "/solucoes/crescimento", keywords: ["crescimento", "conquista", "aquisição", "consórcio", "consorcio", "veículo", "carro", "imóvel", "expansão", "sem juros", "fgts"] },
  { id: "mobilidade", label: "Mobilidade: montadoras e modelos", description: "Ficha de cada carro, proteção e aquisição", category: "Mobilidade", route: "/mobilidade", keywords: ["mobilidade", "montadora", "modelo", "carro", "veículo", "ficha técnica", "seminovo", "lançamento", "frota"] },

  // ASSISTÊNCIA
  { id: "assistencia", label: "Assistência pessoal e empresarial", description: "Suporte, manutenção e continuidade", category: "Assistência", route: "/solucoes/assistencia", keywords: ["assistência", "24h", "emergência", "guincho", "chaveiro", "residencial", "encanador", "eletricista", "viagem", "continuidade", "suporte"] },
];
