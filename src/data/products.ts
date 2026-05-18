export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  imageSlot: boolean;
}

export interface ProductGroup {
  groupTitle: string;
  products: Product[];
}

// ─────────────────────────────────────────────
// SAÚDE
// ─────────────────────────────────────────────

export const saudePF: ProductGroup[] = [
  {
    groupTitle: "Planos de saúde",
    products: [
      { id: "saude-pf-01", name: "Plano de saúde individual e familiar", description: "Cobertura médica e hospitalar para você e sua família, com acesso às maiores redes credenciadas do país.", category: "saude", imageSlot: true },
      { id: "saude-pf-02", name: "Plano de saúde familiar", description: "Proteção completa para toda a família em uma única apólice, com flexibilidade de rede e cobertura ampla.", category: "saude", imageSlot: true },
      { id: "saude-pf-03", name: "Plano de saúde familiar premium", description: "Cobertura diferenciada para famílias que exigem excelência no atendimento médico e hospitalar.", category: "saude", imageSlot: true },
      { id: "saude-pf-04", name: "Plano de saúde individual", description: "Assistência médica personalizada para sua rotina, com cobertura de consultas, exames e internações.", category: "saude", imageSlot: true },
      { id: "saude-pf-05", name: "Plano de saúde individual por adesão", description: "Acesso a planos coletivos com mensalidades reduzidas por meio de associações e entidades parceiras.", category: "saude", imageSlot: true },
      { id: "saude-pf-06", name: "Plano de saúde individual premium", description: "Atendimento de alto padrão com cobertura nacional, sem restrição de rede e carências diferenciadas.", category: "saude", imageSlot: true },
    ],
  },
  {
    groupTitle: "Seguro saúde",
    products: [
      { id: "saude-pf-07", name: "Seguro saúde individual", description: "Proteção financeira contra despesas médicas inesperadas, com reembolso ágil e coberturas flexíveis.", category: "saude", imageSlot: true },
      { id: "saude-pf-08", name: "Seguro saúde individual premium", description: "Cobertura premium com reembolso ilimitado, acesso a hospitais de referência e assistência internacional.", category: "saude", imageSlot: true },
    ],
  },
  {
    groupTitle: "Planos odontológicos",
    products: [
      { id: "saude-pf-09", name: "Plano odontológico individual e familiar", description: "Cuidados com a saúde bucal para você e sua família, com ampla rede de dentistas credenciados.", category: "saude", imageSlot: true },
      { id: "saude-pf-10", name: "Plano odontológico familiar", description: "Cobertura odontológica completa para toda a família em um único plano acessível.", category: "saude", imageSlot: true },
      { id: "saude-pf-11", name: "Plano odontológico familiar premium", description: "Tratamentos odontológicos de alto padrão incluindo ortodontia, implantes e procedimentos estéticos.", category: "saude", imageSlot: true },
      { id: "saude-pf-12", name: "Plano odontológico individual", description: "Assistência odontológica individual com cobertura de consultas, restaurações e tratamentos preventivos.", category: "saude", imageSlot: true },
      { id: "saude-pf-13", name: "Plano odontológico individual premium", description: "Plano odontológico diferenciado com cobertura ampliada e acesso a clínicas de referência.", category: "saude", imageSlot: true },
    ],
  },
  {
    groupTitle: "Saúde PET",
    products: [
      { id: "saude-pf-14", name: "Plano de saúde PET", description: "Proteção veterinária para seu animal de estimação, com consultas, exames e internações cobertas.", category: "saude", imageSlot: true },
    ],
  },
];

