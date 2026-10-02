/**
 * Foto de assunto por hub e por categoria.
 *
 * O acervo antigo (`imagery.ts`) tem 11 fotos de clima: textura azul, sombra de
 * persiana, envelopes lacrados, fachada de vidro, mar. Elas combinam entre si,
 * mas nenhuma mostra o assunto da página. Rodando a regra de escolha sobre o
 * catálogo real, as 38 páginas de hub e categoria abriam assim: Logística com
 * mãos de bebê, Odontologia com um notebook sobre a mesa, Saúde animal com
 * textura azul, Máquinas e equipamentos com envelopes de lacre dourado. Cada
 * foto abria até cinco páginas diferentes.
 *
 * Aqui cada hub e cada categoria tem a foto do próprio assunto. O que não
 * estiver neste mapa continua caindo no acervo antigo, então a troca pode ser
 * feita por partes sem quebrar página nenhuma.
 */
import type { CuratedImage } from "./imagery";

/** Chave da categoria: "<hub>/<categoria>". Hub sozinho: "<hub>". */
const T = "/assets/temas/";

const TEMAS: Record<string, CuratedImage> = {
  "saude": { src: T + "hub-saude.jpg", alt: "Quatro pessoas correndo juntas em uma ponte, vistas de costas" },
  "protecao": { src: T + "hub-protecao.jpg", alt: "Vista aérea de um bairro residencial com praça central" },
  "crescimento": { src: T + "hub-crescimento.jpg", alt: "Rodovia em curva levando ao skyline da cidade no fim da tarde" },
  "assistencia": { src: T + "hub-assistencia.jpg", alt: "Lobby corporativo em mármore e madeira" },
  "assistencia/ambientes-manutencao-e-bem-estar": { src: T + "assist-ambientes.jpg", alt: "Profissional instalando uma tomada na parede" },
  "assistencia/mobilidade-assistida": { src: T + "assist-mobilidade.jpg", alt: "Acompanhante conduzindo uma cadeira de rodas na calçada" },
  "assistencia/nauticos-e-aeronauticos": { src: T + "assist-nautico-aereo.jpg", alt: "Marina com veleiros atracados" },
  "assistencia/seguranca-e-conectividade": { src: T + "assist-seguranca.jpg", alt: "Câmera de segurança instalada no forro" },
  "assistencia/viagens-beneficios-e-concierge": { src: T + "assist-viagens.jpg", alt: "Terminal de aeroporto moderno com fachada de vidro" },
  "crescimento/bens-de-valor-e-tecnologia": { src: "/assets/blog/blog-sistema-financeiro.jpg", alt: "Corredor de data center com racks de servidores" },
  "crescimento/eventos-educacao-e-experiencias": { src: T + "cresc-eventos-educacao.jpg", alt: "Auditório amplo com fileiras de cadeiras" },
  "crescimento/imoveis-e-expansao-patrimonial": { src: T + "cresc-imoveis.jpg", alt: "Casa contemporânea de alto padrão vista do portão" },
  "crescimento/maquinas-e-equipamentos": { src: T + "cresc-maquinas.jpg", alt: "Pá carregadeira movimentando terra" },
  "crescimento/nauticos-e-aeronauticos": { src: T + "cresc-nautico-aereo.jpg", alt: "Jato executivo taxiando na pista" },
  "crescimento/veiculos-e-frotas": { src: T + "cresc-veiculos.jpg", alt: "Pátio com centenas de carros novos enfileirados, visto de cima" },
  "protecao/agronegocio-e-campo": { src: T + "prot-agro.jpg", alt: "Colheitadeira vista de cima em lavoura de trigo" },
  "protecao/garantias-e-contratos": { src: T + "prot-garantias.jpg", alt: "Mão assinando um contrato na linha da assinatura" },
  "protecao/grandes-riscos": { src: T + "prot-grandes-riscos.jpg", alt: "Refinaria vista do alto, com torres e tanques" },
  "protecao/logistica-e-transporte": { src: T + "prot-logistica.jpg", alt: "Centro de distribuição visto de cima, com carretas nas docas" },
  "protecao/nauticos-e-aeronauticos": { src: T + "prot-nautico-aereo.jpg", alt: "Veleiro de grande porte em mar aberto" },
  "protecao/patrimonio-e-alto-valor": { src: T + "prot-patrimonio.jpg", alt: "Galeria de arte com quadros emoldurados na parede" },
  "protecao/renda-protegida": { src: T + "prot-renda.jpg", alt: "Profissional trabalhando em uma mesa de escritório, visto por trás" },
  "protecao/responsabilidade-civil": { src: T + "prot-responsabilidade-civil.jpg", alt: "Mesa de reunião vazia em ambiente sóbrio" },
  "protecao/veiculos-e-frotas": { src: T + "prot-veiculos.jpg", alt: "Automóvel visto de cima sobre o asfalto" },
  "protecao/viagem": { src: T + "prot-viagem.jpg", alt: "Passageiro puxando mala no corredor do aeroporto" },
  "protecao/vida": { src: T + "prot-vida.jpg", alt: "Silhueta de uma família em um mirante ao pôr do sol" },
  "saude/bem-estar-e-qualidade-de-vida": { src: T + "saude-bem-estar.jpg", alt: "Legumes e verduras frescos vistos de cima" },
  "saude/odontologia": { src: T + "saude-odontologia.jpg", alt: "Bandeja com instrumental odontológico no consultório" },
  "saude/saude-animal": { src: T + "saude-animal.jpg", alt: "Mãos com luva acolhendo um cão na mesa da clínica" },
  "saude/saude-corporativa": { src: T + "saude-corporativa.jpg", alt: "Escritório com estações de trabalho e cadeiras ergonômicas" },
  "saude/saude-e-acesso-medico": { src: T + "saude-acesso-medico.jpg", alt: "Profissional de saúde com estetoscópio, enquadrado do pescoço para baixo" },
};

