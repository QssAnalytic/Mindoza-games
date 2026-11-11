/* restored from the live build */
const k3StageName = (e, t) =>
  null == t
    ? ""
    : void 0 !== K3 && K3[e]
      ? k3Name(e, t)
      : "sci" === e
        ? `Cell Lab Level ${t + 1}${SCV[t] ? " (" + SCV[t].name + ")" : ""}`
        : "ict" === e
          ? `Excel Lab Level ${t + 1}${XLV[t] ? " (" + XLV[t].name + ")" : ""}`
          : `World ${t + 1}${WORLDS[t] ? " (" + WORLDS[t].topic + ")" : ""}`;
const K3={};
const K3ART={};
const K3IDS=['phy','chem','bio','spa'];
let K3G='phy';
let KRUN=null;
function K3S(g){S.k3=S.k3||{};if(!S.k3[g])S.k3[g]={cleared:Array(10).fill(false),stars:Array(10).fill(0),best:Array(10).fill(0)};return S.k3[g]}
const k3Open=(g,i)=>POW('unlock')||i===0||K3S(g).cleared[i-1];
const k3Prog=g=>{const x=K3S(g);return{done:x.cleared.filter(Boolean).length,of:10,unit:'levels',stars:x.stars.reduce((a,b)=>a+b,0),max:30}};
const K3W={pick:'Tap the right answer',odd:'Find the odd one out',multi:'Select all that apply',tf:'True or false?',type:'Type the answer',slider:'Slide to the value',stepper:'Count it up',build:'Build it from blocks',order:'Put them in order',sort:'Sort into groups',match:'Match the pairs',gap:'Fill the gaps',cycle:'Flip each one',hotspot:'Tap the picture'};
const k3Name=(g,s)=>s==null?'':`${K3[g].name} Level ${s+1}${K3[g].lv[s]?' ('+K3[g].lv[s].n+')':''}`;
/* restored from the live build */
const k3n = (e) =>
  String(e)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[\xbf?\xa1!.,]/g, "")
    .replace(/\s+/g, " ")
    .trim();
const SUBD={'₀':'0','₁':'1','₂':'2','₃':'3','₄':'4','₅':'5','₆':'6','₇':'7','₈':'8','₉':'9'};
/* restored from the live build */
const k3sub = (e) =>
  String(e)
    .replace(/[\u2080-\u2089]/g, (e) => SUBD[e])
    .replace(/\s+/g, "");
function say(t){try{if(!('speechSynthesis'in window)||!t)return;const u=new SpeechSynthesisUtterance(t);u.lang='es-ES';const v=speechSynthesis.getVoices().find(v=>/^es(-|_|$)/i.test(v.lang));if(v)u.voice=v;u.rate=.85;speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){}}
/* restored from the live build */
function viewK3(e, t) {
  ((K3G = t = t || K3G), (CURGAME = "k3" + t));
  const a = K3[t],
    s = K3S(t);
  ((e.innerHTML = `<div class="mapwrap"><div><p class="eyebrow">Grade 7 \xb7 ${a.subject} \xb7 KS3</p><h2 style="font-size:28px;margin:4px 0 6px">${a.name}</h2><p class="muted" style="margin:0 0 14px">${a.blurb} ${s.cleared.filter(Boolean).length} of 10 levels cleared. Every level is a different game. Tap any open level to play or replay it.</p>\n ${roadMap(
    a.lv.map((e, o) => ({
      name: e.t,
      sub: o + 1 + ". " + e.n,
      c1: e.c1 || a.c1,
      c2: e.c2 || a.c2,
      ok: k3Open(t, o),
      cleared: !!s.cleared[o],
      stars: s.stars[o] || 0,
    })),
    { label: a.finish, done: s.cleared.every(Boolean) },
    a.name + " level map",
  )}</div>\n <aside class="side"><div class="panel"><h3>How missions work</h3><p class="muted" style="margin:0 0 6px">Each level is a 10-question mission with its own game style. You have 3 hearts, and a wrong answer costs one.</p><p class="muted" style="margin:0">Get <b>8 of 10</b> to clear the level and open the next one, and <b>10 of 10</b> for 3 stars. Questions 4 and 8 are <b>flashbacks</b> that bring back an earlier level, so you keep what you learned. Hints cost 5, 10 and 15 coins.</p></div>\n <div class="panel"><h3>Learner guides</h3><ol class="k3guides">${a.lv.map((e, t) => `<li class="${s.cleared[t] ? "done" : ""}">${e.n}${s.cleared[t] ? ' <span class="k3st">' + "\u2605".repeat(s.stars[t]) + "</span>" : ""}</li>`).join("")}</ol></div></aside></div>`),
    roadWire(
      e,
      (e) => {
        if (!k3Open(t, e)) return gtoast("Clear Level " + e + " to open this one");
        k3Intro(t, e);
      },
      () =>
        s.cleared.every(Boolean) ? `You cleared every ${a.name} level!` : `Clear all 10 levels to become a ${a.finish}`,
    ));
}
function k3Banner(g,lv,size=84){const G=K3[g],L=lv!=null?G.lv[lv]:null;return`<svg viewBox="0 0 84 84" width="${size}" height="${size}" class="k3ban" aria-hidden="true"><defs><linearGradient id="kb${g}${lv}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${L&&L.c1||G.c1}"/><stop offset="1" stop-color="${L&&L.c2||G.c2}"/></linearGradient></defs><rect x="4" y="4" width="76" height="76" rx="22" fill="url(#kb${g}${lv})"/>${(K3ART[g+'Icon']||(()=>''))(lv)}${lv!=null?`<circle cx="68" cy="16" r="12" fill="#fff"/><text x="68" y="21" text-anchor="middle" font-family="Bungee,sans-serif" font-size="13" fill="${G.c1}">${lv+1}</text>`:''}</svg>`}
/* ---- intro modal ---- */
function k3Intro(g,lv){const G=K3[g],L=G.lv[lv],ex=L.ex;
 const m=modal(`<div class="k3intro" style="--w1:${L.c1||G.c1};--w2:${L.c2||G.c2}"><div class="row" style="align-items:center;flex-wrap:nowrap">${k3Banner(g,lv,72)}<div><p class="eyebrow">Level ${lv+1} • ${L.n}</p><h2 style="margin:2px 0">${L.t}</h2><p class="k3tag">${L.tag}</p></div></div>
 <p class="k3mech"><b>${L.s}</b> · ${K3W[L.w]}</p><div class="lesson-rule"><b>Core rule:</b> ${L.rule}</div>
 <div class="wexample" style="margin-top:10px"><p class="eyebrow">Worked example</p><p style="margin:4px 0"><b>Problem:</b> ${ex.p}</p><ol class="steps">${ex.s.map(s=>`<li>${s}</li>`).join('')}</ol><p style="margin:4px 0 0"><b>Correct answer:</b> ${ex.a}</p></div>
 <div class="row" style="margin-top:14px"><button class="btn w" id="k3Go">Start the mission</button><button class="btn ghost" id="k3X">Not now</button></div></div>`,'esc');
 $('#k3Go').onclick=()=>k3Start(g,lv);$('#k3X').onclick=closeModal}
