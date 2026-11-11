const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
function H(html){const t=document.createElement('template');t.innerHTML=html.trim();return t.content.firstElementChild}
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function pretty(s){return esc(s).replace(/\^(\d+)/g,(m,d)=>sup(d)).replace(/\*/g,TX).replace(/-/g,MI)}
/* restored from the live build */
const IC = {
  heart:
    '<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.2 3 4.5 6.6 4.5c2.1 0 3.6 1.2 4.4 2.6.8-1.4 2.3-2.6 4.4-2.6 3.6 0 5.7 3.7 4.2 7.2C19.5 16.4 12 21 12 21z" fill="#FF4D6D" stroke="#B3203D" stroke-width="1.2"/><ellipse cx="7.6" cy="8.6" rx="2" ry="1.3" fill="#fff" opacity=".6"/></svg>',
  coin: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#FFC531" stroke="#B57F00" stroke-width="1.6"/><circle cx="12" cy="12" r="6.5" fill="none" stroke="#B57F00" stroke-width="1.2" opacity=".6"/><path d="M10.2 8.5h3.2v7h-2" fill="none" stroke="#8A5F00" stroke-width="1.8" stroke-linecap="round"/></svg>',
  flame:
    '<svg viewBox="0 0 24 24"><path d="M12 22c-4.4 0-7-2.9-7-6.6 0-3.9 3.2-6 3.6-9.9 2.5 1.6 3.6 3.6 3.6 5.4 1-.8 1.6-2.2 1.6-3.6 2.9 2 5.2 4.8 5.2 8.1 0 3.7-2.6 6.6-7 6.6z" fill="#FF7A1A"/><path d="M12 22c-2.2 0-3.5-1.4-3.5-3.3 0-2.2 1.9-3.3 2.2-5.4 1.9 1.3 4.8 3 4.8 5.4 0 1.9-1.3 3.3-3.5 3.3z" fill="#FFD23F"/></svg>',
  star: '<svg viewBox="0 0 24 24"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5-4.8-4.6 6.6-.9z" fill="#FFC531" stroke="#B57F00" stroke-width="1.2" stroke-linejoin="round"/></svg>',
  lock: '<svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="11" rx="2.5" fill="currentColor"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10" fill="none" stroke="currentColor" stroke-width="2.4"/></svg>',
  back: '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  snd: '<svg viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  mute: '<svg viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
  map: '<svg viewBox="0 0 24 24"><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9 4v14M15 6v14" stroke="currentColor" stroke-width="2"/></svg>',
  bag: '<svg viewBox="0 0 24 24"><path d="M5 8h14l-1 12H6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9 8V6a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  chart:
    '<svg viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M21 20H3" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
  gear: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  bulb: '<svg viewBox="0 0 24 24"><path d="M9 17h6M10 20h4M12 3a6 6 0 0 0-3.5 10.9V16h7v-2.1A6 6 0 0 0 12 3z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  gem: '<svg viewBox="0 0 32 32" class="gemicon"><path d="M8 4h16l6 8-14 17L2 12z" fill="#7C6CFF"/><path d="M8 4l4 8h8l4-8M2 12h28M12 12l4 17 4-17" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="1.4"/><path d="M8 4l4 8H2z" fill="#B6ADFF"/></svg>',
  clock:
    '<svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="8" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M12 9v4l2.5 2M9.5 3h5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
  out: '<svg viewBox="0 0 24 24"><path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4M10 16l-4-4 4-4M6 12h10" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  chest:
    '<svg viewBox="0 0 64 64"><rect x="8" y="26" width="48" height="28" rx="4" fill="#B5651D" stroke="#5B2E06" stroke-width="2.5"/><path d="M8 30c0-12 10-18 24-18s24 6 24 18z" fill="#D9822B" stroke="#5B2E06" stroke-width="2.5"/><rect x="8" y="28" width="48" height="6" fill="#FFC531" stroke="#8A5F00" stroke-width="1.5"/><rect x="27" y="30" width="10" height="12" rx="2" fill="#FFC531" stroke="#8A5F00" stroke-width="1.5"/></svg>',
};
const iconImg=(k)=>IC[k];
/* restored from the live build */
let SAVE_KEY = "algebra-quest-save-v1";
let MEM=null;
const store={get(){try{const v=localStorage.getItem(SAVE_KEY);if(v)return JSON.parse(v)}catch(e){}return MEM?JSON.parse(MEM):null},
 set(v){const j=JSON.stringify(v);MEM=j;try{localStorage.setItem(SAVE_KEY,j)}catch(e){}}};
/* restored from the live build */
function defSave() {
  return {
    xp: 0,
    coins: 40,
    stars: Array(10).fill(0),
    cleared: Array(10).fill(!1),
    learned: Array(10).fill(!1),
    skills: {},
    boss: {},
    badges: [],
    owned: ["skin0", "hat0", "trail0"],
    av: { skin: 0, hat: 0, trail: 0 },
    city: 0,
    seenIntro: !1,
    fruitV: 1,
    pic: "",
    grade: 7,
    times: {},
    settings: { mute: !1, music: !0, calm: !1, theme: "system" },
    stats: { answered: 0, correct: 0, bestStreak: 0 },
    powers: {},
  };
}
/* restored from the live build */
let S = (() => {
  const e = defSave(),
    t = store.get();
  if (!t) return e;
  const s = Object.assign(e, t);
  return (
    (s.settings = Object.assign(defSave().settings, t.settings || {})),
    (s.stats = Object.assign(defSave().stats, t.stats || {})),
    (s.av = Object.assign(defSave().av, t.av || {})),
    t.fruitV || ((s.fruitV = 0), migrateSave(s)),
    s
  );
})();
/* restored from the live build */
const save = () => {
  (store.set(S), NET.queueSave());
};
function applyTheme(){const t=S.settings.theme;if(t==='system')document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme',t)}
/* ---- audio ---- */
const AU={ctx:null,m:null,mg:null,mi:null,want:-1,
 init(){if(this.ctx)return;try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return;this.ctx=new C();this.m=this.ctx.createGain();this.m.gain.value=S.settings.mute?0:.55;this.m.connect(this.ctx.destination);
  this.mg=this.ctx.createGain();this.mg.gain.value=.16;this.mg.connect(this.m);if(this.want>=0)this.music(this.want)}catch(e){this.ctx=null}},
 setMute(){if(this.m)this.m.gain.value=S.settings.mute?0:.55},
 tone(f,d=.12,type='square',v=.2,slide=0,delay=0,dest){if(!this.ctx)return;try{const t=this.ctx.currentTime+delay;const o=this.ctx.createOscillator(),g=this.ctx.createGain();o.type=type;o.frequency.setValueAtTime(f,t);
  if(slide)o.frequency.exponentialRampToValueAtTime(Math.max(30,f*slide),t+d);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.01);g.gain.exponentialRampToValueAtTime(.001,t+d);
  o.connect(g);g.connect(dest||this.m);o.start(t);o.stop(t+d+.05)}catch(e){}},
 noise(d=.2,v=.25){if(!this.ctx)return;try{const n=this.ctx.sampleRate*d,b=this.ctx.createBuffer(1,n,this.ctx.sampleRate),a=b.getChannelData(0);for(let i=0;i<n;i++)a[i]=(Math.random()*2-1)*(1-i/n);
  const s=this.ctx.createBufferSource(),g=this.ctx.createGain();s.buffer=b;g.gain.value=v;s.connect(g);g.connect(this.m);s.start()}catch(e){}},
 music(w){this.stopMusic();this.want=w;if(!this.ctx||!S.settings.music||w<0)return;const roots=[57,62,60,55,50,53,64,59,57,52];const scl=[[0,3,5,7,10],[0,2,4,7,9],[0,2,4,7,11],[0,4,7,9,12],[0,3,5,7,8],[0,1,5,7,8],[0,2,4,7,9],[0,4,5,7,11],[0,2,4,5,9],[0,3,6,7,10]];
  const r=roots[w%10],sc=scl[w%10],bpm=[112,150,124,118,96,92,138,128,108,156][w%10]||120;let st=0;const pat=[0,2,1,3,4,3,2,1,0,2,4,3,2,1,3,0];const md=n=>440*Math.pow(2,(n-69)/12);
  this.mi=setInterval(()=>{if(S.settings.mute||document.hidden)return;if(st%4===0)this.tone(md(r-24+(st%32<16?0:5)),.28,'triangle',.5,0,0,this.mg);
   if(st%2===0||w%3===1)this.tone(md(r+sc[pat[st%16]%sc.length]+(st%32>=16?12:0)),.13,w%2?'square':'triangle',.18,0,0,this.mg);st++},60000/bpm/2)},
 stopMusic(){if(this.mi)clearInterval(this.mi);this.mi=null}};
/* restored from the live build */
function sfx(e) {
  if (!AU.ctx || !sndOn(e)) return;
  const t = AU.tone.bind(AU);
  switch (e) {
    case "good":
      (t(660, 0.1, "square", 0.18), t(990, 0.16, "square", 0.16, 0, 0.08));
      break;
    case "bad":
      t(220, 0.22, "sawtooth", 0.16, 0.6);
      break;
    case "hit":
      (AU.noise(0.18, 0.22), t(120, 0.2, "square", 0.18, 0.5));
      break;
    case "coin":
      (t(1320, 0.06, "square", 0.12), t(1760, 0.1, "square", 0.12, 0, 0.06));
      break;
    case "click":
      t(520, 0.04, "square", 0.08);
      break;
    case "step":
      (t(740, 0.07, "triangle", 0.2), t(880, 0.08, "triangle", 0.18, 0, 0.06));
      break;
    case "slice":
      (AU.noise(0.08, 0.18), t(1400, 0.08, "sawtooth", 0.06, 0.4));
      break;
    case "level":
      [523, 659, 784, 1046].forEach((e, s) => t(e, 0.14, "square", 0.14, 0, 0.08 * s));
      break;
    case "crystal":
      [523, 659, 784, 1046, 1318, 1568].forEach((e, s) => t(e, 0.25, "triangle", 0.22, 0, 0.11 * s));
      break;
    case "boom":
      (AU.noise(0.4, 0.35), t(90, 0.5, "sawtooth", 0.2, 0.4));
  }
}
/* ---- confetti fx ---- */
const FX={cv:null,cx:null,p:[],run:false,
 init(){this.cv=$('#fx');this.cx=this.cv.getContext('2d');const rs=()=>{const d=Math.min(2,devicePixelRatio||1);this.cv.width=innerWidth*d;this.cv.height=innerHeight*d;this.cx.setTransform(d,0,0,d,0,0)};rs();addEventListener('resize',rs)},
 burst(x,y,n=40,cols){if(matchMedia('(prefers-reduced-motion: reduce)').matches)n=Math.min(n,8);cols=cols||['#FF4D6D','#FFC531','#3DDC97','#4FC3F7','#8E82FF'];
  for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,s=2+Math.random()*7;this.p.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-4,r:3+Math.random()*4,c:cols[i%cols.length],l:60+Math.random()*40,rot:Math.random()*6,sh:Math.random()<.5})}
  if(!this.run){this.run=true;requestAnimationFrame(()=>this.tick())}},
 tick(){const c=this.cx;c.clearRect(0,0,innerWidth,innerHeight);this.p=this.p.filter(p=>p.l>0);for(const p of this.p){p.vy+=.25;p.vx*=.98;p.x+=p.vx;p.y+=p.vy;p.l--;p.rot+=.2;c.save();c.globalAlpha=Math.min(1,p.l/30);c.fillStyle=p.c;c.translate(p.x,p.y);c.rotate(p.rot);
  if(p.sh)c.fillRect(-p.r,-p.r/2,p.r*2,p.r);else{c.beginPath();c.arc(0,0,p.r/1.3,0,7);c.fill()}c.restore()}
  if(this.p.length)requestAnimationFrame(()=>this.tick());else{this.run=false;c.clearRect(0,0,innerWidth,innerHeight)}}};
