/* ---------- 6. MYSTERY MANSION ---------- */
function subEval(eq,vars,vals){return eq.split('=').map(side=>{side=side.trim();const disp=side.replace(/(\d?)([a-z])/g,(m,d,l)=>{const i=vars.indexOf(l);if(i<0)return m;const v=vals[i];return d?d+'('+num(v)+')':(v<0?'('+num(v)+')':num(v))});
 const ev=side.replace(/[a-z]/g,l=>{const i=vars.indexOf(l);return i<0?l:'('+vals[i]+')'});let val=NaN;try{val=P.val(parsePoly(ev,true))}catch(e){}return{disp,val}})}
/* ---------- 9. CITY BUILDER ---------- */
function shapeSVG(sh){const lab=(x,y,t,a='middle')=>`<text x="${x}" y="${y}" text-anchor="${a}" font-size="17" fill="#fff" stroke="#0A3550" stroke-width="5" paint-order="stroke">${t}</text>`;const u=v=>/x/.test(String(v))?v:v+' m';
 let Wd,Ht,pts,extra=c=>'';const N=v=>+v||0;
 switch(sh.k){case'sq':case'rect':{Wd=sh.alg?7:sh.w;Ht=sh.alg?(String(sh.h).includes('x')?4:3):sh.h;pts=[[0,0],[Wd,0],[Wd,Ht],[0,Ht]];extra=(m)=>lab(m.x(Wd/2),m.y(Ht)+22,u(sh.w))+lab(m.x(Wd)+8,m.y(Ht/2)+6,u(sh.h),'start');break}
  case'tri':{const b=sh.alg?6:N(sh.b),h=sh.alg?5:N(sh.h),ax=b*.35;Wd=b;Ht=h;pts=[[0,h],[b,h],[ax,0]];extra=m=>`<line x1="${m.x(ax)}" y1="${m.y(0)}" x2="${m.x(ax)}" y2="${m.y(h)}" stroke="#fff" stroke-width="2" stroke-dasharray="6 5"/><rect x="${m.x(ax)}" y="${m.y(h)-12}" width="12" height="12" fill="none" stroke="#fff" stroke-width="2"/>`+lab(m.x(b/2),m.y(h)+22,u(sh.b))+lab(m.x(ax)-8,m.y(h/2),u(sh.h),'end');break}
  case'para':{const off=sh.h*.5;Wd=sh.b+off;Ht=sh.h;pts=[[off,0],[off+sh.b,0],[sh.b,sh.h],[0,sh.h]];extra=m=>`<line x1="${m.x(off)}" y1="${m.y(0)}" x2="${m.x(off)}" y2="${m.y(sh.h)}" stroke="#fff" stroke-width="2" stroke-dasharray="6 5"/>`+lab(m.x(sh.b/2),m.y(sh.h)+22,u(sh.b))+lab(m.x(off)+8,m.y(sh.h/2)+6,u(sh.h),'start')+lab(m.x(off/2)-10,m.y(sh.h/2)+6,'slant '+u(sh.sl),'end');break}
  case'trap':{const o=(sh.b-sh.a)/2;Wd=sh.b;Ht=sh.h;pts=[[o,0],[o+sh.a,0],[sh.b,sh.h],[0,sh.h]];extra=m=>`<line x1="${m.x(o)}" y1="${m.y(0)}" x2="${m.x(o)}" y2="${m.y(sh.h)}" stroke="#fff" stroke-width="2" stroke-dasharray="6 5"/>`+lab(m.x(sh.b/2),m.y(0)-8,'a = '+u(sh.a))+lab(m.x(sh.b/2),m.y(sh.h)+22,'b = '+u(sh.b))+lab(m.x(o)+8,m.y(sh.h/2)+6,'h = '+u(sh.h),'start');break}
  case'L':{const{W,H,cw,ch}=sh;Wd=W;Ht=H;pts=[[0,0],[W-cw,0],[W-cw,ch],[W,ch],[W,H],[0,H]];extra=m=>lab(m.x(W/2),m.y(H)+22,u(W))+lab(m.x(0)-8,m.y(H/2)+6,u(H),'end')+lab(m.x(W-cw/2),m.y(ch)-8,u(cw))+lab(m.x(W-cw)+8,m.y(ch/2)+6,u(ch),'start');break}}
 const sc=Math.min(210/Wd,175/Ht);const ox=30+(230-Wd*sc)/2+10,oy=40+(175-Ht*sc)/2;const m={x:v=>ox+v*sc,y:v=>oy+v*sc};
 return`<polygon id="plot" points="${pts.map(p=>m.x(p[0])+','+m.y(p[1])).join(' ')}" fill="url(#turf)" stroke="#fff" stroke-width="3" stroke-linejoin="round"/>${extra(m)}`}