/* ---- mission ---- */
function k3Leave(){if(KRUN)clockStop(KRUN);KRUN=null;document.onkeydown=null;try{speechSynthesis.cancel()}catch(e){}}
/* restored from the live build */
function k3Start(e, t) {
  (closeModal(),
    hideFB(),
    RUN && leaveStage(),
    XRUN && xlLeave(),
    SRUN && scLeave(),
    k3Leave(),
    (VIEW = "k3play"),
    (K3G = e),
    (CURGAME = "k3" + e),
    renderTop());
  const a = K3[e],
    s = a.lv[t];
  ((KRUN = { g: e, lv: t, qn: 0, correct: 0, hearts: 3, streak: 0, res: [], cur: null, hint: 0, tStart: 0, tick: 0 }),
    NET.track("start", { game: e, stage: t }),
    ($("#main").innerHTML =
      `<section class="play xlplay k3play" style="--w1:${s.c1 || a.c1};--w2:${s.c2 || a.c2}"><div class="hud"><button class="iconbtn" id="k3Back" aria-label="Back to the map">${IC.back}</button><div class="hud-title"><span class="eyebrow">${a.name} \xb7 Level ${t + 1}</span><b>${s.t}</b></div>\n <div class="hearts" id="k3Hearts"></div><div class="xldots" id="k3Dots"></div><span class="chip" id="k3Score" title="Correct answers (8 clears the level)">0/10</span><span class="chip tmr${S.settings.calm ? " calm" : ""}" title="Level time">${IC.clock}<b id="ktmr">0:00</b></span><span class="flame" id="k3Flame"></span>${POW("autowin") ? '<button class="btn gold" id="k3Win" style="min-height:38px;padding:6px 12px;font-size:13px">Clear level</button>' : ""}</div>\n <div class="stagewrap"><div class="xlscene k3scene" id="k3Scene"></div><div class="toast" id="toast" role="status"></div></div>\n <div class="qcard"><div class="qhead"><span class="ask" id="k3Ask"></span><span class="chip k3mode" id="k3Mode"></span></div><div class="k3fb" id="k3Fb" hidden></div><div class="qtext xlprompt k3prompt" id="k3Prompt"></div>\n <div class="reveal" id="k3Reveal" hidden></div><div class="k3w" id="k3W"></div><div class="k3act"><button class="btn ghost" id="k3Clr">Clear</button><button class="btn w" id="k3Chk">Check</button></div>\n <div class="hints"><button data-h="1">${IC.bulb}Hint 1 \xb7 5${IC.coin}</button><button data-h="2">Hint 2 \xb7 10${IC.coin}</button><button data-h="3">Hint 3 \xb7 15${IC.coin}</button></div><div class="hintbox" id="k3Hint" hidden></div></div></section>`),
    ($("#k3Back").onclick = () => go("k3" + e)),
    $$(".hints button").forEach((e) => (e.onclick = () => k3Hint(+e.dataset.h))));
  const o = $("#k3Win");
  (o &&
    (o.onclick = () => {
      ((KRUN.correct = 10), (KRUN.qn = 10), (KRUN.res = Array(10).fill(!0)), k3End());
    }),
    ($("#k3Clr").onclick = () => {
      KRUN && KRUN.cur && !KRUN.cur.done && (KRUN.cur.ui.clear(), sfx("click"));
    }),
    ($("#k3Chk").onclick = () => k3Submit()),
    AU.music(2 * K3IDS.indexOf(e) + (t % 3)),
    clockStart(KRUN, "ktmr"),
    k3Next());
}
function k3Hud(){if(!KRUN)return;$('#k3Hearts').innerHTML=[0,1,2].map(i=>`<span class="${i<KRUN.hearts?'':'lost'}">${IC.heart}</span>`).join('');
 $('#k3Dots').innerHTML=Array.from({length:10},(_,i)=>`<i class="${KRUN.res[i]===undefined?'':KRUN.res[i]?'y':'n'}${i===3||i===7?' fbdot':''}"></i>`).join('');$('#k3Score').textContent=KRUN.correct+'/10';
 $('#k3Flame').innerHTML=KRUN.streak>1?`${IC.flame}<span>${KRUN.streak}</span>`:'';$$('.k3play .hints button').forEach(b=>b.disabled=!KRUN.cur||KRUN.cur.done||+b.dataset.h!==KRUN.hint+1)}
