import { Link } from "@tanstack/react-router";
import { ArrowRight, ScanLine, UserRound, Waypoints } from "lucide-react";

/**
 * Home hero, premium e compacto. Foto de veleiro ao fundo sob camada navy
 * (texto à esquerda, veleiro revelado à direita). Um único acento dourado.
 * Conteúdo oficial: 01_HOME.xlsx, coluna D.
 */

/** A rolagem suave do único link de âncora do site, agora que ela não vem mais
 *  do CSS. Desconta o cabeçalho fixo para o título não ficar embaixo dele. */
function irAoContato(e: React.MouseEvent<HTMLAnchorElement>) {
  const alvo = document.getElementById("fale-conosco");
  if (!alvo) return;
  e.preventDefault();
  const folga = document.querySelector("header")?.offsetHeight ?? 0;
  window.scrollTo({ top: alvo.getBoundingClientRect().top + window.scrollY - folga, behavior: "smooth" });
}
export function PremiumHero() {
  return (
    <section className="ph2" aria-labelledby="ph2-title">
      <style>{`
        /* A foto é um <img> de verdade, não background de CSS: assim o navegador
           escolhe a versão pelo tamanho da tela, declara proporção e carrega com
           prioridade alta, por ser o primeiro conteúdo visível. O azul fica como
           cor de apoio enquanto a imagem não chega. */
        .ph2 {
          position: relative; overflow: hidden;
          background: #0B1C2D;
          color: #F1EFEA;
          font-family: var(--font-sans);
          padding: 108px 24px 56px;
          isolation: isolate;
        }
        .ph2-foto { position: absolute; inset: 0; z-index: -2; }
        .ph2-foto img { width: 100%; height: 100%; object-fit: cover; object-position: center 42%; display: block; }
        .ph2-veu {
          position: absolute; inset: 0; z-index: -1;
          background: linear-gradient(100deg, rgba(9,23,38,.97) 0%, rgba(11,28,45,.92) 38%, rgba(11,28,45,.66) 70%, rgba(11,28,45,.46) 100%);
        }
        .ph2::before {
          content: ""; position: absolute; inset: 0; z-index: -1;
          background: radial-gradient(60% 80% at 15% 18%, rgba(20,44,66,.5) 0%, transparent 60%);
        }
        .ph2-in { max-width: 1180px; margin: 0 auto; position: relative; }
        .ph2-eyebrow {
          font-family: var(--font-sans);
          font-weight: 700; font-size: 0.7rem;
          letter-spacing: .2em; text-transform: uppercase;
          color: #D8B879; margin: 0 0 16px;
        }
        .ph2-h1 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(2.1rem, 4.6vw, 3.6rem);
          line-height: 1.14; letter-spacing: -.035em;
          margin: 0; max-width: 20ch; color: #fff;
          text-wrap: balance; text-shadow: 0 2px 30px rgba(6,18,30,.4);
        }
        .ph2-h1 .accent { color: #F0D29A; font-weight: 600; }
        .ph2-lede {
          font-size: clamp(.98rem, 1.3vw, 1.08rem);
          line-height: 1.7; color: rgba(255,255,255,.82);
          max-width: 62ch; margin: 18px 0 0; font-weight: 400;
          text-shadow: 0 1px 16px rgba(6,18,30,.35);
        }
        .ph2-ctas { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }
        .ph2-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 13px 24px; border-radius: 5px; min-height: 45px;
          font-weight: 700; font-size: .88rem; text-decoration: none;
          transition: transform .2s ease, background .2s ease, border-color .2s ease;
        }
        .ph2-btn-p { background: #E8BD75; color: #051F49; }
        .ph2-btn-p:hover { background: #F0D29A; transform: translateY(-1px); }
        .ph2-btn-s { color: #F1EFEA; border: 1px solid rgba(241,239,234,.32); backdrop-filter: blur(3px); }
        .ph2-btn-s:hover { border-color: rgba(241,239,234,.7); transform: translateY(-2px); }
        .ph2-btn-s svg { transition: transform .2s ease; }
        .ph2-btn-s:hover svg { transform: translateX(3px); }
        .ph2-strip {
          max-width: 1180px; margin: 32px auto 0; position: relative;
          display: flex; flex-wrap: wrap; gap: 12px 36px;
          padding-top: 22px; border-top: 1px solid rgba(241,239,234,.14);
        }
        .ph2-strip span {
          font-family: var(--font-sans);
          font-size: 0.8rem; color: #BBCADD;
          display: inline-flex; align-items: center; gap: 7px;
        }
        .ph2-strip svg { width: 15px; height: 15px; flex: none; }
        @media (max-width: 720px) {
          .ph2 {
            /* Fallback cromático, como o pacote pede: cor, não outra foto. A
               foto do hero vem do <picture> acima. Aqui havia o veleiro do site
               antigo, que o celular baixava escondido atrás da foto nova. */
            background:
              linear-gradient(178deg, rgba(12,31,49,.82) 0%, rgba(13,33,52,.9) 55%, rgba(12,31,49,.96) 100%),
              #0C1F31;
            padding: 92px 20px 40px;
          }
          /* O rótulo quebrava em duas linhas por causa do letter-spacing largo.
             Menor e mais apertado, cabe numa linha até em tela de 320px. */
          .ph2-eyebrow { font-size: 0.64rem; letter-spacing: .09em; gap: 9px; margin-bottom: 12px; }
          .ph2-eyebrow::before { width: 18px; }
          /* Título de 8 linhas no celular. Um corpo menor tira duas. */
          .ph2-h1 { font-size: 1.58rem; line-height: 1.16; }
          .ph2-lede { font-size: .95rem; margin-top: 12px; }
          .ph2-strip { gap: 10px 22px; margin-top: 28px; }
        }
        @media (prefers-reduced-motion: reduce) { .ph2-btn:hover { transform: none; } }
      `}</style>

      <div className="ph2-foto" aria-hidden>
        <picture>
          <source media="(max-width: 680px)" srcSet="/assets/fase1/hero-banner-plan10-seguros-900.webp" />
          <img
            src="/assets/fase1/hero-banner-plan10-seguros-1672.webp"
            width={1672}
            height={941}
            alt=""
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </div>
      <div className="ph2-veu" aria-hidden />

      <div className="ph2-in">
        <p className="ph2-eyebrow">Consultoria e corretora de seguros</p>
        <h1 id="ph2-title" className="ph2-h1">
          Suas conquistas merecem <span className="accent">horizontes tranquilos</span>.
        </h1>
        <p className="ph2-lede">
          Soluções e seguros para você, sua família e sua empresa. A Plan10 ajuda a comparar as
          opções e escolher com clareza o que faz sentido para o seu momento.
        </p>
        <div className="ph2-ctas">
          {/* a seta é do botão principal, como no wireframe; estava no outro */}
          <Link to="/solucoes" className="ph2-btn ph2-btn-p">
            Encontrar minha solução
            <ArrowRight size={16} aria-hidden />
          </Link>
          <a href="#fale-conosco" className="ph2-btn ph2-btn-s" onClick={irAoContato}>
            Falar com um consultor
          </a>
        </div>
      </div>

      <div className="ph2-strip">
        {/* ícones e caixa normal, como no wireframe; antes eram pontinhos dourados
            e texto em caixa alta */}
        <span>
          <UserRound aria-hidden /> Atendimento humano
        </span>
        <span>
          <ScanLine aria-hidden /> Escolha com clareza
        </span>
        <span>
          <Waypoints aria-hidden /> Visão integrada
        </span>
      </div>
    </section>
  );
}