function burstEl(el,n,cols){if(!el)return;const r=el.getBoundingClientRect();FX.burst(r.left+r.width/2,r.top+r.height/2,n,cols)}
/* restored from the live build */
const SKINS = [
  { n: "Blueberry", c: "#6F8BF2", d: "#2A3C9A", p: 0, t: "Small, round and super brave" },
  { n: "Strawberry", c: "#F5566B", d: "#B0182F", p: 50, t: "Sweet, sunny and always smiling" },
  { n: "Banana", c: "#FFE680", d: "#E0A800", p: 70, t: "Bendy, bouncy and full of jokes" },
  { n: "Watermelon", c: "#FF6B78", d: "#D12E43", p: 90, t: "Cool as a summer slice" },
  { n: "Pomegranate", c: "#E0405E", d: "#7E0F27", p: 110, t: "A royal crown full of ideas" },
  { n: "Pineapple", c: "#FFCB52", d: "#C98200", p: 130, t: "Spiky outside, kind inside" },
  { n: "Apple", c: "#F45A4E", d: "#A51C14", p: 150, t: "The clever one, top of the class" },
];
const HATS=[{n:'No hat',p:0},{n:'Cap',p:30},{n:'Crown',p:90},{n:'Wizard hat',p:70},{n:'Headphones',p:50},{n:'Miner helmet',p:60},{n:'Party hat',p:40}];
const TRAILS=[{n:'No trail',p:0,c:[]},{n:'Sparkle',p:50,c:['#FFFFFF','#FFE066']},{n:'Rainbow',p:110,c:['#FF4D6D','#FFC531','#3DDC97','#4FC3F7','#9B5CFF']},{n:'Flame',p:90,c:['#FF6B35','#FFD23F','#FF3D3D']},{n:'Bubbles',p:70,c:['#8EE3FF','#D6F6FF']},{n:'Comet',p:140,c:['#B388FF','#FFFFFF','#7C6CFF']}];
let AVID=0;
/* restored from the live build */
function hatSVG(t, e) {
  if (!(t |= 0)) return "";
  const a = HATFIT[(e |= 0)] || HATFIT[0],
    s = ACC[e] || ACC[0],
    n = shade(s, -0.3),
    o = shade(s, 0.45),
    r = (t, e, a, s, n) => `<g transform="translate(${t} ${e}) rotate(${s}) scale(${a})">${n}</g>`,
    i = a[2] / 50,
    l = (t) => r(a[0] - 0.36 * a[2], a[1] + 0.05 * a[2], Math.min(i, 1.2), a[3] - 20, t),
    c = (t, e) =>
      `${[0, 72, 144, 216, 288].map((e) => `<ellipse cx="0" cy="-6.5" rx="5" ry="7" fill="${t}" transform="rotate(${e})" stroke="${shade(t, -0.25)}" stroke-width=".8"/>`).join("")}<circle r="4.2" fill="${e || "#FFD84D"}" stroke="#E0A800" stroke-width=".8"/><circle cx="-1.3" cy="-1.3" r="1.2" fill="#fff" opacity=".8"/>`;
  switch (t) {
    case 1:
      return r(
        a[0],
        a[1],
        i,
        a[3],
        `<path d="M-24 7Q-25 -24 0 -25Q25 -24 24 7Z" fill="${s}" stroke="${n}" stroke-width="1.6"/><path d="M-12 -21Q-16 -8 -15 5M12 -21Q16 -8 15 5" stroke="${n}" stroke-width="1.2" fill="none" opacity=".5"/><path d="M6 3Q30 -3 40 6Q30 12 6 9Z" fill="${n}"/><circle cy="-25" r="3.2" fill="${n}"/><path d="M0 -11c-2.6-3.6-7.4-.6-4 3l4 3.6 4-3.6c3.4-3.6-1.4-6.6-4-3z" fill="#fff" opacity=".9"/><path d="M-17 -12Q-14 -20 -6 -22" stroke="#fff" stroke-width="2.4" fill="none" opacity=".45" stroke-linecap="round"/>`,
      );
    case 2:
      return r(
        a[0],
        a[1],
        i,
        a[3],
        `<path d="M-22 5L-25 -20L-12 -9L0 -27L12 -9L25 -20L22 5Z" fill="#FFC531" stroke="#B57F00" stroke-width="2" stroke-linejoin="round"/><rect x="-22" y="-1" width="44" height="7" rx="3" fill="#F2A900"/><circle cy="2.5" r="3.4" fill="${s}" stroke="#fff" stroke-width="1"/><circle cx="-13" cy="2.5" r="2.4" fill="#4FC3F7"/><circle cx="13" cy="2.5" r="2.4" fill="#FF4D6D"/><circle cx="-25" cy="-21" r="2.6" fill="#FFE680"/><circle cy="-28" r="2.8" fill="#FFE680"/><circle cx="25" cy="-21" r="2.6" fill="#FFE680"/><path d="M-15 -6L-10 -2" stroke="#fff" stroke-width="2" opacity=".6" stroke-linecap="round"/>`,
      );
    case 3:
      return r(
        a[0],
        a[1],
        i,
        a[3],
        `<path d="M2 -52Q-2 -40 -9 -26Q-16 -10 -22 2H22Q14 -16 8 -30Q4 -42 2 -52Z" fill="#7B5CFF" stroke="#4B2FC4" stroke-width="1.8"/><path d="M2 -52Q12 -50 14 -42" stroke="#4B2FC4" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cy="3" rx="31" ry="6.5" fill="#5A3DE0" stroke="#3D25A8" stroke-width="1.5"/><path d="M-1 -27l1.8 3.8 4.2.5-3.1 2.9.8 4.1-3.7-2-3.7 2 .8-4.1-3.1-2.9 4.2-.5z" fill="#FFE066"/><circle cx="-9" cy="-10" r="1.8" fill="#fff"/><circle cx="9" cy="-6" r="1.4" fill="#FFE066"/><path d="M-20 -1Q0 -7 20 -1" stroke="${s}" stroke-width="3.5" fill="none"/>`,
      );
    case 4: {
      const t = Math.min(i, 1.12);
      return r(
        a[0],
        a[1],
        t,
        a[3],
        `<path d="M-31 20Q-33 -18 0 -19Q33 -18 31 20" fill="none" stroke="#5B3FB0" stroke-width="7.5" stroke-linecap="round"/><path d="M-31 20Q-33 -18 0 -19Q33 -18 31 20" fill="none" stroke="${o}" stroke-width="4" stroke-linecap="round"/><path d="M-22 -10Q-12 -17 0 -17" stroke="#fff" stroke-width="1.6" fill="none" opacity=".7" stroke-linecap="round"/>\n  ${[-1, 1].map((t) => `<g transform="translate(${33 * t} 26)"><rect x="-8" y="-13" width="16" height="26" rx="8" fill="${s}" stroke="#5B3FB0" stroke-width="1.8"/><rect x="${t > 0 ? -10 : 2}" y="-10" width="8" height="20" rx="4" fill="${o}"/><path d="M0 -3.5c-1.5-2.2-4.6-.4-2.6 1.9l2.6 2.4 2.6-2.4c2-2.3-1.1-4.1-2.6-1.9z" fill="#fff"/></g>`).join("")}`,
      );
    }
    case 5:
      return r(
        a[0],
        a[1],
        i,
        a[3],
        '<path d="M-25 6Q-26 -24 0 -24Q26 -24 25 6Z" fill="#FFD23F" stroke="#B57F00" stroke-width="1.8"/><path d="M0 -24V4M-13 -20Q-17 -8 -16 4M13 -20Q17 -8 16 4" stroke="#E0A800" stroke-width="1.6" fill="none"/><rect x="-28" y="2" width="56" height="7" rx="3.5" fill="#E0A800" stroke="#B57F00" stroke-width="1.2"/><circle cy="-12" r="7" fill="#FFF7B0" stroke="#B57F00" stroke-width="1.8"/><circle cx="-2" cy="-14" r="2.4" fill="#fff"/><path d="M-6 -20L-14 -36M0 -20V-38M6 -20L14 -36" stroke="#FFF7B0" stroke-width="2" opacity=".55" stroke-linecap="round"/>',
      );
    case 6:
      return r(
        a[0],
        a[1],
        i,
        a[3] - 8,
        `<path d="M0 -46L17 4H-17Z" fill="${s}" stroke="${n}" stroke-width="1.6" stroke-linejoin="round"/><clipPath id="ph${e}"><path d="M0 -46L17 4H-17Z"/></clipPath><g clip-path="url(#ph${e})" stroke="#fff" stroke-width="4.5" opacity=".85"><path d="M-20 -26L20 -14M-20 -12L20 0"/></g><circle cy="-30" r="1.8" fill="#FFE066"/><circle cx="-6" cy="-8" r="1.6" fill="#FFE066"/><circle cx="6" cy="-20" r="1.6" fill="#fff"/><circle cy="-48" r="5.5" fill="#FFE066" stroke="#E0A800" stroke-width="1"/><path d="M-18 4Q0 9 18 4" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="1 4"/>`,
      );
    case 7:
      return l(
        `<path d="M0 0C-6 -10 -20 -13 -21 -3C-22 7 -9 6 0 0Z" fill="${s}" stroke="${n}" stroke-width="1.5"/><path d="M0 0C6 -10 20 -13 21 -3C22 7 9 6 0 0Z" fill="${s}" stroke="${n}" stroke-width="1.5"/><path d="M-2 1L-8 15L-3 13L0 17L1 2Z" fill="${n}"/><path d="M2 1L9 14L4 13L2 17L0 2Z" fill="${n}"/><ellipse rx="4.6" ry="4" fill="${shade(s, -0.12)}" stroke="${n}" stroke-width="1.4"/><circle cx="-13" cy="-4" r="1.6" fill="#fff" opacity=".8"/><circle cx="13" cy="-5" r="1.6" fill="#fff" opacity=".8"/><circle cx="-8" cy="-1" r="1.2" fill="#fff" opacity=".8"/><circle cx="10" cy="0" r="1.2" fill="#fff" opacity=".8"/><path d="M-15 -7Q-12 -10 -8 -9" stroke="#fff" stroke-width="1.5" fill="none" opacity=".7" stroke-linecap="round"/>`,
      );
    case 8:
      return l(`<path d="M2 6Q10 14 16 10Q12 4 2 6Z" fill="#43B868" stroke="#2A8A4A" stroke-width="1"/>${c(s)}`);
    case 9:
      return r(
        a[0],
        a[1],
        i,
        a[3],
        `<path d="M-26 4Q0 -10 26 4" stroke="#43B868" stroke-width="3" fill="none"/>${[
          [-24, 4, -30],
          [-16, -1, -15],
          [-6, -4, 0],
          [6, -4, 0],
          [16, -1, 15],
          [24, 4, 30],
        ]
          .map(
            ([t, e, a], s) =>
              `<path d="M${t} ${e}q5 -6 9 -2q-4 5 -9 2z" fill="#43B868" transform="rotate(${a} ${t} ${e})"/>`,
          )
          .join("")}${[
          [-21, 1],
          [-8, -4],
          [5, -5],
          [18, -1],
        ]
          .map(
            ([t, e], a) =>
              `<g transform="translate(${t} ${e}) scale(.72)">${c([s, "#FFFFFF", "#FF9EC4", o][a], a % 2 ? "#FF8FB1" : "#FFD84D")}</g>`,
          )
          .join("")}`,
      );
    case 10:
      return r(
        a[0],
        a[1],
        i,
        a[3],
        `${[-1, 1].map((t) => `<g transform="rotate(${14 * t})"><path d="M${9 * t} 2C${2 * t} -20 ${4 * t} -44 ${10 * t} -46C${17 * t} -44 ${19 * t} -20 ${13 * t} 2Z" fill="#fff" stroke="#E6C7D4" stroke-width="1.6"/><path d="M${10 * t} -2C${6 * t} -20 ${8 * t} -38 ${10.5 * t} -40C${13 * t} -38 ${14 * t} -20 ${12 * t} -2Z" fill="#FFB3CF"/></g>`).join("")}<path d="M-13 3Q0 -3 13 3" stroke="${s}" stroke-width="4" fill="none" stroke-linecap="round"/>`,
      );
    case 11:
      return r(
        a[0],
        a[1],
        i,
        a[3],
        `${[-1, 1].map((t) => `<g><path d="M${6 * t} 4L${14 * t} -22L${24 * t} 6Z" fill="${n}" stroke="${shade(s, -0.5)}" stroke-width="1.5" stroke-linejoin="round"/><path d="M${10 * t} 3L${14.5 * t} -13L${20 * t} 4Z" fill="#FFB3CF"/></g>`).join("")}`,
      );
    case 12:
      return r(
        a[0],
        a[1],
        i,
        a[3],
        `<path d="M-24 4Q-25 -24 0 -25Q25 -24 24 4Z" fill="${s}" stroke="${n}" stroke-width="1.6"/>${[-16, -8, 0, 8, 16].map((t) => `<path d="M${t} -20Q${t + 2} -10 ${t} 2" stroke="${n}" stroke-width="1.3" fill="none" opacity=".45"/>`).join("")}<rect x="-27" y="-1" width="54" height="10" rx="5" fill="${o}" stroke="${n}" stroke-width="1.4"/>${[-20, -12, -4, 4, 12, 20].map((t) => `<path d="M${t} 1V7" stroke="${n}" stroke-width="1.2" opacity=".5"/>`).join("")}<circle cy="-28" r="7" fill="#fff" stroke="#DCDCE8" stroke-width="1.4"/><circle cx="-2.5" cy="-30" r="2" fill="#fff"/><path d="M-3 -31l3 3M2 -32l-2 4M-5 -27l4 1" stroke="#E6E6F0" stroke-width="1"/>`,
      );
    case 13:
      return r(
        a[0],
        a[1],
        i,
        a[3],
        `<path d="M-20 3Q-18 -10 -9 -12Q-2 -22 0 -26Q2 -22 9 -12Q18 -10 20 3" fill="none" stroke="#E3E8F5" stroke-width="3.2" stroke-linejoin="round"/><path d="M-20 3Q-18 -10 -9 -12Q-2 -22 0 -26Q2 -22 9 -12Q18 -10 20 3" fill="none" stroke="#B9C2DA" stroke-width="1" stroke-linejoin="round"/><path d="M0 -24l3.5 5.5-3.5 5.5-3.5-5.5z" fill="${s}" stroke="#fff" stroke-width="1"/><circle cx="-10" cy="-9" r="2.6" fill="${o}" stroke="#fff" stroke-width=".8"/><circle cx="10" cy="-9" r="2.6" fill="${o}" stroke="#fff" stroke-width=".8"/><circle cx="-17" cy="-2" r="1.8" fill="#fff"/><circle cx="17" cy="-2" r="1.8" fill="#fff"/><path d="M-1 -23l1-1" stroke="#fff" stroke-width="1.4"/>`,
      );
    case 14:
      return r(
        a[0],
        a[1],
        i,
        a[3],
        '<ellipse cy="-17" rx="20" ry="5.5" fill="none" stroke="#FFE066" stroke-width="7" opacity=".35"/><ellipse cy="-17" rx="19" ry="5" fill="none" stroke="#FFD23F" stroke-width="3.6"/><ellipse cy="-17" rx="19" ry="5" fill="none" stroke="#FFF7C2" stroke-width="1.2"/><path d="M14 -30l1.2 2.6 2.6 1.2-2.6 1.2-1.2 2.6-1.2-2.6-2.6-1.2 2.6-1.2z" fill="#FFF7C2"/>',
      );
    default:
      return "";
  }
}
/* restored from the live build */
function avatarSVG(t, e = "av", a) {
  t = t || S.av;
  const s = Math.min(SKINS.length - 1, Math.max(0, 0 | t.skin)),
    n = SKINS[s],
    o = "ag" + AVID++;
  return `<svg viewBox="-4 -28 108 128" class="${e}" ${a ? `width="${a}" height="${a}"` : ""} aria-hidden="true"><defs><radialGradient id="${o}" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="${avMix(n.c)}"/><stop offset=".35" stop-color="${n.c}"/><stop offset="1" stop-color="${n.d}"/></radialGradient></defs>\n <ellipse cx="50" cy="95" rx="27" ry="5" fill="#000" opacity=".18"/>${fruitBody(s, o, n, t.hat)}\n ${cuteFace(s)}${hatSVG(t.hat, s)}</svg>`;
}
/* restored from the live build */
function cuteFace(e) {
  const t = 5 === e ? 61 : 57,
    s = t + 12,
    a = (e) =>
      `<g class="cf-eye"><circle cx="${e}" cy="${t}" r="9.2" fill="#2B1D3A"/><circle cx="${e}" cy="${t}" r="9.2" fill="url(#cfIris)"/><circle cx="${e + 3.2}" cy="${t - 3.6}" r="3.4" fill="#fff"/><circle cx="${e - 3}" cy="${t + 3.4}" r="1.6" fill="#fff" opacity=".9"/></g>`;
  return `<defs><radialGradient id="cfIris" cx=".5" cy=".75" r=".6"><stop offset="0" stop-color="#7D5BD6" stop-opacity=".75"/><stop offset="1" stop-color="#2B1D3A" stop-opacity="0"/></radialGradient></defs>\n <ellipse cx="32" cy="38" rx="7.5" ry="4.2" fill="#fff" opacity=".42" transform="rotate(-32 32 38)"/><circle cx="41.5" cy="33.5" r="1.8" fill="#fff" opacity=".55"/>\n ${a(38)}${a(62)}<ellipse cx="26" cy="${s - 1}" rx="6.6" ry="3.9" fill="#FF7DA8" opacity=".6"/><ellipse cx="74" cy="${s - 1}" rx="6.6" ry="3.9" fill="#FF7DA8" opacity=".6"/>\n <path d="M44.5 ${s}Q50 ${s + 7.5} 55.5 ${s}Q50 ${s + 2} 44.5 ${s}Z" fill="#7A1F3D" stroke="#7A1F3D" stroke-width="1.4" stroke-linejoin="round"/><path d="M47.4 ${s + 3.2}Q50 ${s + 5.8} 52.6 ${s + 3.2}Q50 ${s + 2.3} 47.4 ${s + 3.2}Z" fill="#FF8FA3"/>`;
}
/* restored from the live build */
function trailSVG(t, e = 80) {
  const a = TRAILS[t];
  return a && a.c.length
    ? `<svg viewBox="0 0 80 20" width="${e}" height="${e / 4}" aria-hidden="true">${[0, 1, 2, 3, 4].map((t) => `<g transform="translate(${70 - 15 * t} ${10 + 3 * Math.sin(1.3 * t)}) scale(${(7 - 1.1 * t) / 7})" opacity="${1 - 0.17 * t}">${trailShape(a.s || "dot", a.c[t % a.c.length], 7)}</g>`).join("")}</svg>`
    : "";
}
/* ---- world data ---- */
const WORLDS=[
 {name:'Deep Dive Mine',topic:'Negative integers',game:'Mine digger',c1:'#2FA84F',c2:'#C88A3A',story:['Dr. Chaos buried the first Crystal under a heap of minus signs.','Ride the cart: up is positive, down is negative, and the gems will not dig themselves.']},
 {name:'Subway Dash',topic:'BIDMAS',game:'Lane runner',c1:'#F0367A',c2:'#2FC6F0',story:['Dr. Chaos scrambled the order of operations. Now 3 + 4 × 2 equals "banana".','Dash through the gates in BIDMAS order before the train leaves.']},
 {name:'Monster Arena',topic:'Substitution',game:'Monster battles',c1:'#F27318',c2:'#E0B100',story:['Formula monsters have escaped from the lab and are eating the homework.','Swap letters for numbers to power your attacks. Bigger numbers, bigger booms.']},
 {name:'Power 2048',topic:'Laws of indices',game:'Tile merge',c1:'#D9771C',c2:'#C94B2A',story:['The tiles in Power Tower are stuck together with bad maths.','Pick the right index law and watch them merge into bigger powers.']},
 {name:'Balance Dungeon',topic:'Solving equations',game:'Puzzle rooms',c1:'#14A89B',c2:'#6C5CE7',story:['Every door in this dungeon is locked by a wobbly balance scale.','Do the same to both sides and the doors swing open. Dr. Chaos hates fairness.']},
 {name:'Mystery Mansion',topic:'Simultaneous equations',game:'Detective vault',c1:'#8B4FD8',c2:'#E04BA8',story:['Someone locked the Crystal in a vault. (It was Dr. Chaos. It is always Dr. Chaos.)','Combine two clues to crack the secret code, then check it in both.']},
 {name:'Bracket Ninja',topic:'Expanding brackets',game:'Fruit slicing',c1:'#DE3341',c2:'#08A87D',story:['Dr. Chaos is throwing fruit at you. Very mathematical fruit.','Slice the right terms in order to expand each bracket. Mind the decoys!']},
 {name:'Block Builder',topic:'Factorising',game:'Falling blocks',c1:'#2F6FEB',c2:'#E8A400',story:['Expressions are falling from the sky like confused bricks.','Find the highest common factor and pack them neatly into brackets.']},
 {name:'City Builder',topic:'Area of 2D shapes',game:'Town tycoon',c1:'#0596C2',c2:'#5E9E3A',story:['Dr. Chaos sold the town plans for pocket money.','Work out the area of each plot to rebuild the city, one building at a time.']},
 {name:'Final Boss',topic:'Algebraic fractions',game:'Boss fight',c1:'#E8005F',c2:'#7B2FE0',story:['Dr. Chaos is out of minions and very, very cross.','Factorise, cancel, and knock him out of the Number Realm for good!']}];
