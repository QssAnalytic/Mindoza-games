/* ==== KS3 Missions: stage art (left visual panel) ==== */
const KA={
 fr(c1,c2,inner,lbl){const id='kf'+(KA.n=(KA.n||0)+1);return`<svg viewBox="0 0 400 260" class="k3svg" role="img" aria-label="${esc(lbl||'Game scene')}"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}" stop-opacity=".18"/><stop offset="1" stop-color="${c2}" stop-opacity=".28"/></linearGradient></defs><rect width="400" height="260" fill="#FFFDF7"/><rect width="400" height="260" fill="url(#${id})"/>${inner}</svg>`},
 t(x,y,s,sz=14,c='#1F2328',a='middle',w=800){return`<text x="${x}" y="${y}" text-anchor="${a}" font-size="${sz}" font-weight="${w}" fill="${c}" font-family="Nunito,system-ui,sans-serif">${esc(s)}</text>`},
 card(x,y,w,h,s,c='#fff',sz=14){return`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${c}" stroke="#1F2328" stroke-opacity=".15" stroke-width="2"/>${KA.t(x+w/2,y+h/2+sz/3,s,sz)}`},
 q(x,y,r=14){return`<g class="k3qm"><circle cx="${x}" cy="${y}" r="${r}" fill="#FFC531" stroke="#8A5F00" stroke-width="2"/>${KA.t(x,y+r*.42,'?',r*1.2,'#3A2A00')}</g>`}
};
const PAPER='#FFFDF5';
const INK='#1F2328';
function cComp(c,x,y,lit,glow){const id=c.id||'',lab=(c.lab||id);let g='';const hot=`data-hot="${esc(id)}" data-lab="${esc({lamp:'lamp ',sw:'switch ',A:'ammeter ',V:'voltmeter ',gap:'gap',buz:'buzzer',mot:'motor',res:'resistor'}[c.k]||'')}${c.k==='gap'||c.k==='buz'||c.k==='mot'?'':esc(id)}"`;
 const mask=`<rect x="${x-19}" y="${y-5}" width="38" height="10" fill="${PAPER}"/>`;
 switch(c.k){
  case'lamp':g=(lit&&!c.br?`<circle cx="${x}" cy="${y}" r="${12+12*glow}" fill="#FFE066" opacity="${.35+.45*glow}" class="k3glow"/>`:'')+`<circle cx="${x}" cy="${y}" r="13" fill="${lit&&!c.br?'#FFF3B0':'#fff'}" stroke="${INK}" stroke-width="2.5"/>`+(c.br?`<path d="M${x-9} ${y-9}l5 6-4 3 5 6M${x+4} ${y-12}l-3 7 5 3-3 8" stroke="#C62828" stroke-width="2.5" fill="none"/>`:`<path d="M${x-9} ${y-9}l18 18M${x+9} ${y-9}l-18 18" stroke="${INK}" stroke-width="2.5"/>`);break;
  case'sw':g=mask+`<circle cx="${x-14}" cy="${y}" r="3.5" fill="${INK}"/><circle cx="${x+14}" cy="${y}" r="3.5" fill="${INK}"/><path d="M${x-14} ${y}${c.o?`L${x+10} ${y-15}`:`L${x+14} ${y}`}" stroke="${c.o?'#C62828':INK}" stroke-width="3" stroke-linecap="round"/>`;break;
  case'A':case'V':g=`<circle cx="${x}" cy="${y}" r="13" fill="#fff" stroke="${INK}" stroke-width="2.5"/>${KA.t(x,y+5,c.k,14)}`+(c.r?`<g>${KA.card(x-26,y-44,52,22,(c.id?c.id+' ':'')+c.r,c.r==='?'?'#FFE8A3':'#E3F2FD',11)}</g>`:'');break;
  case'gap':g=mask+`<circle cx="${x-12}" cy="${y}" r="3" fill="${INK}"/><circle cx="${x+12}" cy="${y}" r="3" fill="${INK}"/><path d="M${x-12} ${y}h-8M${x+12} ${y}h8" stroke="${INK}" stroke-width="3"/><path d="M${x-6} ${y-8}l12 16M${x+6} ${y-8}l-12 16" stroke="#C62828" stroke-width="1.5" opacity=".5"/>`;break;
  case'buz':g=mask+`<path d="M${x-14} ${y}h-6M${x+14} ${y}h6" stroke="${INK}" stroke-width="3"/><path d="M${x-14} ${y}a14 14 0 0 1 28 0z" fill="#fff" stroke="${INK}" stroke-width="2.5"/>${lit?`<path d="M${x+18} ${y-18}q6 6 0 12M${x+24} ${y-22}q9 10 0 20" stroke="${INK}" stroke-width="1.5" fill="none" opacity=".6"/>`:''}`;break;
  case'mot':g=`<circle cx="${x}" cy="${y}" r="13" fill="#fff" stroke="${INK}" stroke-width="2.5"/>${KA.t(x,y+5,'M',14)}`;break;
  case'res':g=mask+`<rect x="${x-16}" y="${y-7}" width="32" height="14" fill="#fff" stroke="${INK}" stroke-width="2.5"/><path d="M${x-16} ${y}h-4M${x+16} ${y}h4" stroke="${INK}" stroke-width="3"/>`;break}
 const lbl=c.k==='gap'?'':KA.t(x,y+30,lab,12,'#455A64',undefined,700);
 let vm='';if(c.vm){vm=`<path d="M${x-18} ${y}v34h12M${x+18} ${y}v34h-12" stroke="#6A1B9A" stroke-width="2" fill="none"/><circle cx="${x}" cy="${y+34}" r="11" fill="#fff" stroke="#6A1B9A" stroke-width="2.5"/>${KA.t(x,y+39,'V',12,'#6A1B9A')}${KA.card(x+14,y+40,46,20,c.vm,c.vm==='?'?'#FFE8A3':'#F3E5F5',11)}`}
 return`<g class="k3comp" ${c.k==='A'||c.k==='V'?hot:hot}>${'<rect x="'+(x-22)+'" y="'+(y-22)+'" width="44" height="44" fill="transparent"/>'}${g}${lbl}</g>${vm}`}
/* restored from the live build */
function cCell(e, t, a) {
  const s = /\+/.test(a),
    o = (a) =>
      `<path d="M${e + a - 5} ${t - 16}v32" stroke="${INK}" stroke-width="3"/><path d="M${e + a + 5} ${t - 9}v18" stroke="${INK}" stroke-width="6"/>`;
  return `<g data-hot="cell" data-lab="the cell"><rect x="${e - 26}" y="${t - 22}" width="52" height="44" fill="transparent"/><rect x="${e - (s ? 22 : 10)}" y="${t - 5}" width="${s ? 44 : 20}" height="10" fill="${PAPER}"/>${s ? o(-10) + o(10) + `<path d="M${e - 5} ${t}h10" stroke="${INK}" stroke-width="2" stroke-dasharray="2 2"/>` : o(0)}${KA.card(e - 34, t - 46, 68, 22, a, "#E8F5E9", 12)}</g>`;
}
/* restored from the live build */
function circ(e, t) {
  const a = e.c;
  let s = "";
  if (a.s) {
    const e = a.s.some((e) => e.vm) ? 150 : 180,
      t = a.s.length,
      o = !a.s.some((e) => ("sw" === e.k && e.o) || "gap" === e.k || ("lamp" === e.k && e.br)),
      r = a.s.filter((e) => "lamp" === e.k).length,
      i = Math.max(0.25, 1 / Math.max(1, r - 0.6));
    ((s +=
      `<path d="M40 50H360V${e}H40Z" fill="none" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>` +
      (o
        ? `<path d="M40 50H360V${e}H40Z" fill="none" stroke="#FFC531" stroke-width="3" stroke-dasharray="4 14" class="k3flow"/>`
        : "")),
      (s += cCell(200, 50, a.cell)),
      a.s.forEach((a, r) => {
        s += cComp(a, 40 + (320 * (r + 1)) / (t + 1), e, o, i);
      }));
  } else {
    const e = a.br,
      t = e.length,
      o = a.top || [],
      r = !o.some((e) => "sw" === e.k && e.o),
      i = e.map((e, a) => (2 === t ? [125, 205][a] : [110, 165, 220][a])),
      l = i[t - 1];
    ((s += `<path d="M40 50H360M40 50V${l}M360 50V${l}" fill="none" stroke="${INK}" stroke-width="3"/>`),
      (s += cCell(200, 50, a.cell)),
      o.forEach((e, t) => {
        s += cComp(e, 0 === t ? 100 : 300, 50, r, 1);
      }),
      e.forEach((e, t) => {
        const a = i[t],
          o = r && !e.some((e) => ("sw" === e.k && e.o) || "gap" === e.k || ("lamp" === e.k && e.br)),
          l = e.filter((e) => "lamp" === e.k).length;
        ((s +=
          `<path d="M40 ${a}H360" stroke="${INK}" stroke-width="3"/>` +
          (o
            ? `<path d="M40 ${a}H360" stroke="#FFC531" stroke-width="3" stroke-dasharray="4 14" class="k3flow"/>`
            : "") +
          `<circle cx="40" cy="${a}" r="4" fill="${INK}"/><circle cx="360" cy="${a}" r="4" fill="${INK}"/>`),
          e.forEach((t, r) => {
            s += cComp(t, 40 + (320 * (r + 1)) / (e.length + 1), a, o, l > 1 ? 0.45 : 1);
          }));
      }));
  }
  return s;
}
function gauge(x,y,r,val,max,unit,lab){const a=-150+300*Math.min(1,Math.max(0,(val||0)/max));const rad=d=>(d-90)*Math.PI/180;const p=(d,rr)=>[x+rr*Math.cos(rad(d)),y+rr*Math.sin(rad(d))];
 let tk='';for(let i=0;i<=10;i++){const d=-150+30*i,[a1,b1]=p(d,r-4),[a2,b2]=p(d,r-(i%5?10:16));tk+=`<path d="M${a1} ${b1}L${a2} ${b2}" stroke="${INK}" stroke-width="${i%5?1.5:2.5}"/>`;if(i%5===0){const[tx,ty]=p(d,r-28);tk+=KA.t(tx,ty+4,String(+(max*i/10).toFixed(2)),10,'#455A64',undefined,700)}}
 const[nx,ny]=p(a,r-14);return`<g><circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="${INK}" stroke-width="3"/>${tk}<path d="M${x} ${y}L${nx} ${ny}" stroke="#C62828" stroke-width="3.5" stroke-linecap="round" class="k3needle"/><circle cx="${x}" cy="${y}" r="6" fill="${INK}"/>${KA.t(x,y+r*.55,unit,18,'#1F2328')}${KA.t(x,y+r+20,lab,12,'#455A64',undefined,700)}</g>`}
