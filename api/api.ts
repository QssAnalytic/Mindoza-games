// Mindoza Games API: player accounts, cloud saves, gameplay events, leaderboard and super-admin analytics.
import { SQL } from "bun";

const db = new SQL(Bun.env.DATABASE_URL!);
const ADMIN_USER = (Bun.env.ADMIN_USER || "").toLowerCase();
const ADMIN_PASS = Bun.env.ADMIN_PASS || "";
const STAGES: Record<string, number> = { algebra: 10, ict: 9, sci: 3, phy: 10, chem: 10, bio: 10, spa: 10 };
const GAMES = Object.keys(STAGES);

await db`CREATE TABLE IF NOT EXISTS players (
  id SERIAL PRIMARY KEY, username TEXT UNIQUE NOT NULL, name TEXT NOT NULL, pass TEXT NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE, created_at TIMESTAMPTZ NOT NULL DEFAULT now(), last_seen TIMESTAMPTZ NOT NULL DEFAULT now(),
  save TEXT, xp INT NOT NULL DEFAULT 0, level INT NOT NULL DEFAULT 1, coins INT NOT NULL DEFAULT 0, crystals INT NOT NULL DEFAULT 0,
  stars INT NOT NULL DEFAULT 0, answered INT NOT NULL DEFAULT 0, correct INT NOT NULL DEFAULT 0, best_streak INT NOT NULL DEFAULT 0,
  world INT NOT NULL DEFAULT 1, score INT NOT NULL DEFAULT 0, mastery TEXT)`;
await db`CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, player_id INT NOT NULL REFERENCES players(id) ON DELETE CASCADE, created_at TIMESTAMPTZ NOT NULL DEFAULT now())`;
await db`CREATE TABLE IF NOT EXISTS events (
  id BIGSERIAL PRIMARY KEY, player_id INT NOT NULL REFERENCES players(id) ON DELETE CASCADE, kind TEXT NOT NULL,
  stage INT, tag TEXT, tier INT, ok BOOLEAN, ms INT, review BOOLEAN, hint INT, data TEXT, at TIMESTAMPTZ NOT NULL DEFAULT now())`;
await db`ALTER TABLE events ADD COLUMN IF NOT EXISTS game TEXT NOT NULL DEFAULT 'algebra'`;
await db`ALTER TABLE players ADD COLUMN IF NOT EXISTS ict_levels INT NOT NULL DEFAULT 0`;
await db`ALTER TABLE players ADD COLUMN IF NOT EXISTS ict_stars INT NOT NULL DEFAULT 0`;
await db`ALTER TABLE players ADD COLUMN IF NOT EXISTS ict_now INT NOT NULL DEFAULT 1`;
await db`ALTER TABLE players ADD COLUMN IF NOT EXISTS ict_mastery TEXT`;
await db`ALTER TABLE players ADD COLUMN IF NOT EXISTS pic TEXT`;
await db`ALTER TABLE players ADD COLUMN IF NOT EXISTS fruit INT NOT NULL DEFAULT 0`;
await db`ALTER TABLE players ADD COLUMN IF NOT EXISTS nick TEXT`;
await db`ALTER TABLE players ADD COLUMN IF NOT EXISTS sci_levels INT NOT NULL DEFAULT 0`;
await db`ALTER TABLE players ADD COLUMN IF NOT EXISTS sci_stars INT NOT NULL DEFAULT 0`;
await db`ALTER TABLE players ADD COLUMN IF NOT EXISTS sci_now INT NOT NULL DEFAULT 1`;
await db`ALTER TABLE players ADD COLUMN IF NOT EXISTS sci_mastery TEXT`;
await db`CREATE TABLE IF NOT EXISTS gifts (id SERIAL PRIMARY KEY, player_id INT NOT NULL REFERENCES players(id) ON DELETE CASCADE, amount INT NOT NULL, note TEXT, claimed BOOLEAN NOT NULL DEFAULT FALSE, created_at TIMESTAMPTZ NOT NULL DEFAULT now())`;
await db`CREATE TABLE IF NOT EXISTS friends (a INT NOT NULL REFERENCES players(id) ON DELETE CASCADE, b INT NOT NULL REFERENCES players(id) ON DELETE CASCADE, status TEXT NOT NULL DEFAULT 'pending', created_at TIMESTAMPTZ NOT NULL DEFAULT now(), PRIMARY KEY (a, b))`;
await db`ALTER TABLE gifts ADD COLUMN IF NOT EXISTS look TEXT`;
await db`CREATE INDEX IF NOT EXISTS events_at ON events(at)`;
await db`CREATE INDEX IF NOT EXISTS events_stage ON events(stage, kind)`;
await db`CREATE INDEX IF NOT EXISTS events_player ON events(player_id)`;

