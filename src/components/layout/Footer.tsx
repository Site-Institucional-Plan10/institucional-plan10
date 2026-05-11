import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import { Plan10Logo } from "@/components/ui/Plan10Logo";
import { WHATSAPP_URL, WHATSAPP_DISPLAY } from "@/components/common/WhatsAppButton";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-x py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Plan10Logo variant="full" size={130} light />
          <p className="mt-4 text-sm text-neutral-300 max-w-xs">
            Proteção, cuidados com a saúde e planejamento patrimonial em um só lugar.
          </p>
          <div className="mt-6 flex gap-3">
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
          <p className="mt-6 font-spec text-neutral-300">SUSEP Nº [a definir]</p>
        </div>

        <div>
          <h4 className="font-eyebrow text-orange mb-4">Soluções</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/seguros" className="hover:text-orange transition">Seguros</Link></li>
            <li><Link to="/saude" className="hover:text-orange transition">Saúde</Link></li>
            <li><Link to="/consorcios" className="hover:text-orange transition">Consórcio</Link></li>
            <li><Link to="/financas" className="hover:text-orange transition">Finanças</Link></li>
            <li><Link to="/servicos-24h" className="hover:text-orange transition">Serviços 24h</Link></li>
          </ul>
        </div>

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
            <li>Atendimento: 24/7</li>
            <li><Link to="/fale-conosco" className="hover:text-orange transition">Atendimento online</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-eyebrow text-orange mb-4">Institucional e Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-orange transition">Trabalhe conosco</a></li>
            <li><Link to="/privacidade" className="hover:text-orange transition">Política de Privacidade</Link></li>
            <li><Link to="/lgpd" className="hover:text-orange transition">LGPD</Link></li>
            <li><Link to="/termos" className="hover:text-orange transition">Termos de Uso</Link></li>
          </ul>
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