/* restored from the live build */
function k3Q(e, t, a) {
  const s = K3[e].lv[t],
    o = s.q[a];
  return {
    ...o,
    w: o.fb ? "pick" : o.w || s.w,
    states: o.states || s.states,
    bins: o.bins || s.bins,
    cs: o.ci ? 0 : null != o.cs ? o.cs : s.cs,
    lvl: t,
    i: a,
  };
}
function k3Next(){if(!KRUN)return;hideFB();if(KRUN.qn>=10)return k3End();const g=KRUN.g,lv=KRUN.lv,G=K3[g];
 const q=k3Q(g,lv,KRUN.qn);KRUN.qn++;KRUN.hint=0;$('#k3Hint').hidden=true;$('#k3Hint').innerHTML='';
 KRUN.cur={q,done:false,t0:performance.now()};$('#k3Ask').textContent=`Question ${KRUN.qn} of 10`;$('#k3Mode').textContent=K3W[q.w];
 const fb=$('#k3Fb');fb.hidden=!q.fb;if(q.fb)fb.innerHTML=`<span>${IC.clock}</span><div><b>Spaced repetition flashback</b><br>From Level ${q.fb[0]}: ${q.fb[1]}</div>`;
 const sp=g==='spa'&&q.say&&('speechSynthesis'in window);$('#k3Prompt').innerHTML=q.p+(sp?` <button class="k3say" id="k3Say" aria-label="Listen in Spanish">🔊</button>`:'');if(sp)$('#k3Say').onclick=()=>say(q.say);
 const rv=$('#k3Reveal');rv.hidden=!POW('reveal');if(POW('reveal'))rv.innerHTML='Answer (admin reveal): <b>'+esc(k3AnsText(q))+'</b>';
 k3Stage(q);const W=$('#k3W');W.innerHTML='';KRUN.cur.ui=K3UI[q.w](q,W);$('#k3Chk').disabled=false;$('#k3Clr').disabled=false;
 document.onkeydown=e=>{if(e.key==='Enter'&&!e.target.matches('input,textarea,select')){e.preventDefault();k3Submit()}else if(/^[1-6]$/.test(e.key)&&!e.target.matches('input')&&KRUN.cur.ui.key)KRUN.cur.ui.key(+e.key-1)};
 k3Hud();const f=$('input',W);if(f&&matchMedia('(pointer:fine)').matches)f.focus()}
/* restored from the live build */
function k3Stage(e, t) {
  const a = $("#k3Scene");
  if (!a || !KRUN) return;
  const s = KRUN.g;
  if (e.fb) {
    const t = e.fb[0] - 1,
      o = K3[s].lv[t] && K3[s].lv[t].q.find((e) => !e.fb),
      r = (K3ART[s][t] || (() => ""))(o ? { ...o, lvl: t } : {}, void 0, !0);
    a.innerHTML = `<div class="k3flash"><div class="k3old">${r}</div><div class="k3reel"><b>\u27f2 FLASHBACK</b><span>Level ${e.fb[0]} \xb7 ${K3[s].lv[t].t}</span></div></div>`;
  } else ((a.innerHTML = (K3ART[s][e.lvl] || (() => ""))(e, t)), "hotspot" === e.w && k3HotWire(e));
}
function k3HotWire(q){$$('#k3Scene [data-hot]').forEach(el=>{el.classList.add('k3hot');el.setAttribute('tabindex','0');el.setAttribute('role','button');
 const act=()=>{if(!KRUN||KRUN.cur.done)return;$$('#k3Scene [data-hot]').forEach(x=>x.classList.remove('sel'));el.classList.add('sel');KRUN.cur.ui.set(el.dataset.hot,el.dataset.lab||el.dataset.hot);sfx('click')};
 el.onclick=act;el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();act()}}})}
/* ---- answer text for feedback ---- */
function k3AnsText(q){const a=q.a;switch(q.w){case'tf':return a?'True':'False';case'multi':return a.join(', ');case'build':return(q.slots?q.slots.map((s,i)=>s+': '+a[i]).join(' · '):a.join(' '));
 case'order':return q.o.join(' → ');case'sort':return(q.bins||[]).map((b,i)=>b+': '+q.o.filter(x=>x[1]===i).map(x=>x[0]).join(', ')).join(' · ');case'match':return q.o.map(x=>k3Plain(x[0])+' = '+x[1]).join(' · ');
 case'gap':return a.join(' … ');case'cycle':{const st=q.states;return q.o.map(x=>x[0].replace('___','…')+' → '+st[x[1]]).join(' · ')}case'type':return Array.isArray(a)?a[0]:a;
 case'slider':case'stepper':return Array.isArray(a)?`any value from ${k3Fmt(q,a[0])} to ${k3Fmt(q,a[1])}`:k3Fmt(q,a);case'hotspot':return q.al||a;default:return a}}