const LESSONS=[
 {rule:'Up the shaft is positive, down is negative. Adding a positive moves UP; subtracting moves DOWN. Two minus signs side by side make a plus: 4 − (−2) = 4 + 2. When multiplying or dividing, same signs give a positive answer and different signs give a negative one.',tier:3},
 {rule:'BIDMAS tells you which part goes first: <b>B</b>rackets, <b>I</b>ndices, then <b>D</b>ivision and <b>M</b>ultiplication (left to right), then <b>A</b>ddition and <b>S</b>ubtraction (left to right).',tier:3},
 {rule:'Substitution means swapping each letter for its number. Put negative numbers in brackets, then follow BIDMAS. 3a means 3 × a, and x² means x × x.',tier:2},
 {rule:'Same letter, multiplying: ADD the powers. Dividing: SUBTRACT the powers. A power of a power: MULTIPLY the powers. Anything to the power 0 is 1. Numbers in front multiply or divide as usual.',tier:1},
 {rule:'An equation is a balance. Do the same to both sides to keep it level. Undo + with −, and undo × with ÷. If x is on both sides, collect the x terms on one side first.',tier:2},
 {rule:'Two clues, two unknowns. Add or subtract the equations so one letter disappears, or swap one letter for what it equals. Then check your values in BOTH equations.',tier:1},
 {rule:'To expand, multiply the term outside by EVERY term inside the bracket. Watch the signs, and remember x × x = x².',tier:2},
 {rule:'Factorising is expanding backwards. Find the HIGHEST common factor of every term (numbers and letters), write it outside, and divide each term by it inside the bracket.',tier:2},
 {rule:'Area is the space inside a shape, in square units. Rectangle: l × w. Triangle: ½ × b × h. Parallelogram: b × h. Trapezium: ½(a + b)h. Always use the perpendicular height.',tier:2},
 {rule:'To simplify an algebraic fraction, factorise the top and the bottom first, then cancel any factor they share. You may only cancel things that MULTIPLY the whole top and the whole bottom.',tier:2}];
