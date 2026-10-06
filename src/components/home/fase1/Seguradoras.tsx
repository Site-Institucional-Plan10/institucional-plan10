import { FaixaSeguradoras } from "@/components/common/FaixaSeguradoras";

/** Seção das seguradoras na Home. A faixa em si é compartilhada com Quem somos. */
export function Seguradoras() {
  return (
    <section className="f1 f1-sec f1-alt" aria-labelledby="seg-h">
      <div className="f1-wrap">
        <p className="f1-eyebrow">Mais opções para a sua escolha</p>
        <h2 className="f1-h2" id="seg-h">
          Seguradoras em nosso portfólio
        </h2>
      </div>
      <div style={{ marginTop: 30 }}>
        <FaixaSeguradoras />
      </div>
    </section>
  );
}
