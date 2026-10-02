/**
 * Imagem de cada artigo do blog.
 *
 * O catálogo tem 68 artigos e assuntos que se repetem: cinco textos sobre o
 * setor automotivo, cinco sobre o sistema de saúde, e assim por diante. Em vez
 * de uma foto por artigo, que levaria a repetir tema com foto diferente e a
 * gastar curadoria em cima de nada, cada artigo aponta para um ASSUNTO, e cada
 * assunto tem a sua foto. São 51 assuntos para os 68 artigos.
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
  "hospitais-e-rede-assistencial": "blog-rede-credenciada",
  "saude-corporativa": "blog-saude-empresarial",
  "odontologia": "blog-odontologia",
  "saude-digital": "blog-saude-digital",
  "previdencia-o-que-ler-antes-de-assinar": "blog-previdencia",
  "protecao-de-renda-como-dimensionar": "blog-protecao-renda",
  "liquidez-quanto-deixar-disponivel": "blog-liquidez",
  "instituicoes-financeiras": "blog-sistema-financeiro",
  "cenario-economico": "blog-sistema-financeiro",
  "investimentos": "blog-investimentos",
  "garantias": "blog-garantias-contrato",
  "pagamentos-digitais": "blog-pagamentos-digitais",
  "timing-de-uma-conquista": "blog-timing-conquista",
  "estrutura-por-tipo-de-conquista": "blog-imovel-veiculo-expansao",
  "intervalo-entre-a-decisao-e-a-chave": "blog-chave-na-mao",
  "o-ritmo-que-faz-uma-empresa-crescer": "blog-expansao-empresarial",
  "marca-do-momento-e-a-escolha-que-fica": "blog-mercado-automotivo",
  "quando-uma-marca-depende-de-um-modelo": "blog-industria-automotiva",
  "mercado-aquecido-nao-e-sinal-de-compra": "blog-mercado-automotivo",
  "quando-o-carro-deixa-de-ser-transporte": "blog-automobilismo",
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
  "byd-recorde-julho-2026": "blog-eletrificacao",
  "concentracao-montadoras-brasil-2026": "blog-industria-automotiva",
  "mercado-brasileiro-primeiro-semestre-2026": "blog-mercado-automotivo",
  "nautica": "blog-nautica",
  "aviacao-executiva": "blog-aviacao-executiva",
  "viagem-internacional-estrutura": "blog-viagem-internacional",
  "continuidade-da-operacao": "blog-continuidade-operacao",
  "assistencia-tempo-e-rotina": "blog-tempo-dia-a-dia",
  "beneficios-de-assistencia-nas-empresas": "blog-assistencia-corporativa",
  "calendario-anual-de-cuidados-da-casa": "blog-calendario-casa",
  "prevencao-para-bens-de-alto-valor": "blog-mercado-luxo",
  "discricao-cuidado-com-o-que-se-conquistou": "blog-seguranca-privada",
  "a-tranquilidade-de-ter-tudo-a-mao": "blog-tempo-dia-a-dia",
  "assistencia-24h": "blog-assistencia-24h",
  "facilities": "blog-facilities",
  "tecnologia-corporativa": "blog-continuidade-operacao",
  "mobilidade-assistida": "blog-mobilidade-assistida",
  "concierge": "blog-assistencia-corporativa",
  "custo-de-adiar-decisoes-pequenas": "blog-calendario-casa",
  "viajar-sem-levar-problema-junto": "blog-viajar-tranquilo",
  "casa-muda-de-funcao-com-a-familia": "blog-chave-na-mao",
  "mercado-de-luxo": "blog-mercado-luxo",
};

/** Legenda de cada assunto, para o alt. Preenchida junto com o arquivo. */
export interface Foto {
  src: string;
  alt: string;
}

const B = "/assets/blog/";

