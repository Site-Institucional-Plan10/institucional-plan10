import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/Plan10Button";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem("plan10_cookies")) setVisible(true);
  }, []);

  if (!visible) return null;

  const choose = (choice: "all" | "essential") => {
    localStorage.setItem("plan10_cookies", choice);
    setVisible(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-neutral-200 bg-white shadow-lg">
      <div className="container-x flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-neutral-700">
          Usamos cookies para melhorar sua experiência. Ao continuar, você concorda com nossa{" "}
          <Link to="/privacidade" className="font-semibold text-orange underline">
            Política de Privacidade
          </Link>{" "}
          conforme a LGPD.
        </p>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => choose("essential")}>
            Apenas essenciais
          </Button>
          <Button variant="primary" size="sm" onClick={() => choose("all")}>
            Aceitar todos
          </Button>
        </div>
      </div>
    </div>
  );
}
