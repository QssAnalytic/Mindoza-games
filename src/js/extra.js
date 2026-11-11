/* restored from the live build */
function fruitBody(t, e, a, s) {
  const n = `url(#${e})`;
  switch (t) {
    case 1:
      return (
        `<path d="M50 30C68 20 87 32 85 52C83 73 64 90 50 94C36 90 17 73 15 52C13 32 32 20 50 30Z" fill="${n}"/>` +
        [
          [24, 46],
          [76, 46],
          [21, 60],
          [79, 60],
          [27, 76],
          [73, 76],
          [40, 86],
          [60, 86],
          [50, 90],
        ]
          .map(([t, e]) => `<ellipse cx="${t}" cy="${e}" rx="1.7" ry="2.5" fill="#FFE27A"/>`)
          .join("") +
        '<g fill="#2FA84F"><path d="M50 32C42 21 29 21 24 26C33 28 40 31 50 32Z"/><path d="M50 32C58 21 71 21 76 26C67 28 60 31 50 32Z"/><path d="M50 33C43 29 36 33 33 40C40 37 45 35 50 33Z"/><path d="M50 33C57 29 64 33 67 40C60 37 55 35 50 33Z"/></g><path d="M48 32Q48 20 53 13L56 15Q52 22 53 32Z" fill="#1E7A36"/>'
      );
    case 2:
      return `<path d="M58 15C40 26 21 44 21 64C21 84 40 94 60 92C74 90 83 82 81 76C76 70 74 60 76 46C78 32 71 21 65 15Z" fill="${n}"/><path d="M57 5h9l-1 11h-7Z" fill="#6B4A1E"/><circle cx="81" cy="77" r="3.2" fill="#6B4A1E"/><path d="M66 22C71 38 67 58 73 74" stroke="${a.d}" stroke-width="2.4" fill="none" opacity=".45" stroke-linecap="round"/>`;
    case 3:
      return (
        `<path d="M11 30H89A39 63 0 0 1 11 30Z" fill="#2E8B3E"/><path d="M16 30H84A34 57 0 0 1 16 30Z" fill="#DDF3B5"/><path d="M20 30H80A30 52 0 0 1 20 30Z" fill="${n}"/><path d="M11 30H89" stroke="#1F6B2D" stroke-width="3"/>` +
        [
          [28, 40],
          [72, 40],
          [34, 76],
          [66, 76],
          [50, 84],
          [22, 52],
          [78, 52],
        ]
          .map(([t, e]) => `<path d="M${t} ${e - 3}q2.6 3.2 0 6.4q-2.6-3.2 0-6.4Z" fill="#2A1A1F"/>`)
          .join("")
      );
    case 4:
      return `<path d="M38 31L35 15L43 22L50 10L57 22L65 15L62 31Z" fill="${a.d}"/><circle cx="50" cy="61" r="32" fill="${n}"/><path d="M40 31h20" stroke="${a.d}" stroke-width="3"/><path d="M27 42Q22 52 24 64" stroke="#fff" stroke-width="3" fill="none" opacity=".35" stroke-linecap="round"/>`;
    case 5:
      return (
        (hatBig(s)
          ? '<g fill="#2FA84F"><path d="M47 37L22 27L41 31Z" fill="#1E7A36"/><path d="M53 37L78 27L59 31Z" fill="#1E7A36"/></g>'
          : '<g fill="#2FA84F"><path d="M50 36L42 6L50 16L58 4L56 30Z"/><path d="M48 36L26 10L44 22Z"/><path d="M52 36L76 10L58 22Z"/><path d="M47 37L20 24L41 30Z" fill="#1E7A36"/><path d="M53 37L80 24L59 30Z" fill="#1E7A36"/></g>') +
        `\n  <clipPath id="${e}c"><ellipse cx="50" cy="64" rx="31" ry="29"/></clipPath><ellipse cx="50" cy="64" rx="31" ry="29" fill="${n}"/><g clip-path="url(#${e}c)" stroke="${a.d}" stroke-width="2" opacity=".55">${[-40, -24, -8, 8, 24, 40, 56].map((t) => `<path d="M${10 + t} 30L${70 + t} 100M${90 - t} 30L${30 - t} 100"/>`).join("")}</g>`
      );
    case 6:
      return `<path d="M50 33C60 22 85 25 85 52C85 77 67 93 50 88C33 93 15 77 15 52C15 25 40 22 50 33Z" fill="${n}"/><path d="M50 33Q49 21 55 14" stroke="#6B4A1E" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M55 22C60 12 72 12 76 16C71 23 62 25 55 22Z" fill="#2FA84F"/><path d="M26 44Q22 54 25 64" stroke="#fff" stroke-width="3" fill="none" opacity=".35" stroke-linecap="round"/>`;
    default:
      return (
        `<circle cx="50" cy="58" r="33" fill="${n}"/><path d="M50 22l3.5 5.5 6.5-1.8-2.6 6.3 5.4 3.6-6.5.8-.6 6.6-5.7-4.4-5.7 4.4-.6-6.6-6.5-.8 5.4-3.6-2.6-6.3 6.5 1.8z" fill="#1E2A6E"/><circle cx="50" cy="31.5" r="2.6" fill="#36459A"/>` +
        [
          [28, 70],
          [72, 72],
          [66, 40],
          [32, 42],
        ]
          .map(([t, e]) => `<circle cx="${t}" cy="${e}" r="1.3" fill="#fff" opacity=".45"/>`)
          .join("")
      );
  }
}
const OLD_SKIN_PRICES=[0,40,60,80,100,120,160];
function migrateSave(s){if(!s||s.fruitV)return s;let refund=0;s.owned=(s.owned||[]).filter(id=>{const m=/^skin(\d)$/.exec(id);if(m&&+m[1]>0){refund+=OLD_SKIN_PRICES[+m[1]]||0;return false}return true});
 if(!s.owned.includes('skin0'))s.owned.push('skin0');if(s.av)s.av.skin=0;s.coins=(s.coins||0)+refund;s.fruitV=1;return s}
/* ---- profile pictures ---- */
const safePic=p=>typeof p==='string'&&/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(p)?p:'';
function pfp(o,size=36,cls=''){const pic=safePic(o&&o.pic);return pic?`<img class="pfp ${cls}" src="${pic}" width="${size}" height="${size}" alt="">`
 :`<span class="pfp pfp-f ${cls}" style="width:${size}px;height:${size}px">${avatarSVG({skin:(o&&o.skin)||0,hat:0,trail:0},'av',Math.round(size*.92))}</span>`}
