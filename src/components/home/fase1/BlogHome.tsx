import { Link } from "@tanstack/react-router";
import { blogArticles, blogCategoryFor } from "@/data/blogArticles";
import { fotoDoArtigo } from "@/lib/blogImagery";

/**
 * Seis leituras na Home, antes do CTA final, como pede a ordem do pacote.
 * Usa os artigos reais do blog e a foto que cada um já tem, em vez de uma
 * lista separada que precisaria ser mantida em paralelo.
 */
export function BlogHome() {
  const artigos = blogArticles.slice(0, 6);

  return (
    <section className="f1 f1-sec" id="blog" aria-labelledby="blog-h">
      <style>{`
        .f1-posts { display: grid; gap: 18px; margin-top: 28px; grid-template-columns: 1fr; }
        @media (min-width: 720px) { .f1-posts { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1080px) { .f1-posts { grid-template-columns: repeat(3, 1fr); } }
        .f1-post {
          display: flex; flex-direction: column; text-decoration: none; color: inherit;
          border: 1px solid #E6E1D6; border-radius: 10px; overflow: hidden; background: #fff;
          transition: border-color .2s ease;
        }
        .f1-post:hover { border-color: #C6A24A; }
        .f1-post-capa { aspect-ratio: 16 / 9; overflow: hidden; background: #F0EDE5; }
        .f1-post-capa img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .f1-post-corpo { padding: 16px 18px 18px; display: flex; flex-direction: column; gap: 7px; flex: 1; }
        .f1-post-cat {
          font-size: .68rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: #9A7B23;
        }
        .f1-post h3 { font-size: 1rem; font-weight: 600; line-height: 1.32; margin: 0; color: #16222F; }
        .f1-post p { font-size: .88rem; line-height: 1.5; color: #5B6472; margin: 0; }
        .f1-post small { margin-top: auto; font-size: .78rem; color: #9AA1AC; }
        .f1-post-mais { font-size: .84rem; font-weight: 700; color: #9A7B23; }
      `}</style>

      <div className="f1-wrap">
        <p className="f1-eyebrow">Blog Plan10</p>
        <h2 className="f1-h2" id="blog-h">
          Informação para escolher melhor.
        </h2>
        <p className="f1-lede">Dúvidas do dia a dia. Respostas para dar o próximo passo.</p>

        <div className="f1-posts">
          {artigos.map((a) => {
            const foto = fotoDoArtigo(a.slug);
            const cat = blogCategoryFor(a.category);
            return (
              <Link key={a.slug} to="/blog/$slug" params={{ slug: a.slug }} className="f1-post">
                <div className="f1-post-capa">
                  {foto && (
                    <img src={foto.src} alt={foto.alt} loading="lazy" decoding="async" />
                  )}
                </div>
                <div className="f1-post-corpo">
                  <span className="f1-post-cat">{cat.label}</span>
                  <h3>{a.title}</h3>
                  <p>{a.summary}</p>
                  <small>{a.readingTime}</small>
                  <span className="f1-post-mais">Ler mais →</span>
                </div>
              </Link>
            );
          })}
        </div>

        <div style={{ marginTop: 26, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link to="/blog" className="f1-btn f1-btn-s">
            Ver todas as leituras →
          </Link>
          <Link to="/solucoes" className="f1-btn f1-btn-s">
            Explorar soluções relacionadas
          </Link>
        </div>
      </div>
    </section>
  );
}
