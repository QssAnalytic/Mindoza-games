// Mindoza Games server. The core page is brotli+base64: piece 1 is in the "//#" comment lines below and
// pieces 2-5 are served by the aq-part functions. The KS3 add-on (Physics, Chemistry, Biology, Spanish)
// is a separate brotli+base64 JSON {css, js} served by aq-part6 onwards and injected into the core page.
// Small fixes ride on top via the PATCH_JS / PATCH_CSS variables, injected after the add-on.
import { brotliDecompressSync } from "node:zlib";
const EXPECT = "6d8a94bafad24eb4";
const PIECES = ["https://aq-part2-production.up.railway.app/", "https://aq-part3-production.up.railway.app/", "https://aq-part4-production.up.railway.app/", "https://aq-part5-production.up.railway.app/"];
const ADDON = ["https://aq-part6-production.up.railway.app/", "https://aq-part7-production.up.railway.app/", "https://aq-part8-production.up.railway.app/", "https://aq-part9-production.up.railway.app/"];
const src = await Bun.file(import.meta.path).text();
const own = src.split("\n").filter((l) => l.startsWith("//#")).map((l) => l.slice(3).trim()).join("");
const sha = (s: string) => new Bun.CryptoHasher("sha256").update(s).digest("hex").slice(0, 16);
console.log("piece 1 chars", own.length, "sha", sha(own), sha(own) === "658968df08903ecc" ? "MATCH" : "MISMATCH");
const FAIL = "<!doctype html><meta charset=utf-8><title>Mindoza Games</title><p style='font:20px sans-serif;padding:24px'>Mindoza Games is waking up. Please refresh in a few seconds.</p>";
const get = (urls: string[]) => Promise.all(urls.map(async (u) => { const r = await fetch(u); if (!r.ok) throw new Error(u + " " + r.status); return (await r.text()).trim(); }));
let core: string | null = null, page: string | null = null, addonAt = 0, addonSha = "";
async function loadCore() {
  if (core) return core;
  try {
    const b64 = own + (await get(PIECES)).join("");
    const got = sha(b64);
    console.log("full chars", b64.length, "sha", got, got === EXPECT ? "MATCH" : "MISMATCH");
    if (got !== EXPECT) return null;
    core = new TextDecoder().decode(brotliDecompressSync(Buffer.from(b64, "base64")));
  } catch (e) { console.log("load error", String(e)); }
  return core;
}
async function loadPage() {
  const c = await loadCore();
  if (!c) return null;
  if (page && Date.now() - addonAt < 10 * 60e3) return page;
  try {
    const b64 = (await get(ADDON)).join("");
    const s = sha(b64);
    const p = JSON.parse(new TextDecoder().decode(brotliDecompressSync(Buffer.from(b64, "base64"))));
    if (typeof p.js !== "string" || typeof p.css !== "string") throw new Error("bad add-on");
    const pj = Bun.env.PATCH_JS ?? "", pc = Bun.env.PATCH_CSS ?? "";
    const out = c.replace("</head>", () => "<style>" + p.css + pc + "</style></head>").replace(/boot\(\);<\/script>(?![\s\S]*<\/script>)/, () => "0;\n" + p.js + "\n" + pj + "\nboot();</script>");
    if (out === c) throw new Error("add-on could not be injected");
    if (s !== addonSha) console.log("addon chars", b64.length, "sha", s, "injected, patch js", pj.length, "css", pc.length);
    page = out; addonSha = s; addonAt = Date.now();
  } catch (e) { console.log("addon error", String(e)); addonAt = Date.now() - 9 * 60e3; if (!page) return c; }
  return page;
}
loadPage();
Bun.serve({
  port: Number(Bun.env.PORT ?? 3000),
  async fetch() {
    const h = await loadPage();
    return new Response(h ?? FAIL, { status: h ? 200 : 503, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-cache" } });
  },
});
console.log("Mindoza Games is running");