/* restored from the live build */
const BADGES = [
  { id: "crystal1", n: "First Crystal", d: "Clear your first world" },
  { id: "super", n: "Super Brain", d: "Beat the clock on a super question" },
  { id: "streak10", n: "On Fire", d: "10 correct in a row" },
  { id: "streak20", n: "Unstoppable", d: "20 correct in a row" },
  { id: "nohint", n: "Brain Power", d: "Clear a world with no hints" },
  { id: "perfect", n: "Triple Star", d: "Get 3 stars on a world" },
  { id: "bounce", n: "Bounce Back", d: "Finish the Training Room" },
  { id: "rush0", n: "Rush Rookie", d: "Beat Boss Rush I" },
  { id: "rush1", n: "Rush Regular", d: "Beat Boss Rush II" },
  { id: "rush2", n: "Rush Royalty", d: "Beat Boss Rush III" },
  { id: "half", n: "Halfway Hero", d: "Clear 5 worlds" },
  { id: "finale", n: "Realm Restored", d: "Win the Grand Finale" },
  { id: "style", n: "Style Icon", d: "Buy something in the shop" },
  { id: "builder", n: "Town Planner", d: "Build 12 buildings" },
];
function badgeSVG(i,on){const cols=['#FF4D6D','#FF7A1A','#FFC531','#3DDC97','#4FC3F7','#8E82FF','#E04BA8'];const c=cols[i%cols.length];
 return`<svg viewBox="0 0 60 60"><path d="M18 2h8l4 12-8 2zM42 2h-8l-4 12 8 2z" fill="${on?'#4936F5':'#888'}"/><circle cx="30" cy="36" r="20" fill="${c}" stroke="#00000040" stroke-width="3"/><circle cx="30" cy="36" r="13" fill="#ffffff55"/><text x="30" y="42" text-anchor="middle" font-family="Bungee,sans-serif" font-size="16" fill="#fff">${i+1}</text></svg>`}
/* ---- economy ---- */
function addCoins(n){S.coins=Math.max(0,S.coins+n);updTop();if(n>0)sfx('coin')}
function addXP(n){S.xp+=n;updTop()}
function badge(id){if(S.badges.includes(id))return;S.badges.push(id);save();const b=BADGES.find(x=>x.id===id);if(b){gtoast('Badge unlocked: '+b.n);sfx('level')}}
function recordSkill(tag,ok){const k=S.skills[tag]||(S.skills[tag]={h:[],c:0,t:0});k.h.push(ok?1:0);if(k.h.length>10)k.h.shift();k.t++;if(ok)k.c++}
function stageMastery(s){const tags=Object.keys(GEN[s].tags);let sum=0;tags.forEach(t=>{const k=S.skills[t];if(!k||!k.h.length)return;const acc=k.h.reduce((a,b)=>a+b,0)/k.h.length;sum+=acc*Math.min(1,k.h.length/4)});return Math.round(100*sum/tags.length)}
function weakTags(s){return Object.keys(GEN[s].tags).filter(t=>{const k=S.skills[t];return k&&k.h.length>=2&&k.h.reduce((a,b)=>a+b,0)/k.h.length<.7})}
const level=()=>1+Math.floor(S.xp/250);
/* ---- toasts ---- */
let gtT;
let stT;
function gtoast(m){const t=$('#gtoast');t.textContent=m;t.classList.add('on');clearTimeout(gtT);gtT=setTimeout(()=>t.classList.remove('on'),2200)}
function toast(m){const t=$('#toast');if(!t)return gtoast(m);t.textContent=m;t.classList.add('on');clearTimeout(stT);stT=setTimeout(()=>t.classList.remove('on'),2000)}
function shake(){const s=$('#scene');if(!s)return;s.classList.remove('shake');void s.offsetWidth;s.classList.add('shake')}
/* ---- top bar ---- */
let VIEW='title';
/* restored from the live build */
let CURGAME = "algebra";
/* restored from the live build */
function renderTop() {
  if ("auth" === VIEW)
    return void ($("#top").innerHTML =
      `<span class="logo">${MINDOZA_LOGO(30)}<span class="logo-sub">Games</span></span>`);
  const e = NET.user && NET.user.admin;
  (($("#top").innerHTML =
    `<button class="logo" id="logoBtn" aria-label="Mindoza Games home">${MINDOZA_LOGO(30)}<span class="logo-sub">Games</span></button><span class="spacer"></span>\n ${NET.user ? `<button class="userbtn" id="meBtn" title="Your profile (@${esc(NET.user.username)})" aria-label="Your profile">${myPfp(30)}<span class="userchip">${esc(dispName())}</span></button><button class="navb outb" id="outBtn" aria-label="Sign out">${IC.out}<span>Sign out</span></button>` : ""}${e ? `<button class="navb adminb" data-v="admin" aria-pressed="${"admin" === VIEW}">${IC.star}<span>Admin</span></button>` : ""}\n <span class="chip" title="Coins">${IC.coin}<b id="tCoins">${coinTxt()}</b></span><span class="chip" title="Experience">Lv <b id="tLv">${level()}</b> \xb7 <b id="tXp">${S.xp}</b> XP</span>\n <button class="navb" data-v="${"ict" === CURGAME ? "ict" : "sci" === CURGAME ? "sci" : /^k3/.test(CURGAME) ? CURGAME : "map"}" aria-pressed="${"map" === VIEW || "ict" === VIEW || "sci" === VIEW || (/^k3/.test(VIEW) && "k3play" !== VIEW)}">${IC.map}<span>Map</span></button><button class="navb" data-v="shop" aria-pressed="${"shop" === VIEW}">${IC.bag}<span>Shop</span></button>\n <button class="navb" data-v="progress" aria-pressed="${"progress" === VIEW}">${IC.chart}<span>Progress</span></button><button class="cornerset" id="setBtn" aria-label="Settings: sounds, light or dark, nickname" aria-haspopup="dialog" aria-expanded="${!!$("#setPop")}" title="Settings">${IC.gear}</button>${gameBar()}`),
    $$("[data-gv]", $("#top")).forEach(
      (e) =>
        (e.onclick = () => {
          (AU.init(), go(e.dataset.gv));
        }),
    ),
    ($("#logoBtn").onclick = () => go("home")));
  const t = $("#meBtn");
  t && (t.onclick = profileModal);
  const a = $("#outBtn");
  a && (a.onclick = () => NET.logout());
  const s = $("#gradeSel");
  (s && (s.onchange = () => setGrade(+s.value)),
    $$(".navb[data-v]").forEach((e) => (e.onclick = () => go(e.dataset.v))),
    ($("#setBtn").onclick = setPanel));
}
/* restored from the live build */
function updTop() {
  const e = $("#tCoins");
  e && ((e.textContent = coinTxt()), ($("#tXp").textContent = S.xp), ($("#tLv").textContent = level()));
}
/* restored from the live build */
function go(e, t) {
  ("auth" === e || NET.token || (e = "auth"),
    "admin" !== e || (NET.user && NET.user.admin) || (e = "map"),
    RUN && "play" !== e && leaveStage(),
    XRUN && "ictplay" !== e && xlLeave(),
    SRUN && "sciplay" !== e && scLeave(),
    KRUN && "k3play" !== e && k3Leave(),
    /^k3(phy|chem|bio|spa)$/.test(e) && ((CURGAME = e), (K3G = e.slice(2))),
    "sci" === e && (CURGAME = "sci"),
    ("map" !== e && "play" !== e) || (CURGAME = "algebra"),
    "ict" === e && (CURGAME = "ict"),
    RUSH && "rush" !== e && (RUSH = null),
    closeModal(),
    hideFB(),
    (VIEW = e),
    renderTop(),
    window.scrollTo(0, 0));
  const a = $("#main");
  (({
    title: viewTitle,
    map: viewMap,
    shop: viewShop,
    progress: viewProgress,
    auth: viewAuth,
    admin: viewAdmin,
    ict: viewIct,
    sci: viewSci,
    home: viewHome,
    k3phy: (e) => viewK3(e, "phy"),
    k3chem: (e) => viewK3(e, "chem"),
    k3bio: (e) => viewK3(e, "bio"),
    k3spa: (e) => viewK3(e, "spa"),
  })[e](a, t),
    "play" !== e && "rush" !== e && "ictplay" !== e && "sciplay" !== e && "k3play" !== e && AU.music(-1));
}
function viewTitle(m){m.innerHTML=`<section class="hero"><div><p class="eyebrow">A Year 7 algebra adventure</p><h1>Algebra Quest<span>The Number Realm</span></h1>
 <p>Dr. Chaos has scrambled the Number Realm. Ten Guardians each hold a Math Crystal, and the only way to win one back is to master their world. Ten worlds, ten game styles, one very annoyed villain.</p>
 <p class="muted">No game overs. If you run out of hearts you visit the Training Room, then jump straight back in.</p>
 <div class="row" style="margin-top:16px"><button class="btn" id="startBtn">Begin the quest</button><button class="btn ghost" id="shopBtn">Style your explorer</button></div></div>
 <div class="hero-art">${avatarSVG(S.av)}</div></section>`;
 $('#startBtn').onclick=()=>{AU.init();S.seenIntro=true;save();go('map')};$('#shopBtn').onclick=()=>go('shop')}
