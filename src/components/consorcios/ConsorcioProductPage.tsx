import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import * as Icons from 'lucide-react';
import { Clock, UserCheck, ChevronDown, Quote } from 'lucide-react';
import { categorias, produtosPF, produtosPJ } from '@/data/consorcios';

interface ConsorcioProductPageProps {
  categoriaId: string;
  produtoId: string;
  tipo: 'pf' | 'pj';
}

const WHATSAPP_BASE = 'https://api.whatsapp.com/send/?phone=5511938012222&text=';
const PURPLE = '#9857F2';

function LucideIcon({ name, size = 24, color }: { name: string; size?: number; color?: string }) {
  const Cmp = (Icons as any)[name] || Icons.Sparkles;
  return <Cmp size={size} color={color} />;
}

export default function ConsorcioProductPage({ categoriaId, produtoId, tipo }: ConsorcioProductPageProps) {
  const navigate = useNavigate();
  const categoria = categorias.find((c) => c.id === categoriaId);
  const source = tipo === 'pf' ? produtosPF : produtosPJ;
  const produto = source.find((p) => p.categoriaId === categoriaId && p.id === produtoId);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
        .cp-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
        @media (max-width: 767px) { .cp-grid-3 { grid-template-columns: 1fr; } }
        .cp-grid-diff { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
        @media (max-width: 767px) { .cp-grid-diff { grid-template-columns: 1fr; } }
      `}</style>

      <div className="max-w-6xl mx-auto px-6 pt-8">
        {/* Back link */}
        <button onClick={goCategoria} className="text-sm font-medium mb-4" style={{ color: PURPLE }}>
          ← Voltar para {categoria.titulo}
        </button>

        {/* 1 — Breadcrumb */}
        <nav className="text-sm text-neutral-500 mb-6">
          <a href="/consorcios" className="hover:underline">Consórcios</a>
          {' > '}
          <button onClick={goCategoria} className="hover:underline">{categoria.titulo}</button>
          {' > '}
          <span className="text-neutral-800">{produto.titulo}</span>
        </nav>

        {/* 2 — Gatilho temporal */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6" style={{ borderColor: PURPLE }}>
          <Clock size={16} style={{ color: PURPLE }} />
          <span className="text-sm">{produto.gatilhoTemporal}</span>
        </div>

        {/* 3 — Hero */}
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900">{produto.titulo}</h1>
        <p className="text-xl text-neutral-700 mt-3">{produto.subtitulo}</p>
        <p className="text-base text-neutral-600 mt-6 max-w-3xl">{produto.descricaoLonga[0]}</p>
      </div>

      {/* 4 — Foto principal */}
      <div className="max-w-6xl mx-auto px-6 mt-10">
        {/* TODO: hero photo */}
        <div className="w-full rounded-xl bg-neutral-200" style={{ height: 480 }} />
      </div>

      {/* 5 — Descrição longa */}
      {produto.descricaoLonga[1] && (
        <section className="max-w-4xl mx-auto px-6 py-12">
          <p className="text-neutral-700 leading-relaxed">{produto.descricaoLonga[1]}</p>
        </section>
      )}

      {/* 6 — Diferenciais */}
      <section className="w-full px-6 py-12 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-neutral-900">Diferenciais</h2>
          <div className="cp-grid-diff">
            {produto.diferenciais.map((d, i) => (
              <div key={i} className="p-6 rounded-xl bg-white">
                <LucideIcon name={d.icone} size={32} color={PURPLE} />
                <h3 className="font-semibold mt-4 text-neutral-900">{d.titulo}</h3>
                <p className="text-sm text-neutral-600 mt-2">{d.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — Para quem é indicado */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="p-6 rounded-xl border" style={{ borderColor: PURPLE }}>
          <div className="flex items-center gap-3 mb-3">
            <UserCheck size={24} style={{ color: PURPLE }} />
            <h3 className="font-semibold text-lg text-neutral-900">Para quem é indicado</h3>
          </div>
          <p className="text-neutral-700">{produto.paraQuemEIndicado}</p>
        </div>
      </section>

      {/* 8 — Foto secundária */}
      <div className="max-w-6xl mx-auto px-6">
        {/* TODO: secondary photo */}
        <div className="w-full rounded-xl bg-neutral-200" style={{ height: 320 }} />
      </div>

      {/* 9 — CTA principal */}
      <section className="max-w-4xl mx-auto px-6 py-12 text-center">
        <a
          href={waProduto}
          target="_blank"
          rel="noreferrer"
          className="inline-block px-8 py-4 rounded-lg text-white font-semibold"
          style={{ background: PURPLE }}
        >
          {produto.cta}
        </a>
      </section>

      {/* 10 — Cross-selling */}
      <section className="w-full px-6 py-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-neutral-900">Complete sua jornada</h2>
          <div className="cp-grid-3">
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
      <section className="w-full px-6 py-12 bg-neutral-50">
        <div className="max-w-3xl mx-auto">
          <blockquote className="p-6 rounded-xl bg-white">
            <Quote size={28} style={{ color: PURPLE }} />
            <p className="mt-3 italic text-neutral-700">"{produto.depoimento.texto}"</p>
            <footer className="mt-4">
              <p className="font-semibold text-neutral-900">{produto.depoimento.autor}</p>
              <p className="text-sm text-neutral-500">{produto.depoimento.cargo} · {produto.depoimento.cidade}</p>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* 12 — Como funciona */}
      <section className="w-full px-6 py-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-neutral-900">Como funciona</h2>
          <div className="grid md:grid-cols-5 gap-6">
            {produto.comoFunciona.map((s) => (
              <div key={s.step} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ background: PURPLE }}>
                  {s.step}
                </div>
                <p className="mt-3 font-medium text-neutral-900">{s.titulo}</p>
                <p className="text-sm text-neutral-600 mt-1">{s.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13 — FAQ */}
      <section className="w-full px-6 py-12 bg-neutral-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-neutral-900">Perguntas frequentes</h2>
          <div>
            {produto.faq.map((f, i) => (
              <div key={i} className="border-b">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-4 text-left"
                >
                  <span className="font-medium text-neutral-900">{f.pergunta}</span>
                  <ChevronDown
                    size={20}
                    className="transition-transform"
                    style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)' }}
                  />
                </button>
                {openFaq === i && <p className="pb-4 text-neutral-600">{f.resposta}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14 — Próximos passos */}
      <section className="w-full px-6 py-12 bg-white">
        <div className="max-w-4xl mx-auto cp-grid-3">
          <button
            onClick={goCategoria}
            className="px-6 py-3 rounded-lg border font-medium"
            style={{ borderColor: PURPLE, color: PURPLE }}
          >
            Explorar opções
          </button>
          <a
            href={waSimular}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-lg text-white font-medium text-center"
            style={{ background: PURPLE }}
          >
            Simular minha carta
          </a>
          <a
            href={waGestor}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-lg border font-medium text-center"
            style={{ borderColor: PURPLE, color: PURPLE }}
          >
            Falar com meu gestor
          </a>
        </div>
      </section>

      {/* 15 — Ecossistema tagline */}
      <section className="w-full px-6 py-8 text-white text-center" style={{ background: PURPLE }}>
        <p className="text-lg max-w-4xl mx-auto">{produto.ecossistema}</p>
      </section>
    </div>
  );
}
