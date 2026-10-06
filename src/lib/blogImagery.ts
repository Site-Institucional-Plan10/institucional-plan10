/**
 * Imagem de cada artigo do blog.
 *
 * Cada um dos 68 artigos tem a sua própria foto, sem nenhuma repetição no blog.
 *
 * A primeira rodada usou 51 fotos para os 68 artigos, agrupando por assunto, e
 * ficou claro na tela: quatro textos sobre o mercado automotivo abriam com a
 * mesma vista de pátio de concessionária. Os 18 que dividiam imagem ganharam
 * foto própria, com cena deliberadamente distinta dentro do mesmo tema.
 *
 * FOTOS é a lista do que existe de verdade em public/assets/blog. Um assunto
 * que ainda não tenha foto simplesmente não devolve imagem, e o card volta ao
 * desenho sem foto em vez de mostrar imagem quebrada.
 */

const ASSUNTO_DO_ARTIGO: Record<string, string> = {
  "patrimonio-familiar-geracoes": "blog-geracoes",
  "sucessao-patrimonial-decisoes": "blog-sucessao",
  "patrimonio-estrutura-a-altura": "blog-patrimonio-estrutura",
  "responsabilidade-empresarial-continuidade": "blog-responsabilidade-empresarial",
  "mercado-de-protecao": "blog-mercado-seguros",
  "riscos-corporativos": "blog-riscos-corporativos",
  "grandes-riscos": "blog-grandes-riscos",
  "logistica": "blog-logistica-carga",
  "agro": "blog-agro-rural",
  "seguranca-e-prevencao": "blog-seguranca-privada",
  "escolha-em-saude-o-que-observar": "blog-plano-familia",
  "rede-credenciada-como-avaliar": "blog-rede-credenciada",
  "coordenacao-de-cuidado-jornada": "blog-jornada-cuidado",
  "saude-da-familia-por-fases": "blog-saude-fases",
  "beneficio-saude-empresas-retencao": "blog-saude-empresarial",
  "mercado-de-saude-suplementar": "blog-saude-suplementar",
  "hospitais-e-rede-assistencial": "blog-mapa-hospitalar",
  "saude-corporativa": "blog-saude-corporativa-gestao",
  "odontologia": "blog-odontologia",
  "saude-digital": "blog-saude-digital",
  "previdencia-o-que-ler-antes-de-assinar": "blog-previdencia",
  "protecao-de-renda-como-dimensionar": "blog-protecao-renda",
  "liquidez-quanto-deixar-disponivel": "blog-liquidez",
  "instituicoes-financeiras": "blog-sistema-financeiro",
  "cenario-economico": "blog-cenario-macro",
  "investimentos": "blog-investimentos",
  "garantias": "blog-garantias-contrato",
  "pagamentos-digitais": "blog-pagamentos-digitais",
  "timing-de-uma-conquista": "blog-timing-conquista",
  "estrutura-por-tipo-de-conquista": "blog-imovel-veiculo-expansao",
  "intervalo-entre-a-decisao-e-a-chave": "blog-chave-na-mao",
  "o-ritmo-que-faz-uma-empresa-crescer": "blog-expansao-empresarial",
  "marca-do-momento-e-a-escolha-que-fica": "blog-marca-do-momento",
  "quando-uma-marca-depende-de-um-modelo": "blog-marca-depende-de-um-modelo",
  "mercado-aquecido-nao-e-sinal-de-compra": "blog-mercado-aquecido",
  "quando-o-carro-deixa-de-ser-transporte": "blog-carro-paixao",
  "consorcios": "blog-consorcio",
  "imoveis": "blog-mercado-imobiliario",
  "maquinas": "blog-maquinas-equipamentos",
  "educacao-executiva": "blog-educacao-executiva",
  "eventos-e-experiencias": "blog-eventos-corporativos",
  "montadoras": "blog-industria-automotiva",
  "automobilismo": "blog-automobilismo",
  "eletrificacao": "blog-eletrificacao",
  "pos-venda": "blog-pos-venda",
  "mercado-automotivo": "blog-mercado-automotivo",
  "byd-recorde-julho-2026": "blog-byd-recorde",
  "concentracao-montadoras-brasil-2026": "blog-concentracao-montadoras",
  "mercado-brasileiro-primeiro-semestre-2026": "blog-mercado-brasileiro-semestre",
  "nautica": "blog-nautica",
  "aviacao-executiva": "blog-aviacao-executiva",
  "viagem-internacional-estrutura": "blog-viagem-internacional",
  "continuidade-da-operacao": "blog-continuidade-operacao",
  "assistencia-tempo-e-rotina": "blog-tempo-dia-a-dia",
  "beneficios-de-assistencia-nas-empresas": "blog-assistencia-corporativa",
  "calendario-anual-de-cuidados-da-casa": "blog-calendario-casa",
  "prevencao-para-bens-de-alto-valor": "blog-prevencao-bens-alto-valor",
  "discricao-cuidado-com-o-que-se-conquistou": "blog-discricao",
  "a-tranquilidade-de-ter-tudo-a-mao": "blog-tudo-resolvido",
  "assistencia-24h": "blog-assistencia-24h",
  "facilities": "blog-facilities",
  "tecnologia-corporativa": "blog-tecnologia-suporte",
  "mobilidade-assistida": "blog-mobilidade-assistida",
  "concierge": "blog-concierge-corporativo",
  "custo-de-adiar-decisoes-pequenas": "blog-adiar-decisoes",
  "viajar-sem-levar-problema-junto": "blog-viajar-tranquilo",
  "casa-muda-de-funcao-com-a-familia": "blog-casa-muda-de-fase",
  "mercado-de-luxo": "blog-mercado-luxo",
};

