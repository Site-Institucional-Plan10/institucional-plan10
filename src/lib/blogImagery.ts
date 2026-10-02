/**
 * Imagem de cada artigo do blog.
 *
 * O catálogo tem 68 artigos e assuntos que se repetem: cinco textos sobre o
 * setor automotivo, cinco sobre o sistema de saúde, e assim por diante. Em vez
 * de uma foto por artigo, que levaria a repetir tema com foto diferente e a
 * gastar curadoria em cima de nada, cada artigo aponta para um ASSUNTO, e cada
 * assunto tem a sua foto. São 51 assuntos para os 68 artigos.
 *
 * ARQUIVOS é a lista do que existe de verdade em public/assets/blog. Um assunto
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

const FOTOS: Record<string, Foto> = {};

export function fotoDoArtigo(slug: string): Foto | null {
  const assunto = ASSUNTO_DO_ARTIGO[slug];
  if (!assunto) return null;
  return FOTOS[assunto] ?? null;
}