const NODES=[{t:'s',i:0},{t:'s',i:1},{t:'s',i:2},{t:'b',i:0,after:2},{t:'s',i:3},{t:'s',i:4},{t:'s',i:5},{t:'b',i:1,after:5},{t:'s',i:6},{t:'s',i:7},{t:'s',i:8},{t:'b',i:2,after:8},{t:'s',i:9},{t:'f',after:9}];
/* restored from the live build */
const unlocked = (e) => POW("unlock") || 0 === e || S.cleared[e - 1];
/* restored from the live build */
function viewMap(t) {
  const e = NODES.map((t, e) => ({ x: 200 + 125 * Math.sin(1.15 * e), y: 70 + 112 * e })),
    a = e[e.length - 1].y + 80;
  let s = `M${e[0].x} ${e[0].y}`;
  for (let t = 1; t < e.length; t++) {
    const a = e[t - 1],
      n = e[t];
    s += ` C${a.x} ${a.y + 60} ${n.x} ${n.y - 60} ${n.x} ${n.y}`;
  }
  const n = S.cleared.findIndex((t) => !t),
    o = NODES.findIndex((t) => "s" === t.t && t.i === (n < 0 ? 9 : n));
  let r = "";
  NODES.forEach((t, a) => {
    const s = e[a];
    if ("s" === t.t) {
      const e = WORLDS[t.i],
        n = unlocked(t.i),
        o = S.stars[t.i];
      r += `<g class="node ${n ? "" : "locked"}" tabindex="0" role="button" data-k="${a}" aria-label="World ${t.i + 1}: ${e.name}${n ? "" : " (locked)"}" transform="translate(${s.x} ${s.y})">\n   <circle r="44" fill="${n ? e.c1 : "var(--line)"}" opacity=".25"/><circle class="ring" r="36" fill="${n ? e.c1 : "var(--surface2)"}" stroke="${n ? e.c2 : "var(--line)"}" stroke-width="5"/>\n   ${n ? `<text y="11" text-anchor="middle" font-family="Bungee,sans-serif" font-size="30" fill="#fff">${t.i + 1}</text>` : `<g transform="translate(-13 -14) scale(1.1)" color="var(--muted)">${IC.lock.replace("<svg", '<svg width="24" height="24"')}</g>`}\n   ${S.cleared[t.i] ? `<g transform="translate(-30 30)">${[0, 1, 2].map((t) => `<g transform="translate(${20 * t} 0)" opacity="${t < o ? 1 : 0.25}">${IC.star.replace("<svg", '<svg width="20" height="20"')}</g>`).join("")}</g>` : ""}\n   <text x="${s.x > 200 ? -52 : 52}" y="-6" text-anchor="${s.x > 200 ? "end" : "start"}" font-family="Bungee,sans-serif" font-size="15" fill="var(--ink)">${e.name}</text>\n   <text x="${s.x > 200 ? -52 : 52}" y="14" text-anchor="${s.x > 200 ? "end" : "start"}" font-size="13" font-weight="700" fill="var(--muted)">${e.topic}</text></g>`;
    } else {
      const e = bossOpen(t.after),
        n = "f" === t.t ? null != S.boss.f : null != S.boss["r" + t.i],
        o = "f" === t.t ? "Grand Finale" : "Boss Rush " + ["I", "II", "III"][t.i];
      r += `<g class="node ${e ? "" : "locked"}" tabindex="0" role="button" data-k="${a}" aria-label="${o}${e ? "" : " (locked)"}" transform="translate(${s.x} ${s.y})"><rect x="-30" y="-30" width="60" height="60" rx="16" fill="${e ? ("f" === t.t ? "#E8005F" : "#FFC531") : "var(--surface2)"}" stroke="${e ? "#8A5F00" : "var(--line)"}" stroke-width="4" transform="rotate(45)"/>\n   <g transform="translate(-20 -20)" opacity="${e ? 1 : 0.35}">${IC.chest.replace("<svg", '<svg width="40" height="40"')}</g>\n   <text x="${s.x > 200 ? -46 : 46}" y="5" text-anchor="${s.x > 200 ? "end" : "start"}" font-family="Bungee,sans-serif" font-size="14" fill="var(--ink)">${o}${n ? " ✓" : ""}</text></g>`;
    }
  });
  const i = e[o < 0 ? 0 : o];
  ((t.innerHTML = `<div class="mapwrap"><div><p class="eyebrow">World map</p><h2 style="font-size:28px;margin:4px 0 6px">The Number Realm</h2><p class="muted" style="margin:0 0 8px">${S.cleared.filter(Boolean).length} of 10 Crystals recovered. Tap any open world to play or replay it.</p>\n <svg class="mapsvg" viewBox="0 0 400 ${a}" role="group" aria-label="World map"><path d="${s}" fill="none" stroke="var(--line)" stroke-width="14" stroke-linecap="round"/><path d="${s}" fill="none" stroke="var(--surface)" stroke-width="4" stroke-dasharray="2 14" stroke-linecap="round"/>\n ${r}<g class="hero-drag" transform="translate(${i.x + (i.x > 200 ? 24 : -82)} ${i.y - 74})"><svg x="0" y="0" width="58" height="64" viewBox="-4 -28 108 128">${avatarSVG(
    S.av,
  )
    .replace(/^<svg[^>]*>/, "")
    .replace(
      /<\/svg>$/,
      "",
    )}</svg></g></svg></div>\n <aside class="side"><div class="panel"><h3>Your explorer</h3><div class="row">${avatarSVG(S.av, "av", 72)}<div><b>Level ${level()}</b><br><span class="muted">${S.stats.correct} correct answers · best streak ${S.stats.bestStreak}</span></div></div></div>\n <div class="panel"><h3>How worlds work</h3><p style="margin:0" class="muted">Fill the Mastery meter to 100 and get at least 8 of your last 10 right to win the Crystal. Questions get harder as you improve and easier if you get stuck.</p></div>\n <div class="panel"><h3>Calm mode ${S.settings.calm ? "is on" : "is off"}</h3><p style="margin:0 0 10px" class="muted">Calm mode removes timers and speed bonuses everywhere.</p><button class="btn ghost" id="calmBtn">${S.settings.calm ? "Turn calm mode off" : "Turn calm mode on"}</button></div></aside></div>`),
    ($("#calmBtn").onclick = () => {
      ((S.settings.calm = !S.settings.calm), save(), viewMap(t));
    }),
    $$(".node", t).forEach((t) => {
      const e = () => {
        AU.init();
        const e = NODES[+t.dataset.k];
        if ("s" === e.t) {
          if (!unlocked(e.i)) return gtoast("Clear World " + e.i + " to open this one");
          stageIntro(e.i);
        } else {
          if (!bossOpen(e.after)) return gtoast("Clear World " + (e.after + 1) + " to open this");
          startRush("f" === e.t ? "f" : e.i);
        }
      };
      ((t.onclick = e),
        (t.onkeydown = (t) => {
          ("Enter" !== t.key && " " !== t.key) || (t.preventDefault(), e());
        }));
    }));
}
/* ---- modal ---- */
function modal(html,cls=''){closeModal();const ov=H(`<div class="ov" id="ov"><div class="modal ${cls}" role="dialog" aria-modal="true">${html}</div></div>`);document.body.append(ov);setTimeout(()=>{const f=$('#ov .btn');f&&f.focus()},50);return $('.modal',ov)}
function closeModal(){const o=$('#ov');if(o)o.remove()}
/* restored from the live build */
function stageIntro(e) {
  const t = WORLDS[e],
    s =
      (modal(
        `<div style="--w1:${t.c1};--w2:${t.c2}"><p class="eyebrow">World ${e + 1} \xb7 ${t.game}</p><h2>${t.name}</h2><p style="font-weight:700;margin:4px 0 10px">${t.topic}</p>\n <p style="font-size:17px">${t.story[0]}<br>${t.story[1]}</p><div class="row" style="margin:10px 0"><span class="chip">Mastery ${stageMastery(e)}%</span>${S.cleared[e] ? `<span class="chip">${IC.star} ${S.stars[e]} / 3</span>` : ""}</div>\n <div class="row" style="margin-top:14px">${S.learned[e] ? '<button class="btn w" id="pNow">Play</button><button class="btn ghost" id="pLearn">Lesson first</button>' : '<button class="btn w" id="pLearn">Start the lesson</button>'}<button class="btn ghost" id="pX">Not now</button></div></div>`,
        "esc",
      ),
      $("#pNow"));
  (s && (s.onclick = () => startStage(e, !1)),
    ($("#pLearn").onclick = () => startStage(e, !0)),
    ($("#pX").onclick = closeModal));
}
/* ---- lesson ---- */
function showLesson(s,done){const w=WORLDS[s],L=LESSONS[s];const q=genQ(s,L.tier);const first=!S.learned[s];
 const m=modal(`<div style="--w1:${w.c1};--w2:${w.c2}"><p class="eyebrow">Quick lesson · ${w.topic}</p><h2>How it works</h2><div class="lesson-rule" style="margin:12px 0">${L.rule}</div>
 <div class="wexample"><p class="eyebrow">Worked example</p><div class="muted">${q.ask}${q.text?': '+q.text:''}</div><div class="lesson-ex">${q.expr}</div><ol class="steps" id="lsteps"></ol></div>
 <div class="row" style="margin-top:14px"><button class="btn w" id="lGo" ${first?'disabled':''}>${first?'Watch the example…':'Start playing'}</button>${first?'':'<button class="btn ghost" id="lSkip">Skip</button>'}</div></div>`);
 const ol=$('#lsteps');let i=0;const tick=()=>{if(!$('#lsteps'))return;if(i<q.sol.length){ol.append(H(`<li>${q.sol[i]}</li>`));sfx('click');i++;setTimeout(tick,first?2600:1100)}else{const b=$('#lGo');b.disabled=false;b.textContent='Start playing';b.focus()}};setTimeout(tick,first?900:300);
 $('#lGo').onclick=()=>{closeModal();done()};const sk=$('#lSkip');if(sk)sk.onclick=()=>{closeModal();done()}}
/* ---- answer UI ---- */
function answerUI(el,ans,cb,opt={}){el.innerHTML='';let locked=false;const fire=(r,v)=>{if(locked)return;if(r.parse){msg.textContent=r.why||READ_ERR;sfx('click');return}locked=!opt.multi;cb(r,v)};
 const msg=H('<div class="msg" role="status" aria-live="polite"></div>');
 if(opt.prompt)el.append(H(`<div class="muted" style="font-weight:700">${opt.prompt}</div>`));
 if(ans.type==='choice'){const wrap=H('<div class="choices"></div>');ans.opts.forEach((o,i)=>{const b=H(`<button class="btn choice">${o}</button>`);b.onclick=()=>fire(checkAns(ans,i),i);wrap.append(b)});el.append(wrap,msg);return}
 if(ans.type==='pair'){const f=H(`<form class="ans-form pair" autocomplete="off"><label for="pa0">${ans.vars[0]} =</label><input class="ans-in" id="pa0" inputmode="text" aria-label="${ans.vars[0]}"><label for="pa1">${ans.vars[1]} =</label><input class="ans-in" id="pa1" inputmode="text" aria-label="${ans.vars[1]}"><button class="btn w">${opt.btn||'Check'}</button></form>`);
  f.onsubmit=e=>{e.preventDefault();const v=[$('#pa0',f).value,$('#pa1',f).value];fire(checkAns(ans,v),v)};el.append(f,keypad(['−'],f),msg);setTimeout(()=>{if(!matchMedia('(pointer:coarse)').matches)$('#pa0',f).focus()},30);return}
 const label=opt.label||ans.label||'Answer';const f=H(`<form class="ans-form" autocomplete="off"><label for="ansIn">${label}</label><input class="ans-in" id="ansIn" inputmode="text" spellcheck="false" autocapitalize="off" placeholder="${opt.ph||''}" aria-label="${esc(label)}"><button class="btn w">${opt.btn||'Check'}</button></form>`);
 const inp=$('input',f),pv=H('<div class="preview" aria-hidden="true"></div>');inp.oninput=()=>{pv.innerHTML=/[\^*\-]/.test(inp.value)?'Reads as: '+pretty(inp.value):''};
 f.onsubmit=e=>{e.preventDefault();const r=opt.check?opt.check(inp.value):checkAns(ans,inp.value);fire(r,inp.value)};
 let keys=['−','/'];if(ans.type==='poly'||ans.type==='factor'||opt.alg){const vs=new Set();Object.keys(ans.p||{}).forEach(k=>Object.keys(P.mono(k)).forEach(v=>vs.add(v)));if(!vs.size)vs.add(opt.v||'x');keys=[...vs,'²','³','(',')','−','+']}
 el.append(f,keypad(keys,f),pv,msg);setTimeout(()=>{if(!matchMedia('(pointer:coarse)').matches)inp.focus()},30)}
function keypad(keys,form){const k=H('<div class="keys" aria-label="Maths keys"></div>');keys.forEach(c=>{const b=H(`<button type="button">${c}</button>`);b.onclick=()=>{const i=form.querySelector('input:focus')||form.querySelector('input');const s=i.selectionStart??i.value.length,e=i.selectionEnd??i.value.length;i.value=i.value.slice(0,s)+c+i.value.slice(e);i.focus();i.setSelectionRange(s+c.length,s+c.length);i.dispatchEvent(new Event('input'))};k.append(b)});return k}
let RUN=null;
let SCENE=null;
function makeApi(){return{finish:(ok,why,given)=>finishQ(ok,why,given),mistake:m=>mistake(m),ui:(ans,cb,opt)=>answerUI($('#ctl'),ans,cb,opt),ctl:()=>$('#ctl'),expr:()=>$('#qExpr'),text:()=>$('#qText'),
 sfx,burst:(el,n,c)=>burstEl(el,n,c),shake,toast,calm:()=>S.settings.calm,tier:()=>RUN?effTier():1,meter:()=>RUN?RUN.meter:0,coins:addCoins,live:()=>!!RUN,cur:()=>RUN&&RUN.cur}}
