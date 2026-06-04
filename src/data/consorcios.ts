export interface ConsorcioCategoria {
  id: string;
  titulo: string;
  descricao: string;
  icone: string;
  rota: string;
  ativo: boolean;
}

export interface ConsorcioProduct {
  id: string;
  categoriaId: string;
  tipo: 'pf' | 'pj';
  titulo: string;
  subtitulo: string;
  descricaoBreve: string;
  descricaoLonga: string[];
  gatilhoTemporal: string;
  diferenciais: { icone: string; titulo: string; descricao: string }[];
  paraQuemEIndicado: string;
  cta: string;
  comoFunciona: { step: number; titulo: string; descricao: string }[];
  depoimento: { texto: string; autor: string; cargo: string; cidade: string };
  faq: { pergunta: string; resposta: string }[];
  crossSelling: { icone: string; titulo: string; descricao: string; link: string }[];
  ecossistema: string;
}

export const categorias: ConsorcioCategoria[] = [
  {
    id: 'imobiliario-premium',
    titulo: 'Imobiliário Premium',
    descricao:
      'Apartamentos, coberturas, fazendas, imóveis corporativos e de investimento, poder de compra à vista sem juros bancários.',
    icone: 'Building2',
    rota: 'imobiliario-premium',
    ativo: true,
  },
  {
    id: 'veiculos',
    titulo: 'Veículos',
    descricao:
      'Automóveis, motos e caminhões com planejamento inteligente e consultoria especializada do início à contemplação.',
    icone: 'Car',
    rota: 'veiculos',
    ativo: false,
  },
  {
    id: 'veiculos-pesados',
    titulo: 'Veículos Pesados',
    descricao:
      'Equipamentos, máquinas e veículos de grande porte para expansão da frota empresarial sem comprometer o capital de giro.',
    icone: 'Truck',
    rota: 'veiculos-pesados',
    ativo: false,
  },
  {
    id: 'servicos',
    titulo: 'Serviços',
    descricao:
      'Procedimentos estéticos, cursos, viagens, eletrodomésticos e muito mais, realize com planejamento e sem juros.',
    icone: 'Sparkles',
    rota: 'servicos',
    ativo: false,
  },
];

