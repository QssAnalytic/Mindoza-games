/* ================= SCENES ================= */
const SC=[];
function hash(n){const x=Math.sin(n*12.9898+78.233)*43758.5453;return x-Math.floor(x)}
function canvasIn(root){root.innerHTML='';const cv=document.createElement('canvas');root.append(cv);const ctx=cv.getContext('2d');const st={W:300,H:200,cv,ctx};
 const rs=()=>{const r=root.getBoundingClientRect();const d=Math.min(2,devicePixelRatio||1);st.W=Math.max(50,r.width);st.H=Math.max(50,r.height);cv.width=Math.round(st.W*d);cv.height=Math.round(st.H*d);ctx.setTransform(d,0,0,d,0,0)};
 rs();st.ro=new ResizeObserver(rs);st.ro.observe(root);return st}
function rr(c,x,y,w,h,r){r=Math.min(r,w/2,h/2);c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()}
function avatarImg(){const img=new Image();img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(avatarSVG(S.av).replace('<svg','<svg xmlns="http://www.w3.org/2000/svg"'));return img}
const innerAv=(x,y,w)=>`<svg x="${x}" y="${y}" width="${w}" height="${w*1.12}" viewBox="0 -12 100 112">${avatarSVG(S.av).replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'')}</svg>`;
const FCOLS=[['#FF8A3D','#FFD7A8'],['#E63946','#FFC2C7'],['#7BC043','#E2F5C9'],['#9B5DE5','#E4D2FA'],['#FFD23F','#FFF4C2'],['#F15BB5','#FFD1EC']];
/* ---------- 1. DEEP DIVE MINE ---------- */
SC[0]=(root,api)=>{let q,lo,hi,yOf,mode,done=false;
 root.addEventListener('click',e=>{if(!q||done)return;const g=e.target.closest('.lvl');const gem=e.target.closest('.gem');
  if(g&&mode==='move'){done=true;const v=String(+g.dataset.v);const r=checkAns(q.ans,v);api.finish(r.ok,null,v)}
  if(gem&&mode==='compare'){done=true;const i=+gem.dataset.i;api.finish(i===q.ans.i,null,q.ans.opts[i])}});
 function build(lo0,hi0,cartAt,gems){lo=lo0;hi=hi0;const T=26,step=248/(hi-lo);yOf=v=>T+(hi-v)*step;const y0=Math.max(0,Math.min(300,yOf(0)));
  let s=`<svg viewBox="0 0 480 300" class="svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Mine shaft number line from ${num(lo)} to ${num(hi)}"><defs>
  <linearGradient id="mSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#58BFFF"/><stop offset="1" stop-color="#C9EEFF"/></linearGradient>
  <linearGradient id="mDirt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9A6B3C"/><stop offset=".5" stop-color="#5E3D22"/><stop offset="1" stop-color="#22150D"/></linearGradient></defs>
  <rect width="480" height="${y0}" fill="url(#mSky)"/><rect y="${y0}" width="480" height="${300-y0+1}" fill="url(#mDirt)"/>`;
  if(y0>50)s+=`<circle cx="420" cy="${Math.min(40,y0*.35)}" r="18" fill="#FFE066"/><g fill="#fff" opacity=".9"><ellipse cx="80" cy="${y0*.35}" rx="34" ry="11"/><ellipse cx="104" cy="${y0*.35-8}" rx="20" ry="10"/><ellipse cx="350" cy="${y0*.55}" rx="26" ry="8"/></g>`;
  for(let v=Math.min(hi,-1);v>=lo;v--)for(let c=0;c<20;c++){const h=hash(v*31+c*7);if(h>.2)continue;const x=c*24;if(x>140&&x<330)continue;const y=yOf(v)-step/2;
   const col=h<.035?'#5EE6FF':h<.06?'#FFD23F':h<.085?'#FF5C8A':'rgba(0,0,0,.2)';s+=`<rect x="${x+2}" y="${y+1.5}" width="20" height="${Math.max(4,Math.min(20,step-3))}" rx="2" fill="${col}"/>`}
  if(y0>0&&y0<300)s+=`<rect y="${y0-6}" width="480" height="9" fill="#4CC34C"/><rect y="${y0+3}" width="480" height="4" fill="#2E8B2E"/><text x="470" y="${y0-12}" text-anchor="end" fill="#0B3A5B" font-size="12" letter-spacing="1">SEA LEVEL 0</text>`;
  s+=`<rect x="198" y="0" width="94" height="300" fill="rgba(8,5,3,.42)"/><line x1="198" x2="198" y1="0" y2="300" stroke="#7A4E28" stroke-width="5"/><line x1="292" x2="292" y1="0" y2="300" stroke="#7A4E28" stroke-width="5"/>`;
  for(let v=lo;v<=hi;v++){const y=yOf(v);const show=step>=13||v%2===0;const above=v>0||(v===0);const lc=above&&yOf(v)<y0+1?'#0B3A5B':'#FFF1DC';
   s+=`<g class="lvl" data-v="${v}"><rect x="140" y="${y-step/2}" width="200" height="${step}" fill="transparent"/><line x1="200" x2="290" y1="${y}" y2="${y}" stroke="${v===0?'#fff':'rgba(255,255,255,.3)'}" stroke-width="${v===0?2.5:1}" ${v===0?'':'stroke-dasharray="4 5"'}/>${show?`<text x="188" y="${y+5}" text-anchor="end" class="mlab" fill="${lc}">${num(v)}</text>`:''}</g>`}
  (gems||[]).forEach((n,i)=>{const cols=['#5EE6FF','#FF5C8A','#FFD23F'];s+=`<g class="gem" data-i="${i}" style="cursor:pointer" transform="translate(${i?262:228} ${yOf(n)})"><circle r="22" fill="transparent"/><path d="M-13 -6L-7 -14H7L13 -6 0 12Z" fill="${cols[i]}" stroke="#fff" stroke-width="2"/><text x="${i?20:-20}" y="6" text-anchor="${i?'start':'end'}" fill="#fff" font-size="17" stroke="#1a0f08" stroke-width="4" paint-order="stroke">${num(n)}</text></g>`});
  s+=`<g id="cart" style="transform:translate(0px,${yOf(cartAt)}px);transition:transform 1s cubic-bezier(.45,1.45,.5,1)">${innerAv(228,-56,34)}<path d="M214 -27H276L270 -5H220Z" fill="#8A909E" stroke="#3B3F4A" stroke-width="3" stroke-linejoin="round"/><rect x="218" y="-22" width="54" height="4" fill="#B5BBC8"/><circle cx="227" cy="-3" r="5" fill="#2A2D36"/><circle cx="263" cy="-3" r="5" fill="#2A2D36"/></g></svg>`;
  root.innerHTML=s}
 const widen=(a,b)=>{let l=a,h=b;while(h-l<12){h++;l--}return[l,h]};
 return{present(q0){q=q0;done=false;mode=q.data.kind;const cb=(r,v)=>{done=true;api.finish(r.ok,r.why,v)};
  if(mode==='compare'){const n=q.data.nums;const[l,h]=widen(Math.min(...n)-2,Math.max(...n)+2);build(l,h,h,n);api.ui(q.ans,cb,{prompt:'Tap a gem or a button.'})}
  else if(mode==='move'){const a=q.data.start,b=q.data.end;const[l,h]=widen(Math.min(a,b)-2,Math.max(a,b)+2);build(l,h,a);api.ui(q.ans,cb,{label:'New level =',prompt:'Tap the new level on the shaft, or type it.'})}
  else{build(-10,4,0);api.ui(q.ans,cb)}},
 react(ok,q){const c=$('#cart',root);if(mode==='move'&&c){c.style.transform=`translate(0px,${yOf(q.data.end)}px)`;setTimeout(()=>{if(ok)api.burst(c,30,['#5EE6FF','#FFD23F','#fff'])},950)}
  else if(mode==='compare'){const g=$(`.gem[data-i="${q.ans.i}"]`,root);if(g)api.burst(g,ok?30:8,['#5EE6FF','#FFD23F'])}else if(ok&&c)api.burst(c,24)},
 destroy(){root.innerHTML=''}}};