function building(i,x,y,grow){const h=hash(i*3.7),tall=20+Math.round(h*26),col=['#FF6B6B','#4ECDC4','#FFE66D','#A06CD5','#F7B267','#5DADE2'][i%6];
 let s=`<g class="${grow?'grow':''}"><rect x="${x+6}" y="${y+44-tall}" width="36" height="${tall}" fill="${col}" stroke="#123" stroke-width="1.5"/>`;
 for(let wy=y+48-tall;wy<y+38;wy+=8)for(let wx=x+10;wx<x+38;wx+=9)s+=`<rect x="${wx}" y="${wy}" width="5" height="4" fill="#FFF7C2"/>`;
 s+=h>.5?`<path d="M${x+3} ${y+45-tall}L${x+24} ${y+30-tall}L${x+45} ${y+45-tall}Z" fill="#B23A48"/>`:`<rect x="${x+20}" y="${y+38-tall}" width="3" height="7" fill="#123"/>`;return s+'</g>'}
/* ---------- 10. FINAL BOSS ---------- */
function drChaos(){return`<ellipse cx="0" cy="116" rx="62" ry="10" fill="#000" opacity=".3"/><path id="coat" d="M-48 18L-60 112H60L48 18Q0 4 -48 18Z" fill="#F4F4F8" stroke="#2A2340" stroke-width="3"/><path d="M-14 18L0 60L14 18Z" fill="#7B2FE0"/><path d="M-14 18L-26 70M14 18L26 70" stroke="#2A2340" stroke-width="2.5"/>
 <path d="M48 30L80 -6" stroke="#F4F4F8" stroke-width="16" stroke-linecap="round"/><rect x="72" y="-40" width="14" height="36" rx="6" fill="#B6FF6B" stroke="#2A2340" stroke-width="2.5"><animate attributeName="fill" values="#B6FF6B;#FF6BE1;#B6FF6B" dur="1.4s" repeatCount="indefinite"/></rect>
 <path d="M-44 -34L-58 -62L-34 -50L-30 -80L-14 -58L0 -88L12 -58L30 -82L32 -52L58 -64L44 -32Z" fill="#E8E8F0" stroke="#9A98B0" stroke-width="2"/><circle cx="0" cy="-22" r="36" fill="#FFD9B8" stroke="#2A2340" stroke-width="3"/>
 <rect x="-34" y="-36" width="68" height="6" fill="#2A2340"/><circle cx="-13" cy="-30" r="12" fill="#7FE7FF" stroke="#2A2340" stroke-width="4"/><circle cx="13" cy="-30" r="12" fill="#7FE7FF" stroke="#2A2340" stroke-width="4"/><circle cx="-10" cy="-28" r="4" fill="#2A2340"/><circle cx="16" cy="-28" r="4" fill="#2A2340"/>
 <path d="M-26 -46L-4 -40M26 -46L4 -40" stroke="#2A2340" stroke-width="4" stroke-linecap="round"/><path d="M-16 -6Q0 6 16 -6Q0 -2 -16 -6Z" fill="#6B4A2A"/><path d="M-14 0Q0 18 14 0Z" fill="#3A0D1A"/><path d="M-9 1L-6 7L-3 2M3 2L6 7L9 1" fill="#fff"/>`}