const k3Plain=s=>String(s).startsWith('sym:')?(SYMN[s.slice(4)]||s)+' symbol':s;
function k3Fmt(q,v){if(q.clock){const h=Math.floor(v/60)||12,mm=v%60;return h+':'+String(mm).padStart(2,'0')}const d=(String(q.step||1).split('.')[1]||'').length;return(+v).toFixed(d)+(q.u?' '+q.u:'')}
/* restored from the live build */
const K3UI = {
  pick(e, t, a) {
    const s = R.shuffle(e.o);
    let o = null;
    t.innerHTML = `<div class="k3opts${a ? " k3odd" : ""}">${s.map((e, t) => `<button class="k3opt" data-o="${esc(e)}"><span class="k3k">${t + 1}</span><span>${k3Tile(e)}</span></button>`).join("")}</div>`;
    const r = $$(".k3opt", t),
      i = (e) => {
        e.disabled ||
          KRUN.cur.done ||
          (r.forEach((e) => e.classList.remove("sel")), e.classList.add("sel"), (o = e.dataset.o), sfx("click"));
      };
    return (
      r.forEach((e) => (e.onclick = () => i(e))),
      {
        get: () => o,
        ready: () => null != o,
        clear() {
          ((o = null), r.forEach((e) => e.classList.remove("sel")));
        },
        check: (t) => t === e.a,
        key: (e) => r[e] && i(r[e]),
        show() {
          r.forEach((t) => {
            ((t.disabled = !0),
              t.dataset.o === e.a ? t.classList.add("ok") : t.dataset.o === o && t.classList.add("bad"));
          });
        },
        hint3() {
          const t = r.filter((t) => t.dataset.o !== e.a && !t.disabled);
          return (
            R.shuffle(t)
              .slice(0, Math.max(1, t.length - 1))
              .forEach((e) => {
                ((e.disabled = !0), e.classList.add("gone"), e.dataset.o === o && (o = null));
              }),
            "Two wrong answers have been removed."
          );
        },
      }
    );
  },
  odd: (e, t) => K3UI.pick(e, t, !0),
  tf(e, t) {
    let a = null;
    t.innerHTML =
      '<div class="k3tf"><button class="k3opt tfT" data-v="1"><span class="k3k">1</span><b>TRUE</b></button><button class="k3opt tfF" data-v="0"><span class="k3k">2</span><b>FALSE</b></button></div>';
    const s = $$(".k3opt", t),
      o = (e) => {
        KRUN.cur.done ||
          (s.forEach((e) => e.classList.remove("sel")),
          e.classList.add("sel"),
          (a = "1" === e.dataset.v),
          sfx("click"));
      };
    return (
      s.forEach((e) => (e.onclick = () => o(e))),
      {
        get: () => a,
        ready: () => null !== a,
        clear() {
          ((a = null), s.forEach((e) => e.classList.remove("sel")));
        },
        check: (t) => t === e.a,
        key: (e) => s[e] && o(s[e]),
        show() {
          s.forEach((t) => {
            ((t.disabled = !0),
              ("1" === t.dataset.v) === e.a
                ? t.classList.add("ok")
                : t.classList.contains("sel") && t.classList.add("bad"));
          });
        },
        hint3: () => "<b>Think it through:</b> " + e.e,
      }
    );
  },
  multi(e, t) {
    const a = R.shuffle(e.o),
      s = new Set(),
      o = new Set();
    t.innerHTML = `<p class="k3note">Select every correct answer, then press Check.</p><div class="k3opts k3multi">${a.map((e, t) => `<button class="k3opt" data-o="${esc(e)}" aria-pressed="false"><span class="k3box"></span><span>${k3Tile(e)}</span></button>`).join("")}</div>`;
    const r = $$(".k3opt", t),
      i = (e) => {
        if (KRUN.cur.done || e.disabled || o.has(e.dataset.o)) return;
        const t = e.dataset.o;
        (s.has(t) ? s.delete(t) : s.add(t),
          e.classList.toggle("sel", s.has(t)),
          e.setAttribute("aria-pressed", s.has(t)),
          sfx("click"));
      };
    return (
      r.forEach((e) => (e.onclick = () => i(e))),
      {
        get: () => [...s],
        ready: () => s.size > 0,
        clear() {
          (s.clear(),
            o.forEach((e) => s.add(e)),
            r.forEach((e) => {
              (e.classList.toggle("sel", s.has(e.dataset.o)), e.setAttribute("aria-pressed", s.has(e.dataset.o)));
            }));
        },
        key: (e) => r[e] && i(r[e]),
        check: (t) => t.length === e.a.length && e.a.every((e) => t.includes(e)),
        show() {
          r.forEach((t) => {
            ((t.disabled = !0),
              e.a.includes(t.dataset.o) ? t.classList.add("ok") : s.has(t.dataset.o) && t.classList.add("bad"));
          });
        },
        hint3() {
          const t = r.find((t) => e.a.includes(t.dataset.o) && !o.has(t.dataset.o));
          t && (o.add(t.dataset.o), s.add(t.dataset.o), t.classList.add("sel", "locked"));
          const a = r.find((t) => !e.a.includes(t.dataset.o) && !t.disabled);
          return (
            a && ((a.disabled = !0), a.classList.add("gone"), s.delete(a.dataset.o)),
            "One right answer is ticked for you and one wrong answer is removed."
          );
        },
      }
    );
  },
  type(e, t) {
    t.innerHTML = `<label class="k3type"><span class="vh">Your answer</span><input id="k3In" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${esc(e.ph || "Type here")}"></label>${K3[KRUN.g].lv[KRUN.lv].acc ? `<div class="k3acc">${["\xe1", "\xe9", "\xed", "\xf3", "\xfa", "\xf1", "\xfc"].map((e) => `<button data-c="${e}">${e}</button>`).join("")}</div>` : ""}`;
    const a = $("#k3In", t);
    ($$(".k3acc button", t).forEach(
      (e) =>
        (e.onclick = () => {
          ((a.value += e.dataset.c), a.focus());
        }),
    ),
      (a.onkeydown = (e) => {
        "Enter" === e.key && (e.preventDefault(), k3Submit());
      }));
    const s = Array.isArray(e.a) ? e.a : [e.a];
    return {
      get: () => a.value,
      ready: () => "" !== a.value.trim(),
      clear() {
        a.value = "";
      },
      check: (t) => s.some((a) => (e.cs ? k3sub(t) === k3sub(a) : k3n(t) === k3n(a))),
      show(e) {
        ((a.disabled = !0), a.classList.add(e ? "ok" : "bad"));
      },
      hint3() {
        const e = s[0],
          t = Math.max(1, Math.ceil(e.length / 2));
        return `It starts with <b>${esc(e.slice(0, t))}</b>\u2026 (${e.length} characters)`;
      },
    };
  },
  slider(e, t, a) {
    const s = e.min,
      o = e.max,
      r = e.step || 1;
    let i = null != e.start ? e.start : s;
    const l = (t) => k3Fmt(e, t);
    t.innerHTML = a
      ? `<div class="k3step"><button class="k3pm" data-d="-1" aria-label="Less">\u2212</button><output id="k3V">${i}</output><button class="k3pm" data-d="1" aria-label="More">+</button></div>`
      : `<div class="k3slide"><output id="k3V" ${e.clock ? 'class="vh"' : ""}>${l(i)}</output><input type="range" id="k3R" min="${s}" max="${o}" step="${r}" value="${i}" aria-label="${esc(e.u || "value")}"><div class="k3ends"><span>${l(s)}</span><button class="k3pm" data-d="-1" aria-label="Nudge down">\u2212</button><button class="k3pm" data-d="1" aria-label="Nudge up">+</button><span>${l(o)}</span></div></div>`;
    const n = $("#k3V", t),
      c = $("#k3R", t),
      h = (t) => {
        ((i = Math.min(o, Math.max(s, Math.round(t / r) * r))),
          (i = +i.toFixed(4)),
          (n.textContent = a ? i : l(i)),
          c && (c.value = i),
          k3Stage(e, i));
      };
    return (
      c && (c.oninput = () => h(+c.value)),
      $$(".k3pm", t).forEach(
        (e) =>
          (e.onclick = () => {
            (h(i + +e.dataset.d * r), sfx("click"));
          }),
      ),
      k3Stage(e, i),
      {
        get: () => i,
        ready: () => !0,
        clear: () => h(null != e.start ? e.start : s),
        check: (t) => (Array.isArray(e.a) ? t >= e.a[0] - 1e-9 && t <= e.a[1] + 1e-9 : Math.abs(t - e.a) < r / 2),
        show() {
          ($$("button,input", t).forEach((e) => (e.disabled = !0)), n.classList.remove("vh"));
        },
        hint3() {
          const t = Array.isArray(e.a) ? (e.a[0] + e.a[1]) / 2 : e.a,
            a = Math.max(2 * r, 0.12 * (o - s)),
            i = Math.max(s, Math.round((t - (a * R.int(3, 7)) / 10) / r) * r),
            n = Math.min(o, i + Math.round(a / r) * r);
          return `The answer is between <b>${l(i)}</b> and <b>${l(n)}</b>.`;
        },
      }
    );
  },
  stepper: (e, t) => K3UI.slider(e, t, !0),
  build(e, t) {
    const a = R.shuffle(e.o),
      s = [],
      o = e.slots ? e.slots.length : 0;
    let r = 0;
    t.innerHTML = `<div class="k3fx"><span class="k3fxl">fx</span><div class="k3bar" id="k3Bar"></div></div><div class="k3toks">${a.map((e) => `<button class="k3tok" data-t="${esc(e)}">${esc(e)}</button>`).join("")}</div><p class="k3note">${o ? "Tap blocks to fill each slot. Tap a placed block to remove it." : "Tap blocks in order to build the answer. Tap a placed block to remove it."}</p>`;
    const i = $("#k3Bar", t),
      l = () => {
        ((i.innerHTML = o
          ? e.slots
              .map(
                (e, t) =>
                  `<span class="k3slot ${null != s[t] ? "full" : ""} ${t < r ? "locked" : ""}" data-i="${t}"><small>${esc(e)}</small><b>${null != s[t] ? esc(s[t]) : "?"}</b></span>`,
              )
              .join("")
          : s.length
            ? s
                .map(
                  (e, t) => `<span class="k3slot full ${t < r ? "locked" : ""}" data-i="${t}"><b>${esc(e)}</b></span>`,
                )
                .join("")
            : '<span class="muted">Your answer appears here</span>'),
          $$(".k3slot.full", i).forEach(
            (e) =>
              (e.onclick = () => {
                const t = +e.dataset.i;
                t < r || KRUN.cur.done || (o ? (s[t] = null) : s.splice(t, 1), l(), sfx("click"));
              }),
          ));
      };
    ($$(".k3tok", t).forEach(
      (e) =>
        (e.onclick = () =>
          ((e) => {
            if (!KRUN.cur.done) {
              if (o) {
                const t = [...Array(o).keys()].find((e) => null == s[e]);
                if (void 0 === t) return toast("All slots are full. Tap a block to remove it.");
                s[t] = e;
              } else {
                if (s.length >= 12) return;
                s.push(e);
              }
              (l(), sfx("click"));
            }
          })(e.dataset.t)),
    ),
      l());
    const n = () => (o ? [...Array(o).keys()].map((e) => s[e]) : s.slice());
    return {
      get: n,
      ready: () => (o ? n().every((e) => null != e) : s.length > 0),
      clear() {
        if (o) for (let e = r; e < o; e++) s[e] = null;
        else s.length = r;
        l();
      },
      check: (t) =>
        [e.a, ...(e.alts || [])].some((a) =>
          e.eq
            ? ((e, t) => {
                const a = (e) =>
                    e
                      .join("\x01")
                      .split("\u2192")
                      .map((e) =>
                        e
                          .split("\x01")
                          .filter((e) => e && "+" !== e)
                          .map(k3n)
                          .sort()
                          .join("|"),
                      ),
                  s = a(e),
                  o = a(t);
                return e.length === t.length && s.length === o.length && s.every((e, t) => e === o[t]);
              })(t, a)
            : ((e, t) => e.length === t.length && e.every((e, a) => k3n(e) === k3n(t[a])))(t, a),
        ),
      show() {
        $$(".k3tok", t).forEach((e) => (e.disabled = !0));
      },
      hint3() {
        if (o) for (let t = 0; t < o; t++) s[t] = 0 === t ? e.a[0] : t < r ? s[t] : null;
        else ((s.length = 0), s.push(e.a[0]));
        return ((r = 1), l(), `The first block, <b>${esc(e.a[0])}</b>, is placed for you.`);
      },
    };
  },
  order(e, t) {
    const a = e.o.slice();
    let s = R.shuffle(a);
    for (; a.length > 1 && s.every((e, t) => e === a[t]);) s = R.shuffle(a);
    const o = [];
    let r = 0;
    t.innerHTML = `<p class="k3note">${e.dir || "Tap the items in the correct order."}</p><ol class="k3seq" id="k3Seq"></ol><div class="k3pool" id="k3Pool"></div>`;
    const i = $("#k3Seq", t),
      l = $("#k3Pool", t),
      n = () => {
        ((i.innerHTML = a
          .map(
            (e, t) =>
              `<li class="${null != o[t] ? "full" : ""} ${t < r ? "locked" : ""}" data-i="${t}"><span class="k3k">${t + 1}</span>${null != o[t] ? esc(o[t]) : '<span class="muted">\u2026</span>'}</li>`,
          )
          .join("")),
          (l.innerHTML = s.map((e, t) => `<button class="k3tok" data-i="${t}">${esc(e)}</button>`).join("")),
          $$("li.full", i).forEach(
            (e) =>
              (e.onclick = () => {
                const t = +e.dataset.i;
                t < r || KRUN.cur.done || (s.push(o[t]), o.splice(t, 1), n(), sfx("click"));
              }),
          ),
          $$(".k3tok", l).forEach(
            (e) =>
              (e.onclick = () => {
                KRUN.cur.done || (o.push(s.splice(+e.dataset.i, 1)[0]), n(), sfx("click"));
              }),
          ));
      };
    return (
      n(),
      {
        get: () => o.slice(),
        ready: () => o.length === a.length,
        clear() {
          for (; o.length > r;) s.push(o.pop());
          n();
        },
        check: (e) => e.every((e, t) => e === a[t]),
        show() {
          $$("li", i).forEach((e, t) => e.classList.add(o[t] === a[t] ? "ok" : "bad"));
        },
        hint3() {
          for (; o.length;) s.push(o.pop());
          for (let e = 0; e < Math.min(2, a.length - 1); e++) (o.push(a[e]), s.splice(s.indexOf(a[e]), 1));
          return ((r = o.length), n(), "The first two are locked in place.");
        },
      }
    );
  },
  sort(e, t) {
    const a = e.bins,
      s = R.shuffle(e.o.map((e) => e[0])),
      o = {},
      r = new Set();
    let i = null;
    t.innerHTML = `<p class="k3note">Tap an item, then tap the group it belongs in.</p><div class="k3pool" id="k3Pool"></div><div class="k3bins" style="--n:${a.length}">${a.map((e, t) => `<div class="k3bin" data-b="${t}" tabindex="0" role="button"><b>${esc(e)}</b><div class="k3in"></div></div>`).join("")}</div>`;
    const l = $("#k3Pool", t),
      n = $$(".k3bin", t),
      c = () => {
        ((l.innerHTML =
          s
            .filter((e) => null == o[e])
            .map((e) => `<button class="k3tok ${i === e ? "sel" : ""}" data-t="${esc(e)}">${esc(e)}</button>`)
            .join("") || '<span class="muted">All sorted. Press Check.</span>'),
          n.forEach((e, t) => {
            $(".k3in", e).innerHTML = s
              .filter((e) => o[e] === t)
              .map((e) => `<button class="k3tok in ${r.has(e) ? "locked" : ""}" data-t="${esc(e)}">${esc(e)}</button>`)
              .join("");
          }),
          $$(".k3tok", t).forEach(
            (e) =>
              (e.onclick = (t) => {
                if ((t.stopPropagation(), KRUN.cur.done)) return;
                const a = e.dataset.t;
                if (null != o[a])
                  if (null != i && i !== a) ((o[i] = o[a]), (i = null));
                  else {
                    if (r.has(a)) return;
                    (delete o[a], (i = a));
                  }
                else i = i === a ? null : a;
                (c(), sfx("click"));
              }),
          ));
      };
    (n.forEach((e) => {
      const t = () => {
        null == i || KRUN.cur.done || ((o[i] = +e.dataset.b), (i = null), c(), sfx("click"));
      };
      ((e.onclick = t),
        (e.onkeydown = (e) => {
          ("Enter" !== e.key && " " !== e.key) || (e.preventDefault(), t());
        }));
    }),
      c());
    const h = Object.fromEntries(e.o.map((e) => [e[0], e[1]]));
    return {
      get: () => ({ ...o }),
      ready: () => s.every((e) => null != o[e]),
      clear() {
        (s.forEach((e) => {
          r.has(e) || delete o[e];
        }),
          (i = null),
          c());
      },
      check: (e) => s.every((t) => e[t] === h[t]),
      show() {
        $$(".k3tok.in", t).forEach((e) => e.classList.add(o[e.dataset.t] === h[e.dataset.t] ? "ok" : "bad"));
      },
      hint3: () => (
        R.shuffle(s.filter((e) => !r.has(e)))
          .slice(0, 2)
          .forEach((e) => {
            ((o[e] = h[e]), r.add(e));
          }),
        (i = null),
        c(),
        "Two items are sorted into the right group for you."
      ),
    };
  },
  match(e, t) {
    const a = e.o.map((e) => e[0]),
      s = R.shuffle(e.o.map((e) => e[1])),
      o = {},
      r = new Set(),
      i = ["#E8590C", "#1971C2", "#2F9E44", "#AE3EC9", "#C2255C", "#0C8599"];
    let l = null;
    t.innerHTML =
      '<p class="k3note">Tap a card on the left, then its partner on the right.</p><div class="k3match"><div class="k3col" id="k3L"></div><div class="k3col" id="k3Rc"></div></div>';
    const n = $("#k3L", t),
      c = $("#k3Rc", t),
      h = (e) => i[a.indexOf(e) % i.length],
      d = () => {
        ((n.innerHTML = a
          .map(
            (e) =>
              `<button class="k3card ${l === e ? "sel" : ""} ${null != o[e] ? "paired" : ""}" data-l="${esc(e)}" style="${null != o[e] ? "--pc:" + h(e) : ""}">${k3Tile(e)}</button>`,
          )
          .join("")),
          (c.innerHTML = s
            .map((e) => {
              const t = a.find((t) => o[t] === e);
              return `<button class="k3card ${null != t ? "paired" : ""}" data-r="${esc(e)}" style="${null != t ? "--pc:" + h(t) : ""}">${esc(e)}</button>`;
            })
            .join("")),
          $$("[data-l]", n).forEach(
            (e) =>
              (e.onclick = () => {
                if (KRUN.cur.done) return;
                const t = e.dataset.l;
                r.has(t) || (null != o[t] && delete o[t], (l = l === t ? null : t), d(), sfx("click"));
              }),
          ),
          $$("[data-r]", c).forEach(
            (e) =>
              (e.onclick = () => {
                if (KRUN.cur.done) return;
                const t = e.dataset.r,
                  s = a.find((e) => o[e] === t);
                if (null != l) {
                  if (null != s) {
                    if (r.has(s)) return;
                    delete o[s];
                  }
                  ((o[l] = t), (l = null), d(), sfx("click"));
                } else null == s || r.has(s) || (delete o[s], d());
              }),
          ));
      };
    d();
    const p = Object.fromEntries(e.o);
    return {
      get: () => ({ ...o }),
      ready: () => a.every((e) => null != o[e]),
      clear() {
        (a.forEach((e) => {
          r.has(e) || delete o[e];
        }),
          (l = null),
          d());
      },
      check: (e) => a.every((t) => e[t] === p[t]),
      show() {
        $$("[data-l]", n).forEach((e) => e.classList.add(o[e.dataset.l] === p[e.dataset.l] ? "ok" : "bad"));
      },
      hint3: () => (
        R.shuffle(a.filter((e) => !r.has(e)))
          .slice(0, 2)
          .forEach((e) => {
            (Object.keys(o).forEach((t) => {
              o[t] !== p[e] || r.has(t) || delete o[t];
            }),
              (o[e] = p[e]),
              r.add(e));
          }),
        (l = null),
        d(),
        "Two pairs are matched for you."
      ),
    };
  },
  gap(e, t) {
    let a = 0;
    const s = esc(e.g).replace(/___/g, () => {
      const t = a++;
      return `<select class="k3sel" data-i="${t}" aria-label="Gap ${t + 1}"><option value="">\u2026</option>${R.shuffle(
        e.o[t],
      )
        .map((e) => `<option>${esc(e)}</option>`)
        .join("")}</select>`;
    });
    t.innerHTML = `<p class="k3gap">${s}</p><p class="k3note">Choose a word for every gap, then press Check.</p>`;
    const o = $$(".k3sel", t);
    o.forEach((e) => (e.onchange = () => sfx("click")));
    let r = 0;
    return {
      get: () => o.map((e) => e.value),
      ready: () => o.every((e) => e.value),
      clear() {
        o.forEach((e, t) => {
          t >= r && (e.value = "");
        });
      },
      check: (t) => t.every((t, a) => t === e.a[a]),
      show() {
        o.forEach((t, a) => {
          ((t.disabled = !0), t.classList.add(t.value === e.a[a] ? "ok" : "bad"));
        });
      },
      hint3: () => ((o[0].value = e.a[0]), (o[0].disabled = !0), (r = 1), `The first gap is <b>${esc(e.a[0])}</b>.`),
    };
  },
  cycle(e, t) {
    const a = e.states,
      s = e.o.map(() => -1),
      o = new Set();
    t.innerHTML = `<p class="k3note">Tap each button to flip it through: ${a.map(esc).join(" / ")}.</p><div class="k3cyc">${e.o.map((e, t) => `<div class="k3crow"><span>${esc(e[0])}</span><button class="k3cb" data-i="${t}">?</button></div>`).join("")}</div>`;
    const r = $$(".k3cb", t),
      i = () =>
        r.forEach((e, t) => {
          ((e.textContent = s[t] < 0 ? "?" : a[s[t]]),
            (e.className = "k3cb" + (s[t] < 0 ? "" : " set s" + s[t]) + (o.has(t) ? " locked" : "")));
        });
    return (
      r.forEach(
        (e, t) =>
          (e.onclick = () => {
            KRUN.cur.done || o.has(t) || ((s[t] = (s[t] + 1) % a.length), i(), sfx("click"));
          }),
      ),
      {
        get: () => s.slice(),
        ready: () => s.every((e) => e >= 0),
        clear() {
          (s.forEach((e, t) => {
            o.has(t) || (s[t] = -1);
          }),
            i());
        },
        check: (t) => t.every((t, a) => t === e.o[a][1]),
        show() {
          r.forEach((t, a) => {
            ((t.disabled = !0), t.classList.add(s[a] === e.o[a][1] ? "ok" : "bad"));
          });
        },
        hint3() {
          const t = Math.max(1, Math.floor(e.o.length / 2));
          return (
            e.o.forEach((e, a) => {
              a < t && ((s[a] = e[1]), o.add(a));
            }),
            i(),
            t > 1 ? `The first ${t} are set for you.` : "The first one is set for you."
          );
        },
      }
    );
  },
  hotspot(e, t) {
    let a = null,
      s = "";
    return (
      (t.innerHTML =
        '<div class="k3hotbox"><span class="k3pt">\ud83d\udc46</span><span id="k3HotSel">Tap the picture to choose.</span></div>'),
      {
        get: () => a,
        ready: () => null != a,
        set(e, t) {
          ((a = e), (s = t), ($("#k3HotSel").innerHTML = "You chose: <b>" + esc(t) + "</b>. Press Check."));
        },
        clear() {
          ((a = null),
            $$("#k3Scene [data-hot]").forEach((e) => e.classList.remove("sel")),
            ($("#k3HotSel").textContent = "Tap the picture to choose."));
        },
        check: (t) => t === e.a,
        show(t) {
          $$("#k3Scene [data-hot]").forEach((t) => {
            (t.classList.remove("k3hot"),
              t.dataset.hot === e.a ? t.classList.add("right") : t.dataset.hot === a && t.classList.add("wrong"));
          });
        },
        hint3() {
          const t = [...new Set($$("#k3Scene [data-hot]").map((e) => e.dataset.hot))].filter((t) => t !== e.a),
            a = R.shuffle([e.a, R.pick(t)]);
          return (
            $$("#k3Scene [data-hot]").forEach((e) => {
              a.includes(e.dataset.hot) && e.classList.add("flash");
            }),
            "The answer is one of the two flashing parts of the picture."
          );
        },
      }
    );
  },
};
const SYMN={cell:'cell',battery:'battery',lamp:'lamp',swo:'open switch',swc:'closed switch',A:'ammeter',V:'voltmeter',motor:'motor',buzzer:'buzzer',res:'resistor'};
function k3Tile(o){o=String(o);if(o.startsWith('sym:')&&K3ART.sym)return`<span class="k3sym">${K3ART.sym(o.slice(4))}</span>`;return esc(o)}
/* ---- checking ---- */
function k3Submit(){if(!KRUN)return;const c=KRUN.cur;if(!c||c.done)return;const ui=c.ui;if(!ui.ready())return toast(c.q.w==='hotspot'?'Tap the picture first':c.q.w==='multi'?'Select at least one answer':['sort','match','order','cycle','gap','build'].includes(c.q.w)?'Finish placing everything first':'Choose an answer first');
 const q=c.q,v=ui.get(),ok=!!ui.check(v);c.done=true;document.onkeydown=null;ui.show(ok);$('#k3Chk').disabled=true;$('#k3Clr').disabled=true;
 S.stats.answered++;if(ok)S.stats.correct++;NET.track('answer',{game:KRUN.g,stage:q.fb?q.fb[0]-1:KRUN.lv,tag:(q.fb?'fb':'q')+(q.i+1),ok,ms:Math.round(performance.now()-c.t0),review:!!q.fb,hint:KRUN.hint});
 KRUN.res.push(ok);const L=K3[KRUN.g].lv[KRUN.lv],G=K3[KRUN.g];const sc=$('#k3Scene');
 if(ok){KRUN.correct++;KRUN.streak++;S.coins+=3+(KRUN.streak>=3?1:0);addXP(10);sfx('good');sfx('coin');if(KRUN.streak>S.stats.bestStreak)S.stats.bestStreak=KRUN.streak;
  burstEl($('#k3Prompt'),20,[L.c1||G.c1,L.c2||G.c2,'#fff']);toast(R.pick(G.cheers||['Correct!','Brilliant!','Spot on!','Exactly right!']));sc.classList.add('k3good');setTimeout(()=>sc.classList.remove('k3good'),900);save();updTop();k3Hud();setTimeout(k3Next,1250)}
 else{KRUN.streak=0;addXP(3);if(!POW('hearts'))KRUN.hearts=Math.max(0,KRUN.hearts-1);sfx('bad');sc.classList.remove('shake','k3bad');void sc.offsetWidth;sc.classList.add('shake','k3bad');save();k3Hud();
  setTimeout(()=>k3Feedback(q,()=>{if(!KRUN)return;if(KRUN.hearts<=0)return k3End(true);k3Next()}),500)}}