if (ADMIN_USER && ADMIN_PASS) {
  const hash = await Bun.password.hash(ADMIN_PASS);
  await db`INSERT INTO players (username, name, pass, is_admin) VALUES (${ADMIN_USER}, 'Super Admin', ${hash}, TRUE)
    ON CONFLICT (username) DO UPDATE SET pass = ${hash}, is_admin = TRUE`;
  console.log("super admin ready:", ADMIN_USER);
}

const CORS = { "access-control-allow-origin": "*", "access-control-allow-headers": "content-type, authorization", "access-control-allow-methods": "GET, POST, PUT, OPTIONS" };
const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json", ...CORS } });
const fail = (msg: string, status = 400) => json({ error: msg }, status);
const clean = (s: unknown, max: number) => String(s ?? "").trim().slice(0, max);
const int = (v: unknown, lo = 0, hi = 1e9) => { const n = Math.round(Number(v)); return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : 0; };
const parse = (t: any) => { if (t == null) return null; if (typeof t !== "string") return t; try { return JSON.parse(t); } catch { return null; } };
const note = async (id: number, kind: string) => { await db`INSERT INTO events (player_id, game, kind) VALUES (${id}, 'site', ${kind})`; };
const PIC = /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/;
const publicUser = (p: any) => ({ id: p.id, username: p.username, name: p.name, admin: p.is_admin });

async function newSession(id: number) {
  const token = crypto.randomUUID() + crypto.randomUUID().replace(/-/g, "");
  await db`INSERT INTO sessions (token, player_id) VALUES (${token}, ${id})`;
  return token;
}
async function auth(req: Request) {
  const t = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!t) return null;
  const [p] = await db`SELECT p.* FROM sessions s JOIN players p ON p.id = s.player_id WHERE s.token = ${t}`;
  if (p) await db`UPDATE players SET last_seen = now() WHERE id = ${p.id}`;
  return p || null;
}
const fails = new Map<string, { n: number; t: number }>();
function tooMany(key: string) { const f = fails.get(key); return !!f && f.n >= 8 && Date.now() - f.t < 10 * 60e3; }
function noteFail(key: string) { const f = fails.get(key); const now = Date.now(); fails.set(key, f && now - f.t < 10 * 60e3 ? { n: f.n + 1, t: now } : { n: 1, t: now }); }