/* restored from the live build */
SC[1] = (e, t) => {
  const s = canvasIn(e),
    a = s.ctx;
  let n,
    i,
    o = 1,
    r = null,
    l = null,
    c = 0,
    d = performance.now(),
    p = 0,
    h = !1,
    u = "idle",
    m = 0,
    f = [],
    g = !0,
    b = avatarImg(),
    v = 0,
    y = null;
  const x = Array.from({ length: 26 }, (e, t) => ({
      x: t / 26,
      h: 0.06 + 0.2 * hash(7 * t),
      w: 0.03 + 0.035 * hash(3 * t + 1),
      c: hash(5 * t),
    })),
    k = TRAILS[S.av.trail].c,
    w = () => 0.36 * s.H,
    T = (e) => 1 / (1 + 5 * e),
    A = () => Math.min(0.84 * s.W, 1.7 * s.H) / 3,
    C = (e, t) => s.W / 2 + (e - 1) * A() * t,
    M = (e) => w() + (s.H - w()) * e;
  function E(e) {
    ((o = Math.max(0, Math.min(2, e))), $$("#lanes button").forEach((e, t) => e.classList.toggle("lane-on", t === o)));
  }
  function N() {
    if (!g || !n) return;
    if (isN(i) || (isN(i.l) && isN(i.r)))
      return (
        (u = "final"),
        void t.ui(n.ans, (e, s) => t.finish(e.ok, e.why, s), {
          label: "Final value =",
          prompt: "One operation left. Work out the final value!",
        })
      );
    const e = bPairs(i),
      s = bReady(i)[0],
      a = e.find((e) => e.id === s.node.id),
      r = R.shuffle(e.filter((e) => e.id !== a.id && e.label !== a.label)).slice(0, 2),
      c = R.shuffle([{ ...a, ok: !0 }, ...r.map((e) => ({ ...e, ok: !1 }))]);
    for (; c.length < 3;) c.splice(R.int(0, c.length), 0, { label: "", block: !0, ok: !1 });
    ((l = { opts: c, z: 1, commit: !1, rd: s, correct: a }),
      (u = "gate"),
      (function () {
        const e = t.ctl();
        ((e.innerHTML =
          '<div class="muted" style="font-weight:700">Run into the part you must work out FIRST. Use \u2190 \u2192 or tap a lane to dash.</div><div class="choices" id="lanes"></div>'),
          l.opts.forEach((s, a) => {
            const n = H(
              `<button class="btn choice${a === o ? " lane-on" : ""}" data-l="${a}">${s.block ? "Blocked" : s.label}</button>`,
            );
            ((n.onclick = () => {
              (E(a), (l.commit = !0), t.sfx("click"));
            }),
              $("#lanes", e).append(n));
          }));
      })());
  }
  const F = (e) => {
    !l ||
      (document.activeElement && "INPUT" === document.activeElement.tagName) ||
      (("ArrowLeft" !== e.key && "a" !== e.key) || (E(o - 1), e.preventDefault()),
      ("ArrowRight" !== e.key && "d" !== e.key) || (E(o + 1), e.preventDefault()),
      ("ArrowUp" !== e.key && " " !== e.key) || ((l.commit = !0), e.preventDefault()));
  };
  return (
    document.addEventListener("keydown", F),
    s.cv.addEventListener("pointerdown", (e) => {
      y = e.clientX;
    }),
    s.cv.addEventListener("pointerup", (e) => {
      if (!l || null === y) return;
      const t = e.clientX - y;
      if (((y = null), Math.abs(t) > 40)) E(o + (t > 0 ? 1 : -1));
      else {
        const t = s.cv.getBoundingClientRect(),
          a = e.clientX - t.left;
        (E(Math.round((a - s.W / 2) / A() + 1)), (l.commit = !0));
      }
    }),
    (c = requestAnimationFrame(function e(n) {
      if (!g) return;
      const $ = Math.min(0.05, (n - d) / 1e3);
      if (((d = n), !h && ((p += $), l))) {
        const e = [7, 6.4, 5.8, 5.2][t.tier() - 1] || 6;
        ((t.calm() && l.z <= 0.33 && !l.commit) || (l.z -= ($ / e) * (l.commit ? 3 : 1)),
          l.z <= 0.02 &&
            (function () {
              const e = l;
              l = null;
              const a = e.opts[o],
                n = e.rd.node,
                r = bEval(n.op, n.l.n, n.r.n);
              if (a.ok) {
                (t.sfx("step"), (v = 1));
                for (let e = 0; e < 14; e++)
                  f.push({
                    x: C(o, 1),
                    y: 0.62 * s.H,
                    vx: 240 * (Math.random() - 0.5),
                    vy: 240 * -Math.random(),
                    l: 0.8,
                    c: "#FFC531",
                  });
              } else {
                const s = e.rd.depth > 0 ? "Anything in brackets comes first." : BWHY[e.rd.cls];
                t.mistake(
                  `${a.block ? "That lane was blocked!" : "Not <b>" + a.label + "</b> yet."} First you needed <b>${e.correct.label}</b>. ${s}`,
                );
              }
              i = bReplace(i, n.id, r);
              const c = t.expr();
              ((c.innerHTML = bStr(bTokens(i))),
                c.classList.remove("flash"),
                c.offsetWidth,
                c.classList.add("flash"),
                (u = "run"),
                setTimeout(N, 500));
            })());
      }
      ((m *= 0.88),
        (v = Math.max(0, v - 2 * $)),
        f.forEach((e) => {
          ((e.x += e.vx * $), (e.y += e.vy * $), (e.vy += 300 * $), (e.l -= $));
        }),
        (f = f.filter((e) => e.l > 0)),
        (function () {
          const e = s.W,
            n = s.H,
            i = a,
            c = i.createLinearGradient(0, 0, 0, w());
          (c.addColorStop(0, "#160A33"), c.addColorStop(1, "#6A1F73"), (i.fillStyle = c), i.fillRect(0, 0, e, w() + 1));
          for (let t = 0; t < 40; t++)
            ((i.fillStyle = `rgba(255,255,255,${0.3 + 0.5 * hash(t)})`),
              i.fillRect(hash(9 * t) * e, hash(13 * t) * w() * 0.6, 1.5, 1.5));
          x.forEach((t, s) => {
            const a = t.h * n,
              o = t.x * e;
            ((i.fillStyle = s % 2 ? "#2A1250" : "#3A1A63"),
              i.fillRect(o, w() - a, t.w * e, a),
              (i.fillStyle = t.c > 0.5 ? "#FF5FA2" : "#45D4FF"));
            for (let s = w() - a + 6; s < w() - 4; s += 10)
              for (let a = o + 3; a < o + t.w * e - 4; a += 7) hash(a * s) > 0.55 && i.fillRect(a, s, 3, 4);
          });
          const d = (e, t) => s.W / 2 + (e - 1.5) * A() * t;
          ((i.fillStyle = "#1D1030"),
            i.beginPath(),
            i.moveTo(d(0, T(1)), w()),
            i.lineTo(d(3, T(1)), w()),
            i.lineTo(d(3, 1.15), 1.03 * n),
            i.lineTo(d(0, 1.15), 1.03 * n),
            i.fill());
          const $ = "idle" === u ? 0.2 : h ? 0 : 1;
          for (let e = 0; e < 16; e++) {
            let t = (e / 16 - 0.45 * p * $) % 1;
            t < 0 && (t += 1);
            const s = T(t),
              a = M(s);
            ((i.strokeStyle = `rgba(255,180,255,${0.08 + 0.25 * s})`),
              (i.lineWidth = 1 + 5 * s),
              i.beginPath(),
              i.moveTo(d(0, s), a),
              i.lineTo(d(3, s), a),
              i.stroke());
          }
          for (let e = 0; e < 3; e++)
            for (const t of [-0.28, 0.28])
              ((i.strokeStyle = "#C9B6E8"),
                (i.lineWidth = 2),
                i.beginPath(),
                i.moveTo(C(e + t, T(1)), w()),
                i.lineTo(C(e + t, 1.15), 1.03 * n),
                i.stroke());
          if (l) {
            const e = T(Math.max(0, l.z)),
              t = M(e),
              s = A() * e * 0.88,
              a = Math.max(22, 70 * e);
            l.opts.forEach((n, r) => {
              const c = C(r, e);
              if (
                (i.save(),
                (i.shadowColor = "#F0367A"),
                (i.shadowBlur = 18 * e),
                (i.fillStyle = "#F0367A"),
                i.fillRect(c - s / 2 - 4 * e, t - a - 60 * e, 6 * e + 2, a + 60 * e),
                i.fillRect(c + s / 2 - 2 * e, t - a - 60 * e, 6 * e + 2, a + 60 * e),
                i.restore(),
                rr(i, c - s / 2, t - a - 60 * e, s, a, 8 * e),
                (i.fillStyle = n.block ? "#C62828" : "#FFFFFF"),
                i.fill(),
                n.block)
              ) {
                ((i.strokeStyle = "#fff"), (i.lineWidth = 4 * e));
                for (let s = -3; s < 4; s++)
                  (i.beginPath(),
                    i.moveTo(c + 14 * s * e, t - 60 * e - a),
                    i.lineTo(c + 14 * s * e + 0.6 * a, t - 60 * e),
                    i.stroke());
              }
              ((i.fillStyle = n.block ? "#fff" : "#1A0F33"),
                (i.font = `700 ${Math.round(11 + 20 * e)}px "Atkinson Hyperlegible",sans-serif`),
                (i.textAlign = "center"),
                (i.textBaseline = "middle"),
                i.fillText(n.block ? "BLOCKED" : n.label, c, t - 60 * e - a / 2, s - 6),
                r === o &&
                  l.z < 0.6 &&
                  ((i.strokeStyle = "#FFC531"),
                  (i.lineWidth = 3),
                  rr(i, c - s / 2 - 3, t - a - 60 * e - 3, s + 6, a + 6, 10 * e),
                  i.stroke()));
            });
          }
          (t.calm() &&
            l &&
            l.z <= 0.33 &&
            !l.commit &&
            ((i.fillStyle = "rgba(0,0,0,.45)"),
            rr(i, e / 2 - 120, 8, 240, 30, 10),
            i.fill(),
            (i.fillStyle = "#fff"),
            (i.font = '700 14px "Atkinson Hyperlegible",sans-serif'),
            (i.textAlign = "center"),
            i.fillText("Calm mode: take your time, then pick a lane", e / 2, 24)),
            "final" === u &&
              ((i.fillStyle = "#FFC531"),
              (i.font = "22px Bungee,sans-serif"),
              (i.textAlign = "center"),
              i.fillText("FINISH LINE", e / 2, w() + 30)));
          const g = C(o, 1);
          r = null === r ? g : r + 0.2 * (g - r);
          const y = n - 58 - m;
          (k.length &&
            "idle" !== u &&
            !h &&
            Math.random() < 0.7 &&
            f.push({
              x: r + 20 * (Math.random() - 0.5),
              y: y + 40,
              vx: 30 * (Math.random() - 0.5),
              vy: 60 + 60 * Math.random(),
              l: 0.6,
              c: k[R.int(0, k.length - 1)],
            }),
            f.forEach((e) => {
              ((i.globalAlpha = Math.max(0, e.l)),
                (i.fillStyle = e.c),
                i.beginPath(),
                i.arc(e.x, e.y, 4, 0, 7),
                i.fill());
            }),
            (i.globalAlpha = 1),
            (i.fillStyle = "rgba(0,0,0,.35)"),
            i.beginPath(),
            i.ellipse(r, n - 10, 26, 6, 0, 0, 7),
            i.fill());
          const S = Math.min(76, 0.26 * n);
          (b.complete && b.naturalWidth && i.drawImage(b, r - S / 2, y - 0.55 * S, S, 1.12 * S),
            v > 0 && ((i.fillStyle = `rgba(255,197,49,${0.25 * v})`), i.fillRect(0, 0, e, n)));
        })(),
        (c = requestAnimationFrame(e)));
    })),
    {
      present(e) {
        ((n = e),
          (i = n.data.tree),
          (o = 1),
          setTimeout(() => {
            ((l = null), N());
          }, 50),
          (u = "run"));
      },
      react(e) {
        (e && ((m = 46), t.burst(s.cv, 30)), (u = "idle"), (l = null));
      },
      pause(e) {
        h = e;
      },
      destroy() {
        ((g = !1), cancelAnimationFrame(c), s.ro.disconnect(), document.removeEventListener("keydown", F));
      },
    }
  );
};
/* ---------- 3. MONSTER ARENA ---------- */
const MNAMES=['Grumblefang','Sir Squish','Blobzilla','Fluffernaut','Zapgoblin','Mumblewump','Snarlpaca','Count Blobula','Wobbletron','Gloopasaur','Professor Pudding'];
function monsterG(m){const[c,d]=m.c;let s='<ellipse cx="0" cy="46" rx="48" ry="9" fill="#000" opacity=".22"/>';
 if(m.spikes)for(let k=-2;k<=2;k++)s+=`<path d="M${k*15-7} -32L${k*15} -54L${k*15+7} -32Z" fill="${d}"/>`;
 if(m.horns)s+=`<path d="M-28 -26Q-48 -64 -18 -44Z M28 -26Q48 -64 18 -44Z" fill="#FFF3D6" stroke="${d}" stroke-width="2"/>`;
 s+=`<ellipse cx="-24" cy="42" rx="13" ry="7" fill="${d}"/><ellipse cx="24" cy="42" rx="13" ry="7" fill="${d}"/><path d="M-46 8C-46 -30 -26 -42 0 -42S46 -30 46 8C46 36 28 46 0 46S-46 36 -46 8Z" fill="${c}" stroke="${d}" stroke-width="3"/><ellipse cx="0" cy="18" rx="27" ry="18" fill="#fff" opacity=".22"/>`;
 const ex={1:[0],2:[-15,15],3:[-21,0,21]}[m.eyes];ex.forEach(x=>{s+=`<circle cx="${x}" cy="-12" r="10" fill="#fff"/><circle cx="${x-2}" cy="-10" r="5" fill="#1A1A2E"/><path d="M${x-11} -26L${x+9} -21" stroke="#1A1A2E" stroke-width="3.5" stroke-linecap="round"/>`});
 s+='<path d="M-20 12Q0 32 20 12Z" fill="#3A0D1A"/><path d="M-13 14L-9 21L-5 15M5 15L9 21L13 14" fill="#fff"/>';return s}