export const saudePJ: ProductGroup[] = [
  {
    groupTitle: "Planos de saúde empresariais",
    products: [
      { id: "saude-pj-01", name: "Plano de saúde empresarial", description: "Benefício corporativo de saúde para sua equipe, com condições diferenciadas e ampla cobertura.", category: "saude", imageSlot: true },
      { id: "saude-pj-02", name: "Plano de saúde empresarial premium", description: "Plano de alto padrão para empresas que valorizam o bem-estar e a retenção de talentos.", category: "saude", imageSlot: true },
      { id: "saude-pj-03", name: "Plano de saúde empresarial ambulatorial", description: "Cobertura focada em consultas e exames ambulatoriais, ideal para empresas que buscam custo-benefício.", category: "saude", imageSlot: true },
      { id: "saude-pj-04", name: "Plano de saúde empresarial por adesão", description: "Modalidade coletiva por adesão com mensalidades competitivas para grupos empresariais.", category: "saude", imageSlot: true },
      { id: "saude-pj-05", name: "Plano de saúde empresarial com coparticipação", description: "Redução de custos para a empresa com modelo de coparticipação, mantendo qualidade no atendimento.", category: "saude", imageSlot: true },
      { id: "saude-pj-06", name: "Plano de saúde empresarial com obstetrícia", description: "Cobertura completa incluindo assistência à gravidez, parto e pós-parto para colaboradoras.", category: "saude", imageSlot: true },
      { id: "saude-pj-07", name: "Plano de saúde para grandes empresas", description: "Soluções personalizadas de saúde corporativa para organizações acima de 200 vidas.", category: "saude", imageSlot: true },
      { id: "saude-pj-08", name: "Plano de saúde empresarial hospitalar", description: "Cobertura hospitalar completa para internações e cirurgias, sem cobertura ambulatorial.", category: "saude", imageSlot: true },
      { id: "saude-pj-09", name: "Plano de saúde empresarial MEI", description: "Opção acessível e eficiente para microempreendedores individuais e seus dependentes.", category: "saude", imageSlot: true },
      { id: "saude-pj-10", name: "Plano de saúde empresarial nacional", description: "Cobertura em todo o território nacional, ideal para empresas com equipes distribuídas.", category: "saude", imageSlot: true },
      { id: "saude-pj-11", name: "Plano de saúde empresarial PME", description: "Plano corporativo especialmente estruturado para pequenas e médias empresas de até 29 vidas.", category: "saude", imageSlot: true },
      { id: "saude-pj-12", name: "Plano de saúde empresarial regional", description: "Cobertura regional com rede credenciada concentrada na área de atuação da empresa.", category: "saude", imageSlot: true },
      { id: "saude-pj-13", name: "Plano de saúde empresarial sem coparticipação", description: "Cobertura integral sem custo adicional ao colaborador no momento do atendimento.", category: "saude", imageSlot: true },
      { id: "saude-pj-14", name: "Plano de saúde empresarial com telemedicina", description: "Inclui consultas médicas online 24 horas, reduzindo absenteísmo e custos operacionais.", category: "saude", imageSlot: true },
    ],
  },
  {
    groupTitle: "Seguro saúde empresarial",
    products: [
      { id: "saude-pj-15", name: "Seguro saúde empresarial", description: "Proteção financeira coletiva para despesas médicas dos colaboradores, com reembolso ágil.", category: "saude", imageSlot: true },
      { id: "saude-pj-16", name: "Seguro saúde empresarial premium", description: "Cobertura de alto padrão com reembolso ampliado e acesso a hospitais de referência nacional.", category: "saude", imageSlot: true },
    ],
  },
  {
    groupTitle: "Planos odontológicos empresariais",
    products: [
      { id: "saude-pj-17", name: "Plano odontológico empresarial", description: "Benefício odontológico corporativo com ampla rede de clínicas e dentistas credenciados.", category: "saude", imageSlot: true },
      { id: "saude-pj-18", name: "Plano odontológico empresarial premium", description: "Cobertura odontológica diferenciada incluindo ortodontia e procedimentos de alta complexidade.", category: "saude", imageSlot: true },
      { id: "saude-pj-19", name: "Seguro odontológico empresarial", description: "Proteção financeira para despesas odontológicas dos colaboradores, com reembolso facilitado.", category: "saude", imageSlot: true },
      { id: "saude-pj-20", name: "Seguro odontológico empresarial premium", description: "Reembolso ampliado para procedimentos odontológicos especializados e estéticos.", category: "saude", imageSlot: true },
    ],
  },
  {
    groupTitle: "Saúde ocupacional e qualidade de vida",
    products: [
      { id: "saude-pj-21", name: "Programa de saúde ocupacional", description: "Gestão completa da saúde no ambiente de trabalho, com exames admissionais, periódicos e demissionais.", category: "saude", imageSlot: true },
      { id: "saude-pj-22", name: "Saúde ocupacional empresarial", description: "Conformidade com a legislação trabalhista e cuidado preventivo com a saúde dos colaboradores.", category: "saude", imageSlot: true },
      { id: "saude-pj-23", name: "Programa de qualidade de vida", description: "Iniciativas estruturadas para promover bem-estar físico e mental no ambiente corporativo.", category: "saude", imageSlot: true },
      { id: "saude-pj-24", name: "Planos de qualidade de vida", description: "Soluções integradas de saúde preventiva e bem-estar para equipes de alta performance.", category: "saude", imageSlot: true },
      { id: "saude-pj-25", name: "Proteção medicamentos", description: "Subsídio ou reembolso de medicamentos para colaboradores, reduzindo custos e aumentando adesão ao tratamento.", category: "saude", imageSlot: true },
    ],
  },
];

