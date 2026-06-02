import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import * as Icons from 'lucide-react';
import { Clock, UserCheck, ChevronDown, Quote, MessageCircle } from 'lucide-react';
import { categorias, produtosPF, produtosPJ } from '@/data/consorcios';

interface ConsorcioProductPageProps {
  categoriaId: string;
  produtoId: string;
  tipo: 'pf' | 'pj';
}

const WHATSAPP_BASE = 'https://api.whatsapp.com/send/?phone=5511938012222&text=';
const PURPLE = '#9857F2';
const DARK = '#0D1B4B';
const ORANGE = '#FF6B00';

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
        .consorcios-diferenciais-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
          max-width: 800px;
          margin: 0 auto;
        }
        @media (max-width: 767px) {
          .consorcios-diferenciais-grid {
            grid-template-columns: repeat(1, minmax(0, 1fr));
          }
        }
        .consorcios-cross-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
        }
        @media (max-width: 767px) {
          .consorcios-cross-grid { grid-template-columns: 1fr; }
        }
        .consorcios-comofunciona-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 24px;
        }
        @media (max-width: 767px) {
          .consorcios-comofunciona-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* 1 — Breadcrumb */}
      <nav style={{ maxWidth: 800, margin: '0 auto', padding: '24px 24px 0 24px' }} className="text-sm text-neutral-400">
        <a href="/consorcios" className="hover:underline">Consórcios</a>
        <span> › </span>
        <button onClick={goCategoria} className="hover:underline">{categoria.titulo}</button>
        <span> › </span>
        <span className="text-neutral-700 font-medium">{produto.titulo}</span>
      </nav>

      {/* 2 — Gatilho temporal */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            border: '1px solid rgba(152,87,242,0.35)',
            borderRadius: 999,
            padding: '8px 20px',
            fontSize: '0.8125rem',
            color: '#6B21A8',
            background: 'rgba(152,87,242,0.08)',
          }}
        >
          <Clock size={14} color={PURPLE} />
          <span>{produto.gatilhoTemporal}</span>
        </div>
      </div>

      {/* 3+4+5 — Hero block */}
      <section style={{ background: '#fff', paddingTop: 48, paddingBottom: 0 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', paddingLeft: 24, paddingRight: 24, textAlign: 'left' }}>
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
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.75, marginBottom: 32 }}>
            {produto.descricaoLonga[0]}
          </p>
          {/* TODO: hero photo */}
          <div
            style={{
              width: '100%',
              maxWidth: 800,
              margin: '0 auto',
              height: 420,
              background: '#E5E7EB',
              borderRadius: 16,
              overflow: 'hidden',
            }}
          />
          {produto.descricaoLonga[1] && (
            <p
              style={{
                fontSize: '1rem',
                color: '#374151',
                lineHeight: 1.75,
                paddingTop: 32,
                maxWidth: 800,
                margin: '0 auto',
              }}
            >
              {produto.descricaoLonga[1]}
            </p>
          )}
        </div>
      </section>

      {/* 6 — Diferenciais */}
      <section style={{ background: '#F9FAFB', padding: '64px 24px' }}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: DARK,
            marginBottom: 48,
          }}
        >
          Por que escolher este consórcio
        </h2>
        <div className="consorcios-diferenciais-grid">
          {produto.diferenciais.map((d, i) => (
            <div
              key={i}
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: 24,
                border: '1px solid #E5E7EB',
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
                  background: 'rgba(152,87,242,0.10)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <LucideIcon name={d.icone} size={20} color={PURPLE} />
              </div>
              <div>
                <h3 style={{ fontWeight: 600, color: '#111827', fontSize: '0.9375rem', marginBottom: 4 }}>
                  {d.titulo}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', lineHeight: 1.6 }}>{d.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7 — Para quem é indicado */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
        <div
          style={{
            background: 'rgba(152,87,242,0.05)',
            borderLeft: `4px solid ${PURPLE}`,
            borderRadius: 12,
            padding: '24px 28px',
          }}
        >
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
            <UserCheck size={18} color={PURPLE} />
            <span style={{ fontWeight: 700, color: DARK, fontSize: '0.9375rem' }}>Para quem é indicado</span>
          </div>
          <p style={{ fontSize: '0.9375rem', color: '#374151', lineHeight: 1.7 }}>{produto.paraQuemEIndicado}</p>
        </div>
      </section>

      {/* 8 — Foto secundária */}
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px' }}>
        {/* TODO: secondary photo */}
        <div style={{ width: '100%', borderRadius: 16, background: '#E5E7EB', height: 320 }} />
      </div>

      {/* 9 — CTA principal */}
      <section style={{ background: DARK, padding: '64px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
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
              fontSize: '1rem',
              padding: '16px 40px',
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
      </section>

      {/* 10 — Cross-selling */}
      <section className="w-full px-6 py-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-neutral-900">Complete sua jornada</h2>
          <div className="consorcios-cross-grid">
            {produto.crossSelling.map((c, i) => (
              <div key={i} className="p-6 rounded-xl border">
                <LucideIcon name={c.icone} size={28} color={PURPLE} />
                <h3 className="font-semibold mt-4 text-neutral-900">{c.titulo}</h3>
                <p className="text-sm text-neutral-600 mt-2">{c.descricao}</p>
                <a href={c.link} className="inline-block mt-4 text-sm font-medium" style={{ color: PURPLE }}>
                  Explorar →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11 — Depoimento */}
      <section style={{ background: '#F9FAFB', padding: '64px 24px' }}>
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
          <div>
            <p style={{ fontWeight: 600, color: '#111827' }}>{produto.depoimento.autor}</p>
            <p className="text-sm" style={{ color: '#6B7280' }}>
              {produto.depoimento.cargo} · {produto.depoimento.cidade}
            </p>
          </div>
        </div>
      </section>

      {/* 12 — Como funciona */}
      <section style={{ padding: '64px 24px' }}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: DARK,
            marginBottom: 48,
          }}
        >
          Como funciona
        </h2>
        <div
          style={{
            maxWidth: 640,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
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
              <div>
                <p style={{ fontWeight: 600, color: '#111827', marginBottom: 4 }}>{s.titulo}</p>
                <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>{s.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 13 — FAQ */}
      <section style={{ background: '#F9FAFB', padding: '64px 24px' }}>
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
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          {produto.faq.map((f, i) => (
            <div key={i} style={{ borderBottom: '1px solid #E5E7EB', padding: '20px 0' }}>
              <div
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontWeight: 600, color: '#111827', fontSize: '0.9375rem' }}>{f.pergunta}</span>
                <ChevronDown
                  size={18}
                  color={PURPLE}
                  style={{
                    transition: 'transform 200ms',
                    transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </div>
              {openFaq === i && (
                <p style={{ fontSize: '0.9375rem', color: '#6B7280', lineHeight: 1.7, paddingTop: 12 }}>
                  {f.resposta}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 14 — Próximos passos */}
      <section style={{ padding: '64px 24px', textAlign: 'center' }}>
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
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
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
      <section style={{ background: PURPLE, padding: '32px 24px', textAlign: 'center' }}>
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