export const produtosPF: ConsorcioProduct[] = [
  {
    id: 'meu-imovel-residencial',
    categoriaId: 'imobiliario-premium',
    tipo: 'pf',
    titulo: 'Meu imóvel residencial de luxo',
    subtitulo:
      'Conquiste o endereço que traduz a sua história de sucesso',
    descricaoBreve:
      'Coberturas, lofts e apartamentos premium com poder de compra à vista e contemplação previsível.',
    descricaoLonga: [
      'Imagine acordar todas as manhãs contemplando a cidade a partir de uma cobertura com pé-direito duplo, sabendo que cada metro quadrado daquele espaço foi conquistado de forma planejada, sem juros bancários e com parcelas que respeitam o ritmo do seu patrimônio. Esse cenário deixou de ser privilégio de quem dispõe de capital imediato, é o novo caminho inteligente para quem pensa grande e age com estratégia.',
      'O consórcio de imóvel residencial de luxo oferece cartas de crédito com poder de compra à vista para apartamentos premium, lofts exclusivos e coberturas em endereços icônicos. Sem juros, sem burocracia tradicional e com flexibilidade de lances, livre, fixo ou embutido, você transforma planejamento em conquista. Contemplações por sorteio e lance garantem previsibilidade, enquanto a assessoria dedicada acompanha cada etapa até a entrega das chaves.',
    ],
    gatilhoTemporal:
      'Grupos de junho com assessoria premium personalizada, últimas vagas para acompanhamento individual',
    diferenciais: [
      {
        icone: 'Home',
        titulo: 'Poder de compra à vista',
        descricao:
          'Negocie como pagador integral e conquiste condições exclusivas que financiamentos não alcançam.',
      },
      {
        icone: 'BadgeCheck',
        titulo: 'Zero juros bancários',
        descricao:
          'Taxa de administração transparente desde o primeiro dia, sem surpresas no custo final.',
      },
      {
        icone: 'RefreshCw',
        titulo: 'Flexibilidade total de lances',
        descricao:
          'Livre, fixo ou embutido, adequados ao ritmo e à estratégia do seu patrimônio.',
      },
      {
        icone: 'KeyRound',
        titulo: 'Aceita novos, usados ou em construção',
        descricao:
          'Você escolhe a oportunidade no timing certo do mercado.',
      },
      {
        icone: 'UserCheck',
        titulo: 'Gestor dedicado',
        descricao:
          'Acompanhamento personalizado da adesão à contemplação, assembleias e entrega.',
      },
    ],
    paraQuemEIndicado:
      'Profissionais liberais, executivos e famílias com patrimônio em formação ou consolidação que desejam adquirir o primeiro imóvel de luxo, ou fazer upgrade, de forma planejada, sem comprometer liquidez nem assumir dívidas bancárias de longo prazo.',
    cta: 'Quero minha consultoria imobiliária',
    comoFunciona: [
      {
        step: 1,
        titulo: 'Consultoria gratuita',
        descricao:
          'Conversamos sobre seu imóvel ideal, perfil e timing.',
      },
      {
        step: 2,
        titulo: 'Carta sob medida',
        descricao:
          'Valor, prazo e estratégia de lance desenhados para você.',
      },
      {
        step: 3,
        titulo: 'Contemplação com apoio',
        descricao:
          'Seu gestor acompanha assembleias e orienta lances.',
      },
      {
        step: 4,
        titulo: 'Conquista à vista',
        descricao: 'Carta em mãos, negocie como pagador integral.',
      },
    ],
    depoimento: {
      texto:
        'Em 11 meses fui contemplado e negociei minha cobertura como pagador à vista. O desconto que consegui pagou a taxa de administração inteira. Meu gestor Plan 10 fez toda a diferença na estratégia de lance.',
      autor: 'Marcelo R.',
      cargo: 'Empresário',
      cidade: 'São Paulo',
    },
    faq: [
      {
        pergunta: 'Posso usar a carta para comprar na planta?',
        resposta:
          'Sim. A carta aceita imóveis novos, usados ou em construção. Comprar na planta com poder de compra à vista gera descontos expressivos em lançamentos.',
      },
      {
        pergunta:
          'O que acontece se eu não for contemplado rapidamente?',
        resposta:
          'Você continua participando dos sorteios mensais e pode ajustar sua estratégia de lance com seu gestor. Não há perda, o patrimônio se acumula mês a mês.',
      },
      {
        pergunta: 'Preciso ter o imóvel definido antes de entrar?',
        resposta:
          'Não. Você pode ser contemplado primeiro e escolher o imóvel depois, com calma e poder de negociação. Seu gestor ajuda na busca quando chegar o momento.',
      },
    ],
    crossSelling: [
      {
        icone: 'Shield',
        titulo: 'Seguro patrimonial premium',
        descricao:
          'Proteja o imóvel conquistado com cobertura sob medida para alto padrão.',
        link: '/seguros?cat=blindagem-patrimonial',
      },
      {
        icone: 'Wrench',
        titulo: 'Assistência residencial 24h',
        descricao:
          'Reparos, instalações e manutenção preventiva para seu novo lar.',
        link: '/servicos-24h',
      },
      {
        icone: 'Coins',
        titulo: 'Financiamento complementar',
        descricao:
          'Soluções para personalização, decoração e acabamento do imóvel.',
        link: '/financas',
      },
    ],
    ecossistema:
      'Quem conquista o imóvel dos sonhos, também protege com seguro sob medida, mantém com assistência 24h e potencializa com consultoria patrimonial, tudo no ecossistema Plan 10.',
  },
  {
    id: 'construir-reformar',
    categoriaId: 'imobiliario-premium',
    tipo: 'pf',
    titulo: 'Construir e reformar com estilo',
    subtitulo:
      'Cada detalhe do seu lar pensado com exclusividade e sem pressa',
    descricaoBreve:
      'Do alicerce ao acabamento no seu ritmo, carta para terreno, materiais e mão de obra.',
    descricaoLonga: [
      'E se você pudesse transformar cada ambiente da sua casa exatamente como sempre imaginou, sem abrir mão da qualidade dos materiais, sem pressão de prazos bancários e sem juros que corroem o investimento? O consórcio para construção e reforma coloca nas suas mãos o orçamento completo para que o projeto dos seus sonhos saia do papel no seu ritmo.',
      'A carta de crédito permite investir em terreno, materiais nobres e mão de obra especializada com liberação conforme o cronograma da obra. Cada etapa é financiada de forma programada, garantindo previsibilidade sem alavancagem bancária. Lances livre, fixo ou embutido permitem antecipar a contemplação conforme seu fluxo financeiro. Do alicerce ao acabamento, sua obra avança com tranquilidade.',
    ],
    gatilhoTemporal:
      'Obras iniciadas até julho aproveitam as condições de entrada facilitada dos grupos de junho',
    diferenciais: [
      {
        icone: 'Layers',
        titulo: 'Carta cobre terreno e obra',
        descricao:
          'Um único consórcio para terreno, materiais de construção e mão de obra.',
      },
      {
        icone: 'BadgeCheck',
        titulo: 'Zero juros bancários',
        descricao:
          'Cada real investido vai diretamente para a qualidade da construção.',
      },
      {
        icone: 'Calendar',
        titulo: 'Liberação por etapas',
        descricao:
          'Recursos liberados conforme o cronograma físico da obra, sem alavancagem.',
      },
      {
        icone: 'Pencil',
        titulo: 'Liberdade criativa total',
        descricao:
          'Seu projeto, seus acabamentos, seu ritmo, sem restrições de padrão.',
      },
    ],
    paraQuemEIndicado:
      'Famílias que já possuem terreno e desejam construir a casa dos sonhos, ou proprietários que querem elevar o padrão do imóvel atual com reforma de alto acabamento.',
    cta: 'Quero planejar minha obra',
    comoFunciona: [
      {
        step: 1,
        titulo: 'Apresente seu projeto',
        descricao:
          'Conversamos sobre a obra, estimativa de custos e cronograma.',
      },
      {
        step: 2,
        titulo: 'Carta dimensionada',
        descricao:
          'Valor que cobre terreno, materiais e mão de obra, com margem de segurança.',
      },
      {
        step: 3,
        titulo: 'Liberação por etapas',
        descricao:
          'Recursos liberados conforme o avanço físico da obra.',
      },
      {
        step: 4,
        titulo: 'Obra concluída',
        descricao:
          'Imóvel pronto, personalizado e sem dívida bancária.',
      },
    ],
    depoimento: {
      texto:
        'Construímos nossa casa dos sonhos em 18 meses, sem financiamento bancário. A liberação por etapas nos deu controle total do orçamento. Cada centavo foi para a qualidade da obra.',
      autor: 'Patrícia e Bruno S.',
      cargo: 'Arquiteta e Engenheiro',
      cidade: 'Curitiba',
    },
    faq: [
      {
        pergunta: 'A carta cobre terreno e construção juntos?',
        resposta:
          'Sim. A carta é utilizável para compra de terreno, materiais de construção e mão de obra, tudo com um único consórcio.',
      },
      {
        pergunta: 'E se a obra custar mais que o previsto?',
        resposta:
          'Seu gestor dimensiona a carta com margem de segurança. Caso necessário, é possível complementar com recursos próprios ou soluções financeiras do ecossistema Plan 10.',
      },
      {
        pergunta: 'Posso reformar em vez de construir?',
        resposta:
          'Sim. A carta aceita reformas de alto padrão, incluindo projeto, demolição, materiais e acabamento.',
      },
    ],
    crossSelling: [
      {
        icone: 'HardHat',
        titulo: 'Seguro de obra e responsabilidade civil',
        descricao: 'Proteção durante toda a construção.',
        link: '/seguros',
      },
      {
        icone: 'Wrench',
        titulo: 'Assistência residencial 24h',
        descricao: 'Suporte para manutenção pós-obra.',
        link: '/servicos-24h',
      },
      {
        icone: 'BarChart2',
        titulo: 'Consultoria patrimonial',
        descricao:
          'Avaliação e planejamento sucessório do imóvel.',
        link: '/financas',
      },
    ],
    ecossistema:
      'Quem constrói com inteligência, também protege com seguro de obra, mantém com assistência 24h e planeja com consultoria patrimonial, tudo no ecossistema Plan 10.',
  },
  {
    id: 'investimento-imobiliario',
    categoriaId: 'imobiliario-premium',
    tipo: 'pf',
    titulo: 'Investimento imobiliário exclusivo',
    subtitulo:
      'Patrimônio que trabalha por você, renda passiva com solidez e visão de longo prazo',
    descricaoBreve:
      'Patrimônio que trabalha por você, renda passiva com diversificação inteligente.',
    descricaoLonga: [
      'O mercado imobiliário brasileiro de alto padrão valorizou, em média, acima da inflação nos últimos cinco anos nas capitais com maior IDH. Para investidores que pensam em gerações, não em ciclos, o consórcio imobiliário combina poder de compra à vista, ausência de juros e flexibilidade para escolher o ativo certo no momento certo.',
      'A carta de crédito para investimento não restringe a destinação do imóvel: locação residencial ou comercial, revenda estratégica, multipropriedade ou composição de portfólio para renda passiva. Com assessoria dedicada, você identifica oportunidades com alto potencial de valorização sem alavancagem bancária.',
    ],
    gatilhoTemporal:
      'Novos grupos de investimento com condições exclusivas, ideal para quem quer diversificar ainda no primeiro semestre',
    diferenciais: [
      {
        icone: 'Target',
        titulo: 'Liberdade de destinação',
        descricao:
          'Locação, revenda, multipropriedade ou portfólio, sem restrição de uso após a aquisição.',
      },
      {
        icone: 'BarChart2',
        titulo: 'Diversificação patrimonial',
        descricao:
          'Ativo gerador de renda passiva recorrente, protegendo o patrimônio contra volatilidade.',
      },
      {
        icone: 'Gem',
        titulo: 'Poder de negociação à vista',
        descricao:
          'Carta contemplada equivale a pagamento integral, descontos expressivos em lançamentos.',
      },
      {
        icone: 'Lock',
        titulo: 'Planejamento sucessório',
        descricao:
          'Imóvel como veículo patrimonial facilita estruturação sucessória e blindagem familiar.',
      },
    ],
    paraQuemEIndicado:
      'Investidores sofisticados e famílias com patrimônio consolidado que buscam diversificação em ativos reais com geração de renda passiva e visão multigeracional.',
    cta: 'Quero investir com inteligência',
    comoFunciona: [
      {
        step: 1,
        titulo: 'Análise de perfil',
        descricao:
          'Entendemos seus objetivos de renda, horizonte e apetite de risco.',
      },
      {
        step: 2,
        titulo: 'Estratégia sob medida',
        descricao:
          'Carta dimensionada para o segmento imobiliário mais adequado.',
      },
      {
        step: 3,
        titulo: 'Contemplação e aquisição',
        descricao:
          'Lance estratégico e negociação à vista para máximo retorno.',
      },
      {
        step: 4,
        titulo: 'Gestão do ativo',
        descricao:
          'Ecossistema Plan 10 para locação, proteção e valorização contínua.',
      },
    ],
    depoimento: {
      texto:
        'Achava que cobertura em Moema era um sonho distante. Em 14 meses fui contemplado por lance e negociei como pagador à vista, consegui um desconto que nenhum financiamento daria.',
      autor: 'Ricardo M.',
      cargo: 'Médico Cirurgião',
      cidade: 'São Paulo',
    },
    faq: [
      {
        pergunta: 'Posso comprar para alugar?',
        resposta:
          'Sim. Não há restrição de destinação, locação residencial, comercial, temporada ou multipropriedade.',
      },
      {
        pergunta: 'Consórcio compete com fundos imobiliários?',
        resposta:
          'São complementares. O consórcio dá acesso a ativo real com controle total, sem taxa de performance e sem volatilidade de cotas.',
      },
      {
        pergunta: 'Qual o retorno esperado?',
        resposta:
          'Depende do ativo e da região. Historicamente, imóveis de alto padrão combinam valorização de capital e renda de locação, superando a renda fixa ajustada por risco em horizontes longos.',
      },
    ],
    crossSelling: [
      {
        icone: 'Shield',
        titulo: 'Seguro de imóvel locado',
        descricao:
          'Proteção do ativo durante períodos de locação.',
        link: '/seguros',
      },
      {
        icone: 'TrendingUp',
        titulo: 'Consultoria financeira patrimonial',
        descricao:
          'Estruturação de portfólio imobiliário diversificado.',
        link: '/financas',
      },
      {
        icone: 'Key',
        titulo: 'Garantia de locação',
        descricao:
          'Elimine riscos de inadimplência com seguro-fiança premium.',
        link: '/financas',
      },
    ],
    ecossistema:
      'Quem investe em imóveis com inteligência, também protege com seguro patrimonial, diversifica com garantia de locação e planeja com consultoria sucessória, tudo no ecossistema Plan 10.',
  },
  {
    id: 'fazenda-sitio',
    categoriaId: 'imobiliario-premium',
    tipo: 'pf',
    titulo: 'Fazenda e sítio dos sonhos',
    subtitulo:
      'O refúgio que conecta você à essência, paz, natureza e liberdade sem fronteiras',
    descricaoBreve:
      'O refúgio que conecta sua família à natureza, chácaras, sítios e fazendas em todo o Brasil.',
    descricaoLonga: [
      'Existe um lugar onde o relógio desacelera, os filhos correm descalços pela grama e o pôr do sol é espetáculo diário visto da varanda. Esse lugar não é um resort, é patrimônio familiar, é raiz, é legado. O consórcio para fazendas e sítios transforma o sonho do campo em planejamento concreto, com poder de compra à vista e sem juros bancários.',
      'A carta de crédito aceita fazendas, sítios, chácaras e propriedades rurais com matrícula regularizada em todo o território nacional. Seja para lazer familiar, início de operação agropecuária ou investimento em terras, a flexibilidade do consórcio permite escolher a propriedade no timing certo e negociar como pagador integral.',
    ],
    gatilhoTemporal:
      'Propriedades rurais com valorização acelerada em regiões premium, condições especiais para novos grupos de junho',
    diferenciais: [
      {
        icone: 'TrendingUp',
        titulo: 'Patrimônio com valorização real',
        descricao:
          'Terras produtivas superam consistentemente a inflação em ciclos longos.',
      },
      {
        icone: 'Tractor',
        titulo: 'Uso livre',
        descricao:
          'Lazer, agropecuária, turismo rural ou reserva patrimonial conforme seu objetivo.',
      },
      {
        icone: 'Map',
        titulo: 'Abrangência nacional',
        descricao:
          'Propriedades em qualquer estado, com matrícula regularizada.',
      },
      {
        icone: 'UserCheck',
        titulo: 'Assessoria Plan 10 completa',
        descricao:
          'Da busca da propriedade à documentação de transferência.',
      },
    ],
    paraQuemEIndicado:
      'Famílias urbanas que sonham com um refúgio no campo para finais de semana e férias, empreendedores que desejam iniciar operação agropecuária, e investidores que reconhecem a terra como ativo resiliente de longo prazo.',
    cta: 'Quero meu refúgio no campo',
    comoFunciona: [
      {
        step: 1,
        titulo: 'Conversa sobre o sonho',
        descricao:
          'Entendemos o tipo de propriedade, região e finalidade desejada.',
      },
      {
        step: 2,
        titulo: 'Carta dimensionada',
        descricao:
          'Valor e prazo calibrados para o mercado rural da região de interesse.',
      },
      {
        step: 3,
        titulo: 'Contemplação e busca',
        descricao:
          'Gestor acompanha assembleias e inicia pesquisa de propriedades.',
      },
      {
        step: 4,
        titulo: 'Negociação à vista',
        descricao:
          'Carta em mãos, você compra com poder integral e condições exclusivas.',
      },
    ],
    depoimento: {
      texto:
        'Passamos a vida inteira sonhando com uma fazenda para os netos. O consórcio nos deu tranquilidade para escolher com calma e comprar com poder de negociação. Hoje, cada final de semana é uma mini-férias.',
      autor: 'Dona Helena',
      cargo: 'Aposentada',
      cidade: 'Campinas',
    },
    faq: [
      {
        pergunta: 'A carta serve para chácaras e sítios menores?',
        resposta:
          'Sim. Qualquer propriedade rural com matrícula regularizada, de chácaras de lazer a fazendas produtivas.',
      },
      {
        pergunta: 'Posso usar para iniciar uma operação agrícola?',
        resposta:
          'A carta é para aquisição da terra. Para infraestrutura e equipamentos agrícolas, o ecossistema Plan 10 oferece soluções complementares.',
      },
      {
        pergunta: 'Terras são um bom investimento de longo prazo?',
        resposta:
          'Historicamente, terras produtivas brasileiras apresentam apreciação real consistente. É um ativo tangível, protegido contra inflação, que pode gerar renda via arrendamento ou produção.',
      },
    ],
    crossSelling: [
      {
        icone: 'Leaf',
        titulo: 'Seguro rural e patrimonial',
        descricao:
          'Proteção para sede, equipamentos e produção agrícola.',
        link: '/seguros',
      },
      {
        icone: 'Wrench',
        titulo: 'Assistência 24h rural',
        descricao:
          'Suporte para emergências em propriedades afastadas.',
        link: '/servicos-24h',
      },
      {
        icone: 'BarChart2',
        titulo: 'Consultoria de agronegócio',
        descricao:
          'Análise de viabilidade e rentabilidade da operação.',
        link: '/financas',
      },
    ],
    ecossistema:
      'Quem conquista terra com visão, também protege com seguro rural, mantém com assistência 24h e cresce com consultoria de agronegócio, tudo no ecossistema Plan 10.',
  },
  {
    id: 'imovel-veraneio',
    categoriaId: 'imobiliario-premium',
    tipo: 'pf',
    titulo: 'Imóvel de veraneio, férias e lazer',
    subtitulo:
      'Memórias que se constroem em metros quadrados, seu lugar no paraíso',
    descricaoBreve:
      'Memórias em metros quadrados, casa de praia ou multipropriedade com renda em temporada.',
    descricaoLonga: [
      'As férias mais memoráveis da sua vida não acontecem em um hotel, acontecem no seu próprio recanto, onde seus filhos conhecem cada trilha, onde o barulho do mar é o despertador e onde cada cômodo guarda uma história da família. Transformar esse sonho em endereço permanente é mais acessível do que parece, e começa com planejamento inteligente.',
      'O consórcio para imóveis de veraneio e lazer aceita casa de praia, apart-hotel, condo-hotel e multipropriedade em destinos premium de todo o Brasil. Além do refúgio emocional, o imóvel gera renda nos períodos sem uso pessoal, locação por temporada que transforma o patrimônio em ativo produtivo.',
    ],
    gatilhoTemporal:
      'Destinos premium com lançamentos exclusivos neste semestre, garanta sua assessoria antes da temporada',
    diferenciais: [
      {
        icone: 'Repeat',
        titulo: 'Dupla finalidade',
        descricao:
          'Uso pessoal em férias e renda por locação em temporada nos períodos livres.',
      },
      {
        icone: 'Plane',
        titulo: 'Destinos premium',
        descricao:
          'Acesso a lançamentos em regiões de alta valorização turística antes do mercado geral.',
      },
      {
        icone: 'Hotel',
        titulo: 'Formatos flexíveis',
        descricao:
          'Casa de praia, apart-hotel, condo-hotel ou multipropriedade, conforme seu estilo.',
      },
      {
        icone: 'Heart',
        titulo: 'Legado familiar',
        descricao:
          'O endereço das melhores memórias da família, de geração em geração.',
      },
    ],
    paraQuemEIndicado:
      'Famílias que viajam regularmente para o mesmo destino e desejam base própria, casais em consolidação patrimonial, e investidores que buscam ativo com renda sazonal em regiões turísticas premium.',
    cta: 'Quero meu lugar no paraíso',
    comoFunciona: [
      {
        step: 1,
        titulo: 'Descubra seu destino',
        descricao:
          'Conversamos sobre destinos favoritos, frequência de uso e perfil de renda.',
      },
      {
        step: 2,
        titulo: 'Carta dimensionada',
        descricao:
          'Valor calibrado para o mercado de temporada da região escolhida.',
      },
      {
        step: 3,
        titulo: 'Contemplação e escolha',
        descricao:
          'Gestor apresenta oportunidades exclusivas em lançamentos premium.',
      },
      {
        step: 4,
        titulo: 'Férias e renda',
        descricao:
          'Imóvel pronto para uso pessoal e pool de locação por temporada.',
      },
    ],
    depoimento: {
      texto:
        'Compramos nosso apart-hotel em Trancoso e nos primeiros 12 meses a renda de temporada cobriu mais da metade da parcela. Férias no nosso lugar e renda quando não estamos, exatamente o que nosso gestor prometeu.',
      autor: 'Ana Paula e Renato G.',
      cargo: 'Casal',
      cidade: 'Brasília',
    },
    faq: [
      {
        pergunta:
          'O imóvel pode gerar renda quando não estou usando?',
        resposta:
          'Sim. Com administração de locação por temporada, o imóvel gera receita nos períodos sem uso pessoal, especialmente em alta temporada.',
      },
      {
        pergunta: 'Apart-hotel e condo-hotel são boas opções?',
        resposta:
          'Excelentes. Esses formatos oferecem gestão profissional inclusa, pool hoteleiro e manutenção sem preocupação, ideais para renda passiva com zero gestão.',
      },
      {
        pergunta: 'Posso usar para multipropriedade?',
        resposta:
          'Sim. A carta aceita multipropriedade em empreendimentos regularizados, acesso a múltiplos destinos com uma única cota.',
      },
    ],
    crossSelling: [
      {
        icone: 'Shield',
        titulo: 'Seguro residencial para temporada',
        descricao:
          'Cobertura especial para períodos sem uso.',
        link: '/seguros',
      },
      {
        icone: 'Key',
        titulo: 'Administração de locação',
        descricao:
          'Gestão profissional de renda do imóvel.',
        link: '/servicos-24h',
      },
      {
        icone: 'Plane',
        titulo: 'Seguro viagem premium',
        descricao:
          'Proteção completa para a família em deslocamentos.',
        link: '/seguros',
      },
    ],
    ecossistema:
      'Quem conquista seu lugar no paraíso, também protege com seguro de temporada, rentabiliza com administração de locação e viaja com seguro premium, tudo no ecossistema Plan 10.',
  },
];