/** Legenda de cada assunto, para o alt. Preenchida junto com o arquivo. */
export interface Foto {
  src: string;
  alt: string;
}

const B = "/assets/blog/";

const FOTOS: Record<string, Foto> = {
  "blog-marca-do-momento": { src: B + "blog-marca-do-momento.webp", alt: "Traseira de um carro escuro no piso do showroom, com a faixa de luz acesa" },
  "blog-mercado-aquecido": { src: B + "blog-mercado-aquecido.jpg", alt: "Trevo rodoviário visto de cima, com filas de carros nas alças" },
  "blog-mercado-brasileiro-semestre": { src: B + "blog-mercado-brasileiro-semestre.jpg", alt: "Navio de transporte atracado, com o convés tomado por carros novos" },
  "blog-marca-depende-de-um-modelo": { src: B + "blog-marca-depende-de-um-modelo.jpg", alt: "Vista aérea de um único carro parado num recuo de estrada" },
  "blog-concentracao-montadoras": { src: B + "blog-concentracao-montadoras.webp", alt: "Galpão de produção com passarelas de tubulação e piso livre" },
  "blog-mapa-hospitalar": { src: B + "blog-mapa-hospitalar.webp", alt: "Ambulâncias estacionadas, vistas de trás" },
  "blog-saude-corporativa-gestao": { src: B + "blog-saude-corporativa-gestao.webp", alt: "Estação de trabalho com cadeira ergonômica e monitor" },
  "blog-cenario-macro": { src: B + "blog-cenario-macro.webp", alt: "Skyline de um centro financeiro no fim da tarde" },
  "blog-casa-muda-de-fase": { src: B + "blog-casa-muda-de-fase.webp", alt: "Interior residencial em reforma, com montantes de madeira à vista" },
  "blog-carro-paixao": { src: B + "blog-carro-paixao.webp", alt: "Volante e painel de um carro antigo, vistos pela janela" },
  "blog-discricao": { src: B + "blog-discricao.jpg", alt: "Portão de ferro fechado entre árvores, com lampiões acesos ao fundo" },
  "blog-tecnologia-suporte": { src: B + "blog-tecnologia-suporte.webp", alt: "Técnico encaixando uma placa de rede no rack" },
  "blog-tudo-resolvido": { src: B + "blog-tudo-resolvido.webp", alt: "Mesa de varanda com xícaras e bule, na luz da manhã" },
  "blog-concierge-corporativo": { src: B + "blog-concierge-corporativo.webp", alt: "Mão tocando a campainha sobre o balcão de recepção" },
  "blog-adiar-decisoes": { src: B + "blog-adiar-decisoes.webp", alt: "Torneira cromada pingando, com a gota prestes a cair" },
  "blog-prevencao-bens-alto-valor": { src: B + "blog-prevencao-bens-alto-valor.webp", alt: "Corredor de adega com estantes cheias até o teto" },
  "blog-byd-recorde": { src: B + "blog-byd-recorde.webp", alt: "Carros elétricos em vagas de garagem, com carregadores de parede" },
  "blog-garantias-contrato": { src: B + "blog-garantias-contrato.webp", alt: "Carimbo de lacre sobre papel, com o selo de cera já impresso ao lado" },
  "blog-geracoes": { src: B + "blog-geracoes.jpg", alt: "Família caminhando de costas em um parque, com uma cesta de piquenique" },
  "blog-sucessao": { src: B + "blog-sucessao.webp", alt: "Mãos de uma pessoa idosa assinando um documento sobre a mesa" },
  "blog-patrimonio-estrutura": { src: B + "blog-patrimonio-estrutura.jpg", alt: "Residência contemporânea de madeira e pedra com gramado amplo" },
  "blog-responsabilidade-empresarial": { src: B + "blog-responsabilidade-empresarial.webp", alt: "Sala de conselho vazia com poltronas de couro enfileiradas" },
  "blog-mercado-seguros": { src: B + "blog-mercado-seguros.webp", alt: "Mesa de escritório com notebook diante de um vidro panorâmico sobre a cidade" },
  "blog-riscos-corporativos": { src: B + "blog-riscos-corporativos.webp", alt: "Corredor interno de fábrica com esteiras e faixas de circulação" },
  "blog-grandes-riscos": { src: B + "blog-grandes-riscos.webp", alt: "Refinaria ao entardecer, com torres de destilação e tanques" },
  "blog-logistica-carga": { src: B + "blog-logistica-carga.webp", alt: "Carreta de carga em uma rodovia arborizada" },
  "blog-agro-rural": { src: B + "blog-agro-rural.webp", alt: "Colheitadeira trabalhando em lavoura de trigo" },
  "blog-seguranca-privada": { src: B + "blog-seguranca-privada.webp", alt: "Câmeras de monitoramento em braço metálico, com torre corporativa ao fundo" },
  "blog-plano-familia": { src: B + "blog-plano-familia.webp", alt: "Aferição de pressão arterial em consultório" },
  "blog-rede-credenciada": { src: B + "blog-rede-credenciada.webp", alt: "Recepção de clínica com balcão e poltronas" },
  "blog-jornada-cuidado": { src: B + "blog-jornada-cuidado.webp", alt: "Profissional de jaleco anotando em uma prancheta" },
  "blog-saude-fases": { src: B + "blog-saude-fases.webp", alt: "Mãos jovens e idosas entrelaçadas, em preto e branco" },
  "blog-saude-empresarial": { src: B + "blog-saude-empresarial.webp", alt: "Mesa de trabalho com notebook, estetoscópio e caderno" },
  "blog-saude-suplementar": { src: B + "blog-saude-suplementar.webp", alt: "Corredor largo de hospital moderno em perspectiva" },
  "blog-odontologia": { src: B + "blog-odontologia.webp", alt: "Instrumentos odontológicos do equipo, em close" },
  "blog-saude-digital": { src: B + "blog-saude-digital.webp", alt: "Smartphone ao lado de um estetoscópio sobre superfície branca" },
  "blog-previdencia": { src: B + "blog-previdencia.webp", alt: "Ampulheta sobre mesa de madeira com a luz da manhã" },
  "blog-protecao-renda": { src: B + "blog-protecao-renda.webp", alt: "Mãos de marceneiro passando plaina em uma tábua" },
  "blog-liquidez": { src: B + "blog-liquidez.webp", alt: "Cédulas de real abertas em leque" },
  "blog-sistema-financeiro": { src: B + "blog-sistema-financeiro.jpg", alt: "Corredor de data center com racks de servidores" },
  "blog-investimentos": { src: B + "blog-investimentos.webp", alt: "Gráfico de candles do mercado em uma tela" },
  "blog-pagamentos-digitais": { src: B + "blog-pagamentos-digitais.webp", alt: "Cartão aproximado de uma maquininha de pagamento" },
  "blog-timing-conquista": { src: B + "blog-timing-conquista.webp", alt: "Mão estendida entregando a chave de um carro" },
  "blog-imovel-veiculo-expansao": { src: B + "blog-imovel-veiculo-expansao.webp", alt: "Casa moderna de linhas retas com jardim e garagem" },
  "blog-chave-na-mao": { src: B + "blog-chave-na-mao.webp", alt: "Mão segurando um molho de chaves" },
  "blog-expansao-empresarial": { src: B + "blog-expansao-empresarial.webp", alt: "Prédios corporativos de vidro vistos de baixo" },
  "blog-consorcio": { src: B + "blog-consorcio.webp", alt: "Moedas empilhadas ao lado de uma casa em miniatura" },
  "blog-mercado-imobiliario": { src: B + "blog-mercado-imobiliario.webp", alt: "Vista aérea de torres residenciais" },
  "blog-maquinas-equipamentos": { src: B + "blog-maquinas-equipamentos.webp", alt: "Lanças de guindaste apontando para o céu" },
  "blog-educacao-executiva": { src: B + "blog-educacao-executiva.webp", alt: "Auditório moderno com poltronas em curva e palco" },
  "blog-eventos-corporativos": { src: B + "blog-eventos-corporativos.webp", alt: "Treliça de palco montada com refletores" },
  "blog-industria-automotiva": { src: B + "blog-industria-automotiva.webp", alt: "Braços robóticos montando uma carroceria na linha de produção" },
  "blog-automobilismo": { src: B + "blog-automobilismo.jpg", alt: "Pelotão de carros de corrida em uma curva de autódromo" },
  "blog-eletrificacao": { src: B + "blog-eletrificacao.webp", alt: "Veículo elétrico conectado a um carregador de rua" },
  "blog-pos-venda": { src: B + "blog-pos-venda.webp", alt: "Mãos de mecânico trabalhando no freio de um carro suspenso" },
  "blog-mercado-automotivo": { src: B + "blog-mercado-automotivo.webp", alt: "Vista aérea do pátio de uma concessionária" },
  "blog-nautica": { src: B + "blog-nautica.webp", alt: "Iates atracados em uma marina" },
  "blog-aviacao-executiva": { src: B + "blog-aviacao-executiva.webp", alt: "Jatos executivos dentro de um hangar" },
  "blog-viagem-internacional": { src: B + "blog-viagem-internacional.webp", alt: "Interior do finger de embarque com a aeronave ao fundo" },
  "blog-continuidade-operacao": { src: B + "blog-continuidade-operacao.jpg", alt: "Corredor de armazém com porta-paletes e empilhadeira" },
  "blog-tempo-dia-a-dia": { src: B + "blog-tempo-dia-a-dia.webp", alt: "Sala de estar clara e arrumada, com luz natural" },
  "blog-assistencia-corporativa": { src: B + "blog-assistencia-corporativa.webp", alt: "Escritório aberto com estações de trabalho" },
  "blog-calendario-casa": { src: B + "blog-calendario-casa.webp", alt: "Ferramentas manuais penduradas na parede da oficina" },
  "blog-assistencia-24h": { src: B + "blog-assistencia-24h.webp", alt: "Operador em sala de controle diante de um painel de monitores" },
  "blog-facilities": { src: B + "blog-facilities.webp", alt: "Fachada de vidro de edifício corporativo com balancim suspenso" },
  "blog-mobilidade-assistida": { src: B + "blog-mobilidade-assistida.jpg", alt: "Cadeira de rodas em movimento no asfalto" },
  "blog-viajar-tranquilo": { src: B + "blog-viajar-tranquilo.webp", alt: "Mala aberta sendo arrumada" },
  "blog-mercado-luxo": { src: B + "blog-mercado-luxo.webp", alt: "Salão de relojoaria com vitrines de vidro" },
};

export function fotoDoArtigo(slug: string): Foto | null {
  const assunto = ASSUNTO_DO_ARTIGO[slug];
  if (!assunto) return null;
  return FOTOS[assunto] ?? null;
}