SC[5]=(root,api)=>{let q;
 function draw(){const d=q.data;root.innerHTML=`<svg viewBox="0 0 480 300" class="svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Two clue cards and a locked vault"><defs><pattern id="wp" width="30" height="30" patternUnits="userSpaceOnUse"><rect width="30" height="30" fill="#2A1544"/><path d="M15 4l4 11-4 11-4-11z" fill="#3A1F5C"/></pattern>
  <radialGradient id="vg" cx=".4" cy=".35"><stop offset="0" stop-color="#C9CED8"/><stop offset="1" stop-color="#5D6575"/></radialGradient></defs><rect width="480" height="300" fill="url(#wp)"/><rect y="262" width="480" height="38" fill="#1A0D2B"/>
  <rect x="190" y="16" width="70" height="56" rx="4" fill="#0E1640" stroke="#6B4423" stroke-width="5"/><circle cx="238" cy="36" r="10" fill="#FFF6C9"/><line x1="225" x2="225" y1="16" y2="72" stroke="#6B4423" stroke-width="3"/>
  ${[d.e1,d.e2].map((e,i)=>`<g transform="translate(22 ${40+i*112}) rotate(${i?2:-3})"><rect width="216" height="86" rx="6" fill="#FFF7E0" stroke="#C9A96E" stroke-width="2"/><circle cx="108" cy="8" r="6" fill="#E04BA8"/><text x="14" y="28" font-size="12" fill="#8B6B3A" letter-spacing="1.5">CLUE ${i+1}</text>
   <text x="108" y="58" text-anchor="middle" font-size="${e.length>14?20:24}" fill="#2A1544">${e}</text><text id="chk${i}" x="108" y="80" text-anchor="middle" font-size="13"></text></g>`).join('')}
  <g transform="translate(368 158)"><circle r="92" fill="#3A3F4D"/><g id="vdoor" style="transform-box:view-box;transform-origin:-80px 0px"><circle r="84" fill="url(#vg)" stroke="#2A2F3A" stroke-width="5"/>${[0,1,2,3,4,5].map(k=>`<circle cx="${Math.cos(k)*68}" cy="${Math.sin(k)*68}" r="5" fill="#2A2F3A"/>`).join('')}
   <g id="dial"><circle r="30" fill="#2A2F3A"/><circle r="22" fill="#8A93A6"/><rect x="-3" y="-34" width="6" height="18" fill="#FFC531"/></g></g>
   <rect x="-50" y="-128" width="100" height="30" rx="8" fill="#0A0A14" stroke="#E04BA8" stroke-width="2"/><text id="code" y="-107" text-anchor="middle" font-size="18" fill="#FF7AD0" letter-spacing="4">? ?</text></g></svg>`}
 return{present(q0){q=q0;draw();api.ui(q.ans,(r,v)=>{const vals=v.map(s=>{try{return P.val(parsePoly(s,true))}catch(e){return NaN}});const lines=[];
   [q.data.e1,q.data.e2].forEach((e,i)=>{const[L,Rr]=subEval(e,q.data.vars,vals);const ok=Math.abs(L.val-Rr.val)<1e-7;const t=$('#chk'+i,root);if(t){t.textContent=`${L.disp} = ${num(L.val)} ${ok?'✓':'✗ needs '+Rr.disp}`;t.setAttribute('fill',ok?'#0E8A57':'#C62828')}
    lines.push(`<div class="${ok?'ok':'no'}">Clue ${i+1}: ${L.disp} = ${num(L.val)} ${ok?'✓':'✗ should be '+Rr.disp}</div>`)});
   const c=$('#code',root);if(c)c.textContent=v.join(' ');api.ctl().insertAdjacentHTML('beforeend',`<div class="check-lines">${lines.join('')}</div>`);
   const dial=$('#dial',root);dial&&dial.animate([{transform:'rotate(0)'},{transform:'rotate(540deg)'}],{duration:700,easing:'ease-out'});api.finish(r.ok,r.ok?null:'Your values did not fit both clues.',v)},{btn:'Crack the vault',prompt:'Find both values, then check them in BOTH clues.'})},
  react(ok){if(ok)setTimeout(()=>{const d=$('#vdoor',root);if(d){d.animate([{transform:'none'},{transform:'scaleX(.15)'}],{duration:700,fill:'forwards',easing:'ease-in'});api.burst(d,40,['#FFC531','#E04BA8','#fff'])}},450)},
  destroy(){root.innerHTML=''}}};