async function players() {
  return db`SELECT id, username, name, created_at, last_seen, xp, level, coins, crystals, stars, answered, correct, best_streak, world, score, mastery, ict_levels, ict_stars, ict_now, ict_mastery, pic, fruit, nick, sci_levels, sci_stars, sci_now, sci_mastery,
    RANK() OVER (ORDER BY score DESC) AS rank FROM players WHERE NOT is_admin ORDER BY score DESC, id`;
}
async function stageStats(playerId: number | null, game: string) {
  const N = STAGES[game] || 10;
  const rows = await db`SELECT stage,
      COUNT(*) FILTER (WHERE kind = 'answer') AS answers,
      COUNT(*) FILTER (WHERE kind = 'answer' AND ok) AS right,
      AVG(ms) FILTER (WHERE kind = 'answer' AND ok IS NOT NULL) AS avg_ms,
      COUNT(*) FILTER (WHERE kind = 'answer' AND hint > 0) AS hinted,
      COUNT(DISTINCT player_id) FILTER (WHERE kind = 'start') AS started,
      COUNT(DISTINCT player_id) FILTER (WHERE kind = 'clear') AS cleared,
      COUNT(*) FILTER (WHERE kind = 'training') AS training,
      COUNT(*) FILTER (WHERE kind = 'start') AS sessions,
      AVG(ms) FILTER (WHERE kind = 'clear' AND ms > 0) AS avg_clear,
      MIN(ms) FILTER (WHERE kind = 'clear' AND ms > 0) AS best_clear,
      COUNT(*) FILTER (WHERE kind = 'super') AS super_tried,
      COUNT(*) FILTER (WHERE kind = 'super' AND ok) AS super_ok
    FROM events WHERE game = ${game} AND stage IS NOT NULL AND stage < ${N} AND (${playerId}::int IS NULL OR player_id = ${playerId}) GROUP BY stage`;
  const tags = await db`SELECT stage, tag, COUNT(*) AS n, COUNT(*) FILTER (WHERE ok) AS right FROM events
    WHERE game = ${game} AND kind = 'answer' AND NOT review AND tag IS NOT NULL AND (${playerId}::int IS NULL OR player_id = ${playerId}) GROUP BY stage, tag`;
  const stuck = playerId || !["algebra", "ict", "sci"].includes(game) ? [] : game === "ict" ? await db`SELECT ict_now AS world, COUNT(*) AS n FROM players WHERE NOT is_admin AND answered > 0 GROUP BY ict_now` : game === "sci" ? await db`SELECT sci_now AS world, COUNT(*) AS n FROM players WHERE NOT is_admin AND answered > 0 GROUP BY sci_now` : await db`SELECT world, COUNT(*) AS n FROM players WHERE NOT is_admin GROUP BY world`;
  return Array.from({ length: N }, (_, s) => {
    const r: any = rows.find((x: any) => x.stage === s) || {};
    const t = tags.filter((x: any) => x.stage === s).map((x: any) => ({ tag: x.tag, n: Number(x.n), acc: Number(x.n) ? Number(x.right) / Number(x.n) : 0 }));
    t.sort((a, b) => a.acc - b.acc || b.n - a.n);
    const answers = Number(r.answers || 0);
    return { stage: s, answers, accuracy: answers ? Number(r.right) / answers : null, avgSeconds: r.avg_ms ? Number(r.avg_ms) / 1000 : null,
      hintRate: answers ? Number(r.hinted) / answers : null, started: Number(r.started || 0), cleared: Number(r.cleared || 0),
      sessions: Number(r.sessions || 0), training: Number(r.training || 0),
      avgClearMs: r.avg_clear ? Number(r.avg_clear) : null, bestClearMs: r.best_clear ? Number(r.best_clear) : null, superTried: Number(r.super_tried || 0), superOk: Number(r.super_ok || 0),
      stuckHere: Number((stuck as any[]).find((x: any) => x.world === s + 1)?.n || 0), skills: t };
  });
}

