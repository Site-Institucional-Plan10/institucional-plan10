const WebSocket = require("ws");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function medir(url, movel) {
  const r = await fetch("http://127.0.0.1:9333/json/new?about:blank", { method: "PUT" });
  const ws = new WebSocket((await r.json()).webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((x) => ws.once("open", x));
  let id = 0; const pend = new Map(); const recursos = [];
  ws.on("message", (m) => {
    const d = JSON.parse(m);
    if (d.id && pend.has(d.id)) { pend.get(d.id)(d); pend.delete(d.id); return; }
    if (d.method === "Network.loadingFinished") {
      const r = recursos.find(x => x.id === d.params.requestId);
      if (r) r.bytes = d.params.encodedDataLength;
    }
    if (d.method === "Network.responseReceived")
      recursos.push({ id: d.params.requestId, url: d.params.response.url, tipo: d.params.type, bytes: 0 });
  });
  const cmd = (me, p = {}) => new Promise((res) => (pend.set(++id, res), ws.send(JSON.stringify({ id, method: me, params: p }))));
  await cmd("Page.enable"); await cmd("Runtime.enable"); await cmd("Network.enable");
  await cmd("Emulation.setDeviceMetricsOverride", movel
    ? { width: 390, height: 844, deviceScaleFactor: 3, mobile: true }
    : { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  // 4G lento, que é o cenário real de quem abre num celular na rua
  if (movel) await cmd("Network.emulateNetworkConditions", {
    offline: false, latency: 150, downloadThroughput: 1.6*1024*1024/8, uploadThroughput: 750*1024/8 });
  if (movel) await cmd("Emulation.setCPUThrottlingRate", { rate: 4 });

  await cmd("Runtime.evaluate", { expression: `
    window.__m = { lcp: 0, cls: 0 };
    new PerformanceObserver(l => { for (const e of l.getEntries()) window.__m.lcp = e.startTime; })
      .observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__m.cls += e.value; })
      .observe({ type: "layout-shift", buffered: true });
  ` });
  await cmd("Page.addScriptToEvaluateOnNewDocument", { source: `
    window.__m = { lcp: 0, cls: 0 };
    new PerformanceObserver(l => { for (const e of l.getEntries()) window.__m.lcp = e.startTime; })
      .observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__m.cls += e.value; })
      .observe({ type: "layout-shift", buffered: true });
  ` });
  await cmd("Page.navigate", { url });
  await sleep(movel ? 16000 : 9000);
  const v = (await cmd("Runtime.evaluate", { expression: `(() => {
    const n = performance.getEntriesByType("navigation")[0] || {};
    const alvo = performance.getEntriesByType("largest-contentful-paint").slice(-1)[0];
    return {
      lcp: Math.round(window.__m.lcp), cls: +window.__m.cls.toFixed(3),
      ttfb: Math.round(n.responseStart || 0), dcl: Math.round(n.domContentLoadedEventEnd || 0),
      alvoLCP: alvo ? (alvo.url || alvo.element?.tagName || "texto").split("/").pop().slice(0,40) : "?",
    };
  })()`, returnByValue: true })).result.result.value;
  ws.close();
  const total = recursos.reduce((a, r) => a + r.bytes, 0);
  const porTipo = {};
  for (const r of recursos) porTipo[r.tipo] = (porTipo[r.tipo] || 0) + r.bytes;
  const maiores = recursos.sort((a,b) => b.bytes - a.bytes).slice(0, 5)
    .map(r => `${(r.bytes/1024).toFixed(0)}KB ${r.url.split("/").pop().slice(0,36)}`);
  return { ...v, totalKB: Math.round(total/1024), porTipo: Object.fromEntries(Object.entries(porTipo).map(([k,v])=>[k, Math.round(v/1024)+"KB"])), maiores };
}

(async () => {
  for (const [nome, url, movel] of [
    ["Home celular (4G lento, CPU 4x)", "https://institucional-plan10.vercel.app/", true],
    ["Home desktop", "https://institucional-plan10.vercel.app/", false],
    ["Vertical celular", "https://institucional-plan10.vercel.app/solucoes/protecao", true],
  ]) {
    console.log("\n▸ " + nome);
    console.log(JSON.stringify(await medir(url, movel), null, 1));
  }
  process.exit(0);
})();
