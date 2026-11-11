# How the live site is deployed (Railway, project "Algebra Quest")

Railway functions are small single-file Bun servers with a size limit. Because of that limit, the page is stored brotli-compressed and base64-encoded in `//#` comment lines, split across several services. Each server checks a SHA-256 prefix (`EXPECT`) before serving its data.

| Service | Role | File here |
|---|---|---|
| algebra-quest | Main site. Holds piece 1 of the core page and fetches pieces 2-5. It then injects the KS3 add-on and the `PATCH_JS` / `PATCH_CSS` variables before `boot();`. | `main.tsx` |
| aq-part2 … aq-part5 | Pieces 2-5 of the core page | `part.tsx` |
| aq-part6 … aq-part9 | KS3 add-on (Physics, Chemistry, Biology, Spanish) as JSON `{css, js}` | `part.tsx` |
| aq-patch | Latest updates as JSON `{js, css}`: hats, trails, drag, Vault Game, gifts, friends, admin coin and look tools, side-by-side subjects | `patch.tsx` |
| aq-api | API server | `../api/api.ts` |

`PATCH_JS` on the main service currently holds only a small loader. The loader fetches the patch from aq-patch and runs it. `PATCH_CSS` is blank.

The data lines were removed from the files in this folder. The exact decoded contents of every layer are in `../reference/live-2026-11-06/`.

`python3 build.py` makes the whole site as one page, which already includes the add-on and the patch. A future deploy can therefore ship the minified `dist/index.html` as fresh pieces and retire the add-on and patch layers.