const myPfp=s=>pfp({pic:S.pic,skin:S.av.skin},s);
function picFromFile(file){return new Promise((ok,no)=>{if(!file||!/^image\//.test(file.type))return no(new Error('Please choose a picture file (JPG or PNG).'));
 const rd=new FileReader();rd.onerror=()=>no(new Error('That picture could not be opened.'));rd.onload=()=>{const img=new Image();img.onerror=()=>no(new Error('That picture could not be opened.'));
  img.onload=()=>{const N=128,c=document.createElement('canvas');c.width=c.height=N;const x=c.getContext('2d');const s=Math.min(img.width,img.height);
   x.fillStyle='#fff';x.fillRect(0,0,N,N);x.drawImage(img,(img.width-s)/2,(img.height-s)/2,s,s,0,0,N,N);let q=.85,u=c.toDataURL('image/jpeg',q);while(u.length>30000&&q>.4){q-=.15;u=c.toDataURL('image/jpeg',q)}ok(u)};img.src=rd.result};rd.readAsDataURL(file)})}
/* restored from the live build */
function profileModal() {
  if (!NET.user) return;
  const e = NET.user,
    t = XS(),
    s = SKINS.map((e, t) => ({ f: e, i: t })).filter((e) => S.owned.includes("skin" + e.i)),
    a = modal(
      `<div class="prof"><div class="prof-pic">${myPfp(108)}</div><div><p class="eyebrow">${e.admin ? "Super admin" : "Your profile"}</p><h2 style="margin:0">${esc(e.admin ? "Super admin" : e.name)}</h2><p class="muted" style="margin:2px 0 0">@${esc(e.username)} \xb7 Grade ${S.grade || 7} games</p>${e.admin ? "" : `<p style="margin:4px 0 0">${S.nick ? "Nickname: <b>" + esc(S.nick) + "</b>" : '<span class="muted">No nickname yet</span>'} \xb7 <button class="linkbtn" id="pfNick">${S.nick ? "Change" : "Add one"}</button></p>`}</div></div>\n <h3 class="pcat">Profile picture</h3><div class="row"><label class="btn ghost" for="pfFile" tabindex="0" id="pfUp">Upload a photo</label><input type="file" id="pfFile" accept="image/*" class="vh">${S.pic ? '<button class="btn ghost" id="pfRm">Remove photo</button>' : ""}</div>\n <p class="muted" style="margin:8px 0 6px">${S.pic ? "Or switch back to one of your characters:" : "Your picture is your character. Pick one you own, or get more in the shop."}</p>\n <div class="pchars">${s.map((e) => `<button class="pchar ${S.pic || S.av.skin !== e.i ? "" : "on"}" data-ch="${e.i}" aria-label="${e.f.n}">${avatarSVG({ skin: e.i, hat: 0, trail: 0 }, "av", 56)}<span>${e.f.n}</span></button>`).join("")}<button class="pchar more" id="pfShop"><span class="plus">+</span><span>Shop</span></button></div>\n <div class="msg" id="pfMsg" role="alert"></div>\n <div class="row" style="margin:10px 0"><span class="chip">Level ${level()}</span><span class="chip">${S.xp} XP</span><span class="chip">${coinTxt()} coins</span><span class="chip">${S.cleared.filter(Boolean).length}/10 Crystals</span><span class="chip">Excel Lab ${t.cleared.filter(Boolean).length}/9</span><span class="chip">${S.stats.superOk || 0} super answers</span></div>\n <div class="row" style="margin-top:14px"><button class="btn" id="pfX">Done</button><span class="spacer"></span><button class="btn ghost" id="pfOut">Sign out</button></div>`,
      "esc",
    ),
    n = $("#pfMsg", a),
    i = () => {
      (save(), renderTop(), profileModal(), "home" === VIEW && viewHome($("#main")));
    };
  (($("#pfFile", a).onchange = async (e) => {
    const t = e.target.files[0];
    n.textContent = "Preparing your picture\u2026";
    try {
      ((S.pic = await picFromFile(t)), NET.track("profile", { data: { pic: !0 } }), sfx("coin"), i());
    } catch (e) {
      n.textContent = e.message;
    }
  }),
    ($("#pfUp", a).onkeydown = (e) => {
      ("Enter" !== e.key && " " !== e.key) || (e.preventDefault(), $("#pfFile", a).click());
    }));
  const o = $("#pfRm", a);
  (o &&
    (o.onclick = () => {
      ((S.pic = ""), i());
    }),
    $$("[data-ch]", a).forEach(
      (e) =>
        (e.onclick = () => {
          ((S.av.skin = +e.dataset.ch), (S.pic = ""), sfx("click"), i());
        }),
    ),
    ($("#pfShop", a).onclick = () => {
      ((SHOPTAB = "skin"), go("shop"));
    }));
  const r = $("#pfNick", a);
  (r &&
    (r.onclick = () => {
      (closeModal(), nickPrompt());
    }),
    ($("#pfX", a).onclick = closeModal),
    ($("#pfOut", a).onclick = () => NET.logout()));
}
/* ---- grades ---- */
const GRADES=[1,2,3,4,5,6,7,8,9,10,11];
const gradeGames=g=>CATALOG.filter(c=>c.grade===g);
function setGrade(g){S.grade=g;save();go('home')}
/* ---- level timer ---- */
const fmtT=ms=>{const s=Math.max(0,Math.round(ms/1000));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
function clockStart(o,id){o.tStart=Date.now();clearInterval(o.tick);const draw=()=>{const el=document.getElementById(id);if(!el)return clearInterval(o.tick);el.textContent=fmtT(Date.now()-o.tStart)};draw();o.tick=setInterval(draw,1000)}
function clockStop(o){clearInterval(o.tick);return o.tStart?Date.now()-o.tStart:0}
function bestTime(key,ms){S.times=S.times||{};const prev=S.times[key];const nb=!prev||ms<prev;if(nb)S.times[key]=ms;return{prev,nb}}
const timeLine=(ms,r)=>`<p class="timeline">${IC.clock||''}<span>Time <b>${fmtT(ms)}</b></span><span>${r.nb?(r.prev?'<b class="ok">New best time!</b> (was '+fmtT(r.prev)+')':'Your first time on the board'):'Best '+fmtT(r.prev)}</span></p>`;
/* restored from the live build */
const SQHARD = { algebra: [4, 5, 6, 7, 8, 9], ict: [4, 5, 7, 8], sci: [1, 2] };
const MI_='−';
/* restored from the live build */
const sgn = (e) => (e < 0 ? "\u2212" + Math.abs(e) : String(e));
const xp_=(c,p)=>{const a=Math.abs(c);return(a===1?'':a)+'x'+(p===2?'<sup>2</sup>':'')};
/* restored from the live build */
function poly(e, t, s) {
  let a = "";
  return (
    [
      [e, 2],
      [t, 1],
      [s, 0],
    ].forEach(([e, t]) => {
      if (!e) return;
      const s = t ? xp_(e, t) : String(Math.abs(e));
      a += a ? (e < 0 ? " \u2212 " : " + ") + s : (e < 0 ? "\u2212" : "") + s;
    }),
    a || "0"
  );
}
/* restored from the live build */
const SQGEN = {
  algebra: [
    () => {
      const e = R.int(3, 9),
        t = R.int(3, 9),
        s = R.int(2, 9);
      return {
        t: `(\u2212${e}) \xd7 (\u2212${t}) \u2212 (\u2212${s})`,
        a: e * t + s,
        o: [e * t - s, -e * t - s, -e * t + s],
      };
    },
    () => {
      const e = R.int(2, 9),
        t = R.int(2, 5),
        s = R.int(2, 5);
      return {
        t: `${e} + ${t} \xd7 ${s}<sup>2</sup>`,
        a: e + t * s * s,
        o: [(e + t) * s * s, e + (t * s) ** 2, (e + t * s) ** 2],
      };
    },
    () => {
      const e = R.int(2, 5),
        t = R.int(2, 4),
        s = R.int(2, 7);
      return {
        t: `${poly(t, -s, 0)} when x = \u2212${e}`,
        a: t * e * e + s * e,
        o: [t * e * e - s * e, -t * e * e + s * e, (t * e) ** 2 + s * e],
      };
    },
    () => {
      const e = R.int(2, 5),
        t = R.int(2, 4),
        s = R.int(2, 6),
        a = (e) => `x<sup>${sgn(e)}</sup>`;
      return {
        t: `(x<sup>${e}</sup>)<sup>${t}</sup> \xf7 x<sup>${s}</sup>`,
        a: a(e * t - s),
        o: [a(e + t - s), a(e * t + s), a(e * t * s)],
      };
    },
    () => {
      const e = R.int(2, 9),
        t = R.int(4, 9),
        s = R.int(1, t - 1),
        a = R.int(2, 12),
        n = (t - s) * e - a;
      return {
        t: `${t}x \u2212 ${a} = ${1 === s ? "" : s}x ${n < 0 ? "\u2212" : "+"} ${Math.abs(n)}`,
        ask: "Solve for x",
        a: e,
        o: [-e, e + 1, 2 * e],
      };
    },
    () => {
      const e = R.int(3, 12),
        t = R.int(1, e - 1);
      return {
        t: `2x + y = ${2 * e + t}<br>x \u2212 y = ${e - t}`,
        ask: "Find x",
        a: e,
        o: [t, e + t, Math.round((3 * e) / 2)],
      };
    },
    () => {
      const e = R.int(2, 7);
      let t = R.int(2, 7);
      return (
        t === e && (t = e + 1),
        {
          t: `(x + ${e})(x \u2212 ${t})`,
          ask: "Expand",
          a: poly(1, e - t, -e * t),
          o: [poly(1, t - e, -e * t), poly(1, e - t, e * t), poly(1, 0, -e * t)],
        }
      );
    },
    () => {
      const e = R.int(2, 5);
      let t = R.int(1, 5),
        s = R.int(2, 7);
      for (; 1 !== gcd(t, s);) s++;
      const a = e * t,
        n = e * s,
        i = (e, t, s) => `${1 === e ? "" : e}x ${t} ${s}`;
      return {
        t: `${poly(a, -n, 0)}`,
        ask: "Factorise fully",
        a: `${e}x(${i(t, "\u2212", s)})`,
        o: [`${e}(${poly(t, -s, 0)})`, `x(${i(a, "\u2212", n)})`, `${e}x(${i(t, "+", s)})`],
      };
    },
    () => {
      const e = R.int(3, 9),
        t = R.int(e + 1, 14),
        s = 2 * R.int(2, 6);
      return {
        t: `Trapezium: parallel sides ${e} cm and ${t} cm, height ${s} cm`,
        ask: "Area in cm\xb2",
        a: ((e + t) * s) / 2,
        o: [(e + t) * s, e * t, e * s + (t * s) / 2],
      };
    },
    () => {
      if (Math.random() < 0.5) {
        const e = R.int(2, 9);
        return {
          t: `<span class="frac"><span>x<sup>2</sup> \u2212 ${e * e}</span><span>x + ${e}</span></span>`,
          ask: "Simplify",
          a: `x \u2212 ${e}`,
          o: [`x + ${e}`, "x \u2212 " + e * e, `x<sup>2</sup> \u2212 ${e}`],
        };
      }
      const e = R.int(1, 6);
      let t = R.int(1, 7);
      return (
        t === e && t++,
        {
          t: `<span class="frac"><span>${poly(1, e + t, e * t)}</span><span>x + ${e}</span></span>`,
          ask: "Simplify",
          a: `x + ${t}`,
          o: [`x + ${e}`, "x + " + e * t, `x \u2212 ${t}`],
        }
      );
    },
  ],
  ict: [
    () => {
      const e = R.int(2, 6),
        t = R.int(2, 4),
        s = R.int(2, 5),
        a = (e, t) => "ABCDEFGHIJKL"[e] + t;
      return {
        t: `${t} columns right and ${s} rows down from <b>B${e}</b>`,
        ask: "Which cell?",
        a: a(1 + t, e + s),
        o: [a(1 + s, e + t), a(2 + t, e + s), a(1 + t, e + s + 1)],
      };
    },
    () => {
      const e = R.pick(["C", "D", "E"]),
        t = R.int(7, 12);
      return {
        t: `Add up every cell from <b>${e}2</b> to <b>${e}${t}</b>`,
        ask: "Which formula?",
        a: `=SUM(${e}2:${e}${t})`,
        o: [`=SUM(${e}2,${e}${t})`, `SUM(${e}2:${e}${t})`, `=${e}2+${e}${t}`],
      };
    },
    () => {
      const e = R.pick([1.25, 2.75, 3.5, 4.25, 6.5, 7.75]),
        t = R.int(3, 8);
      return {
        t: `B5 = ${m2(e)} (price), C5 = ${t} (quantity)<br>D5: <code class="fx">=B5*C5</code>`,
        ask: "What does D5 show?",
        a: m2(e * t),
        o: [m2(e + t), m2(e * (t + 1)), m2(e * t * 1.18)],
      };
    },
    () => {
      const e = R.int(6, 12);
      return {
        t: `C2 has <code class="fx">=A2*B2</code>. You fill it down to C${e}.`,
        ask: `Formula in C${e}?`,
        a: `=A${e}*B${e}`,
        o: ["=A2*B2", `=A${e}*B2`, `=A${e - 1}*B${e - 1}`],
      };
    },
    () => {
      const e = R.int(6, 10);
      return {
        t: `E4 has <code class="fx">=D4*$H$2</code>. You copy it to F${e}.`,
        ask: `Formula in F${e}?`,
        a: `=E${e}*$H$2`,
        o: ["=D4*$H$2", `=E${e}*I${e - 2}`, `=E${e}*$I$${e - 2}`],
      };
    },
    () => {
      const e = R.pick([20, 25, 40, 50, 75, 100, 150]),
        t = R.pick([15, 18, 20]),
        s = e * (1 + t / 100);
      return {
        t: `A price <b>with</b> ${t}% VAT is ${m2(s)}`,
        ask: "Price before VAT?",
        a: m2(e),
        o: [m2(s * (1 - t / 100)), m2(s - t), m2(e * (1 - t / 100))],
      };
    },
    () => {
      const e = R.pick([60, 65, 70, 75]),
        t = R.pick([">=", ">"]),
        s = R.pick([e, e - 0.5, e + 0.5]),
        a = ">=" === t ? s >= e : s > e;
      return {
        t: `B3 = ${s}<br><code class="fx">=IF(B3${t}${e},"Pass","Retry")</code>`,
        ask: "What shows?",
        a: a ? "Pass" : "Retry",
        o: [a ? "Retry" : "Pass", "TRUE", "FALSE"],
      };
    },
    () => ({
      t: 'Show "Pass" when C5 is at least the pass mark in H2. It must still work when filled down.',
      ask: "Which formula?",
      a: '=IF(C5>=$H$2,"Pass","Retry")',
      o: ['=IF(C5>=H2,"Pass","Retry")', '=IF(C5>$H$2,"Pass","Retry")', '=IF(C5>=$H$2,"Retry","Pass")'],
    }),
    () => {
      const e = Array.from({ length: 6 }, () => R.int(45, 95)),
        t = R.pick([60, 65, 70]),
        s = t + R.pick([5, 10]),
        a = e.filter((e) => e >= s).length,
        n = e.filter((e) => e >= t).length;
      return {
        t: `Scores: ${e.join(", ")}<br>H2 changes from ${t} to <b>${s}</b> (Pass if score \u2265 H2)`,
        ask: "How many pass now?",
        a: a,
        o: [n === a ? a + 1 : n, 6 - a === a ? a + 2 : 6 - a, Math.max(0, a - 1)],
      };
    },
  ],
  sci: [
    () =>
      R.pick([
        {
          t: "A cell has a cell wall and a large sap vacuole but <b>no chloroplasts</b>.",
          ask: "Where is it most likely from?",
          a: "A plant root",
          o: ["A plant leaf", "A human cheek", "Human blood"],
        },
        {
          t: "A cell has chloroplasts, a nucleus and mitochondria.",
          ask: "Which statement must be true?",
          a: "It is a plant cell",
          o: ["It is an animal cell", "It has no cell wall", "It cannot respire"],
        },
        {
          t: "A plant cell is put in a dark cupboard for a week.",
          ask: "Which part can no longer do its job?",
          a: "Chloroplast",
          o: ["Mitochondrion", "Nucleus", "Cell membrane"],
        },
        {
          t: "Which part releases energy in <b>both</b> plant and animal cells?",
          ask: "Choose one",
          a: "Mitochondrion",
          o: ["Chloroplast", "Sap vacuole", "Cell wall"],
        },
      ]),
    () =>
      R.pick([
        (() => {
          const e = R.pick([10, 15]),
            t = R.pick([10, 40]);
          return {
            t: `Total magnification <b>\xd7${e * t}</b>, eyepiece <b>\xd7${e}</b>.`,
            ask: "Which objective lens is in use?",
            a: "\xd7" + t,
            o: ["\xd7" + (e * t - e), "\xd7" + (10 === t ? 40 : 10), "\xd7" + (e * t) / 2],
          };
        })(),
        {
          t: "Zara sees cells clearly on low power, swaps to high power and the image goes blurry.",
          ask: "What should she do?",
          a: "Turn the fine focusing knob",
          o: ["Turn the coarse knob a long way", "Move the mirror away", "Take the slide off the stage"],
        },
        {
          t: "Which of these do you see in an animal cell under a microscope?",
          ask: "Choose one",
          a: "Nucleus, cytoplasm and cell membrane",
          o: ["Cell wall and chloroplasts", "Cell wall and nucleus", "A large sap vacuole"],
        },
        (() => {
          const e = R.pick([5, 10]),
            t = R.pick([4, 10, 40]);
          return {
            t: `Eyepiece \xd7${e}, objective \xd7${t}.`,
            ask: "Total magnification?",
            a: "\xd7" + e * t,
            o: ["\xd7" + (e + t), "\xd7" + e * t * 10, "\xd7" + (t - e <= 0 ? 2 * e : t - e)],
          };
        })(),
      ]),
    () =>
      R.pick([
        {
          t: "Which cell would need the <b>most mitochondria</b>?",
          ask: "Choose one",
          a: "Sperm cell",
          o: ["Red blood cell", "Root hair cell", "Palisade cell"],
        },
        {
          t: "Which specialised cell has <b>no nucleus</b>?",
          ask: "Choose one",
          a: "Red blood cell",
          o: ["Neurone", "Ciliated cell", "Sperm cell"],
        },
        {
          t: "Smoke damages the cilia in the airways.",
          ask: "What happens?",
          a: "Mucus and germs are not swept out of the lungs",
          o: ["Less oxygen is carried by the blood", "The lungs make food", "Nerve messages stop"],
        },
        {
          t: "A root hair cell and a palisade cell both have\u2026",
          ask: "Choose one",
          a: "a cell wall",
          o: ["chloroplasts", "cilia", "a tail"],
        },
      ]),
  ],
};
/* restored from the live build */
const sqS = (e) => String(e).replace(/^-(?=\d)/, "\u2212");
/* restored from the live build */
function superGen(e, t) {
  const s = SQGEN[e],
    a = s[Math.min(t, s.length - 1)];
  for (let e = 0; e < 30; e++) {
    const e = a(),
      t = sqS(e.a),
      s = [...new Set(e.o.map(sqS))].filter((e) => e !== t);
    if (s.length >= 3) return { t: e.t, ask: e.ask || "Work it out", a: t, opts: R.shuffle([t, ...s.slice(0, 3)]) };
  }
  const n = a();
  return { t: n.t, ask: n.ask || "Work it out", a: sqS(n.a), opts: R.shuffle([sqS(n.a), ...n.o.map(sqS)]) };
}
/* restored from the live build */
function superAsk(t, e, a, s) {
  const n = superGen(t, e),
    o = S.settings.calm,
    r = (SQHARD[t] || []).includes(Math.min(e, SQGEN[t].length - 1));
  let i = !1,
    l = 0,
    c = 0;
  const d = modal(
    `<div class="super" id="superBox"><div class="super-flash" id="sqFlash"><span>${IC.flame}</span><b>Super question!</b><span class="muted">${o ? "Calm mode: take your time" : r ? "A tough one: 10 seconds. Ready?" : "10 seconds. Ready?"}</span></div>\n <div class="super-main" id="sqMain" hidden><div class="super-top"><span class="super-tag">${IC.flame}Super question</span><span class="super-sec" id="sqSec" aria-live="off">${o ? "" : 10}</span></div>\n <div class="super-bar"${o ? " hidden" : ""}><i id="sqBar"></i></div><p class="super-ask">${n.ask}</p><div class="super-q">${n.t}</div>\n <div class="super-opts">${n.opts.map((t, e) => `<button class="super-opt${POW("reveal") && t === n.a ? " rev" : ""}" data-i="${e}"><kbd>${e + 1}</kbd><span>${t}</span></button>`).join("")}</div>\n <p class="super-note" id="sqNote">${o ? "Get it right" : "Answer in time"} for a <b>1.5× progress boost</b> and <b>+10 bonus coins</b>!</p><div id="sqGo"></div></div></div>`,
    "super-modal",
  );
  sfx("level");
  const p = (t) => {
      if (i || !c) return;
      const e = +t.key;
      e >= 1 && e <= 4 && (t.preventDefault(), h(e - 1));
    },
    h = (o) => {
      if (i) return;
      ((i = !0), clearInterval(l), document.removeEventListener("keydown", p));
      const r = Math.round(performance.now() - c),
        h = null != o && n.opts[o] === n.a;
      if (
        ($$(".super-opt", d).forEach((t, e) => {
          ((t.disabled = !0), n.opts[e] === n.a ? t.classList.add("y") : e === o && t.classList.add("n"));
        }),
        (S.stats.superTried = (S.stats.superTried || 0) + 1),
        h)
      ) {
        const t = 13,
          e = 40;
        let a = "";
        try {
          a = (s && s()) || "";
        } catch (t) {}
        ((S.stats.superOk = (S.stats.superOk || 0) + 1),
          (S.coins += t),
          addXP(e),
          updTop(),
          badge("super"),
          sfx("crystal"),
          burstEl($(".super-opt.y", d), 50, ["#FFC531", "#E5766C", "#fff"]),
          ($("#sqNote", d).innerHTML =
            `<b class="ok">Super! ${a ? a + " · " : ""}+${t} coins (10 bonus) · +${e} XP</b> <span class="muted">in ${(r / 1e3).toFixed(1)} s</span>`));
      } else
        (sfx("bad"),
          ($("#sqNote", d).innerHTML =
            `<b class="no">${null == o ? "Time is up!" : "Not this time."}</b> The answer is highlighted. No hearts lost.`));
      (save(),
        NET.track("super", { game: t, stage: e, ok: h, ms: r }),
        ($("#sqGo", d).innerHTML = '<button class="btn w" id="sqNext">Continue</button>'));
      const f = $("#sqNext", d);
      (f.focus(),
        (f.onclick = () => {
          (closeModal(), a(h));
        }));
    };
  setTimeout(
    () => {
      if (!$("#superBox")) return;
      if (
        (($("#sqFlash").hidden = !0),
        ($("#sqMain").hidden = !1),
        (c = performance.now()),
        document.addEventListener("keydown", p),
        $$(".super-opt", d).forEach((t) => (t.onclick = () => h(+t.dataset.i))),
        o)
      )
        return;
      const t = $("#sqBar"),
        e = $("#sqSec");
      l = setInterval(() => {
        if (!$("#superBox")) return ((i = !0), clearInterval(l), void document.removeEventListener("keydown", p));
        const a = Math.max(0, 1e4 - (performance.now() - c));
        ((t.style.width = (a / 1e4) * 100 + "%"), (e.textContent = Math.ceil(a / 1e3)), a <= 0 && h(null));
      }, 50);
    },
    S.settings.calm ? 600 : 1100,
  );
}
/* restored from the live build */
const stageName = (e, t) =>
  null == t
    ? ""
    : "sci" === e
      ? `Cell Lab Level ${t + 1}${SCV[t] ? " (" + SCV[t].name + ")" : ""}`
      : "ict" === e
        ? `Excel Lab Level ${t + 1}${XLV[t] ? " (" + XLV[t].name + ")" : ""}`
        : `World ${t + 1}${WORLDS[t] ? " (" + WORLDS[t].topic + ")" : ""}`;
/* restored from the live build */
function actText(e) {
  const t = e.data || {},
    a = k3StageName(e.game, e.stage);
  switch (e.kind) {
    case "signup":
      return "created an account";
    case "login":
      return "signed in";
    case "logout":
      return "signed out";
    case "start":
      return `started ${a}`;
    case "clear":
      return `<b>cleared ${a}</b>${t.stars ? " with " + t.stars + "\u2605" : ""}${e.ms ? " in " + fmtT(e.ms) : ""}`;
    case "training":
      return `went to the Training Room in ${a}`;
    case "rush":
      return `finished ${"f" === t.id ? "the Grand Finale" : "a Boss Rush"}${null != t.score ? " " + t.score + "/" + t.of : ""}`;
    case "super":
      return `${e.ok ? '<span class="ok">answered</span>' : '<span class="no">missed</span>'} a super question in ${a}${e.ok && e.ms ? " (" + (e.ms / 1e3).toFixed(1) + " s)" : ""}`;
    case "door":
      return `${e.ok ? '<span class="ok">cracked</span>' : '<span class="no">missed</span>'} a Mystery Door${e.tier ? " (" + ["easy", "medium", "hard"][e.tier - 1] + ")" : ""} in ${a}${e.ok && e.ms ? " (" + (e.ms / 1e3).toFixed(1) + " s)" : ""}`;
    case "buy":
      return `bought ${esc(t.item || "an item")} in the shop`;
    case "profile":
      return "nick" in t ? (t.nick ? "set a nickname" : "removed their nickname") : "changed their profile picture";
    case "answer":
      return `${e.ok ? '<span class="ok">\u2713</span>' : '<span class="no">\u2717</span>'} ${TAGNAMES[e.tag] || XLNAMES[e.tag] || e.tag || "answer"} <span class="muted">${a}${e.ms ? " \xb7 " + (e.ms / 1e3).toFixed(1) + " s" : ""}</span>`;
    default:
      return esc(e.kind);
  }
}
/* restored from the live build */
const NICK_RE = /^[\p{L}\p{N}][\p{L}\p{N} _.\-]{1,15}$/u;
/* restored from the live build */
function cleanNick(e) {
  return String(e || "")
    .replace(/\s+/g, " ")
    .trim();
}
/* restored from the live build */
function nickErr(e) {
  return e
    ? e.length < 2
      ? "Use at least 2 characters."
      : e.length > 16
        ? "Use 16 characters or fewer."
        : NICK_RE.test(e)
          ? ""
          : "Use letters, numbers, spaces, dots, dashes or _."
    : "";
}
/* restored from the live build */
function setNick(e) {
  ((S.nick = e), (S.nickAsked = !0), save(), renderTop(), NET.track("profile", { data: { nick: !!e } }));
}
/* restored from the live build */
function dispName() {
  return NET.user ? (NET.user.admin ? "Super admin" : S.nick || NET.user.name.split(" ")[0]) : "";
}
/* restored from the live build */
function nickPrompt() {
  if (!NET.user || NET.user.admin) return;
  const e = modal(
      `<div class="nickbox"><div class="nick-av">${myPfp(72)}</div><p class="eyebrow">Optional</p><h2 style="margin:2px 0 4px">Want a nickname?</h2>\n <p class="muted" style="margin:0 0 12px">It shows on your top bar and the leaderboard instead of your real name. You can change it any time in Settings.</p>\n <form id="npForm" class="sp-nick" autocomplete="off"><input class="ans-in" id="npIn" maxlength="16" placeholder="e.g. Blue Rocket" aria-label="Nickname"><button class="btn w">Save nickname</button></form>\n <div class="msg" id="npMsg" role="status"></div><button class="linkbtn" id="npSkip">Skip for now</button></div>`,
      "nick-modal",
    ),
    t = () => {
      closeModal();
    };
  (($("#npForm", e).onsubmit = (s) => {
    s.preventDefault();
    const a = cleanNick($("#npIn", e).value);
    if (!a) return void ($("#npMsg", e).textContent = "Type a nickname, or choose Skip.");
    const n = nickErr(a);
    n
      ? ($("#npMsg", e).textContent = n)
      : (setNick(a), sfx("level"), gtoast("Nice to meet you, " + a + "!"), t(), "home" === VIEW && go("home"));
  }),
    ($("#npSkip", e).onclick = () => {
      ((S.nickAsked = !0), save(), t());
    }),
    setTimeout(() => {
      const t = $("#npIn", e);
      t && !matchMedia("(pointer:coarse)").matches && t.focus();
    }, 40));
}
/* restored from the live build */
const SND_CATS = [
  ["answers", "Right & wrong answers", "good", "The chime or buzz after each answer"],
  ["coins", "Coins", "coin", "When you earn coins"],
  ["fanfare", "Celebrations", "level", "Level-ups, crystals and super questions"],
  ["taps", "Button taps", "click", "Taps, steps and building formulas"],
  ["action", "Game effects", "hit", "Hits, slices and explosions in the games"],
];
/* restored from the live build */
const SFX_CAT = {
  good: "answers",
  bad: "answers",
  coin: "coins",
  level: "fanfare",
  crystal: "fanfare",
  click: "taps",
  step: "taps",
  hit: "action",
  slice: "action",
  boom: "action",
};
/* restored from the live build */
function sndOn(e) {
  const t = SFX_CAT[e] || "action",
    s = S.settings.snd;
  return !s || !1 !== s[t];
}
/* restored from the live build */
function sndCat(e) {
  const t = S.settings.snd;
  return !t || !1 !== t[e];
}
/* restored from the live build */
const IC_SUN =
  '<svg viewBox="0 0 24 24" width="18" height="18"><circle cx="12" cy="12" r="4.2" fill="currentColor"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
/* restored from the live build */
const IC_MOON =
  '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" fill="currentColor"/></svg>';
/* restored from the live build */
function isDark() {
  const e = S.settings.theme;
  return "dark" === e || ("system" === e && matchMedia("(prefers-color-scheme: dark)").matches);
}
/* restored from the live build */
function closeSetPanel() {
  const e = $("#setPop");
  if (e) {
    e.remove();
    const t = $("#setBtn");
    t && t.setAttribute("aria-expanded", "false");
  }
  (document.removeEventListener("pointerdown", spOut, !0), document.removeEventListener("keydown", spKey));
}
/* restored from the live build */
function spOut(e) {
  const t = $("#setPop");
  !t || t.contains(e.target) || e.target.closest("#setBtn") || closeSetPanel();
}
/* restored from the live build */
function spKey(e) {
  "Escape" === e.key && closeSetPanel();
}
/* restored from the live build */
function setPanel() {
  if ($("#setPop")) return closeSetPanel();
  AU.init();
  const e = (e, t, s, a) =>
      `<div class="sp-row"><div><b>${s}</b>${a ? `<span>${a}</span>` : ""}</div><button class="sw" role="switch" aria-checked="${e}" ${t} aria-label="${s}"></button></div>`,
    t = NET.user && !NET.user.admin,
    s = H(
      `<div class="setpop" id="setPop" role="dialog" aria-label="Settings"><div class="sp-head"><b>${IC.gear}Settings</b><button class="sp-x" id="spX" aria-label="Close settings">\xd7</button></div>\n <div class="sp-sec"><p class="eyebrow">Sounds</p>${e(!S.settings.mute, 'data-sp="all"', "All sounds", "Turn every sound on or off")}\n  <div class="sp-sub${S.settings.mute ? " off" : ""}" id="spSub">${e(S.settings.music, 'data-sp="music"', "Music", "Background tunes in each game")}${SND_CATS.map(([t, s, , a]) => e(sndCat(t), `data-sc="${t}"`, s, a)).join("")}</div></div>\n <div class="sp-sec"><p class="eyebrow">Look</p><div class="sp-row"><div><b>Background</b><span>Switch between light and dark</span></div><button class="themebtn" id="spTheme" aria-pressed="${isDark()}">${isDark() ? IC_MOON + "<span>Dark</span>" : IC_SUN + "<span>Light</span>"}</button></div></div>\n ${t ? `<div class="sp-sec"><p class="eyebrow">Nickname <span class="muted">\xb7 optional</span></p><form class="sp-nick" id="spNick" autocomplete="off"><input class="ans-in" id="spNickIn" maxlength="16" placeholder="Add a nickname" aria-label="Nickname" value="${esc(S.nick || "")}"><button class="btn w">Save</button></form><div class="msg" id="spNickMsg" role="status"></div>${S.nick ? '<button class="linkbtn" id="spNickRm">Remove nickname</button>' : ""}</div>` : ""}\n <div class="sp-sec">${e(S.settings.calm, 'data-sp="calm"', "Calm mode", "No timers or speed bonuses")}</div>\n <button class="linkbtn" id="spMore">Account and reset progress</button></div>`,
    );
  document.body.append(s);
  const a = $("#setBtn");
  (a && a.setAttribute("aria-expanded", "true"),
    $$(".sw[data-sp]", s).forEach(
      (e) =>
        (e.onclick = () => {
          const t = e.dataset.sp;
          ("all" === t
            ? ((S.settings.mute = !S.settings.mute),
              e.setAttribute("aria-checked", !S.settings.mute),
              $("#spSub", s).classList.toggle("off", S.settings.mute),
              AU.setMute(),
              S.settings.mute || sfx("click"))
            : ((S.settings[t] = !S.settings[t]),
              e.setAttribute("aria-checked", S.settings[t]),
              "music" === t && (S.settings.music ? AU.music(RUN ? RUN.s : AU.want) : AU.stopMusic())),
            save());
        }),
    ),
    $$(".sw[data-sc]", s).forEach(
      (e) =>
        (e.onclick = () => {
          const t = e.dataset.sc;
          if (
            ((S.settings.snd = Object.assign({}, S.settings.snd || {})),
            (S.settings.snd[t] = !sndCat(t)),
            e.setAttribute("aria-checked", sndCat(t)),
            save(),
            sndCat(t))
          ) {
            const e = SND_CATS.find((e) => e[0] === t);
            e && sfx(e[2]);
          }
        }),
    ),
    ($("#spTheme", s).onclick = (e) => {
      ((S.settings.theme = isDark() ? "light" : "dark"), save(), applyTheme());
      const t = e.currentTarget;
      (t.setAttribute("aria-pressed", isDark()),
        (t.innerHTML = isDark() ? IC_MOON + "<span>Dark</span>" : IC_SUN + "<span>Light</span>"));
    }));
  const n = $("#spNick", s);
  n &&
    (n.onsubmit = (e) => {
      e.preventDefault();
      const t = cleanNick($("#spNickIn", s).value),
        a = $("#spNickMsg", s);
      if (!t) return void (a.textContent = "Type a nickname first, or choose Remove.");
      const n = nickErr(t);
      n
        ? (a.textContent = n)
        : (setNick(t),
          (a.innerHTML = '<span class="ok">Saved! You are now ' + esc(t) + ".</span>"),
          sfx("coin"),
          "home" === VIEW && go("home"));
    });
  const i = $("#spNickRm", s);
  (i &&
    (i.onclick = () => {
      (setNick(""), closeSetPanel(), gtoast("Nickname removed"), "home" === VIEW && go("home"));
    }),
    ($("#spX", s).onclick = closeSetPanel),
    ($("#spMore", s).onclick = () => {
      (closeSetPanel(), settings());
    }),
    setTimeout(() => {
      (document.addEventListener("pointerdown", spOut, !0), document.addEventListener("keydown", spKey));
    }, 0));
}
/* restored from the live build */
function roadMap(t, e, a) {
  const s = t.length + 1,
    n = Array.from({ length: s }, (t, e) => ({ x: 200 + 125 * Math.sin(1.15 * e), y: 70 + 112 * e })),
    o = n[s - 1].y + 80;
  let r = `M${n[0].x} ${n[0].y}`;
  for (let t = 1; t < s; t++) {
    const e = n[t - 1],
      a = n[t];
    r += ` C${e.x} ${e.y + 60} ${a.x} ${a.y - 60} ${a.x} ${a.y}`;
  }
  let i = t.findIndex((t) => !t.cleared);
  i < 0 && (i = t.length - 1);
  const l = (t) => (t.x > 200 ? { x: -52, a: "end" } : { x: 52, a: "start" });
  let c = "";
  t.forEach((t, e) => {
    const a = n[e],
      s = l(a),
      o = t.ok;
    c += `<g class="node rnode ${o ? "" : "locked"}" tabindex="0" role="button" data-i="${e}" aria-label="Level ${e + 1}: ${esc(t.name)}${o ? "" : " (locked)"}" transform="translate(${a.x} ${a.y})" style="--w2:${t.c2}">\n  <circle r="44" fill="${o ? t.c1 : "var(--line)"}" opacity=".25"/><circle class="ring" r="36" fill="${o ? t.c1 : "var(--surface2)"}" stroke="${o ? t.c2 : "var(--line)"}" stroke-width="5"/>\n  ${o ? `<text y="11" text-anchor="middle" font-family="Bungee,sans-serif" font-size="30" fill="#fff">${e + 1}</text>` : `<g transform="translate(-13 -14) scale(1.1)" color="var(--muted)">${IC.lock.replace("<svg", '<svg width="24" height="24"')}</g>`}\n  ${t.cleared ? `<g transform="translate(-30 30)">${[0, 1, 2].map((e) => `<g transform="translate(${20 * e} 0)" opacity="${e < t.stars ? 1 : 0.25}">${IC.star.replace("<svg", '<svg width="20" height="20"')}</g>`).join("")}</g>` : ""}\n  <text x="${s.x}" y="-6" text-anchor="${s.a}" font-family="Bungee,sans-serif" font-size="15" fill="var(--ink)">${esc(t.name)}</text>\n  <text x="${s.x}" y="14" text-anchor="${s.a}" font-size="13" font-weight="700" fill="var(--muted)">${esc(t.sub)}</text></g>`;
  });
  const d = n[s - 1],
    p = l(d),
    h = e.done;
  c += `<g class="node rfinish ${h ? "" : "locked"}" tabindex="0" role="button" aria-label="${esc(e.label)}" transform="translate(${d.x} ${d.y})"><rect x="-30" y="-30" width="60" height="60" rx="16" fill="${h ? "#E8005F" : "var(--surface2)"}" stroke="${h ? "#8A5F00" : "var(--line)"}" stroke-width="4" transform="rotate(45)"/>\n  <g transform="translate(-20 -20)" opacity="${h ? 1 : 0.35}">${IC.chest.replace("<svg", '<svg width="40" height="40"')}</g>\n  <text x="${p.x + ("end" === p.a ? 6 : -6)}" y="5" text-anchor="${p.a}" font-family="Bungee,sans-serif" font-size="14" fill="var(--ink)">${esc(e.label)}${h ? " ✓" : ""}</text></g>`;
  const f = n[i];
  return `<svg class="mapsvg" viewBox="0 0 400 ${o}" role="group" aria-label="${esc(a)}"><path d="${r}" fill="none" stroke="var(--line)" stroke-width="14" stroke-linecap="round"/><path d="${r}" fill="none" stroke="var(--surface)" stroke-width="4" stroke-dasharray="2 14" stroke-linecap="round"/>\n ${c}<g class="hero-drag" transform="translate(${f.x + (f.x > 200 ? 24 : -82)} ${f.y - 74})"><svg x="0" y="0" width="58" height="64" viewBox="-4 -28 108 128">${avatarSVG(
    S.av,
  )
    .replace(/^<svg[^>]*>/, "")
    .replace(/<\/svg>$/, "")}</svg></g></svg>`;
}
/* restored from the live build */
function roadWire(e, t, s) {
  $$(".rnode", e).forEach((e) => {
    const s = () => {
      (AU.init(), t(+e.dataset.i));
    };
    ((e.onclick = s),
      (e.onkeydown = (e) => {
        ("Enter" !== e.key && " " !== e.key) || (e.preventDefault(), s());
      }));
  });
  const a = $(".rfinish", e);
  if (a) {
    const e = () => gtoast(s());
    ((a.onclick = e),
      (a.onkeydown = (t) => {
        ("Enter" !== t.key && " " !== t.key) || (t.preventDefault(), e());
      }));
  }
}
/* restored from the live build */
const DOORS = [
  { c: "#E5484D", d: "#9E1F23", n: "Red" },
  { c: "#3B82F6", d: "#1D4FB0", n: "Blue" },
  { c: "#22A06B", d: "#0E6B43", n: "Green" },
];
/* restored from the live build */
const DOORTIER = [
  { n: "Easy", t: 6e3, c: "#22A06B" },
  { n: "Medium", t: 8e3, c: "#E9A800" },
  { n: "Hard", t: 1e4, c: "#E5484D" },
];
/* restored from the live build */
function doorDue(t, e) {
  return (
    (S.doorN = (S.doorN || 0) + 1),
    !(!t || t.doorDone || S.doorN < 30 || ((t.doorDone = !0), (S.doorN = 0), save(), 0))
  );
}
/* restored from the live build */
const dNum = (e) => {
  const t = String(e).replace("\u2212", "-");
  return /^-?\d+(\.\d+)?$/.test(t) ? { v: parseFloat(t), dp: (t.split(".")[1] || "").length } : null;
};
/* restored from the live build */
const dFmt = (e, t) => (e < 0 ? "\u2212" : "") + (t ? Math.abs(e).toFixed(t) : String(Math.abs(Math.round(e))));
/* restored from the live build */
function doorNear(e) {
  const t = dNum(e);
  if (!t) return [];
  const { v: s, dp: a } = t,
    n = a ? (s >= 20 ? R.pick([1, 2, 5]) : R.pick([0.5, 1])) : 1,
    i = [s + n, s - n, 2 * s, s + 10 * n, -s, s / 2].filter(
      (e) => e !== s && (a || Number.isInteger(e)) && !(a && e < 0),
    );
  return R.shuffle(i).map((e) => dFmt(e, a));
}
/* restored from the live build */
function doorFx(e) {
  if (!/^=/.test(e)) return [];
  const t = [];
  return (
    t.push(e.replace(/\$/g, "")),
    t.push(e.replace(/\$([A-Z])\$(\d+)/, "$1$$$2")),
    t.push(e.replace(/\$([A-Z])\$(\d+)/, "$$$1$2")),
    t.push(e.replace(/([A-Z])(\d+)/, (e, t, s) => t + (+s + 1))),
    t.push(e.replace(/^=([A-Z])(\d+)/, (e, t, s) => "=$" + t + "$" + s)),
    t.push(e.includes("*") ? e.replace("*", "+") : e.replace("+", "*")),
    t.push(e.replace(/>=/, ">")),
    R.shuffle(t.filter((t) => t !== e))
  );
}
/* restored from the live build */
function doorPack(e, t, s, a, n) {
  const i = (e) => String(e).replace(/\s+/g, "").toLowerCase(),
    o = String(e),
    r = new Map([[i(o), o]]),
    l = (e) => {
      null != e && ((e = String(e)), !r.has(i(e)) && r.size < 4 && r.set(i(e), e));
    };
  (R.shuffle(a || []).forEach(l), doorNear(o).forEach(l), doorFx(o).forEach(l));
  for (let e = 0; e < 40 && r.size < 4; e++)
    try {
      l(n());
    } catch (e) {}
  return { html: t, ask: s, a: o, opts: R.shuffle([...r.values()]) };
}
/* restored from the live build */
function doorQ(e, t, s) {
  if ("algebra" === e) {
    const e = genQ(t, s),
      a = ansText(e.ans);
    let n = "choice" === e.ans.type ? e.ans.opts : [];
    if ("pair" === e.ans.type) {
      const [t, s] = e.ans.vals,
        [a, i] = e.ans.vars,
        o = (e, t) => `${a} = ${num(e)}, ${i} = ${num(t)}`;
      n = [o(s, t), o(t + 1, s), o(t, s - 1), o(-t, s)];
    }
    const i = e.ans.label,
      o = doorPack(
        a,
        `${e.text ? `<p class="door-txt">${e.text}</p>` : ""}${e.expr ? `<div class="super-q">${e.expr}</div>` : ""}`,
        e.ask || "Work it out",
        n,
        () => ansText(genQ(t, s, e.tag).ans),
      );
    return (i && ((o.a = i + " " + o.a), (o.opts = o.opts.map((e) => i + " " + e))), o);
  }
  if ("ict" === e) {
    const e = xlTags(t, s),
      a = xlQ(t, R.pick(e)),
      n = a.options || (a.bins ? a.bins.map((e) => e.t || e.label || e) : null) || [],
      i = a.sheet ? `<div class="door-sheet">${sheetHTML(a.sheet, { hl: a.hl })}</div>` : "",
      o = a.card
        ? `<div class="door-card">${"string" == typeof a.card ? a.card : esc(a.card.t || a.card.label || "")}</div>`
        : "";
    return doorPack(
      a.answerText,
      `<p class="door-txt">${a.prompt}</p>${o}${i}`,
      "Pick the right answer",
      n,
      () => xlGen(t, a.tag).answerText,
    );
  }
  let a = scTags(t, s),
    n = null;
  for (let e = 0; e < 12; e++) {
    const e = scGen(t, R.pick(a));
    if ("tap" !== e.kind && "order" !== e.kind) {
      n = e;
      break;
    }
  }
  n || (n = scGen(0, "label"));
  const i = n.options || (n.bins ? n.bins.map((e) => e.t || e.label || e) : null) || [],
    o = n.card
      ? `<div class="door-card">${"string" == typeof n.card ? n.card : esc(n.card.t || n.card.label || "")}</div>`
      : "";
  return doorPack(
    n.answerText || n.answer,
    `${n.scene ? `<div class="door-scene-pic">${n.scene}</div>` : ""}<p class="door-txt">${n.prompt}</p>${o}`,
    "Pick the right answer",
    i,
    () => {
      const e = scGen(t, n.tag);
      return e.answerText || e.answer;
    },
  );
}
/* restored from the live build */
function doorSVG(e, t) {
  return `<svg viewBox="0 0 90 140" aria-hidden="true"><rect x="2" y="2" width="86" height="136" rx="10" fill="#5B3A1E"/><rect x="8" y="8" width="74" height="130" rx="6" fill="#1B1430"/>\n <g class="door-leaf"><rect x="8" y="8" width="74" height="130" rx="6" fill="${e.c}"/><rect x="16" y="18" width="58" height="46" rx="5" fill="none" stroke="${e.d}" stroke-width="3"/><rect x="16" y="74" width="58" height="54" rx="5" fill="none" stroke="${e.d}" stroke-width="3"/>\n <circle cx="70" cy="76" r="4.6" fill="#FFC531" stroke="#8A5F00" stroke-width="1.5"/><text x="45" y="50" text-anchor="middle" font-family="Bungee,sans-serif" font-size="26" fill="#fff" opacity=".92">${t + 1}</text></g></svg>`;
}
/* restored from the live build */
function doorAsk(e, t, s, a) {
  const n = S.settings.calm,
    i = R.shuffle([0, 1, 2]);
  let o = -1,
    r = !1,
    l = 0,
    c = 0,
    d = null,
    p = 0;
  const h = modal(
    `<div class="doorbox" id="doorBox"><div class="door-head"><p class="eyebrow">Rare event</p><h2>Mystery Doors!</h2>\n <p class="muted">Pick a door. Behind them are one <b>easy</b>, one <b>medium</b> and one <b>hard</b> question, but you cannot see which is which. Answer in time for <b>+30% progress</b> and <b>+30 coins</b>.</p></div>\n <div class="door-stage" id="dStage"><div class="door-row">${DOORS.map((e, t) => `<button class="door" data-d="${t}" aria-label="${e.n} door"><span class="door-in"><b style="color:${DOORTIER[i[t]].c}">${DOORTIER[i[t]].n}</b></span>${doorSVG(e, t)}</button>`).join("")}</div>\n <div class="door-hero" id="dHero">${avatarSVG(S.av, "av", 78)}</div><div class="door-floor"></div></div>\n <div class="door-q" id="dQ" hidden></div></div>`,
    "door-modal",
  );
  sfx("level");
  const u = (e) => {
    if (r) return;
    const t = +e.key;
    o < 0 && t >= 1 && t <= 3
      ? (e.preventDefault(), m(t - 1))
      : c && t >= 1 && t <= 4 && (e.preventDefault(), f(t - 1));
  };
  document.addEventListener("keydown", u);
  const m = (a) => {
      if (o >= 0 || !$("#doorBox")) return;
      ((o = a), sfx("click"));
      const m = i[a],
        g = DOORTIER[m];
      p = g.t;
      const b = $(`.door[data-d="${a}"]`, h),
        v = $("#dHero", h),
        y = $("#dStage", h),
        x = b.getBoundingClientRect(),
        k = y.getBoundingClientRect();
      ((v.style.transform = `translateX(${x.left + x.width / 2 - (k.left + k.width / 2)}px)`),
        $$(".door", h).forEach((e) => (e.disabled = !0)),
        setTimeout(() => {
          (b.classList.add("open"), sfx("good"));
        }, 450),
        setTimeout(
          () =>
            $$(".door", h).forEach((e, t) => {
              t !== a && e.classList.add("open", "dim");
            }),
          1100,
        ));
      try {
        d = doorQ(e, t, m + 1);
      } catch (e) {
        d = null;
      }
      (/127\.0\.0\.1/.test(API) && (window.__dq = d),
        setTimeout(
          () => {
            if (!$("#doorBox")) return;
            if (!d) return ((r = !0), document.removeEventListener("keydown", u), closeModal(), s(!1));
            const e = $("#dQ", h);
            if (
              (($(".door-head", h).hidden = !0),
              y.classList.add("small"),
              (e.hidden = !1),
              (e.innerHTML = `<div class="super-top"><span class="door-tag" style="background:${g.c}">${DOORS[a].n} door \xb7 ${g.n}</span><span class="super-sec" id="dSec">${n ? "" : p / 1e3}</span></div>\n   <p class="door-picked">You picked ${"Easy" === g.n ? "an" : "a"} <b style="color:${g.c}">${g.n.toLowerCase()} question</b>!${n ? " Calm mode: take your time." : ` You have <b>${p / 1e3} seconds</b>.`}</p>\n   <div class="super-bar"${n ? " hidden" : ""}><i id="dBar"></i></div><p class="super-ask">${d.ask}</p><div class="door-body">${d.html}</div>\n   <div class="super-opts">${d.opts.map((e, t) => `<button class="super-opt${POW("reveal") && e === d.a ? " rev" : ""}" data-i="${t}"><kbd>${t + 1}</kbd><span>${esc(e)}</span></button>`).join("")}</div>\n   <p class="super-note" id="dNote">Right and in time: <b>+30% progress</b> and <b>+30 coins</b>!</p><div id="dGo"></div>`),
              $$(".super-opt", e).forEach((e) => (e.onclick = () => f(+e.dataset.i))),
              (c = performance.now()),
              n)
            )
              return;
            const t = $("#dBar"),
              i = $("#dSec");
            l = setInterval(() => {
              if (!$("#doorBox")) return ((r = !0), clearInterval(l), void document.removeEventListener("keydown", u));
              const e = Math.max(0, p - (performance.now() - c));
              ((t.style.width = (e / p) * 100 + "%"), (i.textContent = Math.ceil(e / 1e3)), e <= 0 && f(null));
            }, 50);
          },
          n ? 1700 : 1900,
        ));
    },
    f = (n) => {
      if (r || !c) return;
      ((r = !0), clearInterval(l), document.removeEventListener("keydown", u));
      const p = Math.round(performance.now() - c),
        m = null != n && d.opts[n] === d.a;
      if (
        ($$("#dQ .super-opt", h).forEach((e, t) => {
          ((e.disabled = !0), d.opts[t] === d.a ? e.classList.add("y") : t === n && e.classList.add("n"));
        }),
        (S.stats.doorTried = (S.stats.doorTried || 0) + 1),
        m)
      ) {
        const e = 30,
          t = 50;
        let s = "";
        try {
          s = (a && a()) || "";
        } catch (e) {}
        ((S.stats.doorOk = (S.stats.doorOk || 0) + 1),
          (S.coins += e),
          addXP(t),
          updTop(),
          sfx("crystal"),
          burstEl($("#dQ .super-opt.y", h), 60, ["#E5484D", "#3B82F6", "#22A06B", "#FFC531"]),
          ($("#dNote", h).innerHTML =
            `<b class="ok">Door cracked! ${s ? s + " \xb7 " : ""}+${e} coins \xb7 +${t} XP</b> <span class="muted">in ${(p / 1e3).toFixed(1)} s</span>`));
      } else
        (sfx("bad"),
          ($("#dNote", h).innerHTML =
            `<b class="no">${null == n ? "Time is up!" : "Not this time."}</b> The answer is highlighted. No hearts lost.`));
      (save(),
        NET.track("door", { game: e, stage: t, ok: m, ms: p, tier: i[o] + 1 }),
        ($("#dGo", h).innerHTML = '<button class="btn w" id="dNext">Continue</button>'));
      const f = $("#dNext", h);
      (f.focus(),
        (f.onclick = () => {
          (closeModal(), s(m));
        }));
    };
  $$(".door", h).forEach((e) => (e.onclick = () => m(+e.dataset.d)));
}