/* restored from the live build */
SC[6] = (e, t) => {
  const s = canvasIn(e),
    a = s.ctx;
  let n,
    i,
    o = [],
    r = 0,
    l = [],
    c = [],
    d = [],
    p = [],
    h = 0.4,
    u = performance.now(),
    m = !1,
    f = !0,
    g = !1,
    b = 0,
    v = !1,
    y = !1;
  const x = (e) => (0 === e ? o[0] : o[1].replace(/^([+\u2212])/, " $1 "));
  function k() {
    t.expr().innerHTML = `${n.expr} = <span style="color:var(--w1)">${o
      .slice(0, r)
      .map((e, t) => x(t))
      .join("")}</span>${r < 2 ? ' <span class="muted">___</span>' : ""}`;
  }
  function w(e) {
    ((e.dead = !0), t.sfx("slice"));
    for (let t = -1; t <= 1; t += 2)
      c.push({
        x: e.x,
        y: e.y,
        vx: e.vx + 90 * t,
        vy: 0.3 * e.vy - 60,
        r: e.r,
        col: e.col,
        rot: e.rot,
        vr: 4 * t,
        s: t,
        g: e.g,
        l: 1.4,
      });
    for (let t = 0; t < 12; t++)
      d.push({ x: e.x, y: e.y, vx: 300 * (Math.random() - 0.5), vy: 300 * (Math.random() - 0.5), c: e.col[0], l: 0.6 });
    v &&
      (e.lab === o[r]
        ? (r++, k(), t.sfx("step"), 2 === r && ((v = !1), t.finish(!0)))
        : 0 === r && e.lab === o[1]
          ? t.mistake(`Right term, wrong order! Slice the first term <b>${o[0]}</b> before <b>${o[1]}</b>.`)
          : t.mistake(`<b>${e.lab}</b> is not part of the expansion. ${n.rule}`));
  }
  function S(e, t) {
    for (const s of l) {
      if (s.dead) continue;
      const a = t.x - e.x,
        n = t.y - e.y,
        i = a * a + n * n || 1;
      let o = ((s.x - e.x) * a + (s.y - e.y) * n) / i;
      o = Math.max(0, Math.min(1, o));
      const r = e.x + o * a - s.x,
        l = e.y + o * n - s.y;
      if (r * r + l * l < s.r * s.r) {
        w(s);
        break;
      }
    }
  }
  const T = (e) => {
    const t = s.cv.getBoundingClientRect();
    return { x: e.clientX - t.left, y: e.clientY - t.top, l: 0.25 };
  };
  return (
    s.cv.addEventListener("pointerdown", (e) => {
      if (m || g) return;
      y = !0;
      const t = T(e);
      ((p = [t]), S(t, t));
    }),
    s.cv.addEventListener("pointermove", (e) => {
      if (!y) return;
      const t = T(e),
        s = p[p.length - 1] || t;
      (p.push(t), S(s, t));
    }),
    addEventListener("pointerup", () => (y = !1)),
    (i = requestAnimationFrame(function e($) {
      if (!f) return;
      const y = Math.min(0.05, ($ - u) / 1e3);
      if (((u = $), !m)) {
        v &&
          !g &&
          ((h -= y),
          h <= 0 &&
            ((function () {
              let e;
              if ((b++, b >= 3 || Math.random() < 0.38)) ((e = o[r]), (b = 0));
              else {
                const t = [...n.data.wrong];
                (0 === r && t.push(o[1]), (e = R.pick(t)));
              }
              const a = s.W,
                i = s.H,
                c = t.calm() ? 230 : 480,
                d = a * (0.15 + 0.7 * Math.random()),
                p = i * (0.5 + 0.25 * Math.random());
              l.push({
                x: d,
                y: i + 40,
                vx: (a / 2 - d) * (0.25 + 0.3 * Math.random()),
                vy: -Math.sqrt(2 * c * p),
                g: c,
                r: Math.max(30, Math.min(46, 0.075 * a)),
                lab: e,
                col: R.pick(FCOLS),
                rot: 0,
                vr: 2 * (Math.random() - 0.5),
              });
            })(),
            (h = t.calm() ? 1.6 : 0.95)));
        for (const e of l) ((e.vy += e.g * y), (e.x += e.vx * y), (e.y += e.vy * y), (e.rot += e.vr * y));
        l = l.filter((e) => !(e.dead || (e.vy > 0 && e.y > s.H + 60)));
        for (const e of c) ((e.vy += e.g * y), (e.x += e.vx * y), (e.y += e.vy * y), (e.rot += e.vr * y), (e.l -= y));
        c = c.filter((e) => e.l > 0);
        for (const e of d) ((e.x += e.vx * y), (e.y += e.vy * y), (e.vy += 400 * y), (e.l -= y));
        d = d.filter((e) => e.l > 0);
      }
      (p.forEach((e) => (e.l -= y)),
        (p = p.filter((e) => e.l > 0)),
        (function () {
          const e = s.W,
            t = s.H,
            i = a,
            o = i.createLinearGradient(0, 0, 0, t);
          (o.addColorStop(0, "#4A2416"), o.addColorStop(1, "#1E0E08"), (i.fillStyle = o), i.fillRect(0, 0, e, t));
          for (let s = 0; s < e; s += 46) ((i.fillStyle = "rgba(255,220,170,.05)"), i.fillRect(s, 0, 22, t));
          if (n) {
            (i.save(), (i.font = `700 ${Math.min(30, 0.06 * e)}px "Atkinson Hyperlegible",sans-serif`));
            const t = i.measureText(n.expr).width + 40;
            (rr(i, e / 2 - t / 2, 12, t, 48, 24),
              (i.fillStyle = "#08A87D"),
              i.fill(),
              (i.strokeStyle = "#fff"),
              (i.lineWidth = 3),
              i.stroke(),
              (i.fillStyle = "#fff"),
              (i.textAlign = "center"),
              (i.textBaseline = "middle"),
              i.fillText(n.expr, e / 2, 37),
              i.restore());
          }
          for (const e of l)
            e.dead ||
              (i.save(),
              i.translate(e.x, e.y),
              i.rotate(0.15 * e.rot),
              (i.fillStyle = e.col[0]),
              i.beginPath(),
              i.arc(0, 0, e.r, 0, 7),
              i.fill(),
              (i.fillStyle = "#3E7D2A"),
              i.beginPath(),
              i.ellipse(0.3 * e.r, 0.95 * -e.r, 0.3 * e.r, 0.14 * e.r, -0.5, 0, 7),
              i.fill(),
              (i.fillStyle = e.col[1]),
              i.beginPath(),
              i.arc(0, 0, 0.72 * e.r, 0, 7),
              i.fill(),
              (i.fillStyle = "#1A0A04"),
              (i.font = `700 ${Math.round(0.55 * e.r)}px "Atkinson Hyperlegible",sans-serif`),
              (i.textAlign = "center"),
              (i.textBaseline = "middle"),
              i.fillText(e.lab, 0, 2, 1.4 * e.r),
              i.restore());
          for (const e of c)
            (i.save(),
              (i.globalAlpha = Math.max(0, e.l)),
              i.translate(e.x, e.y),
              i.rotate(e.rot),
              (i.fillStyle = e.col[0]),
              i.beginPath(),
              i.arc(0, 0, e.r, e.s > 0 ? -Math.PI / 2 : Math.PI / 2, e.s > 0 ? Math.PI / 2 : 1.5 * Math.PI),
              i.fill(),
              (i.fillStyle = e.col[1]),
              i.beginPath(),
              i.arc(0, 0, 0.72 * e.r, e.s > 0 ? -Math.PI / 2 : Math.PI / 2, e.s > 0 ? Math.PI / 2 : 1.5 * Math.PI),
              i.fill(),
              i.restore());
          for (const e of d)
            ((i.globalAlpha = Math.max(0, 1.6 * e.l)),
              (i.fillStyle = e.c),
              i.beginPath(),
              i.arc(e.x, e.y, 3.5, 0, 7),
              i.fill());
          if (((i.globalAlpha = 1), p.length > 1)) {
            ((i.strokeStyle = "rgba(255,255,255,.9)"), (i.lineCap = "round"));
            for (let e = 1; e < p.length; e++)
              ((i.lineWidth = 2 + 0.7 * e),
                (i.globalAlpha = Math.max(0, 4 * p[e].l)),
                i.beginPath(),
                i.moveTo(p[e - 1].x, p[e - 1].y),
                i.lineTo(p[e].x, p[e].y),
                i.stroke());
            i.globalAlpha = 1;
          }
          g &&
            n &&
            ((i.fillStyle = "rgba(0,0,0,.5)"),
            i.fillRect(0, 0, e, t),
            (i.fillStyle = "#fff"),
            (i.font = '700 18px "Atkinson Hyperlegible",sans-serif'),
            (i.textAlign = "center"),
            i.fillText("Typed mode: write the expansion below", e / 2, t / 2));
        })(),
        (i = requestAnimationFrame(e)));
    })),
    {
      present(e) {
        ((n = e),
          (o = n.data.need),
          (r = 0),
          (l = []),
          (g = !1),
          (v = !0),
          (b = 0),
          (h = 0.3),
          k(),
          (function () {
            const e = t.ctl();
            ((e.innerHTML =
              '<div class="muted" style="font-weight:700">Slice the answer\u2019s terms in order: the first term, then the second. Swipe or tap the fruit.</div><div><button class="btn ghost" id="typeBtn">Type the answer instead</button></div>'),
              ($("#typeBtn", e).onclick = () => {
                ((g = !0),
                  t.ui(
                    n.ans,
                    (e, s) => {
                      ((v = !1), t.finish(e.ok, e.why, s));
                    },
                    { label: "Expansion =", prompt: "Typed mode: write the full expansion." },
                  ));
              }));
          })());
      },
      react(e) {
        ((v = !1),
          l.forEach((t) => {
            e && !t.dead && w(t);
          }),
          e && t.burst(s.cv, 30, ["#FF8A3D", "#7BC043", "#fff"]));
      },
      pause(e) {
        m = e;
      },
      destroy() {
        ((f = !1), cancelAnimationFrame(i), s.ro.disconnect());
      },
    }
  );
};
/* restored from the live build */
SC[7] = (e, t) => {
  const s = canvasIn(e),
    a = s.ctx,
    n = 10,
    i = 14,
    o = ["#3A86FF", "#FFBE0B", "#FB5607", "#FF006E", "#8338EC", "#06D6A0"];
  let r,
    l,
    c = [],
    d = null,
    p = performance.now(),
    h = !0,
    u = !1,
    m = 0,
    f = -1,
    g = 0;
  for (let e = 0; e < i; e++) c.push(Array(n).fill(null));
  for (let e = 11; e < i; e++) for (let t = 0; t < n; t++) Math.random() < 0.6 && (c[e][t] = R.pick(o));
  const b = () => {
    for (let e = 0; e < i; e++) if (c[e].some(Boolean)) return e;
    return i;
  };
  return (
    (l = requestAnimationFrame(function e(o) {
      if (!h) return;
      const $ = Math.min(0.05, (o - p) / 1e3);
      if (((p = o), d && !u)) {
        const e = b() - 1.6,
          s = t.calm() ? Math.min(2, e) : e;
        d.y < s && (d.y = Math.min(s, d.y + $ * (d.drop ? 14 : t.calm() ? 1 : 0.25 + 0.08 * t.tier())));
      }
      (!(function () {
        const e = s.W,
          t = s.H,
          o = a;
        ((o.fillStyle = "#0B1640"), o.fillRect(0, 0, e, t));
        const l = Math.min((t - 16) / i, (e - 24) / 10.5),
          p = (e - l * n) / 2,
          h = (t - l * i) / 2;
        ((o.fillStyle = "#101F57"), o.fillRect(p, h, l * n, l * i), (o.strokeStyle = "rgba(255,255,255,.05)"));
        for (let e = 0; e <= n; e++)
          (o.beginPath(), o.moveTo(p + e * l, h), o.lineTo(p + e * l, h + i * l), o.stroke());
        for (let e = 0; e < i; e++)
          for (let t = 0; t < n; t++) {
            const s = c[e][t];
            if (!s) continue;
            const a = p + t * l,
              n = h + e * l;
            ((o.fillStyle = e === f ? "#fff" : s),
              o.fillRect(a + 1, n + 1, l - 2, l - 2),
              (o.fillStyle = "rgba(255,255,255,.28)"),
              o.fillRect(a + 1, n + 1, l - 2, 0.22 * l));
          }
        if (d && r) {
          const e = h + d.y * l,
            t = r.data.terms.map((e, t) => trm(e[0], e[1], 0 === t).trim());
          ((o.font = `700 ${Math.round(0.62 * l)}px "Atkinson Hyperlegible",sans-serif`),
            (o.textAlign = "center"),
            (o.textBaseline = "middle"));
          const s = t.map((e) => Math.max(3, Math.ceil((o.measureText(e).width + 12) / l)));
          let a = d.frame ? Math.ceil((o.measureText(d.frame + "(").width + 10) / l) : 0;
          const i = s[0] + s[1] + a + (a ? 1 : 0) + 1;
          let c = p + Math.max(0, Math.floor((n - i) / 2)) * l;
          (d.frame &&
            ((o.fillStyle = "#FFBE0B"),
            rr(o, c, e, a * l, 1.4 * l, 6),
            o.fill(),
            (o.fillStyle = "#2A1500"),
            o.fillText(d.frame + "(", c + (a * l) / 2, e + 0.7 * l),
            (c += a * l)),
            t.forEach((t, a) => {
              ((o.fillStyle = d.col[a]),
                rr(o, c + 2, e, s[a] * l - 4, 1.4 * l, 6),
                o.fill(),
                (o.fillStyle = "rgba(255,255,255,.3)"),
                o.fillRect(c + 4, e + 2, s[a] * l - 8, 0.25 * l),
                (o.fillStyle = "#fff"),
                o.fillText(t, c + (s[a] * l) / 2, e + 0.72 * l),
                (c += s[a] * l));
            }),
            d.frame &&
              ((o.fillStyle = "#FFBE0B"),
              rr(o, c, e, l, 1.4 * l, 6),
              o.fill(),
              (o.fillStyle = "#2A1500"),
              o.fillText(")", c + l / 2, e + 0.7 * l)));
        }
        ((o.fillStyle = "#fff"),
          (o.font = "14px Bungee,sans-serif"),
          (o.textAlign = "left"),
          o.fillText("LINES " + m, 8, 20));
      })(),
        (l = requestAnimationFrame(e)));
    })),
    {
      present(e) {
        ((r = e),
          (d = { y: -1.5, col: [R.pick(o), R.pick(o)], frame: null }),
          (function () {
            const e = t.ctl();
            ((e.innerHTML =
              '<div class="muted" style="font-weight:700">Step 1: pick the HIGHEST common factor of both blocks.</div><div class="choices"></div>'),
              r.data.opts.forEach((s) => {
                const a = H(`<button class="btn choice">${s}</button>`);
                ((a.onclick = () => {
                  s === r.data.hcf
                    ? (t.sfx("step"),
                      (d.frame = s),
                      (function () {
                        const e = r.data.hcf;
                        t.expr().innerHTML = `${r.expr} = ${e}( <span class="muted">?</span> )`;
                        const s = { type: "poly", p: r.data.inner };
                        t.ui(
                          s,
                          (s, a) => {
                            if (s.ok) {
                              const s = r.data.terms,
                                a = r.data.innerT;
                              ((t.text().innerHTML = `<b>Check your lock:</b> ${e} ${TX} ${trm(a[0][0], a[0][1], !0)} = ${trm(s[0][0], s[0][1], !0)}, &nbsp;${e} ${TX} ${pn(a[1][0])} = ${trm(s[1][0], s[1][1], !0)} \u2713`),
                                (t.expr().innerHTML = `${r.expr} = ${e}(${r.data.innerS})`));
                            }
                            t.finish(s.ok, s.why, a);
                          },
                          {
                            label: e + "(",
                            ph: "inside the bracket",
                            prompt: `Step 2: what goes inside the bracket? Divide each term by ${e}.`,
                            alg: !0,
                            v: r.data.v,
                            check: (e) => {
                              const t = checkAns(s, e);
                              if (!t.ok && !t.parse) {
                                const t = checkAns(r.ans, e);
                                if (t.ok) return t;
                              }
                              return t;
                            },
                          },
                        );
                      })())
                    : ((a.disabled = !0),
                      t.mistake(
                        ((e) => {
                          try {
                            const t = P.div(r.ans.p, parsePoly(e));
                            return Object.values(t).every(Number.isInteger);
                          } catch (e) {
                            return !1;
                          }
                        })(s)
                          ? `<b>${s}</b> goes into both terms, but it is not the HIGHEST common factor. Look for a bigger number${r.data.hv ? " and a shared letter" : ""}.`
                          : `<b>${s}</b> does not go into both terms.`,
                      ));
                }),
                  $(".choices", e).append(a));
              }));
          })());
      },
      react(e) {
        if (!d) return;
        d.drop = !0;
        const a = e ? d.col[0] : "#5A607A";
        setTimeout(() => {
          (!(function (e) {
            let t = 13;
            for (; t >= 0 && c[t].every(Boolean);) t--;
            t < 0 && (t = 13);
            for (let s = 0; s < n; s++) c[t][s] || (c[t][s] = e);
            for (
              c[t].every(Boolean) &&
              "#5A607A" !== e &&
              ((f = t),
              (g = 0.5),
              setTimeout(() => {
                c.splice(t, 1);
                const e = Array(n).fill(null);
                for (let t = 0; t < n; t++) Math.random() < 0.55 && (e[t] = R.pick(o));
                (c.push(e), b() > 11 && c.unshift(Array(n).fill(null)) && c.shift(), m++, (f = -1));
              }, 450));
              c.length > i;
            )
              c.shift();
            if (b() < 4) {
              c.splice(0, 4);
              for (let e = 0; e < 4; e++) c.unshift(Array(n).fill(null));
            }
          })(a),
            (d = null),
            e && t.burst(s.cv, 26, o));
        }, 350);
      },
      pause(e) {
        u = e;
      },
      destroy() {
        ((h = !1), cancelAnimationFrame(l), s.ro.disconnect());
      },
    }
  );
};
SC[8]=(root,api)=>{let q;
 function draw(newB){const built=S.city%12,dist=Math.floor(S.city/12)+1;let town='';for(let i=0;i<12;i++){const x=300+(i%3)*58,y=40+Math.floor(i/3)*62;
  town+=`<rect x="${x}" y="${y}" width="50" height="50" rx="6" fill="${i<built?'#7BC66B':i===built?'#9FE08E':'#5FA350'}" ${i===built?'stroke="#FFC531" stroke-width="3" stroke-dasharray="6 4"':''}/>`;
  if(i<built)town+=building(i+dist*12,x+1,y+2,newB&&i===built-1);else if(i===built)town+=`<text x="${x+25}" y="${y+31}" text-anchor="middle" font-size="12" fill="#1E4D14">NEXT</text>`}
  root.innerHTML=`<svg viewBox="0 0 480 300" class="svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Building plot shape and town"><defs><pattern id="turf" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#46A75A"/><path d="M0 16L16 0" stroke="#5BBF6E" stroke-width="3"/></pattern></defs>
  <rect width="480" height="300" fill="#BDE8F7"/><rect x="0" y="0" width="286" height="300" fill="#2B7FA8"/><path d="M0 0H286V300H0Z" fill="none"/><g opacity=".18" stroke="#fff">${Array.from({length:15},(_,i)=>`<line x1="${i*20}" y1="0" x2="${i*20}" y2="300"/><line x1="0" y1="${i*20}" x2="286" y2="${i*20}"/>`).join('')}</g>
  <text x="16" y="24" font-size="13" fill="#E6F6FF" letter-spacing="1.5">BLUEPRINT · ${shapeName(q.data.shape.k).toUpperCase()}</text>${shapeSVG(q.data.shape)}<rect id="flash" width="286" height="300" fill="#FF3B3B" opacity="0"/>
  <rect x="292" y="0" width="188" height="300" fill="#8FD07E"/><text x="386" y="26" text-anchor="middle" font-size="13" fill="#1E4D14">DISTRICT ${dist} · ${built}/12 BUILT</text>${town}</svg>`}
 return{present(q0){q=q0;draw(false);api.ui(q.ans,(r,v)=>api.finish(r.ok,r.why,v),{label:q.text?'Cost =':'Area =',prompt:q.data.shape.alg?'Write the area as an expanded expression, e.g. 3x + 12.':'Units: square metres (m²).',alg:!!q.data.shape.alg})},
  react(ok){if(ok){S.city++;if(S.city>=12)badge('builder');save();draw(true);api.sfx('level');setTimeout(()=>api.burst($('.grow',root)||root,30,['#FFE66D','#4ECDC4','#fff']),300)}else{const f=$('#flash',root);f&&f.animate([{opacity:.45},{opacity:0}],{duration:600})}},
  destroy(){root.innerHTML=''}}};