function effTier(){let t=RUN.tier;if(RUN.s===9){const m=RUN.meter;t=Math.max(t,m<34?1:m<67?2:3)}return t}
/* restored from the live build */
function startStage(e, t) {
  (closeModal(),
    leaveStage(),
    (VIEW = "play"),
    renderTop(),
    NET.track("start", { stage: e }),
    (RUN = {
      s: e,
      superAt: R.int(3, 7),
      superDone: !1,
      tStart: 0,
      tick: 0,
      meter: 0,
      hearts: 3,
      tier: 1,
      up: 0,
      down: 0,
      streak: 0,
      last: [],
      qn: 0,
      queue: [],
      miss: {},
      correct: 0,
      total: 0,
      hint: 0,
      usedHint: !1,
      seen: new Set(),
      cur: null,
      clearedShown: !1,
    }));
  const s = WORLDS[e];
  (($("#main").innerHTML =
    `<section class="play" style="--w1:${s.c1};--w2:${s.c2}">\n <div class="hud"><button class="iconbtn" id="backBtn" aria-label="Back to map">${IC.back}</button><div class="hud-title"><span class="eyebrow">World ${e + 1} \xb7 ${s.topic}</span><b>${s.name}</b></div>\n  <div class="hearts" id="hearts" aria-label="Hearts"></div><div class="meter" title="Mastery"><span class="eyebrow">Mastery</span><div class="meter-bar"><i id="meterFill"></i></div><b id="meterTxt">0</b></div>\n  <div class="last10" id="last10" aria-label="Last 10 answers"></div><span class="chip" id="tierChip">Tier 1</span><span class="chip tmr${S.settings.calm ? " calm" : ""}" title="Level time">${IC.clock}<b id="tmr">0:00</b></span><span class="flame" id="flame" title="Streak"></span>${POW("autowin") ? '<button class="btn gold" id="winBtn" style="min-height:38px;padding:6px 12px;font-size:13px">Clear world</button>' : ""}</div>\n <div class="stagewrap"><div class="scene" id="scene"></div><div class="toast" id="toast" role="status"></div></div>\n <div class="qcard" id="qcard"><div class="qhead"><span class="ask" id="qAsk"></span><span class="chip review" id="qRev" hidden></span></div><div class="qtext" id="qText"></div><div class="qexpr" id="qExpr" aria-live="polite"></div>\n  <div class="reveal" id="qReveal" hidden></div><div id="inBad" class="inline-bad" hidden role="alert"></div><div class="ctl" id="ctl"></div>\n  <div class="hints"><button data-h="1">${IC.bulb}Hint 1 \xb7 5${IC.coin}</button><button data-h="2">Hint 2 \xb7 10${IC.coin}</button><button data-h="3">Hint 3 \xb7 15${IC.coin}</button></div><div class="hintbox" id="hintBox" hidden></div></div></section>`),
    ($("#backBtn").onclick = () => go("map")));
  const a = $("#winBtn");
  (a &&
    (a.onclick = () => {
      RUN &&
        (closeModal(),
        hideFB(),
        (RUN.meter = 100),
        (RUN.correct = RUN.total = Math.max(10, RUN.total)),
        (RUN.last = Array(10).fill(!0)),
        updHUD(),
        stageClear());
    }),
    $$(".hints button").forEach((e) => (e.onclick = () => useHint(+e.dataset.h))),
    (SCENE = SC[e]($("#scene"), makeApi())),
    updHUD(),
    AU.music(e));
  const n = () => {
    ((S.learned[e] = !0), save(), RUN && clockStart(RUN, "tmr"), nextQ());
  };
  t || !S.learned[e] ? showLesson(e, n) : n();
}
/* restored from the live build */
function leaveStage() {
  if ((RUN && clockStop(RUN), SCENE && SCENE.destroy))
    try {
      SCENE.destroy();
    } catch (e) {}
  ((SCENE = null), (RUN = null), hideFB(), (document.onkeydown = null));
}
function updHUD(){if(!RUN)return;$('#hearts').innerHTML=[0,1,2].map(i=>`<span class="${i<RUN.hearts?'':'lost'}">${IC.heart}</span>`).join('');
 $('#meterFill').style.width=RUN.meter+'%';$('#meterTxt').textContent=RUN.meter+'%';
 $('#last10').innerHTML=Array.from({length:10},(_,i)=>{const v=RUN.last[i];return`<i class="${v===undefined?'':v?'y':'n'}"></i>`}).join('');
 $('#tierChip').textContent='Tier '+effTier();const f=$('#flame');f.innerHTML=RUN.streak>0?`${IC.flame}<span>${RUN.streak}</span>`:'';const sv=$('svg',f);if(sv)sv.style.transform=`scale(${Math.min(1.8,1+RUN.streak*.06)})`;
 $$('.hints button').forEach(b=>{const h=+b.dataset.h;b.disabled=h!==RUN.hint+1})}
/* restored from the live build */
function nextQ() {
  if (!RUN) return;
  if ((hideFB(), !RUN.superDone && !RUN.clearedShown && RUN.qn + 1 >= RUN.superAt))
    return (
      (RUN.superDone = !0),
      SCENE && SCENE.pause && SCENE.pause(!0),
      superAsk(
        "algebra",
        RUN.s,
        () => {
          if (RUN) return algCleared() ? stageClear() : void nextQ();
        },
        sqBoostA,
      )
    );
  if (!RUN.clearedShown && doorDue(RUN, RUN.meter))
    return (
      SCENE && SCENE.pause && SCENE.pause(!0),
      doorAsk(
        "algebra",
        RUN.s,
        () => {
          if (RUN) return algCleared() ? stageClear() : void nextQ();
        },
        doorBoostA,
      )
    );
  (RUN.qn++, (RUN.hint = 0));
  const e = $("#hintBox");
  ((e.hidden = !0), (e.innerHTML = ""), ($("#inBad").hidden = !0));
  const t = RUN.s;
  let s,
    a = !1;
  const n = RUN.queue.findIndex((e) => e.due <= RUN.qn);
  (n >= 0
    ? (s = genQ(t, 0, RUN.queue.splice(n, 1)[0].tag, RUN.seen))
    : t >= 2 && Math.random() < 0.2
      ? ((s = genQ(R.int(0, t - 1), R.int(1, 3), null, RUN.seen)), (a = !0))
      : (s = genQ(t, effTier(), null, RUN.seen)),
    (RUN.cur = { q: s, review: a, flawed: !1, done: !1, heartLost: !1, t0: performance.now() }),
    ($("#qAsk").textContent = s.ask),
    ($("#qText").innerHTML = s.text || ""),
    ($("#qExpr").innerHTML = s.expr));
  const i = $("#qRev");
  ((i.hidden = !a), a && (i.textContent = "Quick review \xb7 " + WORLDS[s.stage].topic));
  const o = $("#qReveal");
  ((o.hidden = !POW("reveal")),
    POW("reveal") && (o.innerHTML = "Answer (admin reveal): <b>" + ansText(s.ans) + "</b>"),
    updHUD());
  const r = $("#scene");
  a
    ? (r.classList.add("dim"),
      SCENE.pause && SCENE.pause(!0),
      answerUI($("#ctl"), s.ans, (e, t) => finishQ(e.ok, e.why, t)))
    : (r.classList.remove("dim"), SCENE.pause && SCENE.pause(!1), SCENE.present(s));
}
/* restored from the live build */
function sqBoostA() {
  if (!RUN) return "";
  const e = Math.round(1.5 * (10 + Math.min(10, 2 * RUN.streak)));
  return (
    (RUN.meter = Math.min(100, RUN.meter + e)),
    RUN.streak++,
    RUN.correct++,
    RUN.total++,
    RUN.last.push(!0),
    RUN.last.length > 10 && RUN.last.shift(),
    updHUD(),
    `+${e}% mastery`
  );
}
/* restored from the live build */
function doorBoostA() {
  if (!RUN) return "";
  const e = Math.min(30, 100 - RUN.meter);
  return (
    (RUN.meter = Math.min(100, RUN.meter + 30)),
    RUN.streak++,
    RUN.correct++,
    RUN.total++,
    RUN.last.push(!0),
    RUN.last.length > 10 && RUN.last.shift(),
    updHUD(),
    `+${e}% mastery`
  );
}
/* restored from the live build */
function algCleared() {
  return !!RUN && !RUN.clearedShown && RUN.meter >= 100 && RUN.last.filter(Boolean).length >= 8;
}
/* restored from the live build */
function loseHeart() {
  const e = RUN.cur;
  if (!e.heartLost && !e.review) {
    if (((e.heartLost = !0), POW("hearts"))) return (sfx("hit"), void shake());
    ((RUN.hearts = Math.max(0, RUN.hearts - 1)), sfx("hit"), shake(), updHUD());
  }
}
function mistake(msg){if(!RUN||!RUN.cur||RUN.cur.done)return;RUN.cur.flawed=true;loseHeart();sfx('bad');const b=$('#inBad');b.innerHTML=msg;b.hidden=false}
/* restored from the live build */
function finishQ(e, t, s) {
  if (!RUN) return;
  const a = RUN.cur;
  if (!a || a.done) return;
  a.done = !0;
  const n = a.q,
    i = e && !a.flawed;
  if (
    (recordSkill(n.tag, i),
    S.stats.answered++,
    i && S.stats.correct++,
    NET.track("answer", {
      stage: n.stage,
      tag: n.tag,
      tier: n.tier,
      ok: i,
      ms: Math.round(performance.now() - a.t0),
      review: !!a.review,
      hint: RUN.hint,
    }),
    a.review)
  )
    return void (i
      ? (addCoins(2),
        addXP(5),
        sfx("good"),
        toast("Review nailed! +2 coins"),
        save(),
        setTimeout(() => {
          RUN && nextQ();
        }, 900))
      : (sfx("bad"), save(), showFeedback(n, i, t, s, () => nextQ())));
  RUN.total++;
  let o = 0,
    r = 0,
    l = !1;
  (i
    ? (RUN.streak++,
      RUN.correct++,
      (o = 10 + Math.min(10, 2 * (RUN.streak - 1))),
      (RUN.meter = Math.min(100, RUN.meter + o)),
      RUN.up++,
      (RUN.down = 0),
      RUN.up >= 3 &&
        RUN.tier < 4 &&
        (RUN.tier++,
        (RUN.up = 0),
        setTimeout(() => {
          (toast("Level up! Tier " + RUN.tier + " unlocked"), sfx("level"));
        }, 600)),
      (r = 3 + (RUN.streak >= 3 ? 1 : 0)),
      (l = !S.settings.calm && performance.now() - a.t0 < 12e3),
      l && (r += 2),
      (S.coins += r),
      addXP(10),
      sfx("coin"),
      RUN.streak > S.stats.bestStreak && (S.stats.bestStreak = RUN.streak),
      RUN.streak >= 10 && badge("streak10"),
      RUN.streak >= 20 && badge("streak20"))
    : ((RUN.streak = 0),
      (RUN.up = 0),
      RUN.down++,
      e || (RUN.meter = Math.max(0, RUN.meter - 10)),
      RUN.down >= 2 &&
        RUN.tier > 1 &&
        (RUN.tier--, (RUN.down = 0), setTimeout(() => toast("Easing off to Tier " + RUN.tier + " for a bit"), 300)),
      loseHeart(),
      (RUN.miss[n.tag] = (RUN.miss[n.tag] || 0) + 1),
      RUN.queue.push({ tag: n.tag, due: RUN.qn + (RUN.miss[n.tag] >= 2 ? R.int(1, 3) : R.int(1, 2)) }),
      addXP(3)),
    RUN.last.push(i),
    RUN.last.length > 10 && RUN.last.shift(),
    updHUD(),
    updTop(),
    save());
  try {
    SCENE.react && SCENE.react(e, n, i);
  } catch (e) {}
  const c = !RUN.clearedShown && RUN.meter >= 100 && RUN.last.filter(Boolean).length >= 8,
    d = () => {
      if (RUN)
        return c && !RUN.superDone
          ? ((RUN.superDone = !0),
            SCENE && SCENE.pause && SCENE.pause(!0),
            superAsk(
              "algebra",
              RUN.s,
              () => {
                RUN && stageClear();
              },
              sqBoostA,
            ))
          : c
            ? stageClear()
            : RUN.hearts <= 0
              ? trainingRoom()
              : void nextQ();
    };
  i
    ? (sfx("good"),
      burstEl($("#qExpr"), 24, [WORLDS[RUN.s].c1, WORLDS[RUN.s].c2, "#FFC531", "#fff"]),
      $("#qExpr").classList.remove("flash"),
      $("#qExpr").offsetWidth,
      $("#qExpr").classList.add("flash"),
      toast(`+${o} mastery \xb7 +${r} coins${l ? " \xb7 Speedy!" : ""}`),
      setTimeout(d, 1500))
    : showFeedback(n, e, t, s, d);
}
function showFeedback(q,ok,why,given,cb){hideFB();const slip=ok;const sh=H(`<div class="sheet" id="fbSheet"><div role="dialog" aria-label="Feedback"><h3>${slip?'You got there!':'Not quite, here is how'}</h3>
 ${slip?'<p style="margin:0">There was a slip on the way, so no mastery points this time. Here is the clean method:</p>':''}${why&&!slip?`<p style="margin:0;font-weight:700">${why}</p>`:''}
 ${!slip&&given!==undefined&&given!==''&&typeof given!=='number'?`<p style="margin:4px 0" class="muted">You answered: <b>${Array.isArray(given)?given.map(pretty).join(', '):pretty(given)}</b></p>`:''}
 <p style="margin:4px 0;font-size:18px">Correct answer: <b>${ansText(q.ans)}</b></p><ol class="steps">${q.sol.map((s,i)=>`<li style="animation-delay:${i*.12}s">${s}</li>`).join('')}</ol>
 <p class="muted" style="margin:4px 0 10px">A similar question is coming up soon so you can try again.</p><button class="btn w" id="fbNext">Next question</button></div></div>`);
 const w=RUN?WORLDS[RUN.s]:null;if(w)sh.style.cssText=`--w1:${w.c1};--w2:${w.c2}`;document.body.append(sh);const b=$('#fbNext');b.focus();b.onclick=()=>{hideFB();cb()}}