export function fotoDoTema(chave: string): CuratedImage | null {
  return TEMAS[chave] ?? null;
}

/**
 * Imagem de apoio no corpo da página de categoria, no bloco "Como escolher".
 * É sempre outro ângulo do mesmo assunto do banner, nunca a mesma cena.
 */
const CONTEXTOS: Record<string, CuratedImage> = {
  saude: { src: T + "ctx-hub-saude.jpg", alt: "Halteres alinhados no suporte da academia" },
  protecao: { src: T + "ctx-hub-protecao.jpg", alt: "Casa residencial ao entardecer, com as janelas acesas" },
  crescimento: { src: T + "ctx-hub-crescimento.jpg", alt: "Prédio em obra com guindaste de torre" },
  assistencia: { src: T + "ctx-hub-assistencia.jpg", alt: "Central de atendimento com estações e headsets" },
  "protecao/patrimonio-e-alto-valor": { src: T + "ctx-prot-patrimonio.jpg", alt: "Piano de cauda em sala clara de pé-direito alto" },
  "protecao/responsabilidade-civil": { src: T + "ctx-prot-responsabilidade-civil.jpg", alt: "Pasta fechada com caneta sobre a mesa de reunião" },
  "saude/saude-e-acesso-medico": { src: T + "ctx-saude-acesso-medico.jpg", alt: "Maca de exame em sala branca, com gaveteiro ao lado" },
  "assistencia/ambientes-manutencao-e-bem-estar": { src: T + "ctx-assist-ambientes.jpg", alt: "Mãos de encanador apertando tubulação sob a laje" },
  "assistencia/mobilidade-assistida": { src: T + "ctx-assist-mobilidade.jpg", alt: "Andadores com rodas parados na grama de um parque" },
  "assistencia/nauticos-e-aeronauticos": { src: T + "ctx-assist-nautico-aereo.jpg", alt: "Hélice e nariz de aeronave dentro do hangar" },
  "assistencia/seguranca-e-conectividade": { src: T + "ctx-assist-seguranca.jpg", alt: "Patch panel com cabos de fibra conectados" },
  "assistencia/viagens-beneficios-e-concierge": { src: T + "ctx-assist-viagens.jpg", alt: "Corredor de hotel com carrinho de bagagem ao fundo" },
  "crescimento/bens-de-valor-e-tecnologia": { src: T + "ctx-cresc-bens-tecnologia.jpg", alt: "Faders e botões de uma mesa de som profissional" },
  "crescimento/eventos-educacao-e-experiencias": { src: T + "ctx-cresc-eventos-educacao.jpg", alt: "Plateia de costas em auditório, com o palco ao fundo" },
  "crescimento/imoveis-e-expansao-patrimonial": { src: T + "ctx-cresc-imoveis.jpg", alt: "Fachada de prédio residencial contemporâneo com sacadas de vidro" },
  "crescimento/maquinas-e-equipamentos": { src: T + "ctx-cresc-maquinas.jpg", alt: "Lanças de guindaste de treliça vistas de baixo" },
  "crescimento/nauticos-e-aeronauticos": { src: T + "ctx-cresc-nautico-aereo.jpg", alt: "Iate a motor navegando, visto de cima" },
  "crescimento/veiculos-e-frotas": { src: T + "ctx-cresc-veiculos.jpg", alt: "Fila de carros zero no pátio, vistos ao nível do chão" },
  "protecao/agronegocio-e-campo": { src: T + "ctx-prot-agro.jpg", alt: "Pivô de irrigação molhando a lavoura" },
  "protecao/garantias-e-contratos": { src: T + "ctx-prot-garantias.jpg", alt: "Pastas de arquivo lotadas de documentos sobre a mesa" },
  "protecao/grandes-riscos": { src: T + "ctx-prot-grandes-riscos.jpg", alt: "Tanques industriais com passarelas e tubulação" },
  "protecao/logistica-e-transporte": { src: T + "ctx-prot-logistica.jpg", alt: "Carreta de carga na rodovia, vista por trás" },
  "protecao/nauticos-e-aeronauticos": { src: T + "ctx-prot-nautico-aereo.jpg", alt: "Timão e console de um veleiro, com o mar ao fundo" },
  "protecao/renda-protegida": { src: T + "ctx-prot-renda.jpg", alt: "Mãos de marceneiro aplainando uma peça de madeira" },
  "protecao/veiculos-e-frotas": { src: T + "ctx-prot-veiculos.jpg", alt: "Painel e volante vistos do banco do motorista" },
  "protecao/viagem": { src: T + "ctx-prot-viagem.jpg", alt: "Asa de avião sobre o mar de nuvens" },
  "protecao/vida": { src: T + "ctx-prot-vida.jpg", alt: "Adulto e criança de mãos dadas, de costas, caminhando no parque" },
  "saude/bem-estar-e-qualidade-de-vida": { src: T + "ctx-saude-bem-estar.jpg", alt: "Pés descalços sobre um tapete de yoga" },
  "saude/odontologia": { src: T + "ctx-saude-odontologia.jpg", alt: "Cadeira odontológica em consultório vazio" },
  "saude/saude-animal": { src: T + "ctx-saude-animal.jpg", alt: "Mão acolhendo um gato sobre a mesa de atendimento" },
  "saude/saude-corporativa": { src: T + "ctx-saude-corporativa.jpg", alt: "Aferição de pressão arterial sobre a mesa" },
};

export function fotoDeContexto(chave: string): CuratedImage | null {
  return CONTEXTOS[chave] ?? null;
}
