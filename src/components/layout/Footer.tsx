import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Linkedin, Youtube } from "lucide-react";

import { WHATSAPP_URL, WHATSAPP_DISPLAY } from "@/components/common/WhatsAppButton";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-x py-16">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <img src="/assets/logos/logo-plan10.png" alt="Plan10" style={{ height: 40, width: "auto" }} />
            <p className="mt-4 text-sm text-neutral-300 max-w-xs leading-[1.7]">
              Proteção, cuidados com a saúde e planejamento patrimonial em um só lugar.
            </p>
          </div>
          <p className="font-spec text-neutral-300">SUSEP Nº [a definir]</p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1 — Institucional */}
          <div>
            <h4 className="font-eyebrow text-orange mb-4">Institucional</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/quem-somos" className="hover:text-orange transition">Quem Somos</Link></li>
              <li><Link to="/quem-somos" className="hover:text-orange transition">Missão, Visão e Valores</Link></li>
              <li><Link to="/" hash="depoimentos" className="hover:text-orange transition">Depoimentos</Link></li>
              <li><Link to="/fale-conosco" className="hover:text-orange transition">Contato</Link></li>
            </ul>
          </div>

          {/* Col 2 — Soluções */}
          <div>
            <h4 className="font-eyebrow text-orange mb-4">Soluções</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/saude" className="hover:text-orange transition">Planos de Saúde</Link></li>
              <li><Link to="/consorcios" className="hover:text-orange transition">Consórcios</Link></li>
              <li><Link to="/seguros" className="hover:text-orange transition">Seguros Gerais</Link></li>
              <li><Link to="/financas" className="hover:text-orange transition">Produtos Financeiros</Link></li>
              <li><Link to="/servicos-24h" className="hover:text-orange transition">Serviços 24h</Link></li>
            </ul>
          </div>

          {/* Col 3 — Contato */}
          <div>
            <h4 className="font-eyebrow text-orange mb-4">Contato</h4>
            <ul className="space-y-2 text-sm">
              <li>
                WhatsApp:{" "}
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="font-spec hover:text-orange">
                  {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>E-mail: contato@plan10.com.br</li>
              <li><Link to="/fale-conosco" className="hover:text-orange transition">Atendimento online</Link></li>
            </ul>
            <div className="mt-4 flex gap-3">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-orange transition">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 4 — Legal */}
          <div>
            <h4 className="font-eyebrow text-orange mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange transition">Trabalhe conosco</a></li>
              <li><Link to="/privacidade" className="hover:text-orange transition">Política de Privacidade</Link></li>
              <li><Link to="/lgpd" className="hover:text-orange transition">LGPD</Link></li>
              <li><Link to="/termos" className="hover:text-orange transition">Termos de Uso</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-6 flex flex-col md:flex-row gap-2 md:gap-4 items-center justify-between text-xs text-neutral-300">
          <span>© 2026 Plan10 Corretora. Uma empresa Plan Group.</span>
          <span>Desenvolvido por Next Assessoria</span>
        </div>
      </div>
    </footer>
  );
}