function hideFB(){const f=$('#fbSheet');if(f)f.remove()}
/* restored from the live build */
function useHint(e) {
  if (!RUN || !RUN.cur || RUN.cur.done) return;
  const t = [0, 5, 10, 15][e];
  if (e !== RUN.hint + 1) return;
  if (!spend(t)) return toast("Not enough coins yet. Answer questions to earn more!");
  (updTop(), (RUN.hint = e), (RUN.usedHint = !0), sfx("click"));
  const s = RUN.cur.q,
    a = $("#hintBox");
  if (
    ((a.hidden = !1),
    1 === e && (a.innerHTML = `<b>Rule:</b> ${s.rule}`),
    2 === e && (a.innerHTML += `<br><b>First step:</b> ${s.first}`),
    3 === e)
  ) {
    const e = genQ(s.stage, 0, s.tag);
    a.innerHTML += `<br><b>A similar one, fully worked:</b> <span style="font-weight:700">${e.expr.replace("<br>", " and ")}</span>${e.text ? '<br><span class="muted">' + e.text + "</span>" : ""}<ol>${e.sol.map((e) => `<li>${e}</li>`).join("")}</ol>`;
  }
  (updHUD(), save());
}
/* restored from the live build */
function trainingRoom() {
  const e = RUN.s,
    t = WORLDS[e];
  NET.track("training", { stage: e });
  const s = genQ(e, Math.max(1, RUN.tier - 1));
  let a = 0;
  modal(
    `<div style="--w1:${t.c1};--w2:${t.c2}"><p class="eyebrow">Out of hearts? No problem.</p><h2>Training Room</h2><p>Let's reload your brain with one worked example and two guided questions. Then you are straight back in with fresh hearts.</p>\n <div class="lesson-rule">${LESSONS[e].rule}</div><div class="wexample" style="margin-top:10px"><p class="eyebrow">Worked example</p><div class="lesson-ex">${s.expr}</div>${s.text ? `<div class="muted">${s.text}</div>` : ""}<ol class="steps">${s.sol.map((e, t) => `<li style="animation-delay:${0.4 * t}s">${e}</li>`).join("")}</ol></div>\n <div id="trQ" style="margin-top:14px"></div></div>`,
  );
  const n = $("#trQ"),
    i = () => {
      if (a >= 2)
        return (
          (n.innerHTML =
            '<p style="font-weight:700">Training complete. Hearts refilled!</p><button class="btn w" id="trGo">Back to the action</button>'),
          ($("#trGo").onclick = () => {
            (closeModal(),
              (RUN.hearts = 3),
              (RUN.meter = Math.floor(RUN.meter / 2)),
              badge("bounce"),
              updHUD(),
              nextQ());
          }),
          void $("#trGo").focus()
        );
      const t = genQ(e, Math.max(1, RUN.tier - 1), null, RUN.seen);
      ((n.innerHTML = `<p class="eyebrow">Guided question ${a + 1} of 2</p><div class="muted">${t.ask}${t.text ? ": " + t.text : ""}</div><div class="lesson-ex">${t.expr}</div><div class="hintbox"><b>Tip:</b> ${t.first}</div><div class="ctl" id="trCtl" style="margin-top:8px"></div><div id="trFb"></div>`),
        answerUI($("#trCtl"), t.ans, (e) => {
          recordSkill(t.tag, e.ok);
          const s = $("#trFb");
          (e.ok
            ? (sfx("good"), (s.innerHTML = '<p class="ok" style="font-weight:700">Spot on!</p>'))
            : (sfx("bad"),
              (s.innerHTML = `<p class="no" style="font-weight:700">The answer is ${ansText(t.ans)}.</p><ol class="steps">${t.sol.map((e) => `<li>${e}</li>`).join("")}</ol>`)),
            a++,
            s.append(H('<button class="btn w">Continue</button>')));
          const n = $("button", s);
          ((n.onclick = i), n.focus());
        }));
    };
  i();
}
/* restored from the live build */
function stageClear() {
  const e = RUN.s,
    t = WORLDS[e];
  RUN.clearedShown = !0;
  const s = RUN.correct / Math.max(1, RUN.total),
    a = s >= 0.9 ? 3 : s >= 0.75 ? 2 : 1,
    n = !S.cleared[e],
    i = clockStop(RUN),
    o = bestTime("a" + e, i);
  (NET.track("clear", { stage: e, ms: i, data: { stars: a, acc: Math.round(100 * s) } }),
    (S.cleared[e] = !0),
    (S.stars[e] = Math.max(S.stars[e], a)),
    (S.coins += n ? 30 : 10),
    addXP(n ? 100 : 30),
    n && badge("crystal1"),
    3 === a && badge("perfect"),
    RUN.usedHint || badge("nohint"),
    S.cleared.filter(Boolean).length >= 5 && badge("half"),
    save(),
    sfx("crystal"),
    setTimeout(() => FX.burst(innerWidth / 2, innerHeight / 2.4, 140, [t.c1, t.c2, "#FFC531", "#fff"]), 200));
  const r =
    2 === e || 5 === e || 8 === e
      ? '<p style="font-weight:700">A Boss Rush chest has appeared on the map!</p>'
      : 9 === e
        ? '<p style="font-weight:700">The Grand Finale is open. One last showdown!</p>'
        : "";
  (modal(
    `<div style="--w1:${t.c1};--w2:${t.c2};text-align:center"><p class="eyebrow">World ${e + 1} mastered</p><h2>Crystal recovered!</h2>\n <svg class="crystal" viewBox="0 0 100 100"><defs><linearGradient id="cg" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".4" stop-color="${t.c1}"/><stop offset="1" stop-color="${t.c2}"/></linearGradient></defs><path d="M50 4L80 34 50 96 20 34Z" fill="url(#cg)" stroke="#fff" stroke-width="2"/><path d="M20 34h60M50 4L40 34 50 96 60 34Z" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="2"/></svg>\n <div class="stars">${[0, 1, 2].map((e) => IC.star.replace("<svg", `<svg class="${e < a ? "" : "off"}"`)).join("")}</div><p>Accuracy ${Math.round(100 * s)}% \xb7 +${n ? 30 : 10} coins \xb7 +${n ? 100 : 30} XP</p>${timeLine(i, o)}${r}\n <div class="row" style="justify-content:center"><button class="btn w" id="cMap">Back to the map</button><button class="btn ghost" id="cMore">Keep practising</button></div></div>`,
  ),
    ($("#cMap").onclick = () => go("map")),
    ($("#cMore").onclick = () => {
      (closeModal(), nextQ());
    }));
}
/* ---- boss rush / finale ---- */
let RUSH=null;
function startRush(id){leaveStage();closeModal();VIEW='rush';renderTop();const fin=id==='f';const upto=fin?9:[2,5,8][id];const n=fin?15:10;const seen=new Set();const qs=[];
 for(let k=0;k<n;k++){const s=k<=upto?k%(upto+1):R.int(0,upto);qs.push(genQ(fin?R.int(0,9):s,R.int(2,fin?4:3),null,seen))}
 RUSH={id,qs:R.shuffle(qs),i:0,score:0};AU.music(fin?9:id*3+2);renderRush()}
function renderRush(){const r=RUSH,m=$('#main');const fin=r.id==='f';const title=fin?'Grand Finale':'Boss Rush '+['I','II','III'][r.id];
 if(r.i>=r.qs.length)return rushEnd();const q=r.qs[r.i];const w=WORLDS[q.stage];
 m.innerHTML=`<section style="--w1:${w.c1};--w2:${w.c2};max-width:720px;margin:0 auto;display:flex;flex-direction:column;gap:12px"><div class="hud"><button class="iconbtn" id="backBtn" aria-label="Back to map">${IC.back}</button><div class="hud-title"><span class="eyebrow">${fin?'Dr. Chaos’s last stand':'Mixed questions from every world so far'}</span><b>${title}</b></div><span class="spacer"></span><span class="chip">Question ${r.i+1} / ${r.qs.length}</span><span class="chip">Score ${r.score}</span></div>
 <div class="qcard"><div class="qhead"><span class="ask">${q.ask}</span><span class="chip review">${w.topic}</span></div><div class="qtext">${q.text||''}</div><div class="qexpr">${q.expr}</div><div class="ctl" id="ctl"></div><div id="rFb"></div></div></section>`;
 $('#backBtn').onclick=()=>go('map');
 answerUI($('#ctl'),q.ans,(res,v)=>{recordSkill(q.tag,res.ok);const fb=$('#rFb');if(res.ok){r.score++;sfx('good');burstEl($('.qexpr'),20);fb.innerHTML='<p class="ok" style="font-weight:700;font-size:18px">Correct!</p>'}
  else{sfx('bad');fb.innerHTML=`<p class="no" style="font-weight:700;font-size:18px">${res.why?res.why+' ':''}The answer is ${ansText(q.ans)}.</p><ol class="steps">${q.sol.map(x=>`<li>${x}</li>`).join('')}</ol>`}
  save();fb.append(H(`<button class="btn w">${r.i+1<r.qs.length?'Next':'Open the chest'}</button>`));const b=$('button',fb);b.focus();b.onclick=()=>{r.i++;renderRush()}})}