Bun.serve({
  port: Number(Bun.env.PORT ?? 3000),
  async fetch(req) {
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
    const url = new URL(req.url), path = url.pathname, ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "?";
    try {
      if (path === "/" || path === "/health") return json({ ok: true, service: "algebra-quest-api" });

      if (path === "/api/signup" && req.method === "POST") {
        const b: any = await req.json().catch(() => ({}));
        const username = clean(b.username, 24).toLowerCase(), name = clean(b.name, 40), pass = String(b.password || "");
        if (!/^[a-z0-9_.]{3,24}$/.test(username)) return fail("Usernames need 3 to 24 letters, numbers, dots or underscores.");
        if (name.length < 2) return fail("Please type your name (at least 2 letters).");
        if (pass.length < 6) return fail("Passwords need at least 6 characters.");
        if (username === ADMIN_USER) return fail("That username is taken. Try another one.");
        const [exists] = await db`SELECT id FROM players WHERE username = ${username}`;
        if (exists) return fail("That username is taken. Try another one.");
        const [p] = await db`INSERT INTO players (username, name, pass) VALUES (${username}, ${name}, ${await Bun.password.hash(pass)}) RETURNING *`;
        await note(p.id, "signup");
        return json({ token: await newSession(p.id), user: publicUser(p), save: null });
      }
      if (path === "/api/login" && req.method === "POST") {
        const b: any = await req.json().catch(() => ({}));
        const username = clean(b.username, 24).toLowerCase(), key = ip + "|" + username;
        if (tooMany(key)) return fail("Too many wrong tries. Wait 10 minutes and try again.", 429);
        const [p] = await db`SELECT * FROM players WHERE username = ${username}`;
        if (!p || !(await Bun.password.verify(String(b.password || ""), p.pass))) { noteFail(key); return fail("Wrong username or password.", 401); }
        fails.delete(key);
        await db`UPDATE players SET last_seen = now() WHERE id = ${p.id}`;
        if (!p.is_admin) await note(p.id, "login");
        return json({ token: await newSession(p.id), user: publicUser(p), save: parse(p.save) });
      }

      const me = await auth(req);
      if (path.startsWith("/api/") && !me) return fail("Please sign in again.", 401);

      if (path === "/api/me") return json({ user: publicUser(me), save: parse(me.save) });
      if (path === "/api/logout" && req.method === "POST") {
        if (!me.is_admin) await note(me.id, "logout");
        await db`DELETE FROM sessions WHERE token = ${(req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "")}`;
        return json({ ok: true });
      }
      if (path === "/api/save" && req.method === "PUT") {
        const b: any = await req.json().catch(() => ({}));
        const s = b.summary || {};
        if (!b.save || typeof b.save !== "object") return fail("Nothing to save.");
        const save = JSON.stringify(b.save);
        if (save.length > 200000) return fail("Save is too large.");
        const xp = int(s.xp), stars = int(s.stars, 0, 30), crystals = int(s.crystals, 0, 10), boss = int(s.boss, 0, 100);
        const nk = typeof b.save.nick === "string" ? b.save.nick.replace(/\s+/g, " ").trim().slice(0, 16) : "";
        const nick = nk && /^[\p{L}\p{N}][\p{L}\p{N} _.\-]{1,15}$/u.test(nk) ? nk : null;
        const pic = typeof b.save.pic === "string" && b.save.pic.length < 60000 && PIC.test(b.save.pic) ? b.save.pic : null;
        const il = int(s.ictLevels, 0, 9), is = int(s.ictStars, 0, 27), sl = int(s.sciLevels, 0, 3), ss = int(s.sciStars, 0, 9);
        const kl = int(s.k3Levels, 0, 40), ks = int(s.k3Stars, 0, 120);
        const score = xp + 50 * (stars + is + ss + ks) + 200 * (crystals + il + sl + kl) + 10 * boss;
        await db`UPDATE players SET save = ${save}, xp = ${xp}, level = ${int(s.level, 1, 9999)}, coins = ${int(s.coins)}, crystals = ${crystals},
          stars = ${stars}, answered = ${int(s.answered)}, correct = ${int(s.correct)}, best_streak = ${int(s.bestStreak)}, world = ${int(s.world, 1, 11)},
          score = ${score}, mastery = ${JSON.stringify(Array.isArray(s.mastery) ? s.mastery.slice(0, 10).map((m: any) => int(m, 0, 100)) : [])}, ict_levels = ${il}, ict_stars = ${is}, ict_now = ${int(s.ictNow, 1, 10)},
          ict_mastery = ${JSON.stringify(Array.isArray(s.ictMastery) ? s.ictMastery.slice(0, 9).map((m: any) => int(m, 0, 100)) : [])}, pic = ${pic}, fruit = ${int(s.fruit, 0, 6)}, nick = ${nick}, sci_levels = ${sl}, sci_stars = ${ss}, sci_now = ${int(s.sciNow, 1, 4)},
          sci_mastery = ${JSON.stringify(Array.isArray(s.sciMastery) ? s.sciMastery.slice(0, 3).map((m: any) => int(m, 0, 100)) : [])}, last_seen = now()
          WHERE id = ${me.id}`;
        return json({ ok: true, score });
      }
      if (path === "/api/events" && req.method === "POST") {
        const b: any = await req.json().catch(() => ({}));
        const list = Array.isArray(b.events) ? b.events.slice(0, 200) : [];
        if (me.is_admin) return json({ ok: true, stored: 0 });
        for (const e of list) {
          const kind = clean(e.kind, 16);
          if (!["answer", "start", "clear", "training", "rush", "super", "buy", "profile", "door", "vault"].includes(kind)) continue;
          const game = GAMES.includes(e.game) ? e.game : "algebra";
          await db`INSERT INTO events (player_id, game, kind, stage, tag, tier, ok, ms, review, hint, data) VALUES (${me.id}, ${game}, ${kind},
            ${e.stage == null ? null : int(e.stage, 0, 20)}, ${e.tag ? clean(e.tag, 32) : null}, ${e.tier == null ? null : int(e.tier, 0, 9)},
            ${typeof e.ok === "boolean" ? e.ok : null}, ${e.ms == null ? null : int(e.ms, 0, 3600e3)}, ${!!e.review}, ${int(e.hint, 0, 3)},
            ${JSON.stringify(e.data ?? null)})`;
        }
        return json({ ok: true, stored: list.length });
      }
      if (path === "/api/leaderboard") {
        const all = await players();
        const mine = all.find((p: any) => p.id === me.id);
        return json({ top: all.slice(0, 10).map((p: any) => ({ rank: Number(p.rank), name: p.nick || p.name, level: p.level, score: p.score, crystals: p.crystals, you: p.id === me.id })),
          you: mine ? { rank: Number(mine.rank), score: mine.score, of: all.length } : null });
      }

      if (path === "/api/gifts") {
        const rows = await db`SELECT id, amount, note, look FROM gifts WHERE player_id = ${me.id} AND NOT claimed ORDER BY id`;
        return json({ gifts: rows.map((r: any) => ({ id: r.id, amount: Number(r.amount), note: r.note || "", look: parse(r.look) })) });
      }
      if (path === "/api/gifts/claim" && req.method === "POST") {
        const b: any = await req.json().catch(() => ({}));
        const ids = (Array.isArray(b.ids) ? b.ids : []).map((x: any) => int(x)).filter((x: number) => x > 0).slice(0, 50);
        let total = 0;
        for (const id of ids) { const [g] = await db`UPDATE gifts SET claimed = TRUE WHERE id = ${id} AND player_id = ${me.id} AND NOT claimed RETURNING amount`; if (g) total += Number(g.amount); }
        return json({ ok: true, total });
      }
      const card = (p: any) => ({ id: p.id, username: p.username, name: p.nick || p.name, level: p.level, score: p.score, stars: p.stars, crystals: p.crystals, fruit: p.fruit, pic: p.pic, online: Date.now() - new Date(p.last_seen).getTime() < 5 * 60e3, last_seen: p.last_seen });
      if (path === "/api/friends") {
        const rows = await db`SELECT f.a, f.b, f.status, p.id, p.username, p.name, p.nick, p.level, p.score, p.stars, p.crystals, p.fruit, p.pic, p.last_seen FROM friends f
          JOIN players p ON p.id = CASE WHEN f.a = ${me.id} THEN f.b ELSE f.a END WHERE (f.a = ${me.id} OR f.b = ${me.id}) AND NOT p.is_admin ORDER BY p.score DESC`;
        return json({ friends: rows.filter((r: any) => r.status === "accepted").map(card), incoming: rows.filter((r: any) => r.status === "pending" && r.b === me.id).map(card), outgoing: rows.filter((r: any) => r.status === "pending" && r.a === me.id).map(card) });
      }
      if (path === "/api/players/search") {
        const q = clean(url.searchParams.get("q"), 24).toLowerCase().replace(/^@/, "");
        if (q.length < 2) return json({ players: [] });
        const like = q.replace(/[%_\\]/g, "") + "%";
        const rows = await db`SELECT id, username, name, nick, level, score, stars, crystals, fruit, pic, last_seen FROM players WHERE NOT is_admin AND id <> ${me.id} AND (username LIKE ${like} OR lower(coalesce(nick, '')) LIKE ${like}) ORDER BY score DESC LIMIT 8`;
        return json({ players: rows.map(card) });
      }
      if (path === "/api/friends/request" && req.method === "POST") {
        if (me.is_admin) return fail("The admin account cannot add friends.");
        const b: any = await req.json().catch(() => ({}));
        const [t] = await db`SELECT id, is_admin FROM players WHERE id = ${int(b.id)}`;
        if (!t || t.is_admin || t.id === me.id) return fail("Player not found.", 404);
        const [n] = await db`SELECT COUNT(*) AS n FROM friends WHERE a = ${me.id} AND status = 'pending'`;
        if (Number(n.n) >= 30) return fail("You have lots of requests waiting. Wait for some answers first.");
        const [back] = await db`SELECT status FROM friends WHERE a = ${t.id} AND b = ${me.id}`;
        if (back) { await db`UPDATE friends SET status = 'accepted' WHERE a = ${t.id} AND b = ${me.id}`; return json({ ok: true, status: "accepted" }); }
        await db`INSERT INTO friends (a, b) VALUES (${me.id}, ${t.id}) ON CONFLICT DO NOTHING`;
        return json({ ok: true, status: "pending" });
      }
      if (path === "/api/friends/respond" && req.method === "POST") {
        const b: any = await req.json().catch(() => ({}));
        const id = int(b.id);
        if (b.accept) await db`UPDATE friends SET status = 'accepted' WHERE a = ${id} AND b = ${me.id}`;
        else await db`DELETE FROM friends WHERE a = ${id} AND b = ${me.id} AND status = 'pending'`;
        return json({ ok: true });
      }
      if (path === "/api/friends/remove" && req.method === "POST") {
        const b: any = await req.json().catch(() => ({}));
        const id = int(b.id);
        await db`DELETE FROM friends WHERE (a = ${me.id} AND b = ${id}) OR (a = ${id} AND b = ${me.id})`;
        return json({ ok: true });
      }

      if (path.startsWith("/api/admin/")) {
        if (!me.is_admin) return fail("Only the super admin can see this.", 403);
        if (path === "/api/admin/overview") {
          const [o] = await db`SELECT COUNT(*) AS players, COUNT(*) FILTER (WHERE last_seen > now() - interval '1 day') AS active_day,
            COUNT(*) FILTER (WHERE last_seen > now() - interval '7 days') AS active_week, COALESCE(SUM(answered),0) AS answered,
            COALESCE(SUM(correct),0) AS correct, COALESCE(SUM(crystals),0) AS crystals,
            COUNT(*) FILTER (WHERE created_at > now() - interval '7 days') AS new_week FROM players WHERE NOT is_admin`;
          const [sq] = await db`SELECT COUNT(*) AS tried, COUNT(*) FILTER (WHERE ok) AS ok FROM events WHERE kind = 'super'`;
          return json({ players: Number(o.players), activeDay: Number(o.active_day), activeWeek: Number(o.active_week), answered: Number(o.answered),
            accuracy: Number(o.answered) ? Number(o.correct) / Number(o.answered) : null, crystals: Number(o.crystals), newWeek: Number(o.new_week), superTried: Number(sq.tried), superOk: Number(sq.ok) });
        }
        if (path === "/api/admin/activity") {
          const rows = await db`SELECT e.id, e.game, e.kind, e.stage, e.ok, e.ms, e.data, e.at, p.id AS pid, p.name, p.nick, p.username, p.pic, p.fruit
            FROM events e JOIN players p ON p.id = e.player_id WHERE e.kind <> 'answer' AND NOT p.is_admin ORDER BY e.at DESC LIMIT 120`;
          return json({ events: rows.map((r: any) => ({ ...r, data: parse(r.data) })) });
        }
        if (path === "/api/admin/daily") {
          const rows = await db`SELECT to_char(d, 'YYYY-MM-DD') AS day,
              (SELECT COUNT(*) FROM players WHERE NOT is_admin AND created_at >= d AND created_at < d + interval '1 day') AS signups,
              (SELECT COUNT(DISTINCT player_id) FROM events WHERE at >= d AND at < d + interval '1 day') AS active,
              (SELECT COUNT(*) FROM events WHERE kind = 'answer' AND at >= d AND at < d + interval '1 day') AS answers
            FROM generate_series(date_trunc('day', now()) - interval '13 days', date_trunc('day', now()), interval '1 day') AS d ORDER BY d`;
          return json({ days: rows.map((r: any) => ({ day: r.day, signups: Number(r.signups), active: Number(r.active), answers: Number(r.answers) })) });
        }
        if (path === "/api/admin/gift" && req.method === "POST") {
          const b: any = await req.json().catch(() => ({}));
          const amount = int(b.amount, -5000, 5000);
          if (amount === 0) return fail("Choose how many coins to give or take (1 to 5000).");
          const [p] = await db`SELECT id FROM players WHERE id = ${int(b.id)} AND NOT is_admin`;
          if (!p) return fail("Player not found.", 404);
          await db`INSERT INTO gifts (player_id, amount, note) VALUES (${p.id}, ${amount}, ${clean(b.note, 80) || null})`;
          await db`INSERT INTO events (player_id, game, kind, data) VALUES (${p.id}, 'site', ${amount > 0 ? "gift" : "take"}, ${JSON.stringify({ amount })})`;
          return json({ ok: true });
        }
        if (path === "/api/admin/look" && req.method === "POST") {
          const b: any = await req.json().catch(() => ({}));
          const [p] = await db`SELECT id FROM players WHERE id = ${int(b.id)} AND NOT is_admin`;
          if (!p) return fail("Player not found.", 404);
          const look = { skin: int(b.skin, 0, 50), hat: int(b.hat, 0, 50), trail: int(b.trail, 0, 50) };
          await db`INSERT INTO gifts (player_id, amount, note, look) VALUES (${p.id}, 0, ${clean(b.note, 80) || null}, ${JSON.stringify(look)})`;
          await db`INSERT INTO events (player_id, game, kind, data) VALUES (${p.id}, 'site', 'look', ${JSON.stringify(look)})`;
          return json({ ok: true });
        }
        if (path === "/api/admin/players") return json({ players: (await players()).map((p: any) => ({ ...p, rank: Number(p.rank), mastery: parse(p.mastery) || [], ict_mastery: parse(p.ict_mastery) || [], sci_mastery: parse(p.sci_mastery) || [] })) });
        if (path === "/api/admin/stages") { const g = url.searchParams.get("game") || "algebra"; return json({ game: g, stages: await stageStats(null, GAMES.includes(g) ? g : "algebra") }); }
        const m = path.match(/^\/api\/admin\/player\/(\d+)$/);
        if (m) {
          const id = Number(m[1]);
          const [p] = await db`SELECT id, username, name, created_at, last_seen, xp, level, coins, crystals, stars, answered, correct, best_streak, world, score, mastery, ict_levels, ict_stars, ict_now, ict_mastery, pic, fruit, sci_levels, sci_stars, sci_now, sci_mastery, save FROM players WHERE id = ${id}`;
          if (!p) return fail("Player not found.", 404);
          const recent = await db`SELECT game, kind, stage, tag, tier, ok, ms, review, hint, data, at FROM events WHERE player_id = ${id} ORDER BY at DESC LIMIT 40`;
          return json({ player: { ...p, save: parse(p.save), mastery: parse(p.mastery) || [], ict_mastery: parse(p.ict_mastery) || [], sci_mastery: parse(p.sci_mastery) || [] }, stages: { algebra: await stageStats(id, "algebra"), ict: await stageStats(id, "ict"), sci: await stageStats(id, "sci") }, recent: recent.map((r: any) => ({ ...r, data: parse(r.data) })) });
        }
      }
      return fail("Not found.", 404);
    } catch (e) {
      console.log("error", path, String(e));
      return fail("Something went wrong on the server. Please try again.", 500);
    }
  },
});
console.log("Mindoza Games API running");
