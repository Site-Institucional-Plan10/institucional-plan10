import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Linkedin, Youtube, ChevronDown } from "lucide-react";

import { WHATSAPP_DISPLAY } from "@/components/common/WhatsAppButton";
import { getWhatsAppUrl } from "@/lib/utils";

type FooterSection = {
  title: string;
  links: { label: string; to?: string; href?: string; hash?: string; external?: boolean }[];
};

const sections: FooterSection[] = [
  {
    title: "Soluções",
    links: [
      { label: "Planos de Saúde", to: "/saude" },
      { label: "Consórcios", to: "/consorcios" },
      { label: "Seguros Gerais", to: "/seguros" },
      { label: "Produtos Financeiros", to: "/financas" },
      { label: "Serviços 24h", to: "/servicos-24h" },
    ],
  },
  {
    title: "Institucional",
    links: [
      { label: "Quem somos", to: "/quem-somos" },
      { label: "Missão, Visão e Valores", to: "/quem-somos" },
      { label: "Depoimentos", to: "/", hash: "depoimentos" },
      { label: "Contato", to: "/fale-conosco" },
    ],
  },
  {
    title: "Contato",
    links: [
      { label: `WhatsApp: ${WHATSAPP_DISPLAY}`, href: getWhatsAppUrl("default"), external: true },
      { label: "E-mail: contato@plan10.com.br", href: "mailto:contato@plan10.com.br" },
      { label: "Atendimento online", to: "/fale-conosco" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Trabalhe conosco", href: "#" },
      { label: "Política de Privacidade", to: "/privacidade" },
      { label: "LGPD", to: "/lgpd" },
      { label: "Termos de Uso", to: "/termos" },
    ],
  },
];

const headerStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: "0.85rem",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.45)",
  marginBottom: 16,
};

const linkStyle: React.CSSProperties = {
  fontSize: "0.875rem",
  color: "rgba(255,255,255,0.70)",
};

function FooterLink({ link }: { link: FooterSection["links"][number] }) {
  const cls = "transition-colors hover:text-orange";
  if (link.to) {
    return (
      <Link to={link.to} hash={link.hash} className={cls} style={linkStyle}>
        {link.label}
      </Link>
    );
  }
  return (
    <a
      href={link.href}
      className={cls}
      style={linkStyle}
      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {link.label}
    </a>
  );
}

export function Footer() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <footer style={{ background: "#111111" }} className="text-white border-t border-white/10">
      <div className="container-x py-12 md:py-16">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <img src="/assets/logos/logo-plan10.png" alt="Plan10" style={{ height: 40, width: "auto" }} />
            <p className="mt-4 text-sm max-w-xs leading-[1.7]" style={{ color: "rgba(255,255,255,0.65)" }}>
              Proteção, cuidados com a saúde e planejamento patrimonial em um só lugar.
            </p>
          </div>
        </div>

        {/* Desktop — 4 columns */}
        <div className="hidden md:grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {sections.map((s) => (
            <div key={s.title}>
              <h4 style={headerStyle}>{s.title}</h4>
              <ul className="space-y-2.5">
                {s.links.map((l) => (
                  <li key={l.label}><FooterLink link={l} /></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile — accordion */}
        <div className="md:hidden">
          {sections.map((s, i) => {
            const open = openIdx === i;
            return (
              <div key={s.title} style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}>
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="w-full flex items-center justify-between text-left"
                  style={{
                    padding: "16px 0",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "#FFFFFF",
                  }}
                  aria-expanded={open}
                >
                  {s.title}
                  <ChevronDown
                    size={18}
                    style={{
                      transition: "transform 240ms ease",
                      transform: open ? "rotate(180deg)" : "rotate(0deg)",
                      color: "rgba(255,255,255,0.55)",
                    }}
                  />
                </button>
                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: open ? "1fr" : "0fr",
                    transition: "grid-template-rows 280ms ease",
                  }}
                >
                  <div style={{ overflow: "hidden" }}>
                    <ul style={{ paddingBottom: 12 }}>
                      {s.links.map((l) => (
                        <li key={l.label} style={{ padding: "8px 0 8px 8px" }}>
                          <FooterLink link={l} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }} />
        </div>

        {/* Social icons */}
        <div className="mt-8 flex gap-3">
          {[
            { Icon: Instagram, label: "Instagram Plan10", href: "https://www.instagram.com/plan10seguros/" },
            { Icon: Facebook, label: "Facebook Plan10", href: "https://www.facebook.com/plan10seguros/" },
            { Icon: Linkedin, label: "LinkedIn", href: "#" },
            { Icon: Youtube, label: "YouTube", href: "#" },
          ].map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full transition"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)" }}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div
          className="container-x py-5 flex flex-col md:flex-row gap-2 md:gap-4 items-center justify-between"
          style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.40)" }}
        >
          <span>© 2026 Plan10 Corretora. Uma empresa Plan Group.</span>
          <span>
            Criado por{" "}
            <a
              href="https://www.nextassessoria.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange transition"
            >
              Next Assessoria
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
