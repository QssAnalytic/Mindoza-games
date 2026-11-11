// Mindoza Games data piece N: brotli+base64 lines stored as "//#" comments, served as plain text.
const EXPECT = "<sha256 first 16 hex of this piece>";
const src = await Bun.file(import.meta.path).text();
const b64 = src.split("\n").filter((l) => l.startsWith("//#")).map((l) => l.slice(3).trim()).join("");
const got = new Bun.CryptoHasher("sha256").update(b64).digest("hex").slice(0, 16);
console.log("piece N chars", b64.length, "sha", got, got === EXPECT ? "MATCH" : "MISMATCH");
Bun.serve({
  port: Number(Bun.env.PORT ?? 3000),
  fetch() {
    return new Response(b64, { headers: { "content-type": "text/plain", "access-control-allow-origin": "*" } });
  },
});
