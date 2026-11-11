// Mindoza Games patch: small updates on top of the core page and the KS3 add-on (hats, trails, Vault Game, gifts, friends).
// The page loads it at startup; the code is brotli+base64 in the "//#" lines below and is served as JSON {js, css}.
import { brotliDecompressSync } from "node:zlib";
const EXPECT = "<sha256 first 16 hex of the patch>";
const src = await Bun.file(import.meta.path).text();
const b64 = src.split("\n").filter((l) => l.startsWith("//#")).map((l) => l.slice(3).trim()).join("");
const got = new Bun.CryptoHasher("sha256").update(b64).digest("hex").slice(0, 16);
const ok = got === EXPECT;
console.log("patch chars", b64.length, "sha", got, ok ? "MATCH" : "MISMATCH");
const body = ok ? new TextDecoder().decode(brotliDecompressSync(Buffer.from(b64, "base64"))) : JSON.stringify({ js: "", css: "" });
Bun.serve({
  port: Number(Bun.env.PORT ?? 3000),
  fetch() {
    return new Response(body, { headers: { "content-type": "application/json; charset=utf-8", "access-control-allow-origin": "*", "cache-control": "no-cache" } });
  },
});