function k3Feedback(q,cb){hideFB();const L=K3[KRUN.g].lv[KRUN.lv],G=K3[KRUN.g];const sh=H(`<div class="sheet" id="fbSheet"><div role="dialog" aria-label="Feedback"><h3>${KRUN.hearts>0?'Not quite, you lost a heart':'Out of hearts!'}</h3>
 <p style="margin:4px 0;font-size:18px">Correct answer: <b>${esc(k3AnsText(q))}</b></p><p style="margin:6px 0">${q.e}</p><button class="btn w" id="fbNext">${KRUN.hearts>0?'Next question':'See results'}</button></div></div>`);
 sh.style.cssText=`--w1:${L.c1||G.c1};--w2:${L.c2||G.c2}`;document.body.append(sh);const b=$('#fbNext');b.focus();b.onclick=()=>{hideFB();cb()}}
function k3Hint(h){if(!KRUN||!KRUN.cur||KRUN.cur.done||h!==KRUN.hint+1)return;const cost=[0,5,10,15][h];if(!spend(cost))return toast('Not enough coins yet. Answer questions to earn more!');updTop();
 KRUN.hint=h;sfx('click');const q=KRUN.cur.q,hb=$('#k3Hint');hb.hidden=false;
 if(h<3)hb.innerHTML+=(h>1?'<br>':'')+`<b>Hint ${h}:</b> ${(q.h||[])[h-1]||K3[KRUN.g].lv[KRUN.lv].rule}`;else hb.innerHTML+=`<br><b>Hint 3:</b> ${KRUN.cur.ui.hint3()}`;k3Hud();save()}
