# Mindoza Games

Mindoza Games is a browser game portal for Grade 7 school subjects. Students sign in, pick a subject and play through levels while earning coins, stars, hats and trails.

| Subject | Game |
|---|---|
| Maths | Algebra Quest (10 worlds) |
| ICT | Excel Lab (9 levels) |
| Science | Cell Lab (3 levels) |
| Physics (KS3) | Volt Voyage (10 levels) |
| Chemistry (KS3) | Atom Forge (10 levels) |
| Biology (KS3) | Bio Odyssey (10 levels) |
| Spanish (KS3) | ¡Vamos! (10 levels) |

Extras across all games:
- **Rewards:** super questions, Mystery Doors, the Vault Game, and a shop for characters, hats and trails.
- **Social:** a friends list and a leaderboard.
- **Admin dashboard:** includes giving or taking coins and changing a player's look.

Live site: https://algebra-quest-production.up.railway.app

## Layout

```
src/page.html      page skeleton (head, fonts, body)
src/styles.css     all styles
src/js/*.js        game code, joined in the order listed in build.py
build.py           joins everything into one HTML page in dist/
api/api.ts         the API server (Bun + Postgres): accounts, saves, leaderboard, admin, gifts, friends
deploy/            the Railway server files as deployed (data lines removed), see deploy/README.md
tests/             browser tests (Playwright) for the newest features
reference/         exact copy of the live front-end layers as deployed on 6 Nov 2026
drafts/            unfinished ideas that are NOT on the live site (Coin Rush, KS3 mini-game pack)
docs/              the original Algebra Quest design brief
```

## Build

```
python3 build.py                                   # dist/index.html, uses the live API
python3 build.py http://127.0.0.1:3999 test.html   # dist/test.html, uses a local API
```

The output is one self-contained HTML file.

## Run the API locally

The API needs Bun and a Postgres database. The admin login comes from environment variables and is never stored in the code.

```
DATABASE_URL=postgres://... ADMIN_USER=... ADMIN_PASS=... PORT=3999 bun api/api.ts
```

## Tests

Start a local API on port 3999 with a local admin account first, then run:

```
python3 build.py http://127.0.0.1:3999 test.html
ADMIN_USER=... ADMIN_PASS=... node tests/features.test.js
ADMIN_USER=... ADMIN_PASS=... node tests/admin-tools.test.js
```

Both tests need `playwright` installed.

## About this source

This repository was rebuilt on 11 Nov 2026 from the code running on the live site.

- Code that matched the earlier saved source files keeps its original formatting and comments.
- Code that changed after those copies were saved was recovered from the live build. It is marked `/* restored from the live build */`. It works the same, but its local variable names are short (`e`, `t`, `a`) and its comments were lost.

The rebuilt page was checked against the live code block by block, and screen by screen in a browser.