// ─────────────────────────────────────────────
// CONSÓRCIOS
// ─────────────────────────────────────────────

export const consorciosPF: ProductGroup[] = [
  {
    groupTitle: "Consórcio imobiliário",
    products: [
      { id: "cons-pf-01", name: "Consórcio de imóveis", description: "Planejamento inteligente para adquirir seu imóvel sem juros, com suporte consultivo em todas as etapas.", category: "consorcios", imageSlot: true },
      { id: "cons-pf-02", name: "Consórcio de apartamento", description: "Realize o sonho do apartamento próprio com parcelas acessíveis e sem incidência de juros.", category: "consorcios", imageSlot: true },
      { id: "cons-pf-03", name: "Consórcio de casa", description: "Conquiste sua casa própria com planejamento financeiro e orientação especializada da Plan10.", category: "consorcios", imageSlot: true },
      { id: "cons-pf-04", name: "Consórcio de construção", description: "Crédito planejado para construir do zero, com uso do FGTS e acompanhamento de lance estratégico.", category: "consorcios", imageSlot: true },
      { id: "cons-pf-05", name: "Consórcio de terreno", description: "Adquira seu terreno sem juros e com flexibilidade de prazo, ideal para quem planeja construir no futuro.", category: "consorcios", imageSlot: true },
    ],
  },
  {
    groupTitle: "Consórcio de veículos",
    products: [
      { id: "cons-pf-06", name: "Consórcio de automóvel", description: "Troque ou adquira seu carro sem pagar juros, com parcelas que cabem no seu orçamento.", category: "consorcios", imageSlot: true },
      { id: "cons-pf-07", name: "Consórcio de caminhão", description: "Invista no seu caminhão com planejamento e sem encargos financeiros, aumentando sua capacidade produtiva.", category: "consorcios", imageSlot: true },
      { id: "cons-pf-08", name: "Consórcio de moto", description: "Adquira sua motocicleta com parcelas acessíveis e sem juros, através do consórcio.", category: "consorcios", imageSlot: true },
    ],
  },
  {
    groupTitle: "Consórcio de pesados",
    products: [
      { id: "cons-pf-09", name: "Consórcio de veículo pesado", description: "Planejamento financeiro para aquisição de veículos pesados com crédito flexível e sem juros.", category: "consorcios", imageSlot: true },
      { id: "cons-pf-10", name: "Consórcio de equipamento pesado", description: "Acesse crédito para equipamentos de grande porte com condições planejadas e sem taxas de juros.", category: "consorcios", imageSlot: true },
      { id: "cons-pf-11", name: "Consórcio de máquina pesada", description: "Renove ou amplie seu maquinário com consórcio estruturado e acompanhamento consultivo.", category: "consorcios", imageSlot: true },
    ],
  },
  {
    groupTitle: "Consórcio de serviços",
    products: [
      { id: "cons-pf-12", name: "Consórcio de procedimento estético", description: "Planeje seus procedimentos estéticos com crédito sem juros e parcelas acessíveis.", category: "consorcios", imageSlot: true },
      { id: "cons-pf-13", name: "Consórcio de cursos e estudo", description: "Invista na sua educação ou da sua família com crédito planejado sem encargos.", category: "consorcios", imageSlot: true },
      { id: "cons-pf-14", name: "Consórcio de eletrodomésticos", description: "Renove os eletrodomésticos da sua casa com planejamento financeiro e sem juros.", category: "consorcios", imageSlot: true },
      { id: "cons-pf-15", name: "Consórcio de evento", description: "Realize seu evento especial com tranquilidade financeira por meio do consórcio de serviços.", category: "consorcios", imageSlot: true },
      { id: "cons-pf-16", name: "Consórcio de festa", description: "Planeje sua celebração com crédito sem juros e parcelas mensais que se encaixam no seu orçamento.", category: "consorcios", imageSlot: true },
      { id: "cons-pf-17", name: "Consórcio de móveis", description: "Adquira os móveis que você deseja sem comprometer suas finanças com juros bancários.", category: "consorcios", imageSlot: true },
      { id: "cons-pf-18", name: "Consórcio de placa solar", description: "Invista em energia solar com consórcio, reduzindo sua conta de energia sem custo imediato elevado.", category: "consorcios", imageSlot: true },
      { id: "cons-pf-19", name: "Consórcio de viagem", description: "Realize a viagem dos seus sonhos com planejamento antecipado e crédito sem juros.", category: "consorcios", imageSlot: true },
    ],
  },
];