SC[9]=(root,api)=>{let q,steps,idx,phase=1;
 const ph=m=>m<34?1:m<67?2:3;
 function draw(){const hp=100-api.meter();root.innerHTML=`<svg viewBox="0 0 480 300" class="svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Boss fight against Dr. Chaos"><defs><linearGradient id="bsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1A0533"/><stop offset="1" stop-color="#6A0F5A"/></linearGradient></defs>
  <rect width="480" height="300" fill="url(#bsky)"/><path d="M120 0L60 260H180Z M360 0L300 260H420Z" fill="#fff" opacity=".06"/><path d="M0 230L480 214V300H0Z" fill="#2B0B3D"/><path d="M0 230L480 214" stroke="#FF006E" stroke-width="3"/>
  ${innerAv(40,126,110)}<g transform="translate(352 120)"><g id="boss">${drChaos()}</g></g>
  <g transform="translate(90 16)"><rect width="300" height="40" rx="10" fill="#0A0414" stroke="#FF006E" stroke-width="2"/><text x="12" y="17" font-size="12" fill="#FF7AB8" letter-spacing="1.5">DR. CHAOS · PHASE ${ph(api.meter())}</text>
  <rect x="12" y="23" width="276" height="10" rx="5" fill="#3A1030"/><rect id="bhp" x="12" y="23" width="276" height="10" rx="5" fill="#FF006E" style="transform-box:fill-box;transform-origin:0 50%;transform:scaleX(${hp/100});transition:transform .6s"/><rect x="104" y="21" width="2" height="14" fill="#fff"/><rect x="196" y="21" width="2" height="14" fill="#fff"/></g>
  <path id="zap" d="M300 110L240 150L262 156L190 200L218 204L130 236" fill="none" stroke="#B6FF6B" stroke-width="7" stroke-linejoin="round" opacity="0"/><g id="pow" opacity="0" transform="translate(352 100)"><path d="M0 -40L10 -12L40 -14L16 4L28 34L0 16L-28 34L-16 4L-40 -14L-10 -12Z" fill="#FFC531" stroke="#fff" stroke-width="3"/></g></svg>`}
 function zap(){const z=$('#zap',root);z&&z.animate([{opacity:1},{opacity:0}],{duration:500});api.sfx('boom')}
 function pow(){const p=$('#pow',root),b=$('#boss',root);p&&p.animate([{opacity:1,transform:'translate(352px,100px) scale(.4)'},{opacity:0,transform:'translate(352px,100px) scale(1.4)'}],{duration:500});b&&b.animate([{transform:'none'},{transform:'translate(16px,0) rotate(6deg)'},{transform:'none'}],{duration:350});api.sfx('hit')}
 function doStep(){const s=steps[idx];if(s.kind==='choice'){const ctl=api.ctl();ctl.innerHTML='<div class="muted" style="font-weight:700">Step 1: FACTORISE. Which is the correct fully factorised form?</div><div class="choices"></div>';
   s.opts.forEach(o=>{const b=H(`<button class="btn choice">${o.o}</button>`);b.onclick=()=>{if(o.ok){pow();idx++;doStep()}else{b.disabled=true;zap();api.mistake('That is not the full factorisation. Take the HIGHEST common factor out of the top (and the bottom).')}};$('.choices',ctl).append(b)})}
  else api.ui(s.ans,(r,v)=>api.finish(r.ok,r.why,v),{label:'Simplified =',prompt:idx>0?'Step 2: CANCEL the common factor. What is left?':'Simplify fully (a fraction like 2/3 is fine).'})}
 return{present(q0){q=q0;steps=q.data.steps;idx=0;phase=ph(api.meter());draw();doStep()},
  react(ok){const b=$('#bhp',root);if(ok){pow();setTimeout(()=>{pow();api.burst($('#boss',root),30,['#FF006E','#FFC531','#fff'])},250)}else{zap();api.shake()}
   if(b)b.style.transform=`scaleX(${(100-api.meter())/100})`;const p=ph(api.meter());if(p>phase){phase=p;setTimeout(()=>{api.toast(`Phase ${p}! Dr. Chaos is getting angrier!`);api.sfx('boom');const c=$('#coat',root);c&&c.setAttribute('fill',p===2?'#FFD6E8':'#FFB0B0')},700)}},
  destroy(){root.innerHTML=''}}};
/* restored from the live build */
