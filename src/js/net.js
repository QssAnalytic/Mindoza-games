/* ================= ACCOUNTS, SYNC, ADMIN ================= */
const API='https://aq-api-production.up.railway.app';
const MINDOZA_MARK=(s=34,col='var(--brand)')=>`<svg class="mzmark" width="${s}" height="${s}" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="21.5" fill="none" stroke="${col}" stroke-width="2.6"/><path d="M14.5 32.5 L17.5 15.5 L24 27.5 L30.5 15.5 L33.5 32.5" fill="none" stroke="${col}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const MINDOZA_LOGO=(s=34)=>`<span class="mzlogo">${MINDOZA_MARK(s)}<span class="mzword">Mindoza</span></span>`;
const TOKEN_KEY='mindoza-aq-token';
const tokGet=()=>{try{return localStorage.getItem(TOKEN_KEY)}catch(e){return NET.memTok}};
const tokSet=t=>{NET.memTok=t;try{t?localStorage.setItem(TOKEN_KEY,t):localStorage.removeItem(TOKEN_KEY)}catch(e){}};
/* restored from the live build */
const NET = {
  token: null,
  user: null,
  memTok: null,
  q: [],
  st: null,
  et: null,
  saving: !1,
  async call(e, t = {}) {
    const s = { "content-type": "application/json" };
    let a;
    NET.token && (s.authorization = "Bearer " + NET.token);
    try {
      a = await fetch(API + e, {
        method: t.method || "GET",
        headers: s,
        body: t.body ? JSON.stringify(t.body) : void 0,
        keepalive: !!t.keepalive,
      });
    } catch (e) {
      throw new Error("Can't reach the game server. Check your internet and try again.");
    }
    let n = {};
    try {
      n = await a.json();
    } catch (e) {}
    if (401 === a.status && NET.token && !e.startsWith("/api/login"))
      throw (NET.expired(), new Error(n.error || "Please sign in again."));
    if (!a.ok) throw new Error(n.error || "Something went wrong. Please try again.");
    return n;
  },
  summary() {
    const e = S.stars.reduce((e, t) => e + t, 0),
      t = S.cleared.filter(Boolean).length,
      s = S.cleared.findIndex((e) => !e);
    return {
      xp: S.xp,
      level: level(),
      coins: POW("coins") ? 0 : S.coins,
      crystals: t,
      stars: e,
      answered: S.stats.answered,
      correct: S.stats.correct,
      bestStreak: S.stats.bestStreak,
      world: s < 0 ? 11 : s + 1,
      mastery: WORLDS.map((e, t) => stageMastery(t)),
      boss: (S.boss.r0 || 0) + (S.boss.r1 || 0) + (S.boss.r2 || 0) + (S.boss.f || 0),
      ictLevels: XS().cleared.filter(Boolean).length,
      ictStars: XS().stars.reduce((e, t) => e + t, 0),
      ictNow: XS().cleared.findIndex((e) => !e) + 1 || 10,
      ictMastery: XLV.map((e, t) => xlMastery(t)),
      sciLevels: SCS().cleared.filter(Boolean).length,
      sciStars: SCS().stars.reduce((e, t) => e + t, 0),
      sciNow: SCS().cleared.findIndex((e) => !e) + 1 || 4,
      sciMastery: SCV.map((e, t) => scMastery(t)),
      fruit: S.av.skin,
      superOk: S.stats.superOk || 0,
      superTried: S.stats.superTried || 0,
    };
  },
  queueSave() {
    NET.token && (clearTimeout(NET.st), (NET.st = setTimeout(() => NET.pushSave(), 2500)));
  },
  async pushSave(e) {
    if (NET.token) {
      clearTimeout(NET.st);
      try {
        await NET.call("/api/save", { method: "PUT", body: { save: S, summary: NET.summary() }, keepalive: e });
      } catch (e) {
        NET.st = setTimeout(() => NET.pushSave(), 15e3);
      }
    }
  },
  track(e, t = {}) {
    NET.token &&
      (NET.q.push({ kind: e, ...t }),
      NET.q.length >= 20 ? NET.flush() : NET.et || (NET.et = setTimeout(() => NET.flush(), 8e3)));
  },
  async flush(e) {
    if ((clearTimeout(NET.et), (NET.et = null), !NET.q.length || !NET.token)) return;
    const t = NET.q.splice(0, 200);
    try {
      await NET.call("/api/events", { method: "POST", body: { events: t }, keepalive: e });
    } catch (e) {
      (NET.q.unshift(...t), (NET.et = setTimeout(() => NET.flush(), 2e4)));
    }
  },
  expired() {
    (tokSet(null),
      (NET.token = null),
      (NET.user = null),
      "auth" !== VIEW && (gtoast("Your session ended. Please sign in again."), go("auth")));
  },
  adopt(e) {
    ((NET.token = e.token),
      tokSet(e.token),
      (NET.user = e.user),
      (SAVE_KEY = "algebra-quest-save-v1:" + e.user.username));
    const t = store.get();
    ((S = hydrate(e.save || t)), (S.seenIntro = !0), save(), NET.pushSave());
  },
  async logout() {
    (await NET.flush(), await NET.pushSave());
    try {
      await NET.call("/api/logout", { method: "POST" });
    } catch (e) {}
    (tokSet(null),
      (NET.token = null),
      (NET.user = null),
      (SAVE_KEY = "algebra-quest-save-v1"),
      (MEM = null),
      (S = defSave()),
      closeModal(),
      go("auth"));
  },
  async boot() {
    const e = tokGet();
    if (!e) return go("auth");
    ((NET.token = e),
      ($("#main").innerHTML =
        '<p class="muted" style="padding:40px 0;text-align:center">Loading your account\u2026</p>'));
    try {
      const t = await NET.call("/api/me");
      (NET.adopt({ token: e, user: t.user, save: t.save }), go("home"));
    } catch (e) {
      NET.token && ((NET.token = null), go("auth", e.message));
    }
  },
};
/* restored from the live build */
function hydrate(e) {
  const t = defSave();
  if (!e) return t;
  const s = Object.assign(t, e);
  return (
    (s.settings = Object.assign(defSave().settings, e.settings || {})),
    (s.stats = Object.assign(defSave().stats, e.stats || {})),
    (s.av = Object.assign(defSave().av, e.av || {})),
    (s.powers = Object.assign({}, e.powers || {})),
    e.fruitV || ((s.fruitV = 0), migrateSave(s)),
    s
  );
}
addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'&&NET.token){NET.flush(true);NET.pushSave(true)}});
/* ---- powers (super admin only) ---- */
const POW=k=>!!(NET.user&&NET.user.admin&&S.powers&&S.powers[k]);
const canAfford=n=>POW('coins')||S.coins>=n;
function spend(n){if(POW('coins'))return true;if(S.coins<n)return false;S.coins-=n;return true}
const coinTxt=()=>POW('coins')?'∞':S.coins;
const bossOpen=a=>POW('unlock')||S.cleared[a];
/* restored from the live build */
const POWERS = [
  {
    cat: "Game powers",
    items: [
      { k: "coins", n: "Infinite coins", d: "Your coin balance becomes \u221e. Hints and shop items are free." },
      {
        k: "unlock",
        n: "Open every world and level",
        d: "All Algebra Quest worlds, Boss Rushes, the Grand Finale and every Excel Lab level open without clearing anything.",
      },
      {
        k: "hearts",
        n: "Infinite hearts",
        d: "Wrong answers never cost a heart, so the Training Room never interrupts.",
      },
      {
        k: "reveal",
        n: "Answer reveal",
        d: "Shows the correct answer under every question, so you can test worlds quickly.",
      },
      {
        k: "autowin",
        n: "Instant clear",
        d: 'Adds a "Clear world" or "Clear level" button to the game screen that wins it immediately.',
      },
      { k: "shop", n: "Own every item", d: "Unlocks every character, hat and trail in the shop.", once: !0 },
      {
        k: "complete",
        n: "Complete everything",
        d: "Marks every Algebra Quest world and Excel Lab level as cleared with 3 stars on your admin account.",
        once: !0,
      },
    ],
  },
  {
    cat: "Insight powers",
    items: [
      {
        k: "dash",
        n: "Live dashboard",
        d: "Registered users, who is online now, sign-ins, sign-outs and everything players do on the site.",
        open: "dash",
      },
      {
        k: "players",
        n: "Player inspector",
        d: "Every player with rank, level, score, accuracy and where they are now.",
        open: "players",
      },
      {
        k: "stages",
        n: "Stage analytics",
        d: "What is happening at each world and level, per game: starts, clears, accuracy, time, hints, stuck players and weakest skills.",
        open: "stages",
      },
      { k: "board", n: "Live leaderboard", d: "The ranking your players see, by score.", open: "board" },
    ],
  },
];
/* restored from the live build */
function applyOnce(e) {
  if (
    ("shop" === e &&
      (SKINS.forEach((e, t) => S.owned.includes("skin" + t) || S.owned.push("skin" + t)),
      HATS.forEach((e, t) => S.owned.includes("hat" + t) || S.owned.push("hat" + t)),
      TRAILS.forEach((e, t) => S.owned.includes("trail" + t) || S.owned.push("trail" + t))),
    "complete" === e)
  ) {
    ((S.cleared = Array(10).fill(!0)), (S.stars = Array(10).fill(3)), (S.learned = Array(10).fill(!0)));
    const e = XS();
    ((e.cleared = Array(9).fill(!0)), (e.stars = Array(9).fill(3)), (e.learned = Array(9).fill(!0)));
  }
}
function claimModal(){S.powers=S.powers||{};const m=modal(`<p class="eyebrow">Super admin</p><h2>Claim powers</h2><p class="muted" style="margin:4px 0 12px">Powers only affect your own admin account. Players never see them, and your play is left out of rankings and analytics.</p>
 ${POWERS.map(c=>`<h3 class="pcat">${c.cat}</h3><div class="plist">${c.items.map(p=>`<div class="pow"><div><b>${p.n}</b><span class="muted">${p.d}</span></div>
  ${p.open?`<button class="btn ghost" data-open="${p.open}">Open</button>`:p.once?`<button class="btn gold" data-once="${p.k}">${S.powers[p.k]?'Claimed ✓':'Claim'}</button>`:`<button class="sw" role="switch" aria-checked="${!!S.powers[p.k]}" data-pw="${p.k}" aria-label="${p.n}"></button>`}</div>`).join('')}</div>`).join('')}
 <div class="row" style="margin-top:14px"><button class="btn gold" id="claimAll">Claim all powers</button><button class="btn ghost" id="clX">Done</button></div>`,'esc');
 $$('[data-pw]',m).forEach(b=>b.onclick=()=>{const k=b.dataset.pw;S.powers[k]=!S.powers[k];b.setAttribute('aria-checked',S.powers[k]);save();sfx('click');renderTop()});
 $$('[data-once]',m).forEach(b=>b.onclick=()=>{const k=b.dataset.once;S.powers[k]=true;applyOnce(k);save();sfx('coin');b.textContent='Claimed ✓';renderTop()});
 $$('[data-open]',m).forEach(b=>b.onclick=()=>{ADMTAB=b.dataset.open;closeModal();go('admin')});
 $('#claimAll').onclick=()=>{POWERS[0].items.forEach(p=>{S.powers[p.k]=true;if(p.once)applyOnce(p.k)});save();sfx('crystal');FX.burst(innerWidth/2,innerHeight/2,80,['#E5766C','#FFC531','#fff']);gtoast('All powers claimed');claimModal();renderTop()};
 $('#clX').onclick=()=>{closeModal();if(VIEW==='map')go('map')}}
/* ---- sign up / log in ---- */
let AUTHTAB='signup';
/* restored from the live build */
function viewAuth(e, t) {
  ((e.innerHTML = `<section class="auth"><div class="auth-intro"><div class="auth-brand">${MINDOZA_LOGO(44)}</div><p class="eyebrow">Learning games for every grade</p><h1 class="auth-h">Play. Learn.<span>Level up in every class.</span></h1>\n <p>Pick your grade, choose a game and play as your own fruit character. Grade 7 is open now:<br><b>Maths: Algebra Quest.</b> Win back ten Math Crystals from Dr. Chaos across ten worlds, each a different game.<br><b>ICT: Excel Lab.</b> Nine spreadsheet missions on cell references, formulas, $H$2 and IF, each in its own game style.<br><b>Science: Cell Lab.</b> Three missions on plant cells, the microscope and specialised cells from Workbook 7.<br><b>KS3 Physics, Chemistry, Biology and Spanish.</b> Volt Voyage, Atom Forge, Bio Odyssey and \xa1Vamos!: forty 10-question missions that follow the BBC Bitesize KS3 guides, each level a different game.</p>\n <p class="muted">Create a free account so your progress, coins and stars are saved and you can carry on from any device.</p><div class="auth-av">${[0, 1, 2, 3, 5, 6].map((e) => avatarSVG({ skin: e, hat: 0, trail: 0 }, "av", e ? 64 : 120)).join("")}</div></div>\n <div class="auth-card panel"><div class="seg auth-tabs" role="tablist"><button role="tab" data-at="signup" aria-pressed="${"signup" === AUTHTAB}">Sign up</button><button role="tab" data-at="login" aria-pressed="${"login" === AUTHTAB}">Sign in</button></div>\n <form id="authForm" class="auth-form" autocomplete="on" novalidate>\n  ${"signup" === AUTHTAB ? '<label for="afName">Your name</label><input class="ans-in" id="afName" name="name" autocomplete="name" maxlength="40" placeholder="e.g. Aysel M." required><label for="afNick">Nickname <span class="muted" style="font-weight:600">(optional)</span></label><input class="ans-in" id="afNick" name="nickname" autocomplete="nickname" maxlength="16" placeholder="e.g. Blue Rocket">' : ""}\n  <label for="afUser">Username</label><input class="ans-in" id="afUser" name="username" autocomplete="username" autocapitalize="off" spellcheck="false" maxlength="24" placeholder="letters and numbers" required>\n  <label for="afPass">Password</label><div class="pw"><input class="ans-in" id="afPass" name="password" type="password" autocomplete="${"signup" === AUTHTAB ? "new-password" : "current-password"}" placeholder="${"signup" === AUTHTAB ? "at least 6 characters" : ""}" required><button type="button" class="navb" id="afShow">Show</button></div>\n  <div class="msg" id="afMsg" role="alert">${t ? esc(t) : ""}</div>\n  <button class="btn" id="afGo">${"signup" === AUTHTAB ? "Create account and play" : "Sign in and play"}</button>\n  <p class="muted" style="margin:0;font-size:14px">${"signup" === AUTHTAB ? "Already have an account? Choose Sign in above." : "New here? Choose Sign up above."}</p></form></div></section>`),
    $$("[data-at]", e).forEach(
      (t) =>
        (t.onclick = () => {
          ((AUTHTAB = t.dataset.at), viewAuth(e));
        }),
    ),
    ($("#afShow").onclick = () => {
      const e = $("#afPass");
      ((e.type = "password" === e.type ? "text" : "password"),
        ($("#afShow").textContent = "password" === e.type ? "Show" : "Hide"));
    }),
    ($("#authForm").onsubmit = async (e) => {
      (e.preventDefault(), AU.init());
      const t = $("#afGo"),
        a = $("#afMsg"),
        s = { username: $("#afUser").value.trim(), password: $("#afPass").value };
      "signup" === AUTHTAB && (s.name = $("#afName").value.trim());
      const o = "signup" === AUTHTAB ? cleanNick($("#afNick").value) : "";
      if (s.username && s.password && ("signup" !== AUTHTAB || s.name))
        if (o && nickErr(o)) a.textContent = "Nickname: " + nickErr(o);
        else {
          ((t.disabled = !0),
            (t.textContent = "signup" === AUTHTAB ? "Creating your account\u2026" : "Signing in\u2026"),
            (a.textContent = ""));
          try {
            const e = await NET.call("signup" === AUTHTAB ? "/api/signup" : "/api/login", { method: "POST", body: s });
            (NET.adopt(e),
              "signup" === AUTHTAB && ((S.nickAsked = !0), o && (S.nick = o), save()),
              sfx("level"),
              gtoast(e.user.admin ? "Welcome, super admin" : "Welcome, " + (S.nick || e.user.name) + "!"),
              go(e.user.admin ? "admin" : "home"),
              e.user.admin || S.nick || S.nickAsked || setTimeout(nickPrompt, 500));
          } catch (e) {
            ((a.textContent = e.message),
              (t.disabled = !1),
              (t.textContent = "signup" === AUTHTAB ? "Create account and play" : "Sign in and play"));
          }
        }
      else
        a.textContent =
          "signup" === AUTHTAB
            ? "Fill in your name, username and password first. The nickname is optional."
            : "Fill in every box first.";
    }),
    setTimeout(() => {
      const e = $("signup" === AUTHTAB ? "#afName" : "#afUser");
      e && !matchMedia("(pointer:coarse)").matches && e.focus();
    }, 50));
}
/* restored from the live build */
const nkTag = (e) => (e ? ` <span class="nktag" title="Nickname">${esc(e)}</span>` : "");
/* ---- leaderboard (players) ---- */
async function fillLeaderboard(el){if(!el)return;el.innerHTML='<p class="muted" style="margin:0">Loading…</p>';
 try{const d=await NET.call('/api/leaderboard');el.innerHTML=(d.top.length?`<ol class="lb">${d.top.map(p=>`<li class="${p.you?'you':''}"><span class="lbr">${p.rank}</span><span class="lbn">${esc(p.name)}${p.you?' (you)':''}</span><span class="muted">Lv ${p.level}</span><b>${p.score}</b></li>`).join('')}</ol>`:'<p class="muted" style="margin:0">No players yet.</p>')
  +(d.you&&!d.top.some(p=>p.you)?`<p style="margin:8px 0 0">You are <b>#${d.you.rank}</b> of ${d.you.of} with <b>${d.you.score}</b> points.</p>`:'')
  +'<p class="muted" style="margin:8px 0 0;font-size:13px">Score = XP + 50 per star + 200 per Crystal + 10 per Boss Rush point.</p>'}
 catch(e){el.innerHTML=`<p class="muted" style="margin:0">${esc(e.message)}</p>`}}