K3ART.sym=k=>{const W=`<path d="M4 18h18M48 18h18" stroke="${INK}" stroke-width="3"/>`;const b={
 cell:`<path d="M4 18h26M40 18h26" stroke="${INK}" stroke-width="3"/><path d="M30 6v24" stroke="${INK}" stroke-width="3"/><path d="M40 11v14" stroke="${INK}" stroke-width="7"/>`,
 battery:`<path d="M4 18h14M52 18h14" stroke="${INK}" stroke-width="3"/><path d="M18 6v24M38 6v24" stroke="${INK}" stroke-width="3"/><path d="M26 11v14M46 11v14" stroke="${INK}" stroke-width="6"/><path d="M28 18h8" stroke="${INK}" stroke-width="2" stroke-dasharray="2 2"/>`,
 lamp:W+`<circle cx="35" cy="18" r="13" fill="#fff" stroke="${INK}" stroke-width="2.5"/><path d="M26 9l18 18M44 9l-18 18" stroke="${INK}" stroke-width="2.5"/>`,
 swo:`<path d="M4 18h18M48 18h18" stroke="${INK}" stroke-width="3"/><circle cx="22" cy="18" r="3" fill="${INK}"/><circle cx="48" cy="18" r="3" fill="${INK}"/><path d="M22 18L45 5" stroke="${INK}" stroke-width="3"/>`,
 swc:`<path d="M4 18h62" stroke="${INK}" stroke-width="3"/><circle cx="22" cy="18" r="3" fill="${INK}"/><circle cx="48" cy="18" r="3" fill="${INK}"/>`,
 A:W+`<circle cx="35" cy="18" r="13" fill="#fff" stroke="${INK}" stroke-width="2.5"/><text x="35" y="23" text-anchor="middle" font-size="14" font-weight="800">A</text>`,
 V:W+`<circle cx="35" cy="18" r="13" fill="#fff" stroke="${INK}" stroke-width="2.5"/><text x="35" y="23" text-anchor="middle" font-size="14" font-weight="800">V</text>`,
 motor:W+`<circle cx="35" cy="18" r="13" fill="#fff" stroke="${INK}" stroke-width="2.5"/><text x="35" y="23" text-anchor="middle" font-size="14" font-weight="800">M</text>`,
 buzzer:`<path d="M4 24h17M49 24h17" stroke="${INK}" stroke-width="3"/><path d="M21 24a14 14 0 0 1 28 0z" fill="#fff" stroke="${INK}" stroke-width="2.5"/>`,
 res:`<path d="M4 18h15M51 18h15" stroke="${INK}" stroke-width="3"/><rect x="19" y="11" width="32" height="14" fill="#fff" stroke="${INK}" stroke-width="2.5"/>`}[k]||'';
 return`<svg viewBox="0 0 70 36" width="84" height="44" aria-label="${esc(SYMN[k]||k)} symbol" role="img">${b}</svg>`};
/* ---- little object drawings ---- */
const OBJ={
 balloon:(x,y)=>`<ellipse cx="${x}" cy="${y}" rx="34" ry="42" fill="#EF5350"/><ellipse cx="${x-12}" cy="${y-16}" rx="8" ry="12" fill="#fff" opacity=".4"/><path d="M${x} ${y+42}l-5 8h10z" fill="#C62828"/><path d="M${x} ${y+50}q-10 20 4 40" stroke="#555" fill="none" stroke-width="1.5"/>`,
 hair:(x,y)=>`<circle cx="${x}" cy="${y+10}" r="36" fill="#FFCC9E"/><path d="M${x-40} ${y}c0-40 80-40 80 0" fill="#6D4C41"/>${[-30,-18,-6,6,18,30].map(d=>`<path d="M${x+d} ${y-24}q${d/3} -18 ${d/2} -30" stroke="#6D4C41" stroke-width="3" fill="none"/>`).join('')}<circle cx="${x-12}" cy="${y+12}" r="3.5" fill="#333"/><circle cx="${x+12}" cy="${y+12}" r="3.5" fill="#333"/><path d="M${x-10} ${y+26}q10 8 20 0" stroke="#333" stroke-width="2.5" fill="none"/>`,
 rod:(x,y)=>`<rect x="${x-60}" y="${y-10}" width="120" height="20" rx="10" fill="#B39DDB" stroke="#5E35B1" stroke-width="2.5" transform="rotate(-20 ${x} ${y})"/>`,
 cloth:(x,y)=>`<path d="M${x-40} ${y-30}q20 -8 40 0t40 0v56q-20 8 -40 0t-40 0z" fill="#80CBC4" stroke="#00796B" stroke-width="2.5"/>`,
 jumper:(x,y)=>`<path d="M${x-30} ${y-34}h60l26 18-12 18-14-8v46h-60v-46l-14 8-12-18z" fill="#42A5F5" stroke="#1565C0" stroke-width="2.5"/>`,
 atom:(x,y)=>`<circle cx="${x}" cy="${y}" r="12" fill="#EF5350"/><ellipse cx="${x}" cy="${y}" rx="42" ry="16" fill="none" stroke="#546E7A" stroke-width="2"/><ellipse cx="${x}" cy="${y}" rx="42" ry="16" fill="none" stroke="#546E7A" stroke-width="2" transform="rotate(60 ${x} ${y})"/><ellipse cx="${x}" cy="${y}" rx="42" ry="16" fill="none" stroke="#546E7A" stroke-width="2" transform="rotate(-60 ${x} ${y})"/><circle cx="${x+42}" cy="${y}" r="5" fill="#1E88E5"/><circle cx="${x-21}" cy="${y-36}" r="5" fill="#1E88E5"/>`,
 paper:(x,y)=>[[-20,-10],[5,0],[20,-15],[-5,15],[15,18]].map(([a,b])=>`<rect x="${x+a}" y="${y+b}" width="12" height="9" fill="#fff" stroke="#90A4AE" transform="rotate(${a} ${x+a} ${y+b})"/>`).join('')
};
function station(k){const G='#2E7D32';const S={
 gas:`<rect x="120" y="120" width="160" height="80" fill="#90A4AE" stroke="#455A64" stroke-width="3"/><rect x="230" y="60" width="26" height="60" fill="#B0BEC5" stroke="#455A64" stroke-width="3"/><path d="M243 58c-14-14 6-20 0-36c14 10 18 24 0 36z" fill="#FF7043"/><circle cx="160" cy="160" r="18" fill="#fff" stroke="#455A64" stroke-width="3"/><path d="M160 145v30M145 160h30" stroke="#455A64" stroke-width="3"/>`,
 wind:`<path d="M196 90h8l6 120h-20z" fill="#ECEFF1" stroke="#78909C" stroke-width="2"/><g class="k3spin" style="transform-origin:200px 90px"><path d="M200 90l-6-70h12z" fill="#fff" stroke="#78909C" stroke-width="2"/><path d="M200 90l-6-70h12z" fill="#fff" stroke="#78909C" stroke-width="2" transform="rotate(120 200 90)"/><path d="M200 90l-6-70h12z" fill="#fff" stroke="#78909C" stroke-width="2" transform="rotate(240 200 90)"/></g><circle cx="200" cy="90" r="7" fill="#546E7A"/>`,
 gen:`<rect x="110" y="80" width="180" height="100" rx="14" fill="#ECEFF1" stroke="#455A64" stroke-width="3"/>${[0,1,2,3,4,5].map(i=>`<ellipse cx="${150+i*20}" cy="130" rx="8" ry="36" fill="none" stroke="#E65100" stroke-width="4"/>`).join('')}<g class="k3spin" style="transform-origin:200px 130px"><rect x="170" y="120" width="30" height="20" fill="#E53935"/><rect x="200" y="120" width="30" height="20" fill="#1E88E5"/></g>${KA.t(185,134,'N',12,'#fff')}${KA.t(215,134,'S',12,'#fff')}`,
 hydro:`<path d="M60 60h120v150H60z" fill="#4FC3F7" opacity=".7"/><path d="M180 50h30l20 160h-50z" fill="#B0BEC5" stroke="#546E7A" stroke-width="3"/><path d="M200 180h120" stroke="#1E88E5" stroke-width="10"/><circle cx="300" cy="180" r="20" fill="#fff" stroke="#455A64" stroke-width="3"/>`,
 nuclear:`<path d="M140 210c10-50 10-90-6-140h132c-16 50-16 90-6 140z" fill="#CFD8DC" stroke="#546E7A" stroke-width="3"/><ellipse cx="200" cy="58" rx="60" ry="14" fill="#fff" opacity=".9"/><circle cx="200" cy="150" r="22" fill="#FFEB3B" stroke="#F57F17" stroke-width="3"/><path d="M200 150l-11-19a22 22 0 0 1 22 0zM200 150l22 0a22 22 0 0 1-11 19zM200 150l-11 19a22 22 0 0 1-11-19z" fill="#212121"/>`,
 solar:`<circle cx="320" cy="56" r="26" fill="#FFCA28"/>${[0,45,90,135,180,225,270,315].map(d=>`<path d="M320 56l${40*Math.cos(d*Math.PI/180)} ${40*Math.sin(d*Math.PI/180)}" stroke="#FFCA28" stroke-width="3" transform="translate(${8*Math.cos(d*Math.PI/180)} ${8*Math.sin(d*Math.PI/180)})"/>`).join('')}<path d="M90 200l40-90h150l-40 90z" fill="#1A237E" stroke="#90A4AE" stroke-width="3"/><path d="M113 150h145M100 175h145M160 110l-40 90M210 110l-40 90" stroke="#5C6BC0" stroke-width="2"/>`,
 grid:`${[90,200,310].map(x=>`<path d="M${x-20} 210l20-140 20 140M${x-30} 100h60M${x-24} 130h48" stroke="#546E7A" stroke-width="3" fill="none"/>`).join('')}<path d="M60 100q85 30 140 0t140 0" stroke="#37474F" stroke-width="2" fill="none"/><path d="M340 170l25-20 25 20v40h-50z" fill="#FFAB91" stroke="#BF360C" stroke-width="2"/>`};return S[k]||S.gas}
