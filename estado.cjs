const WebSocket = require("ws");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const B = "https://institucional-plan10.vercel.app";
(async () => {
  const r = await fetch("http://127.0.0.1:9333/json/new?about:blank", { method: "PUT" });
  const ws = new WebSocket((await r.json()).webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((x) => ws.once("open", x));
  let id = 0; const pend = new Map();
  ws.on("message", (m) => { const d = JSON.parse(m); if (d.id && pend.has(d.id)) pend.get(d.id)(d), pend.delete(d.id); });
  const cmd = (me, p = {}) => new Promise((res) => (pend.set(++id, res), ws.send(JSON.stringify({ id, method: me, params: p }))));
  await cmd("Page.enable"); await cmd("Runtime.enable");
  await cmd("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  const ler = async (e) => (await cmd("Runtime.evaluate", { expression: e, returnByValue: true, awaitPromise: true })).result.result?.value;
  const estado = () => ler(`(() => {
    const u = new URL(location.href);
    const [c, n] = (u.searchParams.get("abrir") || "").split("/");
    const cat = c && document.getElementById("sanfona-" + c);
    const nuc = n && document.getElementById("sanfona-" + c + "-" + n);
    const p = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    const b = p && p.getBoundingClientRect();
    return {
      url: u.pathname + u.search + u.hash,
      cat: cat ? cat.open : null, cam: nuc ? nuc.open : null,
      naTela: b ? (b.top > -8 && b.top < innerHeight - 40) : null,
      abertas: document.querySelectorAll("details[open]").length,
      favoritos: document.querySelector(".p10-hd-fav-n")?.textContent,
    };
  })()`);

  const url = `${B}/solucoes/protecao?abrir=veiculos-e-frotas%2Fautomoveis#seguro-automovel`;
  await cmd("Page.navigate", { url }); await sleep(7000);
  console.log("1. link profundo           ", JSON.stringify(await estado()));

  // favorita, para ver se o estado atravessa o vai e volta
  await ler(`document.querySelector("#sanfona-veiculos-e-frotas-automoveis .p10-fav").click(); true`);
  await sleep(800);

  // vai para a página do caminho pelo "Ver detalhes"
  await ler(`[...document.querySelectorAll("#seguro-automovel a")].find(a=>a.textContent.includes("Ver detalhes"))?.click(); true`);
  await sleep(6000);
  console.log("2. foi para Ver detalhes   ", JSON.stringify(await estado()));

  // volta do navegador
  await cmd("Runtime.evaluate", { expression: "history.back()" });
  await sleep(6500);
  console.log("3. voltar do navegador     ", JSON.stringify(await estado()));

  // recarrega
  await cmd("Page.reload", { ignoreCache: false });
  await sleep(7000);
  console.log("4. recarregar              ", JSON.stringify(await estado()));

  // avança de novo
  await cmd("Runtime.evaluate", { expression: "history.forward()" });
  await sleep(6000);
  console.log("5. avançar do navegador    ", JSON.stringify(await estado()));

  ws.close(); process.exit(0);
})();
