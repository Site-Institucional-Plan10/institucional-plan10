import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { buscar, CATALOGO, VERTICAIS, type VerticalId } from "@/lib/verticais";
import { usarPerfil } from "@/lib/perfilPublico";

/**
 * "O que você quer proteger ou realizar?": a descoberta da Home.
 *
 * A busca é local, sobre o modelo único do catálogo. O pacote é explícito:
 * backend de busca não é requisito desta fase, filtragem local basta. Por isso
 * não há estado de carregamento nem chamada de rede aqui.
 *
 * Os atalhos são as frases do wireframe e levam à mesma busca, para a pessoa
 * não precisar saber o nome do produto.
 */
const ATALHOS = ["Vou viajar", "Comprei um apartamento", "Proteger minha equipe"];

export function Descoberta() {
  const [termo, setTermo] = useState("");
  // o público vem da navegação rápida: é a mesma escolha no site inteiro
  const { perfil, definirPerfil } = usarPerfil();
  const [vertical, setVertical] = useState<VerticalId | "todas">("todas");

  const resultados = useMemo(() => {
    const base = buscar(termo, perfil === "todos" ? undefined : perfil, 60);
    const filtrados = vertical === "todas" ? base : base.filter((i) => i.vertical === vertical);
    return filtrados.slice(0, 12);
  }, [termo, perfil, vertical]);

  // sem termo digitado, a seção mostra o tamanho do catálogo por vertical
  const contagem = useMemo(() => {
    const base = perfil === "todos" ? CATALOGO : CATALOGO.filter((i) => i.perfil === perfil);
    const m = new Map<string, number>();
    for (const i of base) m.set(i.vertical, (m.get(i.vertical) ?? 0) + 1);
    return m;
  }, [perfil]);

  return (
    <section className="f1 f1-sec" id="descoberta" aria-labelledby="desc-h">
      <style>{`
        .f1-filtros { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 22px; }
        .f1-filtro {
          font-size: .8rem; font-weight: 600; padding: 8px 15px; border-radius: 999px;
          border: 1px solid #E0DBD0; background: transparent; color: #5B6472; cursor: pointer;
          transition: border-color .2s, color .2s, background .2s;
        }
        .f1-filtro:hover { border-color: #C6A24A; color: #16222F; }
        .f1-filtro[aria-pressed="true"] { background: #0E2438; border-color: #0E2438; color: #F1EFEA; }
        .f1-filtro:focus-visible { outline: 2px solid #C45016; outline-offset: 2px; }
        .f1-busca { display: flex; gap: 10px; margin-top: 20px; flex-wrap: wrap; }
        .f1-busca input {
          flex: 1; min-width: 240px; border: 1px solid #E0DBD0; border-radius: 999px;
          padding: 14px 20px; font-family: var(--font-sans); font-size: 1rem; color: #16222F;
          background: #fff; outline: none;
        }
        .f1-busca input:focus { border-color: #C6A24A; }
        .f1-atalhos { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-top: 14px; font-size: .86rem; color: #6B7482; }
        .f1-atalho {
          border: 0; background: #F0EDE5; border-radius: 999px; padding: 6px 13px;
          font-size: .82rem; color: #16222F; cursor: pointer; font-family: var(--font-sans);
        }
        .f1-atalho:hover { background: #E4DFD2; }
        .f1-res { display: grid; gap: 10px; margin-top: 24px; grid-template-columns: 1fr; }
        @media (min-width: 720px) { .f1-res { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1080px) { .f1-res { grid-template-columns: repeat(3, 1fr); } }
        .f1-res a {
          display: flex; flex-direction: column; gap: 4px; text-decoration: none;
          border: 1px solid #E6E1D6; border-radius: 10px; padding: 14px 16px; background: #fff;
          transition: border-color .2s ease;
        }
        .f1-res a:hover { border-color: #C6A24A; }
        .f1-res strong { font-size: .95rem; font-weight: 600; color: #16222F; }
        .f1-res small { font-size: .74rem; letter-spacing: .06em; text-transform: uppercase; color: #9AA1AC; }
        .f1-vazio { margin-top: 22px; color: #6B7482; font-size: .95rem; }
      `}</style>

      <div className="f1-wrap">
        <p className="f1-eyebrow">Atalhos para começar</p>
        <h2 className="f1-h2" id="desc-h">
          O que você quer proteger ou realizar?
        </h2>

        <div className="f1-filtros" role="group" aria-label="Filtrar por público">
          {([["todos", "Todos os perfis"], ["pessoal", "Você e família"], ["empresa", "Sua empresa"]] as const).map(
            ([v, r]) => (
              <button
                key={v}
                type="button"
                className="f1-filtro"
                aria-pressed={perfil === v}
                onClick={() => definirPerfil(v)}
              >
                {r}
              </button>
            ),
          )}
        </div>

        <div className="f1-filtros" role="group" aria-label="Filtrar por especialidade">
          <button
            type="button"
            className="f1-filtro"
            aria-pressed={vertical === "todas"}
            onClick={() => setVertical("todas")}
          >
            Todas
          </button>
          {VERTICAIS.map((v) => (
            <button
              key={v.id}
              type="button"
              className="f1-filtro"
              aria-pressed={vertical === v.id}
              onClick={() => setVertical(v.id)}
            >
              {v.label}
              <span style={{ opacity: 0.6 }}> {contagem.get(v.id) ?? 0}</span>
            </button>
          ))}
        </div>

        <div className="f1-busca">
          <label htmlFor="f1-q" className="sr-only" style={{ position: "absolute", left: -9999 }}>
            Descreva sua necessidade ou digite uma solução
          </label>
          <input
            id="f1-q"
            type="search"
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            placeholder="Descreva sua necessidade ou digite uma solução"
          />
        </div>

        <div className="f1-atalhos">
          <span>Experimente:</span>
          {ATALHOS.map((a) => (
            <button key={a} type="button" className="f1-atalho" onClick={() => setTermo(a)}>
              {a}
            </button>
          ))}
        </div>

        {termo.trim().length >= 2 ? (
          resultados.length > 0 ? (
            <div className="f1-res">
              {resultados.map((i) => (
                <Link
                  key={i.chave}
                  to={i.rota.to}
                  params={i.rota.params}
                  search={i.rota.search}
                  hash={i.rota.hash}
                >
                  <strong>{i.nome}</strong>
                  <small>
                    {VERTICAIS.find((v) => v.id === i.vertical)?.label} ·{" "}
                    {i.perfil === "pessoal" ? "Você e família" : "Sua empresa"}
                  </small>
                </Link>
              ))}
            </div>
          ) : (
            <p className="f1-vazio">
              Nada encontrado para "{termo}". Tente outra palavra ou fale com um consultor.
            </p>
          )
        ) : (
          <p className="f1-vazio">
            São {CATALOGO.length} soluções no catálogo. Use os filtros, descreva o seu momento ou
            comece por um dos atalhos acima.
          </p>
        )}
      </div>
    </section>
  );
}
