import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";

interface RedirectPopupProps {
  isOpen: boolean;
  onClose: () => void;
  targetUrl: string;
  partnerName: string;
}

export function RedirectPopup({ isOpen, onClose, targetUrl, partnerName }: RedirectPopupProps) {
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    if (!isOpen) return;
    setSeconds(5);
    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(interval);
          window.open(targetUrl, "_blank", "noopener,noreferrer");
          onClose();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, targetUrl, onClose]);

  const handleContinue = () => {
    window.open(targetUrl, "_blank", "noopener,noreferrer");
    onClose();
  };

  const progress = ((5 - seconds) / 5) * 100;

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative h-20 w-20">
          <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="34" stroke="#E8E8E8" strokeWidth="6" fill="none" />
            <circle
              cx="40"
              cy="40"
              r="34"
              stroke="#FF6B00"
              strokeWidth="6"
              fill="none"
              strokeDasharray={2 * Math.PI * 34}
              strokeDashoffset={2 * Math.PI * 34 * (1 - progress / 100)}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-orange">
            {seconds}
          </span>
        </div>
        <h3 className="font-h3">Você está sendo redirecionado</h3>
        <p className="text-neutral-700">
          Você será levado ao site oficial da {partnerName}. A Plan10 permanece como sua corretora neste processo.
        </p>
        <div className="mt-2 flex w-full gap-2">
          <Button variant="ghost" className="flex-1" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" className="flex-1" onClick={handleContinue}>
            Continuar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