export const consorciosPJ: ProductGroup[] = [
  {
    groupTitle: "Consórcio empresarial imobiliário",
    products: [
      { id: "cons-pj-01", name: "Consórcio empresarial imóvel", description: "Adquira imóveis comerciais para sua empresa com planejamento financeiro e sem juros bancários.", category: "consorcios", imageSlot: true },
      { id: "cons-pj-02", name: "Consórcio empresarial construção", description: "Crédito estruturado para construção de sede, galpão ou expansão de instalações comerciais.", category: "consorcios", imageSlot: true },
      { id: "cons-pj-03", name: "Consórcio empresarial prédio", description: "Planejamento de longo prazo para aquisição ou construção de edifícios corporativos sem juros.", category: "consorcios", imageSlot: true },
      { id: "cons-pj-04", name: "Consórcio empresarial terreno", description: "Expanda sua infraestrutura adquirindo terrenos estratégicos com crédito planejado e sem encargos.", category: "consorcios", imageSlot: true },
    ],
  },
  {
    groupTitle: "Consórcio empresarial de veículos",
    products: [
      { id: "cons-pj-05", name: "Consórcio empresarial automóvel", description: "Renove a frota de veículos leves da sua empresa com planejamento financeiro eficiente.", category: "consorcios", imageSlot: true },
      { id: "cons-pj-06", name: "Consórcio empresarial caminhão", description: "Amplie ou renove sua frota de caminhões com consórcio estruturado e sem juros.", category: "consorcios", imageSlot: true },
      { id: "cons-pj-07", name: "Consórcio empresarial frota", description: "Gestão inteligente para renovação de múltiplos veículos com condições corporativas diferenciadas.", category: "consorcios", imageSlot: true },
      { id: "cons-pj-08", name: "Consórcio empresarial ônibus", description: "Adquira ou renove ônibus para transporte de colaboradores ou operações com planejamento sem juros.", category: "consorcios", imageSlot: true },
      { id: "cons-pj-09", name: "Consórcio empresarial van", description: "Crédito para aquisição de vans executivas ou de transporte operacional sem encargos financeiros.", category: "consorcios", imageSlot: true },
      { id: "cons-pj-10", name: "Consórcio empresarial utilitário", description: "Planejamento para renovação de veículos utilitários essenciais à operação do seu negócio.", category: "consorcios", imageSlot: true },
    ],
  },
  {
    groupTitle: "Consórcio empresarial de pesados",
    products: [
      { id: "cons-pj-11", name: "Consórcio empresarial de pesados", description: "Solução financeira para renovação de frota pesada com crédito planejado e assessoria especializada.", category: "consorcios", imageSlot: true },
      { id: "cons-pj-12", name: "Consórcio empresarial equipamento", description: "Adquira equipamentos industriais estratégicos com crédito sem juros e parcelas ajustadas ao fluxo de caixa.", category: "consorcios", imageSlot: true },
      { id: "cons-pj-13", name: "Consórcio empresarial máquina pesada", description: "Renove o maquinário da sua operação com planejamento consultivo e crédito sem encargos.", category: "consorcios", imageSlot: true },
      { id: "cons-pj-14", name: "Consórcio empresarial veículo pesado", description: "Crédito planejado para frotas de veículos pesados, com estratégia de lance e acompanhamento até a contemplação.", category: "consorcios", imageSlot: true },
    ],
  },
];