/* restored from the live build */
let ADMTAB = "dash";
/* restored from the live build */
let ADM = {
  players: null,
  stages: {},
  over: null,
  dash: null,
  feed: "all",
  sort: "rank",
  dir: 1,
  q: "",
  game: "algebra",
};
const pct=v=>v==null?'–':Math.round(v*100)+'%';
const ago=t=>{const s=(Date.now()-new Date(t))/1000;if(s<90)return'just now';if(s<3600)return Math.round(s/60)+' min ago';if(s<86400)return Math.round(s/3600)+' h ago';return Math.round(s/86400)+' d ago'};
/* restored from the live build */
const isOnline = (e) => Date.now() - new Date(e.last_seen) < 3e5;
/* restored from the live build */
const ppfp = (e, t) => pfp({ pic: e.pic, skin: e.fruit || 0 }, t);
/* restored from the live build */
const algNow = (e) =>
  e.world > 10
    ? '<span class="chip">All 10 worlds done</span>'
    : `World ${e.world}<br><span class="muted">${WORLDS[e.world - 1].topic}</span>`;
/* restored from the live build */
const sciNow = (e) =>
  e.sci_now > 3
    ? '<span class="chip">All 3 levels done</span>'
    : `Level ${e.sci_now || 1}<br><span class="muted">${SCV[(e.sci_now || 1) - 1].name}</span>`;
