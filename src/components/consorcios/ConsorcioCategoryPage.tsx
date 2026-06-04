import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  Clock,
  Lock,
  Trophy,
  BarChart2,
  Handshake,
  User,
  Search,
  MessageCircle,
  ChevronDown,
  Shield,
  Wrench,
  Coins,
  CheckCircle2,
  X,
} from 'lucide-react';
import { categorias, produtosPF, produtosPJ, type ConsorcioProduct } from '@/data/consorcios';

interface ConsorcioCategoryPageProps {
  categoriaId: string;
}

const WHATSAPP_BASE = 'https://api.whatsapp.com/send/?phone=5511938012222&text=';
const PURPLE = '#9857F2';
const DARK = '#0D1B4B';


const rotatingPhrases = [
  'O imóvel certo não é apenas onde você mora. É onde sua história ganha o cenário que merece.',
  'Planejamento inteligente transforma sonho em endereço. Sem juros. Sem pressa. Com propósito.',
  'Quem pensa em gerações não compra imóvel, constrói patrimônio.',
];

const gallery = [
  { legenda: 'Cada metro quadrado planejado para quem pensa grande.', tall: true },
  { legenda: 'O refúgio que conecta gerações à essência.', tall: false },
  { legenda: 'Sede própria como declaração de solidez.', tall: false },
];

const diferenciais = [
  { Icon: Trophy, titulo: 'Assessoria dedicada do início à contemplação', desc: 'Um especialista acompanha cada etapa do seu plano, com transparência total.' },
  { Icon: BarChart2, titulo: 'Inteligência de mercado exclusiva', desc: 'Análises e cenários que orientam suas decisões patrimoniais.' },
  { Icon: Lock, titulo: 'Zero juros, transparência total', desc: 'Taxa de administração clara, sem surpresas no custo final.' },
  { Icon: Handshake, titulo: 'Ecossistema completo Plan 10', desc: 'Seguros, financeiros e assistência integrados ao seu patrimônio.' },
];

const comoFunciona = [
  'Consultoria personalizada',
  'Plano sob medida',
  'Contemplação inteligente',
  'Conquista com poder de compra à vista',
  'Proteção do patrimônio',
];

const depoimentos = [
  { texto: 'Conquistei minha cobertura sem pagar um centavo de juros. A assessoria foi cirúrgica.', autor: 'Ricardo M.', cargo: 'Empresário, São Paulo' },
  { texto: 'Compramos nossa casa de campo planejando cada etapa. O acompanhamento Plan 10 fez toda a diferença.', autor: 'Helena e Marcos T.', cargo: 'Família, Campos do Jordão' },
  { texto: 'A sede própria da minha empresa virou realidade com previsibilidade total.', autor: 'Fernanda L.', cargo: 'CEO, Belo Horizonte' },
];

const comparacao = [
  ['Juros', 'Zero juros bancários', 'Juros compostos elevados'],
  ['Assessoria', 'Dedicada e personalizada', 'Atendimento massificado'],
  ['Poder de compra', 'À vista na contemplação', 'Parcelado com encargos'],
  ['Ecossistema pós-aquisição', 'Seguros, financeiros e assistência integrados', 'Inexistente'],
];

const faqs = [
  { p: 'O consórcio Plan 10 cobra juros?', r: 'Não. Cobramos apenas a taxa de administração, transparente desde o primeiro dia.' },
  { p: 'Como funciona a contemplação?', r: 'Por sorteio mensal ou lance (livre, fixo ou embutido), com previsibilidade total.' },
  { p: 'Posso usar a carta para qualquer imóvel?', r: 'Sim, qualquer imóvel residencial ou comercial novo ou usado dentro do valor da carta.' },
  { p: 'Existe entrada?', r: 'Não. Você começa pagando a primeira parcela do seu plano.' },
  { p: 'O que acontece se eu for contemplado cedo?', r: 'Você recebe a carta com poder de compra à vista e segue pagando as parcelas restantes sem juros.' },
];

