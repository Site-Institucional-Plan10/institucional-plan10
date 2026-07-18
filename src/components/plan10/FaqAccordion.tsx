export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  if (!items.length) return null;
  return (
    <div className="p10-faq">
      {items.map((it, i) => (
        <details key={i} open={i === 0}>
          <summary>{it.q}</summary>
          <div className="ans">{it.a}</div>
        </details>
      ))}
    </div>
  );
}