export const produtosPJ: ConsorcioProduct[] = [
  {
    id: 'imovel-corporativo',
    categoriaId: 'imobiliario-premium',
    tipo: 'pj',
    titulo: 'Imóvel corporativo estratégico',
    subtitulo:
      'Sede própria com inteligência financeira, ativo no balanço, capital de giro preservado',
    descricaoBreve:
      'Sede própria com inteligência financeira, ativo no balanço, capital de giro preservado.',
    descricaoLonga: [
      'Empresas brasileiras com sede própria apresentam indicadores de permanência e retenção de talentos significativamente superiores às que operam em espaços alugados. Mais que endereço, a sede é declaração de solidez para clientes, investidores e colaboradores. O consórcio corporativo transforma aluguel em patrimônio estratégico, sem consumir linhas de crédito bancário nem comprometer capital de giro.',
      'A carta de crédito aceita lajes corporativas, salas comerciais, galpões logísticos e centros de distribuição com poder de compra à vista. Consórcio não aparece como dívida no balanço, preserva limites de crédito e transforma despesa operacional recorrente em ativo imobilizado.',
    ],
    gatilhoTemporal:
      'Lajes corporativas com condições diferenciadas para novos grupos, ideal para empresas que planejam expansão no segundo semestre',
    diferenciais: [
      {
        icone: 'Building2',
        titulo: 'Ativo no balanço',
        descricao:
          'Sede própria que valoriza enquanto fortalece a posição patrimonial da empresa.',
      },
      {
        icone: 'CreditCard',
        titulo: 'Linhas bancárias preservadas',
        descricao:
          'Consórcio não consome limite de crédito para capital de giro ou investimento.',
      },
      {
        icone: 'Receipt',
        titulo: 'Benefício fiscal',
        descricao:
          'Possibilidade de depreciação do ativo e dedutibilidade da taxa de administração.',
      },
      {
        icone: 'Lock',
        titulo: 'Garantia simplificada',
        descricao:
          'Alienação fiduciária do próprio bem, sem avalistas corporativos ou garantias cruzadas.',
      },
      {
        icone: 'UserCheck',
        titulo: 'Assessoria corporativa dedicada',
        descricao:
          'Análise de viabilidade, negociação e acompanhamento pós-aquisição.',
      },
    ],
    paraQuemEIndicado:
      'Empresas de médio e grande porte que pagam aluguel significativo e desejam converter despesa em patrimônio, companhias em expansão que precisam de novas instalações, e holdings patrimoniais que buscam diversificação imobiliária corporativa.',
    cta: 'Agendar minha consultoria corporativa',
    comoFunciona: [
      {
        step: 1,
        titulo: 'Diagnóstico corporativo',
        descricao:
          'Analisamos perfil da empresa, necessidades de espaço e objetivos patrimoniais.',
      },
      {
        step: 2,
        titulo: 'Carta corporativa sob medida',
        descricao:
          'Valor, prazo e estratégia de lance alinhados ao fluxo de caixa.',
      },
      {
        step: 3,
        titulo: 'Contemplação estratégica',
        descricao:
          'Gestor dedicado acompanha assembleias e otimiza timing de lance.',
      },
      {
        step: 4,
        titulo: 'Aquisição com poder de negociação',
        descricao:
          'Carta como pagamento integral com assessoria de negociação.',
      },
      {
        step: 5,
        titulo: 'Ativação do ecossistema',
        descricao:
          'Seguro, assistência e gestão patrimonial para o novo ativo.',
      },
    ],
    depoimento: {
      texto:
        'Trocamos R$ 35 mil mensais de aluguel por parcelas que constroem patrimônio. Em dois anos, a sede já valorizou 22%. Melhor decisão financeira da empresa.',
      autor: 'Fernanda L.',
      cargo: 'CFO, empresa de tecnologia',
      cidade: 'Belo Horizonte',
    },
    faq: [
      {
        pergunta: 'Consórcio consome limite de crédito bancário?',
        resposta:
          'Não. Suas linhas de capital de giro e investimento permanecem intactas para a operação.',
      },
      {
        pergunta: 'A empresa pode ser contemplada por lance?',
        resposta:
          'Sim. Lances livres, fixos ou embutidos estão disponíveis. Seu gestor orienta a melhor estratégia conforme o fluxo de caixa da empresa.',
      },
      {
        pergunta: 'Há benefício fiscal?',
        resposta:
          'O imóvel adquirido via consórcio pode ser depreciado contabilmente, e a taxa de administração pode ser dedutível conforme o regime tributário. Consulte seu contador para detalhes específicos.',
      },
    ],
    crossSelling: [
      {
        icone: 'Building2',
        titulo: 'Seguro empresarial completo',
        descricao:
          'Proteção do imóvel corporativo e conteúdo operacional.',
        link: '/seguros',
      },
      {
        icone: 'Users',
        titulo: 'Seguro de benefícios corporativos',
        descricao:
          'Atração e retenção de talentos para o novo espaço.',
        link: '/saude',
      },
      {
        icone: 'FileCheck',
        titulo: 'Garantia de locação corporativa',
        descricao:
          'Segurança de renda para imóveis destinados à locação.',
        link: '/financas',
      },
    ],
    ecossistema:
      'Quem conquista sede própria com visão, também protege com seguro empresarial, atrai talentos com benefícios corporativos e garante renda com locação segura, tudo no ecossistema Plan 10.',
  },
  {
    id: 'retrofit-modernizacao',
    categoriaId: 'imobiliario-premium',
    tipo: 'pj',
    titulo: 'Retrofit e modernização empresarial',
    subtitulo:
      'Reposicione sua marca, ganhe eficiência operacional, sem crédito bancário caro',
    descricaoBreve:
      'Reposicione sua marca com investimento programado e sem crédito bancário caro.',
    descricaoLonga: [
      'Quando foi a última vez que suas instalações foram atualizadas? Empresas que modernizam seus espaços a cada ciclo apresentam ganhos significativos em produtividade e retenção de talentos. O retrofit empresarial via consórcio permite investir em modernização programada, sem juros bancários e sem comprometer o capital de giro da operação.',
      'A carta de crédito cobre projeto, materiais e mão de obra para modernização de plantas industriais, escritórios, espaços comerciais e áreas de atendimento. Liberação conforme cronograma físico da obra, garantindo controle orçamentário sem alavancagem.',
    ],
    gatilhoTemporal:
      'Empresas que iniciam retrofit no segundo semestre aproveitam condições de entrada facilitada dos grupos de junho',
    diferenciais: [
      {
        icone: 'Layers',
        titulo: 'Carta cobre todo o escopo',
        descricao:
          'Da demolição ao acabamento, projeto, materiais e execução em um único consórcio.',
      },
      {
        icone: 'CalendarCheck',
        titulo: 'Liberação por etapas',
        descricao:
          'Recursos liberados conforme avanço físico, garantindo controle financeiro rigoroso.',
      },
      {
        icone: 'BadgeCheck',
        titulo: 'Zero juros bancários',
        descricao:
          'Sem parcelas crescentes, sem comprometer linhas de crédito operacional.',
      },
      {
        icone: 'Zap',
        titulo: 'ROI mensurável',
        descricao:
          'Economia energética, produtividade e valorização do imóvel como retorno tangível.',
      },
    ],
    paraQuemEIndicado:
      'Empresas com instalações que completaram um ciclo de vida útil, operações que precisam adequar espaços para novos modelos de trabalho, e companhias que buscam certificações ambientais ou atualização de infraestrutura tecnológica.',
    cta: 'Planejar meu retrofit corporativo',
    comoFunciona: [
      {
        step: 1,
        titulo: 'Diagnóstico do espaço',
        descricao:
          'Avaliamos a infraestrutura atual e definimos o escopo ideal de modernização.',
      },
      {
        step: 2,
        titulo: 'Orçamento e carta',
        descricao:
          'Dimensionamos a carta para cobrir projeto, materiais e execução com margem.',
      },
      {
        step: 3,
        titulo: 'Liberação por etapas',
        descricao:
          'Recursos liberados conforme avanço físico, garantindo controle financeiro.',
      },
      {
        step: 4,
        titulo: 'Espaço transformado',
        descricao:
          'Instalações modernizadas, eficientes e alinhadas à identidade da marca.',
      },
    ],
    depoimento: {
      texto:
        'O retrofit da nossa sede de 2.000m² seria impensável com financiamento bancário. O consórcio nos deu previsibilidade orçamentária e liberação por etapas que respeitou o cronograma. Resultado: redução de 28% no custo energético.',
      autor: 'Rodrigo A.',
      cargo: 'Diretor de Operações',
      cidade: 'Campinas',
    },
    faq: [
      {
        pergunta: 'A carta cobre todo tipo de retrofit?',
        resposta:
          'Sim. Desde reformas de fachada e infraestrutura até modernização de interiores, instalações elétricas, hidráulicas e tecnológicas.',
      },
      {
        pergunta: 'Posso fazer retrofit em imóvel alugado?',
        resposta:
          'A carta é para modernização de imóvel próprio. Para imóvel alugado, consulte nosso gestor sobre alternativas dentro do ecossistema Plan 10.',
      },
      {
        pergunta: 'O retrofit gera retorno mensurável?',
        resposta:
          'Sim. Economia energética, redução de manutenção, aumento de produtividade e valorização do imóvel são métricas frequentemente reportadas.',
      },
    ],
    crossSelling: [
      {
        icone: 'HardHat',
        titulo: 'Seguro de obra e responsabilidade civil',
        descricao:
          'Cobertura durante todo o período de reforma.',
        link: '/seguros',
      },
      {
        icone: 'Zap',
        titulo: 'Consultoria em eficiência energética',
        descricao:
          'Maximize o ROI do retrofit com soluções sustentáveis.',
        link: '/financas',
      },
      {
        icone: 'Users',
        titulo: 'Seguro de benefícios corporativos',
        descricao:
          'Pacote de atração de talentos para o novo espaço.',
        link: '/saude',
      },
    ],
    ecossistema:
      'Quem moderniza com planejamento, também protege com seguro de obra, economiza com eficiência energética e atrai talentos com benefícios corporativos, tudo no ecossistema Plan 10.',
  },
  {
    id: 'patrimonio-produtivo',
    categoriaId: 'imobiliario-premium',
    tipo: 'pj',
    titulo: 'Patrimônio imobiliário produtivo',
    subtitulo:
      'Ativo gerador de renda recorrente, diversificação corporativa com solidez imobiliária',
    descricaoBreve:
      'Ativo gerador de renda recorrente, galpões, lotes industriais, salas comerciais.',
    descricaoLonga: [
      'Sua empresa depende de imóveis para operar, mas esses imóveis estão no balanço de quem? Cada mês de aluguel é receita transferida para o patrimônio do locador. O consórcio para patrimônio imobiliário produtivo inverte essa equação: transforma despesa recorrente em ativo gerador de renda, sem consumir linhas bancárias e sem avalistas.',
      'A carta de crédito aceita galpão logístico, lote industrial e sala comercial sem restrição de destinação, locação, operação própria ou revenda estratégica. Alienação fiduciária do próprio bem adquirido elimina a necessidade de garantias corporativas cruzadas.',
    ],
    gatilhoTemporal:
      'Galpões logísticos em regiões estratégicas com valorização acelerada, condições especiais para grupos de junho',
    diferenciais: [
      {
        icone: 'TrendingUp',
        titulo: 'Renda recorrente',
        descricao:
          'Ativo que gera receita mensal via locação, contribuindo para o fluxo de caixa corporativo.',
      },
      {
        icone: 'Shuffle',
        titulo: 'Sem restrição de destinação',
        descricao:
          'Locação, operação própria ou revenda, a empresa decide o melhor uso conforme a estratégia.',
      },
      {
        icone: 'Lock',
        titulo: 'Garantia simplificada',
        descricao:
          'Alienação fiduciária do próprio bem, sem avalistas corporativos ou garantias cruzadas.',
      },
      {
        icone: 'CreditCard',
        titulo: 'Linhas bancárias preservadas',
        descricao:
          'Consórcio não consome limite de crédito, capital de giro permanece intacto.',
      },
    ],
    paraQuemEIndicado:
      'Empresas que buscam diversificação patrimonial com renda recorrente, holdings que desejam compor portfólio imobiliário produtivo, e operações que pagam aluguel alto e querem converter despesa em ativo.',
    cta: 'Diversificar meu patrimônio corporativo',
    comoFunciona: [
      {
        step: 1,
        titulo: 'Análise estratégica',
        descricao:
          'Avaliamos o perfil corporativo, objetivos de renda e tipo de ativo desejado.',
      },
      {
        step: 2,
        titulo: 'Carta corporativa',
        descricao: 'Valor dimensionado para o segmento com prazo otimizado.',
      },
      {
        step: 3,
        titulo: 'Contemplação e aquisição',
        descricao:
          'Lance estratégico e negociação à vista para máximo valor patrimonial.',
      },
      {
        step: 4,
        titulo: 'Ativação de renda',
        descricao:
          'Locação, operação ou composição de portfólio com proteção do ecossistema.',
      },
    ],
    depoimento: {
      texto:
        'Tínhamos orçamento anual de R$ 480 mil em hospedagem executiva. Com duas unidades em São Paulo e Rio, reduzimos esse custo em 60% e ainda geramos renda nos períodos livres.',
      autor: 'Daniela M.',
      cargo: 'VP de Operações',
      cidade: 'São Paulo',
    },
    faq: [
      {
        pergunta: 'Posso comprar para alugar para terceiros?',
        resposta:
          'Sim. Sem restrição de destinação, locação para terceiros, operação própria ou revenda. A empresa decide conforme a estratégia.',
      },
      {
        pergunta: 'Galpão logístico é um bom investimento?',
        resposta:
          'Para empresas que buscam renda recorrente previsível, galpões em eixos estratégicos oferecem contratos longos e baixa vacância.',
      },
      {
        pergunta: 'Preciso dar garantias corporativas?',
        resposta:
          'Não. A alienação fiduciária é do próprio bem adquirido, sem avalistas, sem garantias cruzadas, sem comprometer outros ativos da empresa.',
      },
    ],
    crossSelling: [
      {
        icone: 'Building2',
        titulo: 'Seguro empresarial completo',
        descricao:
          'Proteção do imóvel produtivo e conteúdo operacional.',
        link: '/seguros',
      },
      {
        icone: 'Coins',
        titulo: 'Crédito empresarial complementar',
        descricao:
          'Soluções financeiras para capital de giro e expansão.',
        link: '/financas',
      },
      {
        icone: 'FileCheck',
        titulo: 'Garantia de locação corporativa',
        descricao:
          'Elimine riscos de inadimplência com seguro-fiança.',
        link: '/financas',
      },
    ],
    ecossistema:
      'Quem diversifica patrimônio com inteligência, também protege com seguro empresarial, garante renda com locação segura e cresce com crédito complementar, tudo no ecossistema Plan 10.',
  },
  {
    id: 'terra-produtiva-rural',
    categoriaId: 'imobiliario-premium',
    tipo: 'pj',
    titulo: 'Terra produtiva e rural',
    subtitulo:
      'Expansão territorial planejada, ativo de longo prazo que combina produção e valorização',
    descricaoBreve:
      'Expansão territorial planejada, alternativa inteligente ao crédito rural tradicional.',
    descricaoLonga: [
      'O agronegócio brasileiro responde por mais de um quarto do PIB nacional e projeta crescimento consistente nas próximas décadas. Para empresas do setor, a aquisição de terras produtivas via consórcio elimina a dependência de crédito rural sazonal e permite expansão territorial programada, sem juros bancários, sem vinculação a safra e sem comprometer o fluxo de caixa da operação.',
      'A carta de crédito aceita terras agrícolas, fazendas produtivas e propriedades rurais com matrícula regularizada em todo o território nacional. Plantio próprio, arrendamento ou reserva patrimonial, a empresa define a destinação conforme a estratégia.',
    ],
    gatilhoTemporal:
      'Terras produtivas em regiões de expansão agrícola com condições especiais, aproveite os novos grupos de junho',
    diferenciais: [
      {
        icone: 'TrendingUp',
        titulo: 'Valorização consistente',
        descricao:
          'Terras produtivas brasileiras apresentam apreciação real histórica sustentada acima de índices tradicionais.',
      },
      {
        icone: 'Tractor',
        titulo: 'Alternativa ao crédito rural',
        descricao:
          'Sem juros bancários, sem exigência de vinculação à safra ou produção.',
      },
      {
        icone: 'Shuffle',
        titulo: 'Flexibilidade de operação',
        descricao:
          'Plantio próprio, arrendamento ou reserva patrimonial conforme a estratégia.',
      },
      {
        icone: 'Lock',
        titulo: 'Garantia simplificada',
        descricao:
          'Alienação fiduciária do próprio bem, sem avalistas corporativos ou cruzados.',
      },
    ],
    paraQuemEIndicado:
      'Empresas do agronegócio em expansão territorial, cooperativas agrícolas, holdings rurais e investidores corporativos que reconhecem a terra como ativo resiliente de longo prazo.',
    cta: 'Planejar minha expansão territorial',
    comoFunciona: [
      {
        step: 1,
        titulo: 'Análise territorial',
        descricao: 'Entendemos a operação, região de interesse e objetivo.',
      },
      {
        step: 2,
        titulo: 'Carta rural dimensionada',
        descricao:
          'Valor calibrado para o mercado fundiário da região-alvo.',
      },
      {
        step: 3,
        titulo: 'Contemplação estratégica',
        descricao:
          'Gestor acompanha assembleias e inicia mapeamento de oportunidades.',
      },
      {
        step: 4,
        titulo: 'Aquisição com poder integral',
        descricao:
          'Negociação como pagador à vista em mercado onde isso faz diferença real.',
      },
    ],
    depoimento: {
      texto:
        'Sempre quis uma fazenda para os netos crescerem com liberdade. O consórcio nos deu tranquilidade para escolher com calma e comprar com poder de negociação real.',
      autor: 'Helena e Marcos T.',
      cargo: 'Aposentados',
      cidade: 'Campinas',
    },
    faq: [
      {
        pergunta: 'Posso usar para arrendar a terra?',
        resposta:
          'Sim. Sem restrição de destinação, produção própria, arrendamento para terceiros ou reserva patrimonial.',
      },
      {
        pergunta: 'Cooperativas podem participar?',
        resposta:
          'Sim. Cooperativas agrícolas podem aderir ao consórcio como pessoa jurídica e adquirir terras para expansão da base associada.',
      },
      {
        pergunta: 'Terra é melhor que crédito rural?',
        resposta:
          'São complementares. O consórcio é para aquisição da terra; o crédito rural financia custeio e investimento produtivo. Sem juros e sem vinculação a safra, o consórcio preserva a flexibilidade da operação.',
      },
    ],
    crossSelling: [
      {
        icone: 'Leaf',
        titulo: 'Seguro agrícola e pecuário',
        descricao:
          'Proteção da safra e do rebanho contra intempéries.',
        link: '/seguros',
      },
      {
        icone: 'Truck',
        titulo: 'Seguro de frota e maquinário',
        descricao:
          'Cobertura para tratores, colheitadeiras e frota rural.',
        link: '/seguros',
      },
      {
        icone: 'BarChart2',
        titulo: 'Consultoria para agronegócio',
        descricao:
          'Planejamento tributário e estruturação de holdings rurais.',
        link: '/financas',
      },
    ],
    ecossistema:
      'Quem expande com visão, também protege com seguro agrícola, equipa com seguro de maquinário e planeja com consultoria tributária rural, tudo no ecossistema Plan 10.',
  },
  {
    id: 'hospedagem-corporativa',
    categoriaId: 'imobiliario-premium',
    tipo: 'pj',
    titulo: 'Hospedagem corporativa estratégica',
    subtitulo:
      'Renda recorrente, benefício executivo e ativo no balanço, tudo em um único investimento',
    descricaoBreve:
      'Renda recorrente, benefício executivo e ativo no balanço em um único investimento.',
    descricaoLonga: [
      'Quanto sua empresa gasta anualmente com hospedagem de executivos em viagens corporativas? Agora imagine se essa despesa construísse patrimônio: um imóvel hoteleiro que gera renda nos períodos sem uso interno e ainda funciona como benefício executivo premium. O consórcio para hospedagem corporativa transforma custo recorrente em ativo estratégico de tripla finalidade.',
      'A carta de crédito aceita imóvel hoteleiro, unidades de condo-hotel e multipropriedade corporativa em destinos estratégicos. Um ativo que entrega valor em três frentes simultâneas: hospedagem executiva própria, renda recorrente via pool hoteleiro e patrimônio valorizado no balanço.',
    ],
    gatilhoTemporal:
      'Condo-hotéis em destinos executivos com pool hoteleiro garantido, condições especiais para novos grupos de junho',
    diferenciais: [
      {
        icone: 'Hotel',
        titulo: 'Hospedagem executiva',
        descricao:
          'Reduza custos de viagem corporativa com unidade própria nos destinos mais frequentados.',
      },
      {
        icone: 'TrendingUp',
        titulo: 'Renda recorrente',
        descricao:
          'Nos períodos sem uso interno, o imóvel gera receita via pool hoteleiro.',
      },
      {
        icone: 'Award',
        titulo: 'Benefício executivo premium',
        descricao:
          'Hospedagem em destinos exclusivos como ferramenta de retenção de talentos estratégicos.',
      },
      {
        icone: 'BarChart2',
        titulo: 'Ativo no balanço',
        descricao:
          'Patrimônio imobilizado que valoriza enquanto gera receita.',
      },
    ],
    paraQuemEIndicado:
      'Empresas com operação distribuída nacionalmente e despesas significativas com viagens corporativas, multinacionais com executivos em trânsito frequente, e companhias que buscam alternativas inteligentes ao orçamento de hospedagem.',
    cta: 'Explorar hospedagem corporativa',
    comoFunciona: [
      {
        step: 1,
        titulo: 'Diagnóstico de viagens',
        descricao:
          'Analisamos roteiros executivos, frequência e despesa atual com hospedagem.',
      },
      {
        step: 2,
        titulo: 'Destinos estratégicos',
        descricao:
          'Identificamos condo-hotéis e unidades hoteleiras nos hubs mais frequentados.',
      },
      {
        step: 3,
        titulo: 'Carta corporativa',
        descricao:
          'Valor dimensionado, prazo e lance alinhados ao orçamento de viagens.',
      },
      {
        step: 4,
        titulo: 'Tripla ativação',
        descricao:
          'Hospedagem própria, pool de renda e benefício executivo operando simultaneamente.',
      },
    ],
    depoimento: {
      texto:
        'Tínhamos orçamento anual de R$ 480 mil em hospedagem executiva. Com duas unidades em São Paulo e Rio, reduzimos esse custo em 60% e ainda geramos renda nos períodos livres. O patrimônio já valorizou mais do que pagaríamos em diárias.',
      autor: 'Daniela M.',
      cargo: 'VP de Operações',
      cidade: 'São Paulo',
    },
    faq: [
      {
        pergunta: 'O pool hoteleiro garante renda?',
        resposta:
          'A receita depende da taxa de ocupação do empreendimento. Em destinos executivos consolidados, as taxas são historicamente altas. Seu gestor apresenta dados do empreendimento antes da aquisição.',
      },
      {
        pergunta: 'Posso usar pessoalmente nos finais de semana?',
        resposta:
          'Depende do regulamento do pool hoteleiro. Muitos empreendimentos permitem uso pessoal em datas específicas. Verifique com seu gestor.',
      },
      {
        pergunta: 'Multipropriedade corporativa funciona?',
        resposta:
          'Sim. A multipropriedade dá acesso a múltiplos destinos com uma única cota, ideal para empresas com executivos em diferentes regiões.',
      },
    ],
    crossSelling: [
      {
        icone: 'Plane',
        titulo: 'Seguro viagem corporativo',
        descricao:
          'Proteção completa para executivos em trânsito.',
        link: '/seguros',
      },
      {
        icone: 'Users',
        titulo: 'Pacote de benefícios corporativos',
        descricao:
          'Saúde, odonto e vida para atração de talentos.',
        link: '/saude',
      },
      {
        icone: 'Building2',
        titulo: 'Consórcio de sede corporativa',
        descricao:
          'Complemente o portfólio imobiliário com escritório próprio.',
        link: '/consorcios?cat=imobiliario-premium&produto=imovel-corporativo&tipo=pj',
      },
    ],
    ecossistema:
      'Quem transforma viagem em patrimônio, também protege executivos com seguro viagem, atrai talentos com benefícios premium e diversifica com sede própria, tudo no ecossistema Plan 10.',
  },
];
