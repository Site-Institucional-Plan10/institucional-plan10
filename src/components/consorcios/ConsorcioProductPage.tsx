import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import * as Icons from 'lucide-react';
import { Clock, UserCheck, ChevronDown, Quote, MessageCircle } from 'lucide-react';
import { categorias, produtosPF, produtosPJ } from '@/data/consorcios';
import ConsorcioImage from './ConsorcioImage';

interface ConsorcioProductPageProps {
  categoriaId: string;
  produtoId: string;
  tipo: 'pf' | 'pj';
}

const WHATSAPP_BASE = 'https://api.whatsapp.com/send/?phone=5511938012222&text=';
const PURPLE = '#9857F2';
const DARK = '#0D1B4B';
const ORANGE = '#FF6B00';
const LILAC = '#F5F0FF';

function LucideIcon({ name, size = 20, color }: { name: string; size?: number; color?: string }) {
  const Cmp = (Icons as any)[name] || Icons.Sparkles;
  return <Cmp size={size} color={color} />;
}

export default function ConsorcioProductPage({ categoriaId, produtoId, tipo }: ConsorcioProductPageProps) {
  const navigate = useNavigate();
  const categoria = categorias.find((c) => c.id === categoriaId);
  const source = tipo === 'pf' ? produtosPF : produtosPJ;
  const produto = source.find((p) => p.categoriaId === categoriaId && p.id === produtoId);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [ctaHover, setCtaHover] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  if (!produto || !categoria) {
    return (
      <div className="p-8">
        <p>Produto não encontrado.</p>
        <button
          onClick={() => navigate({ to: '/consorcios', search: { cat: categoriaId } as any })}
          className="mt-4 text-sm font-medium"
          style={{ color: PURPLE }}
        >
          ← Voltar
        </button>
      </div>
    );
  }

  const totalSteps = produto.comoFunciona.length;
  const stepData = produto.comoFunciona[currentStep - 1];

  const waProduto = WHATSAPP_BASE + encodeURIComponent(
    `Olá! Vim pelo site da Plan10 e gostaria de saber mais sobre ${produto.titulo}.`,
  );
  const waSimular = WHATSAPP_BASE + encodeURIComponent(
    `Olá! Quero simular minha carta para ${produto.titulo}.`,
  );
  const waGestor = WHATSAPP_BASE + encodeURIComponent('Olá! Quero falar com meu gestor Plan 10.');

  const goCategoria = () => navigate({ to: '/consorcios', search: { cat: categoriaId } as any });

  return (
    <div className="w-full">
      <style>{`
        .product-hero-layout {
          display: block;
          max-width: 900px;
          margin: 0 auto;
          padding: 48px 24px 0 24px;
        }
        .product-hero-photo {
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .product-hero-layout {
            display: grid;
            grid-template-columns: 1fr 420px;
            gap: 48px;
            align-items: start;
          }
          
        }
        .consorcios-diferenciais-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
          max-width: 860px;
          margin: 0 auto;
        }
        @media (max-width: 767px) {
          .consorcios-diferenciais-grid {
            grid-template-columns: repeat(1, minmax(0, 1fr));
            gap: 16px;
          }
        }
        .cross-selling-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
          max-width: 860px;
          margin: 0 auto;
        }
        @media (max-width: 767px) {
          .cross-selling-grid { grid-template-columns: repeat(1, minmax(0, 1fr)); gap: 16px; }
        }
        .como-funciona-mobile { display: none; }
        .como-funciona-desktop {
          display: flex;
          flex-direction: column;
          gap: 24px;
          max-width: 640px;
          margin: 0 auto;
        }
        @media (max-width: 767px) {
          .como-funciona-mobile { display: block; max-width: 480px; margin: 0 auto; }
          .como-funciona-desktop { display: none; }
        }
      `}</style>

      {/* Breadcrumb */}
      <nav style={{ maxWidth: 900, margin: '0 auto', padding: '24px 24px 0 24px' }} className="text-sm text-neutral-400">
        <a href="/consorcios" className="hover:underline">Consórcios</a>
        <span> › </span>
        <button onClick={goCategoria} className="hover:underline">{categoria.titulo}</button>
        <span> › </span>
        <span className="text-neutral-700 font-medium">{produto.titulo}</span>
      </nav>

      {/* Gatilho temporal moved into hero left column below */}


      {/* Hero (two-column on desktop) */}
      <section style={{ background: '#fff', paddingTop: 16, paddingBottom: 80 }}>
        <div className="product-hero-layout">
          <div>
            <h1
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                fontWeight: 800,
                color: DARK,
                lineHeight: 1.2,
                marginBottom: 12,
              }}
            >
              {produto.titulo}
            </h1>
            <p style={{ fontSize: '1.125rem', color: PURPLE, fontWeight: 500, marginBottom: 24 }}>
              {produto.subtitulo}
            </p>
            <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.75, marginBottom: 16, maxWidth: 680 }}>
              {produto.descricaoLonga[0]}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 24, marginBottom: 24 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  border: '1px solid rgba(152,87,242,0.35)',
                  borderRadius: 999,
                  padding: '10px 18px',
                  background: 'rgba(152,87,242,0.08)',
                  maxWidth: 'fit-content',
                }}
              >
                <Clock size={15} color={PURPLE} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.8125rem', color: '#6B21A8', lineHeight: 1.4, fontWeight: 500 }}>
                  {produto.gatilhoTemporal}
                </span>
              </div>
            </div>

            <a
              href={waProduto}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setCtaHover(true)}
              onMouseLeave={() => setCtaHover(false)}
              style={{
                background: ctaHover ? '#E05A00' : ORANGE,
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.9375rem',
                padding: '14px 28px',
                borderRadius: 999,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
                transition: 'background 200ms',
              }}
            >
              <MessageCircle size={18} />
              {produto.cta}
            </a>
          </div>
          <div>
            {/* TODO: hero photo */}
            <div className="product-hero-photo" />
            {produto.descricaoLonga[1] && (
              <p
                style={{
                  fontSize: '0.9375rem',
                  color: '#374151',
                  lineHeight: 1.75,
                  paddingTop: 24,
                }}
              >
                {produto.descricaoLonga[1]}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0D1B4B 0%, #1a2f6b 100%)',
          padding: '80px 24px',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#fff',
            marginBottom: 40,
          }}
        >
          Por que escolher este consórcio
        </h2>
        <div className="consorcios-diferenciais-grid">
          {produto.diferenciais.map((d, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(255,255,255,0.08)',
                borderRadius: 12,
                padding: 24,
                border: '1px solid rgba(255,255,255,0.12)',
                display: 'flex',
                gap: 16,
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <LucideIcon name={d.icone} size={20} color="#fff" />
              </div>
              <div>
                <h3 style={{ fontWeight: 600, color: '#fff', fontSize: '0.9375rem', marginBottom: 8 }}>
                  {d.titulo}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.70)', lineHeight: 1.6 }}>{d.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Para quem é indicado */}
      <section style={{ background: LILAC, padding: '80px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div
            style={{
              background: '#fff',
              borderLeft: `4px solid ${PURPLE}`,
              borderRadius: 12,
              padding: '24px 28px',
            }}
          >
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
              <UserCheck size={18} color={PURPLE} />
              <span style={{ fontWeight: 700, color: DARK, fontSize: '0.9375rem' }}>Para quem é indicado</span>
            </div>
            <p style={{ fontSize: '0.9375rem', color: '#374151', lineHeight: 1.75 }}>{produto.paraQuemEIndicado}</p>
          </div>
        </div>
      </section>

      {/* Foto secundária */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px 0 24px' }}>
        {/* TODO: secondary photo */}
        <div style={{ width: '100%', borderRadius: 16, background: '#E5E7EB', height: 320 }} />
      </div>

      {/* CTA principal */}
      <section style={{ background: DARK, padding: '80px 24px', textAlign: 'center', marginTop: 80 }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <a
            href={waProduto}
            target="_blank"
            rel="noreferrer"
            style={{
              background: ORANGE,
              color: '#fff',
              fontWeight: 700,
              fontSize: '1rem',
              padding: '16px 40px',
              borderRadius: 999,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
            }}
          >
            <MessageCircle size={18} />
            {produto.cta}
          </a>
        </div>
      </section>

      {/* Cross-selling */}
      <section
        style={{
          background: 'linear-gradient(135deg, #9857F2 0%, #7C3AED 100%)',
          padding: '80px 24px',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#fff',
            marginBottom: 40,
          }}
        >
          Complete sua jornada
        </h2>
        <div className="cross-selling-grid">
          {produto.crossSelling.map((c, i) => (
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
              <LucideIcon name={c.icone} size={28} color="#fff" />
              <h3 style={{ fontWeight: 600, color: '#fff' }}>{c.titulo}</h3>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.80)', lineHeight: 1.6 }}>{c.descricao}</p>
              <a href={c.link} style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff' }}>
                Explorar →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Depoimento */}
      <section style={{ background: LILAC, padding: '80px 24px' }}>
        <div
          style={{
            maxWidth: 640,
            margin: '0 auto',
            background: '#fff',
            borderRadius: 16,
            padding: 40,
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          }}
        >
          <Quote size={32} color={PURPLE} style={{ marginBottom: 16 }} />
          <p
            style={{
              fontSize: '1.0625rem',
              color: '#374151',
              lineHeight: 1.75,
              fontStyle: 'italic',
              marginBottom: 24,
            }}
          >
            "{produto.depoimento.texto}"
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p style={{ fontWeight: 600, color: '#111827' }}>{produto.depoimento.autor}</p>
            <p className="text-sm" style={{ color: '#6B7280' }}>
              {produto.depoimento.cargo} · {produto.depoimento.cidade}
            </p>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section style={{ background: '#fff', padding: '80px 24px' }}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: DARK,
            marginBottom: 40,
          }}
        >
          Como funciona
        </h2>

        {/* Desktop */}
        <div className="como-funciona-desktop">
          {produto.comoFunciona.map((s) => (
            <div key={s.step} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  flexShrink: 0,
                  borderRadius: '50%',
                  background: PURPLE,
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {s.step}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <p style={{ fontWeight: 600, color: '#111827' }}>{s.titulo}</p>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', lineHeight: 1.6 }}>{s.descricao}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile stepper */}
        <div className="como-funciona-mobile">
          <p style={{ textAlign: 'center', fontSize: '0.875rem', color: PURPLE, fontWeight: 600 }}>
            Passo {currentStep} de {totalSteps}
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
                width: `${(currentStep / totalSteps) * 100}%`,
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
              {stepData.step}
            </div>
            <p style={{ fontWeight: 700, color: DARK, fontSize: '1rem', marginBottom: 8 }}>{stepData.titulo}</p>
            <p style={{ fontSize: '0.9375rem', color: '#6B7280', lineHeight: 1.6 }}>{stepData.descricao}</p>
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
                if (currentStep === totalSteps) setCurrentStep(1);
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
              {currentStep === totalSteps ? 'Concluído' : 'Próximo'}
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: '#F9FAFB', padding: '80px 24px' }}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: DARK,
            marginBottom: 40,
          }}
        >
          Perguntas frequentes
        </h2>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          {produto.faq.map((f, i) => (
            <div key={i} style={{ borderBottom: '1px solid #E5E7EB', padding: '20px 0' }}>
              <div
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  gap: 12,
                }}
              >
                <span style={{ fontWeight: 600, color: '#111827', fontSize: '0.9375rem' }}>{f.pergunta}</span>
                <ChevronDown
                  size={18}
                  color={PURPLE}
                  style={{
                    transition: 'transform 200ms',
                    transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    flexShrink: 0,
                  }}
                />
              </div>
              {openFaq === i && (
                <p style={{ fontSize: '0.9375rem', color: '#6B7280', lineHeight: 1.75, paddingTop: 12 }}>
                  {f.resposta}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Próximos passos */}
      <section style={{ padding: '80px 24px', textAlign: 'center', background: '#fff' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: DARK,
            marginBottom: 40,
          }}
        >
          Escolha seu próximo passo
        </h2>
        <div
          style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'center',
            flexWrap: 'wrap',
            maxWidth: 640,
            margin: '0 auto',
          }}
        >
          <button
            onClick={goCategoria}
            style={{
              border: '1px solid #E5E7EB',
              color: '#374151',
              background: '#fff',
              padding: '12px 24px',
              borderRadius: 999,
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            ← Voltar para a categoria
          </button>
          <a
            href={waSimular}
            target="_blank"
            rel="noreferrer"
            style={{
              border: `1px solid ${PURPLE}`,
              color: PURPLE,
              background: '#fff',
              padding: '12px 24px',
              borderRadius: 999,
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            Simular minha carta
          </a>
          <a
            href={waGestor}
            target="_blank"
            rel="noreferrer"
            style={{
              background: PURPLE,
              color: '#fff',
              padding: '12px 24px',
              borderRadius: 999,
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            Falar com meu gestor
          </a>
        </div>
      </section>

      {/* Ecossistema tagline */}
      <section style={{ background: 'linear-gradient(135deg, #9857F2 0%, #7C3AED 100%)', padding: '32px 24px', textAlign: 'center' }}>
        <p
          style={{
            color: '#fff',
            fontSize: '0.9375rem',
            maxWidth: 720,
            margin: '0 auto',
            lineHeight: 1.7,
          }}
        >
          {produto.ecossistema}
        </p>
      </section>
    </div>
  );
}