SC[2]=(root,api)=>{let mon=null,q;
 function newMon(){const cols=[['#FF7A59','#B8401F'],['#8E7CFF','#4F3BC4'],['#3DD68C','#178A52'],['#FFC23D','#B37A00'],['#FF6FB5','#B53078'],['#4FC3F7','#157FB3']];
  mon={name:R.pick(MNAMES),c:R.pick(cols),eyes:R.int(1,3),horns:R.chance(.6),spikes:R.chance(.5),max:40+api.tier()*22};mon.hp=mon.max}
 function draw(){root.innerHTML=`<svg viewBox="0 0 480 300" class="svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Monster battle"><defs><linearGradient id="aSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFB861"/><stop offset=".6" stop-color="#FFE2A8"/><stop offset="1" stop-color="#9FDB6A"/></linearGradient></defs>
  <rect width="480" height="300" fill="url(#aSky)"/><path d="M0 170Q80 120 160 160T330 150T480 140V300H0Z" fill="#7CC152"/><path d="M0 210Q120 190 240 205T480 200V300H0Z" fill="#62A83E"/>
  <ellipse cx="355" cy="182" rx="88" ry="20" fill="#4F8F2E"/><ellipse cx="118" cy="268" rx="96" ry="20" fill="#4F8F2E"/>
  <g transform="translate(355 128)"><g id="enb">${monsterG(mon)}</g></g>${innerAv(66,164,104)}
  <g transform="translate(18 18)"><rect width="196" height="54" rx="12" fill="#fff" opacity=".92"/><text x="12" y="22" font-size="15" fill="#2A1500">${mon.name}</text><text x="184" y="22" font-size="12" text-anchor="end" fill="#6B4A2A">HP ${Math.max(0,Math.round(mon.hp))}/${mon.max}</text>
  <rect x="12" y="32" width="172" height="11" rx="5.5" fill="#E8DCC8"/><rect id="hpb" x="12" y="32" width="172" height="11" rx="5.5" fill="${mon.hp/mon.max>.35?'#3DDC97':'#FF5A5F'}" style="transform-box:fill-box;transform-origin:0 50%;transform:scaleX(${Math.max(0,mon.hp/mon.max)});transition:transform .5s"/></g>
  <circle id="proj" r="13" fill="#FFD23F" stroke="#fff" stroke-width="3" opacity="0"/><rect id="hurt" width="480" height="300" fill="#FF3B3B" opacity="0"/><text id="dmg" x="355" y="70" text-anchor="middle" font-size="30" fill="#fff" stroke="#B8401F" stroke-width="5" paint-order="stroke" opacity="0"></text></svg>`}
 return{present(q0){q=q0;if(!mon||mon.hp<=0)newMon();draw();api.ui(q.ans,(r,v)=>api.finish(r.ok,r.why,v),{label:(q.data.label||'Damage')+' =',prompt:'Work out the value to power your attack!'})},
  react(ok,q){const en=$('#enb',root),pr=$('#proj',root);if(!en)return;
   if(ok){pr.animate([{transform:'translate(125px,215px)',opacity:1},{transform:'translate(355px,125px)',opacity:1}],{duration:430,easing:'ease-in'}).onfinish=()=>{
     const dmg=Math.max(8,Math.min(45,Math.abs(q.ans.v||10)))+4*api.tier();mon.hp-=dmg;en.animate([{transform:'translate(0,0)'},{transform:'translate(14px,-4px)'},{transform:'translate(-10px,2px)'},{transform:'translate(0,0)'}],{duration:320});
     api.sfx('hit');const d=$('#dmg',root);d.textContent='−'+dmg;d.animate([{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-30px)'}],{duration:900});
     const b=$('#hpb',root);b.style.transform=`scaleX(${Math.max(0,mon.hp/mon.max)})`;
     if(mon.hp<=0){setTimeout(()=>{const e=$('#enb',root);if(e)e.animate([{transform:'none',opacity:1},{transform:'translateY(40px) scaleY(.4)',opacity:0}],{duration:600,fill:'forwards'});api.toast(mon.name+' fainted! +5 coins');api.coins(5)},350)}}}
   else{en.animate([{transform:'translate(0,0)'},{transform:'translate(-180px,90px) scale(1.2)'},{transform:'translate(0,0)'}],{duration:520,easing:'ease-in-out'});setTimeout(()=>{const h=$('#hurt',root);h&&h.animate([{opacity:.45},{opacity:0}],{duration:400})},250)}},
  destroy(){root.innerHTML=''}}};
/* restored from the live build */
SC[3] = (e, t) => {
  let s,
    a = Array(16).fill(null),
    n = 0,
    i = -1,
    o = -1;
  const r = [
    "#FFF3D6",
    "#FFE3A3",
    "#FFD07A",
    "#FFB55C",
    "#FF9A4A",
    "#FF8045",
    "#F26449",
    "#E4555E",
    "#D9488A",
    "#B356D6",
    "#8C5CE6",
  ];
  e.innerHTML =
    '<div class="g2048"><div class="b2048" id="b2" role="grid" aria-label="Power tiles"></div><div class="combo" id="combo"></div></div>';
  const l = () => mon(R.pick(["a", "x", "y", "m", "n"]), R.int(1, 9));
  for (let e = 0; e < 7; e++) a[R.int(0, 15)] = l();
  function c(t) {
    (($("#b2", e).innerHTML = a
      .map(
        (e, s) =>
          `<div class="cell" role="gridcell"><div class="tile ${e ? "" : "empty"} ${s === i || s === o ? "act" : ""} ${s === t ? "popin" : ""}" data-i="${s}" style="--tc:${
            r[
              Math.min(
                10,
                ((e) => {
                  if (!e) return 0;
                  const t = e.match(/[\u2070\xb9\xb2\xb3\u2074-\u2079]+/);
                  return t && !/^power/.test(e)
                    ? +[...t[0]].map((e) => SUPD.indexOf(e)).join("")
                    : /[a-z]/.test(e.replace("power", ""))
                      ? 1
                      : 0;
                })(e),
              )
            ]
          }">${e || ""}</div></div>`,
      )
      .join("")),
      ($("#combo", e).textContent = n > 1 ? "Combo \xd7" + n : ""));
  }
  return {
    present(e) {
      ((s = e), (i = R.int(0, 15)));
      const n = Math.floor(i / 4),
        r = i % 4,
        l = [];
      (r < 3 && l.push(i + 1),
        n < 3 && l.push(i + 4),
        r > 0 && l.push(i - 1),
        n > 0 && l.push(i - 4),
        (o = R.pick(l)),
        (a[i] = s.data.L),
        (a[o] = "^" === s.data.op ? "power " + s.data.Rt : s.data.Rt),
        c(),
        (function () {
          const e = t.ctl();
          ((e.innerHTML =
            '<div class="muted" style="font-weight:700">Step 1: which index law merges these tiles?</div><div class="rules"></div>'),
            [
              ["add", "Add the powers"],
              ["sub", "Subtract the powers"],
              ["mul", "Multiply the powers"],
            ].forEach(([a, n]) => {
              const i = H(`<button class="btn ghost">${n}</button>`);
              ((i.onclick = () => {
                a === s.data.rule
                  ? (t.sfx("step"),
                    t.ui(s.ans, (e, s) => t.finish(e.ok, e.why, s), {
                      label: "Merged tile =",
                      prompt: "Step 2: type the merged tile. Use ^ for powers, e.g. a^5.",
                    }))
                  : ((i.disabled = !0), t.mistake(`Not that law. ${s.rule}`));
              }),
                $(".rules", e).append(i));
            }));
        })());
    },
    react(s, r) {
      const d = $(`.tile[data-i="${i}"]`, e),
        p = $(`.tile[data-i="${o}"]`, e);
      if (d && p) {
        const e = d.getBoundingClientRect(),
          t = p.getBoundingClientRect();
        ((p.style.transform = `translate(${e.left - t.left}px,${e.top - t.top}px) scale(.6)`),
          (p.style.opacity = ".4"));
      }
      ((n = s ? n + 1 : 0),
        setTimeout(() => {
          const n = i;
          ((a[i] = s ? r.ans.show : a[i]), (a[o] = null), (i = o = -1));
          const d = a.map((e, t) => (e ? -1 : t)).filter((e) => e >= 0);
          for (let e = 0; e < 1 + (d.length > 4 ? 1 : 0) && d.length; e++) {
            const e = d.splice(R.int(0, d.length - 1), 1)[0];
            a[e] = l();
          }
          if (a.filter(Boolean).length > 13) {
            const e = a.findIndex((e, t) => e && t !== n);
            a[e] = null;
          }
          (c(n), s && t.burst($(`.tile[data-i="${n}"]`, e), 26, ["#FFD07A", "#FF8045", "#fff"]));
        }, 280));
    },
    destroy() {
      e.innerHTML = "";
    },
  };
};
/* ---------- 5. BALANCE DUNGEON ---------- */
SC[4]=(root,api)=>{let q,st,valid=[];
 function draw(){root.innerHTML=`<svg viewBox="0 0 480 300" class="svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Balance scale"><defs><pattern id="brk" width="48" height="24" patternUnits="userSpaceOnUse"><rect width="48" height="24" fill="#183238"/><rect x="1" y="1" width="46" height="10" rx="1" fill="#22444C"/><rect x="-23" y="13" width="46" height="10" rx="1" fill="#22444C"/><rect x="25" y="13" width="46" height="10" rx="1" fill="#22444C"/></pattern>
  <radialGradient id="glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFD27A" stop-opacity=".55"/><stop offset="1" stop-color="#FFD27A" stop-opacity="0"/></radialGradient></defs>
  <rect width="480" height="300" fill="url(#brk)"/><rect y="252" width="480" height="48" fill="#0F2226"/><rect y="250" width="480" height="4" fill="#2EC4B6" opacity=".5"/>
  ${[30,372].map(x=>`<circle cx="${x}" cy="92" r="40" fill="url(#glow)"/><rect x="${x-4}" y="96" width="8" height="26" fill="#6B4423"/><ellipse cx="${x}" cy="88" rx="7" ry="11" fill="#FFB238"><animate attributeName="ry" values="11;14;9;11" dur=".7s" repeatCount="indefinite"/></ellipse><ellipse cx="${x}" cy="91" rx="3.5" ry="6" fill="#FFF0A8"/>`).join('')}
  <path d="M402 252V150Q434 108 466 150V252Z" fill="#0A1518" stroke="#6C5CE7" stroke-width="4"/><g id="treasure"><circle cx="434" cy="225" r="16" fill="#FFC531" opacity=".9"/><path d="M426 225l8-12 8 12-8 12z" fill="#fff" opacity=".7"/></g>
  <g id="bars">${[412,424,436,448,460].map(x=>`<rect x="${x-2.5}" y="128" width="5" height="124" fill="#8A97A8"/>`).join('')}<rect x="404" y="176" width="62" height="5" fill="#8A97A8"/></g>
  <path d="M170 252L200 228L230 252Z" fill="#3B2A1A"/><rect x="196" y="92" width="8" height="140" fill="#6B4423"/><circle cx="200" cy="90" r="9" fill="#FFC531" stroke="#8A5F00" stroke-width="2"/>
  <g id="beam" style="transform-box:view-box;transform-origin:200px 90px"><rect x="56" y="85" width="288" height="10" rx="5" fill="#8B5A2B" stroke="#4A2E12" stroke-width="2"/>
   <path d="M88 92L56 176M88 92L120 176M312 92L280 176M312 92L344 176" stroke="#C9B48A" stroke-width="2"/><path d="M42 176H134Q128 200 88 200T42 176Z" fill="#D4A24C" stroke="#7A5418" stroke-width="2.5"/><path d="M266 176H358Q352 200 312 200T266 176Z" fill="#D4A24C" stroke="#7A5418" stroke-width="2.5"/>
   <text id="lt" x="88" y="166" text-anchor="middle" fill="#fff" stroke="#0F2226" stroke-width="5" paint-order="stroke"></text><text id="rt" x="312" y="166" text-anchor="middle" fill="#fff" stroke="#0F2226" stroke-width="5" paint-order="stroke"></text></g></svg>`;show()}
 function sides(){if(st.br)return[`${st.br.k}(x ${st.br.m<0?MI:'+'} ${Math.abs(st.br.m)})`,num(st.br.e)];return[sideStr(st.a,st.b),eqDone(st)?'?':sideStr(st.c,st.d)]}
 function show(){const[l,r]=sides();const lt=$('#lt',root),rt=$('#rt',root);lt.textContent=l;rt.textContent=r;[lt,rt].forEach(t=>t.setAttribute('font-size',t.textContent.length>8?18:t.textContent.length>5?22:27));api.expr().innerHTML=l+' = '+r}
 function tilt(a){const b=$('#beam',root);b&&b.animate([{transform:'rotate(0deg)'},{transform:`rotate(${a}deg)`},{transform:`rotate(${-a*.5}deg)`},{transform:'rotate(0deg)'}],{duration:750,easing:'ease-in-out'})}
 function cards(){if(eqDone(st)){show();api.ui(q.ans,(r,v)=>api.finish(r.ok,r.why,v),{label:'x =',prompt:'x is on its own! Last step: work out the value of x.'});return}
  valid=eqMoves(st);const seen=new Set(),list=[];[...valid,...R.shuffle(eqDistract(st,valid))].forEach(m=>{const l=moveLabel(m);if(!seen.has(l)&&list.length<4){seen.add(l);list.push(m)}});
  const ctl=api.ctl();ctl.innerHTML='<div class="muted" style="font-weight:700">Drag a card onto the scale (or tap it) to do it to BOTH sides.</div><div class="cards"></div>';const wrap=$('.cards',ctl);
  R.shuffle(list).forEach(m=>{const c=H(`<button class="opcard">${moveLabel(m)}</button>`);wrap.append(c);
   c.addEventListener('click',e=>{if(e.detail===0)apply(m,c)});
   c.addEventListener('pointerdown',e=>{if(e.button)return;e.preventDefault();const sx=e.clientX,sy=e.clientY;let gh=null;try{c.setPointerCapture(e.pointerId)}catch(_){}
    const mv=ev=>{if(!gh&&Math.hypot(ev.clientX-sx,ev.clientY-sy)>8){gh=c.cloneNode(true);gh.classList.add('ghostcard');document.body.append(gh)}if(gh){gh.style.left=ev.clientX+'px';gh.style.top=ev.clientY+'px'}};
    const up=ev=>{c.removeEventListener('pointermove',mv);c.removeEventListener('pointerup',up);c.removeEventListener('pointercancel',up);if(gh){gh.remove();const r=root.getBoundingClientRect();if(ev.clientX>=r.left&&ev.clientX<=r.right&&ev.clientY>=r.top&&ev.clientY<=r.bottom)apply(m,c)}else if(ev.type==='pointerup')apply(m,c)};
    c.addEventListener('pointermove',mv);c.addEventListener('pointerup',up);c.addEventListener('pointercancel',up)})})}
 function apply(m,c){const cur=api.cur();if(!cur||cur.done)return;if(valid.some(v=>v.k===m.k&&v.v===m.v)){st=eqApply(st,m);api.sfx('step');tilt(m.v>0?-8:8);show();cards()}
  else{tilt(16);c.classList.add('used');c.disabled=true;api.mistake(`<b>${moveLabel(m)}</b> does not get x on its own. Better move: ${moveWhy(valid[0])}.`)}}
 return{present(q0){q=q0;st=JSON.parse(JSON.stringify(q.data.state));draw();cards()},
  react(ok){if(ok){const b=$('#bars',root);b&&b.animate([{transform:'translateY(0)'},{transform:'translateY(-120px)'}],{duration:700,fill:'forwards',easing:'ease-out'});setTimeout(()=>api.burst($('#treasure',root),30,['#FFC531','#2EC4B6','#fff']),500)}else tilt(18)},
  destroy(){root.innerHTML=''}}};