/* ---- particles ---- */
function parts(kind,x,y,w,h){const R2=7;let s='';const at=(px,py,c,r=R2)=>`<circle cx="${px}" cy="${py}" r="${r}" fill="${c}" stroke="#1F2328" stroke-opacity=".35" stroke-width="1.5"/>`;
 const rnd=(i,j)=>{const v=Math.sin(i*12.9898+j*78.233)*43758.5453;return v-Math.floor(v)};
 if(kind==='solid'){for(let r=0;r<4;r++)for(let c=0;c<5;c++)s+=`<g class="k3vib">${at(x+16+c*((w-32)/4),y+h-16-r*15,'#7E57C2')}</g>`}
 else if(kind==='liquid'){for(let i=0;i<16;i++)s+=at(x+12+rnd(i,1)*(w-24),y+h*.45+rnd(i,2)*(h*.5),'#29B6F6')}
 else if(kind==='gas'){for(let i=0;i<7;i++)s+=`<g class="k3drift" style="animation-delay:-${i*.6}s">${at(x+14+rnd(i,3)*(w-28),y+14+rnd(i,4)*(h-28),'#EF5350')}</g>`}
 else{const pos=[...Array(9).keys()].map(i=>[x+18+(i%3)*((w-36)/2)+(rnd(i,5)-.5)*14,y+20+Math.floor(i/3)*((h-40)/2)+(rnd(i,6)-.5)*14]);
  const A='#EF5350',B='#42A5F5',C='#263238';
  pos.forEach(([px,py],i)=>{if(kind==='atoms')s+=at(px,py,A,8);else if(kind==='di')s+=at(px-6,py,B,7)+at(px+6,py,B,7);else if(kind==='cmp')s+=at(px-6,py,A,7)+at(px+6,py,'#FFF',7);
   else if(kind==='cmp3')s+=at(px,py,C,7)+at(px-12,py,A,6)+at(px+12,py,A,6);else if(kind==='mixE')s+=at(px,py,i%2?A:B,8);else if(kind==='mixC')s+=i%2?at(px-6,py,A,7)+at(px+6,py,'#FFF',7):at(px,py,B,8);
   else if(kind==='air')s+=i===4?at(px,py,C,6)+at(px-11,py,A,5)+at(px+11,py,A,5):i%2?at(px-6,py,B,7)+at(px+6,py,B,7):at(px-6,py,'#AED581',7)+at(px+6,py,'#AED581',7)})}
 return s}
function molecule(f,cx,cy){const C={C:'#263238',H:'#FAFAFA',O:'#EF5350',N:'#42A5F5',S:'#FDD835'};const at=(x,y,e,r)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${C[e]}" stroke="#1F2328" stroke-width="2"/>${KA.t(x,y+5,e,13,e==='C'?'#fff':'#1F2328')}`;
 const mk=(c,lig,ang,x,y)=>{let s='';const r1=22,r2=15,d=36;lig.forEach((e,i)=>{const a=ang[i]*Math.PI/180;s+=`<path d="M${x} ${y}L${x+d*Math.cos(a)} ${y+d*Math.sin(a)}" stroke="#1F2328" stroke-width="4"/>`});lig.forEach((e,i)=>{const a=ang[i]*Math.PI/180;s+=at(x+d*Math.cos(a),y+d*Math.sin(a),e,r2)});return s+at(x,y,c,r1)};
 const M={O2:x=>mk('O',['O'],[0],x-18,cy),CO2:x=>mk('C',['O','O'],[0,180],x,cy),CH4:x=>mk('C',['H','H','H','H'],[45,135,225,315],x,cy),NH3:x=>mk('N',['H','H','H'],[90,210,330],x,cy),H2O:x=>mk('O',['H','H'],[145,35],x,cy-10)};
 if(f==='2H2O')return M.H2O(cx-70)+M.H2O(cx+70);if(f==='3CO2')return M.CO2(cx-110)+M.CO2(cx)+M.CO2(cx+110);if(M[f])return M[f](cx);return''}