// ─────────────────────────────────────────────
// FINANÇAS
// ─────────────────────────────────────────────

export const financasPF: ProductGroup[] = [
  {
    groupTitle: "Cartão de crédito",
    products: [
      { id: "fin-pf-01", name: "Cartão de crédito", description: "Cartão com benefícios exclusivos, programa de pontos e condições personalizadas para o seu perfil.", category: "financas", imageSlot: true },
      { id: "fin-pf-02", name: "Cartão de crédito premium", description: "Cartão de alto padrão com cashback, acesso a salas VIP, seguros inclusos e limites diferenciados.", category: "financas", imageSlot: true },
    ],
  },
  {
    groupTitle: "Conta corrente",
    products: [
      { id: "fin-pf-03", name: "Conta corrente", description: "Conta bancária com todas as facilidades para gerenciar suas finanças do dia a dia com tranquilidade.", category: "financas", imageSlot: true },
      { id: "fin-pf-04", name: "Conta corrente digital", description: "Conta 100% digital com gestão financeira completa via aplicativo, sem tarifas escondidas.", category: "financas", imageSlot: true },
    ],
  },
  {
    groupTitle: "Empréstimos",
    products: [
      { id: "fin-pf-05", name: "Empréstimo com garantia de imóvel", description: "Crédito com as menores taxas do mercado, utilizando seu imóvel como garantia para maior poder de negociação.", category: "financas", imageSlot: true },
      { id: "fin-pf-06", name: "Empréstimo com garantia de veículo", description: "Acesse crédito com taxas reduzidas usando seu veículo como garantia, sem abrir mão do bem.", category: "financas", imageSlot: true },
      { id: "fin-pf-07", name: "Empréstimo consignado", description: "Crédito com desconto em folha de pagamento, aprovação ágil e uma das menores taxas do mercado.", category: "financas", imageSlot: true },
      { id: "fin-pf-08", name: "Empréstimo pessoal", description: "Crédito pessoal com análise consultiva para encontrar as melhores condições disponíveis para seu perfil.", category: "financas", imageSlot: true },
      { id: "fin-pf-09", name: "Portabilidade de empréstimos", description: "Transfira sua dívida para uma instituição com taxas menores e reduza o custo total do seu crédito.", category: "financas", imageSlot: true },
    ],
  },
  {
    groupTitle: "Garantias",
    products: [
      { id: "fin-pf-10", name: "Seguro garantia", description: "Instrumento financeiro que substitui o depósito caução em contratos e obrigações, com mais eficiência.", category: "financas", imageSlot: true },
      { id: "fin-pf-11", name: "Título de capitalização garantia", description: "Alternativa ao caução com possibilidade de resgate do valor corrigido ao final do período contratado.", category: "financas", imageSlot: true },
    ],
  },
  {
    groupTitle: "Financiamentos",
    products: [
      { id: "fin-pf-12", name: "Financiamento de imóvel", description: "Crédito imobiliário com comparação entre bancos para garantir as melhores taxas e condições para você.", category: "financas", imageSlot: true },
      { id: "fin-pf-13", name: "Financiamento de veículos", description: "Financie seu veículo com análise independente das melhores propostas disponíveis no mercado.", category: "financas", imageSlot: true },
      { id: "fin-pf-14", name: "Portabilidade de financiamento", description: "Migre seu financiamento para condições mais vantajosas, reduzindo parcelas e custo total.", category: "financas", imageSlot: true },
    ],
  },
  {
    groupTitle: "Investimentos e previdência",
    products: [
      { id: "fin-pf-15", name: "Investimentos", description: "Orientação consultiva para diversificação de portfólio com foco no seu perfil e objetivos financeiros.", category: "financas", imageSlot: true },
      { id: "fin-pf-16", name: "Previdência privada individual", description: "Planejamento da aposentadoria com escolha do regime tributário ideal e estratégia de longo prazo.", category: "financas", imageSlot: true },
      { id: "fin-pf-17", name: "Previdência privada infantil", description: "Planejamento financeiro para o futuro dos seus filhos com contribuições flexíveis desde a infância.", category: "financas", imageSlot: true },
      { id: "fin-pf-18", name: "Previdência privada proteção planejada", description: "Previdência com coberturas especiais que protegem seu patrimônio em situações de imprevisibilidade.", category: "financas", imageSlot: true },
      { id: "fin-pf-19", name: "Previdência privada escolar", description: "Acumule recursos para a educação dos seus filhos com rentabilidade e benefícios fiscais.", category: "financas", imageSlot: true },
    ],
  },
  {
    groupTitle: "Locação",
    products: [
      { id: "fin-pf-20", name: "Seguro fiança locatícia", description: "Substitua o fiador ou depósito na locação de imóveis com agilidade e custo reduzido.", category: "financas", imageSlot: true },
      { id: "fin-pf-21", name: "Título de capitalização para aluguel", description: "Garantia para locação com possibilidade de resgatar o valor investido ao final do contrato.", category: "financas", imageSlot: true },
    ],
  },
  {
    groupTitle: "Serviços especiais",
    products: [
      { id: "fin-pf-22", name: "Celular por assinatura", description: "Use o smartphone mais recente com tudo incluso em uma assinatura mensal sem entrada.", category: "financas", imageSlot: true },
      { id: "fin-pf-23", name: "Tag de estacionamento", description: "Praticidade e desconto em estacionamentos conveniados com pagamento automático via tag.", category: "financas", imageSlot: true },
      { id: "fin-pf-24", name: "Tag de pedágio", description: "Passage livre em rodovias com desconto e sem filas, integrada à sua conta financeira.", category: "financas", imageSlot: true },
      { id: "fin-pf-25", name: "Veículo por assinatura", description: "Use um veículo zero km com manutenção, seguro e documentação inclusos em uma mensalidade.", category: "financas", imageSlot: true },
    ],
  },
];

