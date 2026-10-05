import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { buscar, CATALOGO, DESTAQUES, VERTICAIS, type ItemCatalogo, type VerticalId } from "@/lib/verticais";
import { usarPerfil } from "@/lib/perfilPublico";
import { usarFavoritos } from "@/lib/favoritos";
import { BotaoFavoritar, EstiloFavoritar } from "@/components/favoritos/BotaoFavoritar";

/**
 * "O que você quer proteger ou realizar?": a descoberta da Home.
 *
 * O arranjo é o do wireframe: título com a escolha de público, as cinco áreas,
 * o campo com o botão Encontrar soluções, os atalhos de frase, o título dos
 * resultados com o botão de limpar e, abaixo, as três garantias.
 *
 * A busca é local, sobre o modelo único do catálogo. O pacote é explícito:
 * backend de busca não é requisito desta fase, filtragem local basta. Por isso
 * não há estado de carregamento nem chamada de rede aqui.
 *
 * Em repouso a seção já mostra conteúdo: os destaques do público escolhido,
 * que são os mesmos do mega menu. "Atalhos para começar" é o título desse
 * estado, e vira a contagem assim que alguém digita ou escolhe uma área.
 */
const ATALHOS = ["Vou viajar", "Comprei um apartamento", "Proteger minha equipe"];

const GARANTIAS = [
  "Conversa antes da recomendação",
  "Atenção às diferenças entre propostas",
  "Clareza para decidir",
];