/* ---- cells ---- */
const CELLX={
 egg:`<circle cx="75" cy="47" r="40" fill="#FFF3E0" stroke="#F57C00" stroke-width="3"/><circle cx="75" cy="47" r="44" fill="none" stroke="#FFCC80" stroke-width="3" stroke-dasharray="3 4"/><circle cx="80" cy="44" r="10" fill="${'#6A4C93'}"/>${[[55,30],[60,62],[96,62],[92,28]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3" fill="#FFB74D"/>`).join('')}`,
 muscle:`<path d="M10 30c40-12 90-12 130 0v34c-40 12-90 12-130 0z" fill="#F8BBD0" stroke="#C2185B" stroke-width="3"/>${[30,55,80,105,125].map(x=>`<path d="M${x} 28v38" stroke="#E91E63" stroke-width="1.5" opacity=".6"/>`).join('')}<ellipse cx="50" cy="47" rx="7" ry="4" fill="#6A4C93"/><ellipse cx="100" cy="47" rx="7" ry="4" fill="#6A4C93"/>`,
 wbc:`<path d="M40 47c0-30 20-36 38-34s34 10 32 34-14 36-38 34-32-10-32-34z" fill="#E3F2FD" stroke="#1E88E5" stroke-width="3"/><path d="M60 40q8-12 18-2q10-10 18 4q-6 14-18 8q-12 8-18-10z" fill="#6A4C93"/>`,
 xylem:`<rect x="20" y="10" width="110" height="74" fill="none"/><path d="M30 10v74M60 10v74M90 10v74M120 10v74" stroke="#8D6E63" stroke-width="6"/>${[20,40,60,80].map(y=>`<path d="M30 ${y}h90" stroke="#A1887F" stroke-width="2" stroke-dasharray="6 6"/>`).join('')}`,
 phloem:`<rect x="45" y="6" width="60" height="82" rx="6" fill="#E8F5E9" stroke="#43A047" stroke-width="3"/><path d="M45 32h60M45 60h60" stroke="#43A047" stroke-width="3" stroke-dasharray="4 3"/><rect x="108" y="10" width="16" height="74" rx="6" fill="#C8E6C9" stroke="#43A047" stroke-width="2"/>`,
 guard:`<path d="M75 10c-30 0-40 74 0 74c-14-14-14-60 0-74z" fill="#81C784" stroke="#2E7D32" stroke-width="3"/><path d="M75 10c30 0 40 74 0 74c14-14 14-60 0-74z" fill="#81C784" stroke="#2E7D32" stroke-width="3"/>${[30,47,64].map(y=>`<ellipse cx="62" cy="${y}" rx="4" ry="3" fill="#2E7D32"/><ellipse cx="88" cy="${y}" rx="4" ry="3" fill="#2E7D32"/>`).join('')}`};
function cellPic(k,x,y,w){const s=CELLX[k]?`<svg viewBox="0 0 150 94" width="${w}" height="${w*.63}" x="${x}" y="${y}">${CELLX[k]}</svg>`:(typeof cellArt==='function'?cellArt(k,w).replace('<svg',`<svg x="${x}" y="${y}"`):'');return s}
const CELLN={rbc:'red blood cell',neurone:'nerve cell',sperm:'sperm cell',egg:'egg cell',ciliated:'ciliated cell',muscle:'muscle cell',wbc:'white blood cell',roothair:'root hair cell',palisade:'palisade cell',xylem:'xylem',phloem:'phloem',guard:'guard cells'};
/* ---- skeleton ---- */
function skeleton(){const B='#F5F1E6',S='#8D7B68';const bone=(id,lab,d)=>`<g data-hot="${id}" data-lab="${lab}">${d}</g>`;const st=`fill="${B}" stroke="${S}" stroke-width="2.5"`;
 return bone('skull','the skull',`<ellipse cx="200" cy="34" rx="22" ry="25" ${st}/><circle cx="192" cy="34" r="5" fill="#5D4037"/><circle cx="208" cy="34" r="5" fill="#5D4037"/><path d="M190 52h20v8h-20z" ${st}/>`)
 +bone('spine','the spine',`<path d="M200 62V158" stroke="${S}" stroke-width="12" stroke-linecap="round"/><path d="M200 62V158" stroke="${B}" stroke-width="7" stroke-dasharray="6 3"/>`)
 +bone('ribs','the ribs',[0,1,2,3,4].map(i=>`<path d="M196 ${80+i*11}q-40 ${2+i} -34 ${22-i*2}M204 ${80+i*11}q40 ${2+i} 34 ${22-i*2}" stroke="${S}" stroke-width="5" fill="none"/><path d="M196 ${80+i*11}q-40 ${2+i} -34 ${22-i*2}M204 ${80+i*11}q40 ${2+i} 34 ${22-i*2}" stroke="${B}" stroke-width="2" fill="none"/>`).join(''))
 +bone('sternum','the sternum',`<rect x="194" y="76" width="12" height="44" rx="5" ${st}/>`)
 +`<path d="M168 70h64" stroke="${S}" stroke-width="7" stroke-linecap="round"/>`
 +bone('humerus','the humerus',`<path d="M164 72l-18 62M236 72l18 62" stroke="${S}" stroke-width="10" stroke-linecap="round"/><path d="M164 72l-18 62M236 72l18 62" stroke="${B}" stroke-width="5" stroke-linecap="round"/>`)
 +`<path d="M146 136l-10 56M254 136l10 56" stroke="${S}" stroke-width="8" stroke-linecap="round"/><path d="M146 136l-10 56M254 136l10 56" stroke="${B}" stroke-width="4" stroke-linecap="round"/>`
 +bone('pelvis','the pelvis',`<path d="M172 160c0-10 56-10 56 0l-6 22h-44z" ${st}/><circle cx="200" cy="172" r="7" fill="#FFFDF7" stroke="${S}" stroke-width="2"/>`)
 +bone('femur','the femur',`<path d="M184 184l-8 64M216 184l8 64" stroke="${S}" stroke-width="12" stroke-linecap="round"/><path d="M184 184l-8 64M216 184l8 64" stroke="${B}" stroke-width="6" stroke-linecap="round"/>`)
 +bone('patella','the kneecap',`<circle cx="174" cy="252" r="7" ${st}/><circle cx="226" cy="252" r="7" ${st}/>`)}
/* restored from the live build */
function arm(e) {
  if ("leg" === e)
    return `<path d="M150 50l20 90" stroke="#8D7B68" stroke-width="18" stroke-linecap="round"/><path d="M170 140l-10 90" stroke="#8D7B68" stroke-width="16" stroke-linecap="round"/><path d="M150 50l20 90" stroke="#F5F1E6" stroke-width="12" stroke-linecap="round"/><path d="M170 140l-10 90" stroke="#F5F1E6" stroke-width="10" stroke-linecap="round"/><path d="M146 54c34 10 42 60 28 84" fill="#EF9A9A" stroke="#C62828" stroke-width="2.5"/><path d="M158 52c-22 20-16 66 6 86" fill="#F48FB1" stroke="#AD1457" stroke-width="2.5"/><circle cx="170" cy="140" r="9" fill="#BCAAA4"/>${KA.t(220, 92, "Quadriceps (front)", 13, "#C62828", "start")}${KA.t(60, 92, "Hamstrings (back)", 13, "#AD1457", "start")}<path d="M200 230h-50" stroke="#795548" stroke-width="10" stroke-linecap="round"/>`;
  const t = "straight" !== e,
    a = t ? [200, 150, 250, 60] : [200, 150, 330, 150];
  return `<path d="M120 60l80 90" stroke="#8D7B68" stroke-width="18" stroke-linecap="round"/><path d="M${a[0]} ${a[1]}L${a[2]} ${a[3]}" stroke="#8D7B68" stroke-width="16" stroke-linecap="round"/><path d="M120 60l80 90" stroke="#F5F1E6" stroke-width="12" stroke-linecap="round"/><path d="M${a[0]} ${a[1]}L${a[2]} ${a[3]}" stroke="#F5F1E6" stroke-width="10" stroke-linecap="round"/>\n <path d="M126 58c40 10 70 40 ${t ? "78 84" : "76 86"}" fill="#EF9A9A" stroke="#C62828" stroke-width="2.5" transform="translate(-6 -10)" opacity="${t ? 1 : 0.85}"/><path d="M${t ? 118 : 120} 70c10 40 40 70 80 84" fill="none" stroke="#F48FB1" stroke-width="${t ? 10 : 16}" stroke-linecap="round"/>\n <circle cx="200" cy="150" r="10" fill="#BCAAA4" stroke="#6D4C41" stroke-width="2"/>${KA.t(t ? 110 : 150, t ? 40 : 44, "Biceps", 14, "#C62828")}${KA.t(120, t ? 130 : 120, "Triceps", 14, "#AD1457")}${KA.t(214, 176, "elbow", 12, "#6D4C41", void 0, 700)}`;
}
const HAIRC={rubio:'#F2C94C',castaño:'#8D5A2B',negro:'#222',pelirrojo:'#D9541E'};
const EYEC={azules:'#1E88E5',verdes:'#2E9D4A',marrones:'#6D4C41'};
function person(p,x,lab){const tall=p.h,top=tall?40:78,hc=HAIRC[p.hc],ec=EYEC[p.ey],hy=top+26;
 const hair=p.hl==='largo'?`<path d="M${x-30} ${hy+44}c-8-50 4-70 30-70s38 20 30 70l-10-4c4-30 0-46-20-46s-24 16-20 46z" fill="${hc}"/>`:p.hl==='rizado'?[...Array(9)].map((_,i)=>`<circle cx="${x-26+i*6.5}" cy="${hy-18+(i%2)*4}" r="9" fill="${hc}"/>`).join('')+`<circle cx="${x-28}" cy="${hy}" r="8" fill="${hc}"/><circle cx="${x+28}" cy="${hy}" r="8" fill="${hc}"/>`:`<path d="M${x-26} ${hy-2}c0-30 52-30 52 0c-10-10-42-10-52 0z" fill="${hc}"/>`;
 return`<g data-hot="${lab}" data-lab="person ${lab}"><rect x="${x-44}" y="20" width="88" height="226" rx="14" fill="transparent"/>
 <path d="M${x-30} 250v-${250-top-62}q0-14 14-14h32q14 0 14 14v${250-top-62}" fill="${p.f?'#F06292':'#4FC3F7'}" opacity=".9"/>
 <circle cx="${x}" cy="${hy}" r="25" fill="#FFD3A8"/>${hair}
 <circle cx="${x-9}" cy="${hy+1}" r="4.5" fill="#fff"/><circle cx="${x+9}" cy="${hy+1}" r="4.5" fill="#fff"/><circle cx="${x-9}" cy="${hy+1}" r="3" fill="${ec}"/><circle cx="${x+9}" cy="${hy+1}" r="3" fill="${ec}"/>
 ${p.gl?`<circle cx="${x-9}" cy="${hy+1}" r="8" fill="none" stroke="#222" stroke-width="2"/><circle cx="${x+9}" cy="${hy+1}" r="8" fill="none" stroke="#222" stroke-width="2"/><path d="M${x-1} ${hy+1}h2" stroke="#222" stroke-width="2"/>`:''}
 ${p.bd?`<path d="M${x-20} ${hy+8}q20 34 40 0q-4 12-20 12t-20-12z" fill="${hc}"/>`:`<path d="M${x-7} ${hy+12}q7 6 14 0" stroke="#8A4B2A" stroke-width="2.5" fill="none"/>`}
 <rect x="${x-14}" y="252" width="28" height="0"/>${KA.t(x,258,lab,15,'#1F2328')}</g>`}
/* ---- bedroom ---- */
function room(v){let s=`<rect x="0" y="0" width="400" height="190" fill="#FFF8E1"/><rect x="0" y="190" width="400" height="70" fill="#D7B98E"/>`;
 if(v.ventana)s+=`<rect x="160" y="22" width="80" height="62" rx="4" fill="#B3E5FC" stroke="#8D6E63" stroke-width="5"/><path d="M200 22v62M160 53h80" stroke="#8D6E63" stroke-width="4"/>`;
 if(v.armario)s+=`<rect x="14" y="40" width="70" height="160" rx="4" fill="#A1887F" stroke="#5D4037" stroke-width="3"/><path d="M49 40v160" stroke="#5D4037" stroke-width="3"/><circle cx="44" cy="120" r="3" fill="#3E2723"/><circle cx="54" cy="120" r="3" fill="#3E2723"/>`;
 if(v.alfombra)s+=`<ellipse cx="200" cy="232" rx="90" ry="18" fill="${v.alfombra}"/>`;
 if(v.cama)s+=`<rect x="250" y="150" width="140" height="44" rx="8" fill="#5C6BC0"/><rect x="250" y="138" width="40" height="22" rx="8" fill="#fff"/><rect x="380" y="120" width="10" height="90" fill="#3949AB"/><rect x="250" y="190" width="8" height="20" fill="#3949AB"/>`;
 if(v.gato){const top=v.gato==='top';s+=`<g transform="translate(${top?320:300} ${top?126:206})"><ellipse cx="0" cy="10" rx="18" ry="11" fill="#FF9800"/><circle cx="16" cy="0" r="9" fill="#FF9800"/><path d="M10-6l2-9 5 7M18-7l4-8 2 9" fill="#FF9800"/><path d="M-18 8q-10-14 2-20" stroke="#FF9800" stroke-width="4" fill="none"/><circle cx="19" cy="-1" r="1.6" fill="#222"/></g>`}
 if(v.mesa)s+=`<rect x="96" y="140" width="110" height="10" fill="#8D6E63"/><rect x="100" y="150" width="8" height="52" fill="#6D4C41"/><rect x="194" y="150" width="8" height="52" fill="#6D4C41"/>`;
 if(v.lampara&&v.mesa)s+=`<path d="M176 140v-30" stroke="#455A64" stroke-width="3"/><path d="M162 112l14-24 14 24z" fill="#FFCA28" stroke="#F57F17" stroke-width="2"/>`;
 if(v.silla){const n=v.silla,c=v.sc||'#E57373';for(let i=0;i<n;i++){const x=110+i*56;s+=`<g transform="translate(${n>1?x-30:x} 0)"><rect x="0" y="160" width="34" height="8" fill="${c}"/><rect x="0" y="122" width="7" height="46" fill="${c}"/><rect x="0" y="168" width="5" height="34" fill="${c}"/><rect x="29" y="168" width="5" height="34" fill="${c}"/></g>`}}
 return s}
/* ---- clock ---- */
function clockFace(v){const m=v%60,h=(v/60)%12;const ha=(h*30-90)*Math.PI/180,ma=(m*6-90)*Math.PI/180;let t='';for(let i=1;i<=12;i++){const a=(i*30-90)*Math.PI/180;t+=KA.t(200+82*Math.cos(a),134+82*Math.sin(a)+6,String(i),18,'#3E2723')}
 for(let i=0;i<60;i++){const a=(i*6-90)*Math.PI/180;t+=`<path d="M${200+96*Math.cos(a)} ${130+96*Math.sin(a)}L${200+(i%5?91:86)*Math.cos(a)} ${130+(i%5?91:86)*Math.sin(a)}" stroke="#5D4037" stroke-width="${i%5?1.5:3}"/>`}
 return`<path d="M80 260V40l120-36 120 36v220z" fill="#BCAAA4" stroke="#6D4C41" stroke-width="4"/><circle cx="200" cy="130" r="104" fill="#FFF8E1" stroke="#5D4037" stroke-width="6"/>${t}<path d="M200 130L${200+52*Math.cos(ha)} ${130+52*Math.sin(ha)}" stroke="#3E2723" stroke-width="8" stroke-linecap="round" class="k3hand"/><path d="M200 130L${200+80*Math.cos(ma)} ${130+80*Math.sin(ma)}" stroke="#C62828" stroke-width="5" stroke-linecap="round" class="k3hand"/><circle cx="200" cy="130" r="8" fill="#3E2723"/>`}
/* ---- leaf ---- */
function leafX(hi){hi=hi||[];const on=k=>hi.includes(k);const L=(k,x,y)=>`<g class="${on(k)?'k3pulse':''}"><circle cx="${x}" cy="${y}" r="13" fill="${on(k)?'#FFC531':'#fff'}" stroke="#1F2328" stroke-width="2"/>${KA.t(x,y+5,k,14)}</g>`;
 let pal='';for(let i=0;i<11;i++)pal+=`<rect x="${40+i*29}" y="56" width="24" height="58" rx="8" fill="#A5D6A7" stroke="#2E7D32" stroke-width="2"/>${[66,80,94,106].map(y=>`<circle cx="${46+i*29+(y%3)*4}" cy="${y}" r="3.5" fill="#2E7D32"/>`).join('')}`;
 let sp='';for(let i=0;i<9;i++)sp+=`<ellipse cx="${56+i*36}" cy="${140+(i%2)*12}" rx="15" ry="11" fill="#C5E1A5" stroke="#558B2F" stroke-width="2"/>`;
 let up='',lo='';for(let i=0;i<14;i++){up+=`<rect x="${36+i*24}" y="34" width="22" height="18" rx="3" fill="#F1F8E9" stroke="#7CB342" stroke-width="1.5"/>`;if(i!==6&&i!==7)lo+=`<rect x="${36+i*24}" y="176" width="22" height="18" rx="3" fill="#F1F8E9" stroke="#7CB342" stroke-width="1.5"/>`}
 return`<path d="M30 28h344" stroke="#FFD54F" stroke-width="8" opacity=".9"/>${up}${pal}${sp}<circle cx="300" cy="148" r="18" fill="#FFE0B2" stroke="#8D6E63" stroke-width="2"/><circle cx="296" cy="144" r="6" fill="#8D6E63"/><circle cx="306" cy="154" r="5" fill="#66BB6A"/>${lo}
 <path d="M180 176c4-8 14-8 16 0v18c-4 8-14 8-16 0zM212 176c-4-8-14-8-16 0v18c4 8 14 8 16 0z" fill="#81C784" stroke="#2E7D32" stroke-width="2"/>
 ${L('A',18,28)}${L('B',18,44)}${L('C',18,86)}${L('D',18,146)}${L('E',382,186)}${L('F',196,222)}${L('V',338,148)}<path d="M196 209v-12" stroke="#1F2328" stroke-width="2"/><path d="M325 148h-7" stroke="#1F2328" stroke-width="2"/>`}
/* ================= the 40 stages ================= */
K3ART.phy=[
 q=>KA.fr('#1C5FD4','#59A5FF',`<path id="eloop" d="M60 60H340V200H60Z" fill="none" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>${cCell(200,60,'1.5 V')}<g transform="translate(200 200)"><circle r="34" fill="#FFE066" opacity=".55" class="k3glow"/><circle r="18" fill="#FFF3B0" stroke="${INK}" stroke-width="3"/><path d="M-12-12l24 24M12-12l-24 24" stroke="${INK}" stroke-width="3"/></g>
  ${[0,1,2,3,4,5,6,7].map(i=>`<circle r="7" fill="#1E88E5"><animateMotion dur="6s" repeatCount="indefinite" begin="-${i*.75}s"><mpath href="#eloop"/></animateMotion></circle>`).join('')}${KA.t(200,130,'Electron Express',22,'#1C5FD4')}${KA.t(200,156,'e⁻  e⁻  e⁻',16,'#1E88E5')}`,'Electrons flowing round a circuit'),
 q=>KA.fr('#2F7D32','#A0D468',`<rect x="0" y="210" width="400" height="50" fill="#AED581" opacity=".6"/>${station(q.v)}${KA.t(200,246,{gas:'Gas power station',wind:'Wind turbine',gen:'Inside a generator',hydro:'Hydroelectric dam',nuclear:'Nuclear power station',solar:'Solar panel',grid:'The National Grid'}[q.v]||'',16,'#1B5E20')}`,'Power station'),
 q=>{const v=q.v||['balloon','hair'];const xs=v.length===2?[120,280]:[90,200,310];return KA.fr('#C2185B','#FF8A65',v.map((o,i)=>`<g>${(OBJ[o]||OBJ.atom)(xs[i],110)}${KA.q(xs[i]+44,52,15)}${KA.t(xs[i],240,{balloon:'balloon',hair:'hair',rod:'rod',cloth:'cloth',jumper:'jumper',atom:'atom',paper:'paper bits'}[o]||o,14,'#880E4F')}</g>`).join('')+`<path d="M180 120q20-16 40 0" stroke="#880E4F" stroke-width="3" fill="none" stroke-dasharray="5 5"/>`,'Static charge')},
 q=>KA.fr('#4527A0','#FFD54F',`<rect x="0" y="0" width="400" height="260" fill="#311B92" opacity=".25"/><path d="M60 60c0-30 50-40 70-20c20-30 80-20 80 10c30 0 40 40 10 46H70c-30 0-34-36-10-36z" fill="#90A4AE"/><path d="M150 96l-20 50h24l-26 64 54-80h-26l20-34z" fill="#FFEB3B" stroke="#F57F17" stroke-width="2" class="k3flash1"/>
  <rect x="260" y="120" width="90" height="100" fill="#FFAB91" stroke="#BF360C" stroke-width="3"/><path d="M250 124l55-50 55 50z" fill="#D84315"/><path d="M305 74v-36" stroke="#78909C" stroke-width="4"/><path d="M352 130v90h20" stroke="#78909C" stroke-width="4" fill="none"/>${KA.t(330,244,'lightning conductor',11,'#311B92',undefined,700)}<rect x="0" y="220" width="400" height="40" fill="#6D4C41" opacity=".5"/>
  ${q.v==='plane'?`<path d="M30 200h120l20-10h-40l-30-30h-14l14 30H50l-10-12H30z" fill="#ECEFF1" stroke="#455A64" stroke-width="2"/><path d="M110 200v20" stroke="#2E7D32" stroke-width="3"/>`:q.v==='door'?`<rect x="30" y="150" width="80" height="60" rx="10" fill="#EF5350" stroke="#B71C1C" stroke-width="3"/><path d="M112 170l10-6-4 10 10-4" stroke="#FFEB3B" stroke-width="3" fill="none"/>`:''}`,'Lightning and sparks'),
 q=>KA.fr('#00838F','#80DEEA',`<path d="M70 70H330V200H230M170 200H70Z" fill="none" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>${cCell(200,70,'3 V')}<g transform="translate(70 135)"><circle r="16" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M-11-11l22 22M11-11l-22 22" stroke="${INK}" stroke-width="3"/></g>
  <path d="M170 200l14 10M230 200l-14 10" stroke="#C62828" stroke-width="6" stroke-linecap="round"/><rect x="176" y="190" width="48" height="28" rx="6" fill="#FFF8E1" stroke="#FFB300" stroke-width="3" stroke-dasharray="5 4"/>${KA.t(200,210,'?',20,'#E65100')}${KA.t(200,244,'Test gap: conductor or insulator?',14,'#006064')}`,'Test circuit with a gap'),
 q=>KA.fr('#D84315','#FFB74D',`<rect x="14" y="14" width="372" height="232" rx="16" fill="${PAPER}" stroke="#FFCCBC" stroke-width="2"/>${circ(q.v)}`,'Circuit diagram'),
 q=>KA.fr('#37474F','#4FC3F7',`<rect width="400" height="260" fill="#0D47A1" opacity=".85"/>${[...Array(20)].map((_,i)=>`<path d="M${i*20} 0V260M0 ${i*20}H400" stroke="#fff" stroke-opacity=".08"/>`).join('')}${['cell','lamp','swo','A','V','motor','buzzer','res','battery'].map((k,i)=>`<g transform="translate(${30+(i%3)*125} ${30+Math.floor(i/3)*75}) scale(1.3)" opacity=".9" style="filter:invert(1)">${K3ART.sym(k).replace(/width="84" height="44"/,'width="70" height="36"')}</g>`).join('')}${KA.t(200,250,'Symbol Snap blueprint',14,'#fff')}`,'Circuit symbols blueprint'),
 q=>KA.fr('#00695C','#26C6DA',`<rect x="14" y="14" width="372" height="232" rx="16" fill="${PAPER}"/>${circ(q.v)}${KA.t(200,246,'Single-loop subway',13,'#00695C')}`,'Series circuit'),
 q=>KA.fr('#6A1B9A','#CE93D8',`<rect x="14" y="14" width="372" height="236" rx="16" fill="${PAPER}"/>${circ(q.v)}`,'Parallel circuit'),
 (q,val)=>KA.fr('#BF360C','#FFCA28',`<rect x="10" y="12" width="250" height="236" rx="14" fill="${PAPER}"/><g transform="translate(6 18) scale(.64)">${circ(q.v||{c:{cell:'3 V',s:[]}})}</g>${gauge(330,120,62,val,q.max,q.u||'',(q.v&&q.v.m==='A'?'Ammeter':'Voltmeter')+' (needle)')}`,'Circuit and meter')];
/* restored from the live build */
K3ART.chem = [
  (e) =>
    KA.fr(
      "#5E35B1",
      "#80CBC4",
      ["solid", "liquid", "gas"]
        .map(
          (e, t) =>
            `<g><rect x="${20 + 126 * t}" y="40" width="108" height="150" rx="12" fill="#fff" stroke="#5E35B1" stroke-width="3"/>${"liquid" === e ? `<rect x="${23 + 126 * t}" y="105" width="102" height="82" rx="8" fill="#B3E5FC" opacity=".6"/>` : ""}${parts(e, 20 + 126 * t, 40, 108, 150)}${KA.card(28 + 126 * t, 200, 92, 30, ["Room 1", "Room 2", "Room 3"][t], "#EDE7F6", 14)}</g>`,
        )
        .join(""),
      "Particles in three states",
    ),
  (e, t) => {
    const a = e.v || { n: "water", mp: 0, bp: 100 },
      s = e.min,
      o = e.max;
    null == t && (t = null != e.start ? e.start : s);
    const r = 210 - ((t - s) / (o - s)) * 160;
    return KA.fr(
      "#E64A19",
      "#4FC3F7",
      `<rect x="60" y="30" width="34" height="190" rx="17" fill="#fff" stroke="#455A64" stroke-width="3"/><circle cx="77" cy="222" r="24" fill="#E53935" stroke="#455A64" stroke-width="3"/><rect x="69" y="${r}" width="16" height="${222 - r}" fill="#E53935"/>${[0, 0.25, 0.5, 0.75, 1].map((e) => `<path d="M94 ${210 - 160 * e}h10" stroke="#455A64" stroke-width="2"/>${KA.t(108, 214 - 160 * e, String(Math.round(s + (o - s) * e)), 11, "#455A64", "start", 700)}`).join("")}\n  <rect x="170" y="40" width="200" height="120" rx="16" fill="#fff" stroke="#455A64" stroke-width="2"/>${KA.t(270, 74, a.n, 20, "#BF360C")}${KA.t(270, 104, "melting point " + a.mp + " \xb0C", 14, "#455A64")}${KA.t(270, 128, "boiling point " + a.bp + " \xb0C", 14, "#455A64")}<rect x="200" y="180" width="140" height="44" rx="12" fill="#263238"/>${KA.t(270, 210, (null != t ? t : s) + " \xb0C", 22, "#FFCA28")}`,
      "Thermometer",
    );
  },
  (e) => {
    const t = e.v,
      a =
        "tyre" === t
          ? '<circle cx="200" cy="130" r="80" fill="#424242"/><circle cx="200" cy="130" r="44" fill="#FFFDF7"/>'
          : "syringe" === t
            ? '<rect x="80" y="100" width="200" height="60" rx="6" fill="#E3F2FD" stroke="#1565C0" stroke-width="3"/><rect x="280" y="120" width="70" height="20" fill="#90CAF9"/><rect x="60" y="108" width="20" height="44" fill="#455A64"/>'
            : "mountain" === t
              ? '<path d="M20 230l120-170 60 80 40-50 140 140z" fill="#90A4AE"/><path d="M120 88l20-28 20 28-20-6z" fill="#fff"/>'
              : `<rect x="110" y="60" width="180" height="150" rx="${"bottle" === t ? 40 : 12}" fill="#E1F5FE" stroke="#455A64" stroke-width="3"/>`;
    return KA.fr(
      "#455A64",
      "#FF7043",
      a +
        `<g>${parts("gas", "syringe" === t ? 90 : 120, "syringe" === t ? 100 : 70, "syringe" === t ? 180 : 160, "syringe" === t ? 60 : 130)}</g><g transform="translate(330 60)"><circle r="40" fill="#fff" stroke="#455A64" stroke-width="3"/><path d="M0 0l-18-22" stroke="#C62828" stroke-width="3" class="k3wob"/><circle r="5" fill="#455A64"/>${KA.t(0, 26, "kPa", 11, "#455A64")}</g>${KA.q(372, 30, 13)}`,
      "Gas pressure",
    );
  },
  (e) => {
    const t = e.v,
      a =
        "cuso4" === t
          ? `<ellipse cx="200" cy="170" rx="90" ry="26" fill="#ECEFF1" stroke="#455A64" stroke-width="3"/><ellipse cx="200" cy="164" rx="70" ry="14" fill="#fff"/>${KA.t(200, 120, "anhydrous copper sulfate", 15, "#455A64")}${KA.q(300, 150)}`
          : "cocl" === t
            ? `<rect x="150" y="60" width="100" height="140" rx="6" fill="#42A5F5" stroke="#1565C0" stroke-width="3"/>${KA.t(200, 226, "cobalt chloride paper", 15, "#455A64")}${KA.q(270, 70)}`
            : "thermo" === t
              ? `<rect x="180" y="30" width="40" height="170" rx="20" fill="#fff" stroke="#455A64" stroke-width="3"/><circle cx="200" cy="206" r="26" fill="#29B6F6" stroke="#455A64" stroke-width="3"/><rect x="192" y="100" width="16" height="106" fill="#29B6F6"/>${KA.t(260, 70, "100 \xb0C ?", 14, "#455A64", "start")}${KA.t(260, 190, "0 \xb0C ?", 14, "#455A64", "start")}`
              : "flame" === t
                ? `<path d="M200 220c-60 0-70-60-30-110c0 30 20 30 20 10c0-30 30-50 30-80c40 50 60 90 40 140c-10 30-30 40-60 40z" fill="#4FC3F7" opacity=".8"/>${KA.t(200, 246, "Hydrogen burning in oxygen", 14, "#01579B")}`
                : `${molecule("H2O", "h2o3" === t ? 120 : 200, 140)}${"h2o3" === t ? molecule("H2O", 200, 140) + molecule("H2O", 280, 140) : ""}${KA.t(200, 236, "h2o3" === t ? "Three water molecules" : "A water molecule", 15, "#01579B")}`;
    return KA.fr(
      "#0277BD",
      "#4DD0E1",
      '<path d="M0 220q50-12 100 0t100 0t100 0t100 0V260H0z" fill="#4FC3F7" opacity=".35"/>' + a,
      "Water",
    );
  },
  (e) =>
    KA.fr(
      "#AD1457",
      "#FFB300",
      (e.v || ["atoms", "cmp", "mixE", "di"])
        .map(
          (e, t) =>
            `<g data-hot="${"ABCD"[t]}" data-lab="box ${"ABCD"[t]}"><rect x="${12 + 97 * t}" y="36" width="86" height="170" rx="12" fill="#fff" stroke="#AD1457" stroke-width="3"/>${parts(e, 12 + 97 * t, 40, 86, 160)}${KA.t(55 + 97 * t, 236, "Box " + "ABCD"[t], 16, "#880E4F")}</g>`,
        )
        .join(""),
      "Four particle boxes",
    ),
  (e) => {
    const t = e.v || "CO2",
      a = t.replace(/(\d+)/g, (e, t, a) =>
        0 === a
          ? e
          : e
              .split("")
              .map((e) => "\u2080\u2081\u2082\u2083\u2084\u2085\u2086\u2087\u2088\u2089"[e])
              .join(""),
      ),
      s = molecule(t, 200, 120);
    return KA.fr(
      "#00897B",
      "#FFD54F",
      `<rect x="30" y="30" width="340" height="180" rx="20" fill="#E0F2F1" stroke="#00695C" stroke-width="4"/>${[60, 340].map((e) => `<g class="k3spin" style="transform-origin:${e}px 50px"><circle cx="${e}" cy="50" r="16" fill="#FFD54F" stroke="#F57F17" stroke-width="3" stroke-dasharray="6 4"/></g>`).join("")}${s || KA.t(200, 138, a, 48, "#004D40")}${s ? KA.t(200, 200, a, 26, "#004D40") : ""}<rect x="150" y="222" width="100" height="30" rx="8" fill="#263238"/>${KA.t(200, 243, "COUNT", 14, "#FFD54F")}`,
      "Molecule counter",
    );
  },
  (e) => {
    const t = e.v || {};
    return KA.fr(
      "#283593",
      "#FF8A65",
      `<rect x="120" y="30" width="160" height="180" rx="18" fill="#fff" stroke="#283593" stroke-width="5"/>${t.z ? KA.t(140, 62, String(t.z), 20, "#283593", "start") : ""}${KA.t(200, 140, t.f ? "formula" : t.s || "?", t.f ? 26 : 78, t.s ? "#283593" : "#FF7043")}${KA.t(200, 188, t.n || "", 20, "#283593")}${["H", "He", "Li", "C", "N", "O", "Na", "Mg", "Fe", "Cu"].map((e, t) => KA.t(20 + (t % 2) * 340 + 0, 34 + 44 * Math.floor(t / 2), e, 18, "#9FA8DA"))}`,
      "Element tile",
    );
  },
  (e) => {
    const t = e.v;
    let a = "";
    for (let e = 0; e < 4; e++)
      for (let t = 0; t < 3; t++)
        a += `<circle cx="${60 + 26 * e + (t % 2) * 13}" cy="${80 + 26 * t}" r="6" fill="#263238"/>`;
    let s = "";
    for (let e = 0; e < 3; e++)
      for (let t = 0; t < 3; t++) {
        const a = 60 + 26 * e + (t % 2) * 13,
          o = 80 + 26 * t;
        s += `<path d="M${a} ${o}l13 26M${a} ${o}l26 0" stroke="#78909C" stroke-width="2.5"/>`;
      }
    let o = "";
    for (let e = 0; e < 3; e++)
      for (let t = 0; t < 5; t++)
        o += `<circle cx="${230 + 28 * t + (e % 2) * 14}" cy="${80 + 34 * e}" r="6" fill="#263238"/>`;
    let r = "";
    for (let e = 0; e < 3; e++)
      r += `<path d="M230 ${80 + 34 * e}h${112 + (e % 2) * 14}" stroke="#78909C" stroke-width="2.5"/>`;
    const i =
      "fuel" === t
        ? `<g transform="translate(0 40)">${KA.t(200, 190, "coal \xb7 oil \xb7 gas", 16, "#263238")}</g>`
        : "";
    return KA.fr(
      "#424242",
      "#90A4AE",
      `<rect x="30" y="40" width="150" height="140" rx="14" fill="#fff"/><rect x="210" y="40" width="160" height="140" rx="14" fill="#fff"/>${s}${a}${r}${o}${KA.t(105, 206, "diamond", 16, "#263238")}${KA.t(290, 206, "graphite", 16, "#263238")}${i}`,
      "Diamond and graphite",
    );
  },
  (e) => {
    const t = {
      H: [0, 0],
      He: [17, 0],
      N: [14, 1],
      O: [15, 1],
      Ne: [17, 1],
      Na: [0, 2],
      Mg: [1, 2],
      S: [15, 2],
      Cl: [16, 2],
      Fe: [7, 3],
      Cu: [10, 3],
      Ag: [10, 4],
      Au: [10, 5],
    };
    let a = "";
    for (let e = 0; e < 7; e++)
      for (let t = 0; t < 18; t++)
        ((0 === e && (0 === t || 17 === t)) || (e > 0 && e < 3 && (t < 2 || t > 11)) || e >= 3) &&
          (a += `<rect x="${20 + 20 * t}" y="${40 + 24 * e}" width="18" height="22" rx="3" fill="${(t >= 12 && !(e >= 3 && t < 13)) || 17 === t || (0 === e && 0 === t) ? "#90CAF9" : "#FFCC80"}" opacity=".85"/>`);
    return (
      (e.v || []).forEach((e) => {
        const s = t[e];
        s &&
          (a += `<rect x="${18 + 20 * s[0]}" y="${38 + 24 * s[1]}" width="22" height="26" rx="4" fill="#FFC531" stroke="#C62828" stroke-width="2"/>${KA.t(29 + 20 * s[0], 56 + 24 * s[1], e, 11)}`);
      }),
      KA.fr(
        "#C62828",
        "#42A5F5",
        a +
          `<rect x="40" y="222" width="14" height="14" fill="#FFCC80"/>${KA.t(60, 234, "metals", 13, "#5D4037", "start")}<rect x="200" y="222" width="14" height="14" fill="#90CAF9"/>${KA.t(220, 234, "non-metals", 13, "#0D47A1", "start")}`,
        "Periodic table",
      )
    );
  },
  (e) => {
    const t = e.v,
      a =
        "triangle" === t
          ? `<path d="M200 40L320 220H80z" fill="#FFF3E0" stroke="#E64A19" stroke-width="6"/>${KA.t(120, 130, "fuel", 16, "#BF360C")}${KA.t(282, 130, "?", 22, "#BF360C")}${KA.t(200, 244, "?", 22, "#BF360C")}<path d="M200 200c-24 0-30-26-14-46c0 12 8 12 8 4c0-12 12-20 12-32c18 22 24 38 16 56c-4 12-12 18-22 18z" fill="#FF7043"/>`
          : "splint" === t
            ? `<path d="M150 60h100v160q-50 30-100 0z" fill="#E1F5FE" stroke="#455A64" stroke-width="3" opacity=".9"/><path d="M200 20l-4 120" stroke="#A1887F" stroke-width="8" stroke-linecap="round"/><circle cx="196" cy="142" r="6" fill="#FF7043" class="k3glow"/>${KA.t(200, 246, "oxygen test", 14, "#455A64")}`
            : "rust" === t
              ? `<path d="M100 120h200l20 10-20 10H100z" fill="#A1887F" stroke="#5D4037" stroke-width="3"/>${[130, 170, 220, 260].map((e) => `<circle cx="${e}" cy="${128 + (e % 3) * 4}" r="8" fill="#D84315" opacity=".8"/>`).join("")}${KA.t(200, 190, "a rusty iron nail", 16, "#5D4037")}`
              : "leaf" === t
                ? `<path d="M90 200c0-110 160-150 230-150c0 90-60 170-230 150z" fill="#66BB6A" stroke="#2E7D32" stroke-width="3"/><path d="M90 200l200-130" stroke="#2E7D32" stroke-width="3"/>${[0, 1, 2].map((e) => `<circle cx="${300 + 14 * e}" cy="${150 - 30 * e}" r="${8 - 2 * e}" fill="#E1F5FE" stroke="#0288D1" class="k3drift"/>`).join("")}`
                : `<path d="M140 60h120v150q-60 30-120 0z" fill="#E1F5FE" stroke="#455A64" stroke-width="3" opacity=".9"/>${parts("gas", 145, 70, 110, 130)}${KA.t(200, 246, "air" === t ? "a jar of air" : "a jar of gas", 14, "#455A64")}`;
    return KA.fr("#D32F2F", "#29B6F6", a, "Oxygen");
  },
];
/* restored from the live build */
K3ART.bio = [
  (e) => {
    const t = "both" === e.v,
      a = "function" == typeof animalCellSVG ? animalCellSVG() : "",
      s = "function" == typeof plantCellSVG ? plantCellSVG() : "",
      o = a.replace("<svg", `<svg x="${t ? 10 : 90}" y="40" width="${t ? 180 : 220}" height="${t ? 126 : 154}"`),
      r = s.replace("<svg", `<svg x="${t ? 200 : 90}" y="34" width="${t ? 190 : 220}" height="${t ? 122 : 142}"`);
    return KA.fr(
      "#2E7D32",
      "#9CCC65",
      `<circle cx="200" cy="130" r="124" fill="#fff" stroke="#455A64" stroke-width="6"/>${"plant" === e.v ? r : "animal" === e.v ? o : o + r}${t ? KA.t(100, 196, "animal cell", 14, "#2E7D32") + KA.t(296, 196, "plant cell", 14, "#2E7D32") : KA.t(200, 214, "plant" === e.v ? "plant cell" : "animal cell", 15, "#2E7D32")}`,
      "Cells under the microscope",
    );
  },
  (e) => {
    const t = e.v || ["rbc", "neurone", "sperm"];
    return KA.fr(
      "#C2185B",
      "#F48FB1",
      t
        .map(
          (e, t) =>
            `<g><rect x="${14 + 128 * t}" y="50" width="116" height="140" rx="16" fill="#fff" stroke="#F48FB1" stroke-width="3"/>${cellPic(e, 14 + 128 * t + 4, 80, 108)}${KA.q(14 + 128 * t + 100, 64, 11)}</g>`,
        )
        .join("") + KA.t(200, 226, "Cell Job Agency: who does what?", 15, "#880E4F"),
      "Specialised animal cells",
    );
  },
  (e) => {
    const t = e.v || ["roothair"],
      a = t.length,
      s = Math.min(150, 360 / a);
    return KA.fr(
      "#558B2F",
      "#C5E1A5",
      t
        .map(
          (e, t) =>
            `<g><rect x="${200 - (a * s) / 2 + t * s + 4}" y="50" width="${s - 8}" height="${0.8 * s}" rx="14" fill="#fff" stroke="#9CCC65" stroke-width="3"/>${cellPic(e, 200 - (a * s) / 2 + t * s + 8, 56, s - 16)}${KA.t(200 - (a * s) / 2 + t * s + s / 2, 64 + 0.8 * s, CELLN[e] || e, 12, "#33691E")}</g>`,
        )
        .join(""),
      "Specialised plant cells",
    );
  },
  (e) =>
    "tube" === e.v
      ? KA.fr(
          "#B71C1C",
          "#FFCC80",
          `<path d="M170 20h60v190a30 30 0 0 1-60 0z" fill="#fff" stroke="#455A64" stroke-width="3"/><path d="M172 30h56v95h-56z" fill="#FFE082"/><path d="M172 125h56v6h-56z" fill="#FAFAFA"/><path d="M172 131h56v79a28 28 0 0 1-56 0z" fill="#C62828"/>${KA.t(250, 84, "?", 20, "#B71C1C", "start")}${KA.t(250, 132, "?", 16, "#B71C1C", "start")}${KA.t(250, 180, "?", 20, "#B71C1C", "start")}`,
          "Blood in a test tube",
        )
      : KA.fr(
          "#B71C1C",
          "#FFCC80",
          `<circle cx="200" cy="130" r="112" fill="#FFE082" stroke="#B71C1C" stroke-width="4"/>${[
            [140, 90],
            [250, 80],
            [170, 170],
            [270, 170],
            [210, 120],
            [130, 150],
            [290, 125],
          ]
            .map(
              ([e, t]) =>
                `<g class="k3drift"><circle cx="${e}" cy="${t}" r="20" fill="#E53935"/><circle cx="${e}" cy="${t}" r="9" fill="#EF9A9A"/></g>`,
            )
            .join(
              "",
            )}<g><circle cx="220" cy="190" r="22" fill="#E3F2FD" stroke="#1E88E5" stroke-width="2"/><path d="M208 186q6-10 14-2q8-8 12 4q-4 10-12 6q-8 6-14-8z" fill="#6A4C93"/></g>${[
            [170, 60],
            [190, 215],
            [110, 115],
          ]
            .map(([e, t]) => `<ellipse cx="${e}" cy="${t}" rx="6" ry="3.5" fill="#8D6E63"/>`)
            .join("")}`,
          "Magnified blood",
        ),
  (e) =>
    KA.fr(
      "#5D4037",
      "#B0BEC5",
      `<rect width="400" height="260" fill="#263238"/><g class="k3xray">${skeleton()}</g>${KA.t(370, 250, "X-RAY", 12, "#80DEEA", "end")}`,
      "Skeleton",
    ),
  (e) => KA.fr("#AD1457", "#FF8A80", arm(e.v), "Arm muscles"),
  (e, t) => {
    const a = e.v || {};
    if (a.seesaw) {
      const e = t || 0;
      return KA.fr(
        "#E65100",
        "#FFD180",
        `<path d="M190 220l10-30 10 30z" fill="#6D4C41"/><path d="M30 190h340" stroke="#8D6E63" stroke-width="10" stroke-linecap="round"/><g transform="translate(${200 - 80 * a.d} 160)"><rect x="-16" y="-30" width="32" height="30" rx="6" fill="#42A5F5"/>${KA.t(0, -10, a.w + " N", 11, "#fff")}</g><g transform="translate(${200 + 80 * e} 160)"><rect x="-18" y="-34" width="36" height="34" rx="6" fill="#EF5350"/>${KA.t(0, -12, a.w2 + " N", 11, "#fff")}</g>${KA.t(200 - 40 * a.d, 214, a.d + " m", 13, "#5D4037")}${KA.t(200 + 40 * e, 214, (e || 0).toFixed(1) + " m", 13, "#C62828")}`,
        "Seesaw",
      );
    }
    const s = a.d ? (300 / a.d) * 0.9 : 600,
      o = a.bd ? 60 + a.bd * s : 0,
      r = a.d ? 60 + a.d * s : 0,
      i = "f" === a.show ? t : a.f,
      l = Math.min(110, 10 + ((i || 0) / ("f" === a.show ? e.max : 400)) * 110);
    return KA.fr(
      "#E65100",
      "#FFD180",
      `<path d="M60 150H${Math.max(r, o) + 24}" stroke="#8D7B68" stroke-width="20" stroke-linecap="round"/><path d="M60 150H${Math.max(r, o) + 24}" stroke="#F5F1E6" stroke-width="14" stroke-linecap="round"/><path d="M46 182l14-26 14 26z" fill="#6D4C41"/>${KA.t(60, 204, "elbow (pivot)", 12, "#5D4037")}\n   ${a.w ? `<path d="M${r} 150v30" stroke="#455A64" stroke-width="3"/><rect x="${r - 20}" y="180" width="40" height="34" rx="6" fill="#455A64"/>${KA.t(r, 202, a.w + " N", 12, "#fff")}<path d="M60 236H${r}" stroke="#E65100" stroke-width="2" marker-end=""/>${KA.t((60 + r) / 2, 252, a.d + " m", 13, "#E65100")}` : ""}\n   ${a.bd ? `<path d="M${o} 150V${150 - l}" stroke="#C62828" stroke-width="6" stroke-linecap="round"/><path d="M${o - 10} ${160 - l}l10-16 10 16z" fill="#C62828"/>${KA.t(o + 14, 140 - l / 2, "biceps " + ("f" === a.show ? (t || 0) + " N" : a.f + " N"), 13, "#C62828", "start")}<path d="M60 120H${o}" stroke="#C62828" stroke-width="2"/>${KA.t(64, 112, a.bd + " m", 12, "#C62828", "start")}` : ""}\n   <rect x="250" y="24" width="136" height="40" rx="10" fill="#263238"/>${KA.t(318, 50, "m" === a.show || "bm" === a.show ? "moment " + (t || 0) + " N m" : "balance?", 14, "#FFD180")}`,
      "Forearm lever",
    );
  },
  (e) => {
    const t = e.v,
      a =
        "embryo" === t
          ? [...Array(8)]
              .map(
                (e, t) =>
                  `<circle cx="${200 + 18 * Math.cos(0.8 * t)}" cy="${120 + 18 * Math.sin(0.8 * t)}" r="13" fill="#E1BEE7" stroke="#6A1B9A" stroke-width="2"/>`,
              )
              .join("")
          : "marrow" === t
            ? '<ellipse cx="200" cy="120" rx="60" ry="34" fill="#F5F1E6" stroke="#8D7B68" stroke-width="4"/><ellipse cx="200" cy="120" rx="36" ry="18" fill="#EF9A9A"/>'
            : "plant" === t
              ? '<path d="M200 200V90" stroke="#2E7D32" stroke-width="8"/><path d="M200 120c-30-10-40-30-40-40c20 0 40 10 40 40zM200 100c30-10 40-30 40-40c-20 0-40 10-40 40z" fill="#66BB6A"/><circle cx="200" cy="84" r="10" fill="#E1BEE7" stroke="#6A1B9A" stroke-width="2" class="k3pulse"/>'
              : '<circle cx="200" cy="120" r="34" fill="#E1BEE7" stroke="#6A1B9A" stroke-width="4"/><circle cx="200" cy="120" r="12" fill="#6A4C93"/>',
      s =
        "plant" === t
          ? ""
          : ["rbc", "neurone", "muscle", "wbc"]
              .map((e, t) => {
                const a = ((95 * t - 140) * Math.PI) / 180,
                  s = 200 + 150 * Math.cos(a) * 0.95,
                  o = 130 + 95 * Math.sin(a) * 0.9;
                return `<path d="M${200 + 40 * Math.cos(a)} ${120 + 30 * Math.sin(a)}L${s - 30 * Math.cos(a)} ${o - 20 * Math.sin(a)}" stroke="#6A1B9A" stroke-width="2" stroke-dasharray="4 4"/>${cellPic(e, s - 36, o - 24, 72)}`;
              })
              .join("");
    return KA.fr(
      "#6A1B9A",
      "#80DEEA",
      a +
        s +
        KA.t(
          200,
          250,
          "embryo" === t
            ? "early embryo"
            : "marrow" === t
              ? "bone marrow"
              : "plant" === t
                ? "meristem at a shoot tip"
                : "stem cell",
          14,
          "#4A148C",
        ),
      "Stem cells",
    );
  },
  (e) => {
    const t =
      {
        heart: "\u2764\ufe0f",
        leaf: "\ud83c\udf43",
        brain: "\ud83e\udde0",
        stomach: "\ud83e\udec3",
        root: "\ud83c\udf31",
        lungs: "\ud83e\udec1",
        ladder: "\ud83e\uddec",
      }[e.v] || "\ud83e\uddec";
    return KA.fr(
      "#00695C",
      "#A5D6A7",
      `<path d="M120 20v230M280 20v230" stroke="#6D4C41" stroke-width="10" stroke-linecap="round"/>${[0, 1, 2, 3, 4].map((e) => `<path d="M120 ${226 - 48 * e}h160" stroke="#8D6E63" stroke-width="8"/>${KA.t(200, 222 - 48 * e + 6, "?", 18, "#004D40")}`).join("")}<text x="330" y="140" font-size="56" text-anchor="middle">${t}</text>`,
      "Organisation ladder",
    );
  },
  (e) =>
    KA.fr(
      "#33691E",
      "#FFEE58",
      e.v && e.v.eq
        ? `<path d="M60 200c0-110 180-160 280-160c0 100-80 190-280 160z" fill="#66BB6A" stroke="#2E7D32" stroke-width="4"/><circle cx="330" cy="40" r="22" fill="#FFCA28"/>${KA.t(140, 236, "CO\u2082 + H\u2082O in", 14, "#1B5E20")}${KA.t(300, 236, "glucose + O\u2082 out", 14, "#1B5E20")}`
        : leafX(e.v && e.v.hi),
      "Leaf cross-section",
    ),
];
/* restored from the live build */
K3ART.spa = [
  (e) => {
    const t =
      { mouth: "\xa1Hola!", "\xf1": "\xf1", j: "j", rr: "rr", ll: "ll", th: "c / z", stress: "\xb4" }[e.v] || "\xa1A!";
    return KA.fr(
      "#C62828",
      "#FF8A65",
      `<circle cx="120" cy="130" r="70" fill="#fff" stroke="#C62828" stroke-width="5"/><path d="M80 120q40 50 80 0q-40 20-80 0z" fill="#C62828"/><path d="M90 128q30 18 60 0" fill="#FFCDD2"/>${[0, 1, 2].map((e) => `<path d="M${210 + 22 * e} ${100 - 14 * e}q${20 + 8 * e} ${30 + 14 * e} 0 ${60 + 28 * e}" stroke="#FF7043" stroke-width="5" fill="none" stroke-linecap="round" class="k3pulse" style="animation-delay:${0.2 * e}s"/>`).join("")}${KA.t(320, 150, t, t.length > 3 ? 30 : 56, "#B71C1C")}`,
      "Spanish sounds",
    );
  },
  (e) => {
    const t =
      "function" == typeof avatarSVG
        ? avatarSVG(S.av, "av", 140).replace("<svg", '<svg x="20" y="90" width="140" height="140"')
        : "";
    return KA.fr(
      "#AD1457",
      "#FFCA28",
      `${t}<path d="M170 40h210a14 14 0 0 1 14 14v80a14 14 0 0 1-14 14H210l-30 24 6-24h-16a14 14 0 0 1-14-14V54a14 14 0 0 1 14-14z" fill="#fff" stroke="#AD1457" stroke-width="3"/>${KA.t(275, 86, "\xa1Hola!", 26, "#AD1457")}${KA.t(275, 118, "\xbf...?", 22, "#FFB300")}<rect x="180" y="190" width="200" height="50" rx="12" fill="#FFF8E1" stroke="#FFB300" stroke-width="2"/>${KA.t(280, 221, "HELLO, my name is\u2026", 14, "#6D4C41")}`,
      "Introducing yourself",
    );
  },
  (e) => {
    if ("pets" === e.v)
      return KA.fr(
        "#6D4C41",
        "#FFB74D",
        `${[
          ["\ud83d\udc36", 80, "perro"],
          ["\ud83d\udc31", 170, "gato"],
          ["\ud83d\udc1f", 260, "pez"],
          ["\ud83d\udc30", 340, "conejo"],
        ]
          .map(
            ([e, t, a]) =>
              `<text x="${t}" y="140" font-size="58" text-anchor="middle">${e}</text>${KA.t(t, 190, a, 16, "#4E342E")}`,
          )
          .join("")}`,
        "Pets",
      );
    const t = (e, t, a, s) =>
      `<g><rect x="${e - 46}" y="${t - 22}" width="92" height="44" rx="12" fill="${s}" stroke="#6D4C41" stroke-width="2"/>${KA.t(e, t + 5, a, 14, "#3E2723")}</g>`;
    return KA.fr(
      "#6D4C41",
      "#FFB74D",
      `<path d="M120 62h160M200 62v40M100 140h200M100 140v30M200 140v30M300 140v30M200 102v38" stroke="#8D6E63" stroke-width="4" fill="none"/>${t(120, 50, "abuelo", "#E3F2FD")}${t(280, 50, "abuela", "#FCE4EC")}${t(200, 112, "madre / padre", "#FFF3E0")}${t(100, 190, "hermano", "#E3F2FD")}${t(200, 190, "yo", "#FFF59D")}${t(300, 190, "hermana", "#FCE4EC")}`,
      "Family tree",
    );
  },
  (e) =>
    KA.fr(
      "#1565C0",
      "#FFAB91",
      `<rect x="0" y="0" width="400" height="260" fill="#ECEFF1"/>${[...Array(6)].map((e, t) => `<path d="M0 ${40 + 36 * t}H400" stroke="#B0BEC5" stroke-width="1"/>${KA.t(396, 36 + 36 * t, 190 - 20 * t + "", 9, "#90A4AE", "end", 700)}`).join("")}${(e.v || []).map((e, t) => person(e, 52 + 99 * t, "ABCD"[t])).join("")}`,
      "Lineup of four people",
    ),
  (e) => {
    const t = "week" === e.v;
    return KA.fr(
      "#00838F",
      "#FFD54F",
      t
        ? `${["L", "M", "X", "J", "V", "S", "D"].map((e, t) => `<rect x="${14 + 54 * t}" y="70" width="48" height="110" rx="10" fill="${t > 4 ? "#FFE082" : "#fff"}" stroke="#00838F" stroke-width="3"/>${KA.t(38 + 54 * t, 104, "?", 26, "#00838F")}`).join("")}${KA.t(200, 220, "la semana", 18, "#006064")}`
        : `${[...Array(12)].map((e, t) => `<rect x="${20 + (t % 6) * 62}" y="${40 + 92 * Math.floor(t / 6)}" width="54" height="80" rx="10" fill="#fff" stroke="#00838F" stroke-width="3"/><rect x="${20 + (t % 6) * 62}" y="${40 + 92 * Math.floor(t / 6)}" width="54" height="18" rx="6" fill="#26C6DA"/>${KA.t(47 + (t % 6) * 62, 96 + 92 * Math.floor(t / 6), "?", 22, "#00838F")}`).join("")}${KA.t(200, 240, "el a\xf1o", 18, "#006064")}`,
      "Calendar",
    );
  },
  (e, t) => KA.fr("#4E342E", "#FFB300", clockFace(t || 0), "Clock tower"),
  (e) =>
    KA.fr(
      "#2E7D32",
      "#FFCA28",
      `${[
        ["jugar", 90, "#1E88E5"],
        ["hacer", 310, "#E53935"],
      ]
        .map(
          ([e, t, a]) =>
            `<rect x="${t - 70}" y="40" width="140" height="180" rx="12" fill="${a}" opacity=".9"/><rect x="${t - 60}" y="56" width="120" height="30" rx="6" fill="#fff"/>${KA.t(t, 78, e, 20, a)}${[0, 1, 2].map((e) => `<path d="M${t - 40} ${110 + 10 * e}h80" stroke="#fff" stroke-opacity=".6" stroke-width="3"/>`).join("")}`,
        )
        .join(
          "",
        )}<text x="200" y="120" font-size="40" text-anchor="middle">\u26bd</text><text x="200" y="180" font-size="40" text-anchor="middle">\ud83c\udfca</text>`,
      "Activity lockers",
    ),
  (e) =>
    KA.fr(
      "#1565C0",
      "#81C784",
      `<rect x="0" y="0" width="400" height="260" fill="#C8E6C9"/><path d="M0 200q100-30 200 0t200 0V260H0z" fill="#4FC3F7"/><path d="M0 110H400M180 0V200" stroke="#ECEFF1" stroke-width="18"/><rect x="40" y="40" width="70" height="50" fill="#FFAB91"/><path d="M34 42l41-30 41 30z" fill="#D84315"/><circle cx="270" cy="60" r="28" fill="#66BB6A"/><rect x="230" y="130" width="90" height="50" fill="#FFF59D" stroke="#F9A825" stroke-width="2"/>${KA.t(275, 160, "colegio", 12, "#5D4037")}${[
        [75, 30],
        [270, 40],
        [275, 120],
        [90, 180],
      ]
        .map(
          ([e, t]) =>
            `<path d="M${e} ${t}c-10-16 10-26 10-10 0 10-10 22-10 22s-10-12-10-22c0-16 20-6 10 10z" fill="#E53935"/>`,
        )
        .join("")}`,
      "Town map",
    ),
  (e) => KA.fr("#6A1B9A", "#4DB6AC", room(e.v || {}), "Bedroom"),
  (e) => {
    const t =
      {
        choc: "\ud83c\udf6b",
        chips: "\ud83c\udf5f",
        fruit: "\ud83c\udf4e",
        burger: "\ud83c\udf54",
        tomato: "\ud83c\udf45",
        water: "\ud83d\udca7",
        curry: "\ud83c\udf5b",
        mush: "\ud83c\udf44",
      }[e.v] || "\ud83c\udf7d\ufe0f";
    return KA.fr(
      "#E65100",
      "#FFEE58",
      `<rect x="30" y="20" width="200" height="220" rx="14" fill="#263238" stroke="#8D6E63" stroke-width="8"/>${KA.t(130, 56, "MEN\xda", 24, "#FFEE58")}${["tapas", "bebidas", "postres"].map((e, t) => KA.t(130, 100 + 40 * t, e + " . . . \u20ac" + (t + 2), 15, "#fff"))}<circle cx="310" cy="140" r="70" fill="#fff" stroke="#E65100" stroke-width="4"/><text x="310" y="166" font-size="72" text-anchor="middle">${t}</text>`,
      "Caf\xe9 menu",
    );
  },
];
K3ART.phyIcon=()=>`<path d="M46 14L24 46h16l-6 26 26-36H44z" fill="#FFE066" stroke="#fff" stroke-width="3" stroke-linejoin="round"/>`;
K3ART.chemIcon=()=>`<path d="M34 14h16M37 14v18L22 60a6 6 0 0 0 5 9h30a6 6 0 0 0 5-9L47 32V14" fill="#fff" stroke="#fff" stroke-width="3"/><path d="M27 52h30l5 8a6 6 0 0 1-5 9H27a6 6 0 0 1-5-9z" fill="#80CBC4"/><circle cx="38" cy="58" r="3" fill="#fff"/><circle cx="48" cy="54" r="2" fill="#fff"/>`;
K3ART.bioIcon=()=>`<path d="M22 60C22 30 44 18 66 18c0 30-16 44-44 42z" fill="#C5E1A5" stroke="#fff" stroke-width="3"/><path d="M22 60L56 28" stroke="#fff" stroke-width="3"/>`;
K3ART.spaIcon=()=>`<path d="M16 20h52a6 6 0 0 1 6 6v26a6 6 0 0 1-6 6H36l-12 10 2-10h-10a6 6 0 0 1-6-6V26a6 6 0 0 1 6-6z" fill="#fff"/><text x="42" y="47" text-anchor="middle" font-family="Bungee,sans-serif" font-size="18" fill="#C62828">¡Sí!</text>`;
