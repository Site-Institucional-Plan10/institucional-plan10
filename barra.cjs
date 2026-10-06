const WebSocket = require("ws");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  for (const larg of [1440, 1100, 900, 390]) {
    const r = await fetch("http://127.0.0.1:9333/json/new?about:blank", { method: "PUT" });
    const ws = new WebSocket((await r.json()).webSocketDebuggerUrl, { perMessageDeflate: false });
    await new Promise((x) => ws.once("open", x));
    let id = 0; const pend = new Map();
    ws.on("message", (m) => { const d = JSON.parse(m); if (d.id && pend.has(d.id)) pend.get(d.id)(d), pend.delete(d.id); });
    const cmd = (me, p = {}) => new Promise((res) => (pend.set(++id, res), ws.send(JSON.stringify({ id, method: me, params: p }))));
    await cmd("Page.enable"); await cmd("Runtime.enable");
    await cmd("Emulation.setDeviceMetricsOverride", { width: larg, height: 900, deviceScaleFactor: 1, mobile: larg < 960 });
    await cmd("Page.navigate", { url: "https://institucional-plan10.vercel.app/solucoes/protecao" });
    await sleep(6500);
    const ler = async (e) => (await cmd("Runtime.evaluate", { expression: e, returnByValue: true, awaitPromise: true })).result.result?.value;
    await ler(`document.querySelector(".p10-fav")?.click(); true`);
    await sleep(900);
    const d = await ler(`(() => {
      const b = document.querySelector(".p10-hd-cotar");
      if (!b) return { existe: false };
      const cs = getComputedStyle(b);
      return { existe: true, display: cs.display, altura: Math.round(b.getBoundingClientRect().height) };
    })()`);
    console.log(`  ${larg}px -> ${JSON.stringify(d)}  ${larg >= 960 ? "(deveria estar escondida)" : "(deveria aparecer)"}`);
    ws.close();
  }
  process.exit(0);
})();