export function Descoberta() {
  const [termo, setTermo] = useState("");
  // o público vem da navegação rápida: é a mesma escolha no site inteiro
  const { perfil, definirPerfil } = usarPerfil();
  const { quantidade: favoritos, abrir: abrirFavoritos } = usarFavoritos();
  const [vertical, setVertical] = useState<VerticalId | "todas">("todas");

  const buscando = termo.trim().length >= 2;
  const filtrando = buscando || vertical !== "todas";

  const resultados = useMemo<ItemCatalogo[]>(() => {
    if (buscando) {
      const base = buscar(termo, perfil === "todos" ? undefined : perfil, 60);
      const filtrados = vertical === "todas" ? base : base.filter((i) => i.vertical === vertical);
      return filtrados.slice(0, 12);
    }
    // em repouso, os destaques: os mesmos itens verificados do mega menu
    const areas = vertical === "todas" ? VERTICAIS : VERTICAIS.filter((v) => v.id === vertical);
    const publicos = perfil === "todos" ? (["pessoal", "empresa"] as const) : ([perfil] as const);
    const saida: ItemCatalogo[] = [];
    for (const area of areas) for (const p of publicos) saida.push(...DESTAQUES[area.id][p]);
    return saida.slice(0, 12);
  }, [termo, buscando, perfil, vertical]);

  // sem termo digitado, a seção mostra o tamanho do catálogo por vertical
  const contagem = useMemo(() => {
    const base = perfil === "todos" ? CATALOGO : CATALOGO.filter((i) => i.perfil === perfil);
    const m = new Map<string, number>();
    for (const i of base) m.set(i.vertical, (m.get(i.vertical) ?? 0) + 1);
    return m;
  }, [perfil]);

  const tituloResultados = filtrando
    ? resultados.length === 0
      ? "Nada encontrado"
      : `${resultados.length} ${resultados.length === 1 ? "solução encontrada" : "soluções encontradas"}`
    : perfil === "todos"
      ? "Atalhos para começar"
      : `Soluções para ${perfil === "empresa" ? "sua empresa" : "você e sua família"}`;

  function verTodasAsAreas() {
    setTermo("");
    setVertical("todas");
  }

  return (
    <section className="f1 f1-sec" id="descoberta" aria-labelledby="desc-h">
      <EstiloFavoritar />
      <style>{`
        .f1-filtros { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 22px; }
        .f1-filtro {
          font-size: .8rem; font-weight: 600; padding: 8px 15px; border-radius: 999px;
          border: 1px solid #E0DBD0; background: transparent; color: #5B6472; cursor: pointer;
          transition: border-color .2s, color .2s, background .2s;
          font-family: var(--font-sans);
        }
        .f1-filtro:hover { border-color: #C6A24A; color: #16222F; }
        .f1-filtro[aria-pressed="true"] { background: #0E2438; border-color: #0E2438; color: #F1EFEA; }
        .f1-filtro:focus-visible { outline: 2px solid #C45016; outline-offset: 2px; }
        .f1-busca { display: flex; gap: 10px; margin-top: 20px; flex-wrap: wrap; align-items: center; }
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
        .f1-res-topo {
          display: flex; align-items: baseline; justify-content: space-between; gap: 14px;
          margin-top: 30px; flex-wrap: wrap;
        }
        .f1-res-topo h3 { font-size: 1.04rem; font-weight: 600; margin: 0; color: #16222F; }
        .f1-limpar {
          border: 0; background: none; padding: 0; cursor: pointer; font-family: var(--font-sans);
          font-size: .84rem; font-weight: 700; color: #9A7B23;
        }
        .f1-limpar:hover { text-decoration: underline; }
        .f1-res { display: grid; gap: 10px; margin-top: 16px; grid-template-columns: 1fr; }
        @media (min-width: 720px) { .f1-res { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1080px) { .f1-res { grid-template-columns: repeat(3, 1fr); } }
        .f1-res a { display: flex; flex-direction: column; gap: 4px; text-decoration: none; }
        .f1-res strong { font-size: .95rem; font-weight: 600; color: #16222F; }
        .f1-res small { font-size: .74rem; letter-spacing: .06em; text-transform: uppercase; color: #9AA1AC; }
        .f1-vazio { margin-top: 16px; color: #6B7482; font-size: .95rem; }
        .f1-res-card {
          display: flex; flex-direction: column; gap: 10px; align-items: flex-start;
          border: 1px solid #E6E1D6; border-radius: 10px; padding: 14px 16px; background: #fff;
          transition: border-color .2s ease;
        }
        .f1-res-card:hover { border-color: #C6A24A; }
        .f1-nada {
          margin-top: 16px; border: 1px dashed #D9D2C4; border-radius: 12px;
          padding: 22px 20px; display: grid; gap: 10px; background: #FBFAF6;
        }
        .f1-nada strong { font-size: 1.02rem; font-weight: 600; color: #16222F; }
        .f1-nada p { font-size: .93rem; line-height: 1.55; color: #5B6472; margin: 0; }
        .f1-conv {
          display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
          gap: 14px; margin-top: 28px; padding: 18px 20px; border-radius: 12px; background: #F4F2EC;
        }
        .f1-conv p { margin: 0; font-size: .92rem; line-height: 1.5; color: #5B6472; }
        .f1-conv strong { color: #16222F; font-weight: 600; }
        .f1-conv-n {
          display: inline-flex; align-items: center; justify-content: center; min-width: 20px;
          height: 20px; padding: 0 5px; margin-left: 4px; border-radius: 999px;
          background: #0E2438; color: #fff; font-size: .68rem; font-weight: 700;
        }
        .f1-garantias {
          display: flex; flex-wrap: wrap; gap: 10px 26px; margin-top: 34px;
          padding-top: 22px; border-top: 1px solid #E6E1D6;
        }
        .f1-garantias span { font-size: .88rem; color: #5B6472; display: inline-flex; align-items: center; gap: 8px; }
        .f1-garantias span::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: #C6A24A; flex: none; }
      `}</style>

      <div className="f1-wrap">
        <h2 className="f1-h2" id="desc-h">
          O que você quer proteger ou realizar?
        </h2>

        <div className="f1-filtros" role="group" aria-label="Para quem você procura">
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

        <div className="f1-filtros" role="group" aria-label="Buscar por área">
          {VERTICAIS.map((v) => (
            <button
              key={v.id}
              type="button"
              className="f1-filtro"
              aria-pressed={vertical === v.id}
              onClick={() => setVertical(vertical === v.id ? "todas" : v.id)}
            >
              {v.label}
              <span style={{ opacity: 0.6 }}> {contagem.get(v.id) ?? 0}</span>
            </button>
          ))}
        </div>

        <form
          className="f1-busca"
          onSubmit={(e) => {
            // a filtragem é local e já acontece a cada tecla; o botão existe
            // para quem termina de digitar e procura onde confirmar
            e.preventDefault();
          }}
        >
          <label htmlFor="f1-q" style={{ position: "absolute", left: -9999 }}>
            Descreva sua necessidade ou digite uma solução
          </label>
          <input
            id="f1-q"
            type="search"
            autoComplete="off"
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            placeholder="Ex.: vou viajar, proteger minha família, saúde para minha equipe"
          />
          <button type="submit" className="f1-btn f1-btn-p">
            Encontrar soluções
          </button>
        </form>

        <div className="f1-atalhos">
          <span>Experimente:</span>
          {ATALHOS.map((a) => (
            <button key={a} type="button" className="f1-atalho" onClick={() => setTermo(a)}>
              {a}
            </button>
          ))}
        </div>

        <div className="f1-res-topo">
          <h3 id="f1-res-h">{tituloResultados}</h3>
          {filtrando && (
            <button type="button" className="f1-limpar" onClick={verTodasAsAreas}>
              Ver todas as áreas
            </button>
          )}
        </div>

        {resultados.length > 0 ? (
          <div className="f1-res" aria-labelledby="f1-res-h">
            {resultados.map((i) => (
              <div key={i.chave} className="f1-res-card">
                <Link
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
                <BotaoFavoritar chave={i.chave} nome={i.nome} />
              </div>
            ))}
          </div>
        ) : (
          <div className="f1-nada">
            <strong>Vamos entender melhor sua necessidade.</strong>
            <p>Experimente descrever seu objetivo de outra forma ou ampliar as áreas e os perfis.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
              <button type="button" className="f1-btn f1-btn-s" onClick={verTodasAsAreas}>
                Ampliar minha busca
              </button>
              <Link to="/fale-conosco" className="f1-btn f1-btn-s">
                Conversar sobre o que preciso
              </Link>
            </div>
          </div>
        )}

        <p aria-live="polite" style={{ position: "absolute", left: -9999 }}>
          {filtrando ? tituloResultados : ""}
        </p>

        <p className="f1-vazio">
          São {CATALOGO.length} soluções no catálogo. Use os filtros, descreva o seu momento ou
          comece por um dos atalhos acima.
        </p>

        <div className="f1-conv">
          <p>
            <strong>Favorite pra cotar mais de um seguro / serviço</strong>
            <br />
            Reúna suas escolhas e peça as cotações em uma só conversa.
          </p>
          <button type="button" className="f1-limpar" onClick={abrirFavoritos}>
            Ver favoritos <span className="f1-conv-n">{favoritos}</span>
            <span aria-hidden> →</span>
          </button>
        </div>

        <div className="f1-garantias">
          {GARANTIAS.map((g) => (
            <span key={g}>{g}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