/* ---- end of mission ---- */
function k3End(outOfHearts){const g=KRUN.g,lv=KRUN.lv,G=K3[g],L=G.lv[lv],x=K3S(g);const n=KRUN.correct,pass=!outOfHearts&&n>=8;const ms=clockStop(KRUN);const tr=pass?bestTime(g+lv,ms):{prev:(S.times||{})[g+lv],nb:false};const st=n>=10?3:n>=9?2:pass?1:0;const first=pass&&!x.cleared[lv];
 x.best[lv]=Math.max(x.best[lv],n);if(pass){x.cleared[lv]=true;x.stars[lv]=Math.max(x.stars[lv],st);S.coins+=first?30:10;addXP(first?100:30);if(st===3)badge('perfect');NET.track('clear',{game:g,stage:lv,ms,data:{stars:st,acc:n*10}})}
 if(outOfHearts)NET.track('training',{game:g,stage:lv});save();k3Leave();sfx(pass?'crystal':'level');if(pass)setTimeout(()=>FX.burst(innerWidth/2,innerHeight/2.4,120,[L.c1||G.c1,L.c2||G.c2,'#FFC531','#fff']),200);
 const nextOk=pass&&lv<9;
 modal(`<div style="--w1:${L.c1||G.c1};--w2:${L.c2||G.c2};text-align:center"><p class="eyebrow">Level ${lv+1} · ${L.n}</p><h2>${pass?(st===3?'Perfect mission!':'Level cleared!'):outOfHearts?'Out of hearts':'So close!'}</h2>${k3Banner(g,lv,84)}
 <p style="font-size:20px;margin:6px 0"><b>${n} of 10</b> correct</p>${pass?timeLine(ms,tr):`<p class="timeline">${IC.clock}<span>Time <b>${fmtT(ms)}</b></span></p>`}<div class="stars">${[0,1,2].map(i=>IC.star.replace('<svg',`<svg class="${i<st?'':'off'}"`)).join('')}</div>
 <p>${pass?(first?'+30 coins · +100 XP. '+(lv<9?'Level '+(lv+2)+' is now open!':`You finished ${G.name}!`):'+10 coins · +30 XP for clearing it again.')+(st<3?' Get all 10 right for 3 stars.':''):outOfHearts?'You used all 3 hearts. Visit the Training Room to go over the key idea, then try again.':'You need 8 of 10 to clear this level. Have another go!'}</p>
 <div class="row" style="justify-content:center;flex-wrap:wrap"><button class="btn w" id="keMap">Back to the map</button>${nextOk?`<button class="btn" id="keNext">Next level</button>`:''}${!pass?'<button class="btn" id="keTrain">Training Room</button>':''}<button class="btn ghost" id="keAgain">Play again</button></div></div>`);
 $('#keMap').onclick=()=>go('k3'+g);const nx=$('#keNext');if(nx)nx.onclick=()=>k3Intro(g,lv+1);$('#keAgain').onclick=()=>k3Start(g,lv);const tb=$('#keTrain');if(tb)tb.onclick=()=>k3Training(g,lv)}
function k3Training(g,lv){const G=K3[g],L=G.lv[lv],ex=L.ex;
 modal(`<div style="--w1:${L.c1||G.c1};--w2:${L.c2||G.c2}"><p class="eyebrow">Training Room · Level ${lv+1}</p><h2>${L.t}</h2><div class="lesson-rule"><b>Core rule:</b> ${L.rule}</div>
 <div class="wexample" style="margin-top:10px"><p class="eyebrow">Worked example</p><p style="margin:4px 0"><b>Problem:</b> ${ex.p}</p><ol class="steps">${ex.s.map(s=>`<li>${s}</li>`).join('')}</ol><p style="margin:4px 0 0"><b>Correct answer:</b> ${ex.a}</p></div>
 <div class="row" style="margin-top:14px"><button class="btn w" id="trGo">Try the mission again</button><button class="btn ghost" id="trX">Back to the map</button></div></div>`);$('#trGo').onclick=()=>k3Start(g,lv);$('#trX').onclick=()=>go('k3'+g)}