/* restored from the live build */
function rushEnd() {
  const e = RUSH,
    t = "f" === e.id,
    s = e.score / e.qs.length,
    a = t ? 50 + 10 * e.score : 10 + 5 * e.score;
  ((S.coins += a), addXP(8 * e.score));
  const n = t ? "f" : "r" + e.id;
  ((S.boss[n] = Math.max(S.boss[n] || 0, e.score)),
    NET.track("rush", { data: { id: e.id, score: e.score, of: e.qs.length } }),
    s >= 0.6 && badge(t ? "finale" : "rush" + e.id),
    save(),
    sfx(t ? "crystal" : "level"),
    FX.burst(innerWidth / 2, innerHeight / 2, t ? 200 : 90),
    ($("#main").innerHTML =
      `<section style="max-width:640px;margin:0 auto;text-align:center" class="panel"><p class="eyebrow">${t ? "Grand Finale complete" : "Chest unlocked"}</p><h2 style="font-size:30px;color:var(--accent)">${t ? (s >= 0.6 ? "The Number Realm is restored!" : "So close, Explorer!") : "You opened the bonus chest!"}</h2>\n <div style="width:120px;margin:16px auto;animation:bob 1.6s infinite">${IC.chest}</div><p style="font-size:18px">You scored <b>${e.score} / ${e.qs.length}</b> and earned <b>${a} coins</b>.</p>\n ${t ? (s >= 0.6 ? "<p>Dr. Chaos has been sent off to do his homework. All ten Crystals glow again. You are officially an Algebra Explorer.</p>" : "<p>Score 60% or more to defeat Dr. Chaos for good. Practise any world and try again!</p>") : s >= 0.6 ? "<p>Badge earned for scoring 60% or more.</p>" : "<p>Score 60% or more to earn this rush\u2019s badge.</p>"}\n <div class="row" style="justify-content:center;margin-top:12px"><button class="btn" id="eMap">Back to the map</button><button class="btn ghost" id="eAgain">Try again</button></div></section>`),
    ($("#eMap").onclick = () => go("map")),
    ($("#eAgain").onclick = () => startRush(e.id)));
}
/* ---- shop ---- */
let SHOPTAB='skin';
/* restored from the live build */
function viewShop(e) {
  const t = "skin" === SHOPTAB ? SKINS : "hat" === SHOPTAB ? HATS : TRAILS;
  ((e.innerHTML = `<p class="eyebrow">Shop</p><h2 style="font-size:28px;margin:4px 0">${"skin" === SHOPTAB ? "Pick your character" : "Style your character"}</h2><p class="muted" style="margin:0">Spend the coins you earn from correct answers. You have <b>${coinTxt()}</b> coins.</p>\n <div class="tabs" role="tablist">${[
    ["skin", "Characters"],
    ["hat", "Hats"],
    ["trail", "Trails"],
  ]
    .map(([e, t]) => `<button class="navb" role="tab" aria-pressed="${SHOPTAB === e}" data-t="${e}">${t}</button>`)
    .join("")}</div>\n <div class="grid">${t
    .map((e, t) => {
      const s = SHOPTAB + t,
        a = S.owned.includes(s),
        n = S.av[SHOPTAB] === t,
        i = { ...S.av, [SHOPTAB]: t };
      return `<div class="item ${n ? "on" : ""}">${"trail" === SHOPTAB ? `<div style="display:flex;align-items:center;height:96px">${trailSVG(t, 70)}${avatarSVG(S.av, "av", 80)}</div>` : "skin" === SHOPTAB ? `<span class="item-bub" style="--sc:${e.c}">${avatarSVG(i)}</span>` : avatarSVG(i)}<b>${e.n}</b>${e.t ? `<span class="item-t">${e.t}</span>` : ""}\n  ${n ? '<span class="chip">Equipped</span>' : a ? `<button class="btn ghost" data-eq="${t}">Equip</button>` : `<button class="btn gold" data-buy="${t}" ${canAfford(e.p) ? "" : "disabled"}>${IC.coin.replace("<svg", '<svg width="18" height="18"')} ${e.p}</button>`}</div>`;
    })
    .join("")}</div>`),
    $$("[data-t]", e).forEach(
      (t) =>
        (t.onclick = () => {
          ((SHOPTAB = t.dataset.t), viewShop(e));
        }),
    ),
    $$("[data-eq]", e).forEach(
      (t) =>
        (t.onclick = () => {
          ((S.av[SHOPTAB] = +t.dataset.eq),
            "skin" === SHOPTAB && (S.pic = ""),
            save(),
            renderTop(),
            sfx("click"),
            viewShop(e));
        }),
    ),
    $$("[data-buy]", e).forEach(
      (s) =>
        (s.onclick = () => {
          const a = +s.dataset.buy,
            n = t[a];
          spend(n.p) &&
            (S.owned.push(SHOPTAB + a),
            (S.av[SHOPTAB] = a),
            "skin" === SHOPTAB && (S.pic = ""),
            NET.track("buy", { data: { item: n.n + ("skin" === SHOPTAB ? " character" : "") } }),
            badge("style"),
            save(),
            sfx("coin"),
            burstEl(s, 30),
            updTop(),
            viewShop(e));
        }),
    ));
}
/* restored from the live build */
function viewProgress(e) {
  const t = S.stats.answered ? Math.round((100 * S.stats.correct) / S.stats.answered) : 0;
  ((e.innerHTML = `<p class="eyebrow">Progress</p><h2 style="font-size:28px;margin:4px 0">Your mastery</h2><div class="row" style="margin:8px 0 16px"><span class="chip">${S.cleared.filter(Boolean).length} / 10 Crystals</span><span class="chip">${S.stats.answered} answered</span><span class="chip">${t}% accuracy</span><span class="chip">Best streak ${S.stats.bestStreak}</span><span class="chip">${S.stats.superOk || 0} of ${S.stats.superTried || 0} super questions</span></div>\n <div class="mapwrap"><div class="prog"><h3 class="pcat" style="font-size:18px;margin-top:0">Algebra Quest</h3>${WORLDS.map(
    (e, t) => {
      const a = stageMastery(t),
        s = weakTags(t);
      return `<div class="prow"><div><b>${t + 1}. ${e.topic}</b> <span class="muted">\xb7 ${e.name}</span></div><div><b style="font-variant-numeric:tabular-nums">${a}%</b> ${S.cleared[t] ? IC.star.replace("<svg", '<svg width="16" height="16"') + S.stars[t] : ""}${S.times && S.times["a" + t] ? ' <span class="muted ptime">' + IC.clock + fmtT(S.times["a" + t]) + "</span>" : ""}</div>\n  <div class="pbar"><i style="width:${a}%;background:linear-gradient(90deg,${e.c1},${e.c2})"></i></div>${s.length ? `<div class="weak"><span style="background:none;border:0;padding-left:0">Needs practice:</span>${s.map((e) => `<span>${TAGNAMES[e]}</span>`).join("")}</div>` : ""}</div>`;
    },
  ).join("")}<h3 class="pcat" style="font-size:18px">Cell Lab (Science)</h3>${SCV.map((e, t) => {
    const a = SCS();
    return `<div class="prow"><div><b>${t + 1}. ${e.name}</b> <span class="muted">\xb7 Topic ${e.topic}</span></div><div><b style="font-variant-numeric:tabular-nums">${scMastery(t)}%</b> ${a.cleared[t] ? IC.star.replace("<svg", '<svg width="16" height="16"') + a.stars[t] : ""}${S.times && S.times["s" + t] ? ' <span class="muted ptime">' + IC.clock + fmtT(S.times["s" + t]) + "</span>" : ""}</div><div class="pbar"><i style="width:${scMastery(t)}%;background:linear-gradient(90deg,${e.c1},${e.c2})"></i></div></div>`;
  }).join("")}<h3 class="pcat" style="font-size:18px">Excel Lab (ICT)</h3>${XLV.map((e, t) => {
    const a = XS();
    return `<div class="prow"><div><b>${t + 1}. ${e.name}</b> <span class="muted">\xb7 ${e.style}</span></div><div><b style="font-variant-numeric:tabular-nums">${xlMastery(t)}%</b> ${a.cleared[t] ? IC.star.replace("<svg", '<svg width="16" height="16"') + a.stars[t] : ""}${S.times && S.times["x" + t] ? ' <span class="muted ptime">' + IC.clock + fmtT(S.times["x" + t]) + "</span>" : ""}</div><div class="pbar"><i style="width:${xlMastery(t)}%;background:linear-gradient(90deg,${e.c1},${e.c2})"></i></div></div>`;
  }).join("")}${K3IDS.map((e) => {
    const t = K3[e],
      a = K3S(e);
    return `<h3 class="pcat" style="font-size:18px">${t.name} (${t.subject})</h3>${t.lv.map((s, o) => `<div class="prow"><div><b>${o + 1}. ${s.t}</b> <span class="muted">\xb7 ${s.n}</span></div><div><b style="font-variant-numeric:tabular-nums">${10 * a.best[o]}%</b> ${a.cleared[o] ? IC.star.replace("<svg", '<svg width="16" height="16"') + a.stars[o] : ""}${S.times && S.times[e + o] ? ' <span class="muted ptime">' + IC.clock + fmtT(S.times[e + o]) + "</span>" : ""}</div><div class="pbar"><i style="width:${10 * a.best[o]}%;background:linear-gradient(90deg,${s.c1 || t.c1},${s.c2 || t.c2})"></i></div></div>`).join("")}`;
  }).join(
    "",
  )}</div>\n <aside class="side"><div class="panel"><h3>Badges</h3><div class="badges">${BADGES.map((e, t) => `<div class="badge ${S.badges.includes(e.id) ? "" : "off"}">${badgeSVG(t, S.badges.includes(e.id))}<b>${e.n}</b><span class="muted">${e.d}</span></div>`).join("")}</div></div>\n <div class="panel"><h3>Leaderboard</h3><div id="lbBox"></div></div><div class="panel"><h3>Boss Rush best scores</h3><p style="margin:0">${["I", "II", "III"].map((e, t) => `Rush ${e}: <b>${null != S.boss["r" + t] ? S.boss["r" + t] + "/10" : "not played"}</b>`).join("<br>")}<br>Grand Finale: <b>${null != S.boss.f ? S.boss.f + "/15" : "not played"}</b></p></div></aside></div>`),
    fillLeaderboard($("#lbBox")));
}
/* restored from the live build */
function settings() {
  const e = modal(
    `<h2>Account</h2><p class="muted" style="margin:0 0 6px">Sounds, light or dark background and your nickname are in the small gear in the top corner.</p>\n ${NET.user ? `<div class="toggle"><div><b>Account</b><br><span class="muted">Signed in as ${esc(NET.user.name)} (@${esc(NET.user.username)}). Progress saves to your account automatically.</span></div><button class="btn ghost" id="logoutBtn">Sign out</button></div>` : ""}\n <div class="toggle" style="border:0"><div><b>Reset progress</b><br><span class="muted">Deletes all Crystals, coins, stars, items and mastery on your account.</span></div><button class="btn ghost" id="rst">Reset</button></div><div id="rstC"></div>\n <div class="row" style="margin-top:12px"><button class="btn" id="setX">Done</button></div>`,
    "esc",
  );
  ($$(".sw", e).forEach(
    (e) =>
      (e.onclick = () => {
        const t = e.dataset.k;
        ((S.settings[t] = !S.settings[t]),
          e.setAttribute("aria-checked", S.settings[t]),
          save(),
          AU.init(),
          AU.setMute(),
          "music" === t && (S.settings.music ? AU.music(RUN ? RUN.s : AU.want) : AU.stopMusic()),
          renderTop());
      }),
  ),
    $$("[data-th]", e).forEach(
      (t) =>
        (t.onclick = () => {
          ((S.settings.theme = t.dataset.th),
            save(),
            applyTheme(),
            $$("[data-th]", e).forEach((e) => e.setAttribute("aria-pressed", e === t)));
        }),
    ));
  const t = $("#logoutBtn");
  (t && (t.onclick = () => NET.logout()),
    ($("#rst").onclick = () => {
      (($("#rstC").innerHTML =
        '<div class="inline-bad"><p style="margin:0 0 8px">Really reset everything? This cannot be undone.</p><div class="row"><button class="btn" style="background:var(--bad)" id="rstY">Yes, reset</button><button class="btn ghost" id="rstN">Keep my progress</button></div></div>'),
        ($("#rstY").onclick = () => {
          const e = S.settings.theme,
            t = S.powers,
            s = S.pic;
          ((S = defSave()),
            (S.pic = s),
            (S.settings.theme = e),
            (S.seenIntro = !0),
            (S.powers = t || {}),
            save(),
            closeModal(),
            gtoast("Progress reset. Fresh start!"),
            go("map"));
        }),
        ($("#rstN").onclick = () => ($("#rstC").innerHTML = "")));
    }),
    ($("#setX").onclick = () => {
      (closeModal(), "map" === VIEW && go("map"));
    }));
}
/* restored from the live build */
function boot() {
  (applyTheme(),
    FX.init(),
    renderTop(),
    addEventListener("pointerdown", () => AU.init(), { once: !0 }),
    addEventListener("keydown", () => AU.init(), { once: !0 }),
    document.addEventListener("keydown", (e) => {
      "Escape" === e.key && $("#ov .modal.esc") && closeModal();
    }),
    NET.boot());
}