export const financasPJ: ProductGroup[] = [
  {
    groupTitle: "Cartão e conta empresarial",
    products: [
      { id: "fin-pj-01", name: "Cartão de crédito empresarial", description: "Controle de gastos corporativos com cartões individuais por colaborador e relatórios de despesas.", category: "financas", imageSlot: true },
      { id: "fin-pj-02", name: "Cartão de crédito corporativo", description: "Solução de pagamentos corporativos com limite centralizado, benefícios e integração ao ERP.", category: "financas", imageSlot: true },
      { id: "fin-pj-03", name: "Conta corrente empresarial", description: "Conta corporativa com serviços completos para gestão financeira da sua empresa.", category: "financas", imageSlot: true },
      { id: "fin-pj-04", name: "Conta corrente digital", description: "Conta empresarial 100% digital com tarifas reduzidas e gestão financeira integrada.", category: "financas", imageSlot: true },
    ],
  },
  {
    groupTitle: "Capital e empréstimos empresariais",
    products: [
      { id: "fin-pj-05", name: "Capital de giro", description: "Crédito para manter a operação da sua empresa com fluxo de caixa saudável e taxas competitivas.", category: "financas", imageSlot: true },
      { id: "fin-pj-06", name: "Empréstimo para capital de giro", description: "Crédito ágil para suprir necessidades operacionais imediatas com análise consultiva independente.", category: "financas", imageSlot: true },
      { id: "fin-pj-07", name: "Antecipação de recebíveis", description: "Transforme seus recebíveis futuros em caixa imediato com taxas negociadas e processo simplificado.", category: "financas", imageSlot: true },
      { id: "fin-pj-08", name: "Empréstimo com garantia de imóvel", description: "Crédito empresarial com as menores taxas, utilizando imóvel como garantia para maior volume.", category: "financas", imageSlot: true },
      { id: "fin-pj-09", name: "Empréstimo com garantia de veículo", description: "Acesse crédito para o negócio com taxas reduzidas utilizando ativos da empresa como garantia.", category: "financas", imageSlot: true },
      { id: "fin-pj-10", name: "Empréstimo consignado para o colaborador", description: "Benefício de crédito consignado para seus colaboradores, sem custo para a empresa.", category: "financas", imageSlot: true },
      { id: "fin-pj-11", name: "Portabilidade de empréstimos", description: "Reduza os juros da dívida empresarial migrando para instituições com condições mais favoráveis.", category: "financas", imageSlot: true },
    ],
  },
  {
    groupTitle: "Garantias empresariais",
    products: [
      { id: "fin-pj-12", name: "Garantia contratual empresarial", description: "Instrumento de garantia para contratos públicos e privados, substituindo depósitos em dinheiro.", category: "financas", imageSlot: true },
      { id: "fin-pj-13", name: "Seguro garantia", description: "Proteção para cumprimento de obrigações contratuais com custo reduzido frente ao caução tradicional.", category: "financas", imageSlot: true },
      { id: "fin-pj-14", name: "Título de capitalização garantia", description: "Garantia contratual com possibilidade de resgate dos valores ao término das obrigações.", category: "financas", imageSlot: true },
    ],
  },
  {
    groupTitle: "Financiamentos empresariais",
    products: [
      { id: "fin-pj-15", name: "Financiamento de imóvel empresarial", description: "Crédito imobiliário corporativo com análise comparativa para as melhores taxas e prazos do mercado.", category: "financas", imageSlot: true },
      { id: "fin-pj-16", name: "Financiamento de veículo empresarial", description: "Financiamento de frotas e veículos corporativos com negociação independente junto às instituições.", category: "financas", imageSlot: true },
      { id: "fin-pj-17", name: "Portabilidade de financiamento", description: "Migre financiamentos empresariais para condições mais competitivas, reduzindo o custo da dívida.", category: "financas", imageSlot: true },
    ],
  },
  {
    groupTitle: "Investimentos e previdência empresarial",
    products: [
      { id: "fin-pj-18", name: "Investimentos empresariais", description: "Gestão do caixa corporativo com rentabilidade e liquidez adequadas ao ciclo do negócio.", category: "financas", imageSlot: true },
      { id: "fin-pj-19", name: "Investimentos para inovação e tecnologia", description: "Linhas de crédito e investimento orientadas ao desenvolvimento tecnológico e inovação da empresa.", category: "financas", imageSlot: true },
      { id: "fin-pj-20", name: "Investimentos via financiamento", description: "Estruturação de investimentos corporativos com financiamento de longo prazo e benefícios fiscais.", category: "financas", imageSlot: true },
      { id: "fin-pj-21", name: "Previdência privada empresarial", description: "Plano de previdência como benefício corporativo, retendo talentos e otimizando a carga tributária.", category: "financas", imageSlot: true },
      { id: "fin-pj-22", name: "Previdência privada para o colaborador", description: "Incentive a previdência dos seus colaboradores com planos coletivos de alta rentabilidade.", category: "financas", imageSlot: true },
    ],
  },
  {
    groupTitle: "Locação empresarial",
    products: [
      { id: "fin-pj-23", name: "Seguro fiança locatícia empresarial", description: "Alternativa ao depósito caução em contratos de locação comercial com aprovação ágil.", category: "financas", imageSlot: true },
      { id: "fin-pj-24", name: "Título de capitalização para aluguel empresarial", description: "Garantia locatícia com possibilidade de resgate do capital ao término do contrato comercial.", category: "financas", imageSlot: true },
    ],
  },
  {
    groupTitle: "Serviços especiais empresariais",
    products: [
      { id: "fin-pj-25", name: "Celular por assinatura", description: "Gestão de smartphones corporativos via assinatura, com manutenção e atualização incluídas.", category: "financas", imageSlot: true },
      { id: "fin-pj-26", name: "Tag de estacionamento", description: "Gestão centralizada de estacionamentos para frotas e colaboradores com tarifas diferenciadas.", category: "financas", imageSlot: true },
      { id: "fin-pj-27", name: "Tag de pedágio frota", description: "Controle e redução de custos com pedágios para frotas empresariais com relatórios detalhados.", category: "financas", imageSlot: true },
      { id: "fin-pj-28", name: "Veículo por assinatura", description: "Frota corporativa por assinatura com manutenção, seguro e documentação inclusos sem imobilização de capital.", category: "financas", imageSlot: true },
    ],
  },
];
