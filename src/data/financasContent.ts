// Conteúdo consultivo das categorias financeiras.
// Fonte única: 08_HUB_FINANCAS.xlsx (Plan Group), coluna TEXTO FINAL PARA PUBLICAÇÃO.
// Texto aprovado pelo cliente; não editar aqui sem atualizar a planilha de origem.

export interface FinFaq { q: string; a: string }
export interface FinCategoriaContent {
  identidade: string;
  hero: string;
  subHero: string;
  abertura: string;
  criterios: string;
  modalidades: string;
  valor: string;
  textoConsultivo: string;
  faq: FinFaq[];
  cross: string[];
}

export const FINANCAS_CONTENT: Record<string, FinCategoriaContent> = {
  "credito-e-liquidez": {
    identidade: "Crédito e liquidez | Decisão financeira com finalidade e critério",
    hero: "Organize crédito e liquidez com leitura de objetivo, prazo, documentação e viabilidade.",
    subHero: "Uma decisão bem fundamentada considera necessidade de caixa, antecipação, reserva de crédito, portabilidade e compromissos de curto prazo antes de comparar alternativas.",
    abertura: "Entenda como finalidade do recurso, prazo, impacto no fluxo e documentação influenciam a escolha adequada.",
    criterios: "Quando necessidade de caixa, antecipação, reserva de crédito, portabilidade e compromissos de curto prazo precisam ser avaliados com critério.",
    modalidades: "Opções de crédito e liquidez · Requisitos por perfil · Documentação · Viabilidade · Próximo passo orientado",
    valor: "Crédito e liquidez: decisão financeira mais clara, objetiva e bem conduzida.",
    textoConsultivo: "Crédito e liquidez ganha valor quando finalidade, critérios, prazo e documentação são analisados antes da escolha.",
    faq: [
      { q: "Quando faz sentido avaliar crédito e liquidez?", a: "Quando necessidade de caixa, antecipação, reserva de crédito, portabilidade e compromissos de curto prazo impactam caixa, patrimônio, rotina ou planos futuros." },
      { q: "O que validar antes de decidir sobre crédito e liquidez?", a: "Perfil, finalidade do recurso, documentação, elegibilidade, custo total, prazo e impacto no caixa." },
      { q: "Como comparar alternativas de crédito?", a: "As opções disponíveis variam conforme perfil, elegibilidade, documentação e condições do parceiro." },
      { q: "Pessoa física também acessa essas linhas?", a: "Sim, crédito consignado, crédito pessoal e antecipação de IR ou FGTS são voltados justamente para pessoa física." },
      { q: "Quais soluções podem complementar esta escolha?", a: "Proteção pode complementar a decisão quando renda, patrimônio ou responsabilidades também precisam ser preservados. Crescimento e mobilidade pode complementar quando o crédito sustenta aquisição, expansão ou mobilidade." },
    ],
    cross: [
      "Proteção pode complementar a decisão quando renda, patrimônio ou responsabilidades também precisam ser preservados.",
      "Crescimento e mobilidade pode complementar quando o crédito sustenta aquisição, expansão ou mobilidade.",
    ],
  },
  "financiamentos": {
    identidade: "Financiamentos | Decisão financeira com finalidade e critério",
    hero: "Organize financiamentos de bens e projetos com leitura de objetivo, prazo, documentação e viabilidade.",
    subHero: "Uma escolha bem embasada considera aquisição, projeto, bem financiado, documentação, prazo e capacidade de pagamento antes de comparar alternativas.",
    abertura: "Entenda como bem desejado, finalidade, entrada, prazo, documentação e viabilidade influenciam a escolha adequada.",
    criterios: "Use esta categoria quando aquisição, projeto, bem financiado, documentação, prazo e capacidade de pagamento precisam ser avaliados com critério.",
    modalidades: "Opções de financiamentos de bens e projetos · Requisitos por perfil · Documentação · Viabilidade · Próximo passo orientado",
    valor: "Objetivo definido · Prazo compreendido · Viabilidade avaliada · Decisão com mais controle",
    textoConsultivo: "Financiamentos ganha valor quando finalidade, critérios, prazo e documentação são analisados antes da escolha.",
    faq: [
      { q: "Quando faz sentido avaliar financiamentos de bens e projetos?", a: "Quando aquisição, projeto, bem financiado, documentação, prazo e capacidade de pagamento impactam caixa, patrimônio, rotina ou planos futuros." },
      { q: "O que validar antes de financiar um bem ou projeto?", a: "Perfil, valor de entrada, documentação, elegibilidade, condições comerciais e prazo do contrato." },
      { q: "Como comparar opções de financiamento?", a: "Compare pelo objetivo, pelo impacto no fluxo e por bem desejado, finalidade, entrada, prazo, documentação e viabilidade." },
      { q: "Esta análise já fecha o financiamento?", a: "Ela organiza a decisão e prepara a conversa com o consultor; a contratação depende de análise e condições vigentes." },
      { q: "Quais frentes podem complementar esta escolha?", a: "Crescimento e mobilidade pode complementar quando o financiamento faz parte de uma estratégia de aquisição planejada. Proteção pode ser relevante quando o bem financiado também precisa ser protegido." },
    ],
    cross: [
      "Crescimento e mobilidade pode complementar quando o financiamento faz parte de uma estratégia de aquisição planejada.",
      "Proteção pode ser relevante quando o bem financiado também precisa ser protegido.",
    ],
  },
  "capitalizacao": {
    identidade: "Capitalização | Decisão financeira com finalidade e critério",
    hero: "Organize capitalização, caução e reserva programada com leitura de objetivo, prazo, documentação e viabilidade.",
    subHero: "Uma decisão bem orientada considera caução, compromisso financeiro, reserva, locação e finalidade planejada antes de comparar alternativas.",
    abertura: "Entenda como finalidade, prazo, regras do título, elegibilidade e uso como alternativa de garantia influenciam a escolha adequada.",
    criterios: "Use esta categoria quando caução, compromisso financeiro, reserva, locação e finalidade planejada precisam ser avaliados com critério.",
    modalidades: "Opções de capitalização, caução e reserva programada · Requisitos por perfil · Documentação · Viabilidade · Próximo passo orientado",
    valor: "Objetivo definido · Prazo compreendido · Viabilidade avaliada · Decisão com mais controle",
    textoConsultivo: "Capitalização ganha valor quando finalidade, critérios, prazo e documentação são analisados antes da escolha.",
    faq: [
      { q: "Quando faz sentido avaliar capitalização, caução e reserva programada?", a: "Quando caução, compromisso financeiro, reserva, locação e finalidade planejada impactam caixa, patrimônio, rotina ou planos futuros." },
      { q: "O que validar antes de contratar uma reserva programada?", a: "Finalidade, prazo, regras de resgate, documentação e compromisso mensal." },
      { q: "Como comparar formatos de reserva e caução?", a: "Compare pelo objetivo, pelo impacto no fluxo e por finalidade, prazo, regras do título, elegibilidade e uso como alternativa de garantia." },
      { q: "Este passo já conclui a contratação?", a: "Ele orienta a escolha; contratação e condições dependem de análise e das regras vigentes." },
      { q: "O que mais pode apoiar esta escolha?", a: "Garantias financeiras complementa a análise quando a capitalização se conecta a aluguel, caução ou compromisso formal. Soluções de proteção podem ser relevantes quando o compromisso financeiro envolve patrimônio ou continuidade." },
    ],
    cross: [
      "Garantias financeiras complementa a análise quando a capitalização se conecta a aluguel, caução ou compromisso formal.",
      "Soluções de proteção podem ser relevantes quando o compromisso financeiro envolve patrimônio ou permanência.",
    ],
  },
  "garantias-financeiras": {
    identidade: "Garantias financeiras | Decisão financeira com finalidade e critério",
    hero: "Organize garantias financeiras e compromissos formais com leitura de objetivo, prazo, documentação e viabilidade.",
    subHero: "Uma escolha consistente considera carta garantia, fiança, caução, locação, contrato e credibilidade financeira antes de comparar alternativas.",
    abertura: "Entenda como documentação, exigência, garantia solicitada, prazo e capacidade de cumprir o compromisso influenciam a escolha adequada.",
    criterios: "Use esta categoria quando carta garantia, fiança, caução, locação, contrato e credibilidade financeira precisam ser avaliados com critério.",
    modalidades: "Opções de garantias financeiras e compromissos formais · Requisitos por perfil · Documentação · Viabilidade · Próximo passo orientado",
    valor: "Objetivo definido · Prazo compreendido · Viabilidade avaliada · Decisão com mais controle",
    textoConsultivo: "Garantias financeiras ganham valor quando finalidade, critérios, prazo e documentação são analisados antes da escolha.",
    faq: [
      { q: "Quando faz sentido avaliar garantias financeiras e compromissos formais?", a: "Quando carta garantia, fiança, caução, locação, contrato e credibilidade financeira impactam caixa, patrimônio, rotina ou planos futuros." },
      { q: "O que validar antes de formalizar uma garantia?", a: "Exigência do contrato, documentação, elegibilidade, custo e prazo de vigência." },
      { q: "Como comparar tipos de garantia?", a: "Compare pelo objetivo, pelo impacto no fluxo e por documentação, exigência, garantia solicitada, prazo e capacidade de cumprir o compromisso." },
      { q: "Esta etapa já emite a garantia?", a: "Ela organiza a decisão; emissão e condições dependem de análise." },
      { q: "Quais frentes ampliam esta decisão?", a: "Proteção à vida e ao patrimônio pode complementar a decisão quando contratos e responsabilidades se conectam. Crédito e liquidez pode ser útil quando a garantia também exige fluxo, capital ou suporte financeiro." },
    ],
    cross: [
      "Proteção à vida e ao patrimônio pode complementar a decisão quando contratos e responsabilidades se conectam.",
      "Crédito e liquidez pode ser útil quando a garantia também exige fluxo, capital ou suporte financeiro.",
    ],
  },
  "investimentos-previdencia-e-reservas": {
    identidade: "Investimentos, previdência e reservas | Decisão financeira com finalidade e critério",
    hero: "Organize investimentos, previdência e patrimônio financeiro com leitura de objetivo, prazo, documentação e viabilidade.",
    subHero: "Uma decisão bem fundamentada considera reserva, previdência, sucessão, patrimônio financeiro, prazo e perfil de investidor antes de comparar alternativas.",
    abertura: "Entenda como objetivo, horizonte, perfil, liquidez, tributação, governança financeira e acompanhamento influenciam a escolha adequada.",
    criterios: "Use esta categoria quando reserva, previdência, sucessão, patrimônio financeiro, prazo e perfil de investidor precisam ser avaliados com critério.",
    modalidades: "Opções de investimentos, previdência e patrimônio financeiro · Requisitos por perfil · Documentação · Viabilidade · Próximo passo orientado",
    valor: "Objetivo definido · Prazo compreendido · Viabilidade avaliada · Decisão com mais controle",
    textoConsultivo: "Investimentos e previdência ganham valor quando finalidade, critérios, prazo e documentação são analisados antes da escolha.",
    faq: [
      { q: "Quando faz sentido avaliar investimentos, previdência e patrimônio financeiro?", a: "Quando reserva, previdência, sucessão, patrimônio financeiro, prazo e perfil de investidor impactam caixa, patrimônio, rotina ou planos futuros." },
      { q: "O que validar antes de investir ou planejar previdência?", a: "Objetivo, horizonte, perfil de investidor, liquidez necessária, tributação e regras de resgate." },
      { q: "Como comparar opções de investimento e previdência?", a: "A etapa organiza objetivo, horizonte, liquidez e perfil. Qualquer aplicação depende de adequação, documentação e condições disponíveis." },
      { q: "Esta etapa já aplica recursos?", a: "Ela organiza a decisão e prepara a conversa com o consultor; aplicações dependem de análise e adequação de perfil." },
      { q: "O que pode complementar este planejamento?", a: "Proteção pode complementar a estrutura quando o planejamento envolve sucessão, renda ou continuidade familiar. Soluções financeiras de crédito e liquidez podem ser avaliadas quando o patrimônio precisa de flexibilidade." },
    ],
    cross: [
      "Proteção pode complementar a estrutura quando o planejamento envolve sucessão, renda ou permanência familiar.",
      "Soluções financeiras de crédito e liquidez podem ser avaliadas quando o patrimônio precisa de flexibilidade.",
    ],
  },
  "servicos-financeiros-e-contas": {
    identidade: "Serviços financeiros e contas | Decisão financeira com finalidade e critério",
    hero: "Organize serviços financeiros, contas, cartões e conveniências com leitura de objetivo, prazo, documentação e viabilidade.",
    subHero: "Uma escolha bem embasada considera cartões, conta digital, pedágio, estacionamento, rotina de pagamentos e controle financeiro antes de comparar alternativas.",
    abertura: "Entenda como uso recorrente, controle, conveniência, perfil de consumo, gestão de despesas e experiência de uso influenciam a escolha adequada.",
    criterios: "Use esta categoria quando cartões, conta digital, pedágio, estacionamento, rotina de pagamentos e controle financeiro precisam ser avaliados com critério.",
    modalidades: "Opções de serviços financeiros, contas, cartões e conveniências · Requisitos por perfil · Documentação · Viabilidade · Próximo passo orientado",
    valor: "Objetivo definido · Prazo compreendido · Viabilidade avaliada · Decisão com mais controle",
    textoConsultivo: "Serviços financeiros e contas ganham valor quando finalidade, critérios, prazo e documentação são analisados antes da escolha.",
    faq: [
      { q: "Quando faz sentido avaliar serviços financeiros, contas, cartões e conveniências?", a: "Quando cartões, conta digital, pedágio, estacionamento, rotina de pagamentos e controle financeiro impactam caixa, patrimônio, rotina ou planos futuros." },
      { q: "O que validar antes de escolher contas e cartões?", a: "Uso recorrente, custos, benefícios, elegibilidade e integração com a rotina financeira." },
      { q: "Como comparar contas e cartões?", a: "Compare pelo objetivo, pelo impacto no fluxo e por uso recorrente, controle, conveniência, perfil de consumo, gestão de despesas e experiência de uso." },
      { q: "Esta etapa já contrata o serviço?", a: "Ela orienta a escolha; contratação e condições dependem de análise do emissor." },
      { q: "Quais conveniências podem complementar esta escolha?", a: "Assistência pessoal e empresarial pode complementar quando conveniência, mobilidade e rotina entram na decisão. Crédito e liquidez pode ser relevante quando o uso financeiro se conecta a fluxo, recebíveis ou capital de giro." },
    ],
    cross: [
      "Assistência pessoal e empresarial pode complementar quando conveniência, mobilidade e rotina entram na decisão.",
      "Crédito e liquidez pode ser relevante quando o uso financeiro se conecta a fluxo, recebíveis ou capital de giro.",
    ],
  },
};

export function finContentFor(categoriaSlug: string): FinCategoriaContent | undefined {
  return FINANCAS_CONTENT[categoriaSlug];
}