/* restored from the live build */
const ictNow = (e) =>
  e.ict_now > 9
    ? '<span class="chip">All 9 levels done</span>'
    : `Level ${e.ict_now}<br><span class="muted">${XLV[e.ict_now - 1].name}</span>`;
/* restored from the live build */
async function viewAdmin(e) {
  if (NET.user && NET.user.admin) {
    ((e.innerHTML = `<section class="admin"><div class="adm-head"><div><p class="eyebrow">Super admin</p><h2 class="adm-h">Mindoza control room</h2></div><span class="spacer"></span>\n <button class="btn gold" id="admClaim">${IC.star.replace("<svg", '<svg width="20" height="20"')} Claim</button><button class="btn ghost" id="admRef">Refresh</button></div>\n <div class="tiles" id="admTiles"></div>\n <div class="tabs" role="tablist">${[
      ["dash", "Dashboard"],
      ["players", "Registered users"],
      ["stages", "Stage analytics"],
      ["board", "Leaderboard"],
    ]
      .map(([e, t]) => `<button class="navb" role="tab" aria-pressed="${ADMTAB === e}" data-adt="${e}">${t}</button>`)
      .join("")}</div>\n <div id="admBody"><p class="muted">Loading\u2026</p></div></section>`),
      ($("#admClaim").onclick = claimModal),
      ($("#admRef").onclick = () => {
        ((ADM.players = ADM.over = ADM.dash = null), (ADM.stages = {}), viewAdmin(e));
      }),
      $$("[data-adt]", e).forEach(
        (t) =>
          (t.onclick = () => {
            ((ADMTAB = t.dataset.adt),
              $$("[data-adt]", e).forEach((e) => e.setAttribute("aria-pressed", e === t)),
              admRender());
          }),
      ));
    try {
      const [e, t] = await Promise.all([
        ADM.over || NET.call("/api/admin/overview"),
        ADM.players || NET.call("/api/admin/players"),
      ]);
      ((ADM.over = e), (ADM.players = t));
      const s = t.players.filter(isOnline).length;
      (($("#admTiles").innerHTML = [
        ["Registered users", e.players],
        ["Online now", s],
        ["New this week", e.newWeek ?? "\u2013"],
        ["Active today", e.activeDay],
        ["Active this week", e.activeWeek],
        ["Answers given", e.answered],
        ["Overall accuracy", pct(e.accuracy)],
        ["Super questions won", e.superTried ? `${e.superOk}<small>/${e.superTried}</small>` : "0"],
      ]
        .map(([e, t]) => `<div class="tile-s"><span class="eyebrow">${e}</span><b>${t}</b></div>`)
        .join("")),
        admRender());
    } catch (e) {
      $("#admBody").innerHTML = `<div class="inline-bad">${esc(e.message)}</div>`;
    }
  } else go("map");
}
/* restored from the live build */
function admRender() {
  const e = $("#admBody");
  if (!e || !ADM.players) return;
  if ("board" === ADMTAB)
    return (
      (e.innerHTML = '<div class="panel" style="max-width:560px"><h3>Leaderboard</h3><div id="admLb"></div></div>'),
      void fillLeaderboard($("#admLb"))
    );
  if ("dash" === ADMTAB) return admDash(e);
  if ("stages" === ADMTAB)
    return ADM.stages[ADM.game]
      ? admStages(e)
      : ((e.innerHTML = '<p class="muted">Loading\u2026</p>'),
        void NET.call("/api/admin/stages?game=" + ADM.game)
          .then((e) => {
            ((ADM.stages[ADM.game] = e), admRender());
          })
          .catch((t) => (e.innerHTML = `<div class="inline-bad">${esc(t.message)}</div>`)));
  let t = ADM.players.players.map((e) => ({ ...e, acc: e.answered ? e.correct / e.answered : null }));
  if (ADM.q) {
    const e = ADM.q.toLowerCase();
    t = t.filter(
      (t) => t.name.toLowerCase().includes(e) || t.username.includes(e) || (t.nick || "").toLowerCase().includes(e),
    );
  }
  const s = ADM.sort;
  (t.sort((e, t) => {
    let a = e[s],
      n = t[s];
    return (
      ("last_seen" !== s && "created_at" !== s) || ((a = +new Date(a)), (n = +new Date(n))),
      null == a ? 1 : null == n ? -1 : ("string" == typeof a ? a.localeCompare(n) : a - n) * ADM.dir
    );
  }),
    (e.innerHTML = `<div class="row" style="margin-bottom:10px"><input class="ans-in adm-search" id="admQ" placeholder="Search by name or username" value="${esc(ADM.q)}" aria-label="Search players"><span class="muted">${t.length} registered user${1 === t.length ? "" : "s"} \xb7 tap a row for details</span></div>\n ${
      t.length
        ? `<div class="tbl-wrap"><table class="tbl"><thead><tr>${[
            ["rank", "#"],
            ["name", "Player"],
            ["last_seen", "Status"],
            ["world", "Algebra: now at"],
            ["sci_now", "Cell Lab: now at"],
            ["ict_now", "Excel Lab: now at"],
            ["level", "Level"],
            ["score", "Score"],
            ["xp", "XP"],
            ["coins", "Coins"],
            ["crystals", "Crystals"],
            ["stars", "Stars"],
            ["acc", "Accuracy"],
            ["answered", "Answers"],
            ["best_streak", "Best streak"],
            ["sci_levels", "Cell Lab levels"],
            ["ict_levels", "Excel levels"],
            ["created_at", "Joined"],
          ]
            .map(
              ([e, t]) =>
                `<th><button data-sort="${e}" aria-label="Sort by ${t}">${t}${ADM.sort === e ? (ADM.dir > 0 ? " \u25b2" : " \u25bc") : ""}</button></th>`,
            )
            .join(
              "",
            )}</tr></thead><tbody>\n ${t.map((e) => `<tr data-pid="${e.id}" tabindex="0"><td><b>${e.rank}</b></td><td><span class="who">${ppfp(e, 34)}<span><b>${esc(e.name)}</b>${nkTag(e.nick)}<br><span class="muted">@${esc(e.username)}</span></span></span></td><td>${isOnline(e) ? '<span class="online">Online</span>' : ago(e.last_seen)}</td><td>${algNow(e)}</td><td>${sciNow(e)}</td><td>${ictNow(e)}</td><td>${e.level}</td><td><b>${e.score}</b></td><td>${e.xp}</td><td>${e.coins}</td><td>${e.crystals}/10</td><td>${e.stars}/30</td><td>${pct(e.acc)}</td><td>${e.answered}</td><td>${e.best_streak}</td>\n  <td>${e.sci_levels || 0}/3</td><td>${e.ict_levels}/9</td><td>${new Date(e.created_at).toLocaleDateString()}</td></tr>`).join("")}</tbody></table></div>`
        : '<div class="panel"><p style="margin:0">No players have signed up yet. Share the game link and they will appear here as soon as they create an account.</p></div>'
    }`));
  const a = $("#admQ");
  ((a.oninput = () => {
    ADM.q = a.value;
    const e = a.selectionStart;
    admRender();
    const t = $("#admQ");
    (t.focus(), t.setSelectionRange(e, e));
  }),
    $$("[data-sort]", e).forEach(
      (e) =>
        (e.onclick = () => {
          const t = e.dataset.sort;
          (ADM.sort === t
            ? (ADM.dir *= -1)
            : ((ADM.sort = t), (ADM.dir = ["rank", "name", "world", "ict_now", "sci_now"].includes(t) ? 1 : -1)),
            admRender());
        }),
    ),
    $$("tr[data-pid]", e).forEach((e) => {
      const t = () => playerDetail(+e.dataset.pid);
      ((e.onclick = t),
        (e.onkeydown = (e) => {
          "Enter" === e.key && t();
        }));
    }));
}
/* restored from the live build */
const FEEDS = [
  ["all", "Everything", null],
  ["sign", "Sign-ins", ["signup", "login", "logout"]],
  ["levels", "Levels", ["start", "clear", "training", "rush"]],
  ["super", "Super questions & doors", ["super", "door"]],
  ["shop", "Shop and profile", ["buy", "profile"]],
];
/* restored from the live build */
function admDash(e) {
  if (!ADM.dash)
    return (
      (e.innerHTML = '<p class="muted">Loading\u2026</p>'),
      void Promise.all([NET.call("/api/admin/daily"), NET.call("/api/admin/activity")])
        .then(([e, t]) => {
          ((ADM.dash = { days: e.days, events: t.events }), admRender());
        })
        .catch((t) => (e.innerHTML = `<div class="inline-bad">${esc(t.message)}</div>`))
    );
  const t = ADM.dash.days,
    a = ADM.players.players,
    s = FEEDS.find((e) => e[0] === ADM.feed) || FEEDS[0],
    o = ADM.dash.events.filter((e) => !s[2] || s[2].includes(e.kind)),
    r = 150,
    i = 560 / Math.max(1, t.length),
    l = Math.max(1, ...t.map((e) => Math.max(e.signups, e.active))),
    n = a
      .slice()
      .sort((e, t) => new Date(t.last_seen) - new Date(e.last_seen))
      .slice(0, 12),
    c = a
      .slice()
      .sort((e, t) => new Date(t.created_at) - new Date(e.created_at))
      .slice(0, 6);
  ((e.innerHTML = `<div class="dash"><div class="panel dash-chart"><div class="row" style="justify-content:space-between"><h3>Last 14 days</h3><span class="legend"><i style="background:var(--brand)"></i>New sign-ups <i style="background:var(--good)"></i>Active players</span></div>\n <div class="tbl-wrap"><svg viewBox="0 0 560 196" class="achart" role="img" aria-label="Sign-ups and active players per day">\n ${[0, 0.5, 1].map((e) => `<line x1="0" x2="560" y1="${r - e * r + 18}" y2="${r - e * r + 18}" stroke="var(--line)"/><text x="2" y="${r - e * r + 14}" font-size="11" fill="var(--muted)">${Math.round(e * l)}</text>`).join("")}\n ${t
    .map((e, a) => {
      const s = (e.signups / l) * r,
        o = (e.active / l) * r,
        n = a * i,
        c = new Date(e.day + "T12:00:00");
      return `<rect x="${n + 0.18 * i}" y="${r - s + 18}" width="${0.3 * i}" height="${s}" rx="3" fill="var(--brand)"><title>${e.day}: ${e.signups} sign-ups</title></rect><rect x="${n + 0.52 * i}" y="${r - o + 18}" width="${0.3 * i}" height="${o}" rx="3" fill="var(--good)"><title>${e.day}: ${e.active} active, ${e.answers} answers</title></rect>${a % 2 == t.length % 2 ? "" : `<text x="${n + i / 2}" y="188" font-size="11" text-anchor="middle" fill="var(--muted)">${c.getDate()}/${c.getMonth() + 1}</text>`}`;
    })
    .join(
      "",
    )}</svg></div>\n <p class="muted" style="margin:6px 0 0;font-size:13px">${t.reduce((e, t) => e + t.signups, 0)} sign-ups and ${t.reduce((e, t) => e + t.answers, 0)} answers in the last 14 days.</p></div>\n <div class="panel"><h3>Who's around</h3>${n.length ? `<ul class="ulist">${n.map((e) => `<li data-pid="${e.id}" tabindex="0">${ppfp(e, 36)}<span><b>${esc(e.name)}</b>${nkTag(e.nick)}<br><span class="muted">${isOnline(e) ? '<span class="online">Online</span>' : "Seen " + ago(e.last_seen)}</span></span><span class="ustage"><span>${e.world > 10 ? "Algebra done" : "Algebra W" + e.world}</span><span>${e.ict_now > 9 ? "Excel done" : "Excel L" + e.ict_now}</span></span></li>`).join("")}</ul>` : '<p class="muted" style="margin:0">Nobody has signed up yet.</p>'}</div>\n <div class="panel dash-feed"><div class="row" style="justify-content:space-between"><h3>Live activity</h3><div class="seg feedseg">${FEEDS.map(([e, t]) => `<button data-feed="${e}" aria-pressed="${ADM.feed === e}">${t}</button>`).join("")}</div></div>\n ${
    o.length
      ? `<ul class="feed">${o
          .slice(0, 60)
          .map(
            (e) =>
              `<li data-pid="${e.pid}" tabindex="0">${pfp({ pic: e.pic, skin: e.fruit || 0 }, 30)}<span><b>${esc(e.nick || e.name)}</b> ${actText(e)}${"ict" === e.game && null != e.stage ? ' <span class="chip tiny">Excel</span>' : ""}${"sci" === e.game && null != e.stage ? ' <span class="chip tiny">Cell Lab</span>' : ""}${K3[e.game] && null != e.stage ? ' <span class="chip tiny">' + K3[e.game].name + "</span>" : ""}</span><span class="muted ftime">${ago(e.at)}</span></li>`,
          )
          .join("")}</ul>`
      : '<p class="muted" style="margin:0">No activity of this kind yet.</p>'
  }</div>\n <div class="panel"><h3>Newest users</h3>${c.length ? `<ul class="ulist">${c.map((e) => `<li data-pid="${e.id}" tabindex="0">${ppfp(e, 36)}<span><b>${esc(e.name)}</b>${nkTag(e.nick)}<br><span class="muted">@${esc(e.username)} \xb7 joined ${ago(e.created_at)}</span></span><b class="uscore">${e.score}</b></li>`).join("")}</ul>` : '<p class="muted" style="margin:0">None yet.</p>'}\n <button class="btn ghost w" id="dashAll" style="margin-top:10px;width:100%">See all registered users</button></div></div>`),
    $$("[data-feed]", e).forEach(
      (e) =>
        (e.onclick = () => {
          ((ADM.feed = e.dataset.feed), admRender());
        }),
    ),
    $$("[data-pid]", e).forEach((e) => {
      const t = () => playerDetail(+e.dataset.pid);
      ((e.onclick = t),
        (e.onkeydown = (e) => {
          "Enter" === e.key && t();
        }));
    }),
    ($("#dashAll").onclick = () => {
      ((ADMTAB = "players"),
        $$("[data-adt]").forEach((e) => e.setAttribute("aria-pressed", "players" === e.dataset.adt)),
        admRender());
    }));
}
/* restored from the live build */
function admStages(e) {
  const t = ADM.game,
    a = "ict" === t,
    s = K3[t]
      ? K3[t].lv.map((e) => ({ name: e.t, topic: e.n, c1: e.c1 || K3[t].c1 }))
      : a
        ? XLV.map((e) => ({ name: e.name, topic: e.style, c1: e.c1 }))
        : "sci" === t
          ? SCV.map((e) => ({ name: e.name, topic: "Topic " + e.topic, c1: e.c1 }))
          : WORLDS,
    o = "algebra" === t ? "world" : "level",
    r = ADM.stages[t].stages,
    i = 200,
    l = 560 / r.length,
    n = r.filter((e) => e.answers >= 5).sort((e, t) => e.accuracy - t.accuracy)[0],
    c = r.slice().sort((e, t) => t.stuckHere - e.stuckHere)[0];
  ((e.innerHTML = `<div class="seg" style="margin-bottom:12px">${[["algebra", "Algebra Quest"], ["sci", "Cell Lab (Science)"], ["ict", "Excel Lab (ICT)"], ...K3IDS.map((e) => [e, K3[e].name + " (" + K3[e].subject + ")"])].map(([e, a]) => `<button data-gm="${e}" aria-pressed="${t === e}">${a}</button>`).join("")}</div><div class="row" style="margin-bottom:12px">${n ? `<span class="chip">Hardest ${o}: ${n.stage + 1}. ${s[n.stage].name} (${pct(n.accuracy)})</span>` : ""}${c && c.stuckHere ? `<span class="chip">Most players stuck at: ${o} ${c.stage + 1} (${c.stuckHere})</span>` : ""}</div>\n <div class="panel" style="margin-bottom:14px"><h3>Accuracy by ${o}</h3><div class="tbl-wrap"><svg viewBox="0 0 560 240" class="achart" role="img" aria-label="Accuracy per ${o}">\n ${[0, 0.25, 0.5, 0.75, 1].map((e) => `<line x1="0" x2="560" y1="${i - e * i + 10}" y2="${i - e * i + 10}" stroke="var(--line)"/><text x="2" y="${i - e * i + 6}" font-size="11" fill="var(--muted)">${100 * e}%</text>`).join("")}\n ${r
    .map((e, t) => {
      const a = (e.accuracy || 0) * i;
      return `<rect x="${t * l + 0.25 * l}" y="${i - a + 10}" width="${0.5 * l}" height="${Math.max(0, a)}" rx="4" fill="${s[t].c1}" opacity="${e.answers ? 1 : 0.25}"/><text x="${t * l + l / 2}" y="228" font-size="12" text-anchor="middle" fill="var(--ink)" font-weight="700">${t + 1}</text>${e.answers ? `<text x="${t * l + l / 2}" y="${i - a + 4}" font-size="11" text-anchor="middle" fill="var(--ink)">${pct(e.accuracy)}</text>` : ""}`;
    })
    .join("")}</svg></div></div>\n <div class="stgrid">${r
    .map((e) => {
      const t = s[e.stage];
      return `<div class="stcard" style="--w1:${t.c1}"><div class="sthead"><b>${e.stage + 1}. ${t.name}</b><span class="muted">${t.topic}</span></div>\n  <dl><div><dt>Started</dt><dd>${e.started}</dd></div><div><dt>Cleared</dt><dd>${e.cleared}${e.started ? ` <span class="muted">(${pct(e.cleared / e.started)})</span>` : ""}</dd></div><div><dt>Stuck here now</dt><dd>${e.stuckHere}</dd></div>\n  <div><dt>Answers</dt><dd>${e.answers}</dd></div><div><dt>Accuracy</dt><dd>${pct(e.accuracy)}</dd></div><div><dt>Avg answer time</dt><dd>${null == e.avgSeconds ? "\u2013" : e.avgSeconds.toFixed(1) + " s"}</dd></div>\n  <div><dt>Avg clear time</dt><dd>${e.avgClearMs ? fmtT(e.avgClearMs) : "\u2013"}</dd></div><div><dt>Fastest clear</dt><dd>${e.bestClearMs ? fmtT(e.bestClearMs) : "\u2013"}</dd></div><div><dt>Super questions</dt><dd>${e.superTried ? e.superOk + "/" + e.superTried : "\u2013"}</dd></div>\n  <div><dt>Hint use</dt><dd>${pct(e.hintRate)}</dd></div><div><dt>Training Room</dt><dd>${e.training}</dd></div><div><dt>Play sessions</dt><dd>${e.sessions}</dd></div></dl>\n  ${
        e.skills.length
          ? `<p class="eyebrow" style="margin:8px 0 4px">Sub-skills, weakest first</p><ul class="sklist">${e.skills
              .slice(0, 4)
              .map(
                (e) =>
                  `<li><span>${TAGNAMES[e.tag] || XLNAMES[e.tag] || SCNAMES[e.tag] || e.tag}</span><span class="${e.acc < 0.6 ? "no" : e.acc < 0.8 ? "" : "ok"}">${pct(e.acc)} <span class="muted">of ${e.n}</span></span></li>`,
              )
              .join("")}</ul>`
          : '<p class="muted" style="margin:8px 0 0">No answers yet.</p>'
      }</div>`;
    })
    .join("")}</div>`),
    $$("[data-gm]", e).forEach(
      (e) =>
        (e.onclick = () => {
          ((ADM.game = e.dataset.gm), admRender());
        }),
    ));
}
/* restored from the live build */
async function playerDetail(e) {
  const t = modal('<p class="muted">Loading player\u2026</p>', "esc");
  try {
    const a = await NET.call("/api/admin/player/" + e),
      s = a.player,
      o = s.save || {},
      r = s.answered ? s.correct / s.answered : null,
      i = o.times || {},
      l = o.stats || {},
      n = a.stages.algebra,
      c = a.stages.ict,
      h = a.stages.sci || [],
      d = [
        ...n.map((e) => ({ ...e, g: "World" })),
        ...h.map((e) => ({ ...e, g: "Cell Lab level" })),
        ...c.map((e) => ({ ...e, g: "Excel Lab level" })),
      ]
        .flatMap((e) => e.skills.filter((e) => e.n >= 2 && e.acc < 0.7).map((t) => ({ ...t, stage: e.stage, g: e.g })))
        .sort((e, t) => e.acc - t.acc)
        .slice(0, 6);
    ((t.innerHTML = `<div class="row" style="align-items:center">${pfp({ pic: o.pic, skin: (o.av || {}).skin || 0 }, 64)}<div><p class="eyebrow">Player #${s.id} \xb7 @${esc(s.username)}</p><h2 style="margin:0">${esc(s.name)}${nkTag(o.nick)}</h2><span class="muted">${isOnline(s) ? '<span class="online">Online now</span>' : "Last seen " + ago(s.last_seen)} \xb7 joined ${new Date(s.created_at).toLocaleDateString()}</span></div></div>\n  <div class="row" style="margin:10px 0"><span class="chip">Score ${s.score}</span><span class="chip">Level ${s.level}</span><span class="chip">${s.xp} XP</span><span class="chip">${s.coins} coins</span><span class="chip">${s.crystals}/10 Crystals</span><span class="chip">${s.stars}/30 stars</span><span class="chip">Cell Lab ${s.sci_levels || 0}/3 \xb7 ${s.sci_stars || 0}\u2605</span><span class="chip">Excel Lab ${s.ict_levels}/9 \xb7 ${s.ict_stars}\u2605</span><span class="chip">${pct(r)} accuracy</span><span class="chip">Best streak ${s.best_streak}</span><span class="chip">Super ${l.superOk || 0}/${l.superTried || 0}</span><span class="chip">Character: ${SKINS[(o.av || {}).skin || 0].n}</span></div>\n  <div class="row pnow"><div><span class="eyebrow">Algebra Quest now at</span><div>${algNow(s)}</div></div><div><span class="eyebrow">Cell Lab now at</span><div>${sciNow(s)}</div></div><div><span class="eyebrow">Excel Lab now at</span><div>${ictNow(s)}</div></div></div>\n  <h3 class="pcat">Algebra Quest worlds</h3><div class="prog">${WORLDS.map(
      (e, t) => {
        const a = (s.mastery || [])[t] || 0,
          r = n[t],
          l = o.cleared && o.cleared[t];
        return `<div class="prow"><div><b>${t + 1}. ${e.topic}</b> <span class="muted">${l ? "\xb7 cleared, " + ((o.stars || [])[t] || 0) + "\u2605" : ""}${i["a" + t] ? " \xb7 best " + fmtT(i["a" + t]) : ""}</span></div><div class="muted">${r.answers ? r.answers + " answers \xb7 " + pct(r.accuracy) : "not played"}</div><div class="pbar"><i style="width:${a}%;background:linear-gradient(90deg,${e.c1},${e.c2})"></i></div></div>`;
      },
    ).join("")}</div>\n  ${K3IDS.map((e) => {
      const t = (o.k3 || {})[e];
      return t && t.cleared
        ? `<h3 class="pcat">${K3[e].name} (${K3[e].subject})</h3><p class="muted" style="margin:0 0 6px">${t.cleared.filter(Boolean).length}/10 levels cleared \xb7 ${t.stars.reduce((e, t) => e + t, 0)}/30 \u2605 \xb7 best scores: ${t.best.map((e, t) => t + 1 + ": " + e + "/10").join(", ")}</p>`
        : "";
    }).join("")}<h3 class="pcat">Cell Lab (Science)</h3><div class="prog">${SCV.map((e, t) => {
      const a = o.sci || {},
        r = h[t] || { answers: 0 },
        l = (s.sci_mastery || [])[t] || 0;
      return `<div class="prow"><div><b>${t + 1}. ${e.name}</b> <span class="muted">${a.cleared && a.cleared[t] ? "\xb7 cleared, " + ((a.stars || [])[t] || 0) + "\u2605" : ""}${i["s" + t] ? " \xb7 best " + fmtT(i["s" + t]) : ""}</span></div><div class="muted">${r.answers ? r.answers + " answers \xb7 " + pct(r.accuracy) : "not played"}</div><div class="pbar"><i style="width:${l}%;background:linear-gradient(90deg,${e.c1},${e.c2})"></i></div></div>`;
    }).join("")}</div>\n  <h3 class="pcat">Excel Lab (ICT)</h3><div class="prog">${XLV.map((e, t) => {
      const a = o.ict || {},
        r = c[t],
        l = (s.ict_mastery || [])[t] || 0;
      return `<div class="prow"><div><b>${t + 1}. ${e.name}</b> <span class="muted">${a.cleared && a.cleared[t] ? "\xb7 cleared, " + ((a.stars || [])[t] || 0) + "\u2605" : ""}${i["x" + t] ? " \xb7 best " + fmtT(i["x" + t]) : ""}</span></div><div class="muted">${r.answers ? r.answers + " answers \xb7 " + pct(r.accuracy) : "not played"}</div><div class="pbar"><i style="width:${l}%;background:linear-gradient(90deg,${e.c1},${e.c2})"></i></div></div>`;
    }).join(
      "",
    )}</div>\n  <h3 class="pcat">Needs help with</h3>${d.length ? `<ul class="sklist">${d.map((e) => `<li><span>${TAGNAMES[e.tag] || XLNAMES[e.tag] || SCNAMES[e.tag] || e.tag} <span class="muted">(${e.g} ${e.stage + 1})</span></span><span class="no">${pct(e.acc)} of ${e.n}</span></li>`).join("")}</ul>` : '<p class="muted">Nothing flagged yet.</p>'}\n  <h3 class="pcat">Recent activity</h3>${
      a.recent.length
        ? `<ul class="act">${a.recent
            .slice(0, 20)
            .map(
              (e) =>
                `<li><span class="muted">${ago(e.at)}</span> ${"ict" === e.game && null != e.stage ? '<span class="chip tiny">Excel</span> ' : ""}${"sci" === e.game && null != e.stage ? '<span class="chip tiny">Cell Lab</span> ' : ""}${actText(e)}</li>`,
            )
            .join("")}</ul>`
        : '<p class="muted">No activity yet.</p>'
    }\n  <div class="row" style="margin-top:12px"><button class="btn" id="pdX">Close</button></div>`),
      ($("#pdX").onclick = closeModal));
  } catch (e) {
    ((t.innerHTML = `<div class="inline-bad">${esc(e.message)}</div><div class="row" style="margin-top:12px"><button class="btn" id="pdX">Close</button></div>`),
      ($("#pdX").onclick = closeModal));
  }
}