const crossSelling = [
  { Icon: Shield, titulo: 'Seguros', desc: 'Proteja o patrimônio que você acabou de conquistar.', link: '/seguros' },
  { Icon: Wrench, titulo: 'Assistência 24h', desc: 'Suporte sempre que você precisar, onde estiver.', link: '/assistencia' },
  { Icon: Coins, titulo: 'Financeiros', desc: 'Soluções para potencializar e fazer seu patrimônio render.', link: '/financeiros' },
];

export default function ConsorcioCategoryPage({ categoriaId }: ConsorcioCategoryPageProps) {
  const navigate = useNavigate();
  const categoria = categorias.find((c) => c.id === categoriaId);
  const [tipo, setTipo] = useState<'pf' | 'pj'>('pf');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [fade, setFade] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({ nome: '', telefone: '', email: '' });

  useEffect(() => {
    const id = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setPhraseIdx((i) => (i + 1) % rotatingPhrases.length);
        setFade(true);
      }, 300);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const produtos = useMemo<ConsorcioProduct[]>(
    () => (tipo === 'pf' ? produtosPF : produtosPJ).filter((p) => p.categoriaId === categoriaId),
    [tipo, categoriaId],
  );

  const goProduto = (p: ConsorcioProduct) => {
    navigate({ to: '/consorcios', search: { cat: categoriaId, produto: p.id, tipo } as any });
  };

  const scrollToProducts = () => {
    document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' });
  };

  const submitForm = () => {
    const nome = form.nome.trim() || 'Cliente';
    const msg = `Olá! Meu nome é ${nome}. Gostaria de uma consultoria imobiliária personalizada.`;
    window.open(WHATSAPP_BASE + encodeURIComponent(msg), '_blank');
  };

  if (!categoria) return <div className="p-8">Categoria não encontrada.</div>;

  return (
    <div className="w-full">
      <style>{`
        .consorcios-products-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
        @media (max-width: 767px) {
          .consorcios-products-grid { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; gap: 16px; padding-bottom: 12px; }
        }
        .consorcios-gallery { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 200px 200px; gap: 16px; }
        .consorcios-gallery .tall { grid-row: span 2; height: 416px; }
        @media (max-width: 767px) {
          .consorcios-gallery { grid-template-columns: 1fr; grid-template-rows: auto; }
          .consorcios-gallery .tall { height: 240px; }
        }
        .consorcios-form-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
        @media (max-width: 767px) { .consorcios-form-grid { grid-template-columns: 1fr; } }
        .consorcios-3col { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
        @media (max-width: 767px) { .consorcios-3col { grid-template-columns: 1fr; } }
        .consorcios-4col { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 24px; }
        @media (max-width: 767px) { .consorcios-4col { grid-template-columns: 1fr; } }
        .fade-in { transition: opacity 300ms ease; }
      `}</style>

      {/* A — Hero */}
      <section
        style={{
          background: DARK,
          minHeight: 520,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 96,
          paddingBottom: 96,
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: '0 auto',
            paddingLeft: 24,
            paddingRight: 24,
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
          }}
        >
          <span
            style={{
              display: 'block',
              color: PURPLE,
              fontWeight: 600,
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            CONSÓRCIO · PLAN10
          </span>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            {categoria.titulo}
          </h1>
          <p
            style={{
              fontSize: '1.125rem',
              color: 'rgba(255,255,255,0.75)',
              fontWeight: 400,
              marginBottom: 24,
            }}
          >
            Seu patrimônio começa com o endereço certo
          </p>
          <p
            style={{
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.60)',
              maxWidth: 600,
              margin: '0 0 32px 0',
              lineHeight: 1.7,
            }}
          >
            Planejamento inteligente, sem juros e com poder de compra à vista para conquistar o imóvel que traduz quem você é.
          </p>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              border: '1px solid rgba(152,87,242,0.4)',
              borderRadius: 999,
              padding: '8px 20px',
              fontSize: '0.8125rem',
              color: 'rgba(255,255,255,0.80)',
              background: 'rgba(152,87,242,0.12)',
              margin: 0,
            }}
          >
            <Clock size={16} style={{ color: PURPLE }} />
            <span>Grupos de junho com condições especiais de entrada: vagas limitadas para assessoria premium personalizada</span>
          </div>
        </div>
      </section>

      {/* B — Produtos */}
      <section id="produtos" className="w-full px-6 bg-white" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-neutral-900">Escolha seu produto</h2>
          <p
            className="text-center font-semibold"
            style={{
              fontSize: '0.75rem',
              color: '#A3A3A3',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            SELECIONE O PERFIL
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
            <div className="inline-flex border border-neutral-200 rounded-full p-1 bg-white shadow-sm">
              {(['pf', 'pj'] as const).map((t) => {
                const active = tipo === t;
                return (
                  <button
                    key={t}
                    onClick={() => setTipo(t)}
                    className="px-8 py-3 text-sm font-semibold rounded-full transition-all duration-200"
                    style={
                      active
                        ? { background: PURPLE, color: '#fff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }
                        : { background: 'transparent', color: '#525252' }
                    }
                  >
                    {t === 'pf' ? 'Pessoa Física' : 'Pessoa Jurídica'}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="consorcios-products-grid">
            {produtos.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl p-6 shadow-sm cursor-pointer"
                style={{
                  borderLeft: `4px solid ${PURPLE}`,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  minWidth: typeof window !== 'undefined' && window.innerWidth < 768 ? '78vw' : undefined,
                  scrollSnapAlign: 'start',
                }}
                onClick={() => goProduto(p)}
              >
                <h3 className="font-semibold text-lg text-neutral-900">{p.titulo}</h3>
                <p className="text-sm text-neutral-500 mt-2" style={{ flex: 1 }}>{p.descricaoBreve}</p>
                <div className="flex gap-2 mt-4" style={{ marginTop: 'auto' }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); goProduto(p); }}
                    className="flex-1 px-4 py-2 rounded-lg text-white text-sm font-medium"
                    style={{ background: PURPLE }}
                  >
                    Saiba mais
                  </button>
                  <a
                    onClick={(e) => e.stopPropagation()}
                    href={WHATSAPP_BASE + encodeURIComponent(`Olá! Vim pelo site da Plan10 e gostaria de saber mais sobre ${p.titulo}.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 px-4 py-2 rounded-lg border text-sm font-medium text-center"
                    style={{ borderColor: PURPLE, color: PURPLE }}
                  >
                    Falar com consultor
                  </a>
                </div>
              </div>
            ))}
            {produtos.length === 0 && (
              <p className="text-neutral-500">Nenhum produto disponível para esta categoria/tipo.</p>
            )}
          </div>
        </div>
      </section>

      {/* C — Rotating phrases */}
      <section
        className="w-full px-6"
        style={{
          background: '#F5F0FF',
          borderTop: '1px solid rgba(152,87,242,0.12)',
          borderBottom: '1px solid rgba(152,87,242,0.12)',
          paddingTop: 80,
          paddingBottom: 80,
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className={`text-xl italic text-neutral-600 fade-in ${fade ? 'opacity-100' : 'opacity-0'}`}>
            {rotatingPhrases[phraseIdx]}
          </p>
        </div>
      </section>

      {/* D — Photo gallery */}
      <section className="w-full px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-neutral-900">Cada conquista tem uma história</h2>
          {/* TODO: replace with real photos */}
          <div className="consorcios-gallery">
            {gallery.map((g, i) => (
              <div
                key={i}
                className={`relative rounded-xl bg-neutral-200 overflow-hidden ${g.tall ? 'tall' : ''}`}
                style={{ height: g.tall ? undefined : 200 }}
              >
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-white text-sm">{g.legenda}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* E — CTA form */}
      <section
        style={{
          background: '#fff',
          borderTop: '1px solid #E5E7EB',
          borderBottom: '1px solid #E5E7EB',
          padding: '80px 24px',
        }}
      >
        <style>{`
          .cta-form-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 12px;
            width: 100%;
            margin-bottom: 16px;
          }
          @media (max-width: 767px) {
            .cta-form-grid {
              grid-template-columns: repeat(1, minmax(0, 1fr));
            }
          }
          .cta-input {
            border: 1px solid #D1D5DB;
            border-radius: 10px;
            padding: 14px 16px;
            font-size: 0.9375rem;
            color: #111827;
            outline: none;
            transition: border-color 150ms ease, box-shadow 150ms ease;
            background: #fff;
            width: 100%;
          }
          .cta-input:focus {
            border-color: #9857F2;
            box-shadow: 0 0 0 3px rgba(152,87,242,0.12);
          }
          .cta-submit {
            background: #9857F2;
            color: #fff;
            font-weight: 700;
            font-size: 1rem;
            padding: 16px 40px;
            border-radius: 999px;
            border: none;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            transition: background 150ms ease;
          }
          .cta-submit:hover {
            background: #7C3AED;
          }
        `}</style>
        <div
          style={{
            maxWidth: 720,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              display: 'block',
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              fontWeight: 600,
              color: PURPLE,
              marginBottom: 12,
            }}
          >
            CONSULTORIA GRATUITA
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 800,
              color: DARK,
              marginBottom: 12,
            }}
          >
            Cada patrimônio tem uma história. Conte-nos a sua.
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: '#6B7280',
              marginBottom: 40,
              maxWidth: 480,
            }}
          >
            Receba uma proposta sob medida para o imóvel que traduz quem você é.
          </p>
          <div className="cta-form-grid">
            <input
              className="cta-input"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              placeholder="Nome completo"
            />
            <input
              className="cta-input"
              value={form.telefone}
              onChange={(e) => setForm({ ...form, telefone: e.target.value })}
              placeholder="Telefone (WhatsApp)"
            />
            <input
              className="cta-input"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="E-mail"
            />
          </div>
          <button onClick={submitForm} className="cta-submit">
            <MessageCircle size={18} />
            Falar com meu consultor imobiliário
          </button>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              marginTop: 16,
            }}
          >
            <Lock size={14} style={{ color: '#9B9B9B' }} />
            <span style={{ fontSize: '0.8125rem', color: '#9B9B9B' }}>
              Seus dados estão protegidos pela LGPD. Atendimento humano e personalizado.
            </span>
          </div>
        </div>
      </section>

      {/* F — Diferenciais */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0D1B4B 0%, #1a2f6b 100%)',
          padding: '80px 24px',
        }}
      >
        <style>{`
          .diferenciais-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 24px;
            max-width: 800px;
            margin: 0 auto;
          }
          @media (max-width: 767px) {
            .diferenciais-grid {
              display: flex;
              overflow-x: auto;
              scroll-snap-type: x mandatory;
              gap: 16px;
              padding-bottom: 12px;
              margin: 0 -24px;
              padding-left: 24px;
              padding-right: 24px;
            }
            .diferenciais-grid > * {
              min-width: 260px;
              scroll-snap-align: start;
              flex-shrink: 0;
            }
          }
          .diferenciais-dots { display: none; }
          @media (max-width: 767px) {
            .diferenciais-dots { display: flex; justify-content: center; gap: 6px; margin-top: 16px; }
          }
        `}</style>
        <h2
          style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            color: '#fff',
            marginBottom: 40,
            textAlign: 'center',
          }}
        >
          O que nos diferencia
        </h2>
        <div className="diferenciais-grid">
          {diferenciais.map((d, i) => (
            <div
              key={i}
              style={{
                padding: 24,
                borderRadius: 12,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <d.Icon size={22} color="#fff" />
              </div>
              <h3 style={{ fontWeight: 600, color: '#fff' }}>{d.titulo}</h3>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.70)', lineHeight: 1.6 }}>{d.desc}</p>
            </div>
          ))}
        </div>
        <div className="diferenciais-dots">
          {diferenciais.map((_, i) => (
            <div
              key={i}
              style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.30)' }}
            />
          ))}
        </div>
      </section>

      {/* G — Como funciona */}
      <section style={{ background: '#F5F0FF', padding: '80px 24px' }}>
        <style>{`
          .como-funciona-mobile { display: none; }
          .como-funciona-desktop {
            display: grid;
            grid-template-columns: repeat(5, minmax(0, 1fr));
            gap: 24px;
            max-width: 1024px;
            margin: 0 auto;
          }
          @media (max-width: 767px) {
            .como-funciona-mobile { display: block; max-width: 480px; margin: 0 auto; }
            .como-funciona-desktop { display: none; }
          }
        `}</style>
        <h2
          style={{
            textAlign: 'center',
            fontSize: '1.75rem',
            fontWeight: 800,
            color: DARK,
            marginBottom: 40,
          }}
        >
          Como funciona?
        </h2>

        {/* Desktop */}
        <div className="como-funciona-desktop">
          {comoFunciona.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ background: PURPLE }}>
                {i + 1}
              </div>
              <p className="mt-3 text-sm font-medium text-neutral-800">{s}</p>
            </div>
          ))}
        </div>

        {/* Mobile stepper */}
        <div className="como-funciona-mobile">
          <p style={{ textAlign: 'center', fontSize: '0.875rem', color: PURPLE, fontWeight: 600 }}>
            Passo {currentStep} de {comoFunciona.length}
          </p>
          <div
            style={{
              width: '100%',
              height: 4,
              background: '#E5E7EB',
              borderRadius: 999,
              marginTop: 8,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${(currentStep / comoFunciona.length) * 100}%`,
                height: '100%',
                background: PURPLE,
                borderRadius: 999,
                transition: 'width 300ms ease',
              }}
            />
          </div>
          <div
            style={{
              background: '#fff',
              border: '1px solid #E5E7EB',
              borderRadius: 16,
              padding: '32px 24px',
              textAlign: 'center',
              marginTop: 16,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: PURPLE,
                color: '#fff',
                fontWeight: 800,
                fontSize: '1.125rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
              }}
            >
              {currentStep}
            </div>
            <p style={{ fontWeight: 700, color: DARK, fontSize: '1rem' }}>
              {comoFunciona[currentStep - 1]}
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            <button
              onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
              disabled={currentStep === 1}
              style={{
                border: '1px solid #E5E7EB',
                background: '#fff',
                color: '#6B7280',
                padding: '10px 20px',
                borderRadius: 999,
                fontSize: '0.875rem',
                opacity: currentStep === 1 ? 0.3 : 1,
                pointerEvents: currentStep === 1 ? 'none' : 'auto',
                cursor: 'pointer',
              }}
            >
              Anterior
            </button>
            <button
              onClick={() => {
                if (currentStep === comoFunciona.length) setCurrentStep(1);
                else setCurrentStep((s) => s + 1);
              }}
              style={{
                background: PURPLE,
                color: '#fff',
                padding: '10px 20px',
                borderRadius: 999,
                fontSize: '0.875rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {currentStep === comoFunciona.length ? 'Concluído' : 'Próximo'}
            </button>
          </div>
        </div>
      </section>

      {/* H — Depoimentos */}
      <section style={{ background: '#fff', padding: '80px 24px' }}>
        <style>{`
          .depoimentos-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 24px;
            max-width: 900px;
            margin: 0 auto;
          }
          @media (max-width: 767px) {
            .depoimentos-grid {
              display: flex;
              overflow-x: auto;
              scroll-snap-type: x mandatory;
              gap: 16px;
              margin: 0 -24px;
              padding-left: 24px;
              padding-right: 24px;
              padding-bottom: 12px;
            }
            .depoimentos-grid > * {
              min-width: 80vw;
              scroll-snap-align: start;
              flex-shrink: 0;
            }
          }
        `}</style>
        <h2
          style={{
            textAlign: 'center',
            fontSize: '1.75rem',
            fontWeight: 800,
            color: DARK,
            marginBottom: 40,
          }}
        >
          O que nossos clientes dizem
        </h2>
        <div className="depoimentos-grid">
          {depoimentos.map((d, i) => (
            <div
              key={i}
              style={{
                padding: 24,
                borderRadius: 12,
                background: '#F9FAFB',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <p className="italic text-neutral-700">"{d.texto}"</p>
              <p className="font-semibold text-neutral-900" style={{ marginTop: 'auto' }}>{d.autor}</p>
              <p className="text-sm text-neutral-500">{d.cargo}</p>
            </div>
          ))}
        </div>
      </section>

      {/* I — Comparison */}
      <section style={{ background: DARK, padding: '80px 24px' }}>
        <style>{`
          .comparison-table-header {
            display: grid;
            grid-template-columns: 1.5fr 1fr 1fr;
            background: rgba(255,255,255,0.05);
            padding: 16px 24px;
          }
          .comparison-table-row {
            display: grid;
            grid-template-columns: 1.5fr 1fr 1fr;
            padding: 20px 24px;
            border-top: 1px solid rgba(255,255,255,0.07);
            align-items: start;
            transition: background 150ms ease;
          }
          .comparison-table-row:hover {
            background: rgba(255,255,255,0.04);
          }
          @media (max-width: 640px) {
            .comparison-table-row,
            .comparison-table-header {
              grid-template-columns: 1fr;
              gap: 8px;
            }
          }
        `}</style>
        <h2
          style={{
            textAlign: 'center',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 800,
            color: '#fff',
            marginBottom: 8,
          }}
        >
          Plan 10 vs mercado tradicional
        </h2>
        <p
          style={{
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.60)',
            textAlign: 'center',
            marginBottom: 48,
          }}
        >
          Por que o consórcio Plan 10 é a escolha inteligente
        </p>
        <div
          style={{
            maxWidth: 800,
            margin: '0 auto',
            borderRadius: 16,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.10)',
          }}
        >
          <div className="comparison-table-header">
            <div
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.40)',
                fontWeight: 600,
              }}
            >
              Critério
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: PURPLE,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: PURPLE }} />
                Plan 10 Premium
              </div>
              <span
                style={{
                  background: PURPLE,
                  color: '#fff',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '2px 10px',
                  borderRadius: 999,
                }}
              >
                Melhor escolha
              </span>
            </div>
            <div
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.40)',
              }}
            >
              Mercado tradicional
            </div>
          </div>
          {comparacao.map((r, i) => (
            <div key={i} className="comparison-table-row">
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'rgba(255,255,255,0.80)' }}>{r[0]}</div>
              <div
                style={{
                  fontSize: '0.875rem',
                  color: '#fff',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 8,
                  background: 'rgba(152,87,242,0.15)',
                  borderLeft: `3px solid ${PURPLE}`,
                  borderRadius: 8,
                  padding: '10px 12px',
                }}
              >
                <CheckCircle2 size={16} style={{ color: '#C084FC', flexShrink: 0, marginTop: 2 }} />
                <span>{r[1]}</span>
              </div>
              <div
                style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255,255,255,0.35)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 8,
                  padding: '10px 12px',
                }}
              >
                <X size={16} style={{ color: 'rgba(255,255,255,0.30)', flexShrink: 0, marginTop: 2 }} />
                <span style={{ textDecoration: 'line-through' }}>{r[2]}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* J — Gestor dedicado */}
      <section className="w-full px-6" style={{ background: '#F9FAFB', paddingTop: 80, paddingBottom: 80 }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-neutral-300 mx-auto flex items-center justify-center">
            <User size={40} className="text-neutral-500" />
          </div>
          <p className="mt-6 text-lg italic text-neutral-700">
            "Cada cliente Premium é acompanhado por mim do primeiro contato até a entrega das chaves. Aqui, planejamento patrimonial é assunto sério e pessoal."
          </p>
          <p className="mt-4 font-semibold text-neutral-900">Seu gestor Plan 10 Premium</p>
          <a
            href={WHATSAPP_BASE + encodeURIComponent('Olá! Gostaria de falar com meu gestor Plan 10 Premium.')}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-6 px-6 py-3 rounded-lg text-white font-medium"
            style={{ background: PURPLE }}
          >
            Falar agora no WhatsApp
          </a>
        </div>
      </section>

      {/* K — Próximos passos */}
      <section className="w-full px-6 bg-white" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="max-w-6xl mx-auto consorcios-3col">
          <div className="p-6 rounded-xl border text-center cursor-pointer" onClick={scrollToProducts}>
            <Search size={28} style={{ color: PURPLE }} className="mx-auto" />
            <p className="text-xs tracking-widest mt-3" style={{ color: PURPLE }}>EXPLORAR</p>
            <p className="mt-2 font-medium">Quero explorar as opções</p>
          </div>
          <a
            href={WHATSAPP_BASE + encodeURIComponent('Olá! Quero uma simulação gratuita do consórcio imobiliário Plan 10.')}
            target="_blank"
            rel="noreferrer"
            className="p-6 rounded-xl border text-center block"
          >
            <BarChart2 size={28} style={{ color: PURPLE }} className="mx-auto" />
            <p className="text-xs tracking-widest mt-3" style={{ color: PURPLE }}>SIMULAR</p>
            <p className="mt-2 font-medium">Quero uma simulação gratuita</p>
          </a>
          <a
            href={WHATSAPP_BASE + encodeURIComponent('Olá! Quero falar agora com meu gestor Plan 10.')}
            target="_blank"
            rel="noreferrer"
            className="p-6 rounded-xl border text-center block"
          >
            <MessageCircle size={28} style={{ color: PURPLE }} className="mx-auto" />
            <p className="text-xs tracking-widest mt-3" style={{ color: PURPLE }}>CONVERSAR</p>
            <p className="mt-2 font-medium">Falar com meu gestor agora</p>
          </a>
        </div>
      </section>

      {/* L — FAQ */}
      <section style={{ background: '#F5F0FF', padding: '80px 24px' }}>
        <style>{`
          .faq-answer {
            max-height: 0;
            opacity: 0;
            overflow: hidden;
            transition: max-height 300ms ease, opacity 200ms ease, padding 200ms ease;
          }
          .faq-answer.open {
            max-height: 600px;
            opacity: 1;
          }
        `}</style>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span
            style={{
              display: 'block',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: 600,
              color: PURPLE,
              marginBottom: 12,
              textAlign: 'center',
            }}
          >
            TIRE SUAS DÚVIDAS
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 800,
              color: DARK,
              textAlign: 'center',
            }}
          >
            Perguntas frequentes
          </h2>
        </div>
        <div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((f, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                style={{
                  background: '#fff',
                  border: `1px solid ${isOpen ? PURPLE : '#E5E7EB'}`,
                  borderRadius: 12,
                  overflow: 'hidden',
                  transition: 'border-color 200ms ease, box-shadow 200ms ease',
                  boxShadow: isOpen ? '0 0 0 3px rgba(152,87,242,0.08)' : 'none',
                }}
              >
                <div
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px 24px',
                    cursor: 'pointer',
                    gap: 16,
                  }}
                >
                  <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#111827', lineHeight: 1.4, flex: 1 }}>
                    {f.p}
                  </span>
                  <div
                    style={{
                      flexShrink: 0,
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: 'rgba(152,87,242,0.10)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ChevronDown
                      size={16}
                      style={{
                        color: PURPLE,
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 200ms ease',
                      }}
                    />
                  </div>
                </div>
                <div className={`faq-answer${isOpen ? ' open' : ''}`}>
                  <div
                    style={{
                      padding: '16px 24px 20px 24px',
                      fontSize: '0.9375rem',
                      color: '#6B7280',
                      lineHeight: 1.75,
                      borderTop: '1px solid #E5E7EB',
                    }}
                  >
                    {f.r}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* M — Cross-selling */}
      <section
        style={{
          background: 'linear-gradient(135deg, #9857F2 0%, #7C3AED 100%)',
          padding: '80px 24px',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: 40 }}>
            Proteja, mantenha e potencialize seu patrimônio
          </h2>
          <div className="consorcios-3col">
            {crossSelling.map((c, i) => (
              <div
                key={i}
                style={{
                  padding: 24,
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <c.Icon size={28} color="#fff" />
                <h3 style={{ fontWeight: 600, color: '#fff' }}>{c.titulo}</h3>
                <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.80)', lineHeight: 1.6 }}>{c.desc}</p>
                <a href={c.link} style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff' }}>
                  Explorar →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