const FOTOS: Record<string, Foto> = {
  "blog-geracoes": { src: B + "blog-geracoes.jpg", alt: "Família caminhando de costas em um parque, com uma cesta de piquenique" },
  "blog-sucessao": { src: B + "blog-sucessao.jpg", alt: "Mãos de uma pessoa idosa assinando um documento sobre a mesa" },
  "blog-patrimonio-estrutura": { src: B + "blog-patrimonio-estrutura.jpg", alt: "Residência contemporânea de madeira e pedra com gramado amplo" },
  "blog-responsabilidade-empresarial": { src: B + "blog-responsabilidade-empresarial.jpg", alt: "Sala de conselho vazia com poltronas de couro enfileiradas" },
  "blog-mercado-seguros": { src: B + "blog-mercado-seguros.jpg", alt: "Mesa de escritório com notebook diante de um vidro panorâmico sobre a cidade" },
  "blog-riscos-corporativos": { src: B + "blog-riscos-corporativos.jpg", alt: "Corredor interno de fábrica com esteiras e faixas de circulação" },
  "blog-grandes-riscos": { src: B + "blog-grandes-riscos.jpg", alt: "Refinaria ao entardecer, com torres de destilação e tanques" },
  "blog-logistica-carga": { src: B + "blog-logistica-carga.jpg", alt: "Carreta de carga em uma rodovia arborizada" },
  "blog-agro-rural": { src: B + "blog-agro-rural.jpg", alt: "Colheitadeira trabalhando em lavoura de trigo" },
  "blog-seguranca-privada": { src: B + "blog-seguranca-privada.jpg", alt: "Câmeras de monitoramento em braço metálico, com torre corporativa ao fundo" },
  "blog-plano-familia": { src: B + "blog-plano-familia.jpg", alt: "Aferição de pressão arterial em consultório" },
  "blog-rede-credenciada": { src: B + "blog-rede-credenciada.jpg", alt: "Recepção de clínica com balcão e poltronas" },
  "blog-jornada-cuidado": { src: B + "blog-jornada-cuidado.jpg", alt: "Profissional de jaleco anotando em uma prancheta" },
  "blog-saude-fases": { src: B + "blog-saude-fases.jpg", alt: "Mãos jovens e idosas entrelaçadas, em preto e branco" },
  "blog-saude-empresarial": { src: B + "blog-saude-empresarial.jpg", alt: "Mesa de trabalho com notebook, estetoscópio e caderno" },
  "blog-saude-suplementar": { src: B + "blog-saude-suplementar.jpg", alt: "Corredor largo de hospital moderno em perspectiva" },
  "blog-odontologia": { src: B + "blog-odontologia.jpg", alt: "Instrumentos odontológicos do equipo, em close" },
  "blog-saude-digital": { src: B + "blog-saude-digital.jpg", alt: "Smartphone ao lado de um estetoscópio sobre superfície branca" },
  "blog-previdencia": { src: B + "blog-previdencia.jpg", alt: "Ampulheta sobre mesa de madeira com a luz da manhã" },
  "blog-protecao-renda": { src: B + "blog-protecao-renda.jpg", alt: "Mãos de marceneiro passando plaina em uma tábua" },
  "blog-liquidez": { src: B + "blog-liquidez.jpg", alt: "Cédulas de real abertas em leque" },
  "blog-sistema-financeiro": { src: B + "blog-sistema-financeiro.jpg", alt: "Corredor de data center com racks de servidores" },
  "blog-investimentos": { src: B + "blog-investimentos.jpg", alt: "Gráfico de candles do mercado em uma tela" },
  "blog-pagamentos-digitais": { src: B + "blog-pagamentos-digitais.jpg", alt: "Cartão aproximado de uma maquininha de pagamento" },
  "blog-timing-conquista": { src: B + "blog-timing-conquista.jpg", alt: "Mão estendida entregando a chave de um carro" },
  "blog-imovel-veiculo-expansao": { src: B + "blog-imovel-veiculo-expansao.jpg", alt: "Casa moderna de linhas retas com jardim e garagem" },
  "blog-chave-na-mao": { src: B + "blog-chave-na-mao.jpg", alt: "Mão segurando um molho de chaves" },
  "blog-expansao-empresarial": { src: B + "blog-expansao-empresarial.jpg", alt: "Prédios corporativos de vidro vistos de baixo" },
  "blog-consorcio": { src: B + "blog-consorcio.jpg", alt: "Moedas empilhadas ao lado de uma casa em miniatura" },
  "blog-mercado-imobiliario": { src: B + "blog-mercado-imobiliario.jpg", alt: "Vista aérea de torres residenciais" },
  "blog-maquinas-equipamentos": { src: B + "blog-maquinas-equipamentos.jpg", alt: "Lanças de guindaste apontando para o céu" },
  "blog-educacao-executiva": { src: B + "blog-educacao-executiva.jpg", alt: "Auditório moderno com poltronas em curva e palco" },
  "blog-eventos-corporativos": { src: B + "blog-eventos-corporativos.jpg", alt: "Treliça de palco montada com refletores" },
  "blog-industria-automotiva": { src: B + "blog-industria-automotiva.jpg", alt: "Braços robóticos montando uma carroceria na linha de produção" },
  "blog-automobilismo": { src: B + "blog-automobilismo.jpg", alt: "Pelotão de carros de corrida em uma curva de autódromo" },
  "blog-eletrificacao": { src: B + "blog-eletrificacao.jpg", alt: "Veículo elétrico conectado a um carregador de rua" },
  "blog-pos-venda": { src: B + "blog-pos-venda.jpg", alt: "Mãos de mecânico trabalhando no freio de um carro suspenso" },
  "blog-mercado-automotivo": { src: B + "blog-mercado-automotivo.jpg", alt: "Vista aérea do pátio de uma concessionária" },
  "blog-nautica": { src: B + "blog-nautica.jpg", alt: "Iates atracados em uma marina" },
  "blog-aviacao-executiva": { src: B + "blog-aviacao-executiva.jpg", alt: "Jatos executivos dentro de um hangar" },
  "blog-viagem-internacional": { src: B + "blog-viagem-internacional.jpg", alt: "Interior do finger de embarque com a aeronave ao fundo" },
  "blog-continuidade-operacao": { src: B + "blog-continuidade-operacao.jpg", alt: "Corredor de armazém com porta-paletes e empilhadeira" },
  "blog-tempo-dia-a-dia": { src: B + "blog-tempo-dia-a-dia.jpg", alt: "Sala de estar clara e arrumada, com luz natural" },
  "blog-assistencia-corporativa": { src: B + "blog-assistencia-corporativa.jpg", alt: "Escritório aberto com estações de trabalho" },
  "blog-calendario-casa": { src: B + "blog-calendario-casa.jpg", alt: "Ferramentas manuais penduradas na parede da oficina" },
  "blog-assistencia-24h": { src: B + "blog-assistencia-24h.jpg", alt: "Operador em sala de controle diante de um painel de monitores" },
  "blog-facilities": { src: B + "blog-facilities.jpg", alt: "Fachada de vidro de edifício corporativo com balancim suspenso" },
  "blog-mobilidade-assistida": { src: B + "blog-mobilidade-assistida.jpg", alt: "Cadeira de rodas em movimento no asfalto" },
  "blog-viajar-tranquilo": { src: B + "blog-viajar-tranquilo.jpg", alt: "Mala aberta sendo arrumada" },
  "blog-mercado-luxo": { src: B + "blog-mercado-luxo.jpg", alt: "Salão de relojoaria com vitrines de vidro" },
};

export function fotoDoArtigo(slug: string): Foto | null {
  const assunto = ASSUNTO_DO_ARTIGO[slug];
  if (!assunto) return null;
  return FOTOS[assunto] ?? null;
}
