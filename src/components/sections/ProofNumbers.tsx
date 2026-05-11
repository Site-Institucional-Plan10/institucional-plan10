import { Calendar, Users, Handshake, Briefcase, Clock } from "lucide-react";

const items = [
  { Icon: Calendar, value: "2016", label: "Fundação" },
  { Icon: Users, value: "5K+", label: "Clientes" },
  { Icon: Handshake, value: "50+", label: "Parceiros" },
  { Icon: Briefcase, value: "+40", label: "Produtos" },
  { Icon: Clock, value: "24/7", label: "Atendimento" },
];

export function ProofNumbers({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "py-10" : "section-y"} style={{ backgroundColor: "#1A4FA0" }}>
      <div className="container-x">
        {!compact && (
          <h2 className="font-h2 text-white text-center mb-12">Números da Plan10</h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {items.map(({ Icon, value, label }) => (
            <div key={label} className="text-center text-white">
              <Icon size={32} className="mx-auto mb-3 opacity-80" />
              <div className="text-3xl md:text-4xl font-extrabold">{value}</div>
              <div className="text-sm opacity-80 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
